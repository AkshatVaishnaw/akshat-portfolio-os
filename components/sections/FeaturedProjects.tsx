'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getFeaturedProjects } from '@/data/projects'
import { Badge } from '@/components/ui/badge'

export function FeaturedProjects() {
  const projects = getFeaturedProjects()

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {project.client} · {project.industry}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

                  {/* KPIs */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.kpis.slice(0, 2).map(kpi => (
                      <div key={kpi.label} className="p-2 rounded-lg bg-muted/50">
                        <div className="text-sm font-bold text-indigo-400">{kpi.value}</div>
                        <div className="text-xs text-muted-foreground truncate">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Case Study <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
