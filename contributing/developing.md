# Configurar tu Entorno de Desarrollo

Esta guía explica cómo preparar tu entorno local de desarrollo para Open Wearables.

## Requisitos Previos

- **Docker** (recomendado) - [Instalar Docker](https://docs.docker.com/get-docker/)
- **uv** - Gestor de paquetes de Python ([Instalar uv](https://docs.astral.sh/uv/)) - administra Python automáticamente
- **pnpm** - Gestor de paquetes de Node.js ([Instalar pnpm](https://pnpm.io/installation))

Para desarrollo local del frontend sin Docker, también necesitarás:
- **Node.js 22+** - Para desarrollo frontend

## Inicio Rápido con Docker (Recomendado)

La forma más sencilla de comenzar es usando Docker Compose:

```bash
# Clonar el repositorio
git clone https://github.com/the-momentum/open-wearables.git
cd open-wearables

# Iniciar todos los servicios con hot reload (recomendado para desarrollo)
make watch

# La cuenta de administrador se crea automáticamente al iniciar (admin@admin.com / your-secure-password)
# Cargar datos de prueba de ejemplo (opcional)
make seed
```

## Puntos de Acceso

Una vez en ejecución, podrás acceder a:

| Servicio | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:8000 |
| Documentación de la API | http://localhost:8000/docs |
| Celery Flower | http://localhost:5555 |

## Comandos del Makefile

| Comando | Descripción |
|---------|-------------|
| `make build` | Construye las imágenes de Docker |
| `make run` | Inicia en modo desacoplado |
| `make up` | Inicia en primer plano |
| `make watch` | Inicia con hot reload (recomendado para desarrollo) |
| `make stop` | Detiene los contenedores |
| `make down` | Elimina los contenedores |
| `make test` | Ejecuta las pruebas del backend |
| `make migrate` | Aplica migraciones de base de datos |
| `make create_migration m="..."` | Crea una nueva migración |
| `make seed` | Carga datos de ejemplo |

## Desarrollo Local sin Docker

### Configuración del Backend

```bash
cd backend

# Crear el entorno virtual e instalar dependencias
uv sync

# Copiar el archivo de entorno
cp config/.env.example config/.env

# Ejecutar migraciones de base de datos
uv run alembic upgrade head

# Iniciar el servidor backend (con recarga automática)
uv run fastapi dev app/main.py --host 0.0.0.0 --port 8000
```

### Configuración del Frontend

```bash
cd frontend

# Instalar dependencias
pnpm install

# Copiar el archivo de entorno
cp .env.example .env

# Iniciar el servidor de desarrollo
pnpm dev
```

## Variables de Entorno

Copia los archivos de entorno de ejemplo y configúralos según sea necesario:

- Backend: `backend/config/.env.example` -> `backend/config/.env`
- Frontend: `frontend/.env.example` -> `frontend/.env`

## Patrones de Desarrollo

Para ver patrones de código y lineamientos de arquitectura con más detalle, revisa:

- [AGENTS.md raíz](../AGENTS.md) - Flujo general y lineamientos
- [AGENTS.md del backend](../backend/AGENTS.md) - Patrones de Python/FastAPI
- [AGENTS.md del frontend](../frontend/AGENTS.md) - Patrones de React/TypeScript
