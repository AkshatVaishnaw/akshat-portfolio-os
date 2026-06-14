import type { GitHubProfile, GitHubRepo } from '@/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'akshatvaishnaw'

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const repos: GitHubRepo[] = await res.json()
    return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch {
    return []
  }
}

export async function getGitHubStats() {
  try {
    const [profile, repos] = await Promise.all([getGitHubProfile(), getGitHubRepos()])
    if (!profile) return null

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)
    const languages: Record<string, number> = {}
    repos.forEach(r => {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
    })

    return { profile, repos, totalStars, totalForks, languages }
  } catch {
    return null
  }
}
