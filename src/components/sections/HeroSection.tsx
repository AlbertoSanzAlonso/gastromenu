import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'
import { siteContentDefaults } from '@/features/content/catalog'
import { composeHeroSlides, mockHeroSlides, slideOffset, type HeroSlide } from '@/features/content/heroSlides'
import { HERO_CROSSFADE_MS, HERO_SLIDE_MS, useHeroSlider } from '@/features/content/hooks/useHeroSlider'
import { useSiteContent } from '@/features/content/hooks/useSiteContent'
import { useMessages } from '@/i18n/useMessages'
import { useSiteCopy } from '@/i18n/useSiteCopy'

const HERO_TEXTURE = '/images/hero-texture.webp'
const HERO_SWAP_MS = 1600

export function HeroSection() {
  const { m } = useMessages()
  const { read } = useSiteContent()
  const { text } = useSiteCopy()
  const heroImage = read('hero_image', siteContentDefaults.hero_image)
  const heroTitle = text('hero_title')
  const heroQuote = text('hero_quote')
  const extras = useMemo(
    () =>
      mockHeroSlides.map((slide, index) => ({
        ...slide,
        ...m.hero.slides[index],
      })),
    [m],
  )

  const slides = useMemo(
    () =>
      composeHeroSlides(
        {
          id: 'actual',
          image: heroImage,
          alt: m.hero.coverAlt,
          label: m.hero.coverLabel,
          title: heroTitle,
          quote: heroQuote,
        },
        extras,
      ),
    [extras, heroImage, heroQuote, heroTitle, m.hero.coverAlt, m.hero.coverLabel],
  )

  const slider = useHeroSlider(slides.length)
  const slide = slides[slider.index] ?? slides[0]
  const mirrored = slider.index % 2 === 1
  const [alignRight, setAlignRight] = useState(mirrored)
  const touch = useRef({ x: 0, armed: false })
  useEffect(() => {
    if (alignRight === mirrored) return
    // Coincide con hero-copy-out (~40% del crossfade): al desaparecer las letras.
    const id = window.setTimeout(() => setAlignRight(mirrored), Math.round(HERO_CROSSFADE_MS * 0.4))
    return () => window.clearTimeout(id)
  }, [mirrored, alignRight])

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
      aria-roledescription={m.hero.carousel}
      aria-label={m.hero.presentation}
      data-paused={slider.paused ? 'true' : 'false'}
      className="hero-stage relative z-20 flex h-[calc(100svh-5rem)] min-h-[34rem] items-center overflow-hidden bg-black touch-pan-y md:h-[calc(100svh-6rem)]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        touch.current.armed = false
      }}
    >
      <HeroTexturePanels mirrored={mirrored} />

      <HeroStage slides={slides} index={slider.index} mirrored={mirrored} />

      <div
        className="pointer-events-none absolute inset-0 z-[1] lg:bg-gradient-to-b lg:from-transparent lg:via-black/10 lg:to-black/35"
        aria-hidden
      />
      <div className="hero-mobile-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <Container className="relative z-10 w-full py-12 md:py-16">
        <div className="hero-mobile-copy mx-auto min-h-[28rem] max-w-3xl text-center md:min-h-[32rem] lg:hidden">
          <h1 className="brand-title gold-shimmer mb-8 text-3xl sm:text-4xl md:text-5xl">GastroMenú Premium</h1>
          <BrandDivider className="mb-8" />
          {slide && (
            <FadingCopy
              slide={slide}
              letterMotion={slider.index === 0 ? 'grow' : 'shrink'}
              originClassName="origin-center"
            >
              {(item) => (
                <>
                  <p className="brand-eyebrow mb-6 text-[11px] md:text-xs">{item.label}</p>
                  <EditorialTitle
                    as="p"
                    text={item.title}
                    className="slide-heading mb-6 text-4xl !leading-[1.05] text-cream md:text-5xl"
                  />
                  <p className="slide-body mb-8 text-lg italic leading-relaxed text-cream">«{item.quote}»</p>
                </>
              )}
            </FadingCopy>
          )}
          <p className="brand-caption">{m.hero.since}</p>
        </div>

        <div
          className={`hidden max-w-5xl transition-transform duration-[1600ms] ease-in-out lg:block lg:min-h-[24rem] lg:max-w-[50%] ${
            mirrored ? 'lg:translate-x-full' : 'lg:translate-x-0'
          } ${alignRight ? 'lg:text-right' : 'lg:text-left'}`}
        >
          {slide && (
            <FadingCopy
              slide={slide}
              letterMotion={slider.index === 0 ? 'grow' : 'shrink'}
              originClassName={alignRight ? 'origin-right' : 'origin-left'}
            >
              {(item) => (
                <>
                  <p className="slide-label mb-6 md:mb-8">{item.label}</p>
                  <EditorialTitle text={item.title} />
                  <blockquote className="mb-8 max-w-2xl md:mb-10">
                    <p className="slide-body text-xl italic text-cream-muted md:text-2xl">«{item.quote}»</p>
                  </blockquote>
                </>
              )}
            </FadingCopy>
          )}
        </div>

      </Container>

      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <Link to="/cartas">
          <Button
            variant="outline"
            size="lg"
            className="!border-gold-text/40 !text-cream hover:!border-gold-text hover:!text-gold-text"
          >
            {m.hero.discover}
          </Button>
        </Link>
      </div>
    </section>
  )
}

