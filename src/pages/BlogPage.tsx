import { Link, useLoaderData } from 'react-router-dom'
import type { DossierPageContent } from '@/data/dossierTypes'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { Section } from '@/components/ui/Section'
import { SEO } from '@/lib/seo/SEO'

export function BlogPage() {
  const content = useLoaderData() as DossierPageContent

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

      <Section variant="light" ariaLabel="Temas del blog">
        <div className="grid md:grid-cols-2 gap-6">
          {content.sections.map((topic, index) => (
            <article key={topic.id} className="slide-frame px-8 py-7">
              <p className="slide-label text-[10px] mb-4">0{index + 1}</p>
              <h2 className="slide-heading text-2xl mb-3">{topic.title}</h2>
              <p className="slide-body text-base">{topic.paragraphs[0]}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="slide-body mb-8">
            Mientras tanto, si quiere resolver un proyecto concreto, escríbanos.
          </p>
          <Link to="/contacto" className="inline-block cursor-pointer">
            <Button size="lg">Contactar</Button>
          </Link>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
