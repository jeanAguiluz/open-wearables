# Reportar Issues

Esta guía explica cómo reportar bugs y solicitar funcionalidades para Open Wearables.

## Antes de Crear un Issue

1. **Busca issues existentes** - Es posible que tu problema ya haya sido reportado en [GitHub Issues](https://github.com/the-momentum/open-wearables/issues)
2. **Revisa issues cerrados** - El problema podría haberse resuelto en una actualización reciente
3. **Actualiza a la última versión** - Asegúrate de estar usando la versión más reciente

## Reportes de Bugs

Al reportar un bug, incluye:

### Información Obligatoria

- **Descripción**: Explicación clara y concisa del bug
- **Pasos para Reproducir**: Pasos numerados para reproducir el problema
- **Comportamiento Esperado**: Qué esperabas que ocurriera
- **Comportamiento Actual**: Qué ocurrió realmente

### Información Útil

- **Entorno**: SO, navegador, versión de Node.js/Python
- **Capturas de pantalla**: Si aplica, agrega screenshots
- **Mensajes de error**: Incluye logs o stack traces relevantes
- **Configuración relacionada**: Variables de entorno o ajustes relevantes

### Plantilla para Reporte de Bug

```markdown
## Descripción
[Descripción clara del bug]

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Observa el error

## Comportamiento Esperado
[Qué esperabas que ocurriera]

## Comportamiento Actual
[Qué ocurrió realmente]

## Entorno
- OS: [por ejemplo, macOS 14.0]
- Browser: [por ejemplo, Chrome 120]
- Node.js: [por ejemplo, 20.10.0]
- Python: [por ejemplo, 3.13.0]

## Contexto Adicional
[Cualquier otra información relevante]
```

## Solicitudes de Funcionalidades

Al solicitar una funcionalidad, incluye:

### Información Obligatoria

- **Problema que resuelve**: ¿Qué problema soluciona?
- **Solución propuesta**: ¿Cómo te gustaría que funcionara?
- **Caso de uso**: ¿Quién se beneficiaría y cómo?

### Plantilla para Solicitud de Funcionalidad

```markdown
## Problema que resuelve
[Descripción del problema o la necesidad]

## Solución propuesta
[Cómo te gustaría que funcionara]

## Caso de uso
[Quién se beneficia y en qué escenario]

## Alternativas consideradas
[Otras soluciones que hayas evaluado]

## Contexto adicional
[Cualquier otra información relevante]
```

## Etiquetas de Issues

Etiquetas comunes que podrías ver:

| Etiqueta | Descripción |
|-------|-------------|
| `bug` | Algo no está funcionando |
| `feature` | Solicitud de nueva funcionalidad |
| `documentation` | Mejoras de documentación |
| `good first issue` | Buena para quienes recién empiezan |
| `help wanted` | Requiere atención adicional |
| `backend` | Relacionado con Python/FastAPI |
| `frontend` | Relacionado con React/TypeScript |

## Obtener Ayuda

Si necesitas ayuda, pero no se trata de un bug ni de una solicitud de funcionalidad:

- Revisa la [documentación](../README.md)
- Consulta la [documentación de la API](http://localhost:8000/docs) cuando lo ejecutes localmente
- Pregunta en discusiones o canales de la comunidad
