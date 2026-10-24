import { useEffect } from 'react'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { Section } from '@/components/ui/Section'
import { SEO } from '@/lib/seo/SEO'
import type { DossierPageContent } from '@/data/dossierTypes'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { DossierGallery } from '@/components/sections/DossierGallery'

interface DossierPageProps {
  content: DossierPageContent
}

export function DossierPage({ content }: DossierPageProps) {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <SEO title={content.seoTitle} description={content.seoDescription} path={content.path} />

      <section className="bg-ink text-cream">
        <Container className="pt-12 pb-12 md:pt-16 md:pb-16">
          <p className="slide-label mb-6">{content.kicker}</p>
          <h1 className="slide-heading text-4xl md:text-6xl text-cream max-w-4xl text-balance">
            {content.title}{' '}
            {content.emphasis && <GoldText>{content.emphasis}</GoldText>}
          </h1>
          <BrandDivider className="!mx-0 mt-8 mb-6 max-w-[8rem]" />
          <p className="slide-body !text-cream-muted max-w-3xl text-lg md:text-xl">{content.lead}</p>

          {content.sections.length > 1 && (
            <nav
              aria-label="Secciones"
              className="mt-10 flex flex-wrap gap-3"
            >
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="slide-label whitespace-nowrap border border-gold-slide/35 px-4 py-2 text-cream/90 hover:border-gold-slide hover:text-gold-slide transition-colors duration-400"
                >
                  {section.nav}
                </a>
              ))}
            </nav>
          )}
        </Container>
      </section>

      {content.sections.map((section, index) => {
        const mirrored = index % 2 === 1
        const hasImages = section.images.length > 0

        return (
        <Section
          key={section.id}
          id={section.id}
          variant={section.variant}
          ariaLabel={section.nav}
          className="scroll-mt-24 md:scroll-mt-28"
        >
          <div
            className={
              hasImages
                ? 'grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20'
                : undefined
            }
          >
            <header className={mirrored && hasImages ? 'lg:order-2 lg:text-right' : undefined}>
              <p className="slide-label mb-4">{section.kicker}</p>
              <h2 className="slide-heading text-3xl md:text-4xl lg:text-5xl text-balance">
                {section.title}{' '}
                {section.emphasis && <GoldText>{section.emphasis}</GoldText>}
              </h2>
              <div className="mt-6 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="slide-body">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.highlights && section.highlights.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {section.highlights.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 slide-body text-base ${mirrored ? 'lg:flex-row-reverse' : ''}`}
                    >
                      <span
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-slide"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {hasImages && (
              <div className={mirrored ? 'lg:order-1' : undefined}>
                <DossierGallery images={section.images} />
              </div>
            )}
          </div>
        </Section>
        )
      })}

      <ContactCTA />
    </>
  )
}
