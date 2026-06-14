/**
 * Skills Intelligence Engine — Inference Layer
 *
 * Takes an array of RepoAnalysis objects, applies all rule sets,
 * and returns a fully structured SkillsIntelligenceReport.
 *
 * Algorithm per repo:
 *   for every dependency/devDependency  → look up DEPENDENCY_RULES
 *   for repo.language                   → look up LANGUAGE_RULES
 *   for every topic                     → look up TOPIC_RULES
 *   for every detectedFile              → look up FILENAME_RULES
 *   for every script value              → look up SCRIPT_RULES (keyword match)
 *   for description                     → test DESCRIPTION_KEYWORDS regexes
 *
 * Confidence is additive across signals but capped at 100.
 * The same skill name from the same repo can only add weight once per signal type.
 */

import type { InferredSkill, RepoAnalysis, SkillSignal, SkillsIntelligenceReport, SkillCategory } from '@/types'
import {
  DEPENDENCY_RULES,
  LANGUAGE_RULES,
  TOPIC_RULES,
  FILENAME_RULES,
  SCRIPT_RULES,
  DESCRIPTION_KEYWORDS,
} from './rules'

// ─── Accumulator ─────────────────────────────────────────────────────────────

interface SkillAcc {
  name: string
  category: SkillCategory
  totalWeight: number
  signals: SkillSignal[]
  repoSources: Set<string>
  dates: string[]
}

function addSignal(
  acc: Map<string, SkillAcc>,
  skillName: string,
  category: SkillCategory,
  signal: SkillSignal,
  repoDate: string
) {
  const key = `${skillName}::${category}`
  if (!acc.has(key)) {
    acc.set(key, {
      name: skillName,
      category,
      totalWeight: 0,
      signals: [],
      repoSources: new Set(),
      dates: [],
    })
  }
  const entry = acc.get(key)!
  entry.totalWeight += signal.weight
  entry.signals.push(signal)
  entry.repoSources.add(signal.repoName)
  if (repoDate) entry.dates.push(repoDate)
}

// ─── Per-repo inference ───────────────────────────────────────────────────────

function inferFromRepo(repo: RepoAnalysis, acc: Map<string, SkillAcc>) {
  const repoDate = repo.updatedAt

  // 1. Dependencies
  const allDeps = { ...repo.dependencies, ...repo.devDependencies }
  for (const [dep, version] of Object.entries(allDeps)) {
    const depLower = dep.toLowerCase()
    const rules = DEPENDENCY_RULES[dep] ?? DEPENDENCY_RULES[depLower]
    if (rules) {
      const isDev = dep in repo.devDependencies
      for (const rule of rules) {
        addSignal(acc, rule.skill, rule.category, {
          type: isDev ? 'devDependency' : 'dependency',
          value: `${dep}@${version}`,
          repoName: repo.repoName,
          weight: rule.weight,
        }, repoDate)
      }
    }
  }

  // 2. Language
  if (repo.language) {
    const rules = LANGUAGE_RULES[repo.language]
    if (rules) {
      for (const rule of rules) {
        addSignal(acc, rule.skill, rule.category, {
          type: 'language',
          value: repo.language,
          repoName: repo.repoName,
          weight: rule.weight,
        }, repoDate)
      }
    }
  }

  // 3. Topics
  for (const topic of repo.topics) {
    const rules = TOPIC_RULES[topic.toLowerCase()]
    if (rules) {
      for (const rule of rules) {
        addSignal(acc, rule.skill, rule.category, {
          type: 'topic',
          value: topic,
          repoName: repo.repoName,
          weight: rule.weight,
        }, repoDate)
      }
    }
  }

  // 4. Detected files
  for (const file of repo.detectedFiles) {
    const rules = FILENAME_RULES[file]
    if (rules) {
      for (const rule of rules) {
        addSignal(acc, rule.skill, rule.category, {
          type: 'filename',
          value: file,
          repoName: repo.repoName,
          weight: rule.weight,
        }, repoDate)
      }
    }
  }

  // 5. Scripts (keyword matching inside script values)
  for (const [scriptName, scriptValue] of Object.entries(repo.scripts)) {
    const combined = `${scriptName} ${scriptValue}`.toLowerCase()
    for (const [keyword, rules] of Object.entries(SCRIPT_RULES)) {
      if (combined.includes(keyword)) {
        for (const rule of rules) {
          addSignal(acc, rule.skill, rule.category, {
            type: 'script',
            value: `scripts.${scriptName}: ${scriptValue.slice(0, 60)}`,
            repoName: repo.repoName,
            weight: rule.weight,
          }, repoDate)
        }
      }
    }
  }

  // 6. Description (regex patterns)
  if (repo.description) {
    for (const { pattern, rules } of DESCRIPTION_KEYWORDS) {
      if (pattern.test(repo.description)) {
        for (const rule of rules) {
          addSignal(acc, rule.skill, rule.category, {
            type: 'description',
            value: repo.description.slice(0, 80),
            repoName: repo.repoName,
            weight: rule.weight,
          }, repoDate)
        }
      }
    }
  }
}

// ─── Build report ─────────────────────────────────────────────────────────────

export function buildSkillsReport(analyses: RepoAnalysis[]): SkillsIntelligenceReport {
  const acc = new Map<string, SkillAcc>()

  for (const repo of analyses) {
    inferFromRepo(repo, acc)
  }

  // Deduplicate signals per (skill, repo, type) — same repo contributes one signal per type
  const seen = new Set<string>()
  const dedupedAcc = new Map<string, SkillAcc>()

  for (const [key, entry] of acc.entries()) {
    const deduped: SkillSignal[] = []
    let weight = 0

    for (const sig of entry.signals) {
      const dedupeKey = `${key}::${sig.repoName}::${sig.type}::${sig.value}`
      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey)
        deduped.push(sig)
        weight += sig.weight
      }
    }

    dedupedAcc.set(key, { ...entry, signals: deduped, totalWeight: weight })
  }

  // Convert to InferredSkill[], cap confidence at 100
  const skills: InferredSkill[] = []
  for (const entry of dedupedAcc.values()) {
    const sorted = entry.dates.sort()
    skills.push({
      name: entry.name,
      category: entry.category,
      confidence: Math.min(100, Math.round(entry.totalWeight)),
      signals: entry.signals,
      repoSources: [...entry.repoSources],
      firstSeen: sorted[0],
      lastSeen: sorted[sorted.length - 1],
    })
  }

  // Sort: confidence desc, then name asc
  skills.sort((a, b) => b.confidence - a.confidence || a.name.localeCompare(b.name))

  // Category breakdown
  const categoryBreakdown = {} as Record<SkillCategory, number>
  for (const skill of skills) {
    categoryBreakdown[skill.category] = (categoryBreakdown[skill.category] ?? 0) + 1
  }

  const topSkills = skills.slice(0, 12)

  const reposWithErrors = analyses.filter((a) => !!a.error).length

  return {
    generatedAt: new Date().toISOString(),
    reposAnalyzed: analyses.length,
    reposWithErrors,
    skills,
    categoryBreakdown,
    topSkills,
  }
}
