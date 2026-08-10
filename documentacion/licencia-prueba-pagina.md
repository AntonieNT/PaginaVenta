# Licencia de prueba en pagina de venta

## Objetivo comercial
La pagina explica que el prospecto puede recibir una prueba de 1 dia antes de comprar. Esto ayuda a que el cliente valide el flujo con mas confianza.

## Registro automatico
En script.js existe CONFIG.leadApiUrl. Si se configura con la URL publica del panel:

```js
leadApiUrl: 'https://tu-panel.example.com/api/public/leads'
```

El formulario envia los datos al panel y el panel emite la prueba automaticamente.

## Sin panel publico
Si leadApiUrl queda vacio, la pagina usa WhatsApp o correo como respaldo. En ese caso el panel puede emitir o reenviar la prueba manualmente desde Compradores.

## Vistas de referencia
La seccion Vistas de referencia muestra ejemplos visuales del punto de venta, inventario y modo tactil para que el comprador entienda mejor el producto antes de instalar.
