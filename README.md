# Página de venta - Cerrajería POS

Esta carpeta contiene la página comercial pública para ofrecer Cerrajería POS, explicar cómo adquirir una licencia y canalizar prospectos al panel interno de licencias.

## Abrir la página

Ejecuta `ABRIR_PAGINA_VENTA.cmd` o abre directamente `index.html` en el navegador.

## Página pública

La página está preparada para publicarse con GitHub Pages desde el repositorio `AntonieNT/PaginaVenta`.

URL esperada:

```text
https://antonient.github.io/PaginaVenta/
```

En esa página el cliente puede:

- Descargar el instalador oficial desde el release público.
- Ver cómo solicitar o comprar su licencia.
- Consultar los datos para transferencia bancaria.
- Solicitar una liga de pago en línea.
- Enviar sus datos por WhatsApp o correo si el panel de licencias no está disponible.

## Descarga oficial del producto

```text
https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.0.zip
```

## Compra de licencia

La operación comercial recomendada es:

1. El cliente descarga el instalador desde el release oficial.
2. El cliente solicita una licencia desde la página de venta.
3. Se confirma el plan, vigencia, número de locales, cajas y dispositivos.
4. El cliente paga por transferencia o liga de pago en línea.
5. Desde el panel interno de licencias se autoriza la licencia.
6. El sistema envía el serial al correo registrado.
7. El cliente activa su instalación local.

## Datos de pago publicados

Se publican datos suficientes para recibir transferencias: titular, cuenta, CLABE, banco y SWIFT.

No se publica el número de tarjeta de débito. Si el cliente quiere pagar con tarjeta, se le debe enviar una liga formal de pago.

## Conexión con el panel de licencias

El formulario intenta registrar el prospecto en el panel interno:

```text
http://localhost:3090/api/public/leads
```

Para probar el flujo completo:

1. Abre `C:\Users\Antonie\Documents\Serial Proyecto`.
2. Ejecuta `INICIAR_TODO_SERIAL.cmd`.
3. Abre esta página de venta.
4. Envía una solicitud de prueba.
5. Verifica que aparezca como comprador o prospecto en el panel y en Google Sheets.

Si el panel no está encendido, el formulario usa WhatsApp o correo como respaldo.

## Cambiar datos de contacto

Edita `script.js`:

- `CONFIG.licenseApiBase`: URL del panel de licencias.
- `CONFIG.email`: correo que recibirá solicitudes si el panel no responde.
- `CONFIG.whatsapp`: número en formato internacional sin espacios.
- `CONFIG.product`: nombre comercial mostrado en el mensaje.
- `CONFIG.downloadUrl`: liga oficial del instalador.
- `CONFIG.paymentLink`: liga fija de Mercado Pago, Stripe u otro proveedor, si ya existe.

## Imagen principal

La imagen del hero está en `assets/hero-pos.png`. Puedes reemplazarla por otra manteniendo el mismo nombre.

## Seguridad

No guardar aquí `.env`, JSON de Google, claves SMTP, respaldos, bases de datos ni datos reales de compradores.

Documentación principal: `documentacion/00_INDICE.md`.