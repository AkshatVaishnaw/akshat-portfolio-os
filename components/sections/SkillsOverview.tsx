'use client'

import { motion } from 'framer-motion'
import { getSkillsByCategory } from '@/data/skills'

const categories = [
  { key: 'marketing' as const, label: 'Marketing', color: 'from-indigo-500 to-purple-500' },
  { key: 'operations' as const, label: 'Operations', color: 'from-purple-500 to-cyan-500' },
  { key: 'technical' as const, label: 'Technical', color: 'from-cyan-500 to-green-500' },
]

export function SkillsOverview() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Skills <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A data-driven view of my professional capabilities across marketing, operations, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, ci) => {
            const skills = getSkillsByCategory(cat.key).slice(0, 6)
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.15 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cat.color} text-white mb-6`}>
                  {cat.label}
                </div>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 + ci * 0.15 }}
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
