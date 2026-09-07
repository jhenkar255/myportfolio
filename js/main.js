/**
 * Jhenkar M S - Portfolio JavaScript Logic
 * Modern, accessible, zero-dependency client scripts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initTypewriter();
  initSkillsFilter();
  initProjectModal();
  initClipboardCopy();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    } else {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  toggleBtn.addEventListener('click', () => toggleDrawer());

  // Close when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleDrawer(false);
    }
  });
}

/* ==========================================================================
   3. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    "Full Stack Developer Enthusiast",
    "AI And Machine Learning Enthusiast",
    "Cloud & AI Solutions Builder"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseDelay = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   4. Skills Filter
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Project Details Modal
   ========================================================================== */
const projectDetails = {
  utsavmitra: {
    title: "UtsavMitra – AI-Powered Event Management Platform",
    category: "Full Stack & Real-Time Collaboration",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Render Cloud"],
    description: "UtsavMitra is an intelligent full-stack event lifecycle platform developed to transform event planning from fragmented coordination into a unified, responsive collaborative digital experience.",
    architecture: [
      "Client Layer: Interactive single-page React frontend with custom dashboards for event organizers and attendees.",
      "Real-time Coordination: Bidirectional Socket.IO pipelines broadcasting guest responses, chat messages, and schedule amendments instantaneously.",
      "Data & Storage: Normalized MongoDB schemas with Mongoose ODM handling user profiles, event timelines, digital invitations, and itemized budgets.",
      "Deployment & Scaling: Continuous deployment orchestrated on Render with containerized backend services and automated environment configurations."
    ],
    highlights: [
      "Built interactive digital invitation designer with RSVP confirmation status tracking.",
      "Engineered automated budget and expense tracking module with category-wise expenditure analytics.",
      "Implemented role-based permissions ensuring event organizers can delegate planning responsibilities securely."
    ],
    github: "https://github.com/jhenkar255/Event",
    liveDemo: "https://utsavmitra-frontend.onrender.com"
  },
  powergrid: {
    title: "Power Grid Demand Forecasting using Machine Learning",
    category: "Data Science & Predictive Analytics",
    tags: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Streamlit", "Time Series"],
    description: "An advanced machine learning framework engineered to accurately predict temporal electricity consumption patterns and regional peak-load spikes to assist grid dispatchers in proactive load balancing.",
    architecture: [
      "Data Pipeline: Comprehensive historical load data ingestion, outlier cleaning, missing-value interpolation, and temporal feature engineering (hour, day of week, seasonal cycles) using Pandas.",
      "Model Exploration: Comparative benchmarking of multi-variate regression algorithms and ensemble methods using Scikit-learn.",
      "User Interface: Interactive Streamlit web interface empowering energy operators to upload live grid sensor parameters and render real-time demand forecast curves.",
      "Visual Insights: Automated generation of load density plots, peak variance indicators, and confidence intervals using Matplotlib."
    ],
    highlights: [
      "Reduced forecast error variance through cyclical timestamp encodings and weather attribute correlation.",
      "Interactive slider-based simulation in Streamlit for what-if scenarios during extreme weather.",
      "Delivered an accessible dashboard architecture that runs lightweight without requiring specialized hardware."
    ],
    github: "https://github.com/jhenkar255/PGDF-Demand-Forecasting",
    liveDemo: "https://pgdf-demand-forecasting.onrender.com"
  },
  bugtracker: {
    title: "Bug Tracker – Software Defect & Issue Management",
    category: "Full Stack Web Application",
    tags: ["Python", "Flask", "SQLite", "Jinja2", "HTML5/CSS3", "REST API"],
    description: "Bug Tracker is an agile, web-based defect tracking system built with Python and Flask. It enables development teams to log, triage, assign, and track the status of software bugs through a streamlined lifecycle with persistent SQLite storage.",
    architecture: [
      "Backend Architecture: Modular Python Flask web application handling issue reporting, status mutations, and ticket assignment workflows.",
      "Database Schema: SQLite relational database storing defect records, severity rankings (Low, Medium, High, Critical), timestamps, and logs.",
      "Frontend & Views: Jinja2 server-rendered templates styled with modern CSS for clean defect visualization and rapid ticket logging.",
      "Lifecycle Management: Full issue progression tracking from 'Reported' to 'In Progress' and 'Resolved' with audit transparency."
    ],
    highlights: [
      "Structured bug intake form capturing reproducible steps, component tags, and severity levels.",
      "Instant multi-criteria filtering to sort issues by priority, status, and reporting timeline.",
      "Lightweight, production-ready implementation with zero external database server dependencies."
    ],
    github: "https://github.com/jhenkar255/bugtracker",
    liveDemo: "https://bugtacker.onrender.com"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalBody) return;

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-header-meta">
        <span class="conference-pill">${data.category}</span>
      </div>
      <h2 class="modal-project-title">${data.title}</h2>
      
      <div class="project-meta-tags" style="margin-bottom: 20px;">
        ${data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
      </div>

      <p class="modal-p">${data.description}</p>

      <h3 class="modal-section-title">System Architecture &amp; Implementation</h3>
      <div class="modal-highlights">
        ${data.architecture.map(item => `
          <div class="modal-highlight-item">
            <span>▹</span>
            <p>${item}</p>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title">Key Engineering Highlights</h3>
      <div class="modal-highlights">
        ${data.highlights.map(item => `
          <div class="modal-highlight-item">
            <span>✓</span>
            <p>${item}</p>
          </div>
        `).join('')}
      </div>

      <div class="modal-actions-row">
        <a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-project-live" title="Launch Live Demo">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          <span>Live Demo</span>
        </a>
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm btn-project-github" title="View Source on GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
          <span>GitHub</span>
        </a>
        <button class="btn btn-ghost btn-sm" onclick="closeProjectModal()">
          <span>Close Window</span>
        </button>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  window.closeProjectModal = function() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Handle placeholder live demo links smoothly
  document.addEventListener('click', (e) => {
    const liveBtn = e.target.closest('.btn-project-live');
    if (liveBtn) {
      const href = liveBtn.getAttribute('href');
      if (!href || href === '#' || href === 'javascript:void(0)') {
        e.preventDefault();
        showToast('🔗 Live Demo link will be connected soon!');
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeProjectModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeProjectModal();
    }
  });
}

/* ==========================================================================
   6. 1-Click Clipboard Copy
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.querySelector('span').textContent;
        btn.querySelector('span').textContent = 'Copied!';
        btn.classList.add('btn-primary');
        showToast(`Copied "${textToCopy}" to clipboard!`);

        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.classList.remove('btn-primary');
        }, 2000);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields (*)', 'error');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Simulation of submission
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Sending Message...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      form.reset();
      showToast(`Thank you, ${name}! Your message has been prepared.`);
    }, 900);
  });
}

/* ==========================================================================
   8. Scroll Spy & Navbar Elevation
   ========================================================================== */
function initScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    // Header elevation
    if (window.scrollY > 20) {
      header.style.borderBottomColor = 'var(--border-hover)';
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.borderBottomColor = 'var(--border-subtle)';
      header.style.boxShadow = 'none';
    }

    // Scroll spy
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3500);
}
