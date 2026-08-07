// ============================================
// PHOTOGRAPHY WEBSITE - INTERACTIVE FEATURES
// ============================================

// Document Ready
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initMobileMenu();
  initGalleryLightbox();
  initCategoryAlbumsModal();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
  initPortfolioTabs();
  initVideoThumbnails();
  initCursorGallery();
  initCustomCursor();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');

      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage || !lightboxClose) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', function (e) {
      // If this item is category album trigger, let category album modal handle it
      if (this.classList.contains('category-album-trigger') || this.closest('.photo-list-item')) {
        return;
      }

      // Get the currently visible slide, or fall back to any img
      const activeSlide = this.querySelector('.slide.active') || this.querySelector('img');
      if (!activeSlide) return;
      lightboxImage.src = activeSlide.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  function reveal() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  // Initial check
  reveal();

  // Check on scroll
  window.addEventListener('scroll', reveal);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Simulate form submission (replace with actual backend integration)
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// PORTFOLIO TABS
// ============================================
function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const contents = document.querySelectorAll('.portfolio-content');

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// ============================================
// VIDEO THUMBNAILS
// ============================================
function initVideoThumbnails() {
  const videoItems = document.querySelectorAll('.video-item[data-video-id]');

  videoItems.forEach(item => {
    const thumbnail = item.querySelector('.video-thumbnail');
    if (!thumbnail) return;

    thumbnail.addEventListener('click', function () {
      // Check if there's a link to navigate to
      const link = item.getAttribute('data-link');
      if (link && link !== '#' && link.trim() !== '') {
        window.location.href = link;
        return;
      }

      const videoId = item.getAttribute('data-video-id');
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'video-wrapper';

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');

      videoWrapper.appendChild(iframe);
      thumbnail.parentNode.replaceChild(videoWrapper, thumbnail);
    });
  });
}

// ============================================
// LAZY LOADING (if needed for performance)
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// CURSOR-BASED GALLERY IMAGE SWAPPING
// ============================================
function initCursorGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    const slides = item.querySelectorAll('.gallery-slides .slide');
    const dots = item.querySelectorAll('.gallery-dots .dot');

    // Skip items without slides
    if (slides.length < 2) return;

    let currentIndex = 0;

    // Show a specific slide by index
    function showSlide(index) {
      if (index === currentIndex) return;
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    // On mouse move: divide box width into equal segments
    item.addEventListener('mousemove', function (e) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const segmentWidth = rect.width / slides.length;
      let index = Math.floor(x / segmentWidth);
      index = Math.max(0, Math.min(index, slides.length - 1));
      showSlide(index);
    });

    // On mouse leave: reset to first slide
    item.addEventListener('mouseleave', function () {
      showSlide(0);
      // Force reset in case index was already 0
      currentIndex = -1;
      showSlide(0);
    });
  });
}

// ============================================
// CUSTOM INTERACTIVE CURSOR
// ============================================
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('customCursorDot');

  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0; // Target coordinates
  let cursorX = 0, cursorY = 0; // Current ring coordinates
  let dotX = 0, dotY = 0; // Current dot coordinates
  let isHovering = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Ensure cursor is visible once mouse moves
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  });

  // Anim loop for smooth trailing ring
  function animateCursor() {
    // Lerp coordinates
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    dotX += (mouseX - dotX) * 0.45;
    dotY += (mouseY - dotY) * 0.45;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
  }
  
  // Start loop
  animateCursor();

  // Hover states using event delegation
  document.addEventListener('mouseover', function (e) {
    const target = e.target;
    if (!target) return;
    
    // Check if target or parent is interactive
    if (
      target.closest('a') || 
      target.closest('button') || 
      target.closest('.portfolio-tab') || 
      target.closest('.social-link') ||
      target.closest('.method-pill')
    ) {
      cursor.classList.add('hover');
    } else if (
      target.closest('.gallery-item') || 
      target.closest('.video-thumbnail') ||
      target.closest('.album-card') ||
      target.closest('.category-album-trigger') ||
      target.closest('[data-category]')
    ) {
      cursor.classList.add('clickable');
    }
  });

  document.addEventListener('mouseout', function (e) {
    const target = e.target;
    if (!target) return;
    
    if (
      target.closest('a') || 
      target.closest('button') || 
      target.closest('.portfolio-tab') || 
      target.closest('.social-link') ||
      target.closest('.method-pill')
    ) {
      cursor.classList.remove('hover');
    } else if (
      target.closest('.gallery-item') || 
      target.closest('.video-thumbnail') ||
      target.closest('.album-card') ||
      target.closest('.category-album-trigger') ||
      target.closest('[data-category]')
    ) {
      cursor.classList.remove('clickable');
    }
  });
  
  // Hide cursor on mouse leave screen
  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', function () {
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  });
}

