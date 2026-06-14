'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, ArrowRight, Zap, AlertCircle } from 'lucide-react'
import type { SkillsIntelligenceReport, SkillCategory } from '@/types'

const CATEGORY_META: Record<SkillCategory, { label: string; color: string }> = {
  'marketing':          { label: 'Marketing',          color: 'from-indigo-500 to-purple-500' },
  'operations':         { label: 'Operations',         color: 'from-slate-500 to-gray-500' },
  'project-management': { label: 'Project Mgmt',       color: 'from-violet-500 to-indigo-500' },
  'frontend':           { label: 'Frontend',           color: 'from-blue-500 to-cyan-500' },
  'ui-ux':              { label: 'UI/UX',              color: 'from-pink-500 to-rose-500' },
  'shopify':            { label: 'Shopify',            color: 'from-green-500 to-emerald-500' },
  'analytics':          { label: 'Analytics',          color: 'from-amber-500 to-orange-500' },
  'automation':         { label: 'Automation',         color: 'from-cyan-500 to-teal-500' },
  'ai-tools':           { label: 'AI Tools',           color: 'from-purple-500 to-pink-500' },
}

export function SkillsEngineWidget() {
  const [report, setReport] = useState<SkillsIntelligenceReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/skills-intelligence')
      .then(r => r.json())
      .then(d => { setReport(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="p-6 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
          <span className="font-semibold text-sm">Skills Intelligence Engine</span>
          <span className="text-xs text-muted-foreground">Analysing repos…</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="p-6 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium">Skills Intelligence Engine offline</p>
          <p className="text-xs text-muted-foreground">Add GITHUB_TOKEN to .env.local to activate.</p>
        </div>
      </div>
    )
  }

  const categories = Object.entries(report.categoryBreakdown) as [SkillCategory, number][]
  categories.sort(([, a], [, b]) => b - a)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Skills Intelligence Engine</p>
            <p className="text-xs text-muted-foreground">
              {report.skills.length} skills auto-detected · {report.reposAnalyzed} repos analysed
            </p>
          </div>
        </div>
        <Link
          href="/skills-intelligence"
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Full Report <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
        {categories.map(([cat, count]) => {
          const meta = CATEGORY_META[cat]
          return (
            <Link key={cat} href={`/skills-intelligence?cat=${cat}`} className="group">
              <div className="p-3 rounded-lg bg-background border border-border hover:border-indigo-500/30 transition-all">
                <div className={`text-xs font-semibold bg-gradient-to-r ${meta.color} bg-clip-text text-transparent mb-1`}>
                  {meta.label}
                </div>
                <div className="text-xl font-bold">{count}</div>
                <div className="text-xs text-muted-foreground">skills</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Top skills pills */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Highest confidence skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {report.topSkills.slice(0, 8).map(skill => {
            const meta = CATEGORY_META[skill.category]
            return (
              <span
                key={skill.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-background border border-border"
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${meta.color}`} />
                {skill.name}
                <span className="text-muted-foreground">{skill.confidence}</span>
              </span>
            )
          })}
          <Link
            href="/skills-intelligence"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10 transition-colors"
          >
            <Zap className="w-3 h-3" /> +{report.skills.length - 8} more
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
