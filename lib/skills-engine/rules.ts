/**
 * Skills Intelligence Engine — Inference Rules
 *
 * Each rule maps a detected signal (dependency name, language, topic, filename, script keyword)
 * to one or more skills with a confidence weight.
 *
 * Weight scale: 10 = weak hint, 30 = solid signal, 50 = definitive match
 * Multiple signals for the same skill stack additively (capped at 100).
 */

import type { SkillCategory } from '@/types'

export interface SkillRule {
  skill: string
  category: SkillCategory
  weight: number
}

// ─── Dependency → Skills ────────────────────────────────────────────────────

export const DEPENDENCY_RULES: Record<string, SkillRule[]> = {
  // ── Frontend ──────────────────────────────────────────────────────────────
  react: [{ skill: 'React', category: 'frontend', weight: 50 }],
  'react-dom': [{ skill: 'React', category: 'frontend', weight: 40 }],
  'react-router-dom': [{ skill: 'React Router', category: 'frontend', weight: 30 }],
  next: [{ skill: 'Next.js', category: 'frontend', weight: 50 }],
  vue: [{ skill: 'Vue.js', category: 'frontend', weight: 50 }],
  nuxt: [{ skill: 'Nuxt.js', category: 'frontend', weight: 50 }],
  svelte: [{ skill: 'Svelte', category: 'frontend', weight: 50 }],
  '@angular/core': [{ skill: 'Angular', category: 'frontend', weight: 50 }],
  'solid-js': [{ skill: 'SolidJS', category: 'frontend', weight: 40 }],
  astro: [{ skill: 'Astro', category: 'frontend', weight: 40 }],
  remix: [{ skill: 'Remix', category: 'frontend', weight: 40 }],
  gatsby: [{ skill: 'Gatsby', category: 'frontend', weight: 40 }],
  vite: [{ skill: 'Vite', category: 'frontend', weight: 30 }],
  webpack: [{ skill: 'Webpack', category: 'frontend', weight: 20 }],
  parcel: [{ skill: 'Parcel', category: 'frontend', weight: 20 }],
  'tailwindcss': [{ skill: 'Tailwind CSS', category: 'frontend', weight: 40 }],
  'styled-components': [{ skill: 'CSS-in-JS', category: 'frontend', weight: 30 }, { skill: 'styled-components', category: 'ui-ux', weight: 20 }],
  '@emotion/react': [{ skill: 'CSS-in-JS', category: 'frontend', weight: 30 }],
  sass: [{ skill: 'Sass/SCSS', category: 'frontend', weight: 30 }],
  less: [{ skill: 'Less CSS', category: 'frontend', weight: 20 }],
  typescript: [{ skill: 'TypeScript', category: 'frontend', weight: 40 }],

  // ── UI/UX ──────────────────────────────────────────────────────────────────
  'framer-motion': [{ skill: 'Framer Motion', category: 'ui-ux', weight: 40 }, { skill: 'UI Animation', category: 'ui-ux', weight: 30 }],
  'gsap': [{ skill: 'GSAP Animation', category: 'ui-ux', weight: 40 }],
  '@radix-ui/react-dialog': [{ skill: 'Radix UI', category: 'ui-ux', weight: 30 }],
  '@radix-ui/react-dropdown-menu': [{ skill: 'Radix UI', category: 'ui-ux', weight: 30 }],
  'shadcn': [{ skill: 'shadcn/ui', category: 'ui-ux', weight: 40 }],
  '@headlessui/react': [{ skill: 'Headless UI', category: 'ui-ux', weight: 30 }],
  'react-spring': [{ skill: 'React Spring', category: 'ui-ux', weight: 30 }, { skill: 'UI Animation', category: 'ui-ux', weight: 20 }],
  'lottie-react': [{ skill: 'Lottie Animation', category: 'ui-ux', weight: 30 }],
  'lucide-react': [{ skill: 'Icon Systems', category: 'ui-ux', weight: 20 }],
  '@mui/material': [{ skill: 'Material UI', category: 'ui-ux', weight: 40 }],
  'antd': [{ skill: 'Ant Design', category: 'ui-ux', weight: 40 }],
  'recharts': [{ skill: 'Data Visualization', category: 'analytics', weight: 30 }, { skill: 'Recharts', category: 'frontend', weight: 30 }],
  'd3': [{ skill: 'D3.js', category: 'analytics', weight: 40 }, { skill: 'Data Visualization', category: 'analytics', weight: 40 }],
  'chart.js': [{ skill: 'Chart.js', category: 'analytics', weight: 30 }, { skill: 'Data Visualization', category: 'analytics', weight: 20 }],
  'plotly.js': [{ skill: 'Plotly', category: 'analytics', weight: 30 }],
  'victory': [{ skill: 'Data Visualization', category: 'analytics', weight: 20 }],
  'visx': [{ skill: 'Data Visualization', category: 'analytics', weight: 20 }],

  // ── Shopify ────────────────────────────────────────────────────────────────
  '@shopify/polaris': [{ skill: 'Shopify Polaris', category: 'shopify', weight: 50 }, { skill: 'Shopify App Development', category: 'shopify', weight: 40 }],
  '@shopify/app-bridge': [{ skill: 'Shopify App Bridge', category: 'shopify', weight: 50 }, { skill: 'Shopify App Development', category: 'shopify', weight: 40 }],
  '@shopify/app-bridge-react': [{ skill: 'Shopify App Bridge', category: 'shopify', weight: 50 }],
  'shopify-api': [{ skill: 'Shopify API', category: 'shopify', weight: 50 }],
  '@shopify/shopify-api': [{ skill: 'Shopify API', category: 'shopify', weight: 50 }],
  'shopify-buy': [{ skill: 'Shopify Storefront API', category: 'shopify', weight: 40 }],
  '@shopify/hydrogen': [{ skill: 'Shopify Hydrogen', category: 'shopify', weight: 50 }],
  'shopify': [{ skill: 'Shopify Development', category: 'shopify', weight: 40 }],
  'node-shopify': [{ skill: 'Shopify API', category: 'shopify', weight: 40 }],

  // ── Analytics / Tracking ───────────────────────────────────────────────────
  'analytics': [{ skill: 'Analytics Integration', category: 'analytics', weight: 30 }],
  '@segment/analytics-next': [{ skill: 'Segment', category: 'analytics', weight: 40 }],
  'mixpanel-browser': [{ skill: 'Mixpanel', category: 'analytics', weight: 40 }],
  'posthog-js': [{ skill: 'PostHog', category: 'analytics', weight: 40 }],
  'react-ga4': [{ skill: 'Google Analytics 4', category: 'analytics', weight: 40 }],
  'react-ga': [{ skill: 'Google Analytics', category: 'analytics', weight: 30 }],
  '@google-analytics/data': [{ skill: 'Google Analytics API', category: 'analytics', weight: 40 }],
  'amplitude-js': [{ skill: 'Amplitude', category: 'analytics', weight: 40 }],
  'hotjar': [{ skill: 'Hotjar', category: 'analytics', weight: 30 }],
  'plausible-tracker': [{ skill: 'Plausible Analytics', category: 'analytics', weight: 30 }],
  'gtag': [{ skill: 'Google Tag Manager', category: 'analytics', weight: 30 }],

  // ── Marketing / CRM ───────────────────────────────────────────────────────
  'klaviyo': [{ skill: 'Klaviyo', category: 'marketing', weight: 40 }],
  'klaviyo-api': [{ skill: 'Klaviyo API', category: 'marketing', weight: 40 }],
  '@mailchimp/mailchimp_marketing': [{ skill: 'Mailchimp', category: 'marketing', weight: 40 }],
  'mailchimp-api-v3': [{ skill: 'Mailchimp', category: 'marketing', weight: 40 }],
  'hubspot': [{ skill: 'HubSpot', category: 'marketing', weight: 40 }],
  '@hubspot/api-client': [{ skill: 'HubSpot API', category: 'marketing', weight: 40 }],
  'stripe': [{ skill: 'Stripe Payments', category: 'marketing', weight: 30 }, { skill: 'E-Commerce', category: 'shopify', weight: 20 }],
  '@stripe/stripe-js': [{ skill: 'Stripe Payments', category: 'marketing', weight: 30 }],
  'react-facebook-pixel': [{ skill: 'Meta Pixel', category: 'marketing', weight: 40 }, { skill: 'Meta Ads', category: 'marketing', weight: 20 }],
  'facebook-nodejs-business-sdk': [{ skill: 'Meta Business API', category: 'marketing', weight: 50 }, { skill: 'Meta Ads', category: 'marketing', weight: 40 }],
  'google-ads-api': [{ skill: 'Google Ads API', category: 'marketing', weight: 50 }, { skill: 'Google Ads', category: 'marketing', weight: 40 }],
  'linkedin-api': [{ skill: 'LinkedIn Ads API', category: 'marketing', weight: 40 }],
  'sendgrid': [{ skill: 'SendGrid', category: 'marketing', weight: 30 }],
  '@sendgrid/mail': [{ skill: 'SendGrid', category: 'marketing', weight: 30 }],
  'resend': [{ skill: 'Email API', category: 'marketing', weight: 20 }],
  'nodemailer': [{ skill: 'Email Automation', category: 'marketing', weight: 20 }],

  // ── Automation / Workflow ─────────────────────────────────────────────────
  'zapier': [{ skill: 'Zapier', category: 'automation', weight: 40 }],
  'n8n': [{ skill: 'n8n Automation', category: 'automation', weight: 40 }],
  'bull': [{ skill: 'Job Queues', category: 'automation', weight: 30 }],
  'bullmq': [{ skill: 'Job Queues', category: 'automation', weight: 30 }],
  'agenda': [{ skill: 'Task Scheduling', category: 'automation', weight: 30 }],
  'node-cron': [{ skill: 'Task Scheduling', category: 'automation', weight: 20 }],
  'puppeteer': [{ skill: 'Browser Automation', category: 'automation', weight: 40 }],
  'playwright': [{ skill: 'Browser Automation', category: 'automation', weight: 40 }],
  'cheerio': [{ skill: 'Web Scraping', category: 'automation', weight: 30 }],
  'selenium-webdriver': [{ skill: 'Selenium', category: 'automation', weight: 30 }],
  'make': [{ skill: 'Make (Integromat)', category: 'automation', weight: 30 }],
  'airtable': [{ skill: 'Airtable', category: 'automation', weight: 30 }],
  'notion-client': [{ skill: 'Notion API', category: 'automation', weight: 30 }],
  '@notionhq/client': [{ skill: 'Notion API', category: 'automation', weight: 40 }],
  'slack': [{ skill: 'Slack Integration', category: 'automation', weight: 30 }],
  '@slack/web-api': [{ skill: 'Slack API', category: 'automation', weight: 40 }],
  'twilio': [{ skill: 'Twilio SMS', category: 'automation', weight: 30 }],
  'whatsapp-web.js': [{ skill: 'WhatsApp Automation', category: 'automation', weight: 30 }],

  // ── AI / ML Tools ─────────────────────────────────────────────────────────
  'openai': [{ skill: 'OpenAI API', category: 'ai-tools', weight: 50 }, { skill: 'AI Integration', category: 'ai-tools', weight: 40 }],
  '@anthropic-ai/sdk': [{ skill: 'Claude / Anthropic API', category: 'ai-tools', weight: 50 }, { skill: 'AI Integration', category: 'ai-tools', weight: 40 }],
  'anthropic': [{ skill: 'Claude / Anthropic API', category: 'ai-tools', weight: 50 }],
  'langchain': [{ skill: 'LangChain', category: 'ai-tools', weight: 50 }, { skill: 'AI Orchestration', category: 'ai-tools', weight: 40 }],
  '@langchain/core': [{ skill: 'LangChain', category: 'ai-tools', weight: 40 }],
  'llamaindex': [{ skill: 'LlamaIndex', category: 'ai-tools', weight: 40 }],
  'ai': [{ skill: 'Vercel AI SDK', category: 'ai-tools', weight: 40 }],
  '@ai-sdk/openai': [{ skill: 'Vercel AI SDK', category: 'ai-tools', weight: 40 }],
  'replicate': [{ skill: 'Replicate AI', category: 'ai-tools', weight: 40 }],
  'cohere-ai': [{ skill: 'Cohere AI', category: 'ai-tools', weight: 40 }],
  'huggingface': [{ skill: 'Hugging Face', category: 'ai-tools', weight: 40 }],
  '@huggingface/inference': [{ skill: 'Hugging Face API', category: 'ai-tools', weight: 40 }],
  'vectorize': [{ skill: 'Vector Search', category: 'ai-tools', weight: 30 }],
  'pinecone-client': [{ skill: 'Pinecone Vector DB', category: 'ai-tools', weight: 40 }],
  '@pinecone-database/pinecone': [{ skill: 'Pinecone Vector DB', category: 'ai-tools', weight: 40 }],
  'weaviate-ts-client': [{ skill: 'Weaviate', category: 'ai-tools', weight: 30 }],
  'chromadb': [{ skill: 'ChromaDB', category: 'ai-tools', weight: 30 }],
  'tensorflow': [{ skill: 'TensorFlow.js', category: 'ai-tools', weight: 40 }],
  '@tensorflow/tfjs': [{ skill: 'TensorFlow.js', category: 'ai-tools', weight: 40 }],
  'onnxruntime-web': [{ skill: 'ONNX Runtime', category: 'ai-tools', weight: 30 }],

  // ── Project Management / Operations ───────────────────────────────────────
  'jira': [{ skill: 'Jira Integration', category: 'project-management', weight: 30 }],
  'linear-app': [{ skill: 'Linear', category: 'project-management', weight: 30 }],
  '@linear/sdk': [{ skill: 'Linear API', category: 'project-management', weight: 40 }],
  'asana': [{ skill: 'Asana', category: 'project-management', weight: 30 }],
  'trello': [{ skill: 'Trello API', category: 'project-management', weight: 30 }],
  'github-api': [{ skill: 'GitHub API', category: 'project-management', weight: 30 }],
  '@octokit/rest': [{ skill: 'GitHub API / Octokit', category: 'project-management', weight: 40 }],
  'octokit': [{ skill: 'GitHub API / Octokit', category: 'project-management', weight: 40 }],

  // ── Backend (contributes to operations / automation) ──────────────────────
  'express': [{ skill: 'Express.js', category: 'automation', weight: 20 }],
  'fastify': [{ skill: 'Fastify', category: 'automation', weight: 20 }],
  'prisma': [{ skill: 'Prisma ORM', category: 'operations', weight: 30 }],
  'drizzle-orm': [{ skill: 'Drizzle ORM', category: 'operations', weight: 30 }],
  '@supabase/supabase-js': [{ skill: 'Supabase', category: 'operations', weight: 40 }],
  'firebase': [{ skill: 'Firebase', category: 'operations', weight: 30 }],
  'mongoose': [{ skill: 'MongoDB', category: 'operations', weight: 20 }],
  'redis': [{ skill: 'Redis', category: 'operations', weight: 20 }],
}

