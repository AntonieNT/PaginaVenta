window.NEGOCIO_POS_CONFIG = {
  // Endpoint recomendado cuando el panel de licencias esté publicado con HTTPS.
  // Ejemplo: https://licencias.tudominio.com/api/public/leads
  leadApiUrl: '',

  // Endpoint alterno de Google Apps Script para guardar solicitudes directo en Google Sheets.
  googleAppsScriptUrl: '',

  // URL pública del Google Form si deseas abrir el formulario oficial como respaldo.
  // Importante: debe ser /viewform y aceptar respuestas públicas.
  googleFormUrl: '',

  // WhatsApp queda apagado por defecto. El correo queda activo como respaldo formal si la nube no esta configurada.
  whatsappFallback: false,
  emailFallback: true
};
