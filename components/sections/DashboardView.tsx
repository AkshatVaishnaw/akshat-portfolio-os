'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { projects } from '@/data/projects'
import { certifications } from '@/data/certifications'
import { achievements } from '@/data/achievements'
import { testimonials } from '@/data/testimonials'
import { experiences } from '@/data/experience'
import {
  TrendingUp, Users, Award, Briefcase, Globe, Star,
  BarChart3, DollarSign, Target, Zap
} from 'lucide-react'

const primaryStats = [
  { label: 'Revenue Generated', value: 5, prefix: '$', suffix: 'M+', icon: DollarSign, color: 'from-indigo-500 to-purple-500', desc: 'In attributable client revenue' },
  { label: 'Global Clients', value: 40, suffix: '+', icon: Users, color: 'from-purple-500 to-cyan-500', desc: 'Across 12+ countries' },
  { label: 'Campaigns Managed', value: 200, suffix: '+', icon: BarChart3, color: 'from-cyan-500 to-green-500', desc: 'Across all platforms' },
  { label: 'Ad Spend Managed', value: 2, prefix: '$', suffix: 'M+/mo', icon: Target, color: 'from-green-500 to-yellow-500', desc: 'Monthly at peak' },
  { label: 'Years Experience', value: 8, suffix: '+', icon: Briefcase, color: 'from-yellow-500 to-orange-500', desc: 'Across multiple industries' },
  { label: 'Countries Worked', value: 12, suffix: '+', icon: Globe, color: 'from-orange-500 to-red-500', desc: 'Remote & in-person' },
  { label: 'Certifications', value: certifications.length, icon: Award, color: 'from-red-500 to-pink-500', desc: 'Professional credentials' },
  { label: 'Avg. Client Rating', value: 5, icon: Star, suffix: '.0/5', color: 'from-pink-500 to-indigo-500', desc: 'Across all testimonials' },
]

export function DashboardView() {
  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Career Dashboard</h1>
            <p className="text-sm text-muted-foreground">Akshat Vaishnaw · Professional Metrics Overview</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {/* Primary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {primaryStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold">
                <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={1800} />
              </div>
              <div className="text-sm font-medium mt-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Data breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects by category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Projects by Type
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Marketing', count: projects.filter(p => p.category === 'marketing').length, color: 'bg-indigo-500' },
                { label: 'Operations', count: projects.filter(p => p.category === 'operations').length, color: 'bg-purple-500' },
                { label: 'Consulting', count: projects.filter(p => p.category === 'consulting').length, color: 'bg-cyan-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.count} projects</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.count / projects.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Experience Types
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Corporate', count: experiences.filter(e => e.type === 'corporate').length, color: 'bg-indigo-500' },
                { label: 'Agency', count: experiences.filter(e => e.type === 'agency').length, color: 'bg-purple-500' },
                { label: 'Consulting', count: experiences.filter(e => e.type === 'consulting').length, color: 'bg-cyan-500' },
                { label: 'Freelance', count: experiences.filter(e => e.type === 'freelance').length, color: 'bg-green-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certs by category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" /> Certifications ({certifications.length})
            </h3>
            <div className="space-y-2">
              {Array.from(new Set(certifications.map(c => c.category))).map(cat => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm">{cat}</span>
                  <span className="text-sm font-semibold text-indigo-400">
                    {certifications.filter(c => c.category === cat).length}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-6 rounded-xl border border-border bg-card"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" /> Client Satisfaction
          </h3>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text">{testimonials.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Testimonials</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">5.0</div>
              <div className="text-sm text-muted-foreground mt-1">Avg. Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