// ─── Language → Skills ──────────────────────────────────────────────────────

export const LANGUAGE_RULES: Record<string, SkillRule[]> = {
  TypeScript: [{ skill: 'TypeScript', category: 'frontend', weight: 40 }],
  JavaScript: [{ skill: 'JavaScript', category: 'frontend', weight: 30 }],
  Python: [{ skill: 'Python', category: 'automation', weight: 30 }],
  Ruby: [{ skill: 'Ruby', category: 'operations', weight: 20 }],
  'Liquid': [{ skill: 'Shopify Liquid', category: 'shopify', weight: 50 }],
  CSS: [{ skill: 'CSS', category: 'frontend', weight: 20 }],
  HTML: [{ skill: 'HTML/CSS', category: 'frontend', weight: 20 }],
  Go: [{ skill: 'Go', category: 'automation', weight: 20 }],
  Rust: [{ skill: 'Rust', category: 'frontend', weight: 20 }],
  Shell: [{ skill: 'Shell Scripting', category: 'automation', weight: 20 }],
  Jupyter: [{ skill: 'Data Analysis', category: 'analytics', weight: 30 }, { skill: 'Jupyter Notebooks', category: 'ai-tools', weight: 20 }],
  'Jupyter Notebook': [{ skill: 'Data Analysis', category: 'analytics', weight: 30 }, { skill: 'Jupyter Notebooks', category: 'ai-tools', weight: 30 }],
}

