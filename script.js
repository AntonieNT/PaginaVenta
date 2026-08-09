const CONFIG = {
  whatsapp: '',
  email: 'isc.marco.tinajero@gmail.com',
  product: 'Cerrajería POS',
  licenseApiBase: 'http://localhost:3090'
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

function leadPayload(data) {
  return {
    businessName: data.get('business'),
    contactName: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone'),
    requestedPlan: data.get('plan'),
    source: 'pagina_venta',
    sourcePage: window.location.href,
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
    paymentUrl ? `Liga de seguimiento: ${paymentUrl}` : '',
    `Mensaje: ${data.get('message') || 'Sin mensaje adicional'}`
  ].filter(Boolean).join('\n');
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

function openFallbackContact(data, paymentUrl = '') {
  const message = buildLeadMessage(data, paymentUrl);
  if (CONFIG.whatsapp) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    return 'Solicitud preparada para WhatsApp.';
  }
  const subject = encodeURIComponent(`Solicitud de licencia ${CONFIG.product}`);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  return 'Solicitud preparada en tu correo.';
}

document.querySelector('#leadForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');
  if (note) note.textContent = 'Registrando solicitud en el panel comercial...';
  if (button) button.disabled = true;

  try {
    const result = await registerLead(data);
    if (note) note.textContent = 'Solicitud registrada. Ya aparece en el panel comercial y te contactaremos para continuar.';
    form.reset();
    if (CONFIG.whatsapp) openFallbackContact(data, result.paymentUrl || '');
  } catch (error) {
    const fallbackText = openFallbackContact(data);
    if (note) note.textContent = `${fallbackText} El panel local no respondió: ${error.message}`;
  } finally {
    if (button) button.disabled = false;
  }
});