// ============================================
// CATEGORY ALBUMS MODAL (FOR ALL 9 CATEGORIES)
// ============================================
const CATEGORY_ALBUMS_DATA = {
  portrait: {
    title: "Portrait",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Studio & Editorial Portraits",
        desc: "High-fashion and editorial portraiture with cinematic studio lighting.",
        image: "Portrait.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Fashion & Creative Sessions",
        desc: "Expressive portrait sessions focusing on unique personality and style.",
        image: "profilepicture.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Outdoor & Golden Hour",
        desc: "Atmospheric portraits captured in stunning natural scenery and sunset glows.",
        image: "ZCJ01719.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Personal Branding & Headshots",
        desc: "Polished portraits celebrating milestones, graduations, and personal branding.",
        image: "graduation.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  },
  preshoots: {
    title: "Preshoots",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Romantic Couples & Engagement",
        desc: "Artistic and emotional pre-wedding shoots set in breathtaking landscapes.",
        image: "pre shoot.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Cinematic Scenic Preshoots",
        desc: "Luxury engagement photo stories in iconic natural backdrops.",
        image: "Cover.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Urban & Conceptual Sessions",
        desc: "Modern, vibrant pre-wedding shoots with creative architectural framing.",
        image: "Portrait.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  },
  events: {
    title: "Events",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Luxury Events & Celebrations",
        desc: "Documentary-style event coverage capturing raw emotions and key highlights.",
        image: "ZCJ01084.jpg",
        link: "https://www.facebook.com/share/p/14TiaUHTkAd/"
      },
      {
        title: "Corporate & Special Highlights",
        desc: "Atmospheric coverage of corporate galas, launches, and celebrations.",
        image: "Cover.jpg",
        link: "https://www.facebook.com/share/p/14TiaUHTkAd/"
      },
      {
        title: "Live Shows & Gatherings",
        desc: "Vibrant documentation of live stage events and grand gatherings.",
        image: "product.jpg",
        link: "https://www.facebook.com/share/p/14TiaUHTkAd/"
      }
    ]
  },
  graduation: {
    title: "Graduation",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Convocation & Degree Celebrations",
        desc: "Polished, timeless graduation portraits celebrating academic achievements.",
        image: "graduation.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Solo Graduate Studio Portraits",
        desc: "High-end studio portraits in official graduation gown and cap.",
        image: "Portrait.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Campus Memories & Family Stories",
        desc: "Heartwarming captures with family, mentors, and friends on campus.",
        image: "Cover.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  },
  product: {
    title: "Product",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Commercial Product Showcase",
        desc: "High-end product photography designed to showcase craftsmanship and details.",
        image: "product.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Brand Campaigns & Styling",
        desc: "Creative composition and lighting engineered for luxury brand storytelling.",
        image: "Cover.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Detail & Finish Series",
        desc: "Detailed close-ups highlighting material textures, finishes, and design.",
        image: "real.jpeg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  },
  automotive: {
    title: "Automotive",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Supercars & Automotive Styling",
        desc: "Dynamic, high-speed, and detailed automotive captures highlighting performance.",
        image: "ZCJ00111.JPG",
        link: "https://www.facebook.com/share/p/17rpuSAGDu/"
      },
      {
        title: "Track Action & Panning Shots",
        desc: "Motion captures and high-speed photography on track and road.",
        image: "car thumb.JPG",
        link: "https://www.facebook.com/share/p/17rpuSAGDu/"
      },
      {
        title: "Custom Builds & Detail Series",
        desc: "Close-ups, interior highlights, and engineering details of custom vehicles.",
        image: "ZCJ09528.JPG",
        link: "https://www.facebook.com/share/p/17rpuSAGDu/"
      }
    ]
  },
  pets: {
    title: "Pets",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Expressive Companion Portraits",
        desc: "Heartwarming pet photography capturing playfulness, charm, and character.",
        image: "ZCJ09528.JPG",
        link: "https://www.facebook.com/share/p/1Dk2MhrT1p/"
      },
      {
        title: "Outdoor & Action Pet Sessions",
        desc: "Energetic outdoor sessions celebrating your pets in natural environments.",
        image: "ZCJ00111.JPG",
        link: "https://www.facebook.com/share/p/1Dk2MhrT1p/"
      },
      {
        title: "Pet & Family Bonds",
        desc: "Tender, candid moments between animal companions and their families.",
        image: "Portrait.jpg",
        link: "https://www.facebook.com/share/p/1Dk2MhrT1p/"
      }
    ]
  },
  wedding: {
    title: "Wedding",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Luxury Wedding Ceremonies",
        desc: "Timeless wedding storytelling capturing key rituals and emotional journeys.",
        image: "wedding.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Bride & Groom Portraiture",
        desc: "Exquisite couple portraits showcasing fine wedding attire and romance.",
        image: "product.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Reception & Night Festivities",
        desc: "Vibrant reception highlights, joyful dances, and celebratory moments.",
        image: "ZCJ01084.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  },
  "real-estate": {
    title: "Real Estate",
    subtitle: "Click any album below to open the complete photo collection on Facebook",
    albums: [
      {
        title: "Architectural & Interior Showcase",
        desc: "Stunning interior and exterior photography highlighting layout and natural light.",
        image: "real.jpeg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Luxury Estates & Residences",
        desc: "High-end real estate visuals for luxury residential properties and villas.",
        image: "ZCJ01084.jpg",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      },
      {
        title: "Commercial Spaces & Architecture",
        desc: "Polished photography for commercial spaces, developments, and modern structures.",
        image: "ZCJ00111.JPG",
        link: "https://www.facebook.com/share/p/1CHYRGbKpz/"
      }
    ]
  }
};