function HeroTexturePanels({ mirrored }: { mirrored: boolean }) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const prevMirrored = useRef(mirrored)
  const booted = useRef(false)

  useLayoutEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    const showRight = mirrored
    if (!booted.current) {
      booted.current = true
      prevMirrored.current = mirrored
      left.style.opacity = showRight ? '0' : '1'
      right.style.opacity = showRight ? '1' : '0'
      return
    }

    if (prevMirrored.current === mirrored) return
    prevMirrored.current = mirrored

    const outgoing = showRight ? left : right
    const incoming = showRight ? right : left

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      outgoing.style.opacity = '0'
      incoming.style.opacity = '1'
      return
    }

    for (const panel of [outgoing, incoming]) {
      panel.getAnimations().forEach((animation) => animation.cancel())
    }

    outgoing.animate(
      [
        { opacity: 1 },
        { opacity: 0, offset: 0.38 },
        { opacity: 0 },
      ],
      { duration: HERO_SWAP_MS, easing: 'ease-in-out', fill: 'forwards' },
    )
    incoming.animate(
      [
        { opacity: 0 },
        { opacity: 0, offset: 0.62 },
        { opacity: 1 },
      ],
      { duration: HERO_SWAP_MS, easing: 'ease-in-out', fill: 'forwards' },
    )
  }, [mirrored])

  return (
    <>
      <div ref={leftRef} className="absolute inset-y-0 left-0 z-0 hidden w-1/2 lg:block" aria-hidden>
        <img
          src={HERO_TEXTURE}
          alt=""
          className="h-full w-full scale-x-[-1] object-cover object-right [mask-image:linear-gradient(to_left,black_0%,black_45%,transparent_100%)]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
      <div ref={rightRef} className="absolute inset-y-0 left-1/2 z-0 hidden w-1/2 lg:block" aria-hidden>
        <img
          src={HERO_TEXTURE}
          alt=""
          className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,transparent_0%,black_55%,black_100%)]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
      </div>
    </>
  )
}

function HeroStage({
  slides,
  index,
  mirrored,
}: {
  slides: HeroSlide[]
  index: number
  mirrored: boolean
}) {
  const [tracked, setTracked] = useState(index)
  const [leaving, setLeaving] = useState<number | null>(null)
  const [motionOn, setMotionOn] = useState(false)

  if (index !== tracked) {
    setLeaving(tracked)
    setTracked(index)
    if (!motionOn) setMotionOn(true)
  }

  useEffect(() => {
    if (leaving === null) return
    const holdMs =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
        ? HERO_SWAP_MS
        : HERO_CROSSFADE_MS
    const id = window.setTimeout(() => setLeaving(null), holdMs)
    return () => window.clearTimeout(id)
  }, [leaving, tracked])

  return (
    <div
      className={`absolute inset-0 z-[2] overflow-hidden transition-transform duration-[1600ms] ease-in-out lg:inset-y-0 lg:left-0 lg:w-1/2 ${
        mirrored ? 'lg:translate-x-0' : 'lg:translate-x-full'
      }`}
      aria-hidden
    >
      {slides.map((item, position) => {
        const offset = slideOffset(position, index, slides.length)
        const active = position === index
        const exiting = position === leaving
        const isCover = position === 0
        return (
          <div
            key={item.id}
            className={`hero-slide-frame absolute inset-0 ${
              !motionOn
                ? ''
                : active
                  ? 'hero-slide-in'
                  : exiting
                    ? isCover
                      ? 'hero-slide-out lg:hero-slide-out-cover'
                      : 'hero-slide-out'
                    : ''
            } ${
              isCover
                ? 'lg:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)]'
                : ''
            }`}
            style={{
              ['--hero-x' as string]: `${offset * 6}%`,
              opacity: active || exiting ? undefined : 0,
              zIndex: exiting ? 3 : active ? 2 : 1,
            }}
          >
            <img
              src={item.image}
              alt=""
              className={`h-full w-full max-lg:object-cover max-lg:blur-[7px] lg:blur-none ${
                active || exiting ? (position % 2 === 0 ? 'hero-zoom-in' : 'hero-zoom-out') : ''
              } ${
                item.fit === 'contain'
                  ? 'hero-carta hero-float lg:object-contain'
                  : `lg:object-cover ${active || exiting ? 'hero-drift' : 'scale-[1.14]'}`
              }`}
              style={
                active || exiting
                  ? {
                      ...(item.fit !== 'contain'
                        ? { animationDuration: `${HERO_SLIDE_MS}ms` }
                        : {}),
                      animationPlayState: exiting ? 'paused' : 'running',
                    }
                  : undefined
              }
              loading={position === 0 ? 'eager' : 'lazy'}
              decoding={position === 0 ? 'sync' : 'async'}
            />
            {isCover ? (
              <div
                className="pointer-events-none absolute inset-0 hidden lg:block"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 10%, transparent 22%)',
                }}
              />
            ) : null}
          </div>
        )
      })}
      <div
        className={`pointer-events-none absolute inset-0 hidden transition-opacity duration-[1600ms] ease-in-out lg:block ${
          mirrored ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.45) 24%, transparent 56%)',
        }}
      />
      <div
        className={`pointer-events-none absolute inset-0 hidden transition-opacity duration-[1600ms] ease-in-out lg:block ${
          mirrored ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to left, #000 0%, rgba(0,0,0,0.45) 24%, transparent 56%)',
        }}
      />
    </div>
  )
}

