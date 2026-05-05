/* ===========================
   ZOPPI ENGENHARIA — main.js
   =========================== */

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile nav toggle ── */
const burger = document.querySelector('.nav-burger');
burger.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
  document.body.style.overflow = navbar.classList.contains('nav-open') ? 'hidden' : '';
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open');
    document.body.style.overflow = '';
  });
});

/* ── Hero entrance animations ── */
const heroEls = [
  { el: document.querySelector('.hero-eyebrow'), delay: 200 },
  { el: document.querySelector('.hero-title'),   delay: 400 },
  { el: document.querySelector('.hero-sub'),     delay: 600 },
  { el: document.querySelector('.hero-actions'), delay: 800 },
  { el: document.querySelector('.hero-blueprint'), delay: 1000 },
];
heroEls.forEach(({ el, delay }) => {
  if (!el) return;
  setTimeout(() => {
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay);
});

/* ── Scroll reveal (Intersection Observer) ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── Product tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
      c.style.animation = '';
    });
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('active');
      panel.style.animation = 'fadeInTab 0.4s ease';
    }
  });
});

/* ── Contact form feedback ── */
const form = document.querySelector('.contact-form form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Mensagem enviada!';
      btn.style.background = '#25D366';
      setTimeout(() => {
        btn.textContent = 'Enviar Mensagem';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1200);
  });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── CSS keyframe for tab fade ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInTab {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: none; }
  }
`;
document.head.appendChild(style);
