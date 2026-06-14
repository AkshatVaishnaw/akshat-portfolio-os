/**
 * Skills Intelligence Engine — Repo Analyser
 *
 * For each repo, we fetch:
 *  1. The root file tree (to detect key files like Dockerfile, .github/workflows, etc.)
 *  2. package.json  → dependencies, devDependencies, scripts
 *  3. requirements.txt / Pipfile / go.mod / Gemfile / Cargo.toml (language-specific)
 *
 * All fetches respect GitHub's rate limits with a shared header set.
 * Each repo fetch is independent — errors on one don't block others.
 */

import type { RepoAnalysis, GitHubRepo } from '@/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const BASE = 'https://api.github.com'

const ghHeaders = (): HeadersInit => ({
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function ghFetch(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: ghHeaders(),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchFileContent(owner: string, repo: string, path: string): Promise<string | null> {
  const data = await ghFetch(`${BASE}/repos/${owner}/${repo}/contents/${path}`) as {
    content?: string
    encoding?: string
  } | null
  if (!data || !data.content) return null
  try {
    return Buffer.from(data.content, 'base64').toString('utf-8')
  } catch {
    return null
  }
}

interface TreeItem { path: string; type: string }

async function fetchRootTree(owner: string, repo: string): Promise<string[]> {
  const data = await ghFetch(`${BASE}/repos/${owner}/${repo}/contents/`) as TreeItem[] | null
  if (!Array.isArray(data)) return []
  return data.map((f) => f.path)
}

async function fetchDeepTree(owner: string, repo: string, sha: string): Promise<string[]> {
  const data = await ghFetch(`${BASE}/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`) as {
    tree?: TreeItem[]
    truncated?: boolean
  } | null
  if (!data || !Array.isArray(data.tree)) return []
  return data.tree.map((f) => f.path)
}

// ─── Package.json parser ─────────────────────────────────────────────────────

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  scripts?: Record<string, string>
}

async function parsePackageJson(owner: string, repo: string): Promise<{
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  scripts: Record<string, string>
}> {
  const content = await fetchFileContent(owner, repo, 'package.json')
  if (!content) return { dependencies: {}, devDependencies: {}, scripts: {} }
  try {
    const pkg = JSON.parse(content) as PackageJson
    return {
      dependencies: pkg.dependencies ?? {},
      devDependencies: pkg.devDependencies ?? {},
      scripts: pkg.scripts ?? {},
    }
  } catch {
    return { dependencies: {}, devDependencies: {}, scripts: {} }
  }
}

// ─── Manifest detectors ──────────────────────────────────────────────────────

const DETECTABLE_FILES = [
  'requirements.txt',
  'Pipfile',
  'pyproject.toml',
  'Gemfile',
  'go.mod',
  'Cargo.toml',
  'Dockerfile',
  'docker-compose.yml',
  'docker-compose.yaml',
  '.github',
  'shopify.app.toml',
  'shopify.theme.toml',
  '.storybook',
  'storybook',
  'playwright.config.ts',
  'playwright.config.js',
  'cypress.config.ts',
  'cypress.config.js',
  'figma.json',
  'n8n',
  'zapier',
]

function detectFiles(rootPaths: string[]): string[] {
  const found: string[] = []
  for (const path of rootPaths) {
    for (const target of DETECTABLE_FILES) {
      if (path === target || path.startsWith(target + '/') || path.includes('/' + target)) {
        if (!found.includes(target)) found.push(target)
      }
    }
    // Special patterns
    if (path.endsWith('.liquid')) found.push('*.liquid')
    if (path.endsWith('.ipynb')) found.push('*.ipynb')
    if (path.includes('shopify')) found.push('shopify')
    if (path.includes('looker')) found.push('looker')
    if (path.includes('ga4') || path.includes('google-analytics')) found.push('ga4')
    if (path.includes('gtm') || path.includes('tag-manager')) found.push('gtm')
  }
  return [...new Set(found)]
}

// ─── Main: analyse a single repo ─────────────────────────────────────────────

export async function analyseRepo(repo: GitHubRepo): Promise<RepoAnalysis> {
  const [owner, repoName] = repo.full_name.split('/')

  const [rootPaths, { dependencies, devDependencies, scripts }] = await Promise.all([
    fetchRootTree(owner, repoName),
    parsePackageJson(owner, repoName),
  ])

  const detectedFiles = detectFiles(rootPaths)

  return {
    repoName: repo.name,
    repoUrl: repo.html_url,
    language: repo.language,
    topics: repo.topics ?? [],
    description: repo.description,
    updatedAt: repo.updated_at,
    dependencies,
    devDependencies,
    detectedFiles,
    scripts,
  }
}

// ─── Main: analyse all repos ──────────────────────────────────────────────────

export async function analyseAllRepos(repos: GitHubRepo[]): Promise<RepoAnalysis[]> {
  // Parallel with concurrency cap of 5 to avoid secondary-rate-limit
  const CONCURRENCY = 5
  const results: RepoAnalysis[] = []

  for (let i = 0; i < repos.length; i += CONCURRENCY) {
    const batch = repos.slice(i, i + CONCURRENCY)
    const settled = await Promise.allSettled(batch.map(analyseRepo))
    for (const s of settled) {
      if (s.status === 'fulfilled') {
        results.push(s.value)
      }
      // rejected — skip silently, caller gets partial data
    }
  }

  return results
}
