import Link from 'next/link'
import { Zap, Mail, ExternalLink, GitBranch } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">
                <span className="gradient-text">Akshat</span>
                <span className="text-muted-foreground">.OS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Senior Global Marketing & Operations Leader. Building brands, driving revenue, and creating
              systems that scale.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="mailto:stockologysocialmedia@gmail.com"
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/akshatvaishnaw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/akshatvaishnaw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <GitBranch className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Portfolio</h4>
            <ul className="space-y-2">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/case-studies', label: 'Case Studies' },
                { href: '/skills', label: 'Skills' },
                { href: '/certifications', label: 'Certifications' },
                { href: '/achievements', label: 'Achievements' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Pages</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Me' },
                { href: '/experience', label: 'Experience' },
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/github', label: 'GitHub' },
                { href: '/resume', label: 'Resume' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Akshat Vaishnaw. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js 15, TypeScript & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
