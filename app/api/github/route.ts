import { NextResponse } from 'next/server'
import { getGitHubStats } from '@/lib/github'

export const revalidate = 3600

export async function GET() {
  const data = await getGitHubStats()
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
  return NextResponse.json(data)
}
