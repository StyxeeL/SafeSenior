# SABIA 🛡️

**Sistema de Aprendizaje y Blindaje Informático para Adultos**

**SABIA** (antes SafeSenior) es una aplicación educativa web progresiva (PWA) diseñada para adultos mayores del Perú, orientada a enseñar el reconocimiento y prevención de estafas digitales mediante un **recorrido guiado interactivo estilo Duolingo** y **simulaciones hiperrealistas de plataformas digitales**.

> **Proyecto Académico:** Interacción Humano-Computador (IHC) — UNMSM (6to Ciclo)  
> **Arquitectura:** PWA 100% *Client-Side* en React + TypeScript + Tailwind CSS. Funciona sin backend y completamente fuera de línea tras su primera carga.

---

## 🎯 Objetivo y Enfoque de IHC

Ayudar a los adultos mayores a identificar y responder con seguridad ante fraudes digitales frecuentes en el Perú:

- **SMS falsos (smishing):** Alertas bancarias fraudulentas, premios no solicitados y enlaces maliciosos.
- **WhatsApp falsos:** Suplantación de familiares en apuros, comprobantes adulterados de Yape/Plin y falsos códigos de verificación.
- **Llamadas sospechosas (vishing):** Presión psicológica de supuestos ejecutivos bancarios o emergencias policiales.
- **Correos electrónicos falsos (phishing):** Falsas notificaciones de entidades públicas (SUNAT) y archivos adjuntos peligrosos.

### Fundamentos Gerontológicos y de IHC aplicados:
* **Ruta de Aprendizaje Lineal (Reducción de fatiga por decisión - Ley de Hick):** En lugar de navegar entre menús complejos o matrices de dificultad, la persona sigue un camino unificado que la guía paso a paso: **Teoría $\rightarrow$ Práctica $\rightarrow$ Reto del Módulo**.
* **Separación de Dominios (Estímulo vs. Evaluación):** Se separa físicamente la pantalla simulada del celular (lo que observa el usuario) del cuestionario de evaluación (la decisión que debe tomar), evitando la confusión de ver botones de examen dentro de aplicaciones reales como WhatsApp.
* **Tolerancia y Aprendizaje del Error:** Si el usuario elige una opción insegura, la lección **no se marca como completada**; en su lugar, se le ofrece retroalimentación comprensiva y se le presenta **un caso alternativo con diferente contexto** del mismo tema para afianzar el conocimiento.
* **Auto-centrado Ergonómico:** El mapa detecta el progreso y centra automáticamente la pantalla en la siguiente actividad activa (`scrollIntoView` suave), evitando desplazamientos manuales innecesarios.

---

## 🗺️ Estructura del Camino de Aprendizaje

El recorrido está organizado en bloques temáticos por color accesible:

| Módulo | Color Temático | Estructura de Pasos |
| :--- | :--- | :--- |
| **Módulo 1: SMS Falsos** | 🔵 Azul Seguro | 📖 Aprende SMS $\rightarrow$ 📱 Práctica (Cuenta bloqueada) $\rightarrow$ 🎯 Práctica (Premio) $\rightarrow$ 🛡️ Reto SMS |
| **Módulo 2: WhatsApp Falsos** | 🟢 Verde Confianza | 📖 Aprende WhatsApp $\rightarrow$ 📱 Práctica (Familiar) $\rightarrow$ 🎯 Práctica (Comprobante Yape) $\rightarrow$ 🛡️ Reto WhatsApp |
| **Módulo 3: Llamadas Falsas** | 🟣 Púrpura Alerta | 📖 Aprende Llamadas $\rightarrow$ 📱 Práctica (Código OTP) $\rightarrow$ 🎯 Práctica (Llamada familiar) $\rightarrow$ 🛡️ Reto Llamadas |
| **Módulo 4: Correos Falsos** | 🟠 Ámbar Vigilante | 📖 Aprende Correos $\rightarrow$ 📱 Práctica (Banco bloqueado) $\rightarrow$ 🎯 Práctica (Falsa SUNAT) $\rightarrow$ 🛡️ Reto Correos |
| **Gran Reto de Graduación** | 🏆 Oro / Dorado | Evaluación Integradora de los 4 módulos $\rightarrow$ **Diploma de Protector Digital SABIA** |

