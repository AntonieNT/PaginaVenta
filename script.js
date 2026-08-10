const DEFAULT_CONFIG = {
  whatsapp: '527298089256',
  email: 'isc.marco.tinajero@gmail.com',
  product: 'Negocio POS Local',
  googleFormUrl: '',
  googleAppsScriptUrl: '',
  leadApiUrl: '',
  whatsappFallback: false,
  downloadUrl: 'https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.4.zip'
};

const CONFIG = {
  ...DEFAULT_CONFIG,
  ...(window.NEGOCIO_POS_CONFIG || {})
};

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
let selectedPlan = '';

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

function verticalLabel(value) {
  if (value === 'retail') return 'Tienda / supermercado';
  if (value === 'workshop') return 'Taller mecánico';
  if (value === 'restaurant') return 'Restaurante / cafetería';
  if (value === 'other') return 'Otro negocio';
  return 'Cerrajería';
}

function openMessage(message, subjectText = `Solicitud de licencia ${CONFIG.product}`) {
  if (CONFIG.whatsapp && CONFIG.whatsappFallback) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    return 'Abrimos WhatsApp como respaldo manual.';
  }
  const subject = encodeURIComponent(subjectText);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  return 'Abrimos tu correo como respaldo manual.';
}

function buildFormFallbackMessage(plan = '') {
  return [
    `Hola, quiero solicitar una licencia de prueba de 1 día para conocer ${CONFIG.product}.`,
    plan ? `Plan de interés: ${plan}` : '',
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    'Me pueden apoyar con el registro formal de mi solicitud.'
  ].filter(Boolean).join('\n');
}

function setFormNote(message) {
  const note = document.querySelector('#formNote');
  if (note) note.textContent = message;
}

function openRequestForm(plan = '') {
  selectedPlan = plan || selectedPlan;
  const select = document.querySelector('#planSelect');
  if (select && selectedPlan) select.value = selectedPlan;
  document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });

  if (CONFIG.leadApiUrl || CONFIG.googleAppsScriptUrl) {
    setFormNote('Completa el formulario. Tu solicitud quedará registrada para seguimiento y prueba de licencia.');
    return;
  }
  if (CONFIG.googleFormUrl) {
    setFormNote('Completa tus datos aquí o abre el formulario oficial para que tu solicitud quede registrada.');
    return;
  }
  setFormNote('El registro automático aún no tiene configurado el formulario oficial. Puedes dejar tus datos y te mostraremos el respaldo manual.');
}

document.querySelectorAll('.plan-button').forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.getAttribute('data-plan') || '';
    const select = document.querySelector('#planSelect');
    selectedPlan = plan;
    if (select && plan) select.value = plan;
    document.querySelector('#solicitud')?.scrollIntoView({ behavior: 'smooth' });
  });
});

['#formButton', '#heroFormButton', '#mobileFormButton', '#trialButton'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', () => openRequestForm(selectedPlan));
});

function buildLeadPayload(data) {
  return {
    businessName: data.get('business'),
    business: data.get('business'),
    contactName: data.get('name'),
    name: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone'),
    whatsapp: data.get('phone'),
    requestedVertical: data.get('vertical'),
    vertical: data.get('vertical'),
    verticalLabel: verticalLabel(data.get('vertical')),
    requestedPlan: data.get('plan'),
    plan: data.get('plan'),
    requestedBranches: data.get('branches'),
    branches: data.get('branches'),
    requestedRegisters: data.get('registers'),
    registers: data.get('registers'),
    requiresInvoice: data.get('requiresInvoice') === 'Si',
    rfc: data.get('rfc'),
    fiscalName: data.get('fiscalName'),
    fiscalZipCode: data.get('fiscalZipCode'),
    taxRegime: data.get('taxRegime'),
    cfdiUse: data.get('cfdiUse'),
    billingEmail: data.get('billingEmail'),
    message: data.get('message'),
    sourcePage: location.href,
    source: 'pagina_venta',
    submittedAt: new Date().toISOString()
  };
}

function buildLeadMessage(data) {
  return [
    `Hola, quiero recibir una prueba de 1 día de ${CONFIG.product}.`,
    `Negocio: ${data.get('business')}`,
    `Contacto: ${data.get('name')}`,
    `Correo: ${data.get('email')}`,
    `Teléfono: ${data.get('phone')}`,
    `Giro: ${verticalLabel(data.get('vertical'))}`,
    `Plan: ${data.get('plan')}`,
    `Locales: ${data.get('branches')}`,
    `Cajas: ${data.get('registers')}`,
    `Requiere factura: ${data.get('requiresInvoice') || 'No'}`,
    data.get('requiresInvoice') === 'Si' ? `RFC: ${data.get('rfc') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Razón social: ${data.get('fiscalName') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `CP fiscal: ${data.get('fiscalZipCode') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Régimen fiscal: ${data.get('taxRegime') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Uso CFDI: ${data.get('cfdiUse') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Correo de facturación: ${data.get('billingEmail') || data.get('email')}` : '',
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`,
    'Quedo atento al seguimiento de mi solicitud.'
  ].filter(Boolean).join('\n');
}

async function sendLeadToPanel(data) {
  if (!CONFIG.leadApiUrl) return null;
  const response = await fetch(CONFIG.leadApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildLeadPayload(data)),
  });
  if (!response.ok) throw new Error('No se pudo registrar automáticamente en el panel.');
  return response.json();
}

async function sendLeadToGoogleAppsScript(data) {
  if (!CONFIG.googleAppsScriptUrl) return null;
  await fetch(CONFIG.googleAppsScriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(buildLeadPayload(data)),
  });
  return { ok: true, provider: 'google_apps_script' };
}

document.querySelector('#leadForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');

  if (button) button.disabled = true;
  try {
    const registered = await sendLeadToPanel(data);
    if (registered) {
      if (note) note.textContent = 'Registro recibido. Revisa el correo registrado para la licencia de prueba de 1 día o espera seguimiento si requiere revisión.';
      form.reset();
      return;
    }

    const cloudRegistered = await sendLeadToGoogleAppsScript(data);
    if (cloudRegistered) {
      if (note) note.textContent = 'Registro recibido. Tu solicitud quedó guardada para seguimiento; revisa tu correo o espera contacto del equipo.';
      form.reset();
      return;
    }

    if (CONFIG.googleFormUrl) {
      window.open(CONFIG.googleFormUrl, '_blank', 'noopener');
      if (note) note.textContent = 'Abrimos el formulario oficial para guardar tu solicitud. Si ya capturaste datos aquí, repítelos en el formulario para que queden en la nube.';
      return;
    }

    if (CONFIG.whatsappFallback || CONFIG.email) {
      const resultText = openMessage(buildLeadMessage(data));
      if (note) note.textContent = `${resultText} El registro automático aún no está configurado.`;
      return;
    }

    if (note) note.textContent = 'El registro automático aún no está configurado. Intenta más tarde o contacta al equipo de soporte.';
  } catch (error) {
    if (CONFIG.googleFormUrl) {
      window.open(CONFIG.googleFormUrl, '_blank', 'noopener');
      if (note) note.textContent = 'No pudimos registrar directo en el panel. Abrimos el formulario oficial para no perder tu solicitud.';
      return;
    }
    if (CONFIG.whatsappFallback || CONFIG.email) {
      const resultText = openMessage(buildLeadMessage(data));
      if (note) note.textContent = `${resultText} No se completó el registro automático, pero no queremos perder tu solicitud.`;
      return;
    }
    if (note) note.textContent = 'No se completó el registro automático. Intenta nuevamente en unos minutos.';
  } finally {
    if (button) button.disabled = false;
  }
});