import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { company } from '@/data/contact'
import { SEO } from '@/lib/seo/SEO'

interface LegalDocumentProps {
  seoTitle: string
  heading: string
  accent: string
  description: string
  path: string
  children: ReactNode
}

export function LegalDocument({
  seoTitle,
  heading,
  accent,
  description,
  path,
  children,
}: LegalDocumentProps) {
  return (
    <>
      <SEO title={seoTitle} description={description} path={path} />
      <Section variant="dark" className="!pt-32">
        <Heading as="h1" subtitle={company.legalName} align="center" className="mx-auto">
          {heading} <GoldText>{accent}</GoldText>
        </Heading>

        <article className="mx-auto -mt-8 max-w-3xl">
          <p className="slide-label mb-14 text-center text-[10px] !tracking-[0.16em] sm:!tracking-[0.28em]">
            Actualizado el {company.legalUpdated}
          </p>
          <div className="space-y-12">{children}</div>
        </article>
      </Section>
    </>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="slide-heading mb-5 text-2xl text-cream md:text-3xl">{title}</h2>
      <div className="space-y-4 text-base leading-relaxed [&_a]:text-gold-slide [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-gold-highlight [&_li]:slide-body [&_p]:slide-body [&_strong]:font-normal [&_strong]:text-cream">
        {children}
      </div>
    </section>
  )
}

export function LegalIdentity() {
  const rows = [
    ['Denominación social', company.legalName],
    ['Nombre comercial', company.brand],
    ['CIF', company.cif],
    ['Domicilio social', company.registeredAddress],
    ['Inscripción', company.registry],
    ['Correo electrónico', company.email],
    ['Teléfono', company.phones.map((phone) => phone.display).join(' · ')],
    ['Sitio web', company.domain],
  ] as const

  return (
    <dl className="grid gap-5 border border-gold-slide/25 bg-charcoal/80 p-6 md:p-8">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="slide-label text-[10px]">{label}</dt>
          <dd className="mt-2 font-serif text-base font-light leading-relaxed text-cream">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-gold-slide">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function LegalCrossLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <p>
      <Link to={to}>{children}</Link>
    </p>
  )
}
