'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { experiences, getExperienceByType } from '@/data/experience'
import { Building2, Users, Briefcase, Globe, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Experience } from '@/types'

const tabs: { key: Experience['type']; label: string; icon: React.ElementType }[] = [
  { key: 'corporate', label: 'Corporate', icon: Building2 },
  { key: 'agency', label: 'Agency', icon: Users },
  { key: 'consulting', label: 'Consulting', icon: Briefcase },
  { key: 'freelance', label: 'Freelance', icon: Globe },
]

function ExperienceCard({ exp }: { exp: Experience }) {
  const [expanded, setExpanded] = useState(false)
  const isPresent = exp.endDate === 'Present'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-border bg-card hover:border-indigo-500/20 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{exp.company[0]}</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold">{exp.role}</h3>
              {isPresent && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Current
                </span>
              )}
            </div>
            <p className="text-indigo-400 font-medium text-sm">{exp.company}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(exp.startDate)} — {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="p-1 hover:bg-muted rounded">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 space-y-6"
        >
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Responsibilities</h4>
            <ul className="space-y-2">
              {exp.description.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Key Achievements</h4>
            <ul className="space-y-2">
              {exp.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map(tech => (
                <span key={tech} className="px-2 py-1 text-xs rounded-lg bg-muted text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<Experience['type']>('corporate')
  const filtered = getExperienceByType(activeTab)

  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Career History</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-muted-foreground">
            8+ years across corporate roles, agency environments, consulting engagements, and freelance work.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className="text-xs opacity-60">({getExperienceByType(tab.key).length})</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map(exp => <ExperienceCard key={exp.id} exp={exp} />)
          ) : (
            <p className="text-center text-muted-foreground py-12">No experience in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
