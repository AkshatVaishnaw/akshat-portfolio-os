'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, Filter } from 'lucide-react'
import type { Project } from '@/types'

const categories: { key: Project['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'operations', label: 'Operations' },
  { key: 'consulting', label: 'Consulting' },
]

export function ProjectsGrid() {
  const [filter, setFilter] = useState<Project['category'] | 'all'>('all')
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Work Portfolio</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real campaigns, real results. Every project here generated measurable business impact.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat.key ? 'bg-indigo-600 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/projects/${project.slug}`} className="block group h-full">
                <div className="h-full flex flex-col p-6 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs capitalize">{project.category}</Badge>
                      {project.featured && (
                        <Badge className="text-xs bg-indigo-600">Featured</Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="font-semibold mb-1 group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{project.client} · {project.industry} · {project.year}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                  {/* Key results */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.kpis.slice(0, 2).map(kpi => (
                      <div key={kpi.label} className="p-2 rounded-lg bg-muted/50">
                        <div className="text-sm font-bold text-indigo-400">{kpi.value}</div>
                        <div className="text-xs text-muted-foreground truncate">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Case Study <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
