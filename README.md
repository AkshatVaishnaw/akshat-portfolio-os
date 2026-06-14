# Akshat Portfolio OS

Production-ready personal portfolio website as a Career Operating System.

## Tech Stack
- Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Shadcn/UI · next-themes

## Quick Start

```bash
npm install
cp .env.example .env.local  # fill in your values
npm run dev                   # http://localhost:3000
```

## Customize Content (edit these files)

| File | What to update |
|------|----------------|
| `data/projects.ts` | Projects, clients, KPIs, results |
| `data/experience.ts` | Work history |
| `data/skills.ts` | Skills & levels |
| `data/certifications.ts` | Certifications |
| `data/achievements.ts` | Career milestones |
| `data/testimonials.ts` | Client testimonials |

## Add Your Photo
Replace placeholder in `components/sections/Hero.tsx` with:
```tsx
<Image src="/images/akshat.jpg" alt="Akshat Vaishnaw" fill className="object-cover" />
```

## GitHub Integration
Add `GITHUB_TOKEN` and `NEXT_PUBLIC_GITHUB_USERNAME` to `.env.local`.
Token needs: `public_repo` + `read:user` scopes.

## Enable Resume Downloads
Place PDFs in `/public/resumes/` and update `components/sections/ResumeGenerator.tsx`.

## Contact Form
Connect to Resend, Formspree, or any email API in `app/api/contact/route.ts`.

## Deploy to Vercel
```bash
vercel
```
Add env vars in Vercel dashboard: `GITHUB_TOKEN`, `NEXT_PUBLIC_GITHUB_USERNAME`, `CONTACT_EMAIL`.

## Add New Projects
Edit `data/projects.ts` — project automatically appears in portfolio, dashboard, and featured section.