// ─── Topic → Skills ─────────────────────────────────────────────────────────

export const TOPIC_RULES: Record<string, SkillRule[]> = {
  shopify: [{ skill: 'Shopify Development', category: 'shopify', weight: 50 }],
  'shopify-app': [{ skill: 'Shopify App Development', category: 'shopify', weight: 50 }],
  'shopify-theme': [{ skill: 'Shopify Theme Development', category: 'shopify', weight: 50 }],
  'shopify-liquid': [{ skill: 'Shopify Liquid', category: 'shopify', weight: 50 }],
  ecommerce: [{ skill: 'E-Commerce', category: 'shopify', weight: 30 }],
  'e-commerce': [{ skill: 'E-Commerce', category: 'shopify', weight: 30 }],
  'google-ads': [{ skill: 'Google Ads', category: 'marketing', weight: 40 }],
  'meta-ads': [{ skill: 'Meta Ads', category: 'marketing', weight: 40 }],
  'facebook-ads': [{ skill: 'Meta Ads', category: 'marketing', weight: 40 }],
  'digital-marketing': [{ skill: 'Digital Marketing', category: 'marketing', weight: 30 }],
  marketing: [{ skill: 'Digital Marketing', category: 'marketing', weight: 20 }],
  seo: [{ skill: 'SEO', category: 'marketing', weight: 40 }],
  analytics: [{ skill: 'Analytics', category: 'analytics', weight: 30 }],
  dashboard: [{ skill: 'Dashboard Design', category: 'ui-ux', weight: 20 }, { skill: 'Data Visualization', category: 'analytics', weight: 20 }],
  automation: [{ skill: 'Process Automation', category: 'automation', weight: 40 }],
  workflow: [{ skill: 'Workflow Automation', category: 'automation', weight: 30 }],
  crm: [{ skill: 'CRM Systems', category: 'marketing', weight: 40 }],
  'lead-generation': [{ skill: 'Lead Generation', category: 'marketing', weight: 40 }],
  'project-management': [{ skill: 'Project Management', category: 'project-management', weight: 40 }],
  'ai': [{ skill: 'AI Integration', category: 'ai-tools', weight: 30 }],
  'machine-learning': [{ skill: 'Machine Learning', category: 'ai-tools', weight: 40 }],
  'llm': [{ skill: 'LLM Integration', category: 'ai-tools', weight: 40 }],
  'openai': [{ skill: 'OpenAI API', category: 'ai-tools', weight: 40 }],
  'chatgpt': [{ skill: 'ChatGPT Integration', category: 'ai-tools', weight: 30 }],
  'langchain': [{ skill: 'LangChain', category: 'ai-tools', weight: 40 }],
  'rag': [{ skill: 'RAG / Vector Search', category: 'ai-tools', weight: 40 }],
  'nextjs': [{ skill: 'Next.js', category: 'frontend', weight: 40 }],
  'react': [{ skill: 'React', category: 'frontend', weight: 40 }],
  'typescript': [{ skill: 'TypeScript', category: 'frontend', weight: 30 }],
  'tailwindcss': [{ skill: 'Tailwind CSS', category: 'frontend', weight: 30 }],
  'design-system': [{ skill: 'Design Systems', category: 'ui-ux', weight: 40 }],
  'ui-components': [{ skill: 'UI Component Libraries', category: 'ui-ux', weight: 30 }],
  'figma': [{ skill: 'Figma', category: 'ui-ux', weight: 40 }],
  'data-visualization': [{ skill: 'Data Visualization', category: 'analytics', weight: 40 }],
  'scraper': [{ skill: 'Web Scraping', category: 'automation', weight: 30 }],
  'web-scraping': [{ skill: 'Web Scraping', category: 'automation', weight: 40 }],
  'api': [{ skill: 'API Development', category: 'automation', weight: 20 }],
  'rest-api': [{ skill: 'REST API', category: 'automation', weight: 20 }],
  'graphql': [{ skill: 'GraphQL', category: 'automation', weight: 30 }],
  'supabase': [{ skill: 'Supabase', category: 'operations', weight: 40 }],
  'firebase': [{ skill: 'Firebase', category: 'operations', weight: 30 }],
  'notion': [{ skill: 'Notion', category: 'project-management', weight: 30 }],
}

