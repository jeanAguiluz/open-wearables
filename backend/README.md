# Backend

Backend en FastAPI para la plataforma Open Wearables.

## Requisitos

- Python 3.13+
- Gestor de paquetes [uv](https://github.com/astral-sh/uv)
- Base de datos PostgreSQL

## Desarrollo

### Configuración del Entorno Virtual

El proyecto usa un entorno virtual (`.venv`) ubicado en el directorio `backend/`.

**Configuración inicial:**

Ve al directorio `backend`:

```bash
cd backend
```

y ejecuta:

```bash
uv sync
```

Esto hará lo siguiente:

- Crear el directorio `.venv` dentro de `backend/`
- Instalar todas las dependencias del proyecto
- Preparar el entorno virtual que VS Code usará automáticamente

**Configuración de VS Code:**

- El workspace está configurado para usar `backend/.venv/bin/python` como intérprete por defecto (consulta `.vscode/settings.json`)
- Después de ejecutar `uv sync`, VS Code debería detectar y usar automáticamente el entorno virtual
- Si no lo hace, recarga la ventana de VS Code o selecciona manualmente el intérprete desde la paleta de comandos (Cmd+Shift+P → "Python: Select Interpreter")

**Recrear el entorno virtual:**

Si necesitas recrearlo:

```bash
rm -rf .venv  # Opcional: elimina el entorno virtual actual
uv sync       # Lo vuelve a crear e instala dependencias
```

**Nota:** El directorio `.venv` ya está incluido en `.gitignore`, así que no necesitas preocuparte por hacer commit de ese contenido.

### Instalación de Dependencias

```bash
# Instalar todas las dependencias (incluyendo dependencias de desarrollo)
uv sync

# Instalar solo dependencias de producción
uv sync --no-dev

# Instalar junto con herramientas de calidad de código
uv sync --group code-quality
```

### Ejecutar la Aplicación

**Usando Docker (Recomendado):**

```bash
# Desde la raíz del proyecto
# Iniciar servicios
docker compose up -d

# Ejecutar migraciones
docker compose exec app uv run alembic upgrade head
```

La API estará disponible en:

- 🌐 API: http://localhost:8000
- 📚 Swagger: http://localhost:8000/docs

**Desarrollo Local:**

```bash
# Instalar dependencias
uv sync

# Iniciar PostgreSQL localmente

# Crear migración
uv run alembic revision --autogenerate -m "Description"

# Ejecutar migraciones
uv run alembic upgrade head

# Iniciar servidor de desarrollo
uv run fastapi run app/main.py --reload
```

### Migraciones de Base de Datos

**Crear una nueva migración:**

```bash
# Usando Docker
docker compose exec app uv run alembic revision --autogenerate -m "Description of changes"

# Desarrollo local
uv run alembic revision --autogenerate -m "Description of changes"
```

**Ejecutar migraciones:**

```bash
# Usando Docker
docker compose exec app uv run alembic upgrade head

# Desarrollo local
uv run alembic upgrade head
```

**Revertir migraciones:**

```bash
# Usando Docker
docker compose exec app uv run alembic downgrade -1

# Desarrollo local
uv run alembic downgrade -1
```

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
uv run pytest

# Ejecutar con cobertura
uv run pytest --cov=app --cov-report=html

# Ejecutar un archivo de prueba específico
uv run pytest tests/path/to/test_file.py
```

### Calidad de Código

El proyecto usa [Ruff](https://github.com/astral-sh/ruff) para linting y formateo.

**Revisar calidad de código:**

```bash
uv run ruff check .
uv run ruff format . --check
```

**Corregir problemas automáticamente:**

```bash
uv run ruff check . --fix
uv run ruff format .
```

**Hooks de pre-commit:**

```bash
# Instalar hooks de pre-commit
uv run pre-commit install

# Ejecutar hooks manualmente
uv run pre-commit run --all-files
```

## Estructura del Proyecto

```text
backend/
├── app/                    # Código principal de la aplicación
│   ├── api/               # Rutas de la API
│   │   └── routes/        # Handlers de rutas organizados por versión
│   ├── config.py          # Configuración
│   ├── database.py        # Conexión a base de datos y manejo de sesiones
│   ├── main.py            # Punto de entrada de la aplicación FastAPI
│   ├── models/            # Modelos de base de datos con SQLAlchemy
│   ├── repositories/      # Capa de acceso a datos
│   ├── schemas/           # Schemas de Pydantic para validar requests/responses
│   ├── services/          # Capa de lógica de negocio
│   └── utils/             # Funciones utilitarias
├── migrations/            # Migraciones de base de datos con Alembic
├── scripts/               # Scripts utilitarios
├── alembic.ini            # Configuración de Alembic
├── pyproject.toml         # Dependencias y configuración del proyecto
└── uv.lock                # Versiones bloqueadas de dependencias
```

## Variables de Entorno

Crea un archivo `.env` en el directorio `config/` (consulta `config/.env.example` como referencia). Las variables de entorno requeridas incluyen:

- Configuración de conexión a la base de datos
- Credenciales de proveedores OAuth
- Secrets de JWT
- Otras configuraciones de servicios

## Servicios Adicionales

El backend también incluye:

- **Celery**: Para procesamiento de tareas en segundo plano
- **Flower**: Monitoreo de Celery (disponible en http://localhost:5555 cuando está en ejecución)
