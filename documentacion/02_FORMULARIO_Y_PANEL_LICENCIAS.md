# Formulario y panel de licencias

La página pública de venta usa WhatsApp o correo por defecto.

Motivo: cuando la página vive en GitHub Pages, `localhost` apunta al equipo del cliente, no al panel interno de licencias. Por eso `CONFIG.licenseApiBase` debe quedarse vacío mientras no exista una URL pública segura.

## Configuración pública recomendada

En `script.js`:

```text
CONFIG.licenseApiBase = ''
CONFIG.email = 'correo de atención'
CONFIG.whatsapp = 'número en formato internacional'
CONFIG.product = 'Cerrajería POS'
CONFIG.downloadUrl = 'release oficial vigente'
CONFIG.paymentLink = 'liga de pago fija, si existe'
```

Con esta configuración, el formulario prepara el mensaje comercial y abre WhatsApp o correo.

## Integración futura con panel público

Si después se publica un backend seguro para recibir prospectos, configurar:

```text
CONFIG.licenseApiBase = 'https://tu-dominio/api'
```

Ese endpoint deberá reenviar el prospecto al panel de licencias y guardar el seguimiento en la nube.

## Prueba local del panel

1. Inicia el panel de licencias en `C:\Users\Antonie\Documents\Serial Proyecto`.
2. Ejecuta `INICIAR_TODO_SERIAL.cmd`.
3. Cambia temporalmente `CONFIG.licenseApiBase` a `http://localhost:3090`.
4. Abre la página de venta localmente.
5. Envía un formulario demo.
6. Confirma que aparece en el panel y en Google Sheets.
7. Regresa `CONFIG.licenseApiBase` a vacío antes de publicar.