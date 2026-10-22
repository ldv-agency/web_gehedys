/**
 * Gehydis Consulting - Módulo de Rastreo de UTMs y Atribución de Leads
 * Captura, persistencia en localStorage/sessionStorage y envío a Webhook n8n / GoHighLevel / Google Sheets
 * 
 * Soporta:
 * - utm_source (Origen: meta, google, tiktok, email, directo...)
 * - utm_medium (Medio: cpc, story, reel, banner, organico...)
 * - utm_campaign (Nombre de la Campaña publicitaria)
 * - utm_term (Término, palabra clave o público segmentado)
 * - utm_content (Contenido, creativo, formato de anuncio o id)
 * - Click IDs publicitarios: fbclid (Meta), gclid (Google), ttclid (TikTok)
 */

(function () {
  'use strict';

  // Configuración global del Webhook (n8n o automatización)
  const DEFAULT_N8N_WEBHOOK_URL = 'https://n8n.srv1402866.hstgr.cloud/webhook/prospectos_gehydis';

  const STORAGE_KEY = 'gehydis_utm_attribution';
  const ATTRIBUTION_DAYS = 30; // Ventana de atribución de 30 días

  const UTM_PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'ttclid'
  ];

  const UtmTracker = {
    // Configuración actual
    config: {
      webhookUrl: window.N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL,
      timeoutMs: 3000 // Máximo 3 segundos para no demorar la redirección a WhatsApp
    },

    /**
     * Inicializar el rastreo en la página
     */
    init: function () {
      try {
        const currentUtms = this.extractFromUrl();
        const hasUrlUtms = Object.keys(currentUtms).some(k => Boolean(currentUtms[k]));

        let storedData = this.getStoredUtmData();

        if (hasUrlUtms) {
          // Si el visitante llegó con nuevos UTMs en la URL, guardamos y actualizamos atribución
          const now = new Date().toISOString();
          const attributionPayload = {
            ...currentUtms,
            landing_page: window.location.href.split('#')[0],
            landing_path: window.location.pathname,
            referrer: document.referrer || 'directo',
            first_touch_date: storedData ? (storedData.first_touch_date || now) : now,
            last_touch_date: now
          };

          this.saveUtmData(attributionPayload);
        } else if (!storedData) {
          // Si no tiene UTMs y no hay datos previos, detectar fuente orgánica o directa
          const organicSource = this.detectOrganicSource();
          const now = new Date().toISOString();
          const defaultPayload = {
            utm_source: organicSource.source,
            utm_medium: organicSource.medium,
            utm_campaign: 'organico_directo',
            utm_term: 'n/a',
            utm_content: 'n/a',
            fbclid: '',
            gclid: '',
            ttclid: '',
            landing_page: window.location.href.split('#')[0],
            landing_path: window.location.pathname,
            referrer: document.referrer || 'directo',
            first_touch_date: now,
            last_touch_date: now
          };
          this.saveUtmData(defaultPayload);
        }

        // Inyectar en formularios existentes al cargar el DOM
        this.autoInjectForms();

        console.log('[UtmTracker] Inicializado con éxito. Datos activos:', this.getUtmData());
      } catch (err) {
        console.error('[UtmTracker] Error inicializando rastreador:', err);
      }
    },

    /**
     * Extrae los parámetros UTM y Click IDs de la URL actual
     */
    extractFromUrl: function () {
      const params = new URLSearchParams(window.location.search);
      const data = {};

      UTM_PARAMS.forEach(param => {
        const val = params.get(param);
        if (val) {
          data[param] = decodeURIComponent(val).trim();
        } else {
          data[param] = '';
        }
      });

      return data;
    },

    /**
     * Detecta el origen orgánico si no hay parámetros en la URL
     */
    detectOrganicSource: function () {
      const ref = (document.referrer || '').toLowerCase();

      if (ref.includes('facebook.com') || ref.includes('fb.me') || ref.includes('instagram.com')) {
        return { source: 'meta_social', medium: 'social_organic' };
      }
      if (ref.includes('google.')) {
        return { source: 'google', medium: 'organic_search' };
      }
      if (ref.includes('tiktok.com')) {
        return { source: 'tiktok', medium: 'social_organic' };
      }
      if (ref.includes('linkedin.com')) {
        return { source: 'linkedin', medium: 'social_organic' };
      }
      if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) {
        return { source: 'x_twitter', medium: 'social_organic' };
      }
      if (ref.includes('youtube.com')) {
        return { source: 'youtube', medium: 'video_organic' };
      }
      if (ref && !ref.includes(window.location.hostname)) {
        return { source: 'referral_externo', medium: 'referral' };
      }

      return { source: 'directo', medium: 'visita_directa' };
    },

    /**
     * Obtiene los datos almacenados en localStorage (con validación de vigencia de 30 días)
     */
    getStoredUtmData: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (parsed && parsed.last_touch_date) {
          const lastTouch = new Date(parsed.last_touch_date).getTime();
          const diffDays = (Date.now() - lastTouch) / (1000 * 60 * 60 * 24);
          if (diffDays <= ATTRIBUTION_DAYS) {
            return parsed;
          }
        }
        return null;
      } catch (e) {
        return null;
      }
    },

    /**
     * Guarda los datos en localStorage y sessionStorage
     */
    saveUtmData: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('[UtmTracker] No se pudo guardar en almacenamiento local:', e);
      }
    },

    /**
     * Retorna el objeto unificado de UTMs listo para enviar o inspeccionar
     */
    getUtmData: function () {
      const stored = this.getStoredUtmData();
      const currentUrl = this.extractFromUrl();

      // Si hay parámetros activos en la URL, prevalecen sobre el almacenamiento antiguo
      const finalData = {
        utm_source: currentUrl.utm_source || stored?.utm_source || 'directo',
        utm_medium: currentUrl.utm_medium || stored?.utm_medium || 'web',
        utm_campaign: currentUrl.utm_campaign || stored?.utm_campaign || 'organico_directo',
        utm_term: currentUrl.utm_term || stored?.utm_term || 'n/a',
        utm_content: currentUrl.utm_content || stored?.utm_content || 'n/a',
        fbclid: currentUrl.fbclid || stored?.fbclid || '',
        gclid: currentUrl.gclid || stored?.gclid || '',
        ttclid: currentUrl.ttclid || stored?.ttclid || '',
        landing_page: stored?.landing_page || window.location.href.split('#')[0],
        referrer: stored?.referrer || document.referrer || 'directo',
        first_touch_date: stored?.first_touch_date || new Date().toISOString(),
        last_touch_date: stored?.last_touch_date || new Date().toISOString()
      };

      return finalData;
    },

    /**
     * Inyecta campos ocultos en un formulario específico
     */
    injectInForm: function (form) {
      if (!form) return;
      const utms = this.getUtmData();

      const fieldsToInject = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'fbclid',
        'gclid',
        'ttclid',
        'landing_page',
        'referrer'
      ];

      fieldsToInject.forEach(fieldName => {
        let input = form.querySelector(`input[name="${fieldName}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = fieldName;
          input.setAttribute('data-utm-field', 'true');
          form.appendChild(input);
        }
        input.value = utms[fieldName] || '';
      });
    },

    /**
     * Inyecta automáticamente los campos en todos los formularios de la página
     */
    autoInjectForms: function () {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => this.injectInForm(form));
    },

    /**
     * Detecta el dispositivo (Móvil, Tablet o Escritorio)
     */
    getDeviceType: function () {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'Tablet';
      }
      if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
        return 'Móvil';
      }
      return 'Escritorio';
    },

    /**
     * Envía el lead completo al Webhook de n8n
     * n8n lo recibirá y lo enviará a Telegram, GoHighLevel y Google Sheets.
     * 
     * @param {Object} leadInfo Datos del formulario (nombre, email, teléfono, etc.)
     * @returns {Promise<Object>} Resultado del envío
     */
    sendLeadToWebhook: async function (leadInfo) {
      const utms = this.getUtmData();
      const webhookUrl = window.N8N_WEBHOOK_URL || this.config.webhookUrl;

      // Identificadores de Meta para deduplicar el evento Lead entre el Pixel (gracias.html)
      // y la API de Conversiones (n8n): ambos usan el mismo event_id
      const readCookie = (name) => {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
      };
      const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
      const fbp = readCookie('_fbp');
      const fbc = readCookie('_fbc') || (utms.fbclid ? 'fb.1.' + Date.now() + '.' + utms.fbclid : '');

      // Consolidar payload estructurado para n8n, GoHighLevel y Google Sheets
      const payload = {
        // Datos de Contacto
        firstName: leadInfo.firstName || '',
        lastName: leadInfo.lastName || '',
        fullName: leadInfo.fullName || `${leadInfo.firstName || ''} ${leadInfo.lastName || ''}`.trim(),
        company: leadInfo.company || '',
        phone: leadInfo.phone || '',
        email: leadInfo.email || '',
        product: leadInfo.product || '',
        productId: leadInfo.productId || '',
        staff: leadInfo.staff || 'No especificado',
        frequency: leadInfo.frequency || '',
        price: leadInfo.price || '',
        paymentMethod: leadInfo.paymentMethod || '',
        message: leadInfo.message || '',
        formType: leadInfo.formType || 'formulario_web',

        // Parámetros UTM (Mapeo directo a campos personalizados de GoHighLevel)
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_term: utms.utm_term,
        utm_content: utms.utm_content,

        // Identificadores de Clic Publicitario
        fbclid: utms.fbclid,
        gclid: utms.gclid,
        ttclid: utms.ttclid,

        // Meta Pixel / API de Conversiones
        event_id: eventId,
        fbp: fbp,
        fbc: fbc,

        // Metadatos de Navegación y Contexto
        landing_page: utms.landing_page,
        current_page: window.location.href,
        referrer: utms.referrer,
        device: this.getDeviceType(),
        first_touch_date: utms.first_touch_date,
        submittedAt: new Date().toISOString()
      };

      // Guardar también en sessionStorage para uso en gracias.html
      try {
        sessionStorage.setItem('gehydis_last_lead_payload', JSON.stringify(payload));
        sessionStorage.setItem('lead_utm_source', payload.utm_source);
        sessionStorage.setItem('lead_utm_campaign', payload.utm_campaign);
        sessionStorage.setItem('lead_utm_medium', payload.utm_medium);
        sessionStorage.setItem('lead_event_id', payload.event_id);
      } catch (e) {
        console.warn('[UtmTracker] Error guardando en sessionStorage:', e);
      }

      // Si no hay Webhook configurado todavía, registrar aviso y continuar sin bloquear
      if (!webhookUrl || webhookUrl.trim() === '') {
        console.warn(
          '[UtmTracker] AVISO: Aún no se ha definido N8N_WEBHOOK_URL.\n' +
          'Los datos UTM y del lead fueron capturados exitosamente en sessionStorage y consola.\n' +
          'Configure window.N8N_WEBHOOK_URL en main.js o en index.html con su endpoint de n8n para recibirlos en vivo.\n' +
          'Payload capturado:', payload
        );
        return { success: true, mocked: true, payload };
      }

      // Envío real con timeout para proteger la experiencia del usuario
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);

      try {
        console.log('[UtmTracker] Enviando lead con UTMs a webhook n8n:', webhookUrl, payload);
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        console.log('[UtmTracker] Respuesta recibida del webhook n8n. Status:', response.status);
        return { success: response.ok, status: response.status, payload };
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          console.warn('[UtmTracker] El webhook excedió el tiempo límite (' + this.config.timeoutMs + 'ms), continuando con la redirección.');
        } else {
          console.error('[UtmTracker] Error al conectar con el webhook de n8n:', err);
        }
        // Retornamos success: false pero no lanzamos excepción para que la navegación continúe a WhatsApp
        return { success: false, error: err.message, payload };
      }
    }
  };

  // Exponer en objeto global window
  window.UtmTracker = UtmTracker;

  // Ejecutar inicialización al cargar el DOM o inmediatamente si ya cargó
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UtmTracker.init());
  } else {
    UtmTracker.init();
  }
})();
