import type { Metadata } from 'next'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio of marketing, operations, and consulting projects by Akshat Vaishnaw.',
}

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsGrid />
    </div>
  )
}
