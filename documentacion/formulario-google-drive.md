# Formulario comercial con Google Drive

Objetivo: que la página de venta registre prospectos en Google Sheets/Drive y deje WhatsApp solo como respaldo manual.

## Opción recomendada

Usar un Web App de Google Apps Script.

La página envía el formulario a ese Web App. El Web App guarda la solicitud en una hoja de Google Sheets y, si el panel de licencias está publicado con HTTPS, también puede reenviar la solicitud al endpoint `/api/public/leads` para emitir la licencia de prueba automáticamente.

## Archivos incluidos

- `config.js`: configuración pública de la página.
- `integraciones/google-apps-script/Code.gs`: código listo para pegar en Google Apps Script.

## Paso a paso

1. Abre Google Drive con la cuenta que administrará ventas.
2. Crea o abre la hoja donde se guardarán los compradores.
3. Copia el ID de la hoja desde la URL.
4. Entra a https://script.google.com/.
5. Crea un proyecto nuevo.
6. Pega el contenido de `integraciones/google-apps-script/Code.gs`.
7. En Configuración del proyecto, agrega estas propiedades del script:

```text
SPREADSHEET_ID=ID_DE_TU_HOJA
OWNER_EMAIL=isc.marco.tinajero@gmail.com
PANEL_LEAD_API_URL=
```

`PANEL_LEAD_API_URL` se deja vacío si el panel de licencias no está publicado en internet. Si más adelante se publica, debe quedar así:

```text
https://tu-dominio.com/api/public/leads
```

8. Presiona Implementar > Nueva implementación.
9. Tipo: Aplicación web.
10. Ejecutar como: Yo.
11. Quién tiene acceso: Cualquier usuario.
12. Copia la URL generada del Web App.
13. Pega esa URL en `config.js`:

```js
window.NEGOCIO_POS_CONFIG = {
  googleAppsScriptUrl: 'https://script.google.com/macros/s/XXXXX/exec',
  leadApiUrl: '',
  googleFormUrl: '',
  whatsappFallback: false
};
```

14. Sube el cambio a GitHub para que GitHub Pages publique la página.

## Cómo probar

1. Abre la página de venta.
2. Captura una solicitud de prueba.
3. Revisa la hoja de Google Sheets.
4. Debe aparecer una fila en `Solicitudes`.
5. Debe aparecer un evento en `Eventos`.
6. Debe llegar un correo de aviso al propietario.

## Si se quiere licencia de prueba inmediata

Para que el cliente reciba el serial de prueba de 1 día al instante, el panel de licencias debe estar disponible por HTTPS y `PANEL_LEAD_API_URL` debe apuntar a `/api/public/leads`.

Sin ese endpoint público, la solicitud sí queda guardada en Drive, pero el envío del serial depende de importar o revisar el prospecto desde el panel.

## Google Form tradicional

También se puede usar Google Forms, pero debe estar publicado como formulario de respuesta pública. La URL correcta termina en `/viewform`, no en `/edit`.

Si el formulario devuelve `401 No autorizado`, falta permitir respuestas públicas o usar la URL de vista pública.