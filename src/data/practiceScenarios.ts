import type { LucideIcon } from 'lucide-react';
import { Phone, MessageSquare, MessageCircle, Mail } from 'lucide-react';

export type ModuleId = 'vishing' | 'smishing' | 'whatsapp' | 'phishing';

export interface ScenarioChoice {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface ScenarioFeedback {
  correct: string;
  incorrect: string;
}

export interface VishingContent {
  type: 'vishing';
  callerName: string;
  callerNumber: string;
  avatarInitial: string;
  script: { speaker: 'caller' | 'user'; text: string }[];
  choices: ScenarioChoice[];
  feedback: ScenarioFeedback;
}

export interface SmishingContent {
  type: 'smishing';
  senderName: string;
  senderNumber: string;
  messages: { sender: 'them' | 'user'; text: string; isLink?: boolean }[];
  choices: ScenarioChoice[];
  feedback: ScenarioFeedback;
}

export interface WhatsAppContent {
  type: 'whatsapp';
  contactName: string;
  contactNumber: string;
  messages: {
    sender: 'them' | 'user';
    text: string;
    isReceipt?: boolean;
    receiptAmount?: string;
    receiptService?: string;
  }[];
  choices: ScenarioChoice[];
  feedback: ScenarioFeedback;
}

export interface EmailContent {
  type: 'email';
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string[];
  linkText?: string;
  attachmentName?: string;
  choices: ScenarioChoice[];
  feedback: ScenarioFeedback;
}

export type ScenarioContent = VishingContent | SmishingContent | WhatsAppContent | EmailContent;

export interface Scenario {
  id: string;
  moduleId: ModuleId;
  title: string;
  summary: string;
  alertSignals: string[];
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  content?: ScenarioContent;
}

export interface PracticeModule {
  id: ModuleId;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  scenarios: Scenario[];
}

export const practiceModules: PracticeModule[] = [
  {
    id: 'vishing',
    title: 'Llamadas falsas',
    subtitle: 'Vishing',
    description: 'Simula llamadas de personas que intentan engañarte.',
    icon: Phone,
    color: 'text-primary',
    bg: 'bg-blue-100',
    scenarios: [
      {
        id: 'vishing-bank-otp',
        moduleId: 'vishing',
        title: 'El banco pide un código',
        summary: 'Un supuesto trabajador del banco llama pidiendo el código de seguridad de tu tarjeta.',
        alertSignals: ['Te piden un código de seguridad', 'Presión para actuar rápido'],
        difficulty: 'Fácil',
        content: {
          type: 'vishing',
          callerName: 'Banco Seguro',
          callerNumber: '+51 999 888 777',
          avatarInitial: 'BS',
          script: [
            { speaker: 'caller', text: 'Buenos días, hablo del Banco Seguro. Hemos detectado un intento de acceso a su cuenta de ahorros.' },
            { speaker: 'caller', text: 'Para bloquear la transacción de inmediato, necesito que me confirme el código de seguridad que acaba de llegar a su celular.' },
          ],
          choices: [
            { id: 'give-code', label: 'Le doy el código para que me ayuden', isCorrect: false },
            { id: 'hang-up', label: 'Cuelgo y llamo al número de mi tarjeta', isCorrect: true },
            { id: 'ask-name', label: 'Le pido su nombre y luego le doy el código', isCorrect: false },
          ],
          feedback: {
            correct: '¡Bien hecho! Ningún banco te pedirá tu código de seguridad por teléfono. Si dudas, cuelga y llama tú al número oficial.',
            incorrect: 'Cuidado. Los estafadores se hacen pasar por el banco para robarte. Nunca compartas códigos de seguridad por teléfono, mensaje o correo.',
          },
        },
      },
      {
        id: 'vishing-family-number',
        moduleId: 'vishing',
        title: 'Familiar con número nuevo',
        summary: 'Alguien dice ser un familiar con un número nuevo y pide dinero urgente.',
        alertSignals: ['Número desconocido', 'Urgencia para enviar dinero'],
        difficulty: 'Medio',
        content: {
          type: 'vishing',
          callerName: 'Sobrino Luis',
          callerNumber: '+51 999 123 456',
          avatarInitial: 'SL',
          script: [
            { speaker: 'caller', text: 'Tío, soy Luis. Tuve un problema con mi celular y tuve que cambiar de número.' },
            { speaker: 'caller', text: 'Necesito que me prestes S/500 urgentes. Es una emergencia. Por favor, no se lo digas a mi mamá todavía.' },
          ],
          choices: [
            { id: 'send-money', label: 'Le envío el dinero de inmediato', isCorrect: false },
            { id: 'verify', label: 'Cuelgo y llamo al número antiguo de Luis', isCorrect: true },
            { id: 'photo', label: 'Le pido una foto y luego le envío el dinero', isCorrect: false },
          ],
          feedback: {
            correct: 'Excelente decisión. Verificar la identidad por otro medio conocido evita caer en esta estafa.',
            incorrect: 'Desconfía siempre de números nuevos que piden dinero con urgencia. Llama a la persona por su número habitual para confirmar.',
          },
        },
      },
      {
        id: 'vishing-fake-prize',
        moduleId: 'vishing',
        title: 'Falso premio',
        summary: 'Llamada informando que ganaste un premio y solicitan tus datos personales.',
        alertSignals: ['Premio inesperado', 'Piden datos personales'],
        difficulty: 'Fácil',
        content: {
          type: 'vishing',
          callerName: 'Promociones Ganamas',
          callerNumber: '+51 999 000 111',
          avatarInitial: 'PG',
          script: [
            { speaker: 'caller', text: '¡Felicidades! Usted ha sido seleccionado como ganador de S/5,000 en nuestro sorteo de aniversario.' },
            { speaker: 'caller', text: 'Solo necesitamos confirmar sus datos personales y realizar un pago de S/50 para procesar el envío del premio.' },
          ],
          choices: [
            { id: 'pay', label: 'Doy mis datos y pago los S/50', isCorrect: false },
            { id: 'hang-up-prize', label: 'Cuelgo. Los premios no se cobran por adelantado', isCorrect: true },
            { id: 'ask', label: 'Pregunto cuál es el premio y doy mis datos', isCorrect: false },
          ],
          feedback: {
            correct: 'Muy bien. Los premios reales no te piden dinero ni datos personales por teléfono. Si no participaste en un sorteo, desconfía.',
            incorrect: 'Los premios falsos buscan que pagues o entregues tus datos. Nunca des dinero por adelantado para recibir un supuesto premio.',
          },
        },
      },
    ],
  },
  {
    id: 'smishing',
    title: 'SMS falsos',
    subtitle: 'Smishing',
    description: 'Identifica mensajes de texto sospechosos.',
    icon: MessageSquare,
    color: 'text-warning',
    bg: 'bg-yellow-100',
    scenarios: [
      {
        id: 'smishing-bank-blocked',
        moduleId: 'smishing',
        title: 'Cuenta bloqueada',
        summary: 'SMS que dice que tu cuenta fue bloqueada y pide que hagas clic en un enlace.',
        alertSignals: ['Mensaje de urgencia', 'Enlace sospechoso'],
        difficulty: 'Fácil',
        content: {
          type: 'smishing',
          senderName: 'Banco Seguro',
          senderNumber: 'BcoSeguro',
          messages: [
            { sender: 'them', text: 'BANCO SEGURO: Su cuenta ha sido bloqueada por seguridad. Ingrese aquí para desbloquearla: bancoseguro-desbloqueo.pe' },
          ],
          choices: [
            { id: 'click', label: 'Hago clic en el enlace', isCorrect: false },
            { id: 'ignore', label: 'Ignoro el mensaje y entro a la app oficial', isCorrect: true },
            { id: 'reply', label: 'Respondo pidiendo ayuda', isCorrect: false },
          ],
          feedback: {
            correct: 'Correcto. Los bancos no bloquean cuentas por SMS ni piden que hagas clic en enlaces. Usa siempre la app oficial.',
            incorrect: 'Cuidado. El enlace podría robar tus datos. Nunca ingreses información desde enlaces de mensajes sospechosos.',
          },
        },
      },
      {
        id: 'smishing-fake-prize',
        moduleId: 'smishing',
        title: 'Falso premio',
        summary: 'SMS de premio inesperado con un enlace para reclamar.',
        alertSignals: ['Premio no solicitado', 'Enlace corto o extraño'],
        difficulty: 'Fácil',
        content: {
          type: 'smishing',
          senderName: 'PremiosYa',
          senderNumber: '+51 999 222 333',
          messages: [
            { sender: 'them', text: '¡Felicidades! Ganaste un celular Samsung. Reclama tu premio aquí: premiosya.pe/gana' },
          ],
          choices: [
            { id: 'claim', label: 'Abro el enlace para reclamar', isCorrect: false },
            { id: 'delete', label: 'Elimino el mensaje', isCorrect: true },
            { id: 'share', label: 'Comparto el enlace con un familiar', isCorrect: false },
          ],
          feedback: {
            correct: 'Bien. Si no participaste en un sorteo, el premio no existe. Es mejor eliminar el mensaje.',
            incorrect: 'Los enlaces de premios falsos pueden robar tus datos o infectar tu celular. No abras enlaces de remitentes desconocidos.',
          },
        },
      },
      {
        id: 'smishing-yape-fake',
        moduleId: 'smishing',
        title: 'Yape falso por S/250',
        summary: 'SMS con supuesto Yape por S/250 y enlace para reclamar.',
        alertSignals: ['Notificación de pago inesperado', 'Enlace para reclamar'],
        difficulty: 'Medio',
        content: {
          type: 'smishing',
          senderName: 'Yape',
          senderNumber: 'Yape',
          messages: [
            { sender: 'them', text: 'Has recibido S/250.00 en Yape. Reclama tu dinero antes de 24 horas: yape-reclamar.pe' },
          ],
          choices: [
            { id: 'reclaim', label: 'Hago clic para reclamar el dinero', isCorrect: false },
            { id: 'check-app', label: 'Reviso directamente en la app de Yape', isCorrect: true },
            { id: 'reply-sms', label: 'Respondo el SMS confirmando mis datos', isCorrect: false },
          ],
          feedback: {
            correct: 'Muy bien. Las notificaciones reales de Yape aparecen en la app oficial. No necesitas hacer clic en enlaces de SMS.',
            incorrect: 'Yape nunca te pedirá reclamar dinero por SMS. Si recibes un pago, verifícalo directamente en la app oficial.',
          },
        },
      },
      {
        id: 'smishing-delivery',
        moduleId: 'smishing',
        title: 'Entrega de paquete',
        summary: 'SMS de delivery que pide un pago para entregar un paquete.',
        alertSignals: ['Pago inesperado', 'No esperabas ningún paquete'],
        difficulty: 'Medio',
        content: {
          type: 'smishing',
          senderName: 'Delivery Express',
          senderNumber: '+51 999 444 555',
          messages: [
            { sender: 'them', text: 'Su paquete está retenido en nuestra bodega. Pague S/12.50 de envío aquí para recibirlo: delivery-express.pe/pago' },
          ],
          choices: [
            { id: 'pay-delivery', label: 'Pago el envío para recibir el paquete', isCorrect: false },
            { id: 'ignore-delivery', label: 'Ignoro el mensaje porque no esperaba nada', isCorrect: true },
            { id: 'ask-track', label: 'Respondo pidiendo el número de seguimiento', isCorrect: false },
          ],
          feedback: {
            correct: 'Correcto. Si no esperabas un paquete, desconfía. Las empresas de delivery confiables no cobran por SMS de esta forma.',
            incorrect: 'Este mensaje busca que pagues por un paquete que probablemente no existe. Verifica siempre en la tienda o app oficial.',
          },
        },
      },
    ],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp falsos',
    subtitle: 'WhatsApp',
    description: 'Reconoce mensajes y comprobantes falsos.',
    icon: MessageCircle,
    color: 'text-success',
    bg: 'bg-green-100',
    scenarios: [
      {
        id: 'whatsapp-family-number',
        moduleId: 'whatsapp',
        title: 'Familiar con número nuevo',
        summary: 'Contacto desconocido dice ser familiar y pide dinero.',
        alertSignals: ['Número nuevo', 'Urgencia económica'],
        difficulty: 'Medio',
        content: {
          type: 'whatsapp',
          contactName: 'Sobrino Luis',
          contactNumber: '+51 999 123 456',
          messages: [
            { sender: 'them', text: 'Tío, soy Luis. Tuve un problema con mi celular y tuve que cambiar de número.' },
            { sender: 'them', text: 'Necesito que me prestes S/300 urgentes. Es una emergencia y no le quiero decir a mi mamá todavía.' },
          ],
          choices: [
            { id: 'send', label: 'Le envío el dinero por Yape', isCorrect: false },
            { id: 'verify', label: 'Llamo al número antiguo de Luis para confirmar', isCorrect: true },
            { id: 'photo', label: 'Le pido una foto y le envío el dinero', isCorrect: false },
          ],
          feedback: {
            correct: 'Muy bien. Verificar por otro medio conocido es la forma más segura de evitar esta estafa.',
            incorrect: 'Desconfía de números nuevos que piden dinero con urgencia. Llama a la persona por su número habitual.',
          },
        },
      },
      {
        id: 'whatsapp-yape-receipt',
        moduleId: 'whatsapp',
        title: 'Comprobante Yape falso',
        summary: 'Alguien envía un comprobante falso por S/180 y pide que entregues el producto.',
        alertSignals: ['Comprobante puede ser editado', 'Presión para entregar'],
        difficulty: 'Difícil',
        content: {
          type: 'whatsapp',
          contactName: 'María L.',
          contactNumber: '+51 999 777 888',
          messages: [
            { sender: 'them', text: 'Hola, ya te Yapeé los S/180 por el producto. Te envío el comprobante.' },
            { sender: 'them', text: '', isReceipt: true, receiptAmount: 'S/180.00', receiptService: 'Yape' },
            { sender: 'them', text: '¿Puedes traerme el producto ahora?' },
          ],
          choices: [
            { id: 'deliver', label: 'Le entrego el producto porque ya pagó', isCorrect: false },
            { id: 'check', label: 'Reviso primero en mi app de banco si llegó el dinero', isCorrect: true },
            { id: 'ask', label: 'Le pido que me espere un momento', isCorrect: false },
          ],
          feedback: {
            correct: 'Excelente. Las capturas y comprobantes pueden ser falsos. Confirma siempre el dinero en tu app de banco.',
            incorrect: 'Cuidado. Este comprobante es falso. Nunca entregues un producto sin confirmar el pago en tu app oficial.',
          },
        },
      },
      {
        id: 'whatsapp-refund',
        moduleId: 'whatsapp',
        title: 'Devolución de S/450',
        summary: 'Mensaje de supuesto soporte ofreciendo una devolución.',
        alertSignals: ['Oferta de devolución inesperada', 'Piden datos'],
        difficulty: 'Medio',
        content: {
          type: 'whatsapp',
          contactName: 'Soporte Banco',
          contactNumber: '+51 999 000 999',
          messages: [
            { sender: 'them', text: 'Buenas tardes, somos el área de devoluciones de su banco.' },
            { sender: 'them', text: 'Usted tiene una devolución pendiente de S/450. Para procesarla, confirme su número de cuenta y DNI.' },
          ],
          choices: [
            { id: 'data', label: 'Envío mi número de cuenta y DNI', isCorrect: false },
            { id: 'ignore', label: 'Ignoro el mensaje y llamo al banco por otro medio', isCorrect: true },
            { id: 'ask', label: 'Pido más detalles de la devolución', isCorrect: false },
          ],
          feedback: {
            correct: 'Correcto. El banco no te pedirá datos sensibles por WhatsApp. Llama siempre a la línea oficial.',
            incorrect: 'Nunca compartas datos bancarios o personales por WhatsApp. Los estafadores se hacen pasar por soporte.',
          },
        },
      },
      {
        id: 'whatsapp-wrong-transfer',
        moduleId: 'whatsapp',
        title: 'Transferencia equivocada',
        summary: 'Dicen haberte depositado por error y piden que devuelvas el dinero.',
        alertSignals: ['Historia de error', 'Presión para devolver'],
        difficulty: 'Difícil',
        content: {
          type: 'whatsapp',
          contactName: 'Carlos R.',
          contactNumber: '+51 999 333 444',
          messages: [
            { sender: 'them', text: 'Hola, te deposité S/900 por error. Necesito que me devuelvas el dinero.' },
            { sender: 'them', text: 'Te envío el comprobante. Por favor, hazme la devolución hoy mismo.' },
            { sender: 'them', text: '', isReceipt: true, receiptAmount: 'S/900.00', receiptService: 'Transferencia bancaria' },
          ],
          choices: [
            { id: 'return', label: 'Le devuelvo el dinero porque me muestra el comprobante', isCorrect: false },
            { id: 'bank', label: 'Llamo a mi banco para verificar si recibí ese depósito', isCorrect: true },
            { id: 'ask-time', label: 'Le pido que me dé un día para revisar', isCorrect: false },
          ],
          feedback: {
            correct: 'Muy bien. Antes de devolver dinero, verifica con tu banco si realmente recibiste el depósito.',
            incorrect: 'Los comprobantes pueden ser falsos. Nunca devuelvas dinero sin confirmar el depósito con tu banco.',
          },
        },
      },
      {
        id: 'whatsapp-support-code',
        moduleId: 'whatsapp',
        title: 'Soporte pide código',
        summary: 'WhatsApp de "soporte" pide un código de verificación.',
        alertSignals: ['Soporte no solicita códigos', 'Código de verificación personal'],
        difficulty: 'Fácil',
        content: {
          type: 'whatsapp',
          contactName: 'Soporte WhatsApp',
          contactNumber: '+51 999 555 666',
          messages: [
            { sender: 'them', text: 'Hola, somos soporte de WhatsApp. Tu cuenta será suspendida en 24 horas.' },
            { sender: 'them', text: 'Para verificar tu identidad, envíanos el código de 6 dígitos que acaba de llegar a tu celular.' },
          ],
          choices: [
            { id: 'send-code', label: 'Le envío el código para no perder mi cuenta', isCorrect: false },
            { id: 'block', label: 'Bloqueo el número y reporto como estafa', isCorrect: true },
            { id: 'ask-why', label: 'Le pregunto por qué necesitan el código', isCorrect: false },
          ],
          feedback: {
            correct: 'Excelente. WhatsApp nunca te pedirá tu código de verificación. Compartirlo permite que te roben la cuenta.',
            incorrect: 'Nunca compartas códigos de verificación. Con ellos, un estafador puede tomar el control de tu cuenta.',
          },
        },
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Correos falsos',
    subtitle: 'Phishing',
    description: 'Aprende a detectar correos engañosos.',
    icon: Mail,
    color: 'text-danger',
    bg: 'bg-red-100',
    scenarios: [
      {
        id: 'phishing-bank-blocked',
        moduleId: 'phishing',
        title: 'Cuenta bancaria bloqueada',
        summary: 'Correo que advierte bloqueo y pide hacer clic en un enlace.',
        alertSignals: ['Amenaza de bloqueo', 'Enlace para confirmar datos'],
        difficulty: 'Fácil',
        content: {
          type: 'email',
          fromName: 'Banco Seguro',
          fromEmail: 'seguridad@bancoseguro-seguro.pe',
          subject: 'Importante: su cuenta ha sido bloqueada',
          body: [
            'Estimado cliente,',
            'Hemos detectado actividad inusual en su cuenta. Para su seguridad, hemos bloqueado el acceso temporalmente.',
            'Haga clic en el siguiente enlace para verificar sus datos y desbloquear su cuenta.',
          ],
          linkText: 'Verificar cuenta ahora',
          choices: [
            { id: 'click', label: 'Hago clic en el enlace para verificar', isCorrect: false },
            { id: 'delete', label: 'Borro el correo y entro a la web oficial del banco', isCorrect: true },
            { id: 'reply', label: 'Respondo el correo pidiendo ayuda', isCorrect: false },
          ],
          feedback: {
            correct: 'Muy bien. Los bancos no piden verificar datos por correo. Entra siempre por la web oficial.',
            incorrect: 'El enlace podría ser falso y robar tus datos. Nunca ingreses información desde enlaces de correos sospechosos.',
          },
        },
      },
      {
        id: 'phishing-public-institution',
        moduleId: 'phishing',
        title: 'Falsa institución pública',
        summary: 'Correo de supuesta SUNAT o entidad pública solicitando datos.',
        alertSignals: ['Remitente dudoso', 'Solicitud de datos personales'],
        difficulty: 'Medio',
        content: {
          type: 'email',
          fromName: 'SUNAT - Notificaciones',
          fromEmail: 'notificaciones@sunnat-gob.pe',
          subject: 'Tiene una deuda pendiente',
          body: [
            'Estimado contribuyente,',
            'Usted tiene una deuda de S/1,250 pendiente. Para evitar embargos, descargue el documento adjunto y confirme sus datos.',
            'El plazo vence en 24 horas.',
          ],
          attachmentName: 'deuda_SUNAT.pdf',
          choices: [
            { id: 'download', label: 'Descargo el archivo adjunto', isCorrect: false },
            { id: 'official', label: 'Entro directamente a sunat.gob.pe en mi navegador', isCorrect: true },
            { id: 'reply', label: 'Respondo el correo solicitando información', isCorrect: false },
          ],
          feedback: {
            correct: 'Correcto. Las instituciones públicas no envían deudas ni adjuntos por correo. Entra siempre al sitio oficial.',
            incorrect: 'Los archivos adjuntos de correos falsos pueden contener virus o robar información. No los descargues.',
          },
        },
      },
      {
        id: 'phishing-promotion',
        moduleId: 'phishing',
        title: 'Promoción o premio falso',
        summary: 'Correo de oferta o premio con un botón llamativo.',
        alertSignals: ['Oferta demasiado buena', 'Botón para reclamar'],
        difficulty: 'Fácil',
        content: {
          type: 'email',
          fromName: 'Supermercado Ofertas',
          fromEmail: 'promociones@superofertas-premios.pe',
          subject: '¡Ganaste una gift card de S/500!',
          body: [
            '¡Felicidades! Has sido seleccionado como ganador de una gift card de S/500.',
            'Solo ingresa tus datos personales y realiza el pago de S/15 por envío para reclamar tu premio.',
          ],
          linkText: 'Reclamar premio',
          choices: [
            { id: 'claim', label: 'Hago clic y completo mis datos', isCorrect: false },
            { id: 'delete', label: 'Elimino el correo porque no participé en ningún sorteo', isCorrect: true },
            { id: 'forward', label: 'Lo reenvío a mis familiares por si también ganan', isCorrect: false },
          ],
          feedback: {
            correct: 'Bien. Si no participaste en un sorteo, el premio no existe. Los premios reales no te piden dinero por adelantado.',
            incorrect: 'Los premios falsos buscan robar tus datos o tu dinero. No hagas clic ni compartas estos correos.',
          },
        },
      },
      {
        id: 'phishing-attachment',
        moduleId: 'phishing',
        title: 'Archivo adjunto sospechoso',
        summary: 'Correo con archivo adjunto inesperado.',
        alertSignals: ['Adjunto no esperado', 'Remitente desconocido'],
        difficulty: 'Medio',
        content: {
          type: 'email',
          fromName: 'Recursos Humanos',
          fromEmail: 'rrhh@empresa-desconocida.pe',
          subject: 'Contrato actualizado',
          body: [
            'Estimado colaborador,',
            'Adjunto encontrará su contrato actualizado. Por favor, revíselo y envíenos sus datos actualizados a la brevedad.',
          ],
          attachmentName: 'contrato.zip',
          choices: [
            { id: 'download', label: 'Descargo el archivo para revisarlo', isCorrect: false },
            { id: 'ignore', label: 'No abro adjuntos inesperados de remitentes desconocidos', isCorrect: true },
            { id: 'reply', label: 'Respondo preguntando quién me lo envió', isCorrect: false },
          ],
          feedback: {
            correct: 'Correcto. No debes abrir archivos adjuntos inesperados, especialmente de remitentes que no conoces.',
            incorrect: 'Los archivos comprimidos como .zip pueden contener virus. Nunca los abras si no esperabas el correo.',
          },
        },
      },
    ],
  },
];

export function getModuleById(id: ModuleId): PracticeModule | undefined {
  return practiceModules.find((module) => module.id === id);
}

export function getScenarioById(id: string): Scenario | undefined {
  for (const module of practiceModules) {
    const scenario = module.scenarios.find((s) => s.id === id);
    if (scenario) return scenario;
  }
  return undefined;
}
