# Formulario y panel de licencias

La página pública debe enviar al comprador a un Google Form o a WhatsApp/correo como respaldo.

## Campos recomendados del formulario

### Datos del negocio

- Nombre del negocio.
- Nombre completo del contacto.
- Correo.
- Teléfono o WhatsApp.
- Dirección del negocio.
- Número de sucursales.
- Número de cajas.
- Número de dispositivos aproximados.
- Plan de interés: mensual, semestral, anual o cotización.

### Datos fiscales opcionales

- RFC.
- Razón social.
- Domicilio fiscal.
- Régimen fiscal.
- Uso de CFDI.

### Pago y comprobante

- Forma de pago: transferencia, depósito BBVA, liga de pago, pendiente por confirmar.
- Importe pagado.
- Referencia, folio o número de operación.
- Archivo de comprobante.
- Comentarios adicionales.

## Importación al panel

El panel interno tiene la acción `Importar formulario`, que lee respuestas desde Google Forms cuando está configurado `GOOGLE_FORM_ID`.

El importador debe crear:

- Comprador en estado `prospecto` cuando no hay comprobante.
- Comprador y pago en estado `evidencia_recibida` cuando existe comprobante o referencia de pago.

Después se revisa el pago, se aprueba y se genera licencia. El correo formal con serial se envía desde el panel.

## Configuración pública

En `script.js` de esta página:

```text
CONFIG.googleFormUrl = 'ENLACE_PUBLICO_DEL_FORMULARIO'
```

Si más adelante el panel de licencias se publica de forma segura, puede agregarse un endpoint propio, pero para esta versión la ruta más confiable es Google Form + panel interno.
## Estado actual

El enlace anterior del formulario respondió 401 No autorizado al probarlo públicamente. Por eso la página queda con CONFIG.googleFormUrl vacío hasta que se publique el formulario y se copie la liga pública de respuesta.
