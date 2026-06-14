import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ecommerce-growth-engine',
    name: 'E-Commerce Growth Engine',
    client: 'Premium Fashion Brand',
    industry: 'E-Commerce / Retail',
    problem:
      'Client was spending $50K/month on ads with poor ROAS of 1.2x and declining revenue. No tracking infrastructure, no audience segmentation, and zero retargeting strategy.',
    solution:
      'Rebuilt the entire performance marketing stack: implemented GA4 + GTM, created full-funnel Meta & Google campaigns, built custom audiences, and set up automated reporting dashboards.',
    technologies: ['Meta Ads', 'Google Ads', 'GA4', 'GTM', 'Shopify', 'Klaviyo', 'Looker Studio'],
    screenshots: ['/images/projects/ecommerce-1.jpg'],
    kpis: [
      { label: 'ROAS Improvement', value: '4.8x', change: '+300%', positive: true },
      { label: 'Revenue Generated', value: '$1.2M', change: '+180%', positive: true },
      { label: 'CPA Reduction', value: '62%', positive: true },
      { label: 'Ad Spend Managed', value: '$50K/mo' },
    ],
    results: [
      'Scaled ROAS from 1.2x to 4.8x within 90 days',
      'Generated $1.2M in attributed revenue in Q1',
      'Reduced CPA by 62% through audience optimization',
      'Built automated reporting saving 10hrs/week',
    ],
    lessonsLearned: [
      'First-party data is the foundation of any successful paid media strategy',
      'Creative testing at scale requires a systematic framework, not guesswork',
      'Attribution models must align with business goals, not platform defaults',
    ],
    description: 'Complete performance marketing overhaul driving 300% ROAS improvement for premium fashion brand.',
    featured: true,
    year: 2024,
    category: 'marketing',
  },
  {
    id: '2',
    slug: 'b2b-lead-gen-system',
    name: 'B2B Lead Generation System',
    client: 'SaaS Technology Company',
    industry: 'B2B SaaS',
    problem:
      'Sales team had no consistent pipeline. Manual outreach, no CRM hygiene, and marketing/sales misalignment causing 80% lead leakage.',
    solution:
      'Designed and implemented a full B2B lead generation engine: LinkedIn Ads, content marketing, automated nurture sequences, HubSpot CRM setup, and sales-marketing alignment framework.',
    technologies: ['LinkedIn Ads', 'HubSpot', 'Apollo.io', 'Zapier', 'Google Ads', 'Typeform', 'Slack'],
    screenshots: ['/images/projects/b2b-1.jpg'],
    kpis: [
      { label: 'MQLs Generated', value: '340+', change: '+240%', positive: true },
      { label: 'Pipeline Value', value: '$2.8M', positive: true },
      { label: 'Lead-to-Demo Rate', value: '34%', change: '+180%', positive: true },
      { label: 'CAC Reduction', value: '45%', positive: true },
    ],
    results: [
      'Generated 340+ Marketing Qualified Leads in 6 months',
      'Built $2.8M sales pipeline from zero',
      'Improved lead-to-demo conversion by 180%',
      'Automated 70% of lead nurture workflows',
    ],
    lessonsLearned: [
      'B2B buying cycles require multi-touch attribution and patience',
      'Sales and marketing alignment is a process, not a meeting',
      'LinkedIn organic + paid is a powerful combination when done right',
    ],
    description: 'End-to-end B2B lead generation system generating $2.8M in pipeline for SaaS company.',
    featured: true,
    year: 2024,
    category: 'marketing',
  },
  {
    id: '3',
    slug: 'agency-operations-overhaul',
    name: 'Agency Operations Overhaul',
    client: 'Digital Marketing Agency',
    industry: 'Agency / Professional Services',
    problem:
      'Agency was growing fast but bleeding money due to poor processes: no SOPs, manual client reporting, no project management, and high team burnout.',
    solution:
      'Redesigned all operational systems: built SOPs for every department, implemented project management in Notion/ClickUp, automated client reporting, and created performance KPI framework.',
    technologies: ['Notion', 'ClickUp', 'Zapier', 'Looker Studio', 'Slack', 'HubSpot', 'Loom'],
    screenshots: ['/images/projects/agency-1.jpg'],
    kpis: [
      { label: 'Operational Efficiency', value: '+65%', positive: true },
      { label: 'Client Churn Reduction', value: '40%', positive: true },
      { label: 'Team Capacity Increase', value: '+30%', positive: true },
      { label: 'Reporting Time Saved', value: '15hrs/wk', positive: true },
    ],
    results: [
      'Documented 50+ SOPs across all departments',
      'Reduced client churn by 40% through better delivery',
      'Increased team capacity by 30% without new hires',
      'Saved 15 hours/week in manual reporting',
    ],
    lessonsLearned: [
      'Systems beat willpower: good processes outlast great people',
      'Clients stay when they feel informed and in control',
      'The best SOP is one the team actually follows',
    ],
    description: 'Complete operational transformation of a growing digital marketing agency.',
    featured: true,
    year: 2023,
    category: 'operations',
  },
  {
    id: '4',
    slug: 'shopify-store-launch',
    name: 'Shopify Store Launch & Scale',
    client: 'Health & Wellness Brand',
    industry: 'D2C Health & Wellness',
    problem:
      'New brand needed to launch from zero: no store, no audience, no marketing infrastructure. Had $30K budget and 90-day timeline to profitability.',
    solution:
      'End-to-end Shopify store build, brand identity, performance marketing launch, email/SMS setup, influencer partnerships, and PR strategy.',
    technologies: ['Shopify', 'Klaviyo', 'Meta Ads', 'Google Shopping', 'Attentive', 'Gorgias', 'Recharge'],
    screenshots: ['/images/projects/shopify-1.jpg'],
    kpis: [
      { label: 'Revenue (Month 3)', value: '$180K', positive: true },
      { label: 'Email List Built', value: '12,000+', positive: true },
      { label: 'ROAS', value: '3.6x', positive: true },
      { label: 'Repeat Purchase Rate', value: '38%', positive: true },
    ],
    results: [
      'Launched store to $180K revenue in 90 days',
      'Built email list of 12,000+ subscribers',
      'Achieved 3.6x ROAS on paid channels from day 1',
      '38% repeat purchase rate through LTV optimization',
    ],
    lessonsLearned: [
      'Launch momentum is hard to replicate — invest in the first 90 days',
      'Email list is the most valuable asset for D2C brands',
      'Product-market fit must be validated before scaling spend',
    ],
    description: 'Zero-to-launch Shopify store reaching $180K revenue in 90 days.',
    featured: false,
    year: 2023,
    category: 'marketing',
  },
  {
    id: '5',
    slug: 'global-campaign-management',
    name: 'Global Multi-Market Campaign',
    client: 'Enterprise Real Estate Platform',
    industry: 'Real Estate / PropTech',
    problem:
      'Enterprise client needed to run campaigns simultaneously across UAE, UK, USA, and Australia with different regulations, audiences, and creative requirements.',
    solution:
      'Built a global campaign management framework with market-specific strategies, localized creative systems, unified reporting dashboard, and cross-market budget optimization model.',
    technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Salesforce', 'Tableau', 'Power BI', 'Zapier'],
    screenshots: ['/images/projects/global-1.jpg'],
    kpis: [
      { label: 'Markets Managed', value: '4', positive: true },
      { label: 'Total Ad Spend', value: '$2M+', positive: true },
      { label: 'Qualified Leads', value: '8,400+', positive: true },
      { label: 'Avg. CPL Reduction', value: '38%', positive: true },
    ],
    results: [
      'Managed $2M+ in global ad spend across 4 markets',
      'Generated 8,400+ qualified leads in 12 months',
      'Reduced average CPL by 38% through cross-market learnings',
      'Built unified reporting system across all markets',
    ],
    lessonsLearned: [
      'Global campaigns need a framework, not just a copy-paste strategy',
      'Data centralization is the key to cross-market optimization',
      'Cultural nuance in creative matters more than platform mechanics',
    ],
    description: 'Multi-market campaign management across UAE, UK, USA & Australia with $2M+ in spend.',
    featured: true,
    year: 2024,
    category: 'marketing',
  },
  {
    id: '6',
    slug: 'crm-automation-implementation',
    name: 'CRM & Marketing Automation',
    client: 'Professional Services Firm',
    industry: 'Professional Services / Consulting',
    problem:
      'Firm had 500+ contacts spread across spreadsheets, Outlook, and paper notes. No pipeline visibility, no follow-up system, and losing deals to competitors with faster response times.',
    solution:
      'Implemented HubSpot CRM from scratch: data migration, custom pipeline setup, automated follow-up sequences, lead scoring model, and sales enablement materials.',
    technologies: ['HubSpot', 'Zapier', 'Gmail', 'Calendly', 'Loom', 'LinkedIn Sales Navigator', 'DocuSign'],
    screenshots: ['/images/projects/crm-1.jpg'],
    kpis: [
      { label: 'Deal Close Rate', value: '+55%', positive: true },
      { label: 'Response Time', value: '-80%', positive: true },
      { label: 'Pipeline Visibility', value: '100%', positive: true },
      { label: 'Revenue Increase', value: '+$400K', positive: true },
    ],
    results: [
      'Migrated 500+ contacts with full data integrity',
      'Increased deal close rate by 55%',
      'Reduced average response time from 48hrs to 4hrs',
      'Added $400K in tracked revenue in first year',
    ],
    lessonsLearned: [
      'CRM adoption is a change management project, not a tech project',
      'The best CRM is the one your team actually uses',
      'Automation should amplify human judgment, not replace it',
    ],
    description: 'Full CRM implementation and automation driving 55% improvement in deal close rate.',
    featured: false,
    year: 2023,
    category: 'operations',
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug)
export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter(p => p.category === category)
