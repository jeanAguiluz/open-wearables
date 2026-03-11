# Estilo de Código y Linting

Esta guía explica el formateo de código y el linting en Open Wearables.

## Inicio Rápido

El proyecto usa **pre-commit hooks** para ejecutar todas las verificaciones automáticamente. Esta es la forma recomendada de asegurar que tu código pase todos los checks:

```bash
# Ejecutar todos los checks (desde la raíz del proyecto)
uv run pre-commit run --all-files
```

Esto ejecuta:
- Linter Ruff con auto-fix
- Formateador Ruff
- Verificador de tipos ty
- Eliminación de espacios en blanco al final de línea
- Corrección de fin de archivo

## Backend (Python)

Usamos **Ruff** para linting y formateo, y **ty** para type checking.

### Comandos Individuales

Si necesitas ejecutar los checks por separado:

```bash
cd backend

# Revisar errores de linting
uv run ruff check .

# Corregir errores de linting automáticamente
uv run ruff check . --fix

# Revisar formato
uv run ruff format --check .

# Aplicar formato
uv run ruff format .

# Verificación de tipos
uv run ty check .
```

### Guías de Estilo

- **Longitud de línea**: 120 caracteres
- **Type hints**: Requeridos en todos los parámetros y tipos de retorno
- **Imports**: Ordenados automáticamente por Ruff

## Frontend (TypeScript/React)

Usamos **oxlint** para linting y **Prettier** para formateo.

### Comandos

```bash
cd frontend

# Revisar errores de linting
pnpm lint

# Corregir errores de linting
pnpm lint:fix

# Revisar formato
pnpm format:check

# Aplicar formato
pnpm format
```

### Guías de Estilo

- **Longitud de línea**: 80 caracteres
- **Comillas**: Simples
- **Punto y coma**: Obligatorio
- **TypeScript**: Modo estricto habilitado

### Antes de Enviar un PR

Ejecuta todos los checks:

```bash
cd frontend
pnpm lint:fix && pnpm format
```

## Checks de CI

El pipeline de CI ejecuta estos checks automáticamente:

**Backend:**
- `uv run ruff check` - Linting
- `uv run ruff format --check` - Formato
- `uv run ty check` - Verificación de tipos

**Frontend:**
- `pnpm run lint` - Linting
- `pnpm run format:check` - Formato
- `pnpm run build` - Verificación del build

Todos los checks deben pasar antes de que un PR pueda fusionarse.

## Configuración del Editor

### VS Code

Extensiones recomendadas:
- **Python**: Extensión de Ruff para autoformato
- **TypeScript**: Extensión de Prettier con formateo al guardar

### Pre-commit Hooks

El proyecto usa pre-commit hooks para ejecutar checks automáticamente antes de cada commit:

```bash
# Instalar hooks de pre-commit (solo la primera vez, desde la raíz del proyecto)
uv sync --group code-quality
uv run pre-commit install

# Ejecutar todos los checks manualmente
uv run pre-commit run --all-files
```

Consulta `.pre-commit-config.yaml` para ver la configuración completa de hooks.

## Más Información

Para ver guías de estilo más detalladas, revisa:
- [AGENTS.md del backend](../backend/AGENTS.md) - Convenciones de código del backend
- [AGENTS.md del frontend](../frontend/AGENTS.md) - Convenciones de código del frontend
