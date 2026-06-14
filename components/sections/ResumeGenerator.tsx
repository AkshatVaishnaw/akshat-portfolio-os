'use client'

import { motion } from 'framer-motion'
import { Download, FileText, Globe, Briefcase, BarChart3, Settings } from 'lucide-react'

const resumeTypes = [
  {
    id: 'us',
    title: 'US Resume',
    icon: Globe,
    description: 'ATS-optimized for the US market. Clean, concise, 1-page format.',
    color: 'from-blue-500 to-indigo-500',
    tags: ['ATS Optimized', '1 Page', 'US Format'],
  },
  {
    id: 'dubai',
    title: 'Dubai / UAE Resume',
    icon: Globe,
    description: 'Tailored for the UAE market with photo, nationality, and region-specific format.',
    color: 'from-indigo-500 to-purple-500',
    tags: ['UAE Format', 'Region Specific', '2 Pages'],
  },
  {
    id: 'marketing',
    title: 'Marketing Resume',
    icon: BarChart3,
    description: 'Focused on performance marketing, campaigns, and growth metrics.',
    color: 'from-purple-500 to-pink-500',
    tags: ['Marketing Focus', 'KPI Heavy', 'Campaign Metrics'],
  },
  {
    id: 'operations',
    title: 'Operations Resume',
    icon: Settings,
    description: 'Highlighting process design, team management, and operational excellence.',
    color: 'from-cyan-500 to-blue-500',
    tags: ['Operations Focus', 'Process Design', 'Team Leadership'],
  },
  {
    id: 'project-manager',
    title: 'Project Manager Resume',
    icon: Briefcase,
    description: 'PM-focused with project delivery, stakeholder management, and methodology.',
    color: 'from-green-500 to-cyan-500',
    tags: ['PM Focused', 'Agile/Scrum', 'Stakeholder Mgmt'],
  },
]

export function ResumeGenerator() {
  const handleDownload = (type: string) => {
    // In production: generate PDF server-side and serve download
    // This is a placeholder — replace with your actual PDF generation logic
    alert(`Download ${type} resume — connect to your PDF generation service (e.g., puppeteer, react-pdf, or a pre-generated PDF file).`)
  }

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Documents</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Resume <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select the right resume for the right opportunity. Each version is optimized for its specific market, role, and audience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeTypes.map((resume, i) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-indigo-500/30 transition-all card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resume.color} flex items-center justify-center mb-4`}>
                <resume.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-semibold mb-2">{resume.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{resume.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {resume.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                ))}
              </div>

              <button
                onClick={() => handleDownload(resume.id)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${resume.color} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </motion.div>
          ))}

          {/* View Online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-500/5 flex flex-col items-center justify-center text-center"
          >
            <FileText className="w-10 h-10 text-indigo-400 mb-3" />
            <h3 className="font-semibold mb-2">View Online Resume</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse my complete work history and skills in this portfolio.
            </p>
            <a
              href="/experience"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View Experience →
            </a>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-6 rounded-xl border border-border bg-muted/30"
        >
          <h3 className="font-semibold mb-3">🔧 Setup Instructions for Resume Downloads</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>To enable actual PDF downloads, choose one of these approaches:</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Add your resume PDFs to <code className="bg-muted px-1 rounded">/public/resumes/</code> and update the download links</li>
              <li>Use <strong>react-pdf</strong> to generate resumes dynamically from your data files</li>
              <li>Add a <strong>puppeteer</strong> API route to render and download the resume page as PDF</li>
              <li>Connect to a service like <strong>PDFShift</strong> or <strong>APIFlash</strong> for server-side PDF generation</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
