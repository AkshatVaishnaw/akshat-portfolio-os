import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Akshat Vaishnaw — Senior Marketing & Operations Leader',
    template: '%s | Akshat Vaishnaw Portfolio OS',
  },
  description:
    'Senior Global Sales & Marketing Manager | Performance Marketing Expert | Operations Leader | $5M+ in Client Revenue Generated | 40+ Global Clients Served',
  keywords: [
    'Akshat Vaishnaw',
    'Senior Marketing Manager',
    'Performance Marketing',
    'Google Ads',
    'Meta Ads',
    'Operations Manager',
    'Digital Marketing Consultant',
    'Dubai Marketing Expert',
    'Lead Generation',
    'Shopify Expert',
  ],
  authors: [{ name: 'Akshat Vaishnaw' }],
  creator: 'Akshat Vaishnaw',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akshatvaishnaw.com',
    siteName: 'Akshat Vaishnaw Portfolio OS',
    title: 'Akshat Vaishnaw — Senior Marketing & Operations Leader',
    description:
      'Senior Global Sales & Marketing Manager with $5M+ in client revenue generated across 40+ global clients.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshat Vaishnaw — Senior Marketing & Operations Leader',
    description: 'Performance Marketing Expert | Operations Leader | 40+ Global Clients',
    creator: '@akshatvaishnaw',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
