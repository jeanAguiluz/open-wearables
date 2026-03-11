# Pruebas

Esta guía explica cómo ejecutar pruebas y cómo escribir nuevas pruebas para Open Wearables.

## Requisitos Previos

Antes de ejecutar pruebas, necesitas tener una base de datos PostgreSQL en funcionamiento:

### Opción 1: Usar Docker (Recomendado)

```bash
# Iniciar solo el contenedor de PostgreSQL
docker compose up db -d

# Esperar a que esté listo
docker compose logs -f db  # Busca "database system is ready"

# Crear la base de datos de pruebas
docker compose exec db psql -U open-wearables -c "CREATE DATABASE open_wearables_test;"
```

### Opción 2: PostgreSQL Local

Si tienes PostgreSQL instalado localmente:

```bash
createdb -U open-wearables open_wearables_test
```

**Configuración de la Base de Datos de Pruebas:**
- Host: `localhost`
- Port: `5432`
- Database: `open_wearables_test`
- User: `open-wearables`
- Password: `open-wearables`

## Ejecutar Pruebas

### Pruebas del Backend

```bash
# Usando Make (recomendado)
make test

# O directamente con pytest
cd backend
uv run pytest

# Ejecutar un archivo de prueba específico
uv run pytest tests/api/v1/test_users.py

# Ejecutar con salida detallada
uv run pytest -v

# Ejecutar con reporte de cobertura
uv run pytest --cov=app --cov-report=html
```

### Pruebas del Frontend

```bash
cd frontend

# Ejecutar todas las pruebas
pnpm test

# Ejecutar pruebas en modo watch
pnpm test:watch

# Ejecutar un archivo de prueba específico
pnpm test src/components/Button.test.tsx
```

## Cómo Escribir Pruebas

### Pruebas del Backend

Las pruebas del backend usan **pytest** con **pytest-asyncio** para soporte asíncrono.

```python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_users(client: AsyncClient):
    response = await client.get("/api/v1/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
```

Los archivos de prueba deben ubicarse en el directorio `backend/tests/` y comenzar con el prefijo `test_`.

### Pruebas del Frontend

Las pruebas del frontend usan **Vitest** con **React Testing Library**.

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

Los archivos de prueba deben vivir junto a los componentes y usar el sufijo `.test.tsx` o `.test.ts`.

## Requisitos de Pruebas

- Toda funcionalidad nueva debe incluir pruebas
- Toda corrección de bug debe incluir una prueba que hubiera detectado el problema
- Todas las pruebas deben pasar antes de que un PR pueda fusionarse
- Busca una cobertura útil y significativa, no solo porcentajes altos

**Nota:** Las pruebas usan rollback de transacciones para aislarse: cada prueba corre dentro de su propia transacción y se revierte al finalizar. Esto asegura que no interfieran entre sí.

## Patrones de Prueba

Para ver patrones de prueba más detallados, revisa:

- [AGENTS.md del backend](../backend/AGENTS.md) - Convenciones de pruebas del backend
- [AGENTS.md del frontend](../frontend/AGENTS.md) - Patrones de pruebas del frontend
