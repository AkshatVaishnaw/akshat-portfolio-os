import type { Metadata } from 'next'
import { SkillsIntelligenceDashboard } from '@/components/skills/SkillsIntelligenceDashboard'

export const metadata: Metadata = {
  title: 'Skills Intelligence Engine',
  description: 'AI-powered skill inference from GitHub repositories — auto-categorised into Marketing, Operations, Frontend, Shopify, Analytics, Automation, and AI Tools.',
}

export default function SkillsIntelligencePage() {
  return (
    <div className="pt-16">
      <SkillsIntelligenceDashboard />
    </div>
  )
}
