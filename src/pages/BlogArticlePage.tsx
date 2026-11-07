import { Link, useLoaderData, useParams } from 'react-router-dom'
import type { DossierPageContent } from '@/data/dossierTypes'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { Section } from '@/components/ui/Section'
import { localizeDossier } from '@/data/dossier/en'
import { dossierImageUrl } from '@/data/dossierTypes'
import { useMessages } from '@/i18n/useMessages'
import { SEO } from '@/lib/seo/SEO'

const BOLD = /\*\*([^*]+)\*\*/g

function renderInline(text: string) {
  const nodes: Array<string | { bold: string }> = []
  let last = 0
  for (const match of text.matchAll(BOLD)) {
    const start = match.index ?? 0
    if (start > last) nodes.push(text.slice(last, start))
    nodes.push({ bold: match[1] })
    last = start + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))

  return nodes.map((node, index) =>
    typeof node === 'string' ? (
      node
    ) : (
      <strong key={index} className="font-bold">
        {node.bold}
      </strong>
    ),
  )
}

export function BlogArticlePage() {
  const loaded = useLoaderData() as DossierPageContent
  const { slug } = useParams()
  const { locale, m } = useMessages()
  const content = localizeDossier(loaded, locale)
  const article = content.sections.find((section) => section.id === slug)

  if (!article) {
    return (
      <Section variant="light" ariaLabel={m.blog.missing}>
        <p className="slide-body mb-8">{m.blog.missing}</p>
        <Link to="/blog" className="slide-label inline-flex cursor-pointer border border-gold-slide/35 px-4 py-2 hover:border-gold-slide">
          {m.blog.back}
        </Link>
      </Section>
    )
  }

  const title = [article.title, article.emphasis].filter(Boolean).join(' ')
  const image = article.images[0]
  const [lead, ...body] = article.paragraphs

  return (
    <>
      <SEO
        title={title}
        description={lead}
        path={`/blog/${article.id}`}
        image={image ? dossierImageUrl(image) : undefined}
        type="article"
      />

      <section className="bg-ink text-cream">
        <Container className="pt-12 pb-12 md:pt-16 md:pb-16">
          <Link
            to="/blog"
            className="slide-label mb-8 inline-flex cursor-pointer text-cream/80 hover:text-gold-slide transition-colors duration-400"
          >
            {m.blog.back}
          </Link>
          <p className="slide-label mb-6">{article.kicker}</p>
          <h1 className="slide-heading text-4xl md:text-6xl text-cream max-w-4xl text-balance">
            {article.title} {article.emphasis && <GoldText>{article.emphasis}</GoldText>}
          </h1>
          <BrandDivider className="!mx-0 mt-8 mb-6 max-w-[8rem]" />
          <p className="slide-body !text-cream-muted max-w-3xl text-lg md:text-xl">{lead}</p>
        </Container>
      </section>

      <Section variant="light" ariaLabel={title}>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {image && (
            <figure className="slide-frame overflow-hidden bg-ink-muted">
              <img
                src={dossierImageUrl(image)}
                alt={image.caption}
                className="aspect-[4/5] w-full object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
              />
              <figcaption className="slide-label px-5 py-4 text-[10px] text-stone">{image.caption}</figcaption>
            </figure>
          )}

          <div className="space-y-5 max-w-2xl">
            {body.map((paragraph) => (
              <p key={paragraph} className="slide-body text-lg">
                {renderInline(paragraph)}
              </p>
            ))}
            {article.highlights && article.highlights.length > 0 && (
              <ul className="space-y-3 pt-4">
                {article.highlights.map((item) => (
                  <li key={item} className="flex gap-3 slide-body text-base">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-slide" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
