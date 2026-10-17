import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { useTeam } from '@/features/team/hooks/useTeam'

const stepLabels: Record<number, string> = {
  1: 'In situ',
  2: 'Estudio',
  3: 'Retoque',
  4: 'Acabado',
  5: 'Equipo',
}

function TeamStepMarker({ sortOrder }: { sortOrder: number }) {
  const label = stepLabels[sortOrder] ?? 'Paso'

  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      <span
        className="font-serif text-5xl md:text-6xl font-light text-gold-slide tabular-nums leading-none"
        aria-hidden
      >
        {String(sortOrder).padStart(2, '0')}
      </span>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 w-20" aria-hidden>
          <span className="h-px flex-1 bg-gold-slide/35 group-hover:bg-gold-slide/55 transition-colors duration-400" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold-slide/60 group-hover:bg-gold-slide transition-colors duration-400" />
          <span className="h-px flex-1 bg-gold-slide/35 group-hover:bg-gold-slide/55 transition-colors duration-400" />
        </div>
        <p className="slide-label text-[10px]">
          {label}
        </p>
      </div>
    </div>
  )
}

export function TeamSection() {
  const { members } = useTeam()

  return (
    <Section variant="light" ariaLabel="Nuestro equipo">
      <Heading
        as="h2"
        subtitle="Un gran equipo a su servicio"
        align="center"
        className="mx-auto"
      >
        Artesanía y <GoldText>dedicación</GoldText>
      </Heading>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {members.map((member) => (
          <article
            key={member.id}
            className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-sm text-center p-8 md:p-10 border border-beige-300/70 bg-transparent hover:border-gold-slide/50 transition-colors duration-400"
          >
            {member.image_url && (
              <img
                src={member.image_url}
                alt=""
                className="mx-auto mb-6 h-28 w-28 object-cover"
              />
            )}
            <TeamStepMarker sortOrder={member.sort_order} />
            <h3 className="slide-heading text-lg mb-3">
              {member.title}
            </h3>
            {member.description && (
              <p className="slide-body text-sm">
                {member.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
