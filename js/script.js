/**
 * AdanuNexus — Interactive Scripts
 * Handles mobile drawer, FAQ accordions, sticky header elevation, and client interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initFaqAccordion();
  initHeaderScroll();
  initSmoothScroll();
  initPortfolioFilters();
});

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!menuBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking any link inside it
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * FAQ Accordion (expand / collapse answers)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Optional: close other open items for accordion behavior
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Header shadow on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.25)';
      header.style.background = 'rgba(12, 34, 30, 0.98)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      header.style.background = 'rgba(15, 42, 38, 0.96)';
    }
  }, { passive: true });
}

/**
 * Smooth scrolling for in-page anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Portfolio category filtering
 */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('#portfolioFilters button');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterButtons.length || !items.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button active styling
      filterButtons.forEach(b => {
        b.style.background = '#FFFFFF';
        b.style.color = 'var(--primary-dark)';
      });
      btn.style.background = 'var(--primary)';
      btn.style.color = '#FFFFFF';

      // Show/hide portfolio items
      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
