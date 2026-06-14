import type { Metadata } from 'next'
import { ExperiencePage } from '@/components/sections/ExperiencePage'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience of Akshat Vaishnaw — Corporate, Agency, Consulting & Freelance.',
}

export default function Experience() {
  return (
    <div className="pt-16">
      <ExperiencePage />
    </div>
  )
}
