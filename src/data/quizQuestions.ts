import type { ModuleId } from './practiceScenarios';

export interface QuizChoice {
  id: string;
  label: string;
  isCorrect: boolean;
}

export type QuizVisualType = 'phone' | 'sms' | 'whatsapp' | 'email';

export interface QuizVisualData {
  // Phone
  callerName?: string;
  callerNumber?: string;
  avatarInitial?: string;
  // SMS / WhatsApp
  senderName?: string;
  senderNumber?: string;
  contactName?: string;
  contactNumber?: string;
  messages?: { sender: 'them' | 'user'; text: string; isLink?: boolean; isReceipt?: boolean; receiptAmount?: string; receiptService?: string }[];
  // Email
  fromName?: string;
  fromEmail?: string;
  subject?: string;
  body?: string[];
  linkText?: string;
  attachmentName?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  question: string;
  choices: QuizChoice[];
  explanation: string;
  visualType: QuizVisualType;
  visualData: QuizVisualData;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-vishing-otp',
    moduleId: 'vishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le doy el código porque dice que es del banco.', isCorrect: false },
      { id: 'b', label: 'Cuelgo y llamo al número oficial del banco.', isCorrect: true },
      { id: 'c', label: 'Le pido su nombre y luego le doy el código.', isCorrect: false },
    ],
    explanation:
      'Ningún banco te pedirá tu código de seguridad por teléfono. Lo más seguro es colgar y llamar tú al número oficial.',
    visualType: 'phone',
    visualData: {
      callerName: 'Banco Seguro',
      callerNumber: '+51 999 888 777',
      avatarInitial: 'BS',
    },
  },
  {
    id: 'quiz-vishing-family',
    moduleId: 'vishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le envío el dinero porque necesita ayuda.', isCorrect: false },
      { id: 'b', label: 'Cuelgo y llamo al número antiguo de mi sobrino.', isCorrect: true },
      { id: 'c', label: 'Le pido una foto y le envío el dinero.', isCorrect: false },
    ],
    explanation:
      'Antes de enviar dinero, verifica la identidad llamando a la persona por un medio que conozcas.',
    visualType: 'phone',
    visualData: {
      callerName: 'Sobrino Luis',
      callerNumber: '+51 999 123 456',
      avatarInitial: 'SL',
    },
  },
  {
    id: 'quiz-smishing-link',
    moduleId: 'smishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Hago clic en el enlace para ver de qué se trata.', isCorrect: false },
      { id: 'b', label: 'Ignoro el mensaje y entro a la app oficial de mi banco.', isCorrect: true },
      { id: 'c', label: 'Respondo el SMS pidiendo más información.', isCorrect: false },
    ],
    explanation:
      'Los bancos no bloquean cuentas por SMS ni piden que hagas clic en enlaces. Usa siempre la app o página oficial.',
    visualType: 'sms',
    visualData: {
      senderName: 'Banco Seguro',
      senderNumber: 'BcoSeguro',
      messages: [{ sender: 'them', text: 'BANCO SEGURO: Su cuenta ha sido bloqueada. Ingrese aquí para desbloquearla: bancoseguro-desbloqueo.pe' }],
    },
  },
  {
    id: 'quiz-smishing-yape',
    moduleId: 'smishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Hago clic para reclamar el dinero.', isCorrect: false },
      { id: 'b', label: 'Reviso directamente en la app de Yape.', isCorrect: true },
      { id: 'c', label: 'Respondo el SMS confirmando mis datos.', isCorrect: false },
    ],
    explanation:
      'Yape nunca te pedirá reclamar dinero por SMS. Si recibes un pago, verifícalo directamente en la app oficial.',
    visualType: 'sms',
    visualData: {
      senderName: 'Yape',
      senderNumber: 'Yape',
      messages: [{ sender: 'them', text: 'Has recibido S/250.00 en Yape. Reclama tu dinero antes de 24 horas: yape-reclamar.pe' }],
    },
  },
  {
    id: 'quiz-whatsapp-receipt',
    moduleId: 'whatsapp',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le entrego el producto porque ya pagó.', isCorrect: false },
      { id: 'b', label: 'Reviso primero en mi app de banco si llegó el dinero.', isCorrect: true },
      { id: 'c', label: 'Le pido que me espere un momento.', isCorrect: false },
    ],
    explanation:
      'Las capturas y comprobantes pueden ser falsos. Confirma siempre el dinero en tu app de banco antes de entregar algo.',
    visualType: 'whatsapp',
    visualData: {
      contactName: 'María L.',
      contactNumber: '+51 999 777 888',
      messages: [
        { sender: 'them', text: 'Hola, ya te Yapeé los S/180 por el producto. Te envío el comprobante.' },
        { sender: 'them', text: '', isReceipt: true, receiptAmount: 'S/180.00', receiptService: 'Yape' },
        { sender: 'them', text: '¿Puedes traerme el producto ahora?' },
      ],
    },
  },
  {
    id: 'quiz-whatsapp-code',
    moduleId: 'whatsapp',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le envío el código para no perder mi cuenta.', isCorrect: false },
      { id: 'b', label: 'Bloqueo el número y reporto como estafa.', isCorrect: true },
      { id: 'c', label: 'Le pregunto por qué necesitan el código.', isCorrect: false },
    ],
    explanation:
      'WhatsApp nunca te pedirá tu código de verificación. Compartirlo permite que un estafador tome el control de tu cuenta.',
    visualType: 'whatsapp',
    visualData: {
      contactName: 'Soporte WhatsApp',
      contactNumber: '+51 999 555 666',
      messages: [
        { sender: 'them', text: 'Hola, somos soporte de WhatsApp. Tu cuenta será suspendida en 24 horas.' },
        { sender: 'them', text: 'Para verificar tu identidad, envíanos el código de 6 dígitos que acaba de llegar a tu celular.' },
      ],
    },
  },
  {
    id: 'quiz-phishing-email',
    moduleId: 'phishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Hago clic y completo mis datos.', isCorrect: false },
      { id: 'b', label: 'Reviso bien el remitente y entro directamente al sitio oficial.', isCorrect: true },
      { id: 'c', label: 'Respondo el correo preguntando si es seguro.', isCorrect: false },
    ],
    explanation:
      'Los estafadores imitan direcciones de correo. Nunca ingreses datos desde enlaces de correos; entra directamente al sitio oficial.',
    visualType: 'email',
    visualData: {
      fromName: 'Banco Seguro',
      fromEmail: 'seguridad@bancoseguro-seguro.pe',
      subject: 'Importante: su cuenta ha sido bloqueada',
      body: [
        'Estimado cliente,',
        'Hemos detectado actividad inusual en su cuenta. Para su seguridad, hemos bloqueado el acceso temporalmente.',
        'Haga clic en el siguiente enlace para verificar sus datos y desbloquear su cuenta.',
      ],
      linkText: 'Verificar cuenta ahora',
    },
  },
  {
    id: 'quiz-phishing-attachment',
    moduleId: 'phishing',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Descargo el archivo para revisarlo.', isCorrect: false },
      { id: 'b', label: 'No abro adjuntos inesperados de remitentes desconocidos.', isCorrect: true },
      { id: 'c', label: 'Respondo preguntando quién me lo envió.', isCorrect: false },
    ],
    explanation:
      'Los archivos adjuntos inesperados, especialmente .zip, pueden contener virus. No los abras si no esperabas el correo.',
    visualType: 'email',
    visualData: {
      fromName: 'Recursos Humanos',
      fromEmail: 'rrhh@empresa-desconocida.pe',
      subject: 'Contrato actualizado',
      body: [
        'Estimado colaborador,',
        'Adjunto encontrará su contrato actualizado. Por favor, revíselo y envíenos sus datos actualizados a la brevedad.',
      ],
      attachmentName: 'contrato.zip',
    },
  },
];
