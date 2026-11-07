import { Link, useLoaderData } from 'react-router-dom'
import type { DossierPageContent } from '@/data/dossierTypes'
import { dossierImageUrl } from '@/data/dossierTypes'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { Section } from '@/components/ui/Section'
import { localizeDossier } from '@/data/dossier/en'
import { useMessages } from '@/i18n/useMessages'
import { SEO } from '@/lib/seo/SEO'

export function BlogPage() {
  const loaded = useLoaderData() as DossierPageContent
  const { locale, m } = useMessages()
  const content = localizeDossier(loaded, locale)

  return (
    <>
      <SEO title={content.seoTitle} description={content.seoDescription} path={content.path} />

      <section className="bg-ink text-cream">
        <Container className="pt-12 pb-12 md:pt-16 md:pb-16">
          <p className="slide-label mb-6">{content.kicker}</p>
          <h1 className="slide-heading text-4xl md:text-6xl text-cream max-w-4xl text-balance">
            {content.title} {content.emphasis && <GoldText>{content.emphasis}</GoldText>}
          </h1>
          <BrandDivider className="!mx-0 mt-8 mb-6 max-w-[8rem]" />
          <p className="slide-body !text-cream-muted max-w-3xl text-lg md:text-xl">{content.lead}</p>
        </Container>
      </section>

      <Section variant="light" ariaLabel={m.blog.topics}>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {content.sections.map((topic) => {
            const image = topic.images[0]
            const title = [topic.title, topic.emphasis].filter(Boolean).join(' ')

            return (
              <article key={topic.id} className="slide-frame flex h-full flex-col overflow-hidden bg-beige-50">
                <Link to={`/blog/${topic.id}`} className="group flex h-full cursor-pointer flex-col">
                  {image && (
                    <div className="aspect-[16/10] overflow-hidden bg-ink-muted">
                      <img
                        src={dossierImageUrl(image)}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col px-7 py-7 md:px-8">
                    <p className="slide-label text-[10px] mb-4">{topic.kicker}</p>
                    <h2 className="slide-heading text-2xl md:text-3xl mb-3 text-balance">{title}</h2>
                    <p className="slide-body text-base line-clamp-3">{topic.paragraphs[0]}</p>
                    <span className="slide-label mt-6 text-[10px] text-gold-slide">{m.blog.read}</span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
