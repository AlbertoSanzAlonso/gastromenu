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
        title="GastroMenúPremium"
        description="Cartas de menú, manteles y portamenús de alta calidad para la hostelería. Excelencia artesanal, diseño premium y compromiso desde 1998."
        path="/"
      />
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <TeamSection />
      <ContactCTA />
    </>
  )
}
