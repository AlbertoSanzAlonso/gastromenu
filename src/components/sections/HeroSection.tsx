import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GoldText } from '@/components/ui/GoldText'

export function HeroSection() {
  return (
    <section
      aria-label="Presentación"
      className="relative min-h-[90vh] flex items-center bg-ink overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 50%, rgba(201, 169, 98, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212, 201, 184, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink-soft" aria-hidden />

      <Container className="relative z-10 py-section">
        <div className="max-w-5xl">
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
              <Button size="lg">Descubrir colección</Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" size="lg">
                Solicitar presupuesto
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
