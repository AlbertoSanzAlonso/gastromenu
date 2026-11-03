import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { ABOUT_SECTION_WATERMARK_SRC } from '@/data/brand'
import { paragraphsOf } from '@/features/content/catalog'
import { useMessages } from '@/i18n/useMessages'
import { useSiteCopy } from '@/i18n/useSiteCopy'

export function AboutSection() {
  const { m } = useMessages()
  const { text } = useSiteCopy()
  const paragraphs = paragraphsOf(text('about_text'))

  return (
    <section
      id="nosotros"
      aria-label={m.home.aboutLabel}
      className="section-padding relative overflow-hidden bg-ink text-cream [&_.slide-heading]:text-cream [&_.slide-body]:text-cream-muted"
    >
      <div
        aria-hidden
        className="about-section__visual"
        style={{ backgroundImage: `url(${ABOUT_SECTION_WATERMARK_SRC})` }}
      />
      <div aria-hidden className="section-watermark-overlay section-watermark-overlay--about" />

      <Container className="relative z-[2]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <Heading as="h2" subtitle={m.home.aboutSubtitle}>
              {m.home.aboutTitleBefore} <GoldText>{m.home.aboutTitleAccent}</GoldText>
            </Heading>

            <blockquote className="relative slide-body text-xl md:text-2xl max-w-xl mb-8 pl-6 border-l border-gold-slide/40">
              <span className="slide-accent text-4xl leading-none absolute -left-1 -top-2" aria-hidden>
                "
              </span>
              {m.home.aboutQuote}
            </blockquote>

            <div className="space-y-6 slide-body max-w-xl">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:pt-8">
            {m.home.values.map((value, index) => (
              <article
                key={value.title}
                className="slide-frame bg-ink-soft/35 px-8 py-6"
              >
                <span className="slide-label text-[10px]">
                  0{index + 1}
                </span>
                <h3 className="slide-heading text-xl mt-3 mb-3">
                  {value.title}
                </h3>
                <p className="slide-body text-base">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