### Estados visuales de los nodos:
* **Completado:** Color sólido temático, checkmark blanco (`✓`), etiqueta *"Hecho"* y opción de repasar.
* **Activo (Siguiente paso):** Sombra pulsante animada (`ring-4 animate-pulse`), globo indicador superior (*"👉 ¡Toca aquí para continuar!"*) y botón persistente en la barra de acción rápida inferior (HUD).
* **Bloqueado:** Tono atenuado con candado (`🔒`) y diálogo explicativo amable al intentar pulsarlo.

---

## 📱 Simuladores Realistas de Plataformas

Las prácticas se presentan dentro de un marco de celular con acabados físicos (cámara *punch-hole*, barra de estado Android con 4G/Wi-Fi/batería y barra de navegación inferior):

1. **WhatsApp Chat (`WhatsAppChat.tsx`):** Cabecera oficial `#075E54`, fondo beige `#EFEAE2`, burbujas con colas de diálogo, avisos de cifrado, comprobantes de Yape hiperrealistas y barra de entrada con micrófono.
2. **Google Mensajes SMS (`SMSMessage.tsx`):** Cabecera de mensajería Android, burbujas azules `#E8F0FE` con previsualización de enlaces y campo inferior con selector de SIM.
3. **Llamadas Android (`PhoneCall.tsx`):** Pantalla de llamada entrante con degradado oscuro, avatar con onda expansiva animada, botones táctiles de *Rechazar* / *Contestar* y transcripción en vivo de la voz del estafador al descolgar.
4. **Gmail Móvil (`EmailViewer.tsx`):** Bandeja de correo con barra de herramientas, remitente con desplegable *"para mí ▼"*, formato formal con botones de acción fraudulentos y archivos adjuntos peligrosos.

---

## 🚀 Tecnologías

* **React 18** con **TypeScript**
* **Vite** como empaquetador ultrarrápido
* **Tailwind CSS** para diseño responsivo y accesible
* **React Router v6** para navegación fluida
* **Lucide React** para iconografía accesible
* **LocalStorage** para persistencia de progreso y configuración
* **Vite PWA Plugin & Service Worker** para soporte sin conexión (*offline*)

---

## 📦 Instalación y Uso

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/SafeSenior.git
   cd SafeSenior
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`.

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Vite. |
| `npm run build` | Compila el bundle optimizado para producción en `dist/` (incluye PWA service worker). |
| `npm run preview` | Previsualiza localmente la versión de producción compilada. |
| `npm run lint` | Verifica tipado y consistencia estática con TypeScript (`tsc --noEmit`). |

---

## 🗂️ Estructura del Proyecto

```
SafeSenior/
├── public/                     # Assets públicos, iconos y Web App Manifest
├── src/
│   ├── components/
│   │   ├── layout/             # TopBar, BottomNav unificado y Layout principal
│   │   ├── learning/           # LearningPathMap (Mapa Duolingo, nodos y modales)
│   │   ├── pwa/                # Botón de instalación de PWA
│   │   ├── quiz/               # Visualizaciones de preguntas
│   │   ├── simulation/         # PhoneFrame, WhatsAppChat, SMSMessage, PhoneCall, EmailViewer
│   │   └── ui/                 # Botones grandes, tarjetas, modales y barras de progreso
│   ├── data/
│   │   ├── learningPath.ts     # Definición de módulos, pasos, iconos y paletas
│   │   ├── learnContent.ts     # Teoría y consejos clave por tema
│   │   ├── practiceScenarios.ts# Casos prácticos y alternativos de estafas
│   │   └── quizQuestions.ts    # Cuestionarios por módulo y evaluación final
│   ├── hooks/                  # useProgress, useSettings, useSpeech, useInstallPrompt
│   ├── pages/                  # HomePage (Mi Camino), ScenarioPage, QuizPage, ProgressPage, SettingsPage
│   ├── routes/                 # AppRouter (rutas y redirecciones guiadas)
│   ├── services/               # Gestión de progreso en LocalStorage
│   └── types/                  # Definiciones de TypeScript
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎨 Rediseño v2: reglas de Mandel y guía de estilo (Sesión 7)

