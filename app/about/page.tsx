import type { Metadata } from 'next'
import { About } from '@/components/sections/About'
import { Achievements } from '@/components/sections/Achievements'
import { certifications } from '@/data/certifications'
import { CertCard } from '@/components/shared/CertCard'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about Akshat Vaishnaw — Senior Marketing & Operations Leader with 8+ years of global experience.',
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <Achievements />
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Credentials</span>
            <h2 className="text-3xl font-bold mt-3 mb-4">
              Professional <span className="gradient-text">Certifications</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {certifications.map(cert => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
