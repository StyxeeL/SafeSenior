/** @type {import('tailwindcss').Config} */
// Guía de estilo v2 (Sesión 7, Grupo 5): colores con significado fijo,
// Atkinson Hyperlegible, texto mínimo de 16 px y botones de 56–60 px.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Los colores leen variables CSS (index.css) para que el modo de alto
      // contraste de Configuración cambie toda la interfaz.
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)', // Tinta #1F2937
          dark: 'rgb(var(--c-ink-dark) / <alpha-value>)',
          light: 'rgb(var(--c-ink-light) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--c-safe) / <alpha-value>)', // Verde seguro #17703F
          light: 'rgb(var(--c-safe-light) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'rgb(var(--c-alert) / <alpha-value>)', // Rojo alerta #B42318
          light: 'rgb(var(--c-alert-light) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--c-clue) / <alpha-value>)', // Ámbar pista #8A4B00
          light: 'rgb(var(--c-clue-light) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'rgb(var(--c-info) / <alpha-value>)', // Azul información #1D4ED8
          light: 'rgb(var(--c-info-light) / <alpha-value>)',
        },
        // Color de identidad de cada tema. Son tonos distintos de los semánticos
        // (rojo = peligro, verde = seguro, ámbar = pista) para no confundirlos.
        // Todos tienen contraste ≥ 5:1 con texto blanco.
        sms: { DEFAULT: '#1D4ED8', light: '#E3EBFD' }, // azul
        wapp: { DEFAULT: '#0E7490', light: '#DDF1F6' }, // turquesa
        call: { DEFAULT: '#6D28D9', light: '#EEE6FC' }, // violeta
        mail: { DEFAULT: '#A21CAF', light: '#F7E6FA' }, // fucsia
        gold: { DEFAULT: '#B45309', light: '#FDEFD5' }, // reto final
        background: 'rgb(var(--c-bg) / <alpha-value>)', // Fondo crema #FAF8F3
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        text: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-muted) / <alpha-value>)', // Gris de apoyo #4B5563
        },
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'Roboto', 'system-ui', 'sans-serif'],
      },
      // 1rem = 18 px (ver index.css). Ningún texto baja de 16 px (CQ2).
      fontSize: {
        xs: ['0.889rem', { lineHeight: '1.45' }],
        sm: ['0.944rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.056rem', { lineHeight: '1.5' }],
        xl: ['1.167rem', { lineHeight: '1.4' }],
        '2xl': ['1.444rem', { lineHeight: '1.3' }],
        '3xl': ['1.667rem', { lineHeight: '1.25' }],
      },
      minHeight: {
        touch: '56px',
        btn: '60px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(31, 41, 55, 0.07)',
      },
    },
  },
  plugins: [],
};
