import type { Metadata } from 'next'
import { certifications } from '@/data/certifications'
import { CertCard } from '@/components/shared/CertCard'

export const metadata: Metadata = {
  title: 'Certifications',
  description: '12 professional certifications across Google, Meta, HubSpot, Shopify and more.',
}

export default function CertificationsPage() {
  const categories = Array.from(new Set(certifications.map(c => c.category)))

  return (
    <div className="pt-16 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Credentials</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Professional <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-muted-foreground">
            {certifications.length} certifications across {categories.length} categories — all current and verified.
          </p>
        </div>

        {categories.map(cat => (
          <div key={cat} className="mb-12">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-3">
              <span>{cat}</span>
              <span className="text-sm text-muted-foreground font-normal">
                ({certifications.filter(c => c.category === cat).length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {certifications.filter(c => c.category === cat).map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
