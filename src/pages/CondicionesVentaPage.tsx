import { Link } from 'react-router-dom'
import {
  LegalCrossLink,
  LegalDocument,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'
import { CondicionesVentaEnglish } from '@/i18n/legal/CondicionesVentaEnglish'
import { useLocale } from '@/i18n/locale'
import { messages } from '@/i18n/messages'

export function CondicionesVentaPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <CondicionesVentaEnglish />

  const copy = messages.es.legal

  return (
    <LegalDocument
      seoTitle={copy.termsTitle}
      heading={copy.termsHeading}
      accent={copy.termsAccent}
      description={copy.termsDescription}
      path="/condiciones-de-venta"
      updated="Actualizado el 9 de noviembre de 2026"
    >
      <LegalSection title="Ámbito">
        <p>
          Estas condiciones regulan los encargos de cartas de menú, manteles, atriles portamenús y
          demás trabajos de hostelería que {company.legalName} elabora bajo el nombre comercial{' '}
          {company.brand}. El sitio {company.domain} informa de la actividad. El encargo nace cuando
          el cliente acepta por escrito el presupuesto.
        </p>
        <p>
          Si el presupuesto fija un plazo, un precio o una forma de pago distintos, prevalece lo
          escrito en ese presupuesto. Lo que no diga el presupuesto se rige por estas condiciones.
        </p>
      </LegalSection>

      <LegalSection title="Presupuesto">
        <p>
          Cada trabajo se presupuesta por escrito, por correo o por WhatsApp. El presupuesto indica
          piezas, materiales, acabados, idiomas, número de páginas y, cuando corresponda, el porte.
          Los precios se expresan en euros y no incluyen el IVA, salvo que el presupuesto diga lo
          contrario.
        </p>
        <p>
          El presupuesto vale treinta días naturales desde su fecha. Pasado ese plazo, hay que
          confirmarlo de nuevo antes de empezar. Aceptarlo supone aceptar estas condiciones.
        </p>
      </LegalSection>

      <LegalSection title="Señal y pago">
        <p>
          Para empezar la elaboración se pide una señal del cincuenta por ciento del importe
          presupuestado. El resto se abona antes del envío. Si el presupuesto establece otro reparto,
          se aplica ese.
        </p>
        <p>
          El pago se hace por transferencia a la cuenta que se indique en el presupuesto. En encargos
          entre empresas, el retraso en el pago devenga el interés de la Ley 3/2004, de medidas de
          lucha contra la morosidad. La mercancía sigue siendo de {company.legalName} hasta el cobro
          íntegro.
        </p>
      </LegalSection>

      <LegalSection title="Contenido del encargo">
        <p>
          El cliente facilita los textos, precios, alérgenos, logotipos y fotografías que deban
          figurar, y responde de que sean exactos y de que tenga derecho a usarlos. {company.brand}{' '}
          revisa la composición y puede señalar un error evidente, pero no sustituye la revisión del
          cliente.
        </p>
        <p>
          Antes de producir se envía una prueba. La elaboración de las piezas definitivas empieza
          cuando el cliente aprueba esa prueba por escrito. Los cambios pedidos después de la
          aprobación se presupuestan aparte y desplazan el plazo.
        </p>
      </LegalSection>

      <LegalSection title="Plazos">
        <p>
          El plazo de cada encargo figura en el presupuesto. Se cuenta desde la aprobación de la
          prueba y la recepción de la señal, no desde el primer contacto. Como referencia, una
          colección habitual de cartas se entrega entre tres y cinco semanas. Los atriles, las
          tiradas largas de manteles y los trabajos con un material que haya que encargar llevan el
          plazo que indique su presupuesto.
        </p>
        <p>
          Si el cliente tarda en enviar textos, fotografías o la aprobación, el plazo se detiene
          esos días. Tampoco corre el plazo cuando un cierre de taller, una falta de material o un
          hecho ajeno a la empresa impide elaborar o enviar.
        </p>
      </LegalSection>

      <LegalSection title="Entrega">
        <p>
          Las piezas se entregan en los talleres de Madrid o de Málaga, o se envían a la dirección
          que indique el cliente. El coste del transporte, cuando no esté incluido, se detalla en el
          presupuesto. El riesgo del transporte pasa al cliente en el momento de la entrega al
          destinatario o a quien lo reciba en su nombre.
        </p>
        <p>
          Conviene revisar el bulto al recibirlo. Los desperfectos visibles de transporte se
          comunican en las cuarenta y ocho horas siguientes, con fotografías del embalaje y de la
          pieza. Pasado ese plazo, se entiende que la entrega llegó en el estado en que salió del
          taller, sin perjuicio de la garantía por defecto de elaboración.
        </p>
      </LegalSection>

      <LegalSection title="Garantía">
        <p>
          Las piezas tienen una garantía de doce meses desde la entrega, por defectos de
          elaboración: encuadernación que cede, esquineros o tornillos mal asentados, impresión que
          se desprende por un fallo de producción y, en los atriles, estructura o iluminación que
          falle en un uso normal.
        </p>
        <p>
          La garantía no cubre el desgaste propio del servicio, los golpes, una limpieza inadecuada,
          la humedad o el sol cuando se eligió un material desaconsejado para ese uso, ni los
          cambios de carta, de precios o de alérgenos posteriores a la aprobación de la prueba. La
          reparación o la sustitución de la pieza defectuosa agota la garantía. No se devuelve el
          precio de un trabajo personalizado por un simple cambio de opinión.
        </p>
        <p>
          Los encargos se hacen a medida. Por eso, cuando quien compra es un consumidor, no cabe el
          desistimiento de catorce días previsto para las compras a distancia: el artículo 103 del
          texto refundido de la Ley general para la defensa de los consumidores y usuarios excluye
          los bienes confeccionados conforme a las especificaciones del cliente.
        </p>
      </LegalSection>

      <LegalSection title="Muestras y anulaciones">
        <p>
          Si el presupuesto incluye una muestra, su coste y si después se descuenta del pedido
          figuran en ese documento. La muestra enseña material y encuadernación. El diseño definitivo
          es el de la prueba aprobada.
        </p>
        <p>
          Si el cliente anula antes de que empiece la elaboración y todavía no hay prueba hecha, se
          devuelve la señal. Si la prueba ya está hecha, se descuenta el trabajo de diseño realizado.
          Una vez empezada la elaboración, se debe el importe del trabajo ya ejecutado y de los
          materiales cortados para ese encargo.
        </p>
      </LegalSection>

      <LegalSection title="Diseños y fotografías">
        <p>
          El cliente conserva sus marcas, logotipos y fotografías. {company.brand} conserva los
          diseños editoriales, las maquetas y las imágenes de su banco, salvo que el presupuesto
          ceda algún derecho. El cliente puede usar el diseño aprobado para las piezas encargadas.
          Para reeditarlo con un tercero hace falta autorización escrita.
        </p>
      </LegalSection>

      <LegalSection title="Ley aplicable">
        <p>
          Estas condiciones se rigen por la legislación española. Para cualquier controversia, las
          partes se someten a los juzgados y tribunales de Málaga, salvo que la normativa de
          consumidores imponga otro fuero.
        </p>
        <p>
          Los datos de contacto para un pedido, una entrega o una garantía son {company.email}, el{' '}
          {company.phones[0].display} y el {company.phones[1].display}. El tratamiento de los datos
          del encargo se explica en la <Link to="/privacidad">política de privacidad</Link>.
        </p>
        <LegalCrossLink to="/aviso-legal">Aviso legal</LegalCrossLink>
      </LegalSection>
    </LegalDocument>
  )
}
