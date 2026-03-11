# Documentación de Open Wearables

Este directorio contiene el sitio de documentación construido con Mintlify.

## Desarrollo

Instala la [CLI de Mintlify](https://www.npmjs.com/package/mint) para previsualizar localmente los cambios en la documentación. Para instalarla, usa el siguiente comando:

```
npm i -g mint
```

Ejecuta el siguiente comando en la raíz de tu documentación, donde se encuentra `docs.json`:

```
mint dev --port 3333
```

(el puerto `3000` ya está siendo usado por el frontend)

Consulta la vista previa local en `http://localhost:3333` o en el puerto que hayas definido.

## Publicación de Cambios

Instala nuestra app de GitHub desde tu [panel](https://dashboard.mintlify.com/settings/organization/github-app) para propagar los cambios desde tu repositorio hasta tu despliegue. Los cambios se publican automáticamente en producción después de hacer push a la rama por defecto.

## ¿Necesitas Ayuda?

### Solución de Problemas

- Si tu entorno de desarrollo no arranca: ejecuta `mint update` para asegurarte de tener la versión más reciente de la CLI.
- Si una página carga como 404: asegúrate de estar ejecutando el comando en una carpeta con un `docs.json` válido.

### Recursos
- [Documentación de Mintlify](https://mintlify.com/docs)
