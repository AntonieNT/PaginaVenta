const CONFIG = {
  whatsapp: '527298089256',
  email: 'isc.marco.tinajero@gmail.com',
  product: 'Cerrajería POS',
  googleFormUrl: 'https://docs.google.com/forms/d/152UCEV-lnRErZOWNadBnWrQDUqiXSc49YHGCwqcE_ok/viewform',
  downloadUrl: 'https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.0.zip'
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
    `Hola, quiero solicitar información para adquirir ${CONFIG.product}.`,
    plan ? `Plan de interés: ${plan}` : '',
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    'Me pueden compartir el formulario de solicitud y los pasos para registrar mi comprobante de pago.'
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

['#formButton', '#heroFormButton', '#mobileFormButton'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', () => openRequestForm(selectedPlan));
});

function buildLeadMessage(data) {
  return [
    `Hola, quiero información para adquirir ${CONFIG.product}.`,
    `Negocio: ${data.get('business')}`,
    `Contacto: ${data.get('name')}`,
    `Correo: ${data.get('email')}`,
    `Teléfono: ${data.get('phone')}`,
    `Plan: ${data.get('plan')}`,
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`,
    'Para compra formal llenaré el formulario de solicitud y adjuntaré comprobante cuando corresponda.'
  ].filter(Boolean).join('\n');
}

document.querySelector('#leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');

  if (button) button.disabled = true;
  const resultText = openMessage(buildLeadMessage(data));
  if (note) note.textContent = `${resultText} Para compra y comprobante usa el formulario de solicitud.`;
  if (button) button.disabled = false;
});