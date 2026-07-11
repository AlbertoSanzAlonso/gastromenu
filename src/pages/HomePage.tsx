import { SEO } from '@/lib/seo/SEO'
import { HeroSection } from '@/components/sections/HeroSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { AboutSection } from '@/components/sections/AboutSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactCTA } from '@/components/sections/ContactCTA'

export function HomePage() {
  return (
    <>
      <SEO
        title="GASTROMENU"
        description="Cartas artesanales premium para el alma de tu negocio. Fabricación propia desde 1997."
        path="/"
      />
      <HeroSection />
      <div className="relative z-10">
        <GallerySection />
        <AboutSection />
        <TeamSection />
        <ContactCTA />
      </div>
    </>
  )
}
