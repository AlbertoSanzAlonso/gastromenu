import { useMemo, useRef, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { siteContentDefaults } from '@/features/content/catalog'
import { composeHeroSlides, slideOffset, type HeroSlide } from '@/features/content/heroSlides'
import { HERO_SLIDE_MS, useHeroSlider } from '@/features/content/hooks/useHeroSlider'
import { useSiteContent } from '@/features/content/hooks/useSiteContent'

const HERO_TEXTURE = '/images/hero-texture.webp'

export function HeroSection() {
  const { read } = useSiteContent()
  const heroImage = read('hero_image', siteContentDefaults.hero_image)
  const heroTitle = read('hero_title', siteContentDefaults.hero_title)
  const heroQuote = read('hero_quote', siteContentDefaults.hero_quote)

  const slides = useMemo(
    () =>
      composeHeroSlides({
        id: 'actual',
        image: heroImage,
        alt: 'Imagen de portada de Gastromenu',
        label: 'Alta calidad en imagen gastronómica',
        title: heroTitle,
        quote: heroQuote,
      }),
    [heroImage, heroQuote, heroTitle],
  )

  const slider = useHeroSlider(slides.length)
  const slide = slides[slider.index] ?? slides[0]
  const mirrored = slider.index % 2 === 1
  const touch = useRef({ x: 0, armed: false })

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse') return
    if ((event.target as HTMLElement).closest('a, button')) return
    touch.current.x = event.clientX
    touch.current.armed = true
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    if (!touch.current.armed) return
    const delta = event.clientX - touch.current.x
    touch.current.armed = false
    if (delta > 48) slider.prev()
    else if (delta < -48) slider.next()
  }

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Presentación"
      data-paused={slider.paused ? 'true' : 'false'}
      className="hero-stage relative z-20 flex h-[calc(100svh-5rem)] min-h-[34rem] items-center overflow-hidden bg-black touch-pan-y md:h-[calc(100svh-6rem)]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        touch.current.armed = false
      }}
    >
      <HeroStage
        slides={slides}
        index={slider.index}
        reduced={slider.reduced}
        mirrored={mirrored}
      />

      <div
        className={`absolute inset-y-0 left-0 hidden w-1/2 transition-transform duration-[1600ms] ease-premium motion-reduce:transition-none lg:block ${
          mirrored ? 'translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden
      >
        <img
          src={HERO_TEXTURE}
          alt=""
          className={`h-full w-full object-cover ${
            mirrored
              ? 'object-left [mask-image:linear-gradient(to_right,transparent_0%,black_55%,black_100%)]'
              : 'scale-x-[-1] object-right [mask-image:linear-gradient(to_left,black_0%,black_45%,transparent_100%)]'
          }`}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] lg:bg-gradient-to-b lg:from-transparent lg:via-black/10 lg:to-black/35"
        aria-hidden
      />
      <div className="hero-mobile-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-[1] w-full transition-transform duration-[1600ms] ease-premium motion-reduce:transition-none lg:w-1/2 lg:via-black/10 lg:to-transparent ${
          mirrored
            ? 'lg:translate-x-full lg:bg-gradient-to-l lg:from-black/30'
            : 'lg:translate-x-0 lg:bg-gradient-to-r lg:from-black/30'
        }`}
        aria-hidden
      />

      <Container className="relative z-10 w-full py-12 md:py-16">
        <div className="hero-mobile-copy mx-auto max-w-3xl text-center lg:hidden">
          <h1 className="brand-title gold-shimmer mb-8 text-4xl md:text-6xl">GASTROMENU</h1>
          <BrandDivider className="mb-8" />
          {slide && (
            <div key={slide.id} className="hero-copy">
              <p className="brand-eyebrow mb-6 text-[11px] md:text-xs">{slide.label}</p>
              <EditorialTitle
                as="p"
                text={slide.title}
                className="slide-heading mb-6 text-4xl !leading-[1.05] text-cream md:text-5xl"
              />
              <p className="slide-body mb-8 text-lg italic text-cream-muted">«{slide.quote}»</p>
            </div>
          )}
          <p className="brand-caption mb-12">
            Fabricación propia desde 1998
            <br />
            in-house manufacturing since 1998
          </p>
          <Link to="/cartas">
            <Button
              variant="outline"
              size="lg"
              className="!border-gold-text/40 !text-cream hover:!border-gold-text hover:!text-gold-text"
            >
              Descubrir colección
            </Button>
          </Link>
        </div>

        <div
          className={`hidden max-w-5xl transition-transform duration-[1600ms] ease-premium motion-reduce:transition-none lg:block lg:max-w-[50%] ${
            mirrored ? 'lg:translate-x-full lg:text-right' : 'lg:translate-x-0 lg:text-left'
          }`}
        >
          {slide && (
            <div
              key={slide.id}
              className={`hero-letters ${mirrored ? 'origin-right' : 'origin-left'}`}
              style={slider.reduced ? undefined : { animationDuration: `${HERO_SLIDE_MS}ms` }}
            >
              <div className="hero-copy">
                <p className="slide-label mb-6 md:mb-8">{slide.label}</p>
                <EditorialTitle text={slide.title} />
                <blockquote className="mb-8 max-w-2xl md:mb-10">
                  <p className="slide-body text-xl italic text-cream-muted md:text-2xl">«{slide.quote}»</p>
                </blockquote>
              </div>
            </div>
          )}
          <Link to="/cartas">
            <Button
              variant="ghost"
              size="lg"
              className="!px-0 !py-0 !text-cream hover:!text-gold-slide cursor-pointer"
            >
              Descubrir colección
            </Button>
          </Link>
        </div>

      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="brand-caption text-mist">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}

