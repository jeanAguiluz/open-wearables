# Agregar un Nuevo Proveedor

Esta guía explica cómo añadir soporte para un nuevo proveedor de dispositivos wearables en Open Wearables.

## Resumen

Open Wearables usa un patrón de estrategia de proveedores para soportar múltiples integraciones de wearables. Cada proveedor implementa autenticación OAuth y obtención de datos para su API específica.

## Guía Completa

Si necesitas instrucciones detalladas paso a paso para agregar un nuevo proveedor, revisa la guía completa:

**[Cómo Agregar un Nuevo Proveedor](../docs/dev-guides/how-to-add-new-provider.mdx)**

Esta guía cubre:

- Creación de la configuración del proveedor
- Implementación del flujo OAuth
- Construcción de transformadores de datos
- Adición de rutas API
- Migraciones de base de datos
- Pruebas de la integración
- Integración del frontend

## Referencia Rápida

### Archivos Clave que Debes Crear

Para un nuevo proveedor, por ejemplo `strava`:

```
backend/app/services/providers/strava/
├── __init__.py
├── strategy.py           # StravaStrategy(BaseProviderStrategy)
├── oauth.py              # StravaOAuth(BaseOAuthTemplate)
├── workouts.py           # StravaWorkouts(BaseWorkoutsTemplate)
└── data_247.py           # Opcional: Strava247Data(Base247DataTemplate)
```

Archivos adicionales:
```
backend/app/constants/workout_types/strava.py   # Mapeos de tipos de entrenamiento
backend/app/static/provider-icons/strava.svg    # Ícono del proveedor
```

Archivos que debes modificar:
```
backend/app/services/providers/factory.py       # Registrar en ProviderFactory
backend/app/schemas/oauth.py                    # Agregar en ProviderName enum
backend/app/config.py                           # Agregar credenciales OAuth
```

### Proveedores Existentes como Referencia

| Proveedor | OAuth | Entrenamientos | Datos 24/7 | Patrón |
|-----------|-------|----------------|------------|---------|
| Garmin | Sí (PKCE) | Sí | No | PULL + PUSH |
| Polar | Sí | Sí | No | PULL |
| Suunto | Sí | Sí | Sí | PULL |
| Whoop | Sí | No | Sí | PULL |
| Apple | No | Sí | No | Solo PUSH |

Antes de empezar, estudia las implementaciones existentes en `backend/app/services/providers/`.

## Primeros Pasos

1. Lee la [guía completa](../docs/dev-guides/how-to-add-new-provider.mdx)
2. Revisa los proveedores ya existentes en `backend/app/services/providers/`
3. Abre un issue para conversar tu enfoque de integración
4. Envía un PR con tu implementación