function useHeroCrossfade(slide: HeroSlide) {
  const [current, setCurrent] = useState(slide)
  const [outgoing, setOutgoing] = useState<HeroSlide | null>(null)

  if (slide.id !== current.id) {
    setOutgoing(current)
    setCurrent(slide)
  } else if (slide !== current) {
    setCurrent(slide)
  }

  useEffect(() => {
    if (!outgoing) return
    const id = window.setTimeout(() => setOutgoing(null), HERO_CROSSFADE_MS)
    return () => window.clearTimeout(id)
  }, [outgoing, current.id])

  return { current, outgoing }
}

function LetterMotion({
  motion,
  originClassName,
  frozen,
  children,
}: {
  motion: 'grow' | 'shrink'
  originClassName: string
  frozen?: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [heldTransform, setHeldTransform] = useState<string | null>(null)
  const endScale = motion === 'grow' ? 1.04 : 0.96

  useLayoutEffect(() => {
    if (frozen) {
      const node = ref.current
      if (!node) return
      const computed = getComputedStyle(node).transform
      setHeldTransform((current) =>
        current ?? (computed === 'none' ? `scale(${endScale})` : computed),
      )
      return
    }

    setHeldTransform(null)
    setScale(1)
    const id = window.requestAnimationFrame(() => setScale(endScale))
    return () => window.cancelAnimationFrame(id)
  }, [frozen, endScale])

  return (
    <div
      ref={ref}
      className={originClassName}
      style={
        heldTransform
          ? { transform: heldTransform, transition: 'none' }
          : {
              transform: `scale(${scale})`,
              transition: scale === 1 ? 'none' : `transform ${HERO_SLIDE_MS}ms ease-out`,
            }
      }
    >
      {children}
    </div>
  )
}

function FadingCopy({
  slide,
  letterMotion,
  originClassName,
  children,
}: {
  slide: HeroSlide
  letterMotion: 'grow' | 'shrink'
  originClassName: string
  children: (item: HeroSlide) => ReactNode
}) {
  const view = useHeroCrossfade(slide)
  const animate = view.outgoing !== null
  const crossfadeStyle = animate ? { animationDuration: `${HERO_CROSSFADE_MS}ms` } : undefined
  const motionById = useRef(new Map<string, { motion: 'grow' | 'shrink'; origin: string }>())
  const frozenOut = useRef<{
    id: string
    motion: 'grow' | 'shrink'
    origin: string
  } | null>(null)

  if (view.outgoing) {
    if (frozenOut.current?.id !== view.outgoing.id) {
      frozenOut.current = {
        id: view.outgoing.id,
        ...(motionById.current.get(view.outgoing.id) ?? {
          motion: letterMotion,
          origin: originClassName,
        }),
      }
    }
  } else {
    frozenOut.current = null
  }

  motionById.current.set(view.current.id, { motion: letterMotion, origin: originClassName })

  const layers = view.outgoing
    ? [
        {
          item: view.outgoing,
          phase: 'out' as const,
          motion: frozenOut.current?.motion ?? letterMotion,
          origin: frozenOut.current?.origin ?? originClassName,
        },
        {
          item: view.current,
          phase: 'in' as const,
          motion: letterMotion,
          origin: originClassName,
        },
      ]
    : [
        {
          item: view.current,
          phase: 'idle' as const,
          motion: letterMotion,
          origin: originClassName,
        },
      ]

  return (
    <div className="relative">
      {layers.map(({ item, phase, motion, origin }) => (
        <div
          key={item.id}
          className={
            phase === 'out'
              ? 'hero-copy-out pointer-events-none absolute inset-x-0 top-0'
              : phase === 'in'
                ? 'hero-copy'
                : undefined
          }
          style={phase === 'idle' ? undefined : crossfadeStyle}
          aria-hidden={phase === 'out' ? true : undefined}
        >
          <LetterMotion motion={motion} originClassName={origin} frozen={phase === 'out'}>
            {children(item)}
          </LetterMotion>
        </div>
      ))}
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
