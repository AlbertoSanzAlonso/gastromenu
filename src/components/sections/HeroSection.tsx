import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BrandDivider } from '@/components/ui/BrandDivider'
import { Container } from '@/components/ui/Container'

export function HeroSection() {
  const heroImage = '/images/hero-ref-01.webp'
  const heroTexture = '/images/hero-texture.webp'

  return (
    <section
      aria-label="Presentación"
      className="relative z-20 min-h-[90vh] flex items-center bg-black overflow-hidden"
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
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="brand-title text-4xl md:text-6xl lg:text-7xl gold-shimmer mb-8">
            GASTROMENU
          </h1>

          <BrandDivider className="mb-8" />

          <p className="brand-subtitle text-sm md:text-base leading-loose mb-6">
            Cartas artesanales premium
            <br />
            para el alma de tu negocio
          </p>

          <BrandDivider className="mb-8" />

          <p className="brand-eyebrow text-[11px] md:text-xs leading-loose mb-10">
            Premium handcrafted menus
            <br />
            for the soul of your business
          </p>

          <p className="brand-caption mb-12">
            Fabricación propia desde 1997
            <br />
            in-house manufacturing since 1997
          </p>

          <Link to="/#galeria">
            <Button
              variant="outline"
              size="lg"
              className="!border-gold-text/40 !text-cream hover:!border-gold-text hover:!text-gold-text"
            >
              Descubrir colección
            </Button>
          </Link>
        </div>
      </Container>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="brand-caption text-mist">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
