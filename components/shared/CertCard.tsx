'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import type { Certification } from '@/types'
import { formatDate } from '@/lib/utils'

interface Props {
  cert: Certification
}

export function CertCard({ cert }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
          <Award className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold leading-tight mb-1">{cert.name}</h4>
          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground/60">{formatDate(cert.date)}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{cert.category}</span>
          </div>
          {cert.url && (
            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
              Verify <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
