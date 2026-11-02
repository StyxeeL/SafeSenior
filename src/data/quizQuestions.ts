import type { ModuleId } from './practiceScenarios';

export interface QuizChoice {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  situation: string;
  question: string;
  choices: QuizChoice[];
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-vishing-otp',
    moduleId: 'vishing',
    situation: 'Recibes una llamada de alguien que dice ser de tu banco. Te pide el código de seguridad que acaba de llegar a tu celular.',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le doy el código porque dice que es del banco.', isCorrect: false },
      { id: 'b', label: 'Cuelgo y llamo al número oficial del banco.', isCorrect: true },
      { id: 'c', label: 'Le pido su nombre y le doy el código.', isCorrect: false },
    ],
    explanation:
      'Ningún banco te pedirá tu código de seguridad por teléfono. Lo más seguro es colgar y llamar tú al número oficial.',
  },
  {
    id: 'quiz-smishing-link',
    moduleId: 'smishing',
    situation: 'Te llega un SMS que dice: "Tu cuenta ha sido bloqueada. Haz clic aquí para desbloquearla".',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Hago clic en el enlace para ver de qué se trata.', isCorrect: false },
      { id: 'b', label: 'Ignoro el mensaje y entro a la app oficial de mi banco.', isCorrect: true },
      { id: 'c', label: 'Respondo el SMS pidiendo más información.', isCorrect: false },
    ],
    explanation:
      'Los bancos no bloquean cuentas por SMS ni piden que hagas clic en enlaces. Usa siempre la app o página oficial.',
  },
  {
    id: 'quiz-whatsapp-relative',
    moduleId: 'whatsapp',
    situation: 'Un número desconocido te escribe por WhatsApp diciendo que es tu sobrino y pide dinero urgente.',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Le envío el dinero porque necesita ayuda.', isCorrect: false },
      { id: 'b', label: 'Lo llamo por otro número conocido para verificar.', isCorrect: true },
      { id: 'c', label: 'Le pido una foto y le envío el dinero.', isCorrect: false },
    ],
    explanation:
      'Antes de enviar dinero, verifica la identidad llamando a la persona por un medio que conozcas.',
  },
  {
    id: 'quiz-phishing-email',
    moduleId: 'phishing',
    situation: 'Recibes un correo de una dirección parecida a la de tu banco que pide confirmar tus datos haciendo clic en un botón.',
    question: '¿Qué haces?',
    choices: [
      { id: 'a', label: 'Hago clic y completo mis datos.', isCorrect: false },
      { id: 'b', label: 'Reviso bien el remitente y entro directamente al sitio oficial.', isCorrect: true },
      { id: 'c', label: 'Respondo el correo preguntando si es seguro.', isCorrect: false },
    ],
    explanation:
      'Los estafadores imitan direcciones de correo. Nunca ingreses datos desde enlaces de correos; entra directamente al sitio oficial.',
  },
];
