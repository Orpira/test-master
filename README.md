# Test Master

Una aplicación web de cuestionarios interactivos desarrollada con React, Vite, Zustand, Tailwind CSS, Firebase y Auth0. Permite a los usuarios autenticarse, seleccionar una categoría y cantidad de preguntas, responder un quiz, ver su puntuación, enviar resultados y consultar el ranking.

## Tecnologías empleadas

- **React**: Librería principal para la construcción de la interfaz de usuario y componentes funcionales.
- **Vite**: Herramienta de desarrollo y build ultrarrápida para proyectos modernos de frontend.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad del código.
- **Tailwind CSS**: Framework de utilidades CSS para un diseño moderno, responsivo y personalizable.
- **Firebase**:
  - **Firestore**: Base de datos NoSQL para almacenar preguntas y resultados de los usuarios.
  - **Realtime Database**: Alternativa para cargar preguntas desde un archivo JSON.
  - **Hosting**: (opcional) para desplegar la app.
- **Auth0**: Autenticación segura de usuarios mediante OAuth2 y social login.
- **Zustand**: Manejo de estado global simple y eficiente para React.
- **FormSubmit**: Servicio para envío de resultados por email sin backend propio.
- **Husky + Commitlint.** Validación automatica de commits para que sigan la convención de Conventional Commits.

## Estructura del proyecto

```
├── public/
│   ├── questions.json         # Preguntas de ejemplo en formato JSON
│   ├── welcome.png            # Imagen de bienvenida
│   └── ...
├── src/
│   ├── App.tsx                # Componente principal y rutas
│   ├── main.tsx               # Entry point de React
│   ├── index.css              # Importación de Tailwind
│   ├── components/
│   │   ├── CategorySelector.tsx  # Selector de categoría y cantidad
│   │   ├── QuizPage.tsx          # Página principal del quiz
│   │   ├── ResultScreen.tsx      # Resultados y formulario de envío
│   │   ├── Ranking.tsx           # Ranking de usuarios
│   │   ├── welcome.tsx           # Pantalla de bienvenida animada
│   │   └── Auth0/ProtectedRoute.tsx # Rutas protegidas por Auth0
│   └── store/
│       └── useQuizStore.ts       # Estado global con Zustand
├── tailwind.config.ts         # Configuración de Tailwind y animaciones personalizadas
├── postcss.config.ts          # Configuración de PostCSS (TypeScript)
├── vite.config.ts             # Configuración de Vite (TypeScript)
├── firebase.ts                # Inicialización de Firebase
├── package.json               # Dependencias y scripts
└── README.md                  # (Este archivo)
```

## Características principales

- **Pantalla de bienvenida animada** con Tailwind y animaciones personalizadas.
- **Autenticación de usuarios** con Auth0 (social login y OAuth2).
- **Selector de categoría y cantidad de preguntas** antes de iniciar el quiz.
- **Preguntas aleatorias** en cada intento, filtradas por categoría.
- **Respuestas interactivas** con feedback visual inmediato.
- **Pantalla de resultados** con detalle de aciertos, respuestas correctas y formulario para enviar resultados por email.
- **Ranking** de mejores puntuaciones consultando Firestore.
- **Diseño responsive y moderno** gracias a Tailwind CSS.
- **Gestión de estado global** con Zustand.
- **Soporte para TypeScript en toda la base de código y configuración.**

## Configuración y despliegue

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crea un archivo `.env` en la raíz con tus credenciales de Firebase y Auth0:

```env
VITE_APP_FIREBASE_API_KEY=...
VITE_APP_FIREBASE_AUTH_DOMAIN=...
VITE_APP_FIREBASE_DATABASE_URL=...
VITE_APP_FIREBASE_PROJECT_ID=...
VITE_APP_FIREBASE_STORAGE_BUCKET=...
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=...
VITE_APP_FIREBASE_APP_ID=...
VITE_AUTH0_DOMAIN=...
VITE_AUTH0_CLIENT_ID=...
```

### 4. Configuración de Firebase

- Sube tus preguntas a Firestore o a Realtime Database (`questions.json`).
- Configura reglas de seguridad para permitir lectura pública o autenticada según tu caso.

### 5. Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo Vite para desarrollo local.
- `npm run build` — Genera la build de producción optimizada.
- `npm run preview` — Previsualiza la build de producción localmente.
- `npm run lint` — Ejecuta ESLint para analizar y corregir problemas de estilo/código.
- `npm run format` — Formatea el código automáticamente con Prettier.
- `npm run test` — Ejecuta las pruebas automáticas con Playwright.

