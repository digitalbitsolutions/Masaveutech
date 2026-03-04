// Intersection Observer for scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Language selector logic
const translations = {
  en: {
    hero_title: "A new era of<br>digital consulting.",
    hero_sub: "Launching soon.",
    service1_title: "Digital Product Strategy",
    service1_desc: "From discovery to scalable execution.",
    service2_title: "Growth &amp; Go-To-Market",
    service2_desc: "Data-driven, outcome-focused.",
    service3_title: "AI &amp; Innovation",
    service3_desc: "Building what’s next.",
    why_title: "Why the wait?",
    why_p1: "Because we're not just redesigning a website.",
    why_p2: "We're redefining how digital consulting delivers value.",
    why_p3: "A new positioning. New services.",
    why_p4: "A stronger global vision."
  },
  es: {
    hero_title: "Una nueva era de<br>consultoría digital.",
    hero_sub: "Próximamente.",
    service1_title: "Estrategia de Producto Digital",
    service1_desc: "Desde el descubrimiento hasta la ejecución escalable.",
    service2_title: "Crecimiento &amp; Go-To-Market",
    service2_desc: "Basado en datos, enfocado en resultados.",
    service3_title: "IA &amp; Innovación",
    service3_desc: "Construyendo lo próximo.",
    why_title: "¿Por qué la espera?",
    why_p1: "Porque no solo rediseñamos un sitio web.",
    why_p2: "Redefinimos cómo la consultoría digital entrega valor.",
    why_p3: "Una nueva posición. Nuevos servicios.",
    why_p4: "Una visión global más fuerte."
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  // Update active button styling
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Attach click listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    // If we are on a different page structure (like /es/), we might need redirection
    // but for now, the JS logic handles content replacement if data-i18n is present.
    setLanguage(lang);
  });
});

// Initialize language from HTML tag or default to 'en'
const currentLang = document.documentElement.lang || 'en';
setLanguage(currentLang);

