import type { Metadata } from 'next'
import { Achievements } from '@/components/sections/Achievements'
import { Testimonials } from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Key achievements and milestones in Akshat Vaishnaw\'s career.',
}

export default function AchievementsPage() {
  return (
    <div className="pt-16">
      <Achievements />
      <Testimonials />
    </div>
  )
}
