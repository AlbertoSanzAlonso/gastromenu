import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { useMessages } from '@/i18n/useMessages'
import { useTeam } from '@/features/team/hooks/useTeam'

function TeamStepMarker({ sortOrder }: { sortOrder: number }) {
  const { m } = useMessages()
  const label = m.home.teamSteps[sortOrder - 1] ?? m.home.teamStep

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
  const { m } = useMessages()
  const { members } = useTeam()
  const steps = m.home.teamMembers.map((member, index) => ({
    ...member,
    imageUrl: members[index]?.image_url ?? null,
  }))

  return (
    <Section variant="light" ariaLabel={m.home.teamLabel}>
      <Heading
        as="h2"
        subtitle={m.home.teamSubtitle}
        align="center"
        className="mx-auto"
      >
        {m.home.teamTitleBefore} <GoldText>{m.home.teamTitleAccent}</GoldText>
      </Heading>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {steps.map((member, index) => {
          return (
          <article
            key={member.title}
            className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-sm text-center p-8 md:p-10 border border-beige-300/70 bg-transparent hover:border-gold-slide/50 transition-colors duration-400"
          >
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt=""
                className="mx-auto mb-6 h-28 w-28 object-cover"
              />
            )}
            <TeamStepMarker sortOrder={index + 1} />
            <h3 className="slide-heading text-lg mb-3">
              {member.title}
            </h3>
            {member.description && (
              <p className="slide-body text-sm">
                {member.description}
              </p>
            )}
          </article>
          )
        })}
      </div>
    </Section>
  )
}