Cada práctica sigue siempre los mismos tres pasos: **Mirar → Pista → Decidir**.

| Decisión | Cómo se aplica en la app |
| :--- | :--- |
| D1 · Salir seguro | Botón verde fijo arriba a la derecha en toda práctica; confirma la salida sin castigo y recuerda que el avance se guarda. |
| D3 · Escuchar | Botón con texto en todas las pantallas; lee el paso actual en voz alta. |
| D4 · Decidir después de revisar | Las opciones A/B/C se habilitan tras revisar todas las pistas y se pueden cambiar antes de «Confirmar mi respuesta». |
| D5 · Bloqueo que explica | El botón bloqueado dice cuántas pistas faltan («Te faltan 2 pistas para poder decidir»). |
| D6 · Pistas numeradas | De 3 a 4 pistas por caso, tocables (≥ 48 dp), que pasan de ámbar ⚠ a verde ✓ y explican por qué son sospechosas. |
| D7 · Mensaje fijado | En Pista y Decidir el mensaje queda visible con cada pista debajo de la parte que señala. |
| D8 · Legibilidad | Ningún texto bajo 16 px; contraste ≥ 7:1 en texto principal; la letra crece desde Configuración. |
| D9 · Lenguaje cotidiano | Sin tecnicismos («vishing», «smishing»); vocabulario único («Práctica segura», «Mi avance»). |
| D10 · Una sola navegación | Configuración solo en la barra inferior; «Ayuda» con texto; sin barra inferior durante una práctica. |

**Colores con significado fijo:** Tinta `#1F2937` (texto y botón principal), Verde seguro `#17703F` (salir seguro, acierto), Rojo alerta `#B42318` (solo peligro), Ámbar pista `#8A4B00` sobre `#FFF4D6`, Azul información `#1D4ED8`, fondo crema `#FAF8F3`. **Tipografía:** Atkinson Hyperlegible.

**Color de identidad por tema** (distinto de los colores con significado, todos con contraste ≥ 5:1 frente a texto blanco): SMS azul `#1D4ED8`, WhatsApp turquesa `#0E7490`, Llamadas violeta `#6D28D9`, Correos fucsia `#A21CAF` y reto final dorado `#B45309`. Se usa en las tarjetas del inicio, los encabezados y el nodo activo del camino, y el paso actual de cada práctica. Dentro de la práctica, un aviso rojo indica que el mensaje tiene señales de estafa.

---

## ♿ Accesibilidad (WCAG 2.2 AA)

* **Botones amplios:** Áreas táctiles de 48 a 72 dp y espaciado preventivo de errores.
* **Tamaño de texto graduable:** Normal, grande y muy grande desde Configuración.
* **Modo de alto contraste:** Cambia todos los colores de la interfaz para usuarios con baja visión o cataratas.
* **Lectura en voz alta:** Botón «Escuchar» en todas las pantallas.
* **Instalar:** Botón «Instalar» en la barra superior; si el navegador no permite instalar con un toque, muestra los pasos para Android y iPhone.
* **Audio de retroalimentación:** Sonidos sutiles que confirman acciones correctas o señalan alertas sin sobresaltos.
* **Navegación accesible:** Navegación por teclado, atajo *"Saltar al contenido principal"* y etiquetas ARIA en todos los nodos interactivos.

---

## 🔒 Compromiso de Seguridad

Todas las simulaciones en SABIA son **100% ficticias y educativas**:
* No se realizan llamadas, mensajes SMS ni correos reales.
* Nunca se solicitan contraseñas, números de tarjeta ni claves de seguridad reales.
* Los comprobantes de pago cuentan con marcas claras de **"SIMULACIÓN EDUCATIVA"**.

---

## 📄 Licencia

Proyecto educativo desarrollado para el curso de **Interacción Humano-Computador (IHC)** — Universidad Nacional Mayor de San Marcos (UNMSM). Uso libre con fines de aprendizaje y prevención comunitaria.
