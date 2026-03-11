# Open Wearables

[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs bienvenidos](https://img.shields.io/badge/PRs-Welcome-blue.svg)](https://github.com/the-momentum/open-wearables/issues)
![Creado con: FastAPI + React + TanStack](https://img.shields.io/badge/Built%20with-FastAPI%20%2B%20React%20%2B%20Tanstack-green.svg)
[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-5865F2?logo=discord&logoColor=white)](https://discord.gg/qrcfFnNE6H)

---

**Documentación**: <https://docs.openwearables.io>

---

Plataforma de código abierto que unifica datos de dispositivos wearables de múltiples proveedores y habilita insights de salud impulsados por IA mediante automatizaciones en lenguaje natural. Crea aplicaciones de salud más rápido con una sola API, widgets integrables y notificaciones inteligentes por webhook.

## Qué Hace

Open Wearables ofrece una API unificada y un portal para desarrolladores para conectar y sincronizar datos de múltiples dispositivos wearables y plataformas fitness. En lugar de implementar integraciones separadas para cada proveedor, como Garmin, Whoop o Apple Health, puedes usar una sola plataforma para acceder a datos de salud normalizados y crear insights inteligentes mediante automatizaciones impulsadas por IA.

![Vista general de la plataforma Open Wearables que muestra el flujo unificado de datos de wearables y el panel.](https://github.com/user-attachments/assets/b626405d-99a3-4ff7-b044-442483a3edea)

> [!IMPORTANT]
> **Para uso personal**: Esta plataforma no es solo para desarrolladores. Cualquier persona puede alojarla por su cuenta para tomar control de sus propios datos de wearables. Conecta tus dispositivos, explora tus métricas de salud a través de la API unificada y mantente al tanto de las próximas funciones, como el Asistente de Salud con IA y las automatizaciones de insights personales. Lo mejor es que tus datos permanecen en tu propia infraestructura, con privacidad y control total.

## Por Qué Usarlo

**Para desarrolladores que crean apps de salud:**

- 🔌 Integra múltiples proveedores de wearables mediante una sola API, en lugar de mantener implementaciones separadas
- 📊 Accede a datos de salud normalizados entre distintos dispositivos, como frecuencia cardiaca, sueño, actividad y pasos
- 🏠 Solución autohospedada: despliega en tu propia infraestructura con control total de los datos
- 🚀 Sin dependencias de terceros para la funcionalidad principal: ejecútalo localmente con `docker compose up`
- 🤖 Crea insights de salud y automatizaciones impulsadas por IA usando lenguaje natural (próximamente)
- 🧩 Widgets integrables para añadir la plataforma fácilmente a tus aplicaciones (próximamente)

**El problema que resuelve:**

Crear una app de salud compatible con múltiples wearables normalmente requiere:

- Mucho esfuerzo de desarrollo por proveedor, como Garmin, Whoop o Apple Health, para implementar flujos OAuth, mapeo de datos y lógica de sincronización
- Gestionar distintos flujos OAuth y APIs para cada servicio
- Manejar múltiples formatos y unidades de datos
- Mantener varios SDK y adaptarse a cambios en las APIs

Open Wearables absorbe esa complejidad para que puedas concentrarte en construir tu producto.

## Casos de Uso

- 🏃 **Apps de coaching fitness**: conecta los wearables de tus usuarios para ofrecer recomendaciones de entrenamiento personalizadas. Los coaches de running pueden crear usuarios, compartir enlaces de conexión por WhatsApp y probar capacidades de insights con IA.
- 🏥 **Plataformas de salud**: agrega datos de pacientes desde varios dispositivos y configura automatizaciones para alertas de salud.
- 💪 **Aplicaciones de bienestar**: da seguimiento y analiza la actividad de tus usuarios a través de distintos wearables con insights impulsados por IA.
- 🔬 **Proyectos de investigación**: recopila datos de salud estandarizados desde múltiples fuentes.
- 🧪 **Pilotos de producto**: equipos no técnicos pueden probar la funcionalidad compartiendo enlaces de conexión con usuarios, sin necesidad de tener una app propia.
- 👤 **Uso personal**: cualquier persona puede autohospedar la plataforma para conectar sus propios wearables, conversar con sus datos de salud usando el Asistente de Salud con IA y configurar insights personales, todo con privacidad y control total.

## Primeros Pasos

Pon Open Wearables en funcionamiento en minutos.

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/the-momentum/open-wearables.git
   cd open-wearables
   ```

2. **Configura las variables de entorno:**

   **Configuración del backend:**

   ```bash
   cp ./backend/config/.env.example ./backend/config/.env
   ```

   **Configuración del frontend:**

   ```bash
   cp ./frontend/.env.example ./frontend/.env
   ```

3. **Inicia la aplicación**

   **Con Docker (recomendado):**

   La forma más sencilla de comenzar es con Docker Compose:

   ```bash
   docker compose up -d
   ```

   Con la configuración actual de Docker Compose, el frontend queda disponible en `http://127.0.0.1:3000` y el backend en `http://127.0.0.1:8001` para evitar conflictos comunes con otros proyectos locales y con la resolución IPv6 de `localhost` en Windows.

   Si prefieres una configuración de desarrollo local sin Docker, revisa la [documentación](https://docs.openwearables.io/quickstart#local-development-setup).

4. **Inicia sesión en el portal para desarrolladores:**

   Al iniciar, se crea automáticamente una cuenta de administrador usando las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD` (valores por defecto: `admin@admin.com` / `your-secure-password`).

   Abre <http://127.0.0.1:3000> para acceder al portal y crear API keys.

5. **Carga datos de ejemplo** (opcional):

   Si quieres usuarios de prueba y datos de actividad de ejemplo:

   ```bash
   make seed
   ```

   Esto creará:

   - Usuarios de prueba
   - Datos de actividad de ejemplo para esos usuarios

6. **Consulta la documentación de la API:**

   Abre <http://127.0.0.1:8001/docs> en tu navegador para explorar la interfaz interactiva de Swagger UI.

## Funcionalidades Principales

### Panel del Portal para Desarrolladores

Panel web para gestionar tu integración:

- 📈 **Estadísticas generales**: visualiza rápidamente el número de usuarios y puntos de datos
- 👥 **Gestión de usuarios**: agrega usuarios desde el portal o mediante la API
- 📋 **Detalles del usuario**: consulta fuentes de datos conectadas, estado de integración y métricas del usuario con visualizaciones
- 🔑 **Gestión de API keys**: genera y administra credenciales en la pestaña de credenciales

### Insights de Salud y Automatizaciones (próximamente)

La funcionalidad más potente de la plataforma: definir insights de salud inteligentes usando lenguaje natural.

- 💬 **Condiciones en lenguaje natural**: describe en lenguaje simple cuándo deben activarse las notificaciones
- 🔔 **Notificaciones por webhook**: configura el endpoint de tu backend para recibir insights de salud en tiempo real
- 🧪 **Prueba de automatizaciones**: ejecuta simulaciones sobre datos históricos para ver cómo funcionan en la práctica
- 👤 **Human-in-the-loop**: marca interpretaciones incorrectas de la IA durante las pruebas para mejorar continuamente el sistema
- ✨ **Mejorar descripción**: recibe sugerencias impulsadas por IA para refinar las descripciones de tus automatizaciones
- 📜 **Registros de automatización**: revisa activaciones pasadas y entrega retroalimentación

### Asistente de Salud con IA (próximamente)

- 💬 Interfaz de chat interactiva para depurar y explorar datos del usuario
- 🧩 Widget integrable que puede añadirse a cualquier app con solo unas pocas líneas de código
- 🔄 Modelos de IA personalizables para adaptarlos a tus necesidades
- 🔍 Consultas en lenguaje natural sobre métricas de salud del usuario

### API Unificada

Accede a datos de salud mediante una API REST consistente, sin importar el dispositivo de origen.

### Soporte de Proveedores

- ☁️ **Basados en la nube**: Garmin, Suunto y Polar (más próximamente)
- 📱 **Basados en SDK**: Apple HealthKit, Samsung Health y Google Health Connect

### Gestión del Flujo OAuth

Proceso de conexión simplificado para usuarios finales:

1. Genera un enlace de conexión para tu usuario o usa el widget del SDK
2. La persona usuaria se autentica con su proveedor de wearables
3. Los datos se sincronizan automáticamente con tu plataforma
4. Accede a ellos mediante la API unificada

### SDK de Sincronización Móvil

SDK nativos para sincronización push de datos de salud desde almacenes de salud en el dispositivo:

- **[iOS SDK](https://github.com/the-momentum/open_wearables_ios_sdk)** (Swift) - Apple HealthKit
- **[Android SDK](https://github.com/the-momentum/open_wearables_android_sdk)** (Kotlin) - Samsung Health y Google Health Connect
- **[Flutter SDK](https://github.com/the-momentum/open_wearables_health_sdk)** (Dart) - Capa multiplataforma sobre SDK nativos

### Widgets (próximamente)

- 🔌 **Widget de conexión**: permite que los usuarios conecten sus wearables directamente desde tu app
- 🤖 **Widget del Asistente de Salud con IA**: integra la interfaz de chat para consultas sobre salud del usuario

## Arquitectura

Construido con:

- 🐍 **Backend**: FastAPI (Python)
- ⚛️ **Frontend**: React + TanStack Router + TypeScript (Vite)
- 🗄️ **Base de datos**: PostgreSQL + Redis
- ⚙️ **Cola de tareas**: Celery para trabajos en segundo plano de sincronización y procesamiento
- 🔐 **Autenticación**: autocontenida, sin servicios externos obligatorios
- 📡 **Estilo de API**: REST con documentación OpenAPI/Swagger

La plataforma está diseñada para autohospedarse, lo que significa que cada despliegue da servicio a una sola organización, sin la complejidad de la multitenencia.

## Hoja de Ruta de Desarrollo

**Disponible**:

- Portal para desarrolladores
- Gestión de usuarios mediante API y portal
- Flujo OAuth para Garmin, Polar y Suunto
- Sincronización de entrenamientos y acceso por API para Garmin, Polar y Suunto
- SDK de sincronización móvil para iOS, Android y Flutter

**En desarrollo**:

- Endpoints principales de datos de salud
- Automatizaciones de insights de salud
- Asistente de Salud con IA
- Integración mejorada de widgets

## Únete al Discord

Únete a nuestra comunidad de Discord para conectar con otros desarrolladores, obtener ayuda, compartir ideas y mantenerte al día con las últimas novedades:

[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-5865F2?logo=discord&logoColor=white)](https://discord.gg/qrcfFnNE6H)

## Contribuir

Las contribuciones son bienvenidas. Este proyecto busca ser una solución impulsada por la comunidad para la integración de datos de wearables.

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles sobre:

- 🛠️ Cómo configurar el entorno de desarrollo
- 📝 Estilo de código y requisitos de pruebas
- 🔀 Proceso de pull requests

## Licencia

[Licencia MIT](LICENSE) - Úsala libremente en proyectos comerciales y de código abierto.

## Comunidad

- 💬 [GitHub Discussions](https://github.com/the-momentum/open-wearables/discussions) - Preguntas e ideas

---

**Nota**: Este es un proyecto en etapa temprana y en desarrollo activo. Las APIs pueden cambiar antes de la versión 1.0. Recomendamos fijar versiones específicas en producción y seguir el changelog para futuras actualizaciones.

---

La parte backend de este proyecto fue generada a partir de [Python AI Kit](https://github.com/the-momentum/python-ai-kit).

Hecho con ❤️ por [Momentum](https://themomentum.ai/)
