'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Target, Lightbulb, BarChart3, BookOpen, TrendingUp } from 'lucide-react'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/badge'

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="capitalize">{project.category}</Badge>
            {project.featured && <Badge className="bg-indigo-600">Featured</Badge>}
            <Badge variant="outline">{project.year}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{project.name}</h1>
          <p className="text-muted-foreground mb-2">{project.client} · {project.industry}</p>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10"
        >
          {project.kpis.map(kpi => (
            <div key={kpi.label} className="p-4 rounded-xl border border-border bg-card text-center">
              <div className="text-2xl font-bold gradient-text mb-1">{kpi.value}</div>
              {kpi.change && (
                <div className={`text-xs font-medium mb-1 ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.change}
                </div>
              )}
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        {[
          { icon: Target, title: 'The Problem', content: project.problem },
          { icon: Lightbulb, title: 'The Solution', content: project.solution },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="p-6 rounded-xl bg-muted/30 border border-border">
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          </motion.div>
        ))}

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Results Delivered</h2>
          </div>
          <div className="p-6 rounded-xl bg-muted/30 border border-border space-y-3">
            {project.results.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{r}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lessons Learned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">Lessons Learned</h2>
          </div>
          <div className="space-y-3">
            {project.lessonsLearned.map((lesson, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                <span className="text-indigo-400 font-mono text-sm flex-shrink-0">0{i + 1}</span>
                <p className="text-sm text-muted-foreground">{lesson}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
