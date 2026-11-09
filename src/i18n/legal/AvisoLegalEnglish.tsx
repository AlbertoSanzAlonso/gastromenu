import { Link } from 'react-router-dom'
import {
  LegalCrossLink,
  LegalDocument,
  LegalIdentity,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'
import { messages } from '@/i18n/messages'

const copy = messages.en.legal

export function AvisoLegalEnglish() {
  return (
    <LegalDocument
      seoTitle={copy.noticeTitle}
      heading={copy.noticeHeading}
      accent={copy.noticeAccent}
      description={copy.noticeDescription}
      path="/aviso-legal"
    >
      <LegalSection title="Identifying details">
        <p>
          In compliance with article 10 of Spanish Law 34/2002, of 11 July, on information-society
          services and electronic commerce, the details of the owner of this website are given below:
        </p>
        <LegalIdentity />
      </LegalSection>

      <LegalSection title="Purpose">
        <p>
          {company.domain} presents the activity of {company.brand}: the design, manufacture and
          sale of menus, paper placemats, menu stands and other bespoke work for hospitality. The
          information is commercial and informative. A commission is formed when both parties accept
          the quote and the <Link to="/condiciones-de-venta">conditions of sale</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Terms of use">
        <p>
          Access to this site implies acceptance of this legal notice. Anyone who uses it undertakes
          to do so lawfully, without harming the rights of third parties or altering the working of
          the site, its contents or the security of the systems that support it.
        </p>
        <p>
          {company.legalName} may change, suspend or withdraw contents and services without prior
          notice when that is needed to update the information, make improvements or comply with the
          applicable rules.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual and industrial property">
        <p>
          The texts, photographs, designs, logos, marks and other contents of this site belong to{' '}
          {company.legalName}, or are used with the authorisation of their owners. All rights are
          reserved.
        </p>
        <p>
          Their reproduction, distribution, public communication or transformation, in whole or in
          part, is prohibited without the written authorisation of the owner, except where the law
          allows it. The marks {company.brand} and Cartas Menú identify the commercial activity of
          the company.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          {company.legalName} takes care that the information published is accurate and up to date.
          Even so, the contents may contain errors or omissions and do not, by themselves, constitute
          a contractual offer. The characteristics, times and prices of each job are confirmed in the
          corresponding quote.
        </p>
        <p>
          We are not liable for damage arising from interference, interruptions, viruses or misuse of
          the site, nor for decisions taken solely on the basis of the general information published
          here.
        </p>
      </LegalSection>

      <LegalSection title="Links">
        <p>
          This site may include links to third-party pages, such as maps or social networks. Those
          destinations have their own terms and policies, which are not those of {company.legalName}.
          A link does not imply a relationship, a recommendation or responsibility for those contents.
        </p>
        <p>
          If a third party wishes to link to {company.domain}, the link must point to the home page
          without reproducing its contents or suggesting a relationship that does not exist.
        </p>
      </LegalSection>

      <LegalSection title="Data protection">
        <p>
          The processing of personal data collected through this site is explained in the{' '}
          <Link to="/privacidad">privacy policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Law and jurisdiction">
        <p>
          This notice is governed by Spanish law. For any dispute, the parties submit to the courts
          of Málaga, unless consumer rules impose another forum.
        </p>
        <LegalCrossLink to="/privacidad">Privacy policy</LegalCrossLink>
        <LegalCrossLink to="/condiciones-de-venta">Conditions of sale</LegalCrossLink>
      </LegalSection>
    </LegalDocument>
  )
}