// ─── Filename → Skills ───────────────────────────────────────────────────────

export const FILENAME_RULES: Record<string, SkillRule[]> = {
  'requirements.txt': [{ skill: 'Python', category: 'automation', weight: 30 }],
  'Pipfile': [{ skill: 'Python', category: 'automation', weight: 30 }],
  'pyproject.toml': [{ skill: 'Python', category: 'automation', weight: 30 }],
  'Gemfile': [{ skill: 'Ruby', category: 'operations', weight: 20 }],
  'go.mod': [{ skill: 'Go', category: 'automation', weight: 30 }],
  'Cargo.toml': [{ skill: 'Rust', category: 'frontend', weight: 20 }],
  'docker-compose.yml': [{ skill: 'Docker', category: 'operations', weight: 30 }],
  'Dockerfile': [{ skill: 'Docker', category: 'operations', weight: 30 }],
  '.github/workflows': [{ skill: 'GitHub Actions', category: 'automation', weight: 40 }],
  'k8s': [{ skill: 'Kubernetes', category: 'operations', weight: 30 }],
  'terraform': [{ skill: 'Terraform', category: 'operations', weight: 30 }],
  'shopify.app.toml': [{ skill: 'Shopify App Development', category: 'shopify', weight: 50 }],
  'shopify.theme.toml': [{ skill: 'Shopify Theme Development', category: 'shopify', weight: 50 }],
  '*.liquid': [{ skill: 'Shopify Liquid', category: 'shopify', weight: 50 }],
  'config.yml': [{ skill: 'Configuration Management', category: 'operations', weight: 10 }],
  'figma.json': [{ skill: 'Figma', category: 'ui-ux', weight: 30 }],
  'storybook': [{ skill: 'Storybook', category: 'ui-ux', weight: 30 }],
  '.storybook': [{ skill: 'Storybook', category: 'ui-ux', weight: 40 }],
  'cypress': [{ skill: 'Cypress Testing', category: 'operations', weight: 20 }],
  'playwright.config': [{ skill: 'Playwright', category: 'automation', weight: 30 }],
  'jupyter': [{ skill: 'Jupyter Notebooks', category: 'ai-tools', weight: 30 }],
  '*.ipynb': [{ skill: 'Jupyter Notebooks', category: 'ai-tools', weight: 30 }],
  'n8n': [{ skill: 'n8n Automation', category: 'automation', weight: 40 }],
  'zapier': [{ skill: 'Zapier', category: 'automation', weight: 30 }],
  'ga4': [{ skill: 'Google Analytics 4', category: 'analytics', weight: 30 }],
  'gtm': [{ skill: 'Google Tag Manager', category: 'analytics', weight: 30 }],
  'looker': [{ skill: 'Looker Studio', category: 'analytics', weight: 30 }],
}

