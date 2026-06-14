/**
 * GET /api/skills-intelligence
 *
 * Fetches all public repos, runs the full analysis + inference pipeline,
 * and returns a SkillsIntelligenceReport.
 *
 * Cached for 1 hour via Next.js ISR. Force-refresh by appending ?refresh=1.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubRepos } from '@/lib/github'
import { analyseAllRepos } from '@/lib/skills-engine/analyser'
import { buildSkillsReport } from '@/lib/skills-engine/inference'

export const revalidate = 3600

export async function GET(req: NextRequest) {
  try {
    const repos = await getGitHubRepos()

    if (!repos.length) {
      return NextResponse.json(
        { error: 'No repositories found. Check GITHUB_TOKEN and NEXT_PUBLIC_GITHUB_USERNAME.' },
        { status: 404 }
      )
    }

    const analyses = await analyseAllRepos(repos)
    const report = buildSkillsReport(analyses)

    return NextResponse.json(report, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[skills-intelligence]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
