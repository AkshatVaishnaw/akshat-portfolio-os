import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug } from '@/data/projects'
import { ProjectDetail } from '@/components/sections/ProjectDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()
  return (
    <div className="pt-16">
      <ProjectDetail project={project} />
    </div>
  )
}
