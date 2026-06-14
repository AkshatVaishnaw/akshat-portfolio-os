'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, RefreshCw, GitBranch, Layers, AlertCircle,
  ChevronDown, ChevronUp, ExternalLink, Zap, CheckCircle2,
  TrendingUp, Clock, Database, Search, Filter,
} from 'lucide-react'
import type { SkillsIntelligenceReport, InferredSkill, SkillCategory } from '@/types'

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_META: Record<SkillCategory, { label: string; color: string; bg: string; glow: string }> = {
  'marketing': {
    label: 'Marketing',
    color: 'from-indigo-500 to-purple-500',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    glow: 'shadow-indigo-500/20',
  },
  'operations': {
    label: 'Operations',
    color: 'from-slate-500 to-gray-500',
    bg: 'bg-slate-500/10 border-slate-500/20',
    glow: 'shadow-slate-500/20',
  },
  'project-management': {
    label: 'Project Management',
    color: 'from-violet-500 to-indigo-500',
    bg: 'bg-violet-500/10 border-violet-500/20',
    glow: 'shadow-violet-500/20',
  },
  'frontend': {
    label: 'Frontend Dev',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10 border-blue-500/20',
    glow: 'shadow-blue-500/20',
  },
  'ui-ux': {
    label: 'UI/UX Design',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10 border-pink-500/20',
    glow: 'shadow-pink-500/20',
  },
  'shopify': {
    label: 'Shopify',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-500/10 border-green-500/20',
    glow: 'shadow-green-500/20',
  },
  'analytics': {
    label: 'Analytics',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10 border-amber-500/20',
    glow: 'shadow-amber-500/20',
  },
  'automation': {
    label: 'Automation',
    color: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    glow: 'shadow-cyan-500/20',
  },
  'ai-tools': {
    label: 'AI Tools',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10 border-purple-500/20',
    glow: 'shadow-purple-500/20',
  },
}

const SIGNAL_TYPE_LABEL: Record<string, string> = {
  dependency: 'npm dep',
  devDependency: 'npm devDep',
  language: 'language',
  topic: 'repo topic',
  filename: 'file detected',
  script: 'npm script',
  description: 'description',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  )
}

function SignalPill({ type, value }: { type: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-muted border border-border">
      <span className="text-muted-foreground">{SIGNAL_TYPE_LABEL[type] ?? type}:</span>
      <span className="font-mono text-xs truncate max-w-[160px]" title={value}>{value}</span>
    </span>
  )
}

