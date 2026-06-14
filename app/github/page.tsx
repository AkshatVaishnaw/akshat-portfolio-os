import type { Metadata } from 'next'
import { GitHubInsights } from '@/components/github/GitHubInsights'

export const metadata: Metadata = {
  title: 'GitHub Insights',
  description: 'GitHub profile and repository insights for Akshat Vaishnaw.',
}

export default function GitHubPage() {
  return (
    <div className="pt-16">
      <GitHubInsights />
    </div>
  )
}
