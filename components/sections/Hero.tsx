'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, ExternalLink, Mail, MapPin, Star, TrendingUp, Users, Award } from 'lucide-react'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'

const stats = [
  { label: 'Client Revenue Generated', value: 5, suffix: 'M+', prefix: '$', icon: TrendingUp },
  { label: 'Global Clients Served', value: 40, suffix: '+', icon: Users },
  { label: 'Years of Experience', value: 8, suffix: '+', icon: Star },
  { label: 'Certifications', value: 12, icon: Award },
]

const badges = [
  'Google Ads Expert',
  'Meta Ads Pro',
  'Marketing Operations',
  'Shopify Partner',
  'Lead Generation',
  'CRM Strategy',
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for New Opportunities
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
            >
              Senior{' '}
              <span className="gradient-text">Marketing &</span>
              <br />
              Operations{' '}
              <span className="gradient-text">Leader</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-6 max-w-lg"
            >
              I drive revenue growth and operational excellence for global brands. From $2M+ ad spend
              management to full-stack ops transformation — I build systems that scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Dubai, UAE — Open to Global Remote Opportunities</span>
            </motion.div>

            {/* Skill badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {badges.map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs rounded-full bg-muted border border-border text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resume"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition-all"
              >
                <Download className="w-4 h-4" /> Download Resume
              </Link>
              <a
                href="https://linkedin.com/in/akshatvaishnaw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition-all"
              >
                <ExternalLink className="w-4 h-4 text-blue-500" /> LinkedIn
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" /> Contact
              </Link>
            </motion.div>
          </div>

          {/* Right — Photo + Stats */}
          <div className="flex flex-col items-center gap-8">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-1">
                <div className="w-full h-full rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                  {/* Replace with actual photo: <Image src="/images/akshat.jpg" alt="Akshat Vaishnaw" fill className="object-cover" /> */}
                  <div className="text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">AV</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Akshat Vaishnaw</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Replace with your photo</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
                Open to Work
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-background border border-border shadow-lg text-xs font-medium">
                🌍 Dubai, UAE
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 w-full max-w-sm"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-colors card-hover"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={1500 + i * 200}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-indigo-500" />
        </motion.div>
      </div>
    </section>
  )
}
