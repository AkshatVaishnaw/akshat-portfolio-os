export interface Project {
  id: string
  slug: string
  name: string
  client: string
  industry: string
  problem: string
  solution: string
  technologies: string[]
  screenshots: string[]
  kpis: KPI[]
  results: string[]
  lessonsLearned: string[]
  description: string
  featured: boolean
  year: number
  category: 'marketing' | 'operations' | 'consulting' | 'design'
}

export interface KPI {
  label: string
  value: string
  change?: string
  positive?: boolean
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  duration: string
  role: string
  summary: string
  challenge: string
  approach: string[]
  solution: string
  results: KPI[]
  testimonial?: Testimonial
  technologies: string[]
  coverImage?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  type: 'corporate' | 'consulting' | 'freelance' | 'agency'
  location: string
  startDate: string
  endDate: string | 'Present'
  description: string[]
  achievements: string[]
  technologies: string[]
  logo?: string
}

export interface Skill {
  name: string
  level: number
  category: 'marketing' | 'operations' | 'technical' | 'design'
  years?: number
  icon?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  url?: string
  image?: string
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  metric?: string
  year: number
  category: string
  icon?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  content: string
  rating: number
  date: string
  project?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  coverImage?: string
  published: boolean
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  homepage: string | null
}

export interface GitHubProfile {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  html_url: string
  blog?: string
  location?: string
  company?: string
}

export interface DashboardStats {
  totalProjects: number
  clientsServed: number
  revenueGenerated: string
  campaignsManaged: number
  certifications: number
  yearsExperience: number
  countriesWorked: number
  teamMembersLed: number
}

// ─── Skills Intelligence Engine ─────────────────────────────────────────────

export type SkillCategory =
  | 'marketing'
  | 'operations'
  | 'project-management'
  | 'frontend'
  | 'ui-ux'
  | 'shopify'
  | 'analytics'
  | 'automation'
  | 'ai-tools'

export interface InferredSkill {
  name: string
  category: SkillCategory
  confidence: number         // 0–100, driven by signal count
  signals: SkillSignal[]     // every piece of evidence
  repoSources: string[]      // repos that contributed
  firstSeen?: string         // ISO date of oldest source repo
  lastSeen?: string          // ISO date of newest source repo
}

export interface SkillSignal {
  type: 'language' | 'dependency' | 'devDependency' | 'topic' | 'filename' | 'script' | 'description'
  value: string              // e.g. "react", "shopify", "package.json#scripts.build"
  repoName: string
  weight: number             // contribution to confidence score
}

export interface RepoAnalysis {
  repoName: string
  repoUrl: string
  language: string | null
  topics: string[]
  description: string | null
  updatedAt: string
  dependencies: Record<string, string>      // package.json deps
  devDependencies: Record<string, string>   // package.json devDeps
  detectedFiles: string[]                   // key filenames (requirements.txt, etc.)
  scripts: Record<string, string>           // package.json scripts
  error?: string
}

export interface SkillsIntelligenceReport {
  generatedAt: string
  reposAnalyzed: number
  reposWithErrors: number
  skills: InferredSkill[]
  categoryBreakdown: Record<SkillCategory, number>
  topSkills: InferredSkill[]
  newSinceLastRun?: string[]   // skill names added compared to last snapshot
}
