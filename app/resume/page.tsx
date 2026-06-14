import type { Metadata } from 'next'
import { ResumeGenerator } from '@/components/sections/ResumeGenerator'

export const metadata: Metadata = {
  title: 'Resume Generator',
  description: 'Download targeted resumes for different markets and roles.',
}

export default function ResumePage() {
  return <div className="pt-16"><ResumeGenerator /></div>
}
