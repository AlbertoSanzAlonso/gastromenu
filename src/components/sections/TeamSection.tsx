import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { GoldText } from '@/components/ui/GoldText'
import { useTeam } from '@/features/team/hooks/useTeam'

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {members.map((member) => (
          <article
            key={member.id}
            className="group text-center p-8 md:p-10 border border-beige-300/60 hover:border-gold/40 transition-colors duration-400"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-beige-200 to-beige-300 flex items-center justify-center group-hover:from-gold/20 group-hover:to-gold/10 transition-colors duration-400">
              <span className="font-display text-2xl text-gold/60" aria-hidden>
                {member.title.charAt(0)}
              </span>
            </div>
            <h3 className="font-display text-xl text-ink mb-3 font-light">
              {member.title}
            </h3>
            {member.description && (
              <p className="text-stone text-sm font-light leading-relaxed">
                {member.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
