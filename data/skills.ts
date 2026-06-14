import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Marketing Skills
  { name: 'Google Ads', level: 95, category: 'marketing', years: 7 },
  { name: 'Meta Ads', level: 95, category: 'marketing', years: 7 },
  { name: 'LinkedIn Ads', level: 88, category: 'marketing', years: 5 },
  { name: 'Lead Generation', level: 95, category: 'marketing', years: 8 },
  { name: 'Marketing Automation', level: 85, category: 'marketing', years: 5 },
  { name: 'CRM Management', level: 90, category: 'marketing', years: 6 },
  { name: 'Email Marketing', level: 88, category: 'marketing', years: 6 },
  { name: 'Conversion Rate Optimization', level: 82, category: 'marketing', years: 5 },
  { name: 'Brand Strategy', level: 85, category: 'marketing', years: 6 },
  { name: 'Content Marketing', level: 80, category: 'marketing', years: 5 },

  // Operations Skills
  { name: 'SOP Creation', level: 95, category: 'operations', years: 6 },
  { name: 'Team Management', level: 90, category: 'operations', years: 5 },
  { name: 'Project Management', level: 92, category: 'operations', years: 7 },
  { name: 'Process Automation', level: 88, category: 'operations', years: 5 },
  { name: 'Budget Management', level: 90, category: 'operations', years: 6 },
  { name: 'Client Relations', level: 95, category: 'operations', years: 8 },
  { name: 'Strategic Planning', level: 88, category: 'operations', years: 5 },
  { name: 'Performance Analytics', level: 90, category: 'operations', years: 6 },

  // Technical Skills
  { name: 'Shopify', level: 90, category: 'technical', years: 5 },
  { name: 'WordPress', level: 82, category: 'technical', years: 6 },
  { name: 'SEO', level: 85, category: 'technical', years: 6 },
  { name: 'Google Analytics 4', level: 92, category: 'technical', years: 4 },
  { name: 'Google Tag Manager', level: 88, category: 'technical', years: 5 },
  { name: 'Looker Studio', level: 90, category: 'technical', years: 4 },
  { name: 'HubSpot', level: 92, category: 'technical', years: 5 },
  { name: 'Zapier', level: 85, category: 'technical', years: 4 },
  { name: 'Notion', level: 90, category: 'technical', years: 4 },
  { name: 'Power BI', level: 78, category: 'technical', years: 3 },
]

export const getSkillsByCategory = (category: Skill['category']) =>
  skills.filter(s => s.category === category)
