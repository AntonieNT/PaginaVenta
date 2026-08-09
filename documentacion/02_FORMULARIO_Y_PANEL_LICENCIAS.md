# Formulario y panel de licencias

El formulario de la pagina intenta registrar el prospecto en el panel interno:

```text
http://localhost:3090/api/public/leads
```

Si el panel no responde, usa correo o WhatsApp como respaldo.

## Configuracion

Editar `script.js`:

```text
CONFIG.licenseApiBase
CONFIG.email
CONFIG.whatsapp
CONFIG.product
```

## Prueba rapida

1. Inicia el panel de licencias.
2. Abre la pagina de venta.
3. Envia un formulario demo.
4. Confirma que aparece en el panel y en Google Sheets.
