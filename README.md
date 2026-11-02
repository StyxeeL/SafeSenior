# SafeSenior

Aplicación educativa para adultos mayores del Perú que busca enseñar a reconocer y prevenir estafas digitales mediante contenidos educativos y simulaciones interactivas.

> SafeSenior es una aplicación web progresiva (PWA) que funciona completamente en el navegador. No requiere backend ni conexión a internet después de la primera carga.

---

## 🎯 Objetivo

Ayudar a los adultos mayores a identificar intentos de estafa a través de:

- Llamadas falsas (vishing)
- SMS falsos (smishing)
- Mensajes de WhatsApp falsos
- Correos electrónicos falsos (phishing)

La aplicación utiliza un lenguaje sencillo, letra grande, botones grandes y retroalimentación amable.

---

## 🚀 Tecnologías

- **React 18** con **TypeScript**
- **Vite** como empaquetador
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Lucide React** para iconografía
- **LocalStorage** para guardar progreso y preferencias
- **Service Worker** y **Web App Manifest** para funcionar como PWA offline

---

## 📦 Instalación

1. Clona o descarga el proyecto.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:5173`.

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Previsualiza la versión de producción. |
| `npm run lint` | Verifica tipado con TypeScript. |

---

## 📱 Instalación en el celular

SafeSenior es una PWA. Si entras desde un navegador compatible (Chrome o Edge en Android, por ejemplo), aparecerá un botón **"Instalar SafeSenior"** en la pantalla de inicio o en configuración. Al tocarlo, la app se instala como cualquier otra aplicación.

Una vez instalada, puedes abrirla desde el icono en tu pantalla principal y usarla sin conexión a internet.

---

## 🗂️ Estructura del proyecto

```
SafeSenior/
├── public/                # Archivos públicos e iconos
├── scripts/               # Scripts de utilidad (generación de iconos)
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── layout/        # Layout, navegación superior e inferior
│   │   ├── pwa/           # Botón de instalación PWA
│   │   ├── quiz/          # Visualizaciones de evaluación
│   │   ├── simulation/    # Simulaciones de llamadas, SMS, WhatsApp y correos
│   │   └── ui/            # Botones, tarjetas, modales, etc.
│   ├── data/              # Contenidos educativos, escenarios y preguntas
│   ├── hooks/             # Hooks personalizados
│   ├── pages/             # Pantallas principales
│   ├── routes/            # Configuración de rutas
│   ├── services/          # Persistencia en LocalStorage
│   ├── types/             # Tipos de TypeScript
│   └── utils/             # Funciones auxiliares
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ♿ Accesibilidad

SafeSenior busca cumplir con **WCAG 2.2 AA** e incluye:

- Tamaño de letra configurable (normal, grande, muy grande)
- Modo de alto contraste
- Sonido de retroalimentación opcional
- Instrucciones por audio usando la síntesis de voz del navegador
- Navegación por teclado
- Enlace "Saltar al contenido principal"
- Estados de foco visibles
- Botones y áreas táctiles grandes

---

## 🔒 Seguridad

Todas las simulaciones son completamente ficticias y educativas:

- No se realizan llamadas, mensajes ni correos reales.
- No se solicitan contraseñas, códigos OTP ni datos bancarios reales.
- No se ejecutan transferencias ni pagos.
- Los comprobantes ficticios llevan una marca visible de "SIMULACIÓN EDUCATIVA".

---

## 📚 Contenido educativo

La aplicación incluye seis secciones principales:

1. **Inicio:** bienvenida, accesos rápidos y resumen de progreso.
2. **Aprende:** contenidos sobre estafas digitales y señales de alerta.
3. **Practica:** simulaciones interactivas de los cuatro tipos de estafa.
4. **Evalúate:** cuestionario con situaciones simuladas.
5. **Mi progreso:** estadísticas de aprendizaje.
6. **Configuración y ayuda:** preferencias, accesibilidad y preguntas frecuentes.

---

## 🤝 Contribuciones

Este proyecto es educativo. Si deseas proponer mejoras, puedes hacerlo respetando el alcance actual: frontend exclusivo, datos ficticios y almacenamiento local.

---

## 📄 Licencia

Proyecto educativo. Uso libre para fines de aprendizaje y prevención.

---

## 🙋 Soporte

Si tienes dudas sobre cómo usar la aplicación, revisa la sección **Configuración y ayuda** dentro de la app.
