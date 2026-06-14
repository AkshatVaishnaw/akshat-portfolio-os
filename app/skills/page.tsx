import type { Metadata } from 'next'
import { SkillsPage } from '@/components/sections/SkillsPage'
import { SkillsIntelligenceDashboard } from '@/components/skills/SkillsIntelligenceDashboard'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Skills dashboard of Akshat Vaishnaw — Marketing, Operations, and Technical expertise — auto-inferred from GitHub repositories.',
}

export default function Skills() {
  return (
    <div className="pt-16">
      {/* Manual skills section */}
      <SkillsPage />

      <Separator className="my-2" />

      {/* AI-powered skills intelligence engine */}
      <SkillsIntelligenceDashboard />
    </div>
  )
}
