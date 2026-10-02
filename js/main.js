/* --------------------------------------------------
   Sara Khalifa Abdelnour - Portfolio JavaScript
   Interactive logic, filter tabs, modal, theme toggle
-------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileMenuBtn) {
          mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
        }
      });
    });
  }

  // Theme Toggle (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="ph ph-moon"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
    });
  }

  // Active Scroll Spy Navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // Projects Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories');
        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Logic
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalTech = document.getElementById('modalTech');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const projectDetailsMap = {
    'feedpulse': {
      title: 'FeedPulse — LLM-Based Feedback Analysis System',
      subtitle: 'Angular • ASP.NET Core • Apache Spark • LLM AI • Facebook & Instagram API',
      tech: ['Angular', 'ASP.NET Core', 'C#', 'Apache Spark', 'LLM AI', 'Python', 'CI/CD', 'Docker'],
      description: `
        <p><strong>FeedPulse</strong> is an enterprise AI-driven feedback intelligence system designed to process multi-channel social media customer feedback in real-time.</p>
        <br>
        <h4>Key Technical Highlights:</h4>
        <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.7;">
          <li>Integrated Facebook Graph API & Instagram Business API for automated data ingestion.</li>
          <li>Engineered distributed streaming data pipelines using Apache Spark to process large-scale text feedback.</li>
          <li>Implemented state-of-the-art LLM models for multi-language sentiment scoring, topic extraction, and urgent query detection.</li>
          <li>Architected ASP.NET Core REST APIs following Repository & Unit of Work patterns for clean data abstraction.</li>
          <li>Built a high-performance Angular dashboard with real-time chart visualizers and actionable customer sentiment alerts.</li>
        </ul>
      `
    },
    'hospital': {
      title: 'Hospital Management System',
      subtitle: 'ASP.NET MVC • C# • Entity Framework Core • SQL Server',
      tech: ['ASP.NET MVC', 'C#', 'Entity Framework Core', 'SQL Server', 'Bootstrap', 'JavaScript', 'LINQ'],
      description: `
        <p>A comprehensive web platform engineered for hospital administrative operations, patient record tracking, and doctor scheduling.</p>
        <br>
        <h4>Key Technical Highlights:</h4>
        <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.7;">
          <li>Designed normalized relational database schema in SQL Server supporting multi-entity relationships (Patients, Doctors, Appointments, Medical Records, Billing).</li>
          <li>Implemented ASP.NET Identity authentication with role-based authorization (Admin, Doctor, Receptionist, Patient).</li>
          <li>Built optimized EF Core LINQ queries and stored procedures to handle fast report generation.</li>
          <li>Developed dynamic UI forms with client-side jQuery validation and server-side model validation.</li>
        </ul>
      `
    },
    'ecommerce': {
      title: 'E-Commerce Backend & Management System',
      subtitle: 'ASP.NET Core Web API • Entity Framework Core • JWT Auth • SQL Server',
      tech: ['ASP.NET Core', 'C#', 'Web API', 'SQL Server', 'EF Core', 'JWT Auth', 'Swagger', 'Postman'],
      description: `
        <p>A scalable, high-concurrency online store backend API providing seamless inventory management, order processing, and authentication.</p>
        <br>
        <h4>Key Technical Highlights:</h4>
        <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.7;">
          <li>Developed secure RESTful web APIs with JSON Web Token (JWT) authentication and custom authorization middleware.</li>
          <li>Engineered cart checkout workflows with transactional consistency using Entity Framework Core.</li>
          <li>Implemented product catalog pagination, dynamic searching, and category filtering algorithms.</li>
          <li>Documented all API endpoints using OpenAPI / Swagger specification and Postman collections.</li>
        </ul>
      `
    }
  };

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details && modalOverlay) {
        modalTitle.textContent = details.title;
        modalSubtitle.textContent = details.subtitle;
        modalBody.innerHTML = details.description;
        
        modalTech.innerHTML = details.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Contact Form Submission Handler via Formspree AJAX
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const formData = new FormData(contactForm);

      // Disable button and show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ph ph-paper-plane-tilt" style="animation: spin 1s linear infinite;"></i> Sending...';

      if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      if (formErrorAlert) formErrorAlert.style.display = 'none';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          if (formSuccessAlert) {
            formSuccessAlert.style.display = 'block';
            setTimeout(() => {
              formSuccessAlert.style.display = 'none';
            }, 7000);
          }
        } else {
          if (formErrorAlert) {
            formErrorAlert.style.display = 'block';
          }
        }
      } catch (error) {
        if (formErrorAlert) {
          formErrorAlert.style.display = 'block';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
