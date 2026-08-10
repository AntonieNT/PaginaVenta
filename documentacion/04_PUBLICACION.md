# Publicación

La página es estática y puede publicarse en GitHub Pages desde el repositorio `AntonieNT/PaginaVenta`.

## URL pública

Cuando GitHub Pages está habilitado desde la rama `main` y la carpeta raíz `/`, la URL esperada es:

```text
https://antonient.github.io/PaginaVenta/
```

## Antes de publicar

1. Revisar correo y WhatsApp en `script.js`.
2. Confirmar que `CONFIG.downloadUrl` apunte a la descarga oficial vigente.
3. Confirmar que los datos bancarios sean correctos.
4. No publicar número de tarjeta de débito.
5. Revisar textos, imágenes y enlaces.
6. Probar en escritorio y móvil.
7. Confirmar que no existan `.env`, JSON de Google, claves SMTP, respaldos ni datos reales de clientes.

## GitHub Pages

Configuración recomendada:

- Repositorio: `AntonieNT/PaginaVenta`
- Rama: `main`
- Carpeta: `/`
- Visibilidad: pública, porque GitHub Pages expone el sitio en internet.

## Enlace desde el release

El release público de descarga debe mencionar esta página para que el cliente sepa dónde comprar o renovar licencia:

```text
https://antonient.github.io/PaginaVenta/
```

## Seguridad comercial

Esta carpeta solo debe contener contenido público de venta. La lógica de licencias, claves de Google, credenciales SMTP, respaldos y datos de compradores se quedan fuera de este repositorio.