function SkillCard({ skill, index }: { skill: InferredSkill; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const meta = CATEGORY_META[skill.category]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`rounded-xl border ${meta.bg} transition-all`}
    >
      <button
        className="w-full p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm truncate">{skill.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${meta.color} text-white font-medium flex-shrink-0`}>
                {meta.label}
              </span>
            </div>
            <ConfidenceBar value={skill.confidence} color={meta.color} />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <span className={`text-lg font-bold bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}>
                {skill.confidence}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitBranch className="w-3 h-3" />
              {skill.repoSources.length}
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-3">
              {/* Repo sources */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Detected in {skill.repoSources.length} {skill.repoSources.length === 1 ? 'repo' : 'repos'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.repoSources.map(repo => (
                    <span key={repo} className="text-xs px-2 py-1 rounded-lg bg-background border border-border font-mono">
                      {repo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signals */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Evidence signals ({skill.signals.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.signals.slice(0, 12).map((sig, i) => (
                    <SignalPill key={i} type={sig.type} value={sig.value} />
                  ))}
                  {skill.signals.length > 12 && (
                    <span className="text-xs text-muted-foreground px-2 py-0.5">
                      +{skill.signals.length - 12} more
                    </span>
                  )}
                </div>
              </div>

              {/* Date range */}
              {skill.firstSeen && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Last seen: {new Date(skill.lastSeen!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Category Panel ───────────────────────────────────────────────────────────

function CategoryPanel({
  category,
  skills,
  isActive,
  onClick,
}: {
  category: SkillCategory
  skills: InferredSkill[]
  isActive: boolean
  onClick: () => void
}) {
  const meta = CATEGORY_META[category]
  const avgConf = skills.length
    ? Math.round(skills.reduce((s, sk) => s + sk.confidence, 0) / skills.length)
    : 0

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border text-left transition-all ${
        isActive
          ? `${meta.bg} border-current`
          : 'border-border bg-card hover:border-muted-foreground/20'
      }`}
    >
      <div className={`text-xs font-semibold bg-gradient-to-r ${meta.color} bg-clip-text text-transparent uppercase tracking-wider mb-2`}>
        {meta.label}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{skills.length}</span>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">avg confidence</div>
          <div className="font-semibold text-sm">{avgConf}%</div>
        </div>
      </div>
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
          style={{ width: `${avgConf}%` }}
        />
      </div>
    </button>
  )
}

// ─── Placeholder State ────────────────────────────────────────────────────────

function PlaceholderState({ type }: { type: 'loading' | 'error' | 'no-token' }) {
  if (type === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative">
          <Brain className="w-16 h-16 text-indigo-400" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-indigo-500/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="text-center">
          <p className="font-semibold">Analysing GitHub repositories…</p>
          <p className="text-sm text-muted-foreground mt-1">Fetching dependencies, scanning files, running inference</p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-400"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'no-token') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 max-w-lg mx-auto text-center">
        <AlertCircle className="w-12 h-12 text-amber-400" />
        <h3 className="font-semibold text-lg">GitHub Token Required</h3>
        <p className="text-muted-foreground text-sm">
          The Skills Intelligence Engine needs a GitHub Personal Access Token to fetch
          repository contents (package.json, dependencies, file trees).
        </p>
        <div className="w-full p-4 rounded-xl bg-muted font-mono text-xs text-left space-y-1">
          <p className="text-muted-foreground"># .env.local</p>
          <p className="text-green-400">GITHUB_TOKEN=ghp_your_token_here</p>
          <p className="text-green-400">NEXT_PUBLIC_GITHUB_USERNAME=akshatvaishnaw</p>
        </div>
        <a
          href="https://github.com/settings/tokens/new?scopes=public_repo,read:user"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Generate Token on GitHub <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <AlertCircle className="w-12 h-12 text-red-400" />
      <p className="font-semibold">Failed to run Skills Intelligence Engine</p>
      <p className="text-sm text-muted-foreground">Check console for details.</p>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function SkillsIntelligenceDashboard() {
  const [report, setReport] = useState<SkillsIntelligenceReport | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'no-token'>('idle')
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [minConfidence, setMinConfidence] = useState(20)

  const load = useCallback(async (force = false) => {
    setStatus('loading')
    try {
      const url = force ? '/api/skills-intelligence?refresh=1' : '/api/skills-intelligence'
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        if (data?.error?.includes('No repositories')) {
          setStatus('no-token')
        } else {
          setStatus('error')
        }
        return
      }

      setReport(data)
      setStatus('idle')
      setLastRefresh(new Date())
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => { load() }, [load])

  // ── Derived data ────────────────────────────────────────────────────────────
  const skills = report?.skills ?? []

  const filtered = skills.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchConf = s.confidence >= minConfidence
    return matchCat && matchSearch && matchConf
  })

  const byCategory = (cat: SkillCategory) => skills.filter(s => s.category === cat)
  const categories = Object.keys(CATEGORY_META) as SkillCategory[]

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Skills Intelligence Engine</h1>
                <p className="text-sm text-muted-foreground">
                  Auto-inferred from GitHub repositories · {report?.reposAnalyzed ?? 0} repos analysed
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className="text-xs text-muted-foreground">
                Updated {lastRefresh.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={() => load(true)}
              disabled={status === 'loading'}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
              {status === 'loading' ? 'Analysing…' : 'Re-analyse'}
            </button>
          </div>
        </div>

        {/* ── Status states ─────────────────────────────────────────────────── */}
        {(status === 'loading' && !report) && <PlaceholderState type="loading" />}
        {status === 'no-token' && <PlaceholderState type="no-token" />}
        {status === 'error' && <PlaceholderState type="error" />}

        {report && (
          <>
            {/* ── Summary stats ───────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                {
                  icon: Zap,
                  label: 'Skills Detected',
                  value: skills.length,
                  color: 'from-indigo-500 to-purple-500',
                },
                {
                  icon: GitBranch,
                  label: 'Repos Analysed',
                  value: report.reposAnalyzed,
                  color: 'from-cyan-500 to-blue-500',
                },
                {
                  icon: Layers,
                  label: 'Categories',
                  value: Object.keys(report.categoryBreakdown).length,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: TrendingUp,
                  label: 'Avg Confidence',
                  value: skills.length
                    ? `${Math.round(skills.reduce((s, sk) => s + sk.confidence, 0) / skills.length)}%`
                    : '—',
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* ── Category grid ───────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
              <button
                onClick={() => setActiveCategory('all')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeCategory === 'all'
                    ? 'border-indigo-500/40 bg-indigo-500/10'
                    : 'border-border bg-card hover:border-muted-foreground/20'
                }`}
              >
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">All</div>
                <div className="text-2xl font-bold">{skills.length}</div>
                <div className="text-xs text-muted-foreground mt-1">skills</div>
              </button>

              {categories.map(cat => (
                <CategoryPanel
                  key={cat}
                  category={cat}
                  skills={byCategory(cat)}
                  isActive={activeCategory === cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? 'all' : cat)}
                />
              ))}
            </div>

            {/* ── Top skills radar (horizontal bar chart) ──────────────────── */}
            <div className="p-6 rounded-xl border border-border bg-card mb-10">
              <h3 className="font-semibold mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Top 10 Skills by Confidence
              </h3>
              <div className="space-y-3">
                {report.topSkills.slice(0, 10).map((skill, i) => {
                  const meta = CATEGORY_META[skill.category]
                  return (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}</span>
                      <span className="text-sm font-medium w-40 truncate flex-shrink-0">{skill.name}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.confidence}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
                        />
                      </div>
                      <span className="text-xs font-bold w-10 text-right">{skill.confidence}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${meta.color} text-white hidden sm:block`}>
                        {meta.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Search + filters ─────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search skills…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <label className="text-sm text-muted-foreground whitespace-nowrap">Min confidence:</label>
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={10}
                  value={minConfidence}
                  onChange={e => setMinConfidence(Number(e.target.value))}
                  className="w-28 accent-indigo-500"
                />
                <span className="text-sm font-medium w-8">{minConfidence}%</span>
              </div>
            </div>

            {/* ── Skills list ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filtered.length}</strong> of <strong>{skills.length}</strong> skills
                {activeCategory !== 'all' && ` in ${CATEGORY_META[activeCategory].label}`}
              </p>
              {report.reposWithErrors > 0 && (
                <p className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {report.reposWithErrors} repos had errors (partial data)
                </p>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <Database className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>No skills match your filters.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((skill, i) => (
                  <SkillCard key={`${skill.name}::${skill.category}`} skill={skill} index={i} />
                ))}
              </motion.div>
            )}

            {/* ── Engine metadata ──────────────────────────────────────────── */}
            <div className="mt-10 p-4 rounded-xl bg-muted/30 border border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                Report generated: {new Date(report.generatedAt).toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-indigo-400" />
                {report.reposAnalyzed} repos · {skills.reduce((s, sk) => s + sk.signals.length, 0)} total signals
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-400" />
                Skills Intelligence Engine v1.0
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
