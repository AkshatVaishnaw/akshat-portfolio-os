import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsOverview } from '@/components/sections/SkillsOverview'
import { Testimonials } from '@/components/sections/Testimonials'
import { Achievements } from '@/components/sections/Achievements'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <SkillsOverview />
      <Achievements />
      <Testimonials />
      <CTA />
    </>
  )
}
