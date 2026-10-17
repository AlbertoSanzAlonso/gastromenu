import { SEO } from '@/lib/seo/SEO'
import { HeroSection } from '@/components/sections/HeroSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactCTA } from '@/components/sections/ContactCTA'

export function HomePage() {
  return (
    <>
      <SEO
        title="GASTROMENU"
        description="Cartas artesanales, manteles y atriles portamenú. Fabricación propia desde 1998."
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
