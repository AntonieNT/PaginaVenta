# Pagina de venta - Cerrajeria POS

Esta carpeta contiene la pagina comercial estatica para ofrecer Cerrajeria POS y capturar prospectos.

## Abrir la pagina

Ejecuta `ABRIR_PAGINA_VENTA.cmd` o abre directamente `index.html` en el navegador.

## Conexion con el panel de licencias

El formulario intenta registrar el prospecto en el panel interno de licencias:

```text
http://localhost:3090/api/public/leads
```

Para probar el flujo completo:

1. Abre `C:\Users\Antonie\Documents\Serial Proyecto`.
2. Ejecuta `INICIAR_TODO_SERIAL.cmd`.
3. Abre la pagina de venta.
4. Envia una solicitud de prueba.
5. Verifica que aparezca como comprador o prospecto en el panel y en Google Sheets.

Si el panel no esta encendido, el formulario usa correo o WhatsApp como respaldo.

## Cambiar datos de contacto

Edita `script.js`:

- `CONFIG.licenseApiBase`: URL del panel de licencias.
- `CONFIG.email`: correo que recibira solicitudes si el panel no responde.
- `CONFIG.whatsapp`: numero en formato internacional sin espacios.
- `CONFIG.product`: nombre comercial mostrado en el mensaje.

## Imagen principal

La imagen del hero esta en `assets/hero-pos.png`. Puedes reemplazarla por otra manteniendo el mismo nombre.

## Git y publicacion

Este proyecto debe vivir en un repositorio privado separado de frontend, backend y seriales. Los archivos generados, variables locales y paquetes no se versionan.

Documentacion principal: `documentacion/00_INDICE.md`.
