const CONFIG = {
  whatsapp: '527298089256',
  email: 'isc.marco.tinajero@gmail.com',
  product: 'Cerrajería POS',
  licenseApiBase: '',
  downloadUrl: 'https://github.com/AntonieNT/CerrajeriaPOS-Descargas/releases/latest/download/CerrajeriaPOS-Cliente-v1.0.0.zip',
  paymentLink: ''
};

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

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

document.querySelectorAll('.plan-button').forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.getAttribute('data-plan') || 'Mensual';
    const select = document.querySelector('#planSelect');
    if (select) select.value = plan;
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(value);
      const previous = button.textContent;
      button.textContent = 'Copiado';
      setTimeout(() => { button.textContent = previous; }, 1400);
    } catch {
      window.prompt('Copia este dato:', value);
    }
  });
});

function leadPayload(data) {
  return {
    businessName: data.get('business'),
    contactName: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone'),
    requestedPlan: data.get('plan'),
    paymentMethod: data.get('paymentMethod'),
    source: 'pagina_venta',
    sourcePage: window.location.href,
    downloadUrl: CONFIG.downloadUrl,
    message: data.get('message') || '',
  };
}

function buildLeadMessage(data, paymentUrl = '') {
  return [
    `Hola, quiero información para adquirir ${CONFIG.product}.`,
    `Negocio: ${data.get('business')}`,
    `Contacto: ${data.get('name')}`,
    `Correo: ${data.get('email')}`,
    `Teléfono: ${data.get('phone')}`,
    `Plan: ${data.get('plan')}`,
    `Forma de pago preferida: ${data.get('paymentMethod') || 'Transferencia bancaria'}`,
    `Descarga oficial: ${CONFIG.downloadUrl}`,
    paymentUrl ? `Liga de seguimiento: ${paymentUrl}` : '',
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`
  ].filter(Boolean).join('\n');
}

function buildPaymentLinkRequest() {
  return [
    `Hola, quiero una liga de pago en línea para adquirir ${CONFIG.product}.`,
    'Entiendo que la comisión de la plataforma se suma al total antes de pagar.',
    `Descarga oficial: ${CONFIG.downloadUrl}`
  ].join('\n');
}

async function registerLead(data) {
  const response = await fetch(`${CONFIG.licenseApiBase}/api/public/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadPayload(data))
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'No se pudo registrar la solicitud.');
  return result;
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

function openFallbackContact(data, paymentUrl = '') {
  return openMessage(buildLeadMessage(data, paymentUrl));
}

document.querySelector('#onlinePaymentButton')?.addEventListener('click', () => {
  if (CONFIG.paymentLink) {
    window.open(CONFIG.paymentLink, '_blank', 'noopener');
    return;
  }
  openMessage(buildPaymentLinkRequest(), `Liga de pago ${CONFIG.product}`);
});

document.querySelector('#leadForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');

  if (button) button.disabled = true;

  if (!CONFIG.licenseApiBase) {
    const fallbackText = openFallbackContact(data);
    if (note) note.textContent = `${fallbackText} Envía también tu comprobante de pago para emitir el serial.`;
    if (button) button.disabled = false;
    return;
  }

  if (note) note.textContent = 'Registrando solicitud en el panel comercial...';

  try {
    const result = await registerLead(data);
    if (note) note.textContent = 'Solicitud registrada. Ya aparece en el panel comercial y te contactaremos para continuar.';
    form.reset();
    if (CONFIG.whatsapp) openFallbackContact(data, result.paymentUrl || '');
  } catch (error) {
    const fallbackText = openFallbackContact(data);
    if (note) note.textContent = `${fallbackText} El panel comercial no respondió: ${error.message}`;
  } finally {
    if (button) button.disabled = false;
  }
});