# Negocio POS Local - Página de venta

Página comercial pública para ofrecer el sistema POS local y canalizar prospectos al flujo formal de solicitud de licencia.

## Giros incluidos

- Cerrajerías.
- Tiendas y supermercados.
- Talleres mecánicos.
- Restaurantes y cafeterías.
- Otros negocios que requieran venta, caja, inventario, clientes y reportes.

## Flujo comercial

1. El prospecto revisa giros, módulos, prueba y planes.
2. Solicita licencia desde la página.
3. La solicitud se registra en Google Sheets/Drive o en el panel de licencias si está publicado.
4. El cliente puede recibir una prueba de 1 día para validar el flujo.
5. Se confirma alcance: giro, locales, cajas, dispositivos y capacitación.
6. El cliente realiza el pago por el medio acordado.
7. El comprobante se valida en el panel de licencias.
8. El serial se envía por correo formal.

## Archivos principales

- `index.html`: contenido comercial.
- `styles.css`: estilos responsivos.
- `script.js`: menú móvil, selección de plan y envío de solicitud.
- `config.js`: endpoints públicos para registro en nube o panel.
- `integraciones/google-apps-script/Code.gs`: Web App para guardar solicitudes en Google Sheets.
- `documentacion/`: notas operativas y comerciales.

## Descarga oficial

La página enlaza al release público de descarga:

```text
https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.4.zip
```

La descarga no incluye secretos, compradores, llaves privadas, respaldos ni herramientas internas.

## Registro en Google Drive

El flujo recomendado es publicar el Web App de Google Apps Script incluido y pegar su URL en `config.js`.

Documento paso a paso:

```text
documentacion/formulario-google-drive.md
```

WhatsApp y correo quedan como respaldo manual opcional, no como sustitutos del registro formal. Por defecto están apagados.

## Catálogos iniciales publicados

La página comunica que el producto instala una base inicial para:

- Cerrajería: llaves, candados, chapas, marcas y servicios.
- Tienda/supermercado: departamentos, productos de mostrador y servicios rápidos.
- Taller mecánico: marcas/modelos de autos, refacciones y servicios.
- Restaurante/cafetería: menú base, insumos, áreas de cocina y servicios.

La página no cobra directamente. El cliente llena la solicitud, adjunta evidencia cuando corresponda y la licencia se autoriza desde el panel interno.

## Facturación comercial

La página solicita datos fiscales cuando el comprador requiere factura de la licencia: RFC, razón social, CP fiscal, régimen fiscal, uso CFDI y correo de facturación. El comprobante de pago se valida en el panel de licencias antes de emitir serial.