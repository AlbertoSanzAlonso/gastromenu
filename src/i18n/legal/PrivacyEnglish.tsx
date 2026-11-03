import { Link } from 'react-router-dom'
import {
  LegalDocument,
  LegalIdentity,
  LegalList,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'
import { messages } from '@/i18n/messages'

const copy = messages.en.legal

export function PrivacyEnglish() {
  return (
    <LegalDocument
      seoTitle={copy.privacyTitle}
      heading={copy.privacyHeading}
      accent={copy.privacyAccent}
      description={copy.privacyDescription}
      path="/privacidad"
    >
      <LegalSection title="Controller">
        <p>Personal data collected through {company.domain} are processed by:</p>
        <LegalIdentity />
        <p>
          You may exercise your rights and raise any privacy question at{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Data we process">
        <p>We process the data you give us when you write, call or send the contact form:</p>
        <LegalList
          items={[
            'First name and last name of the contact person.',
            'Telephone and email.',
            'Name and type of establishment.',
            'Address, if you choose to give it.',
            'Products or services of interest, and the message of the enquiry.',
            'The record that you have accepted this policy.',
          ]}
        />
        <p>
          We do not ask for special categories of data. Please do not include in the message
          information about health, ideology or other data that are not needed for the quote.
        </p>
      </LegalSection>

      <LegalSection title="What we use them for">
        <LegalList
          items={[
            'To answer your enquiry and prepare the quote for the work requested.',
            'To manage the commercial relationship and the commission, if it is formed.',
            'To keep the contact needed about that project.',
            'To meet legal duties of documentary, tax and commercial retention when a contract exists.',
          ]}
        />
        <p>
          We do not use these data to build profiles, and we do not pass them on for third-party
          advertising. We will not send commercial communications unrelated to the enquiry unless you
          ask for them or another lawful basis allows it.
        </p>
      </LegalSection>

      <LegalSection title="Lawful basis">
        <p>The processing rests on:</p>
        <LegalList
          items={[
            'Pre-contractual steps you request when you ask for information or a quote (article 6.1.b of the GDPR).',
            'Performance of the contract, when the commission is formed.',
            'Compliance with legal retention duties, when they apply (article 6.1.c of the GDPR).',
            'Your consent, collected in the form box before the enquiry is sent (article 6.1.a of the GDPR). You may withdraw it at any time, without affecting the processing already carried out.',
          ]}
        />
      </LegalSection>

      <LegalSection title="How long">
        <p>
          Enquiries that do not become a commission are kept for a maximum of two years from the last
          contact, so the conversation can be taken up again if you write to us once more.
        </p>
        <p>
          If there is a contract, the data are kept while it lasts and, afterwards, for the limitation
          periods of the legal liabilities. In particular, commercial and accounting records may be
          kept for up to six years.
        </p>
      </LegalSection>

      <LegalSection title="Who may have access">
        <p>
          The data are used by the staff of {company.legalName} who handle enquiries and commissions.
          They are not sold or passed to third parties for their own purposes.
        </p>
        <p>
          To store form enquiries we use a database provider (Supabase), which acts as processor and
          only handles the data on our instructions. Hosting of the site may sit with an
          infrastructure provider that supplies that service.
        </p>
        <p>
          If you contact us on WhatsApp, the conversation runs through that platform, which applies
          its own terms. The map link opens a Google service.
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          We aim for processors to handle the data in the European Economic Area. If a provider
          accessed the data from a country without an adequacy decision, the transfer will rest on
          standard contractual clauses or another safeguard provided by the GDPR.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You may request:</p>
        <LegalList
          items={[
            'Access to your data and a copy of them.',
            'Rectification of inaccurate data.',
            'Erasure, when they are no longer needed or you withdraw consent.',
            'Restriction of, or objection to, the processing, in the cases the law provides.',
            'Portability of the data you have given us and that we process by automated means.',
          ]}
        />
        <p>
          To exercise them, write to <a href={`mailto:${company.email}`}>{company.email}</a> stating
          the right you wish to exercise and a way for us to reply. We may ask for the information
          needed to confirm your identity.
        </p>
        <p>
          If you consider that the processing does not comply with the rules, you may complain to the
          Spanish Data Protection Agency (
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This site is addressed to hospitality professionals and to adults. We do not knowingly
          collect data from children. If we find that we have received a child’s data, we will delete
          them.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          The site does not use analytics or advertising cookies. The hosting provider may use cookies
          or identifiers that are strictly technical, needed for the security and working of the page.
          The private administration area stores the session in the browser of the person who enters it.
        </p>
        <p>
          You can set the browser to block or delete cookies. If you block those that are strictly
          necessary, some technical function may cease to be available.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          This policy may be updated to reflect changes to the site or to the rules. The version in
          force is the one published on this page, with the date shown at the top.
        </p>
        <p>
          Further information about the owner and the terms of use is in the{' '}
          <Link to="/aviso-legal">legal notice</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
