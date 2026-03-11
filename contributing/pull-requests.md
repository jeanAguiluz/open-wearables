# Guía de Pull Requests

Esta guía explica cómo enviar pull requests a Open Wearables.

## Antes de Empezar

1. Busca [PRs existentes](https://github.com/the-momentum/open-wearables/pulls) para evitar trabajo duplicado
2. Revisa [issues existentes](https://github.com/the-momentum/open-wearables/issues) para ver discusiones relacionadas
3. Para cambios grandes, abre primero un issue para discutir el enfoque

## Nomenclatura de Ramas

Usa este formato: `<issue-number>-<brief-description>`

Ejemplos:
- `123-fix-user-authentication`
- `456-add-garmin-provider`
- `789-update-dashboard-layout`

## Convención de Mensajes de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <description>

[optional body]

[optional footer]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `chore` | Tareas de mantenimiento |
| `refactor` | Refactor de código (sin cambio funcional) |
| `test` | Agregar o actualizar pruebas |
| `style` | Cambios de formato |
| `perf` | Mejoras de rendimiento |
| `ci` | Cambios de CI/CD |

### Ejemplos

```bash
# Commit simple
feat: add user profile endpoint

# Con scope
fix(auth): resolve token refresh issue

# Con referencia a ticket
[WHOOP-01] feat: implement Whoop provider integration

# Con cuerpo
feat(api): add pagination to workouts endpoint

Adds limit and offset parameters to support
pagination in the workouts list endpoint.

Closes #123
```

## Convención para el Título del PR

**Los títulos de los PR deben seguir el mismo formato de [Conventional Commits](https://www.conventionalcommits.org/) que los mensajes de commit.**

El workflow de CI valida automáticamente los títulos de los PR para asegurar que cumplan esta convención. Tu título debe usar el formato:

```
<type>(<optional scope>): <description>
```

### Ejemplos

- `feat: add user profile endpoint`
- `fix(auth): resolve token refresh issue`
- `docs: update API documentation`
- `ci: add PR title validation to workflow`
- `refactor(backend): simplify authentication logic`

## Crear un Pull Request

1. **Crea una rama** desde `main`:
   ```bash
   git checkout -b 123-your-feature-description
   ```

2. **Haz tus cambios** y haz commit siguiendo las convenciones anteriores

3. **Sube tu rama**:
   ```bash
   git push -u origin 123-your-feature-description
   ```

4. **Abre un PR** en GitHub y completa la plantilla

## Checklist del PR

La plantilla de PR incluye estos requisitos:

### General
- [ ] El código sigue el estilo del proyecto
- [ ] Se realizó auto-revisión
- [ ] Se agregaron pruebas (si aplica)
- [ ] Todas las pruebas pasan localmente

### Cambios de Backend
- [ ] `uv run pre-commit run --all-files` pasa correctamente (ejecuta ruff, ty y checks de formato)

### Cambios de Frontend
- [ ] `pnpm run lint` pasa correctamente
- [ ] `pnpm run format:check` pasa correctamente
- [ ] `pnpm run build` finaliza con éxito

## Vincular Issues

Vincula issues relacionados en la descripción de tu PR:

- `Fixes #123` - Cierra el issue cuando el PR se fusiona
- `Closes #456` - Igual que Fixes
- `Relates to #789` - Hace referencia sin cerrar

## Proceso de Code Review

1. **Solicita revisión**: los PR requieren al menos una aprobación
2. **Responde al feedback**: contesta comentarios y haz los cambios solicitados
3. **CI debe pasar**: todos los checks automáticos deben estar en verde
4. **Merge**: una vez aprobado, el PR puede fusionarse

## Consejos para un Buen PR

- Mantén los PR enfocados y de tamaño razonable
- Escribe una descripción clara del qué y el porqué
- Incluye screenshots para cambios de UI
- Actualiza la documentación si corresponde
- Agrega pruebas para la nueva funcionalidad
