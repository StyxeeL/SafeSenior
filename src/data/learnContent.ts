export interface LearnSection {
  heading: string;
  paragraphs: string[];
  tips?: string[];
}

export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  sections: LearnSection[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: 'intro',
    title: '¿Qué son las estafas digitales?',
    description: 'Conoce las formas más comunes de engaño en internet y teléfono.',
    icon: 'AlertTriangle',
    color: 'text-danger',
    bg: 'bg-red-100',
    sections: [
      {
        heading: '¿De qué se trata?',
        paragraphs: [
          'Las estafas digitales son engaños que usan el teléfono, los mensajes de texto, el correo electrónico o las redes sociales para robarte dinero o información personal.',
          'Los estafadores se hacen pasar por bancos, familiares, empresas conocidas o instituciones públicas para ganarse tu confianza.',
        ],
      },
      {
        heading: '¿Por qué debemos prevenirlas?',
        paragraphs: [
          'Muchas personas han perdido ahorros o han visto comprometida su información personal por caer en una estafa.',
          'Aprender a reconocerlas es la mejor forma de protegernos y de ayudar a nuestros familiares.',
        ],
        tips: [
          'Desconfía de ofertas que parezcan demasiado buenas para ser verdad.',
          'Nunca compartas contraseñas, códigos o datos bancarios por teléfono o mensaje.',
        ],
      },
    ],
  },
  {
    id: 'vishing',
    title: 'Llamadas falsas (vishing)',
    description: 'Aprende a identificar cuando alguien finge ser del banco o de un familiar.',
    icon: 'Phone',
    color: 'text-primary',
    bg: 'bg-blue-100',
    sections: [
      {
        heading: '¿Qué es el vishing?',
        paragraphs: [
          'El vishing es una estafa en la que una persona te llama por teléfono fingiendo ser alguien de confianza, como un trabajador del banco o un familiar.',
          'Su objetivo es que reveles información personal, códigos de seguridad o que realices una transferencia.',
        ],
      },
      {
        heading: 'Señales de alerta',
        paragraphs: [
          'Te piden un código de seguridad o contraseña.',
          'Te presionan para que actúes rápido sin pensar.',
          'Te dicen que hay un problema urgente con tu cuenta.',
        ],
        tips: [
          'Colgar y llamar tú directamente al número oficial del banco.',
          'No marques números que te den por teléfono; busca el oficial en la web o en tu tarjeta.',
        ],
      },
    ],
  },
  {
    id: 'smishing',
    title: 'SMS falsos (smishing)',
    description: 'Mensajes de texto que buscan robar tus datos.',
    icon: 'MessageSquare',
    color: 'text-warning',
    bg: 'bg-yellow-100',
    sections: [
      {
        heading: '¿Qué es el smishing?',
        paragraphs: [
          'El smishing son mensajes de texto falsos que parecen venir de tu banco, de una tienda o de un servicio de delivery.',
          'Suelen incluir un enlace para que ingreses tus datos o descargues algo peligroso.',
        ],
      },
      {
        heading: 'Cómo reconocerlos',
        paragraphs: [
          'Usan frases de urgencia: "Tu cuenta será bloqueada" o "Paquete retenido".',
          'Incluyen enlaces cortos o extraños.',
          'Te piden que pagues o confirmes datos por mensaje.',
        ],
        tips: [
          'No abras enlaces de mensajes sospechosos.',
          'Si dudas, entra directamente a la app oficial o llama al banco.',
        ],
      },
    ],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp falsos',
    description: 'Mensajes de contactos desconocidos o comprobantes falsos.',
    icon: 'MessageCircle',
    color: 'text-success',
    bg: 'bg-green-100',
    sections: [
      {
        heading: 'Estafas comunes por WhatsApp',
        paragraphs: [
          'Alguien te escribe con un número nuevo diciendo ser un familiar y pidiendo dinero urgente.',
          'Te envían un comprobante de pago falso para que entregues un producto o devuelvas dinero.',
          'Un supuesto soporte técnico te pide un código de verificación.',
        ],
      },
      {
        heading: 'Cómo protegerte',
        paragraphs: [
          'Verifica la identidad llamando a la persona por otro medio.',
          'Nunca compartas códigos de verificación que lleguen a tu teléfono.',
          'Confirma los pagos directamente en tu app de banco, no solo con una captura.',
        ],
        tips: [
          'Desconfía de mensajes que piden dinero con urgencia.',
          'Si te envían un comprobante, revisa que el dinero esté realmente en tu cuenta.',
        ],
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Correos falsos (phishing)',
    description: 'Correos que imitan a bancos o instituciones.',
    icon: 'Mail',
    color: 'text-primary',
    bg: 'bg-primary-light',
    sections: [
      {
        heading: '¿Qué es el phishing?',
        paragraphs: [
          'El phishing son correos electrónicos falsos que imitan a bancos, tiendas o instituciones públicas.',
          'Su objetivo es que hagas clic en un enlace malicioso o descargues un archivo infectado.',
        ],
      },
      {
        heading: 'Señales de alerta',
        paragraphs: [
          'El remitente tiene una dirección similar, pero no igual, a la oficial.',
          'El correo pide que actúes de inmediato o amenaza con bloquear tu cuenta.',
          'Hay errores de ortografía o diseño extraño.',
        ],
        tips: [
          'No hagas clic en enlaces de correos sospechosos.',
          'Entra directamente a la página oficial escribiendo la dirección en el navegador.',
          'No descargues archivos adjuntos inesperados.',
        ],
      },
    ],
  },
  {
    id: 'signals',
    title: 'Señales de alerta',
    description: 'Reconoce los indicios que indican que algo no está bien.',
    icon: 'AlertTriangle',
    color: 'text-danger',
    bg: 'bg-red-100',
    sections: [
      {
        heading: 'Indicios de una posible estafa',
        paragraphs: [
          'Te piden dinero o datos con urgencia.',
          'Te ofrecen premios o devoluciones que no esperabas.',
          'Te piden que no le cuentes a nadie.',
          'Te piden códigos, contraseñas o claves de acceso.',
        ],
      },
      {
        heading: 'Pregúntate siempre',
        paragraphs: [
          '¿Esta persona o empresa me contactaría de esta forma?',
          '¿Por qué me piden tanta prisa?',
          '¿Puedo verificar esta información por otro medio?',
        ],
        tips: [
          'Cuando dudes, detente y consulta con un familiar o amigo de confianza.',
          'Es mejor perder unos minutos verificando que perder dinero.',
        ],
      },
    ],
  },
  {
    id: 'response',
    title: 'Qué hacer si sospechas',
    description: 'Pasos sencillos para protegerte y reportar.',
    icon: 'CheckCircle',
    color: 'text-success',
    bg: 'bg-green-100',
    sections: [
      {
        heading: 'Si recibes un mensaje sospechoso',
        paragraphs: [
          'No respondas, no hagas clic y no descargues nada.',
          'Bloquea el número o el correo si es posible.',
          'Elimina el mensaje una vez que estés seguro de que es una estafa.',
        ],
      },
      {
        heading: 'Si ya compartiste información',
        paragraphs: [
          'Cambia las contraseñas de tus cuentas lo antes posible.',
          'Comunícate con tu banco si compartiste datos financieros.',
          'Reporta el incidente a la comisaría o a la plataforma donde ocurrió.',
        ],
        tips: [
          'Guarda capturas de pantalla como evidencia antes de eliminar.',
          'Cuéntales a tus familiares para que también estén alerta.',
        ],
      },
    ],
  },
];

export function getTopicById(id: string): LearnTopic | undefined {
  return learnTopics.find((topic) => topic.id === id);
}
