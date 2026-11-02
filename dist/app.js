/**
 * BARYASHAN — Студия массажа в Улан-Удэ
 * Interactive Scripts
 * Developed by RAF STUDIO / kalapad90-design
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile navigation drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  mobileToggle?.addEventListener('click', () => toggleMobileMenu());
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      toggleMobileMenu(false);
    }
  });

  // 3. Filter tabs for catalog
  const filterChips = document.querySelectorAll('.filter-chip');
  const serviceCards = document.querySelectorAll('.service-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      // Toggle current
      item.classList.toggle('open', !isOpen);
    });
  });

  // 5. Booking Modal & Telegram Generator
  const modalBackdrop = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const serviceSelect = document.getElementById('modalService');
  const bookingForm = document.getElementById('bookingForm');

  function openBookingModal(presetServiceName = '') {
    if (presetServiceName && serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(presetServiceName)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-name') || '';
      openBookingModal(serviceName);
    });
  });

  modalClose?.addEventListener('click', closeBookingModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeBookingModal();
    }
  });

  // Escape key closes modal & mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      toggleMobileMenu(false);
    }
  });

  // Handle form submission -> Telegram redirect with pre-filled message
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('modalService')?.value || 'Консультация';
    const name = document.getElementById('modalName')?.value || '';
    const date = document.getElementById('modalDate')?.value || '';
    const time = document.getElementById('modalTime')?.value || '';
    const comment = document.getElementById('modalComment')?.value || '';

    let text = `Здравствуйте! Хочу записаться в студию массажа Baryashan.\n`;
    text += `• Программа: ${service}\n`;
    if (name) text += `• Имя: ${name}\n`;
    if (date) text += `• Желаемая дата: ${date}\n`;
    if (time) text += `• Удобное время: ${time}\n`;
    if (comment) text += `• Пожелание: ${comment}\n`;

    const tgUrl = `https://t.me/Baryashan?text=${encodeURIComponent(text)}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
    closeBookingModal();
  });

  // 6. Toast Notification & Copy Phone
  const copyBtns = document.querySelectorAll('[data-copy-phone]');
  const toast = document.getElementById('toastNotice');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = btn.getAttribute('data-copy-phone') || '+7 (963) 956-91-22';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Номер ${phone} скопирован в буфер!`);
      }).catch(() => {
        showToast(`Номер: ${phone}`);
      });
    });
  });

  // 7. Interactive Leaflet Map for KDC Arun, Ulan-Ude
  const mapElement = document.getElementById('map');
  if (mapElement && typeof L !== 'undefined') {
    // Coordinates for KDC Arun, Sovetskaya 23a, Ulan-Ude: [51.8302, 107.5868]
    const coords = [51.8302, 107.5868];
    const map = L.map('map', {
      center: coords,
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom circle pulse marker
    const marker = L.circleMarker(coords, {
      radius: 10,
      color: '#FFFFFF',
      weight: 3,
      fillColor: '#A82F35',
      fillOpacity: 1
    }).addTo(map);

    const popupHtml = `
      <div style="font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.4; color: #161514; padding: 4px;">
        <strong style="font-family: 'Playfair Display', serif; font-size: 16px; color: #A82F35; display: block; margin-bottom: 2px;">BARYASHAN</strong>
        <span>ул. Советская, 23а (КДЦ «Арун»)</span><br>
        <span style="color: #6E6860; font-size: 11.5px;">Ежедневно: 09:00 — 21:00</span>
        <div style="margin-top: 8px;">
          <a href="https://2gis.ru/ulanude/firm/70000001081042336" target="_blank" rel="noopener" style="color: #2BAA13; font-weight: 600; text-decoration: underline;">Открыть в 2ГИС &rarr;</a>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml).openPopup();
  }

  // 8. Working Status Check
  const statusBadge = document.getElementById('liveStatus');
  if (statusBadge) {
    const now = new Date();
    // Ulan-Ude is UTC+8
    const utcHours = now.getUTCHours();
    const ulanUdeHours = (utcHours + 8) % 24;

    const dot = statusBadge.querySelector('.status-dot');
    const text = statusBadge.querySelector('.status-text');

    if (ulanUdeHours >= 9 && ulanUdeHours < 21) {
      if (dot) dot.style.background = '#10B981';
      if (text) text.textContent = 'Открыто до 21:00';
    } else {
      if (dot) {
        dot.style.background = '#F59E0B';
        dot.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.2)';
      }
      if (text) text.textContent = 'Запись на завтра';
    }
  }
});
