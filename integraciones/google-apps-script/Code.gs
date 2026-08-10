const SHEET_NAME = 'Solicitudes';
const EVENT_SHEET_NAME = 'Eventos';

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: props.getProperty('SPREADSHEET_ID'),
    ownerEmail: props.getProperty('OWNER_EMAIL') || 'isc.marco.tinajero@gmail.com',
    panelLeadApiUrl: props.getProperty('PANEL_LEAD_API_URL') || '',
  };
}

function openSpreadsheet() {
  const config = getConfig();
  if (!config.spreadsheetId) throw new Error('Falta configurar SPREADSHEET_ID en propiedades del script.');
  return SpreadsheetApp.openById(config.spreadsheetId);
}

function ensureSheet(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function readPayload(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Solicitud vacía.');
  return JSON.parse(e.postData.contents);
}

function normalizeLead(payload) {
  return {
    fecha: new Date().toISOString(),
    negocio: payload.businessName || payload.business || '',
    contacto: payload.contactName || payload.name || '',
    correo: payload.email || '',
    telefono: payload.phone || payload.whatsapp || '',
    giro: payload.verticalLabel || payload.requestedVertical || payload.vertical || '',
    plan: payload.requestedPlan || payload.plan || '',
    locales: payload.requestedBranches || payload.branches || 1,
    cajas: payload.requestedRegisters || payload.registers || 1,
    requiereFactura: payload.requiresInvoice ? 'Sí' : 'No',
    rfc: payload.rfc || '',
    razonSocial: payload.fiscalName || '',
    cpFiscal: payload.fiscalZipCode || '',
    regimenFiscal: payload.taxRegime || '',
    usoCfdi: payload.cfdiUse || '',
    correoFacturacion: payload.billingEmail || '',
    mensaje: payload.message || '',
    origen: payload.sourcePage || payload.source || 'pagina_venta',
    estado: 'prospecto',
  };
}

function appendLead(lead) {
  const spreadsheet = openSpreadsheet();
  const sheet = ensureSheet(spreadsheet, SHEET_NAME, [
    'Fecha', 'Negocio', 'Contacto', 'Correo', 'Teléfono', 'Giro', 'Plan', 'Locales', 'Cajas',
    'Requiere factura', 'RFC', 'Razón social', 'CP fiscal', 'Régimen fiscal', 'Uso CFDI',
    'Correo facturación', 'Mensaje', 'Origen', 'Estado'
  ]);
  sheet.appendRow([
    lead.fecha, lead.negocio, lead.contacto, lead.correo, lead.telefono, lead.giro, lead.plan,
    lead.locales, lead.cajas, lead.requiereFactura, lead.rfc, lead.razonSocial, lead.cpFiscal,
    lead.regimenFiscal, lead.usoCfdi, lead.correoFacturacion, lead.mensaje, lead.origen, lead.estado
  ]);
}

function appendEvent(type, message, details) {
  const spreadsheet = openSpreadsheet();
  const sheet = ensureSheet(spreadsheet, EVENT_SHEET_NAME, ['Fecha', 'Tipo', 'Mensaje', 'Detalle']);
  sheet.appendRow([new Date().toISOString(), type, message, JSON.stringify(details || {})]);
}

function forwardToPanel(payload) {
  const config = getConfig();
  if (!config.panelLeadApiUrl) return { forwarded: false };
  const response = UrlFetchApp.fetch(config.panelLeadApiUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  return {
    forwarded: response.getResponseCode() >= 200 && response.getResponseCode() < 300,
    status: response.getResponseCode(),
    body: response.getContentText().slice(0, 500),
  };
}

function notifyOwner(lead) {
  const config = getConfig();
  if (!config.ownerEmail) return;
  const subject = 'Nueva solicitud Negocio POS Local - ' + (lead.negocio || lead.contacto || 'Prospecto');
  const body = [
    'Nueva solicitud registrada.',
    '',
    'Negocio: ' + lead.negocio,
    'Contacto: ' + lead.contacto,
    'Correo: ' + lead.correo,
    'Teléfono: ' + lead.telefono,
    'Giro: ' + lead.giro,
    'Plan: ' + lead.plan,
    'Locales: ' + lead.locales,
    'Cajas: ' + lead.cajas,
    'Requiere factura: ' + lead.requiereFactura,
    'RFC: ' + lead.rfc,
    '',
    'Mensaje:',
    lead.mensaje || 'Sin mensaje adicional',
  ].join('\n');
  MailApp.sendEmail(config.ownerEmail, subject, body);
}

function doGet() {
  return jsonResponse({ ok: true, service: 'Negocio POS Local - solicitudes' });
}

function doPost(e) {
  try {
    const payload = readPayload(e);
    const lead = normalizeLead(payload);
    appendLead(lead);
    const panelResult = forwardToPanel(payload);
    appendEvent('solicitud_recibida', 'Solicitud guardada desde página de venta', { lead, panelResult });
    notifyOwner(lead);
    return jsonResponse({ ok: true, saved: true, panel: panelResult });
  } catch (error) {
    try { appendEvent('error_solicitud', String(error && error.message ? error.message : error), {}); } catch (_) {}
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}