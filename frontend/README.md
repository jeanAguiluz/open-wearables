# Open Wearables Platform - Frontend

Aplicación web moderna construida con TanStack Start para Open Wearables Platform, una API unificada para agregación y automatización de datos de salud.

## Stack Tecnológico

- **Framework**: TanStack Start (React 19)
- **Lenguaje**: TypeScript 5.7
- **Estilos**: Tailwind CSS 4.0
- **Componentes UI**: shadcn/ui
- **Obtención de datos**: TanStack Query
- **Gestión de formularios**: React Hook Form + Zod
- **Gráficas**: Recharts
- **Íconos**: Lucide React

## Funcionalidades

- Ruteo basado en archivos con TanStack Router
- Soporte para renderizado del lado del servidor (SSR)
- Integración con API segura en tipos
- Soporte para modo oscuro
- Diseño responsivo
- Biblioteca de componentes con shadcn/ui
- Validación de formularios con Zod
- Notificaciones toast con Sonner

## Estructura del Proyecto

```text
src/
├── components/
│   ├── ui/              # Componentes de shadcn/ui
│   ├── layout/          # Componentes de layout (Sidebar, etc.)
│   └── features/        # Componentes específicos por funcionalidad
├── routes/
│   ├── __root.tsx       # Layout raíz con providers
│   ├── index.tsx        # Inicio (redirige a /login)
│   ├── login.tsx        # Página de inicio de sesión
│   └── _authenticated/  # Rutas protegidas
│       ├── dashboard.tsx
│       └── users.tsx
├── lib/
│   └── utils.ts         # Funciones utilitarias
├── hooks/               # Hooks personalizados de React
└── styles.css           # Estilos globales y design tokens
```

## Primeros Pasos

### Requisitos Previos

- Node.js 18+
- npm o pnpm

### Instalación

1. Clona el repositorio
2. Instala dependencias:

```bash
npm install
```

3. Copia las variables de entorno:

```bash
cp .env.example .env
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en el puerto 3000
- `npm run build` - Genera el build de producción
- `npm run serve` - Previsualiza el build de producción
- `npm test` - Ejecuta pruebas con Vitest

## Variables de Entorno

Crea un archivo `.env` a partir de `.env.example`:

```bash
VITE_API_URL=http://localhost:8000  # URL de la API backend
```

## Sistema de Diseño

### Colores

La aplicación usa una paleta de colores personalizada definida en `src/styles.css`:

- **Primary**: Azul (#3B82F6) - Color principal de marca
- **Secondary**: Teal (#14B8A6) - Color de acento
- **Success**: Verde - Estados exitosos
- **Warning**: Naranja - Estados de advertencia
- **Destructive**: Rojo - Estados de error

### Modo Oscuro

El modo oscuro está habilitado por defecto usando la clase `dark` en el elemento raíz de HTML.

## Routing

TanStack Start usa ruteo basado en archivos:

- `/` - Redirige a `/login`
- `/login` - Página de autenticación
- `/_authenticated/*` - Rutas protegidas (requieren autenticación)
- `/dashboard` - Dashboard principal
- `/users` - Gestión de usuarios
- `/health-insights` - Automatizaciones de salud
- `/credentials` - Credenciales de API

## Componentes

### Componentes UI (shadcn/ui)

Componentes instalados:

- Button
- Card
- Input
- Label
- Form
- Select
- Textarea
- Badge
- Avatar
- Separator
- Sonner (Toast)
- Table
- Dropdown Menu
- Dialog
- Sheet
- Sidebar

Para agregar más componentes:

```bash
npx shadcn@latest add [component-name]
```

### Componentes de Layout

- **AppSidebar**: Barra lateral principal de navegación
- **AuthenticatedLayout**: Layout contenedor para rutas protegidas

## Gestión de Estado

- **TanStack Query**: Gestión y caché de estado del servidor
- **React Context**: Para estado global de UI (tema, sidebar)
- **React Hook Form**: Gestión del estado de formularios

## Integración con la API

Las llamadas a la API deberían hacerse usando TanStack Query para obtener una mejor estrategia de caché y manejo de estado:

```typescript
import { useQuery } from '@tanstack/react-query';

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      return response.json();
    },
  });
}
```

## Autenticación

La autenticación está scaffolded, pero aún debe conectarse al backend:

1. Actualiza `/src/routes/login.tsx` para llamar a la API real de autenticación
2. Implementa la gestión de sesión
3. Agrega protección de rutas en el layout `/_authenticated`

## Pruebas

Las pruebas están configuradas con Vitest y React Testing Library:

```bash
npm test
```

## Build para Producción

```bash
npm run build
```

Esto genera un build de producción optimizado en el directorio `dist/`.

## Despliegue

La aplicación puede desplegarse en:

- Vercel
- Netlify
- Cloudflare Pages
- Cualquier plataforma de hosting para Node.js

Configura el comando de build como `npm run build` y el directorio de salida como `dist`.

## Contribuir

1. Crea una rama de funcionalidad
2. Haz tus cambios
3. Escribe o actualiza pruebas
4. Envía un pull request

## Estilo de Código

- Usa el modo estricto de TypeScript
- Sigue las reglas de ESLint
- Usa Prettier para formatear
- Los componentes deben ser funcionales y usar hooks
- Prefiere composición sobre herencia

## Recursos

- [Documentación de TanStack Start](https://tanstack.com/start)
- [Documentación de TanStack Router](https://tanstack.com/router)
- [Documentación de TanStack Query](https://tanstack.com/query)
- [Documentación de shadcn/ui](https://ui.shadcn.com)
- [Documentación de Tailwind CSS](https://tailwindcss.com)

## Licencia

Consulta el archivo LICENSE en la raíz del proyecto.
