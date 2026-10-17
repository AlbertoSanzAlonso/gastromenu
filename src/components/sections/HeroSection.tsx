import { useMemo, useRef, type KeyboardEvent, type PointerEvent } from 'react'
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
        caption: 'Portada',
      }),
    [heroImage],
  )

  const slider = useHeroSlider(slides.length)
  const slide = slides[slider.index] ?? slides[0]
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
      <HeroStage slides={slides} index={slider.index} reduced={slider.reduced} />

      <div className="absolute inset-y-0 left-0 hidden w-1/2 lg:block" aria-hidden>
        <img
          src={HERO_TEXTURE}
          alt=""
          className="h-full w-full scale-x-[-1] object-cover object-right [mask-image:linear-gradient(to_left,black_0%,black_45%,transparent_100%)]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/35 to-black/70 lg:from-transparent lg:via-black/10 lg:to-black/35"
        aria-hidden
      />
      <div className="hero-mobile-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-black via-black/85 to-transparent lg:w-1/2 lg:from-black/25 lg:via-black/10"
        aria-hidden
      />

      <Container className="relative z-10 w-full pt-6 pb-32 md:pt-8 md:pb-28">
        <div className="mx-auto max-w-3xl text-center lg:hidden">
          <h1 className="brand-title gold-shimmer mb-8 text-4xl md:text-6xl">GASTROMENU</h1>
          <BrandDivider className="mb-8" />
          <p className="brand-subtitle mb-6 text-sm leading-loose md:text-base">
            Cartas artesanales premium
            <br />
            para el alma de tu negocio
          </p>
          <BrandDivider className="mb-8" />
          <p className="brand-eyebrow mb-10 text-[11px] leading-loose md:text-xs">
            Premium handcrafted menus
            <br />
            for the soul of your business
          </p>
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

        <div className="hidden max-w-5xl lg:block lg:max-w-[50%]">
          <p className="slide-label mb-6 md:mb-8">Alta calidad en imagen gastronómica</p>
          <EditorialTitle text={heroTitle} />
          <blockquote className="mb-8 max-w-2xl md:mb-10">
            <p className="slide-body text-xl italic text-cream-muted md:text-2xl">«{heroQuote}»</p>
          </blockquote>
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

      {slide && (
        <div className="absolute inset-x-0 bottom-6 z-20 md:bottom-8">
          <Container>
            <HeroControls
              slides={slides}
              index={slider.index}
              caption={slide.caption}
              reduced={slider.reduced}
              held={slider.held}
              onPrev={slider.prev}
              onNext={slider.next}
              onGoTo={slider.goTo}
              onToggle={() => slider.setHeld((value) => !value)}
              onHover={slider.setHovering}
            />
          </Container>
        </div>
      )}

      <div
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 lg:flex"
        aria-hidden
      >
        <span className="brand-caption text-mist">Scroll</span>
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  )
}

function HeroStage({
  slides,
  index,
  reduced,
}: {
  slides: HeroSlide[]
  index: number
  reduced: boolean
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden opacity-80 lg:left-1/2 lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_55%,black_100%)]"
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
              className={`h-full w-full object-cover ${active && !reduced ? 'hero-drift' : 'scale-[1.14]'}`}
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

function HeroControls({
  slides,
  index,
  caption,
  reduced,
  held,
  onPrev,
  onNext,
  onGoTo,
  onToggle,
  onHover,
}: {
  slides: HeroSlide[]
  index: number
  caption: string
  reduced: boolean
  held: boolean
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
  onToggle: () => void
  onHover: (hovering: boolean) => void
}) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onNext()
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onPrev()
    }
  }

  return (
    <div
      className="mx-auto flex max-w-xl flex-col items-center lg:mx-0 lg:max-w-[46%] lg:items-start"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onHover(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') onHover(false)
      }}
    >
      <div className="flex w-full items-center justify-center gap-3 lg:justify-start">
        <SliderButton label="Imagen anterior" onClick={onPrev}>
          ‹
        </SliderButton>

        <div
          role="tablist"
          aria-label="Imágenes de portada"
          className="flex max-w-full gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={onKeyDown}
        >
          {slides.map((item, position) => {
            const active = position === index
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                aria-label={`${item.caption}, imagen ${position + 1} de ${slides.length}`}
                onClick={() => onGoTo(position)}
                className={`relative h-14 w-10 shrink-0 cursor-pointer overflow-hidden border transition-all duration-500 ease-premium focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold-slide sm:h-16 sm:w-12 ${
                  active
                    ? 'border-gold-slide opacity-100'
                    : 'border-cream/20 opacity-55 hover:border-cream/50 hover:opacity-100'
                }`}
              >
                <img src={item.image} alt="" className="h-full w-full object-cover" />
                {active && (
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px bg-gold-slide ${reduced ? '' : 'hero-progress'}`}
                    style={reduced ? undefined : { animationDuration: `${HERO_SLIDE_MS}ms` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <SliderButton label="Imagen siguiente" onClick={onNext}>
          ›
        </SliderButton>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <p key={caption} className="hero-caption brand-caption text-cream/80">
          {String(index + 1).padStart(2, '0')}
          <span className="mx-2 text-cream/35">/</span>
          {String(slides.length).padStart(2, '0')}
          <span className="mx-3 text-gold-slide/70">—</span>
          {caption}
        </p>
        <button
          type="button"
          aria-pressed={held}
          onClick={onToggle}
          className="brand-caption cursor-pointer text-cream/60 transition-colors duration-500 ease-premium hover:text-gold-slide focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold-slide"
        >
          {held ? 'Seguir' : 'Pausa'}
        </button>
      </div>
    </div>
  )
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-8 shrink-0 cursor-pointer items-center justify-center font-serif text-3xl leading-none text-cream/70 transition-colors duration-500 ease-premium hover:text-gold-slide focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold-slide"
    >
      <span aria-hidden>{children}</span>
    </button>
  )
}

function EditorialTitle({ text }: { text: string }) {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  const safeLines = lines.length > 0 ? lines : [text]

  return (
    <h1 className="slide-heading mb-8 text-5xl !leading-[0.98] text-cream md:text-6xl lg:text-[4.6rem] xl:text-[5.5rem] 2xl:text-[6rem]">
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
    </h1>
  )
}
