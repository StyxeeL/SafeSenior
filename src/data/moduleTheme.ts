import type { ModuleId } from './practiceScenarios';

/**
 * Color de identidad de cada tema (SMS, WhatsApp, llamadas y correos).
 * Las clases van escritas completas para que Tailwind las incluya.
 * Los colores con significado fijo no cambian: rojo = peligro,
 * verde = seguro o acierto, ámbar = pista.
 */
export interface ModuleTheme {
  /** Fondo sólido con texto blanco (íconos, encabezados, nodo activo) */
  solid: string;
  /** Texto e íconos del color del tema */
  text: string;
  /** Fondo suave del tema */
  tint: string;
  /** Borde del color del tema */
  border: string;
  /** Anillo alrededor del nodo activo */
  ring: string;
  /** Nombre del color, para documentación */
  name: string;
  /** Valor hexadecimal (para estilos que no admiten clases, como la flecha del globo) */
  hex: string;
}

export const moduleTheme: Record<ModuleId, ModuleTheme> = {
  smishing: {
    solid: 'bg-sms text-white',
    text: 'text-sms',
    tint: 'bg-sms-light',
    border: 'border-sms',
    ring: 'ring-sms/30',
    name: 'azul',
    hex: '#1D4ED8',
  },
  whatsapp: {
    solid: 'bg-wapp text-white',
    text: 'text-wapp',
    tint: 'bg-wapp-light',
    border: 'border-wapp',
    ring: 'ring-wapp/30',
    name: 'turquesa',
    hex: '#0E7490',
  },
  vishing: {
    solid: 'bg-call text-white',
    text: 'text-call',
    tint: 'bg-call-light',
    border: 'border-call',
    ring: 'ring-call/30',
    name: 'violeta',
    hex: '#6D28D9',
  },
  phishing: {
    solid: 'bg-mail text-white',
    text: 'text-mail',
    tint: 'bg-mail-light',
    border: 'border-mail',
    ring: 'ring-mail/30',
    name: 'fucsia',
    hex: '#A21CAF',
  },
};
