# Cierre operativo V1 - Pagina de venta

Fecha: 2026-08-09

## 1. Seguridad inmediata

- Se agrego auditoria de secretos y artefactos.
- La pagina no debe contener credenciales, JSON, tokens ni datos reales de compradores.

## 2. Version formal V1

Usar tag `v1.0.3` despues de validar contenido y enlaces.

## 3. Automatizacion

Workflow: `.github/workflows/validacion-v1.yml`.

Valida auditoria, archivos requeridos y mojibake.

## 4. Prueba limpia

Abrir `index.html` desde una carpeta nueva y verificar formulario, contacto y vista movil.

## 5. Checklist comercial

- Mensaje claro.
- Contacto correcto.
- Formulario conectado al panel o respaldo por correo/WhatsApp.
- Sin tecnologias internas en texto comercial.

## 6. QA funcional

Probar escritorio, movil, botones, enlaces y envio de formulario.

## 7. Entrega

La pagina se publica desde repo privado. No versionar builds, zips ni secretos.
