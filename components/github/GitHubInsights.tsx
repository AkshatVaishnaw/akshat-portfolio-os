'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Star, GitFork, Code2, ExternalLink, Activity, Users, BookOpen } from 'lucide-react'
import type { GitHubProfile, GitHubRepo } from '@/types'

interface GitHubData {
  profile: GitHubProfile
  repos: GitHubRepo[]
  totalStars: number
  totalForks: number
  languages: Record<string, number>
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  'HTML': '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Java: '#B07219',
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const lang = repo.language
  const color = lang ? (LANGUAGE_COLORS[lang] || '#6366f1') : '#6366f1'

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="h-full p-5 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-sm group-hover:text-indigo-400 transition-colors truncate">
              {repo.name}
            </span>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0" />
        </div>

        {repo.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{repo.description}</p>
        )}

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map(topic => (
              <span key={topic} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{topic}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
          {lang && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {lang}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" /> {repo.forks_count}
          </span>
        </div>
      </div>
    </a>
  )
}

export function GitHubInsights() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="section-padding flex items-center justify-center min-h-96">
        <div className="text-center">
          <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading GitHub data...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="section-padding flex items-center justify-center min-h-96">
        <div className="text-center">
          <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Unable to load GitHub data.</p>
          <p className="text-xs text-muted-foreground">Add GITHUB_TOKEN to your .env.local file.</p>
          <p className="text-xs text-muted-foreground mt-1">Set NEXT_PUBLIC_GITHUB_USERNAME to your username.</p>
        </div>
      </div>
    )
  }

  const { profile, repos, totalStars, totalForks, languages } = data
  const totalLangs = Object.values(languages).reduce((a, b) => a + b, 0)

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">GitHub</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            GitHub <span className="gradient-text">Insights</span>
          </h1>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-border bg-card mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="w-20 h-20 rounded-full border-2 border-indigo-500/30"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold">{profile.name || profile.login}</h2>
              <p className="text-muted-foreground text-sm">@{profile.login}</p>
              {profile.bio && <p className="text-sm mt-2">{profile.bio}</p>}
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <GitBranch className="w-4 h-4" /> View on GitHub
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { label: 'Repos', value: profile.public_repos, icon: BookOpen },
                { label: 'Followers', value: profile.followers, icon: Users },
                { label: 'Stars', value: totalStars, icon: Star },
              ].map(stat => (
                <div key={stat.label}>
                  <stat.icon className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Repositories', value: profile.public_repos, icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
            { label: 'Total Stars', value: totalStars, icon: Star, color: 'from-amber-500 to-orange-500' },
            { label: 'Total Forks', value: totalForks, icon: GitFork, color: 'from-cyan-500 to-blue-500' },
            { label: 'Languages', value: Object.keys(languages).length, icon: Code2, color: 'from-green-500 to-emerald-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border border-border bg-card text-center"
            >
              <div className={`w-8 h-8 mx-auto rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-border bg-card mb-12"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" /> Languages Used
          </h3>
          <div className="flex h-4 rounded-full overflow-hidden mb-4">
            {Object.entries(languages).sort(([, a], [, b]) => b - a).map(([lang, count]) => (
              <div
                key={lang}
                style={{
                  width: `${(count / totalLangs) * 100}%`,
                  backgroundColor: LANGUAGE_COLORS[lang] || '#6366f1',
                }}
                title={lang}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(languages).sort(([, a], [, b]) => b - a).map(([lang, count]) => (
              <div key={lang} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[lang] || '#6366f1' }} />
                <span>{lang}</span>
                <span className="text-muted-foreground">{Math.round((count / totalLangs) * 100)}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Repos */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Repositories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