> Todos los scripts relevantes suprimen los warnings experimentales de Node.js automáticamente.

### 6. Despliegue

Puedes desplegar la app en Firebase Hosting, Vercel, Netlify, etc.

## Personalización

- Modifica las preguntas en Firestore o en `public/questions.json`.
- Cambia la imagen de bienvenida en `public/welcome.png`.
- Personaliza el email de destino en el formulario de resultados (`ResultScreen.tsx`).
- Ajusta las animaciones en `tailwind.config.ts`.

## Estructura básica del proyecto con Husky + Commitlint

- `1. package.json (fragmento relevante)`
  {
  "scripts": {
  "prepare": "husky install"
  },
  "devDependencies": {
  "@commitlint/cli": "^18.0.0",
  "@commitlint/config-conventional": "^18.0.0",
  "husky": "^9.0.0"
  }
  }

- `2. commitlint.config.cjs`
  module.exports = {
  extends: ['@commitlint/config-conventional'],
  };

- `3. .husky/commit-msg (bash script) #!/bin/sh`
  . "$(dirname "$0")/\_/husky.sh"

npx --no -- commitlint --edit "$1"

# Proyecto Base con Husky + Commitlint

Este repositorio incluye una configuración mínima para aplicar convenciones de commits usando Husky y Commitlint.

## Instalación

```bash
npm install
```

## Activar Husky

```bash
npx husky install
```

(Ya está definido en el script `prepare`, por lo que se ejecutará automáticamente tras `npm install` si clonas el repo correctamente.)

## Crear hook manualmente (si no existe)

```bash
mkdir -p .husky
chmod +x .husky/commit-msg
```

Contenido de `.husky/commit-msg`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

## Ejemplo de commit válido

```bash
git commit -m "feat: agrega validación con commitlint"
```

# 📘 Guía de Convenciones para Mensajes de Commits

Esta guía sigue la convención **Conventional Commits**, con algunos prefijos prácticos adicionales como `wip` para trabajo en progreso.

| Prefijo     | Significado                                   | Cuándo usarlo                                                      | Ejemplo                                                 |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| `feat:`     | **Feature** – Nueva funcionalidad             | Al agregar una nueva funcionalidad al sistema                      | `feat: añade formulario de contacto`                    |
| `fix:`      | **Bugfix** – Corrección de errores            | Al corregir un comportamiento que no funcionaba como se esperaba   | `fix: corrige validación de email en login`             |
| `docs:`     | **Documentación**                             | Cambios en README, comentarios, documentación técnica              | `docs: añade guía de instalación en README`             |
| `style:`    | **Estilo** – Sin afectar el comportamiento    | Cambios en espacios, indentación, formato                          | `style: reformatea el archivo App.js`                   |
| `refactor:` | **Reestructuración interna**                  | Cambios en código sin alterar comportamiento ni corregir bugs      | `refactor: simplifica la lógica de navegación`          |
| `test:`     | **Pruebas** – Añade o ajusta tests            | Agregar, eliminar o actualizar pruebas automáticas                 | `test: añade pruebas para componente Header`            |
| `ci:`       | **Integración continua**                      | Cambios en archivos o scripts de CI (GitHub Actions, Travis, etc.) | `ci: configura deploy automático en GitHub Actions`     |
| `build:`    | **Build system** – Dependencias y empaquetado | Cambios en `package.json`, Webpack, Vite, etc.                     | `build: actualiza versión de Tailwind`                  |
| `chore:`    | **Tareas varias** – Mantenimiento             | Tareas que no modifican el código fuente directamente              | `chore: limpia archivos temporales`                     |
| `wip:`      | **Work In Progress** – Trabajo en progreso    | Commits que **no están terminados** pero se quieren guardar        | `wip: comienza componente de registro, sin estilos aún` |

## 🧠 Recomendaciones

- Usa `wip:` para avances no terminados y **haz squash** antes de mergear a `main`.
- Usa mensajes en **imperativo**: `añade`, `corrige`, `refactoriza`.
- Evita mensajes genéricos como `cambios`, `update`, `avance`.

---

Puedes extender esta configuración con herramientas como lint-staged, prettier, ESLint, etc.

## Créditos y licencias

- Este proyecto utiliza librerías open source bajo sus respectivas licencias.
- Puedes modificar, adaptar y desplegar la app para tus propios fines educativos o profesionales.

---

¡Disfruta aprendiendo y compitiendo con tu Test Master!
