import type { Metadata } from 'next'
import { DashboardView } from '@/components/sections/DashboardView'

export const metadata: Metadata = {
  title: 'Career Dashboard',
  description: 'Live career metrics dashboard for Akshat Vaishnaw.',
}

export default function Dashboard() {
  return <div className="pt-16"><DashboardView /></div>
}
