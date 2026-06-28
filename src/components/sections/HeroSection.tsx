import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'

export function HeroSection() {
  const heroImage = '/images/hero-ref-01.webp'
  const heroTexture = '/images/hero-texture.webp'

  return (
    <section
      aria-label="Presentación"
      className="relative min-h-[90vh] flex items-center bg-black overflow-hidden"
    >
      <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2" aria-hidden>
        <img
          src={heroImage}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_55%,black_100%)]"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/70" />
      </div>

      <div className="absolute inset-y-0 left-0 hidden lg:block w-1/2" aria-hidden>
        <img
          src={heroTexture}
          alt=""
          aria-hidden
          className="h-full w-full scale-x-[-1] object-cover object-right [mask-image:linear-gradient(to_left,black_0%,black_45%,transparent_100%)]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      </div>

      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-right opacity-55 lg:hidden"
        loading="eager"
        decoding="sync"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45 lg:from-transparent lg:via-black/10 lg:to-black/35" aria-hidden />
      <div
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/85 to-transparent lg:w-1/2 lg:from-black/25 lg:via-black/10"
        aria-hidden
      />

      <Container className="relative z-10 py-section">
        <div className="max-w-5xl lg:max-w-[50%]">
          <p className="font-ui text-xs uppercase tracking-[0.35em] text-gold mb-8 md:mb-12">
            Alta calidad en imagen gastronómica
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-light text-beige-50 leading-[1.05] tracking-tight text-balance mb-8">
            La excelencia
            <br />
            como <GoldText>destino</GoldText>
          </h1>

          <blockquote className="max-w-2xl mb-12 md:mb-16">
            <p className="font-display text-xl md:text-2xl text-beige-300 font-light italic leading-relaxed">
              «A veces una primera impresión es la que queda para siempre…»
            </p>
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/#galeria">
              <Button
                variant="ghost"
                size="lg"
                className="!px-0 !py-0 !text-beige-100 hover:!text-gold cursor-pointer"
              >
                Descubrir colección
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-mist">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