// ─── Script keyword → Skills ─────────────────────────────────────────────────

export const SCRIPT_RULES: Record<string, SkillRule[]> = {
  'shopify': [{ skill: 'Shopify Development', category: 'shopify', weight: 30 }],
  'deploy': [{ skill: 'CI/CD', category: 'operations', weight: 10 }],
  'storybook': [{ skill: 'Storybook', category: 'ui-ux', weight: 30 }],
  'playwright': [{ skill: 'Playwright', category: 'automation', weight: 30 }],
  'cypress': [{ skill: 'Cypress Testing', category: 'operations', weight: 20 }],
  'jest': [{ skill: 'Jest Testing', category: 'operations', weight: 20 }],
  'prisma': [{ skill: 'Prisma ORM', category: 'operations', weight: 20 }],
}

// ─── Description keyword → Skills ────────────────────────────────────────────

export const DESCRIPTION_KEYWORDS: Array<{ pattern: RegExp; rules: SkillRule[] }> = [
  { pattern: /shopify/i, rules: [{ skill: 'Shopify Development', category: 'shopify', weight: 30 }] },
  { pattern: /google\s*ads/i, rules: [{ skill: 'Google Ads', category: 'marketing', weight: 30 }] },
  { pattern: /meta\s*ads|facebook\s*ads/i, rules: [{ skill: 'Meta Ads', category: 'marketing', weight: 30 }] },
  { pattern: /lead\s*gen/i, rules: [{ skill: 'Lead Generation', category: 'marketing', weight: 30 }] },
  { pattern: /crm/i, rules: [{ skill: 'CRM Systems', category: 'marketing', weight: 20 }] },
  { pattern: /seo/i, rules: [{ skill: 'SEO', category: 'marketing', weight: 30 }] },
  { pattern: /analytic/i, rules: [{ skill: 'Analytics', category: 'analytics', weight: 20 }] },
  { pattern: /automat/i, rules: [{ skill: 'Process Automation', category: 'automation', weight: 20 }] },
  { pattern: /dashboard/i, rules: [{ skill: 'Dashboard Design', category: 'ui-ux', weight: 20 }] },
  { pattern: /openai|gpt|llm|chatgpt/i, rules: [{ skill: 'OpenAI / LLM', category: 'ai-tools', weight: 30 }] },
  { pattern: /claude|anthropic/i, rules: [{ skill: 'Claude / Anthropic', category: 'ai-tools', weight: 30 }] },
  { pattern: /langchain/i, rules: [{ skill: 'LangChain', category: 'ai-tools', weight: 40 }] },
  { pattern: /project\s*manag/i, rules: [{ skill: 'Project Management', category: 'project-management', weight: 20 }] },
  { pattern: /workflow/i, rules: [{ skill: 'Workflow Design', category: 'project-management', weight: 20 }] },
  { pattern: /figma/i, rules: [{ skill: 'Figma', category: 'ui-ux', weight: 30 }] },
  { pattern: /ui.?ux|design\s*system/i, rules: [{ skill: 'UI/UX Design', category: 'ui-ux', weight: 30 }] },
  { pattern: /e.?commerce|ecomm/i, rules: [{ skill: 'E-Commerce', category: 'shopify', weight: 20 }] },
  { pattern: /scrape|spider|crawl/i, rules: [{ skill: 'Web Scraping', category: 'automation', weight: 30 }] },
  { pattern: /data.?viz|visualization|chart/i, rules: [{ skill: 'Data Visualization', category: 'analytics', weight: 20 }] },
]
