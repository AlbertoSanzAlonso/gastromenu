import { useMessages } from '@/i18n/useMessages'
import { SEO } from '@/lib/seo/SEO'
import { HeroSection } from '@/components/sections/HeroSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactCTA } from '@/components/sections/ContactCTA'

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
        <CollectionsSection />
        <AboutSection />
        <TeamSection />
        <ContactCTA />
      </div>
    </>
  )
}
