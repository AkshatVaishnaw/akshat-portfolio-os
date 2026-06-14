'use client'

import { motion } from 'framer-motion'
import { skills, getSkillsByCategory } from '@/data/skills'
import { SkillsEngineWidget } from '@/components/skills/SkillsEngineWidget'

const categories = [
  { key: 'marketing' as const, label: 'Marketing Skills', color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-500/10' },
  { key: 'operations' as const, label: 'Operations Skills', color: 'from-purple-500 to-cyan-500', bg: 'bg-purple-500/10' },
  { key: 'technical' as const, label: 'Technical Skills', color: 'from-cyan-500 to-green-500', bg: 'bg-cyan-500/10' },
]

const toolLogos = [
  'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'HubSpot', 'Shopify', 'WordPress',
  'GA4', 'GTM', 'Klaviyo', 'Zapier', 'Notion', 'ClickUp',
  'Looker Studio', 'Salesforce', 'Semrush', 'Ahrefs',
]

export function SkillsPage() {
  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Expertise</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Skills <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A transparent, data-driven view of my professional capabilities. Numbers represent proficiency level, not ego.
          </p>
        </div>

        {/* Skills by category */}
        <div className="space-y-16">
          {categories.map((cat, ci) => {
            const catSkills = getSkillsByCategory(cat.key)
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`px-4 py-2 rounded-lg ${cat.bg} text-sm font-semibold bg-gradient-to-r ${cat.color} bg-clip-text`}>
                    <span className={`bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>{cat.label}</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">{catSkills.length} skills</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          {skill.years && (
                            <span className="ml-2 text-xs text-muted-foreground">{skill.years} yrs</span>
                          )}
                        </div>
                        <span className="text-sm font-bold gradient-text">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.05 + ci * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tool logos wall */}
        <div className="mt-20">
          <h2 className="text-xl font-semibold text-center mb-8">Tools & Platforms I Work With</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {toolLogos.map(tool => (
              <span key={tool} className="px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium hover:border-indigo-500/30 transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Intelligence Engine widget */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">GitHub-Powered</span>
            <h2 className="text-2xl font-bold mt-2 mb-1">
              Skills Intelligence <span className="gradient-text">Engine</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Automatically inferred from repository dependencies, languages, and file structures
            </p>
          </div>
          <SkillsEngineWidget />
        </div>
      </div>
    </div>
  )
}
