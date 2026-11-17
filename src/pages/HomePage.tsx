import { lazy, Suspense } from 'react'
import { useMessages } from '@/i18n/useMessages'
import { SEO } from '@/lib/seo/SEO'
import { HeroSection } from '@/components/sections/HeroSection'

const CollectionsSection = lazy(() =>
  import('@/components/sections/CollectionsSection').then((module) => ({
    default: module.CollectionsSection,
  })),
)
const AboutSection = lazy(() =>
  import('@/components/sections/AboutSection').then((module) => ({
    default: module.AboutSection,
  })),
)
const TeamSection = lazy(() =>
  import('@/components/sections/TeamSection').then((module) => ({
    default: module.TeamSection,
  })),
)
const ContactCTA = lazy(() =>
  import('@/components/sections/ContactCTA').then((module) => ({
    default: module.ContactCTA,
  })),
)

export function HomePage() {
  const { m } = useMessages()

  return (
    <>
      <SEO
        title={m.seo.homeTitle}
        description={m.seo.homeDescription}
        path="/"
      />
      <HeroSection />
      <div className="relative z-10">
        <Suspense fallback={null}>
          <CollectionsSection />
          <AboutSection />
          <TeamSection />
          <ContactCTA />
        </Suspense>
      </div>
    </>
  )
}
