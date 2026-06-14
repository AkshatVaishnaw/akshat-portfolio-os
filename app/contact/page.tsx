import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Akshat Vaishnaw for marketing, operations, or consulting projects.',
}

export default function Contact() {
  return <div className="pt-16"><ContactSection /></div>
}
