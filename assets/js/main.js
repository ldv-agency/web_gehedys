/**
 * Gehydis Consulting - Lógica Interactiva y Dinámica
 * Gestión de Catálogo con Cambio Dinámico de Título y Hash (Medición de Resultados)
 * Cero Emojis - Estilo Ejecutivo y Conforme a Normativa Venezolana
 */

document.addEventListener('DOMContentLoaded', () => {
  const GEHYDIS_WHATSAPP = '584220284363';

  // Configuración de Webhook n8n para distribución a Telegram, GoHighLevel y Google Sheets
  window.N8N_WEBHOOK_URL = window.N8N_WEBHOOK_URL || 'https://n8n.srv1402866.hstgr.cloud/webhook/prospectos_gehydis';

  // Actualizar enlaces de WhatsApp si existen
  const updateWhatsAppLinks = () => {
    const waButtons = document.querySelectorAll('.btn-whatsapp-action');
    waButtons.forEach(btn => {
      const currentHref = btn.getAttribute('href');
      if (currentHref && currentHref.includes('wa.me/')) {
        const urlObj = new URL(currentHref);
        const textParam = urlObj.searchParams.get('text');
        btn.setAttribute('href', `https://wa.me/${GEHYDIS_WHATSAPP}?text=${encodeURIComponent(textParam || 'Hola Lcda. Gehydis, deseo solicitar información sobre sus sistemas.')}`);
      }
    });
  };
  updateWhatsAppLinks();

  /* ==========================================================================
     Menú Móvil
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Actualizar estado activo en clic y cerrar menú en móviles (excepto botón desplegable)
    const allNavLinks = mainNav.querySelectorAll('.nav-link, .nav-mobile-cta');
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!link.classList.contains('nav-dropdown-btn')) {
          mainNav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          if (link.classList.contains('nav-link')) {
            link.classList.add('active');
          }
          if (mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
          }
        }
      });
    });
  }

  /* ==========================================================================
     Metadatos de Categorías y Productos para Analítica y Títulos Dinámicos
     ========================================================================== */
  const categoryMetadata = {
    'all': {
      title: 'Catálogo Oficial de Soluciones | Gehydis Consulting',
      badge: 'Portafolio Especializado',
      heading: 'Catálogo Oficial de Soluciones',
      subtitle: 'Seleccione la categoría de su interés para visualizar especificaciones técnicas, alcances, modalidades de escala y opciones de adquisición directa.',
      hash: 'catalogo'
    },
    'nomina': {
      title: 'Suite NóminaOrbe - Nómina Empresarial en Venezuela | Gehydis Consulting',
      badge: 'Nómina Empresarial',
      heading: 'Suite NóminaOrbe en Excel',
      subtitle: 'Sistema integral formulado para nómina ordinaria semanal o quincenal, Cestaticket y retenciones parafiscales adaptadas a la LOTTT y tasa BCV.',
      hash: 'suite-nomina'
    },
    'colegios': {
      title: 'Sector Educativo: Nómina Docente y Cobranza Escolar | Gehydis Consulting',
      badge: 'Sector Educativo',
      heading: 'Sistemas para Colegios y Preescolares',
      subtitle: 'Soluciones administrativas escolares: Nómina por horas para docentes y control de cuentas por cobrar multidivisa.',
      hash: 'sector-educativo'
    },
    'plantillas': {
      title: 'Plantillas Laborales Formuladas en Excel | Gehydis Consulting',
      badge: 'Plantillas Laborales',
      heading: 'Plantillas de Cálculo Laboral y Financiero',
      subtitle: 'Herramientas automatizadas para cálculo de utilidades, liquidaciones de personal, retención de fondo de pensiones y flujo de caja.',
      hash: 'plantillas-laborales'
    },
    'capacitacion': {
      title: 'Formación y Masterclasses Laborales en Venezuela | Gehydis Consulting',
      badge: 'Formación y Masterclasses',
      heading: 'Masterclasses y Capacitación Laboral',
      subtitle: 'Cursos prácticos en video con material formulado descargable sobre Ingreso Mínimo Integral y aportes parafiscales.',
      hash: 'masterclasses'
    }
  };

  const productMetadata = {
    'suite-nomina': {
      title: 'Suite NóminaOrbe (Semanal y Quincenal) | Gehydis Consulting',
      hash: 'suite-nomina',
      category: 'nomina'
    },
    'colegios-docentes': {
      title: 'Suite Nómina por Horas (Docentes) | Gehydis Consulting',
      hash: 'colegios-docentes',
      category: 'colegios'
    },
    'colegios-cxc': {
      title: 'Sistema de Cuentas por Cobrar (Colegios) | Gehydis Consulting',
      hash: 'colegios-cxc',
      category: 'colegios'
    },
    'cuentas-por-pagar': {
      title: 'Sistema de Cuentas por Pagar y Flujo de Caja | Gehydis Consulting',
      hash: 'cuentas-por-pagar',
      category: 'plantillas'
    },
    'utilidades': {
      title: 'Plantilla de Cálculo de Utilidades LOTTT | Gehydis Consulting',
      hash: 'calculo-utilidades',
      category: 'plantillas'
    },
    'liquidacion': {
      title: 'Plantilla de Cálculo de Liquidación y Prestaciones | Gehydis Consulting',
      hash: 'calculo-liquidacion',
      category: 'plantillas'
    },
    'fondo-pensiones': {
      title: 'Plantilla Contribución Fondo de Pensiones (DPP) | Gehydis Consulting',
      hash: 'fondo-pensiones',
      category: 'plantillas'
    },
    'vacaciones': {
      title: 'Plantilla de Vacaciones y Bono Vacacional | Gehydis Consulting',
      hash: 'calculo-vacaciones',
      category: 'plantillas'
    },
    'masterclass-ingreso': {
      title: 'Masterclass: Ingreso Mínimo Integral | Gehydis Consulting',
      hash: 'masterclass-ingreso',
      category: 'capacitacion'
    },
    'masterclass-parafiscales': {
      title: 'Masterclass: Parafiscales en Venezuela | Gehydis Consulting',
      hash: 'masterclass-parafiscales',
      category: 'capacitacion'
    },
    'asesoria-whatsapp': {
      title: 'Asesoría Directa por WhatsApp | Gehydis Consulting',
      hash: 'asesoria-whatsapp',
      category: 'all'
    }
  };

  /* ==========================================================================
     Filtro del Catálogo por Categorías con Actualización Dinámica
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const catalogGrid = document.querySelector('.catalog-grid');
  const activeFilterIndicator = document.getElementById('activeFilterIndicator');
  const activeFilterText = document.getElementById('activeFilterText');
  const btnClearFilter = document.getElementById('btnClearFilter');

  if (btnClearFilter) {
    btnClearFilter.addEventListener('click', () => {
      applyFilter('all', true);
    });
  }

  const applyFilter = (filterValue, updateHistory = true) => {
    const meta = categoryMetadata[filterValue] || categoryMetadata['all'];

    // Manejar estado activo de los botones de filtro
    filterButtons.forEach(btn => {
      const match = btn.getAttribute('data-filter') === filterValue;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    // Actualizar indicador de categoría activa en móvil y escritorio
    if (activeFilterIndicator && activeFilterText) {
      if (filterValue === 'all') {
        activeFilterIndicator.style.display = 'none';
      } else {
        activeFilterIndicator.style.display = 'flex';
        let count = 0;
        productCards.forEach(c => {
          if (c.getAttribute('data-category') === filterValue) count++;
        });
        activeFilterText.textContent = `Mostrando ${count} solución${count > 1 ? 'es' : ''} de ${meta.badge}`;
      }
    }

    // Actualizar encabezado dinámico de la sección catálogo en la página
    const catalogBadge = document.getElementById('catalogBadge');
    const catalogTitle = document.getElementById('catalogTitle');
    const catalogSubtitle = document.getElementById('catalogSubtitle');

    if (catalogBadge) catalogBadge.textContent = meta.badge;
    if (catalogTitle) catalogTitle.textContent = meta.heading;
    if (catalogSubtitle) catalogSubtitle.textContent = meta.subtitle;

    // Actualizar cuadrícula
    if (catalogGrid) {
      catalogGrid.setAttribute('data-active-filter', filterValue);
    }

    // Filtrar tarjetas garantizando colapso total de espacio sin huecos en blanco
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const isVisible = (filterValue === 'all' || cardCategory === filterValue);
      if (isVisible) {
        card.classList.remove('is-hidden');
        card.style.removeProperty('display');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('is-hidden');
        card.style.setProperty('display', 'none', 'important');
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
      }
    });

    // Actualizar el nombre de la landing arriba en la pestaña del navegador
    document.title = meta.title;

    // Actualizar URL hash para medición y analítica
    if (updateHistory) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, meta.title, '#' + meta.hash);
      }
      
      // Registrar evento de analítica (compatible con Google Analytics 4, GTM y Meta Pixel)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'category_view',
        category_name: meta.badge,
        category_hash: meta.hash,
        page_title: meta.title
      });
      if (typeof gtag === 'function') {
        gtag('event', 'view_item_list', { item_list_id: meta.hash, item_list_name: meta.badge });
      }

      window.dispatchEvent(new CustomEvent('catalog_filter_change', {
        detail: { filter: filterValue, title: meta.title, hash: meta.hash }
      }));
    }
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');
      applyFilter(filterValue, true);
    });
  });

  /* ==========================================================================
     Dropdown de Soluciones en la Barra de Navegación
     ========================================================================== */
  const navSolutionsDropdown = document.getElementById('navSolutionsDropdown');
  const navSolutionsBtn = document.getElementById('navSolutionsBtn');

  if (navSolutionsDropdown && navSolutionsBtn) {
    // Abrir / cerrar con clic en el botón
    navSolutionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navSolutionsDropdown.classList.toggle('open');
      navSolutionsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar al hacer clic fuera del dropdown
    document.addEventListener('click', (e) => {
      if (!navSolutionsDropdown.contains(e.target)) {
        navSolutionsDropdown.classList.remove('open');
        navSolutionsBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navSolutionsDropdown.classList.contains('open')) {
        navSolutionsDropdown.classList.remove('open');
        navSolutionsBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Manejar enlaces con data-nav-filter (tanto Catálogo principal como ítems del dropdown)
  const navFilterLinks = document.querySelectorAll('[data-nav-filter]');
  navFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterTarget = link.getAttribute('data-nav-filter');

      // Cerrar dropdown si está abierto
      if (navSolutionsDropdown) {
        navSolutionsDropdown.classList.remove('open');
        if (navSolutionsBtn) navSolutionsBtn.setAttribute('aria-expanded', 'false');
      }

      // Cerrar menú móvil si está abierto
      if (mainNav) mainNav.classList.remove('open');
      if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('menu-open');

      // Aplicar filtro correspondiente de inmediato
      applyFilter(filterTarget, true);

      // Desplazamiento suave con cálculo dinámico exacto de altura del encabezado sticky
      setTimeout(() => {
        const headerElem = document.getElementById('header');
        const headerHeight = headerElem ? headerElem.offsetHeight : 76;
        let targetElement = document.getElementById('catalogo');
        
        if (filterTarget !== 'all') {
          const filterBar = document.querySelector('.catalog-filter-bar');
          targetElement = filterBar || targetElement;
        }

        if (targetElement) {
          const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }, 50);

      // Actualizar estado activo en la barra de navegación
      const allTopNavLinks = document.querySelectorAll('.header .nav-link');
      allTopNavLinks.forEach(l => l.classList.remove('active'));

      if (filterTarget === 'all') {
        const catalogNavLink = document.querySelector('.header .nav-link[data-nav-filter="all"]');
        if (catalogNavLink) catalogNavLink.classList.add('active');
      } else {
        if (navSolutionsBtn) navSolutionsBtn.classList.add('active');
      }
    });
  });

  // Botón del Hero "Explorar Catálogo de Soluciones"
  const heroExploreBtn = document.getElementById('heroExploreBtn');
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter('all', true);
      const catalogSection = document.getElementById('catalogo');
      if (catalogSection) {
        const headerElem = document.getElementById('header');
        const headerHeight = headerElem ? headerElem.offsetHeight : 76;
        const targetPos = catalogSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  }

  /* ==========================================================================
     Navegación Directa al Formulario de Contacto (Campo Nombre)
     ========================================================================== */
  const scrollToContactNameField = (smooth = true) => {
    const nameField = document.getElementById('contactFirstName');
    const formCard = document.getElementById('formCard') || document.querySelector('.form-card');
    const target = nameField || formCard;
    if (target) {
      const headerElem = document.getElementById('header');
      const headerHeight = headerElem ? headerElem.offsetHeight : 76;
      
      // En móvil y escritorio, alinear directamente con el formulario y el campo nombre
      const rect = formCard ? formCard.getBoundingClientRect() : target.getBoundingClientRect();
      const targetPos = rect.top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: smooth ? 'smooth' : 'auto'
      });

      if (nameField) {
        setTimeout(() => {
          try {
            nameField.focus({ preventScroll: true });
          } catch (err) {
            nameField.focus();
          }
        }, smooth ? 450 : 80);
      }
    }
  };

  // Interceptar todos los enlaces y botones que llevan al lead al formulario
  const contactLeadSelectors = [
    'a[href="#contacto"]',
    'a[href="#formulario-contacto"]',
    '.btn-scroll-contact',
    '.btn-nav-form',
    '.nav-mobile-cta',
    '.footer-wa-link'
  ];

  document.querySelectorAll(contactLeadSelectors.join(',')).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Cerrar menú móvil si está abierto
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        if (menuToggle) {
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('menu-open');
      }

      // Si el botón tiene un data-product, preseleccionarlo en el formulario
      const prodAttr = btn.getAttribute('data-product');
      if (prodAttr && contactProductSelect) {
        contactProductSelect.value = prodAttr;
      }

      // Actualizar hash en URL sin salto brusco
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, document.title, '#contacto');
      }

      scrollToContactNameField(true);
    });
  });

  // Si la página carga directamente con hash #contacto o #formulario-contacto
  if (window.location.hash === '#contacto' || window.location.hash === '#formulario-contacto') {
    setTimeout(() => {
      scrollToContactNameField(false);
    }, 150);
  }

  /* ==========================================================================
     Acordeón Desplegable de Detalles en Tarjetas de Catálogo
     ========================================================================== */
  const toggleButtons = document.querySelectorAll('.btn-toggle-details');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const collapsibleContent = btn.nextElementSibling;
      const labelSpan = btn.querySelector('span');

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (collapsibleContent) collapsibleContent.classList.remove('expanded');
        if (labelSpan) labelSpan.textContent = 'Ver información y alcance';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (collapsibleContent) collapsibleContent.classList.add('expanded');
        if (labelSpan) labelSpan.textContent = 'Ocultar detalles técnicos';
      }
    });
  });

  /* ==========================================================================
     Selector de Tiers en la Suite NóminaOrbe
     ========================================================================== */
  const tierItems = document.querySelectorAll('.pricing-tiers-grid .tier-item');
  const suiteModalBtn = document.querySelector('.btn-open-product-modal[data-product-id="suite-nomina"]');
  tierItems.forEach(item => {
    item.addEventListener('click', () => {
      tierItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      const w = item.querySelector('.tier-workers')?.textContent.trim() || '';
      const p = item.querySelector('.tier-price')?.textContent.replace('/ año', '').trim() || '';
      if (suiteModalBtn && p) {
        suiteModalBtn.setAttribute('data-product-price', `${p} / año`);
      }
      const planSelect = document.getElementById('modalPlanSelect');
      if (planSelect) {
        if (w.includes('10')) planSelect.value = 'Hasta 10 trabajadores';
        else if (w.includes('20')) planSelect.value = 'Hasta 20 trabajadores';
        else if (w.includes('50')) planSelect.value = 'Hasta 50 trabajadores';
        else if (w.includes('100')) planSelect.value = 'Hasta 100 trabajadores';
      }
    });
  });

  /* ==========================================================================
     Acordeón de Preguntas Frecuentes (FAQ)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros acordeones
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Alternar el actual
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     Modal / Lightbox para Capturas Reales de Pantalla
     ========================================================================== */
  const modal = document.getElementById('screenshotModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalMainImg = document.getElementById('modalMainImg');
  const modalThumbs = document.getElementById('modalThumbs');
  const modalInfo = document.getElementById('modalInfo');
  const modalWaBtn = document.getElementById('modalWaBtn');
  const modalWaText = document.getElementById('modalWaText');

  // Base de datos de capturas e información para demostración en modal
  const galleryData = {
    'modal-suite': {
      title: 'Suite NóminaOrbe en Excel (Semanal o Quincenal)',
      subtitle: 'Módulo de Nómina Empresarial, Cestaticket y Beneficios',
      waMessage: 'Hola Lcda. Gehydis, vi las capturas de la Suite NóminaOrbe y deseo cotizarla para mi empresa.',
      info: 'El sistema consolida la carga de trabajadores, cálculo de asignaciones, horas extras diurnas y horas extras nocturnas, deducciones de ley (IVSS, FAOV, RPE e ISLR), conversión de sueldo en divisas a Bolívares de acuerdo a la Tasa Oficial BCV, generación de TXT para declaración del FAOV (BANAVIH), generación de TXT para pagos bancarios y emisión de 3 recibos formales en PDF.',
      images: [
        {
          src: 'assets/img/sistemas/SUITE_NOMINAORBE_-_5_Resumen_de_Nomina_png.png',
          alt: 'Resumen consolidado de nómina con neto a pagar y deducciones'
        },
        {
          src: 'assets/img/sistemas/SUITE_NOMINAORBE_-_2_Carga_de_trabajadores_png.png',
          alt: 'Carga de colaboradores y configuración contractual'
        },
        {
          src: 'assets/img/sistemas/SUITE_NOMINAORBE_-_5_Recibos_de_pago-original_y_copia_en_la_misma_hoja_png.png',
          alt: 'Emisión de recibo formal de nómina con original y copia'
        },
        {
          src: 'assets/img/sistemas/SUITE_NOMINAORBE_-_6_Calculo_de_Cestaticket_y_su_historico_png.png',
          alt: 'Cálculo de Cestaticket Socialista con histórico de decretos'
        },
        {
          src: 'assets/img/sistemas/SUITE_NOMINAORBE_-_7_Recibos_de_pago-EMISION_EN_LOTE_png.png',
          alt: 'Emisión masiva de recibos de pago en lote para toda la empresa'
        }
      ]
    },
    'modal-docentes': {
      title: 'Suite Nómina por Horas para Colegios e Institutos',
      subtitle: 'Módulo Académico de Docentes y Profesores por Cátedra',
      waMessage: 'Hola Lcda. Gehydis, vi las capturas de la Nómina Docente por Horas y solicito información para mi colegio.',
      info: 'Permite configurar la carga horaria semanal o quincenal de cada profesor, categorías docentes, detalle acumulado por cátedra, cálculo de bono de alimentación, generación de TXT para el FAOV y emisión masiva de recibos para archivo institucional.',
      images: [
        {
          src: 'assets/img/sistemas/NOMINA_POR_HORAS_-_Detalle_acumulado_por_profesor_png.png',
          alt: 'Detalle acumulado de horas y asignaciones por profesor'
        },
        {
          src: 'assets/img/sistemas/NOMINA_POR_HORAS_-_Nomina_TXT_para_declarar_el_FAOV_png.png',
          alt: 'Módulo de generación de archivo TXT estructurado para BANAVIH'
        },
        {
          src: 'assets/img/sistemas/NOMINA_POR_HORAS_-_Recibos_de_pago_nomina_01_png.png',
          alt: 'Recibo individual de nómina para docente'
        },
        {
          src: 'assets/img/sistemas/NOMINA_POR_HORAS_-_Recibos_de_pago_nomina_por_lote_png.png',
          alt: 'Emisión de recibos de docentes por lote'
        }
      ]
    },
    'modal-cxc': {
      title: 'Sistema de Cuentas por Cobrar para Colegios (CxC)',
      subtitle: 'Control Administrativo y Tableros Directivos Escolares',
      waMessage: 'Hola Lcda. Gehydis, deseo información y demostración del Sistema de Cuentas por Cobrar para colegios ($197).',
      info: 'Supervise el registro de pagos de mensualidades, transferencias, Pago Móvil y efectivo en divisas. Genere estados de cuenta por estudiante y visualice tableros de dirección con ingresos bancarios, saldos pendientes por grado y mayores deudores.',
      images: [
        {
          src: 'assets/img/sistemas/SISTEMA_CxC_-_TABLERO_DE_DIRECCION_png.png',
          alt: 'Tablero directivo general de cobranza escolar'
        },
        {
          src: 'assets/img/sistemas/SISTEMA_CxC_-_ESTADO_DE_CUENTA_DETALLADO_png.png',
          alt: 'Estado de cuenta detallado por estudiante y representante'
        },
        {
          src: 'assets/img/sistemas/SISTEMA_CxC_-_REGISTRAR_COBRO_png.png',
          alt: 'Módulo de registro ágil de cobros multidivisa'
        },
        {
          src: 'assets/img/sistemas/SISTEMA_CxC_-_TABLERO_DE_DIRECCION-Saldo_por_grados_png.png',
          alt: 'Monitoreo de saldos pendientes y morosidad clasificada por grados'
        },
        {
          src: 'assets/img/sistemas/SISTEMA_CxC_-_TABLERO_DE_DIRECCION-Ingresos_por_banco_formas_de_pago_mayores_deudores_png.png',
          alt: 'Resumen financiero de ingresos por banco y mayores deudores'
        }
      ]
    }
  };

  // Abrir modal al hacer clic en los botones de previsualización
  const previewButtons = document.querySelectorAll('.btn-preview-modal');
  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      const data = galleryData[modalKey];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalInfo.textContent = data.info;

      // Configurar acción del modal
      if (modalWaBtn) {
        modalWaBtn.setAttribute('href', `https://wa.me/${GEHYDIS_WHATSAPP}?text=${encodeURIComponent(data.waMessage)}`);
      }
      if (modalWaText) {
        modalWaText.textContent = `Solicitar Cotización Formal`;
      }

      // Cargar primera imagen con decodificación asíncrona
      if (data.images.length > 0) {
        modalMainImg.src = data.images[0].src;
        modalMainImg.alt = data.images[0].alt;
        modalMainImg.loading = 'eager';
        modalMainImg.decoding = 'async';
      }

      // Generar miniaturas optimizadas para móvil
      modalThumbs.innerHTML = '';
      data.images.forEach((img, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `modal-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.setAttribute('title', img.alt);
        thumb.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="eager" decoding="async">`;
        thumb.addEventListener('click', () => {
          modalMainImg.src = img.src;
          modalMainImg.alt = img.alt;
          modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
        modalThumbs.appendChild(thumb);
      });

      // Mostrar modal
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Cerrar modal al hacer clic fuera del contenido
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     Desplazamiento Suave y Marcador de Enlaces Activos
     ========================================================================== */
  const sections = document.querySelectorAll('main section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.header .nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  /* ==========================================================================
     Gestión de Formularios y Modal por Producto (con Nombre y Apellido Separados)
     ========================================================================== */
  const modalProductForm = document.getElementById('modalProductForm');
  const modalProductClose = document.getElementById('modalProductClose');
  const modalProductCategory = document.getElementById('modalProductCategory');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalProductBarName = document.getElementById('modalProductBarName');
  const modalProductBarPrice = document.getElementById('modalProductBarPrice');
  const modalHiddenProduct = document.getElementById('modalHiddenProduct');
  const productSpecificForm = document.getElementById('productSpecificForm');
  const modalProductFeedback = document.getElementById('modalProductFeedback');

  const mainContactForm = document.getElementById('mainContactForm');
  const formFeedback = document.getElementById('formFeedback');
  const contactProductSelect = document.getElementById('contactProduct');

  let currentModalProductPrice = '';
  let currentModalProductId = '';

  // Abrir Modal de Producto
  const openProductModal = (id, name, category, price) => {
    if (!modalProductForm) return;

    currentModalProductPrice = price || '';
    currentModalProductId = id || '';

    const isWaDirect = (id === 'asesoria-whatsapp');

    if (modalProductCategory) {
      modalProductCategory.textContent = isWaDirect ? 'Atención Inmediata' : (category || 'Solución Profesional');
    }
    if (modalProductTitle) {
      modalProductTitle.textContent = isWaDirect ? 'Asesoría Directa por WhatsApp' : ('Solicitar: ' + (name || 'Sistema'));
    }
    if (modalProductBarName) {
      modalProductBarName.textContent = isWaDirect ? 'Consulta con la Lcda. Gehydis Echenique' : (name || 'Sistema Seleccionado');
    }
    if (modalProductBarPrice) {
      modalProductBarPrice.textContent = isWaDirect ? 'Respuesta Rápida y Personalizada' : (price || 'Consulte Cotización');
    }
    if (modalHiddenProduct) modalHiddenProduct.value = id || '';

    const submitText = document.getElementById('modalProductSubmitText');
    if (submitText) {
      submitText.textContent = isWaDirect ? 'Continuar a WhatsApp Oficial' : 'Confirmar y Enviar a WhatsApp';
    }

    // Pre-seleccionar también en el formulario principal si existe la opción
    if (contactProductSelect && id) {
      contactProductSelect.value = id;
    }

    // Configurar método de pago: Ocultar para botón flotante de WhatsApp, mostrar SOLO en formularios del catálogo
    const emailPaymentRow = document.getElementById('modalEmailPaymentRow');
    const paymentGroup = document.getElementById('modalPaymentGroup');
    const paymentMethodSelect = document.getElementById('modalPaymentMethod');
    if (emailPaymentRow && paymentGroup && paymentMethodSelect) {
      if (isWaDirect) {
        paymentGroup.style.display = 'none';
        paymentMethodSelect.required = false;
        paymentMethodSelect.value = '';
        emailPaymentRow.classList.add('single-col');
      } else {
        paymentGroup.style.display = 'flex';
        paymentMethodSelect.required = true;
        emailPaymentRow.classList.remove('single-col');
      }
    }

    // Configurar selector de escala / plan para Suite NóminaOrbe
    const planRow = document.getElementById('modalPlanRow');
    const planSelect = document.getElementById('modalPlanSelect');
    if (planRow && planSelect) {
      if (id === 'suite-nomina') {
        planRow.style.display = 'flex';
        // Sincronizar con el tier activo de la tarjeta si existe
        const activeTier = document.querySelector('.pricing-tiers-grid .tier-item.active');
        if (activeTier) {
          const w = activeTier.querySelector('.tier-workers')?.textContent.trim() || '';
          if (w.includes('10')) planSelect.value = 'Hasta 10 trabajadores';
          else if (w.includes('20')) planSelect.value = 'Hasta 20 trabajadores';
          else if (w.includes('50')) planSelect.value = 'Hasta 50 trabajadores';
          else if (w.includes('100')) planSelect.value = 'Hasta 100 trabajadores';
        }
        const selectedOpt = planSelect.options[planSelect.selectedIndex];
        if (selectedOpt && modalProductBarPrice) {
          modalProductBarPrice.textContent = selectedOpt.getAttribute('data-price') || '$65 / año';
        }
      } else {
        planRow.style.display = 'none';
      }
    }

    // Configurar visibilidad y valor por defecto de la frecuencia de pago
    const freqRow = document.getElementById('modalFrequencyRow');
    const freqSelect = document.getElementById('modalFrequency');
    if (freqRow && freqSelect) {
      if (isWaDirect) {
        freqRow.style.display = 'none';
      } else if (id === 'suite-nomina' || id === 'colegios-docentes' || id === 'combo-colegios') {
        freqRow.style.display = 'flex';
        freqSelect.value = 'Quincenal';
      } else {
        freqRow.style.display = 'none';
        freqSelect.value = 'Pago Único';
      }
    }

    if (modalProductFeedback) {
      modalProductFeedback.style.display = 'none';
      modalProductFeedback.textContent = '';
      modalProductFeedback.className = 'form-feedback';
    }

    // Actualizar nombre de la landing arriba en el navegador y URL para medición
    const prodMeta = productMetadata[id];
    const newTitle = prodMeta ? prodMeta.title : `${name} | Gehydis Consulting`;
    const newHash = prodMeta ? prodMeta.hash : (id || 'producto');

    document.title = newTitle;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, newTitle, '#' + newHash);
    }

    // Registrar evento de producto en analítica
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'view_item',
      item_id: id,
      item_name: name,
      item_category: category,
      price: price,
      page_title: newTitle
    });
    if (typeof gtag === 'function') {
      gtag('event', 'view_item', {
        currency: 'USD',
        value: parseFloat((String(price || '').match(/\d+(?:\.\d+)?/) || [])[0]) || 0,
        items: [{ item_id: id, item_name: name, item_category: category }]
      });
    }

    window.dispatchEvent(new CustomEvent('product_selected', {
      detail: { id, name, category, price, title: newTitle, hash: newHash }
    }));

    modalProductForm.classList.add('open');
    modalProductForm.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    const firstInput = document.getElementById('modalFirstName');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  // Cerrar Modal de Producto
  const closeProductModal = () => {
    if (!modalProductForm) return;
    modalProductForm.classList.remove('open');
    modalProductForm.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';

    // Restaurar título según el filtro activo
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const meta = categoryMetadata[activeFilter] || categoryMetadata['all'];
    document.title = meta.title;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, meta.title, '#' + meta.hash);
    }
  };

  if (modalProductClose) {
    modalProductClose.addEventListener('click', closeProductModal);
  }

  if (modalProductForm) {
    modalProductForm.addEventListener('click', (e) => {
      if (e.target === modalProductForm) {
        closeProductModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalProductForm && modalProductForm.style.display === 'flex') {
      closeProductModal();
    }
  });

  // Event listener en botones de solicitud por producto
  const productModalButtons = document.querySelectorAll('.btn-open-product-modal');
  productModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-product-id');
      const name = btn.getAttribute('data-product-name');
      const category = btn.getAttribute('data-product-category');
      const price = btn.getAttribute('data-product-price');
      openProductModal(id, name, category, price);
    });
  });

  // Event listener para actualizar el precio dinámicamente al cambiar de plan en el modal
  const modalPlanSelect = document.getElementById('modalPlanSelect');
  if (modalPlanSelect) {
    modalPlanSelect.addEventListener('change', () => {
      const selectedOpt = modalPlanSelect.options[modalPlanSelect.selectedIndex];
      if (selectedOpt) {
        const p = selectedOpt.getAttribute('data-price');
        const barPrice = document.getElementById('modalProductBarPrice');
        if (barPrice && p) {
          barPrice.textContent = p;
        }
      }
    });
  }

  // Botón dentro del visor de capturas (Lightbox)
  const modalLightboxFormBtn = document.getElementById('modalLightboxFormBtn');
  if (modalLightboxFormBtn) {
    modalLightboxFormBtn.addEventListener('click', () => {
      // Cerrar visor de imágenes
      const lightboxModal = document.getElementById('screenshotModal');
      if (lightboxModal) {
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
      }

      // Detectar producto activo según título
      const titleElem = document.getElementById('modalTitle');
      const currentTitle = titleElem ? titleElem.textContent : '';

      let pId = 'suite-nomina';
      let pName = 'Suite NóminaOrbe';
      let pCat = 'Nómina Empresarial';
      let pPrice = 'Desde $45 / año';

      if (currentTitle.includes('Docente') || currentTitle.includes('Horas')) {
        pId = 'colegios-docentes';
        pName = 'Suite Nómina por Horas (Docentes)';
        pCat = 'Sector Educativo';
        pPrice = '$97 Licencia Anual';
      } else if (currentTitle.includes('Cobrar') || currentTitle.includes('CxC')) {
        pId = 'colegios-cxc';
        pName = 'Sistema de Cuentas por Cobrar (Colegios)';
        pCat = 'Sector Educativo';
        pPrice = '$197 Licencia Completa';
      }

      openProductModal(pId, pName, pCat, pPrice);
    });
  }

  // Enviar Formulario Específico de Producto
  if (productSpecificForm) {
    productSpecificForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = (document.getElementById('modalFirstName')?.value || '').trim();
      const lastName = (document.getElementById('modalLastName')?.value || '').trim();
      const company = (document.getElementById('modalCompany')?.value || '').trim();
      const phone = (document.getElementById('modalPhone')?.value || '').trim();
      const email = (document.getElementById('modalEmail')?.value || '').trim();
      const paymentMethod = (document.getElementById('modalPaymentMethod')?.value || '').trim();
      const message = (document.getElementById('modalMessage')?.value || '').trim();
      const productName = modalProductBarName ? modalProductBarName.textContent : 'el sistema solicitado';
      const productId = modalHiddenProduct ? modalHiddenProduct.value : '';

      const isPaymentRequired = document.getElementById('modalPaymentGroup')?.style.display !== 'none';
      if (!firstName || !lastName || !company || !phone || !email || (isPaymentRequired && !paymentMethod)) {
        if (modalProductFeedback) {
          modalProductFeedback.className = 'form-feedback error';
          modalProductFeedback.textContent = isPaymentRequired 
            ? 'Por favor complete todos los campos obligatorios (*) y seleccione el método de pago.' 
            : 'Por favor complete los campos obligatorios (*) para continuar.';
          modalProductFeedback.style.display = 'block';
        }
        return;
      }

      const fullName = `${firstName} ${lastName}`;

      // Mostrar estado de carga inmediato en el botón
      const submitBtn = productSpecificForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Registrando solicitud...';
      }

      // Solo se registra lo que el cliente eligió o vio en el formulario: nada de valores inventados.
      // Capacidad y frecuencia salen de los selectores visibles; el precio es el del producto que pidió.
      const isVisible = (el) => !!el && el.offsetParent !== null;
      const planSelect = document.getElementById('modalPlanSelect');
      const frequencyInput = document.getElementById('modalFrequency');

      let leadCapacity = '';
      let leadFrequency = isVisible(frequencyInput) ? frequencyInput.value : '';
      let leadPrice = productId === 'asesoria-whatsapp' ? '' : (currentModalProductPrice || '');

      if (productId === 'suite-nomina' && isVisible(planSelect)) {
        const selectedOpt = planSelect.options[planSelect.selectedIndex];
        leadCapacity = selectedOpt.getAttribute('data-capacity') || selectedOpt.value;
        leadPrice = selectedOpt.getAttribute('data-price') || leadPrice;
      } else if (productId === 'combo-colegios') {
        leadPrice = '$247 Combo Docente + CxC (Ahorro $47)';
      }

      // Guardar información del lead para la página de agradecimiento
      sessionStorage.setItem('lead_name', fullName);
      sessionStorage.setItem('lead_company', company);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_product', productName);
      sessionStorage.setItem('lead_message', message);
      sessionStorage.setItem('lead_source', 'product_modal');
      sessionStorage.setItem('lead_product_id', productId);
      sessionStorage.setItem('lead_capacity', leadCapacity);
      sessionStorage.setItem('lead_frequency', leadFrequency);
      sessionStorage.setItem('lead_price', leadPrice);
      
      if (isPaymentRequired && paymentMethod) {
        sessionStorage.setItem('lead_payment_method', paymentMethod);
      } else {
        sessionStorage.removeItem('lead_payment_method');
      }

      // Enviar datos al Webhook n8n (adjuntando automáticamente todos los UTMs)
      if (window.UtmTracker) {
        try {
          await window.UtmTracker.sendLeadToWebhook({
            firstName,
            lastName,
            fullName,
            company,
            phone,
            email,
            product: productName,
            productId: productId,
            staff: leadCapacity,
            frequency: leadFrequency,
            price: leadPrice,
            paymentMethod: paymentMethod,
            message,
            formType: 'product_modal'
          });
        } catch (webhookErr) {
          console.warn('[Lead] Error en webhook, continuando:', webhookErr);
        }
      }

      // Evento de lead para analítica y Meta Pixel
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        product_name: productName,
        lead_type: 'product_modal'
      });

      // El evento Lead de Meta se dispara una sola vez en gracias.html (con event_id compartido con la API de Conversiones)

      // Redirigir a gracias.html
      window.location.href = 'gracias.html';
    });
  }

  // Enviar Formulario Principal de la Página
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = (document.getElementById('contactFirstName')?.value || '').trim();
      const lastName = (document.getElementById('contactLastName')?.value || '').trim();
      const company = (document.getElementById('contactCompany')?.value || '').trim();
      const phone = (document.getElementById('contactPhone')?.value || '').trim();
      const email = (document.getElementById('contactEmail')?.value || '').trim();
      const message = (document.getElementById('contactMessage')?.value || '').trim();
      const productSelect = document.getElementById('contactProduct');
      const productText = productSelect && productSelect.selectedIndex >= 0 ? productSelect.options[productSelect.selectedIndex].text : 'solución seleccionada';
      const productId = productSelect ? productSelect.value : '';
      const staffSelect = document.getElementById('contactStaff');
      // Capacidad solo si el cliente la eligió (el selector es opcional)
      const staffText = staffSelect && staffSelect.value ? staffSelect.options[staffSelect.selectedIndex].text : '';

      if (!firstName || !lastName || !company || !phone || !email || !productSelect?.value) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Por favor complete los campos obligatorios (*) y seleccione la solución de su interés.';
          formFeedback.style.display = 'block';
        }
        return;
      }

      const fullName = `${firstName} ${lastName}`;

      // Mostrar estado de carga inmediato en el botón
      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Registrando requerimiento...';
      }

      // Solo lo que el cliente indicó: este formulario no pregunta frecuencia, y la capacidad es opcional.
      // El precio es el del producto elegido (en la Suite depende de la capacidad que marcó).
      const leadCapacity = staffText;
      const leadFrequency = '';
      let leadPrice = '';

      if (productId === 'suite-nomina') {
        if (staffSelect.value === '1-10') leadPrice = '$45 / año';
        else if (staffSelect.value === '11-20') leadPrice = '$65 / año';
        else if (staffSelect.value === '21-50') leadPrice = '$89 / año';
        else if (staffSelect.value === '51-100') leadPrice = '$127 / año';
        else if (staffSelect.value === 'mas-100') leadPrice = 'A medida bajo cotización';
        else leadPrice = 'Desde $45 / año';
      } else if (productId === 'colegios-docentes') {
        leadPrice = '$97 Licencia Anual';
      } else if (productId === 'colegios-cxc') {
        leadPrice = '$197 Licencia Completa';
      } else if (productId === 'combo-colegios') {
        leadPrice = '$247 Combo Docente + CxC (Ahorro $47)';
      } else if (productId === 'cuentas-por-pagar') {
        leadPrice = '$27 Pago Único';
      } else if (productId === 'utilidades') {
        leadPrice = '$17 Actualizada';
      } else if (productId === 'liquidacion') {
        leadPrice = '$17 Herramienta Excel';
      } else if (productId === 'fondo-pensiones') {
        leadPrice = '$12 Plantilla Formulada';
      } else if (productId === 'vacaciones') {
        leadPrice = '$12 Formato Excel';
      } else if (productId.includes('masterclass')) {
        leadPrice = '$17 Acceso + Material';
      }

      // Guardar información del lead para la página de agradecimiento
      sessionStorage.setItem('lead_name', fullName);
      sessionStorage.setItem('lead_company', company);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_product', productText);
      sessionStorage.setItem('lead_message', message);
      sessionStorage.setItem('lead_source', 'main_contact_form');
      sessionStorage.setItem('lead_product_id', productId);
      sessionStorage.setItem('lead_capacity', leadCapacity);
      sessionStorage.setItem('lead_frequency', leadFrequency);
      sessionStorage.setItem('lead_price', leadPrice);
      sessionStorage.removeItem('lead_payment_method');

      // Enviar datos al Webhook n8n (adjuntando automáticamente todos los UTMs)
      if (window.UtmTracker) {
        try {
          await window.UtmTracker.sendLeadToWebhook({
            firstName,
            lastName,
            fullName,
            company,
            phone,
            email,
            product: productText,
            productId: productId,
            staff: leadCapacity,
            frequency: leadFrequency,
            price: leadPrice,
            message,
            formType: 'main_contact_form'
          });
        } catch (webhookErr) {
          console.warn('[Lead] Error en webhook, continuando:', webhookErr);
        }
      }

      // Evento de lead para analítica y Meta Pixel
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        product_name: productText,
        lead_type: 'main_contact_form'
      });

      // El evento Lead de Meta se dispara una sola vez en gracias.html (con event_id compartido con la API de Conversiones)

      // Redirigir a gracias.html
      window.location.href = 'gracias.html';
    });
  }

  // Botón Flotante de WhatsApp: Abre el formulario modal en lugar de saltar a WhatsApp directo
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  if (floatingWaBtn) {
    floatingWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openProductModal('asesoria-whatsapp', 'Asesoría Directa por WhatsApp', 'Atención Inmediata', 'Consulta Personalizada');
    });
  }

  /* ==========================================================================
     Sincronización Inicial según URL Hash (Deep Linking para Medición)
     ========================================================================== */
  const handleInitialHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (!hash) return;

    if (hash === 'sector-educativo' || hash === 'colegios') {
      applyFilter('colegios', false);
    } else if (hash === 'suite-nomina' || hash === 'nomina-empresarial' || hash === 'nomina') {
      applyFilter('nomina', false);
    } else if (hash === 'plantillas-laborales' || hash === 'plantillas') {
      applyFilter('plantillas', false);
    } else if (hash === 'masterclasses' || hash === 'formacion-masterclasses' || hash === 'capacitacion') {
      applyFilter('capacitacion', false);
    } else {
      // Verificar si coincide con algún producto
      for (const [prodId, pMeta] of Object.entries(productMetadata)) {
        if (pMeta.hash === hash || prodId === hash) {
          applyFilter(pMeta.category, false);
          document.title = pMeta.title;
          break;
        }
      }
    }
  };

  handleInitialHash();

  // Manejo de error y reintento automático para imágenes en caso de fallo temporal de red móvil
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' && !e.target.dataset.retried) {
      e.target.dataset.retried = '1';
      const originalSrc = e.target.getAttribute('src');
      if (originalSrc && !originalSrc.startsWith('data:') && !originalSrc.startsWith('blob:')) {
        const cleanUrl = originalSrc.split('?')[0];
        e.target.src = cleanUrl + '?retry=' + Date.now();
      }
    }
  }, true);

  console.log('Gehydis Consulting catalog loaded successfully.');
});
