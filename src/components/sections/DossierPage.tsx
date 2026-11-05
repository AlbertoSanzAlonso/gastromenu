import { useEffect, useState } from 'react'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { Section } from '@/components/ui/Section'
import { SEO } from '@/lib/seo/SEO'
import { dossierImageUrl, type DossierPageContent, type DossierSection } from '@/data/dossierTypes'
import { localizeDossier } from '@/data/dossier/en'
import { useMessages } from '@/i18n/useMessages'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { DossierGallery } from '@/components/sections/DossierGallery'
import { ExpandableCopy } from '@/components/sections/ExpandableCopy'

function darkEdge(section?: DossierSection) {
  return section?.variant === 'dark' && section.images.length > 0
}

function edgeBesideDark(previous?: DossierSection, next?: DossierSection) {
  const top = darkEdge(previous)
  const bottom = darkEdge(next)
  if (top && bottom) return 'both' as const
  if (top) return 'top' as const
  if (bottom) return 'bottom' as const
}

const pageHeroWatermark: Record<string, string> = {
  '/cartas': '/images/web/inicio/01-cartas-menu-premium-1620x945.webp',
  '/atriles': '/images/web/inicio/02-atriles-portamenu-premium-1620x945.webp',
  '/manteles': '/images/web/inicio/03-manteles-premium-1620x945.webp',
  '/exclusividades': '/images/web/inicio/04-exclusividades-premium-1620x945.webp',
  '/nosotros': '/images/web/nosotros/nosotros-01.webp',
}

interface DossierPageProps {
  content: DossierPageContent
}

export function DossierPage({ content }: DossierPageProps) {
  const { locale, m } = useMessages()
  const page = localizeDossier(content, locale)
  const [openSection, setOpenSection] = useState<string | null>(null)
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
      <SEO title={page.seoTitle} description={page.seoDescription} path={page.path} />

      <section className="relative overflow-hidden bg-ink text-cream">
        {pageHeroWatermark[page.path] && (
          <img
            src={pageHeroWatermark[page.path]}
            alt=""
            aria-hidden
            decoding="async"
            className="dossier-hero-watermark"
          />
        )}
        <Container className="relative z-[1] pt-12 pb-12 md:pt-16 md:pb-16">
          <p className="slide-label mb-6">{page.kicker}</p>
          <h1 className="slide-heading text-4xl md:text-6xl text-cream max-w-4xl text-balance">
            {page.title}{' '}
            {page.emphasis && <GoldText>{page.emphasis}</GoldText>}
          </h1>
          <BrandDivider className="!mx-0 mt-8 mb-6 max-w-[8rem]" />
          <p className="slide-body !text-cream-muted max-w-3xl text-lg md:text-xl">{page.lead}</p>

          {page.sections.length > 1 && (
            <nav
              aria-label={m.dossier.sections}
              className="mt-10 flex flex-wrap gap-3"
            >
              {page.sections.map((section) => (
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

      {page.sections.map((section, index) => {
        const mirrored = index % 2 === 1
        const hasImages = section.images.length > 0

        return (
        <Section
          key={section.id}
          id={section.id}
          variant={section.variant}
          ariaLabel={section.nav}
          className="scroll-mt-24 md:scroll-mt-28"
          watermarkSrc={hasImages ? dossierImageUrl(section.images[0]) : undefined}
          edgeFade={
            section.variant === 'dark'
              ? undefined
              : edgeBesideDark(page.sections[index - 1], page.sections[index + 1])
          }
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
              <ExpandableCopy
                key={`${section.id}-${locale}`}
                paragraphs={section.paragraphs}
                highlights={section.highlights}
                mirrored={mirrored && hasImages}
                sectionId={section.id}
                open={openSection === section.id}
                onToggle={() =>
                  setOpenSection((current) => (current === section.id ? null : section.id))
                }
              />
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

      <ContactCTA fadeTop={darkEdge(page.sections.at(-1))} />
    </>
  )
}
