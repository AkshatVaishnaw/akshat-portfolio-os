'use client'

import { motion } from 'framer-motion'
import { achievements } from '@/data/achievements'
import { Trophy } from 'lucide-react'

export function Achievements() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Track Record</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Key <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover"
            >
              <Trophy className="w-6 h-6 text-amber-400 mb-3" />
              {a.metric && (
                <div className="text-2xl font-bold gradient-text mb-2">{a.metric}</div>
              )}
              <h4 className="font-semibold text-sm mb-2">{a.title}</h4>
              <p className="text-xs text-muted-foreground">{a.description}</p>
              <div className="mt-3 text-xs text-muted-foreground/60 font-mono">{a.year}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
