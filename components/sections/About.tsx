'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Briefcase, Globe, Target, Zap } from 'lucide-react'

const strengths = [
  { icon: Target, title: 'Performance Marketing', desc: 'Google, Meta & LinkedIn Ads expert with $2M+/mo in managed spend' },
  { icon: Zap, title: 'Operations Architecture', desc: 'SOPs, process design, and team systems that scale without chaos' },
  { icon: Globe, title: 'Global Market Expertise', desc: 'Campaign management across UAE, UK, USA & Australia simultaneously' },
  { icon: Briefcase, title: 'Full-Funnel Strategy', desc: 'From awareness to acquisition, retention to advocacy — I own the full funnel' },
]

const timeline = [
  { year: '2022–Now', role: 'Senior Global Sales & Marketing Manager', company: 'Global Marketing Solutions, Dubai', color: 'from-indigo-500 to-purple-500' },
  { year: '2020–2022', role: 'Operations Manager & Perf. Marketing Lead', company: 'Performance Digital Agency, Dubai', color: 'from-purple-500 to-cyan-500' },
  { year: '2019–2020', role: 'Project Manager & Shopify Coordinator', company: 'E-Commerce Ventures, Remote', color: 'from-cyan-500 to-green-500' },
  { year: '2018–2019', role: 'Digital Marketing Consultant', company: 'Independent Consulting, Remote', color: 'from-green-500 to-yellow-500' },
  { year: '2016–2018', role: 'Lead Generation Specialist', company: 'Lead Generation Specialists, India', color: 'from-yellow-500 to-orange-500' },
]

export function About() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            The Person Behind the{' '}
            <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I&apos;m a Senior Marketing and Operations professional who thrives at the intersection of
            strategy and execution. My work generates real revenue, not vanity metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Professional Summary</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With 8+ years of experience spanning performance marketing, sales operations, and
                business consulting, I&apos;ve helped brands across the UAE, UK, USA, and Australia
                generate over <strong className="text-foreground">$5M+ in attributable revenue</strong>.
              </p>
              <p>
                My approach combines <strong className="text-foreground">data-driven marketing</strong>{' '}
                with <strong className="text-foreground">operational rigor</strong>. I don&apos;t just run
                campaigns — I build the systems, teams, and frameworks that make growth predictable and
                sustainable.
              </p>
              <p>
                Whether managing a $2M/month ad portfolio, rebuilding an agency&apos;s operations, or
                launching a D2C brand from zero, I bring the same obsession with metrics, process, and
                results.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 space-y-2">
              {[
                '8+ years in Performance Marketing & Operations',
                '$2M+/month in digital ad spend managed',
                '40+ clients across 12+ countries',
                'Team leader for 12+ marketing professionals',
                'Based in Dubai, UAE — Open to Global Opportunities',
              ].map(fact => (
                <div key={fact} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm">{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Career Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Career Journey</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-transparent" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="pl-10 relative"
                  >
                    <div className={`absolute left-2 top-2 w-4 h-4 rounded-full bg-gradient-to-br ${item.color} -translate-x-1/2`} />
                    <span className="text-xs text-muted-foreground font-mono">{item.year}</span>
                    <p className="font-semibold text-sm mt-0.5">{item.role}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Strengths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover"
            >
              <s.icon className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="font-semibold mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
