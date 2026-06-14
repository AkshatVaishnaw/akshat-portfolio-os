'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ExternalLink, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'

const services = [
  'Performance Marketing (Google/Meta/LinkedIn Ads)',
  'Marketing Strategy & Consulting',
  'Operations Systems Design',
  'CRM & Marketing Automation',
  'Shopify Store Build & Growth',
  'Lead Generation Systems',
  'Team Building & Training',
  'Other / Custom Project',
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, connect to your email service (Resend, Formspree, etc.)
    setSubmitted(true)
  }

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Contact</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Let&apos;s Build Something <span className="gradient-text">Together</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to drive real results? Let&apos;s discuss your project and how I can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'stockologysocialmedia@gmail.com', href: 'mailto:stockologysocialmedia@gmail.com' },
                { icon: ExternalLink, label: 'LinkedIn', value: 'linkedin.com/in/akshatvaishnaw', href: 'https://linkedin.com/in/akshatvaishnaw' },
                { icon: MapPin, label: 'Location', value: 'Dubai, UAE — Open to Remote', href: null },
                { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-indigo-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What I can help with */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-4">I Can Help You With</h3>
              <ul className="space-y-2">
                {[
                  'Performance marketing campaigns',
                  'Marketing strategy & audits',
                  'Operations system design',
                  'CRM & automation setup',
                  'Team training & leadership',
                  'Fractional CMO / COO services',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center p-12 rounded-2xl border border-green-500/20 bg-green-500/5 text-center"
              >
                <div>
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Company</label>
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Service Needed *</label>
                  <select
                    required
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-sm"
                  >
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, goals, and timeline..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
