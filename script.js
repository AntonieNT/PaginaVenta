const CONFIG = {
  whatsapp: '527298089256',
  email: 'isc.marco.tinajero@gmail.com',
  product: 'Negocio POS Local',
  googleFormUrl: '',
  leadApiUrl: '',
  downloadUrl: 'https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.3.zip'
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
  if (CONFIG.whatsapp) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    return 'Solicitud preparada para WhatsApp.';
  }
  const subject = encodeURIComponent(subjectText);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  return 'Solicitud preparada en tu correo.';
}

function buildFormFallbackMessage(plan = '') {
  return [
    `Hola, quiero solicitar una licencia de prueba de 1 dia para conocer ${CONFIG.product}.`,
    plan ? `Plan de interés: ${plan}` : '',
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    'Me pueden compartir el formulario de solicitud. Quiero probar primero el flujo antes de confirmar la compra.'
  ].filter(Boolean).join('\n');
}

function openRequestForm(plan = '') {
  selectedPlan = plan || selectedPlan;
  if (CONFIG.googleFormUrl) {
    window.open(CONFIG.googleFormUrl, '_blank', 'noopener');
    return;
  }
  openMessage(buildFormFallbackMessage(selectedPlan), `Formulario de solicitud ${CONFIG.product}`);
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

function buildLeadMessage(data) {
  return [
    `Hola, quiero recibir una prueba de 1 dia de ${CONFIG.product}.`,
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
    data.get('requiresInvoice') === 'Si' ? `Raz\u00f3n social: ${data.get('fiscalName') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `CP fiscal: ${data.get('fiscalZipCode') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `R\u00e9gimen fiscal: ${data.get('taxRegime') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Uso CFDI: ${data.get('cfdiUse') || 'Pendiente'}` : '',
    data.get('requiresInvoice') === 'Si' ? `Correo de facturaci\u00f3n: ${data.get('billingEmail') || data.get('email')}` : '',
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`,
    'Para compra formal llenaré el formulario de solicitud y adjuntaré comprobante cuando corresponda.'
  ].filter(Boolean).join('\n');
}


async function sendLeadToPanel(data) {
  if (!CONFIG.leadApiUrl) return null;
  const payload = {
    businessName: data.get('business'),
    contactName: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone'),
    whatsapp: data.get('phone'),
    requestedVertical: data.get('vertical'),
    requestedPlan: data.get('plan'),
    requestedBranches: data.get('branches'),
    requestedRegisters: data.get('registers'),
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
  };
  const response = await fetch(CONFIG.leadApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('No se pudo registrar automaticamente.');
  return response.json();
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
      if (note) note.textContent = 'Registro recibido. Revisa el correo registrado para la licencia de prueba de 1 dia o espera seguimiento si requiere revision.';
      form.reset();
      return;
    }
    const resultText = openMessage(buildLeadMessage(data));
    if (note) note.textContent = `${resultText} Te trataremos con cuidado y resolveremos tus dudas antes de la compra.`;
  } catch (error) {
    const resultText = openMessage(buildLeadMessage(data));
    if (note) note.textContent = `${resultText} No se completo el registro automatico, pero ya quedo preparado el contacto.`;
  } finally {
    if (button) button.disabled = false;
  }
});