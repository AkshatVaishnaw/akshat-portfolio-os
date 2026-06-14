'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Calendar } from 'lucide-react'

export function CTA() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-2xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl" />
          <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Let&apos;s Work Together</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4">
              Ready to <span className="gradient-text">Grow Your Business?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you need a performance marketing overhaul, operational system design, or strategic
              consulting — let&apos;s build something that generates real results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" /> Get In Touch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border hover:bg-muted font-semibold transition-all"
              >
                <Calendar className="w-4 h-4" /> View My Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
