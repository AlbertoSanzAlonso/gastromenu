import { Link } from 'react-router-dom'
import {
  LegalDocument,
  LegalIdentity,
  LegalList,
  LegalSection,
} from '@/components/legal/LegalDocument'
import { company } from '@/data/contact'

export function PrivacidadPage() {
  return (
    <LegalDocument
      seoTitle="Política de privacidad"
      heading="Política de"
      accent="privacidad"
      description="Información sobre el tratamiento de datos personales de GastroMenu, titularidad de Fudys Gourmet SL, conforme al RGPD y la LOPDGDD."
      path="/privacidad"
    >
      <LegalSection title="Responsable del tratamiento">
        <p>
          Los datos personales recogidos a través de {company.domain} se tratan por:
        </p>
        <LegalIdentity />
        <p>
          Puede ejercer sus derechos y plantear cualquier cuestión sobre privacidad en{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Datos que tratamos">
        <p>
          Tratamos los datos que usted nos facilita al escribirnos, llamarnos o enviar el formulario
          de contacto:
        </p>
        <LegalList
          items={[
            'Nombre y apellidos de la persona de contacto.',
            'Teléfono y correo electrónico.',
            'Nombre y tipo de establecimiento.',
            'Dirección, si decide indicarla.',
            'Productos o servicios de su interés y el mensaje de la consulta.',
            'La constancia de que ha aceptado esta política.',
          ]}
        />
        <p>
          No solicitamos categorías especiales de datos. Le pedimos que no incluya en el mensaje
          información de salud, ideología u otros datos que no sean necesarios para el presupuesto.
        </p>
      </LegalSection>

      <LegalSection title="Para qué los usamos">
        <LegalList
          items={[
            'Atender su consulta y preparar el presupuesto del trabajo solicitado.',
            'Gestionar la relación comercial y el encargo, si llega a formalizarse.',
            'Mantener el contacto necesario sobre ese proyecto.',
            'Cumplir las obligaciones legales de conservación documental, fiscal y mercantil cuando exista una relación contractual.',
          ]}
        />
        <p>
          No utilizamos estos datos para elaborar perfiles, ni los cedemos para publicidad de
          terceros. No enviaremos comunicaciones comerciales ajenas a la consulta salvo que usted lo
          solicite o exista otra base que lo permita.
        </p>
      </LegalSection>

      <LegalSection title="Base jurídica">
        <p>El tratamiento se apoya en:</p>
        <LegalList
          items={[
            'La aplicación de medidas precontractuales solicitadas por usted al pedir información o un presupuesto (artículo 6.1.b del RGPD).',
            'La ejecución del contrato, cuando el encargo se formaliza.',
            'El cumplimiento de obligaciones legales de conservación, cuando resultan aplicables (artículo 6.1.c del RGPD).',
            'Su consentimiento, recogido en la casilla del formulario antes de enviar la consulta (artículo 6.1.a del RGPD). Puede retirarlo en cualquier momento, sin que ello afecte al tratamiento previo.',
          ]}
        />
      </LegalSection>

      <LegalSection title="Durante cuánto tiempo">
        <p>
          Las consultas que no llegan a convertirse en un encargo se conservan durante un máximo de
          dos años desde el último contacto, para poder retomar la conversación si usted vuelve a
          escribirnos.
        </p>
        <p>
          Si existe una relación contractual, los datos se conservan mientras dure y, después,
          durante los plazos de prescripción de las responsabilidades legales. En particular, la
          documentación mercantil y contable puede conservarse hasta seis años.
        </p>
      </LegalSection>

      <LegalSection title="Quién puede acceder">
        <p>
          Los datos los utiliza el personal de {company.legalName} que atiende las consultas y los
          encargos. No se venden ni se ceden a terceros para sus propios fines.
        </p>
        <p>
          Para guardar las consultas del formulario recurrimos a un proveedor de base de datos
          (Supabase), que actúa como encargado del tratamiento y solo trata los datos siguiendo
          nuestras instrucciones. El alojamiento del sitio puede corresponder a un proveedor de
          infraestructura que presta ese servicio.
        </p>
        <p>
          Si nos contacta por WhatsApp, la conversación se canaliza a través de esa plataforma, que
          aplica sus propias condiciones. El enlace de mapas abre un servicio de Google.
        </p>
      </LegalSection>

      <LegalSection title="Transferencias internacionales">
        <p>
          Procuramos que los encargados traten los datos en el Espacio Económico Europeo. Si un
          proveedor accediera a los datos desde un país sin decisión de adecuación, la transferencia
          se amparará en cláusulas contractuales tipo u otra garantía prevista en el RGPD.
        </p>
      </LegalSection>

      <LegalSection title="Sus derechos">
        <p>Puede solicitar:</p>
        <LegalList
          items={[
            'Acceso a sus datos y a obtener una copia.',
            'Rectificación de los datos inexactos.',
            'Supresión, cuando ya no sean necesarios o retire el consentimiento.',
            'Limitación u oposición al tratamiento, en los casos previstos por la ley.',
            'Portabilidad de los datos que nos haya facilitado y que tratemos por medios automatizados.',
          ]}
        />
        <p>
          Para ejercerlos, escriba a{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a> indicando el derecho que desea
          ejercer y un medio para responderle. Podemos pedirle la información imprescindible para
          confirmar su identidad.
        </p>
        <p>
          Si considera que el tratamiento no se ajusta a la normativa, puede reclamar ante la
          Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Menores">
        <p>
          Este sitio se dirige a profesionales de la hostelería y a personas adultas. No recabamos
          datos de menores de forma consciente. Si detectamos que hemos recibido datos de un menor,
          los eliminaremos.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          El sitio no utiliza cookies de análisis ni de publicidad. El prestador de alojamiento puede
          emplear cookies o identificadores estrictamente técnicos, necesarios para la seguridad y el
          funcionamiento de la página. El área privada de administración guarda la sesión en el
          navegador de quien accede a ella.
        </p>
        <p>
          Puede configurar el navegador para bloquear o borrar las cookies. Si bloquea las
          estrictamente necesarias, alguna función técnica puede dejar de estar disponible.
        </p>
      </LegalSection>

      <LegalSection title="Cambios">
        <p>
          Esta política puede actualizarse para reflejar cambios del sitio o de la normativa. La
          versión vigente es la publicada en esta página, con la fecha indicada al inicio.
        </p>
        <p>
          Más información sobre el titular y las condiciones de uso en el{' '}
          <Link to="/aviso-legal">aviso legal</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
