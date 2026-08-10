# Página de venta - Cerrajería POS

Esta carpeta contiene la página comercial pública para ofrecer Cerrajería POS y canalizar prospectos al formulario de solicitud.

## Página pública

```text
https://antonient.github.io/PaginaVenta/
```

La página pública no cobra directamente. Su objetivo es:

- Explicar el producto.
- Mostrar módulos y beneficios.
- Mostrar precios orientativos de lanzamiento.
- Enviar al comprador al formulario formal de solicitud.
- Permitir descarga del instalador oficial.
- Preparar contacto por WhatsApp o correo si el cliente tiene dudas.

## Flujo comercial

1. El cliente revisa la página de venta.
2. Abre el formulario de solicitud.
3. Captura datos del negocio, contacto y datos fiscales si aplican.
4. Elige forma de pago preferida.
5. Adjunta comprobante cuando ya haya realizado transferencia, depósito o pago acordado.
6. El panel interno importa o revisa la solicitud.
7. Se valida el pago.
8. Se genera la licencia.
9. El sistema envía el serial por correo.

## Google Form

Configurar en `script.js`:

```text
CONFIG.googleFormUrl
```

Actualmente debe quedarse vacío hasta pegar el enlace público real del formulario. Si está vacío, el botón abre WhatsApp/correo como respaldo.

## Descarga oficial

```text
https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.0.zip
```

## Seguridad

No guardar aquí `.env`, JSON de Google, claves SMTP, respaldos, bases de datos ni datos reales de compradores.

No publicar datos bancarios completos si todavía no se decide el proceso final. Los datos de pago deben ir dentro del formulario o en seguimiento directo con el cliente.

Documentación principal: `documentacion/00_INDICE.md`.