function initCategoryAlbumsModal() {
  const modal = document.getElementById('portraitModal');
  const modalClose = document.getElementById('portraitModalClose');
  const modalBackdrop = document.getElementById('portraitModalBackdrop');
  if (!modal) return;

  const modalTitle = modal.querySelector('.portrait-modal-title');
  const modalSubtitle = modal.querySelector('.portrait-modal-subtitle');
  const albumsGrid = modal.querySelector('.portrait-albums-grid');

  function openCategoryModal(categoryId, customFbLink) {
    const data = CATEGORY_ALBUMS_DATA[categoryId] || CATEGORY_ALBUMS_DATA['portrait'];
    
    // Update Header
    if (modalTitle) {
      modalTitle.innerHTML = `${data.title} <span>Albums</span>`;
    }
    if (modalSubtitle) {
      modalSubtitle.textContent = data.subtitle;
    }

    // Render Grid
    if (albumsGrid) {
      albumsGrid.innerHTML = data.albums.map(album => {
        const link = customFbLink || album.link;
        return `
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="album-card">
            <div class="album-cover">
              <img src="${album.image}" alt="${album.title}" onerror="this.src='Portrait.jpg'">
              <div class="album-overlay">
                <span class="album-link-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  View FB Album ↗
                </span>
              </div>
            </div>
            <div class="album-meta">
              <span class="album-tag">Facebook Album</span>
              <h3 class="album-title">${album.title}</h3>
              <p class="album-desc">${album.desc}</p>
            </div>
          </a>
        `;
      }).join('');
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Global click event listener for photography categories
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.category-album-trigger, [data-category]');
    if (!trigger) return;

    // Skip if clicking inside the modal content itself
    if (e.target.closest('.portrait-modal-content')) return;

    const itemElem = trigger.closest('[data-category]') || trigger;
    const categoryId = itemElem.getAttribute('data-category');
    const customFbLink = itemElem.getAttribute('data-fb-link');

    if (categoryId && CATEGORY_ALBUMS_DATA[categoryId]) {
      e.preventDefault();
      e.stopPropagation();
      openCategoryModal(categoryId, customFbLink);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}



