import { Link } from 'react-router-dom'
import {
  LegalCrossLink,
  LegalDocument,
  LegalIdentity,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'

export function AvisoLegalPage() {
  return (
    <LegalDocument
      seoTitle="Aviso legal"
      heading="Aviso"
      accent="legal"
      description="Datos identificativos, condiciones de uso y propiedad intelectual del sitio de GastroMenu, titularidad de Fudys Gourmet SL."
      path="/aviso-legal"
    >
      <LegalSection title="Datos identificativos">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la
          sociedad de la información y de comercio electrónico, se informan los datos del titular
          de este sitio web:
        </p>
        <LegalIdentity />
      </LegalSection>

      <LegalSection title="Objeto">
        <p>
          {company.domain} presenta la actividad de {company.brand}: diseño, fabricación y
          comercialización de cartas de menú, manteles de papel, portamenús y otros trabajos de
          hostelería a medida. La información tiene carácter comercial e informativo. El encargo de
          un trabajo se formaliza cuando ambas partes aceptan el presupuesto y las condiciones
          concretas de ese pedido.
        </p>
      </LegalSection>

      <LegalSection title="Condiciones de uso">
        <p>
          El acceso a este sitio implica la aceptación de este aviso legal. Quien lo utilice se
          compromete a hacerlo de forma lícita, sin lesionar derechos de terceros ni alterar el
          funcionamiento del sitio, sus contenidos o la seguridad de los sistemas que lo soportan.
        </p>
        <p>
          {company.legalName} puede modificar, suspender o retirar contenidos y servicios sin previo
          aviso cuando sea necesario para actualizar la información, realizar mejoras o cumplir la
          normativa aplicable.
        </p>
      </LegalSection>

      <LegalSection title="Propiedad intelectual e industrial">
        <p>
          Los textos, fotografías, diseños, logotipos, marcas y demás contenidos de este sitio son
          titularidad de {company.legalName} o se utilizan con autorización de sus titulares. Quedan
          reservados todos los derechos.
        </p>
        <p>
          Queda prohibida su reproducción, distribución, comunicación pública o transformación, total
          o parcial, sin autorización escrita del titular, salvo en los casos permitidos por la ley.
          Las marcas {company.brand} y Cartas Menú identifican la actividad comercial de la empresa.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilidad">
        <p>
          {company.legalName} procura que la información publicada sea exacta y esté actualizada.
          Aun así, los contenidos pueden contener errores u omisiones y no constituyen una oferta
          contractual por sí solos. Las características, plazos y precios de cada trabajo se
          confirman en el presupuesto correspondiente.
        </p>
        <p>
          No se responde de los daños derivados de interferencias, interrupciones, virus o un uso
          indebido del sitio, ni de las decisiones tomadas únicamente a partir de la información
          general aquí publicada.
        </p>
      </LegalSection>

      <LegalSection title="Enlaces">
        <p>
          Este sitio puede incluir enlaces a páginas de terceros, como mapas o redes sociales. Esos
          destinos tienen sus propias condiciones y políticas, ajenas a {company.legalName}. La
          existencia de un enlace no implica relación, recomendación ni responsabilidad sobre esos
          contenidos.
        </p>
        <p>
          Si un tercero desea enlazar a {company.domain}, el enlace debe dirigir a la página principal
          sin reproducir sus contenidos ni sugerir una relación que no exista.
        </p>
      </LegalSection>

      <LegalSection title="Protección de datos">
        <p>
          El tratamiento de los datos personales recogidos a través de este sitio se explica en la{' '}
          <Link to="/privacidad">política de privacidad</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Legislación y jurisdicción">
        <p>
          Este aviso se rige por la legislación española. Para cualquier controversia, las partes se
          someten a los juzgados y tribunales de Málaga, salvo que la normativa de consumidores y
          usuarios imponga otro fuero.
        </p>
        <LegalCrossLink to="/privacidad">Política de privacidad</LegalCrossLink>
      </LegalSection>
    </LegalDocument>
  )
}
