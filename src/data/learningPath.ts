import type { ModuleId } from './practiceScenarios';

export type StepType = 'theory' | 'practice' | 'quiz' | 'final';

export interface LearningPathStep {
  id: string;
  moduleId: ModuleId | 'final';
  type: StepType;
  title: string;
  shortTitle: string;
  subtitle: string;
  link: string;
  targetId: string;
  iconName: 'book' | 'phone' | 'target' | 'shield' | 'trophy';
}

export interface LearningPathModule {
  id: ModuleId;
  number: number;
  title: string;
  subtitle: string;
  colorScheme: {
    name: string;
    primaryHex: string;
    bgBanner: string;
    bgLight: string;
    border: string;
    text: string;
    nodeBg: string;
    ringColor: string;
  };
  steps: LearningPathStep[];
}

export const learningPathModules: LearningPathModule[] = [
  {
    id: 'smishing',
    number: 1,
    title: 'Módulo 1: SMS Falsos',
    subtitle: 'Reconoce mensajes de texto engañosos y enlaces peligrosos',
    colorScheme: {
      name: 'blue',
      primaryHex: '#2563EB',
      bgBanner: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      nodeBg: 'bg-blue-600',
      ringColor: 'ring-blue-400',
    },
    steps: [
      {
        id: 'step-smishing-theory',
        moduleId: 'smishing',
        type: 'theory',
        title: 'Aprende: ¿Qué son los SMS falsos?',
        shortTitle: 'Aprende SMS',
        subtitle: 'Conoce cómo operan los estafadores por mensaje de texto',
        link: '/aprende/smishing',
        targetId: 'smishing',
        iconName: 'book',
      },
      {
        id: 'step-smishing-p1',
        moduleId: 'smishing',
        type: 'practice',
        title: 'Práctica: Cuenta bloqueada',
        shortTitle: 'Práctica 1',
        subtitle: 'Un SMS urgente te pide entrar a un enlace',
        link: '/practica/smishing/smishing-bank-blocked',
        targetId: 'smishing-bank-blocked',
        iconName: 'phone',
      },
      {
        id: 'step-smishing-p2',
        moduleId: 'smishing',
        type: 'practice',
        title: 'Práctica: Premio sospechoso',
        shortTitle: 'Práctica 2',
        subtitle: '¿Te ganaste un premio de la nada?',
        link: '/practica/smishing/smishing-fake-prize',
        targetId: 'smishing-fake-prize',
        iconName: 'target',
      },
      {
        id: 'step-smishing-quiz',
        moduleId: 'smishing',
        type: 'quiz',
        title: 'Reto del Módulo: SMS',
        shortTitle: 'Reto SMS',
        subtitle: 'Demuestra lo aprendido y asegura tus mensajes',
        link: '/evaluame?module=smishing',
        targetId: 'quiz-smishing',
        iconName: 'shield',
      },
    ],
  },
  {
    id: 'whatsapp',
    number: 2,
    title: 'Módulo 2: WhatsApp Falsos',
    subtitle: 'Identifica cuentas falsas, pedidos de dinero y comprobantes adulterados',
    colorScheme: {
      name: 'emerald',
      primaryHex: '#059669',
      bgBanner: 'bg-emerald-600',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      nodeBg: 'bg-emerald-600',
      ringColor: 'ring-emerald-400',
    },
    steps: [
      {
        id: 'step-whatsapp-theory',
        moduleId: 'whatsapp',
        type: 'theory',
        title: 'Aprende: Engaños en WhatsApp',
        shortTitle: 'Aprende WhatsApp',
        subtitle: 'Cuidado con números desconocidos que dicen conocerte',
        link: '/aprende/whatsapp',
        targetId: 'whatsapp',
        iconName: 'book',
      },
      {
        id: 'step-whatsapp-p1',
        moduleId: 'whatsapp',
        type: 'practice',
        title: 'Práctica: "Familiar" en apuros',
        shortTitle: 'Práctica 1',
        subtitle: 'Un contacto pide dinero urgente por una supuesta emergencia',
        link: '/practica/whatsapp/whatsapp-family-number',
        targetId: 'whatsapp-family-number',
        iconName: 'phone',
      },
      {
        id: 'step-whatsapp-p2',
        moduleId: 'whatsapp',
        type: 'practice',
        title: 'Práctica: Comprobante falso de Yape',
        shortTitle: 'Práctica 2',
        subtitle: 'Aprende a comprobar si el dinero llegó antes de entregar',
        link: '/practica/whatsapp/whatsapp-yape-receipt',
        targetId: 'whatsapp-yape-receipt',
        iconName: 'target',
      },
      {
        id: 'step-whatsapp-quiz',
        moduleId: 'whatsapp',
        type: 'quiz',
        title: 'Reto del Módulo: WhatsApp',
        shortTitle: 'Reto WhatsApp',
        subtitle: 'Pon a prueba tu intuición en conversaciones',
        link: '/evaluame?module=whatsapp',
        targetId: 'quiz-whatsapp',
        iconName: 'shield',
      },
    ],
  },
  {
    id: 'vishing',
    number: 3,
    title: 'Módulo 3: Llamadas Falsas',
    subtitle: 'Aprende a colgar a tiempo frente a supuestos bancos y presiones',
    colorScheme: {
      name: 'purple',
      primaryHex: '#7C3AED',
      bgBanner: 'bg-purple-600',
      bgLight: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      nodeBg: 'bg-purple-600',
      ringColor: 'ring-purple-400',
    },
    steps: [
      {
        id: 'step-vishing-theory',
        moduleId: 'vishing',
        type: 'theory',
        title: 'Aprende: ¿Quién te llama?',
        shortTitle: 'Aprende Llamadas',
        subtitle: 'Conoce los trucos de voz para apurar y asustar',
        link: '/aprende/vishing',
        targetId: 'vishing',
        iconName: 'book',
      },
      {
        id: 'step-vishing-p1',
        moduleId: 'vishing',
        type: 'practice',
        title: 'Práctica: Código del banco',
        shortTitle: 'Práctica 1',
        subtitle: 'Alguien que dice ser del banco te pide el código de seguridad',
        link: '/practica/vishing/vishing-bank-otp',
        targetId: 'vishing-bank-otp',
        iconName: 'phone',
      },
      {
        id: 'step-vishing-p2',
        moduleId: 'vishing',
        type: 'practice',
        title: 'Práctica: Llamada de emergencia',
        shortTitle: 'Práctica 2',
        subtitle: 'Voz alterada pidiendo auxilio económico',
        link: '/practica/vishing/vishing-family-number',
        targetId: 'vishing-family-number',
        iconName: 'target',
      },
      {
        id: 'step-vishing-quiz',
        moduleId: 'vishing',
        type: 'quiz',
        title: 'Reto del Módulo: Llamadas',
        shortTitle: 'Reto Llamadas',
        subtitle: 'Comprueba tu seguridad al responder el teléfono',
        link: '/evaluame?module=vishing',
        targetId: 'quiz-vishing',
        iconName: 'shield',
      },
    ],
  },
  {
    id: 'phishing',
    number: 4,
    title: 'Módulo 4: Correos Falsos',
    subtitle: 'Revisa remitentes, notificaciones de entidades y archivos adjuntos',
    colorScheme: {
      name: 'amber',
      primaryHex: '#D97706',
      bgBanner: 'bg-amber-600',
      bgLight: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      nodeBg: 'bg-amber-600',
      ringColor: 'ring-amber-400',
    },
    steps: [
      {
        id: 'step-phishing-theory',
        moduleId: 'phishing',
        type: 'theory',
        title: 'Aprende: Correos fraudulentos',
        shortTitle: 'Aprende Correos',
        subtitle: 'Cómo saber si un correo electrónico es genuino',
        link: '/aprende/phishing',
        targetId: 'phishing',
        iconName: 'book',
      },
      {
        id: 'step-phishing-p1',
        moduleId: 'phishing',
        type: 'practice',
        title: 'Práctica: Banco bloqueado por correo',
        shortTitle: 'Práctica 1',
        subtitle: 'Un correo te advierte que tu cuenta está suspendida',
        link: '/practica/phishing/phishing-bank-blocked',
        targetId: 'phishing-bank-blocked',
        iconName: 'phone',
      },
      {
        id: 'step-phishing-p2',
        moduleId: 'phishing',
        type: 'practice',
        title: 'Práctica: Supuesta SUNAT',
        shortTitle: 'Práctica 2',
        subtitle: 'Notificación urgente de deudas con archivo para descargar',
        link: '/practica/phishing/phishing-public-institution',
        targetId: 'phishing-public-institution',
        iconName: 'target',
      },
      {
        id: 'step-phishing-quiz',
        moduleId: 'phishing',
        type: 'quiz',
        title: 'Reto del Módulo: Correos',
        shortTitle: 'Reto Correos',
        subtitle: 'Demuestra que ningún correo falso te engañará',
        link: '/evaluame?module=phishing',
        targetId: 'quiz-phishing',
        iconName: 'shield',
      },
    ],
  },
];

export const finalGraduationStep: LearningPathStep = {
  id: 'step-final-graduation',
  moduleId: 'final',
  type: 'final',
  title: 'Gran Reto: Graduación SABIA',
  shortTitle: 'Graduación',
  subtitle: 'Evaluación integradora de los 4 módulos. ¡Obtén tu Diploma!',
  link: '/evaluame?module=final',
  targetId: 'quiz-final',
  iconName: 'trophy',
};

export const allPathSteps: LearningPathStep[] = [
  ...learningPathModules.flatMap((m) => m.steps),
  finalGraduationStep,
];

