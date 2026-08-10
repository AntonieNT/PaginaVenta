# Compra, pagos y licencias

Este documento describe el flujo comercial público para vender Cerrajería POS sin exponer información sensible del ecosistema.

## Flujo recomendado

1. El cliente entra a la página pública de venta.
2. Descarga el instalador desde el release oficial.
3. Solicita su licencia mediante WhatsApp, correo o formulario conectado al panel interno.
4. Se confirma el plan, vigencia, locales, cajas y dispositivos.
5. El cliente paga por transferencia o solicita una liga de pago en línea.
6. Se registra el pago en el panel de licencias.
7. Se autoriza la licencia y el sistema envía el serial por correo.
8. El cliente activa su instalación local.

## Datos para transferencia

Publicar únicamente datos necesarios para recibir transferencias:

- Titular: Marco Antonio Nava Tinajero
- Banco: BBVA
- Cuenta: 157 777 2747
- CLABE: 012 180 01577772747 0
- SWIFT: BCMRMXMMPYM

No publicar el número de tarjeta de débito. Para pagos con tarjeta se debe usar una liga de pago formal.

## Pago en línea

La opción recomendada para México es Mercado Pago porque permite generar una experiencia conocida para clientes locales y puede aceptar tarjeta, transferencia y otros medios según la configuración de la cuenta.

Alternativa: Stripe Payment Links, útil si se desea cobrar con tarjeta y manejar enlaces de pago reutilizables.

## Comisión al cliente

Si el proveedor de pago cobra comisión, el importe final debe calcularse antes de enviar la liga de pago para que el cliente cubra la comisión.

Ejemplo operativo:

```text
Precio base + comisión de plataforma = total a pagar por el cliente
```

No guardar fórmulas rígidas en la página pública si todavía no se confirma el proveedor final, porque las comisiones pueden cambiar.

## Registro interno

Cada pago debe quedar registrado en el panel de licencias con:

- Cliente o negocio.
- Correo y teléfono.
- Plan contratado.
- Vigencia.
- Importe pagado.
- Método de pago.
- Evidencia o referencia.
- Serial emitido.
- Usuario interno que autorizó.

## Mensaje al cliente

Después de confirmar el pago, el cliente debe recibir un correo formal con:

- Nombre del negocio.
- Plan contratado.
- Vigencia.
- Serial de activación.
- Pasos para activar.
- Correo de soporte.