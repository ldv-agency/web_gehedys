/**
 * Gehydis Consulting - Lógica Interactiva y Dinámica
 * Gestión de Catálogo con Cambio Dinámico de Título y Hash (Medición de Resultados)
 * Cero Emojis - Estilo Ejecutivo y Conforme a Normativa Venezolana
 */

document.addEventListener('DOMContentLoaded', () => {
  const GEHYDIS_WHATSAPP = '584120000000';

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
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al hacer clic en un enlace de navegación regular
    const regularNavLinks = mainNav.querySelectorAll('.nav-link:not([data-nav-filter])');
    regularNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
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

  const applyFilter = (filterValue, updateHistory = true) => {
    const meta = categoryMetadata[filterValue] || categoryMetadata['all'];

    // Manejar estado activo de los botones de filtro
    filterButtons.forEach(btn => {
      const match = btn.getAttribute('data-filter') === filterValue;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

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

    // Filtrar tarjetas
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = card.classList.contains('featured-product') ? 'grid' : 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 150);
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

  // Manejar enlaces del menú con data-nav-filter (Suite NóminaOrbe, Sector Educativo, Catálogo)
  const navFilterLinks = document.querySelectorAll('.nav-link[data-nav-filter]');
  navFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterTarget = link.getAttribute('data-nav-filter');

      // Desplazamiento suave al catálogo
      const catalogSection = document.getElementById('catalogo');
      if (catalogSection) {
        const topOffset = catalogSection.offsetTop - 70;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }

      // Aplicar filtro correspondiente
      applyFilter(filterTarget, true);

      // Cerrar menú móvil si está abierto
      if (mainNav) mainNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

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
  tierItems.forEach(item => {
    item.addEventListener('click', () => {
      tierItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
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
      info: 'El sistema consolida la carga de trabajadores, cálculo automático de deducciones de ley (IVSS, FAOV, INCES, RPE e ISLR), conversión a tasa oficial BCV, generación de archivo plano TXT para BANAVIH y emisión de 3 recibos formales en PDF.',
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
      waMessage: 'Hola Lcda. Gehydis, deseo información y demostración del Sistema de Cuentas por Cobrar para colegios ($260).',
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
        modalWaText.textContent = `Solicitar Formulario de ${data.title}`;
      }

      // Cargar primera imagen
      if (data.images.length > 0) {
        modalMainImg.src = data.images[0].src;
        modalMainImg.alt = data.images[0].alt;
      }

      // Generar miniaturas
      modalThumbs.innerHTML = '';
      data.images.forEach((img, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `modal-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
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
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
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

  // Abrir Modal de Producto
  const openProductModal = (id, name, category, price) => {
    if (!modalProductForm) return;
    if (modalProductCategory) modalProductCategory.textContent = category || 'Solución Profesional';
    if (modalProductTitle) modalProductTitle.textContent = 'Solicitar: ' + (name || 'Sistema');
    if (modalProductBarName) modalProductBarName.textContent = name || 'Sistema Seleccionado';
    if (modalProductBarPrice) modalProductBarPrice.textContent = price || 'Consulte Cotización';
    if (modalHiddenProduct) modalHiddenProduct.value = id || '';

    // Pre-seleccionar también en el formulario principal si existe la opción
    if (contactProductSelect && id) {
      contactProductSelect.value = id;
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

    window.dispatchEvent(new CustomEvent('product_selected', {
      detail: { id, name, category, price, title: newTitle, hash: newHash }
    }));

    modalProductForm.classList.add('open');
    modalProductForm.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const firstInput = document.getElementById('modalFirstName');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  // Cerrar Modal de Producto
  const closeProductModal = () => {
    if (!modalProductForm) return;
    modalProductForm.classList.remove('open');
    modalProductForm.style.display = 'none';
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
        pPrice = '$260 Licencia Completa';
      }

      openProductModal(pId, pName, pCat, pPrice);
    });
  }

  // Enviar Formulario Específico de Producto
  if (productSpecificForm) {
    productSpecificForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = (document.getElementById('modalFirstName')?.value || '').trim();
      const lastName = (document.getElementById('modalLastName')?.value || '').trim();
      const company = (document.getElementById('modalCompany')?.value || '').trim();
      const phone = (document.getElementById('modalPhone')?.value || '').trim();
      const email = (document.getElementById('modalEmail')?.value || '').trim();
      const message = (document.getElementById('modalMessage')?.value || '').trim();
      const productName = modalProductBarName ? modalProductBarName.textContent : 'el sistema solicitado';

      if (!firstName || !lastName || !company || !phone || !email) {
        if (modalProductFeedback) {
          modalProductFeedback.className = 'form-feedback error';
          modalProductFeedback.textContent = 'Por favor complete todos los campos obligatorios marcados con (*).';
          modalProductFeedback.style.display = 'block';
        }
        return;
      }

      const fullName = `${firstName} ${lastName}`;

      // Guardar información del lead para la página de agradecimiento
      sessionStorage.setItem('lead_name', fullName);
      sessionStorage.setItem('lead_company', company);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_product', productName);
      sessionStorage.setItem('lead_message', message);
      sessionStorage.setItem('lead_source', 'product_modal');

      // Evento de lead para analítica
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        product_name: productName,
        lead_type: 'product_modal'
      });

      // Mostrar estado de carga y redirigir a gracias.html
      const submitBtn = productSpecificForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Procesando solicitud...';
      }

      setTimeout(() => {
        window.location.href = 'gracias.html';
      }, 600);
    });
  }

  // Enviar Formulario Principal de la Página
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = (document.getElementById('contactFirstName')?.value || '').trim();
      const lastName = (document.getElementById('contactLastName')?.value || '').trim();
      const company = (document.getElementById('contactCompany')?.value || '').trim();
      const phone = (document.getElementById('contactPhone')?.value || '').trim();
      const email = (document.getElementById('contactEmail')?.value || '').trim();
      const message = (document.getElementById('contactMessage')?.value || '').trim();
      const productSelect = document.getElementById('contactProduct');
      const productText = productSelect && productSelect.selectedIndex >= 0 ? productSelect.options[productSelect.selectedIndex].text : 'solución seleccionada';

      if (!firstName || !lastName || !company || !phone || !email || !productSelect?.value) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Por favor complete los campos obligatorios (*) y seleccione la solución de su interés.';
          formFeedback.style.display = 'block';
        }
        return;
      }

      const fullName = `${firstName} ${lastName}`;

      // Guardar información del lead para la página de agradecimiento
      sessionStorage.setItem('lead_name', fullName);
      sessionStorage.setItem('lead_company', company);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_product', productText);
      sessionStorage.setItem('lead_message', message);
      sessionStorage.setItem('lead_source', 'main_contact_form');

      // Evento de lead para analítica
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        product_name: productText,
        lead_type: 'main_contact_form'
      });

      // Mostrar estado de carga y redirigir a gracias.html
      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Procesando requerimiento...';
      }

      setTimeout(() => {
        window.location.href = 'gracias.html';
      }, 600);
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

  console.log('Gehydis Consulting catalog loaded successfully.');
});
