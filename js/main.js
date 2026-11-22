/**
 * KHALIFA HAIR STATION - Official JavaScript
 * High performance, zero external dependencies, accessible, responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Elements ---
  const WHATSAPP_NUMBER = '94721997092'; // Sri Lanka country code +94 721997092
  const EMAIL_ADDRESS = 'khalifahairstation@gmail.com';

  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-nav-drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');

  // Modals
  const bookingModal = document.getElementById('bookingModal');
  const videoModal = document.getElementById('videoModal');
  const lightboxModal = document.getElementById('lightboxModal');
  const salonVideo = document.getElementById('salonTourVideo');

  // Gallery & Lightbox Elements
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxPrevBtn = document.querySelector('.lightbox-prev');
  const lightboxNextBtn = document.querySelector('.lightbox-next');
  const lightboxCloseBtn = document.querySelector('.lightbox-close');

  // Services Filter Elements
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  // Booking & Form Elements
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelectInput = document.getElementById('serviceSelect');
  const toastContainer = document.getElementById('toastContainer');

  // --- Sticky Header & Back to Top Scroll ---
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    if (siteHeader) {
      if (scrollPos > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else if (href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Navigation Drawer ---
  const openMobileDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.classList.add('active');
    }
  };

  const closeMobileDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileToggle) mobileToggle.classList.remove('active');
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  // Close mobile drawer when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('active')) {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileDrawer();
      }
    }
  });

  // --- Smooth Scrolling with header offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Services Category Filter ---
  if (serviceTabBtns.length > 0 && serviceCards.length > 0) {
    serviceTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        serviceTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Gallery Filtering & Lightbox ---
  let currentGalleryIndex = 0;
  let visibleGalleryItems = Array.from(galleryItems);

  const updateVisibleGallery = () => {
    visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  };

  if (galleryTabBtns.length > 0) {
    galleryTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        updateVisibleGallery();
      });
    });
  }

  const showLightboxImage = (index) => {
    if (visibleGalleryItems.length === 0) return;
    if (index < 0) index = visibleGalleryItems.length - 1;
    if (index >= visibleGalleryItems.length) index = 0;

    currentGalleryIndex = index;
    const targetItem = visibleGalleryItems[currentGalleryIndex];
    const imgEl = targetItem.querySelector('img');
    const titleEl = targetItem.querySelector('.gallery-item-title');
    const catEl = targetItem.querySelector('.gallery-item-category');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Khalifa Hair Station Gallery';
    }

    if (lightboxTitle && titleEl) {
      lightboxTitle.textContent = titleEl.textContent;
    }

    if (lightboxCategory && catEl) {
      lightboxCategory.textContent = catEl.textContent;
    }

    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleGallery();
      const itemIndex = visibleGalleryItems.indexOf(item);
      if (itemIndex !== -1) {
        showLightboxImage(itemIndex);
      }
    });
  });

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex + 1);
    });
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // --- Video Modal Controls ---
  const playTourBtns = document.querySelectorAll('.open-tour-btn, .tour-play-overlay, .play-button-pulsing');

  const openVideoModal = () => {
    if (videoModal) {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (salonVideo) {
        salonVideo.currentTime = 0;
        salonVideo.play().catch(err => {
          console.log('Video autoplay prevented, user interaction required:', err);
        });
      }
    }
  };

  const closeVideoModal = () => {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      if (salonVideo) {
        salonVideo.pause();
      }
    }
  };

  playTourBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  });

  const videoCloseBtn = document.querySelector('.video-modal-close');
  if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // --- Booking Modal Controls ---
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const bookingCloseBtns = document.querySelectorAll('.booking-modal-close');

  const openBookingModal = (serviceName = '') => {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (serviceName && serviceSelectInput) {
        for (let i = 0; i < serviceSelectInput.options.length; i++) {
          if (serviceSelectInput.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
              serviceSelectInput.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelectInput.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  const closeBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const requestedService = btn.getAttribute('data-service') || '';
      openBookingModal(requestedService);
    });
  });

  bookingCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeBookingModal);
  });

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  // Keyboard navigation (Escape, Left, Right)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVideoModal();
      closeBookingModal();
      closeMobileDrawer();
    } else if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        showLightboxImage(currentGalleryIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showLightboxImage(currentGalleryIndex + 1);
      }
    }
  });

  // --- Form & WhatsApp Booking Dispatch ---
  const handleBookingSubmit = (e, targetMethod = 'whatsapp') => {
    if (e) e.preventDefault();

    const form = e.target.closest('form') || bookingForm;
    if (!form) return;

    const name = form.querySelector('[name="client_name"]')?.value.trim() || 'Client';
    const phone = form.querySelector('[name="client_phone"]')?.value.trim() || 'Not provided';
    const service = form.querySelector('[name="service"]')?.value || 'General Consultation';
    const date = form.querySelector('[name="appointment_date"]')?.value || 'Flexible';
    const time = form.querySelector('[name="appointment_time"]')?.value || 'Anytime';
    const notes = form.querySelector('[name="notes"]')?.value.trim() || 'None';

    if (targetMethod === 'whatsapp') {
      const message = 
`✨ *Appointment Request - Khalifa Hair Station* ✨
-----------------------------------------
👤 *Name:* ${name}
📞 *Contact:* ${phone}
✂️ *Selected Service:* ${service}
📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${time}
📝 *Notes / Requests:* ${notes}
-----------------------------------------
(Sent via official website booking portal)`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp to send your booking request...');
      closeBookingModal();
    } else if (targetMethod === 'email') {
      const subject = `Appointment Booking: ${name} - ${service}`;
      const body = `Name: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred Date: ${date}\nPreferred Time: ${time}\nNotes: ${notes}`;
      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening email client for booking inquiry...');
      closeBookingModal();
    }
  };

  // Bind booking submit buttons
  document.querySelectorAll('.btn-submit-whatsapp').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleBookingSubmit(e, 'whatsapp');
    });
  });

  document.querySelectorAll('.btn-submit-email').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleBookingSubmit(e, 'email');
    });
  });

  // --- Toast Notification Helper ---
  function showToast(message, icon = 'bi-check-circle-fill') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }

  // --- Quick Copy Contact Details ---
  document.querySelectorAll('.copy-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const textToCopy = trigger.getAttribute('data-copy');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Contact: ${textToCopy}`);
        });
      }
    });
  });
});
