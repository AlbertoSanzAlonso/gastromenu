import { Link } from 'react-router-dom'
import {
  LegalCrossLink,
  LegalDocument,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'
import { messages } from '@/i18n/messages'

const copy = messages.en.legal

export function CondicionesVentaEnglish() {
  return (
    <LegalDocument
      seoTitle={copy.termsTitle}
      heading={copy.termsHeading}
      accent={copy.termsAccent}
      description={copy.termsDescription}
      path="/condiciones-de-venta"
      updated="Updated on 9 November 2026"
    >
      <LegalSection title="Scope">
        <p>
          These conditions govern commissions for menus, placemats, menu stands and other
          hospitality work made by {company.legalName} under the trade name {company.brand}. The
          site {company.domain} presents the activity. A commission begins when the client accepts
          the quote in writing.
        </p>
        <p>
          If the quote sets a different time, price or way of paying, what is written in that quote
          prevails. Whatever the quote does not say is governed by these conditions.
        </p>
      </LegalSection>

      <LegalSection title="Quote">
        <p>
          Each job is quoted in writing, by email or by WhatsApp. The quote states the pieces,
          materials, finishes, languages, number of pages and, where it applies, the carriage.
          Prices are in euros and do not include VAT, unless the quote says otherwise.
        </p>
        <p>
          A quote is valid for thirty calendar days from its date. After that, it has to be
          confirmed again before work begins. Accepting it means accepting these conditions.
        </p>
      </LegalSection>

      <LegalSection title="Deposit and payment">
        <p>
          To start making the work, a deposit of fifty per cent of the quoted amount is required.
          The balance is paid before dispatch. If the quote sets another split, that split applies.
        </p>
        <p>
          Payment is by transfer to the account named in the quote. On commissions between
          businesses, late payment accrues the interest of Spanish Act 3/2004 against late payment.
          The goods remain the property of {company.legalName} until payment in full.
        </p>
      </LegalSection>

      <LegalSection title="What the commission contains">
        <p>
          The client supplies the texts, prices, allergens, logos and photographs that are to
          appear, and is responsible for their accuracy and for having the right to use them.{' '}
          {company.brand} looks over the composition and may point out an obvious error, but that
          does not replace the client’s own check.
        </p>
        <p>
          A proof is sent before production. The final pieces are made once the client approves that
          proof in writing. Changes asked for after approval are quoted separately and move the
          delivery date.
        </p>
      </LegalSection>

      <LegalSection title="Times">
        <p>
          The time for each commission is stated in the quote. It runs from approval of the proof
          and receipt of the deposit, not from the first conversation. As a guide, a usual set of
          menus is delivered in three to five weeks. Stands, long runs of placemats and work that
          needs a material to be ordered carry the time stated in their quote.
        </p>
        <p>
          If the client is late with texts, photographs or approval, the time stops for those days.
          The time also stops when a workshop closure, a lack of material or an event outside the
          company prevents the work from being made or sent.
        </p>
      </LegalSection>

      <LegalSection title="Delivery">
        <p>
          Pieces are collected at the workshops in Madrid or Málaga, or sent to the address the
          client gives. The cost of transport, when it is not included, is set out in the quote.
          The risk of transport passes to the client when the goods are handed to the addressee, or
          to the person who receives them in the addressee’s name.
        </p>
        <p>
          The parcel should be checked on arrival. Visible transport damage is reported within
          forty-eight hours, with photographs of the packing and of the piece. After that, delivery
          is understood to have arrived as it left the workshop, without affecting the warranty for
          a fault in the making.
        </p>
      </LegalSection>

      <LegalSection title="Warranty">
        <p>
          Pieces carry a warranty of twelve months from delivery, for faults in the making: a
          binding that gives way, corners or screws badly seated, print that lifts because of a
          production fault and, on the stands, a structure or a light that fails in ordinary use.
        </p>
        <p>
          The warranty does not cover ordinary wear in service, knocks, unsuitable cleaning,
          damp or sun when a material was chosen against advice for that use, or later changes of
          menu, prices or allergens after the proof was approved. Repair or replacement of the
          faulty piece ends the warranty. The price of a personal piece is not refunded for a mere
          change of mind.
        </p>
        <p>
          Commissions are made to order. When the buyer is a consumer, the fourteen-day withdrawal
          right for distance sales does not apply: article 103 of the Spanish consolidated text on
          consumer protection excludes goods made to the client’s specifications.
        </p>
      </LegalSection>

      <LegalSection title="Samples and cancellation">
        <p>
          If the quote includes a sample, its cost, and whether it is later deducted from the
          order, are stated in that document. The sample shows material and binding. The final
          design is the approved proof.
        </p>
        <p>
          If the client cancels before making begins and no proof has been prepared, the deposit is
          returned. If the proof has already been made, the design work done is deducted. Once
          making has started, the work already carried out and the materials cut for that
          commission are due.
        </p>
      </LegalSection>

      <LegalSection title="Designs and photographs">
        <p>
          The client keeps their marks, logos and photographs. {company.brand} keeps the editorial
          designs, the layouts and the images from its own library, unless the quote assigns a
          right. The client may use the approved design for the pieces commissioned. Reprinting it
          with a third party needs written permission.
        </p>
      </LegalSection>

      <LegalSection title="Applicable law">
        <p>
          These conditions are governed by Spanish law. For any dispute, the parties submit to the
          courts of Málaga, unless consumer rules impose another forum.
        </p>
        <p>
          The contact details for an order, a delivery or a warranty claim are {company.email},{' '}
          {company.phones[0].display} and {company.phones[1].display}. How the data of a commission
          are processed is explained in the <Link to="/privacidad">privacy policy</Link>.
        </p>
        <LegalCrossLink to="/aviso-legal">Legal notice</LegalCrossLink>
      </LegalSection>
    </LegalDocument>
  )
}
