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
  initContactForm();
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

/**
 * Interactive Contact Form Handling & WhatsApp Instant Send
 */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  const statusBox = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const whatsappBtn = document.getElementById('whatsappSubmitBtn');

  // Check URL query parameters (e.g. if redirected from standard POST)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('submitted') === 'true' && statusBox) {
    statusBox.style.display = 'block';
    statusBox.style.background = '#DEF7EC';
    statusBox.style.border = '1px solid #31C48D';
    statusBox.style.color = '#03543F';
    statusBox.innerHTML = '<strong>&#9989; Request Received Successfully!</strong><br>Thank you! Your consultation request has been sent to <strong>oche8004@gmail.com</strong>. We will get back to you within 12 hours.';
  }

  // Handle WhatsApp alternative submit
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = (document.getElementById('name')?.value || '').trim();
      const email = (document.getElementById('email')?.value || '').trim();
      const phone = (document.getElementById('phone')?.value || '').trim();
      const service = (document.getElementById('service')?.value || '').trim();
      const timeline = (document.getElementById('timeline')?.value || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name || !message) {
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.background = '#FEF08A';
          statusBox.style.border = '1px solid #EAB308';
          statusBox.style.color = '#713F12';
          statusBox.innerHTML = '&#9888;&#65039; Please enter at least your <strong>Full Name</strong> and <strong>Project Scope/Details</strong> before sending via WhatsApp.';
        }
        return;
      }

      const text = `Hello AdanuNexus, I would like to request a consultation:\n\n*Name:* ${name}\n*Email:* ${email || 'Not provided'}\n*Phone:* ${phone || 'Not provided'}\n*Service:* ${service || 'General Inquiry'}\n*Timeline:* ${timeline}\n*Scope/Details:* ${message}`;
      const whatsappUrl = `https://wa.me/2348117867129?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Handle Form Submission via AJAX to formsubmit.co
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ensure action points to formsubmit, never formspree
    form.setAttribute('action', 'https://formsubmit.co/oche8004@gmail.com');

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '&#9203; Sending Request...';

    if (statusBox) {
      statusBox.style.display = 'none';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/oche8004@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({}));

      if (result.message && result.message.toLowerCase().includes('activation')) {
        // First-time activation needed
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.background = '#FEF3C7';
          statusBox.style.border = '1px solid #F59E0B';
          statusBox.style.color = '#92400E';
          statusBox.innerHTML = `<strong>&#128231; Almost Done! One-Time Activation Needed:</strong><br>FormSubmit has just sent a confirmation email to <strong>oche8004@gmail.com</strong>.<br><br>&#128073; Please check your inbox (or Spam folder) and click <strong>"Activate Form"</strong>. Once activated, every future consultation request will land directly in your inbox!`;
        }
      } else if (response.ok || result.success === 'true' || result.success === true) {
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.background = '#DEF7EC';
          statusBox.style.border = '1px solid #31C48D';
          statusBox.style.color = '#03543F';
          statusBox.innerHTML = `<strong>&#9989; Consultation Request Sent Successfully!</strong><br>Thank you, ${data.name || 'there'}! Your request has been delivered to <strong>oche8004@gmail.com</strong>. We will review your requirements and reach out within 12 hours.<br><br>If your request is urgent, you can also <a href="https://wa.me/2348117867129" target="_blank" rel="noopener noreferrer" style="color: #03543F; font-weight: 700; text-decoration: underline;">chat directly on WhatsApp &rarr;</a>`;
        }
        form.reset();
      } else {
        // Fall back to native submission
        form.submit();
      }
    } catch (err) {
      // In case of adblocker or network error, submit normally
      form.submit();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}
