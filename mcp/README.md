# Servidor MCP de Open Wearables

Servidor MCP (Model Context Protocol) para Open Wearables, que permite a asistentes de IA como Claude Desktop y Cursor consultar datos de salud de wearables mediante lenguaje natural.

## Funcionalidades

- **get_users**: descubre los usuarios accesibles con tu API key
- **get_activity_summary**: obtiene datos diarios de actividad, como pasos, calorías, frecuencia cardiaca y minutos de intensidad
- **get_sleep_summary**: obtiene datos de sueño de un usuario dentro de un rango de fechas
- **get_workout_events**: obtiene sesiones de entrenamiento o ejercicio de un usuario dentro de un rango de fechas

## Requisitos Previos

- Administrador de paquetes [uv](https://docs.astral.sh/uv/)
- Backend de Open Wearables en ejecución, o acceso a una instancia desplegada
- API key válida de Open Wearables

## Inicio Rápido

### 1. Instala las dependencias

```bash
cd mcp
uv sync --group code-quality
```

### 2. Configura el entorno

```bash
cp config/.env.example config/.env
```

Edita `config/.env` con tus valores:

```bash
OPEN_WEARABLES_API_URL=http://localhost:8000
OPEN_WEARABLES_API_KEY=ow_your_api_key_here
```

### 3. Prueba el servidor

```bash
uv run start
```

## Configuración de Claude Desktop

Agrega esto a `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "open-wearables": {
      "command": "uv",
      "args": [
        "run",
        "--frozen",
        "--directory",
        "/path/to/open-wearables/mcp",
        "start"
      ]
    }
  }
}
```

Reemplaza `/path/to/open-wearables/mcp` con la ruta real de este directorio.

## Configuración de Cursor

Agrega esto en la configuración MCP de Cursor:

```json
{
  "mcpServers": {
    "open-wearables": {
      "command": "uv",
      "args": [
        "run",
        "--frozen",
        "--directory",
        "/path/to/open-wearables/mcp",
        "start"
      ]
    }
  }
}
```

## Ejemplos de Interacción

### Descubrir usuarios

```
User: "¿De quién puedo consultar datos de salud?"
Claude: [calls get_users()]
Claude: "Encontré 2 usuarios: John Doe y Jane Smith."
```

### Consultar datos de sueño

```
User: "¿Cuánto durmió John la semana pasada?"
Claude: [calls get_users() to get John's user_id]
Claude: [calls get_sleep_summary(user_id="uuid-1", start_date="2026-01-28", end_date="2026-02-04")]
Claude: "John durmió un promedio de 7 horas y 45 minutos durante la última semana.
Su sueño más largo fue de 8 h 15 min el lunes, y el más corto fue de 6 h 30 min el jueves."
```

### Solicitud genérica (sin rango de tiempo)

```
User: "Busca los entrenamientos de John"
Claude: [calls get_users() to get John's user_id]
Claude: [defaults to last 2 weeks: calls get_workout_events(user_id="uuid-1", start_date="2026-01-21", end_date="2026-02-04")]
Claude: "Durante las últimas 2 semanas, John completó 8 entrenamientos..."
```

### Especificar un rango de tiempo

```
User: "Muéstrame el sueño de Jane de enero de 2026"
Claude: [calls get_sleep_summary(user_id="uuid-2", start_date="2026-01-01", end_date="2026-01-31")]
```

## Herramientas Disponibles

### get_users

Obtén todos los usuarios accesibles con la API key configurada.

**Parámetros:**
- `search` (opcional): filtra usuarios por nombre o correo

**Devuelve:**
```json
{
  "users": [
    {"id": "uuid-1", "first_name": "John", "last_name": "Doe", "email": "john@example.com"}
  ],
  "total": 1
}
```

### get_sleep_summary

Obtén resúmenes de sueño de un usuario dentro de un rango de fechas.

**Parámetros:**
- `user_id` (obligatorio): UUID del usuario
- `start_date` (obligatorio): fecha de inicio en formato YYYY-MM-DD
- `end_date` (obligatorio): fecha de término en formato YYYY-MM-DD

**Devuelve:**
```json
{
  "user": {"id": "uuid-1", "first_name": "John", "last_name": "Doe"},
  "period": {"start": "2026-01-21", "end": "2026-02-04"},
  "records": [
    {
      "date": "2026-02-03",
      "start_datetime": "2026-02-03T23:15:00+00:00",
      "end_datetime": "2026-02-04T07:30:00+00:00",
      "duration_minutes": 495,
      "duration_formatted": "8h 15m",
      "source": "whoop"
    }
  ],
  "summary": {
    "total_nights": 7,
    "nights_with_data": 6,
    "avg_duration_minutes": 465,
    "avg_duration_formatted": "7h 45m",
    "min_duration_minutes": 360,
    "max_duration_minutes": 540
  }
}
```

## Arquitectura

```
mcp/
├── app/
│   ├── main.py           # Punto de entrada de FastMCP
│   ├── config.py         # Configuración (URL API, API key)
│   ├── tools/
│   │   ├── users.py      # Herramienta get_users
│   │   ├── activity.py   # Herramienta get_activity_summary
│   │   ├── sleep.py      # Herramienta get_sleep_summary
│   │   └── workouts.py   # Herramienta get_workout_events
│   └── services/
│       └── api_client.py # Cliente HTTP para la API backend
├── config/
│   └── .env.example      # Plantilla de entorno
├── pyproject.toml
└── README.md
```

El servidor MCP está **desacoplado** del backend: se comunica mediante la API REST usando tu API key. Eso significa:
- No hay acceso compartido a la base de datos
- Puede desplegarse de forma independiente
- Usa endpoints existentes y ya probados

## Desarrollo

### Ejecución local

```bash
# Primero inicia el backend (desde la raíz del proyecto)
docker compose up -d

# Luego inicia el servidor MCP
cd mcp
uv run start
```

### Pruebas con MCPJam

[MCPJam](https://www.mcpjam.com/) es un inspector local para probar servidores MCP. Proporciona una interfaz para explorar herramientas, probar llamadas y depurar respuestas.

```bash
npx @mcpjam/inspector@latest
```

Luego configura la conexión:
- **Comando**: `uv`
- **Argumentos**: `run --frozen --directory /path/to/open-wearables/mcp start`

### Calidad de código

```bash
uv run pre-commit run --all-files
```

## Solución de Problemas

### Error "API key no válida"

Asegúrate de que `OPEN_WEARABLES_API_KEY` en `config/.env` sea válido. Puedes obtener una API key desde:
1. El portal de desarrolladores de Open Wearables
2. O desde el panel de administración del backend en `/api/v1/developer/api-keys`

### Error "Conexión rechazada"

Asegúrate de que el backend esté corriendo en la URL indicada en `OPEN_WEARABLES_API_URL`.

Para desarrollo local:
```bash
# Desde la raíz del proyecto
docker compose up -d
```

### No se encontraron usuarios

La API key determina qué usuarios puedes ver. Asegúrate de que:
1. Los usuarios se hayan creado mediante la API o el SDK
2. Tu API key tenga acceso a esos usuarios

## Licencia