function HeroStage({
  slides,
  index,
  reduced,
  mirrored,
}: {
  slides: HeroSlide[]
  index: number
  reduced: boolean
  mirrored: boolean
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-transform duration-[1600ms] ease-premium motion-reduce:transition-none lg:inset-y-0 lg:left-0 lg:w-1/2 ${
        mirrored
          ? 'lg:translate-x-0 lg:[mask-image:linear-gradient(to_left,transparent_0%,black_52%,black_100%)]'
          : 'lg:translate-x-full lg:[mask-image:linear-gradient(to_right,transparent_0%,black_52%,black_100%)]'
      }`}
      aria-hidden
    >
      {slides.map((item, position) => {
        const offset = slideOffset(position, index, slides.length)
        const active = position === index
        return (
          <div
            key={item.id}
            className="absolute inset-0 transition-[transform,opacity] duration-[1400ms] ease-premium motion-reduce:transition-none"
            style={{
              transform: `translate3d(${reduced ? 0 : offset * 6}%, 0, 0)`,
              opacity: active ? 1 : 0,
              zIndex: active ? 2 : 1,
            }}
          >
            <img
              src={item.image}
              alt=""
              className={`h-full w-full object-cover max-lg:blur-[6px] lg:blur-none ${active && !reduced ? 'hero-drift' : 'scale-[1.14]'}`}
              style={active && !reduced ? { animationDuration: `${HERO_SLIDE_MS}ms` } : undefined}
              loading={position === 0 ? 'eager' : 'lazy'}
              decoding={position === 0 ? 'sync' : 'async'}
            />
          </div>
        )
      })}
    </div>
  )
}

function EditorialTitle({
  text,
  className,
  as: Tag = 'h1',
}: {
  text: string
  className?: string
  as?: 'h1' | 'p'
}) {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  const safeLines = lines.length > 0 ? lines : [text]

  return (
    <Tag
      className={
        className ??
        'slide-heading mb-8 text-5xl !leading-[0.98] text-cream md:text-6xl lg:text-[4.6rem] xl:text-[5.5rem] 2xl:text-[6rem]'
      }
    >
      {safeLines.map((line, index) => {
        const words = line.split(/\s+/).filter(Boolean)
        const accent = index === safeLines.length - 1 && words.length > 1 ? words.pop() : undefined
        return (
          <span key={`${line}-${index}`} className="block whitespace-nowrap">
            {words.join(' ')}
            {accent ? (
              <>
                {' '}
                <GoldText>{accent}</GoldText>
              </>
            ) : null}
          </span>
        )
      })}
    </Tag>
  )
}
