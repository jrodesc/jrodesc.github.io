const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const languageButtons = [...document.querySelectorAll('.language-option')];
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;

function syncThemeButton() {
  const isDark = root.dataset.theme === 'dark';
  const spanish = root.lang === 'es';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', spanish
    ? `Cambiar al tema ${isDark ? 'claro' : 'oscuro'}`
    : `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeButton.querySelector('.theme-label').textContent = spanish
    ? (isDark ? 'Modo claro' : 'Modo oscuro')
    : (isDark ? 'Light mode' : 'Dark mode');
}

themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  syncThemeButton();
});

const translations = {
  'a.skip-link': 'Saltar al contenido',
  '.primary-nav a:nth-child(1)': 'Experiencia',
  '.primary-nav a:nth-child(2)': 'Proyectos',
  '.primary-nav a:nth-child(3)': 'Habilidades',
  '.primary-nav a:nth-child(4)': 'Sobre mí',
  '.eyebrow': '<span class="availability-mark" aria-hidden="true"></span>Ingeniero de software <span class="eyebrow-divider">/</span> Almería, España',
  '#hero-title': 'Creo cosas útiles<span class="title-period">.</span>',
  '.hero-intro': 'Soy Jose Luis, ingeniero de software y apasionado por aprender sobre sistemas y desarrollo. Trabajo en distintas capas, desde los modelos de datos hasta los detalles de una interfaz.',
  '.hero-actions .button': 'Explora mi trabajo <span aria-hidden="true">↘</span>',
  '.cv-button': 'Descargar CV <span aria-hidden="true">↓</span>',
  '.hero-actions .text-link': 'Contacta conmigo <span aria-hidden="true">↗</span>',
  '.hero-aside p': 'Ingeniería cuidadosa.<br>Resultados claros y fiables.',
  '.aside-link': 'Un poco sobre mí <span aria-hidden="true">↓</span>',
  '.hero-footnote span:first-child': 'DESPLÁZATE PARA EXPLORAR',
  '#experience .section-kicker': '01 <span>/</span> Experiencia',
  '#experience h2': 'Dónde he trabajado<span class="title-period">.</span>',
  '#experience .section-summary': 'Algunos equipos y retos que han marcado mi forma de trabajar.',
  '#experience .experience-row:nth-child(1) .experience-main h3': 'Ingeniero de software <span class="at-sign">en</span> Acciosoft',
  '#experience .experience-row:nth-child(1) .experience-location': 'El Ejido, España <span>/</span> Ingeniería de software',
  '#experience .experience-row:nth-child(1) .experience-main>p:not(.experience-location)': 'Desarrollo y mantengo software para clientes, desde páginas de aterrizaje hasta tiendas en línea completas.',
  '#experience .experience-row:nth-child(2) .experience-main h3': 'Técnico informático <span class="at-sign">en</span> Altec',
  '#experience .experience-row:nth-child(2) .experience-location': 'Almería, España <span>/</span> Consultoría informática',
  '#experience .experience-row:nth-child(2) .experience-main>p:not(.experience-location)': 'Prestaba soporte a distintos equipos de la oficina y creaba scripts en Bash y Python para automatizar procesos.',
  '#projects .section-kicker': '02 <span>/</span> Trabajo destacado',
  '#projects .section-summary': 'Una selección de proyectos que he creado, de los que he aprendido y que sigo mejorando.',
  '#projects .project-card:nth-child(1) .project-info>p': 'Una web que simula una plataforma de comercio electrónico real. Creé desde cero una tienda funcional para un pequeño negocio dedicado al mundo geek, con Laravel, Angular 2, Bootstrap y MariaDB.',
  '#projects .project-card:nth-child(1) .project-link': 'Ver proyecto <span aria-hidden="true">↗</span>',
  '#projects .project-card:nth-child(2) .project-info>p': 'Proyecto de código abierto para crear un reproductor de audio funcional que obtiene vídeos de YouTube y reproduce su audio. Sigue en desarrollo y todavía no funciona por completo en Windows. Está disponible en GitHub.',
  '#projects .project-card:nth-child(2) .project-link': 'Ver proyecto <span aria-hidden="true">↗</span>',
  '#skills .section-kicker': '03 <span>/</span> Herramientas',
  '#skills h2': 'Mi caja de herramientas<span class="title-period">.</span>',
  '#skills .section-summary': 'Lenguajes, sistemas y métodos que uso para hacer un buen trabajo.',
  '.skill-group:nth-child(1) h3': 'Lenguajes',
  '.skill-group:nth-child(2) h3': 'Ingeniería',
  '.skill-group:nth-child(2) li:nth-child(1)': 'Estructuras de datos y algoritmos',
  '.skill-group:nth-child(2) li:nth-child(2)': 'Diseño orientado a objetos',
  '.skill-group:nth-child(2) li:nth-child(3)': 'Sistemas distribuidos',
  '.skill-group:nth-child(2) li:nth-child(4)': 'Diseño de API',
  '.skill-group:nth-child(2) li:nth-child(5)': 'Pruebas y depuración',
  '.skill-group:nth-child(3) h3': 'Herramientas y plataformas',
  '.skill-group:nth-child(4) h3': 'Forma de trabajo',
  '.skill-group:nth-child(4) li:nth-child(1)': 'Documentación técnica',
  '.skill-group:nth-child(4) li:nth-child(2)': 'Revisión de código',
  '.skill-group:nth-child(4) li:nth-child(3)': 'Colaboración ágil',
  '.skill-group:nth-child(4) li:nth-child(4)': 'Accesibilidad',
  '.skill-group:nth-child(4) li:nth-child(5)': 'Visión de producto',
  '#about .section-kicker': '04 <span>/</span> Un poco más',
  '#about-title': 'Curioso por naturaleza.<br>Ingeniero por vocación<span class="title-period">.</span>',
  '.about-copy>p': 'Me importa el oficio que hay detrás del buen software: pensar con claridad, cuidar los detalles y crear sistemas que sigan funcionando después del lanzamiento. Fuera del trabajo, me gusta leer, ver películas, pasear por la ciudad y explorar mapas en internet.',
  '.about-copy .text-link': '¿Tienes un buen reto? Hablemos <span aria-hidden="true">↗</span>',
  '.site-footer>span:nth-child(2)': 'Diseñado y creado con HTML, CSS y JS.',
  '.footer-contact a:nth-child(1) span': 'Correo',
  '.footer-contact a:nth-child(2) span': 'GitHub',
  '.footer-contact a:nth-child(3) span': 'LinkedIn',
  '.back-top': 'Volver arriba <span aria-hidden="true">↑</span>',
  '.terminal-version-link': 'Versión terminal <span aria-hidden="true">↗</span>',
};

const englishCopy = new Map(Object.keys(translations).map((selector) => [
  selector,
  document.querySelector(selector)?.innerHTML,
]));

function setLanguage(language) {
  const isSpanish = language === 'es';
  root.lang = language;
  document.title = isSpanish
    ? 'Jose Luis Rodríguez — Ingeniero de software'
    : 'Jose Luis Rodríguez — Software Engineer';
  document.querySelector('meta[name="description"]').content = isSpanish
    ? 'Portfolio de Jose Luis Rodríguez, ingeniero de software interesado en crear software útil y fiable.'
    : 'Portfolio of Jose Luis Rodríguez, software engineer focused on thoughtful, reliable software.';
  const cvLink = document.querySelector('.cv-button');
  cvLink.href = isSpanish
    ? 'resume/CV_JoseLuisRodriguezEscobar.pdf'
    : 'resume/cv_jlre_en.pdf';
  cvLink.download = isSpanish
    ? 'CV_JoseLuisRodriguezEscobar.pdf'
    : 'Jose-Luis-Rodriguez-CV.pdf';

  for (const [selector, spanish] of Object.entries(translations)) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = isSpanish ? spanish : englishCopy.get(selector);
  }
  document.querySelector('.language-switch').setAttribute('aria-label', isSpanish ? 'Idioma' : 'Language');
  document.querySelector('.language-label').textContent = isSpanish ? 'Idioma' : 'Language';
  document.querySelector('.primary-nav').setAttribute('aria-label', isSpanish ? 'Navegación principal' : 'Main navigation');
  document.querySelector('.wordmark').setAttribute('aria-label', isSpanish ? 'Jose Luis Rodríguez, inicio' : 'Jose Luis Rodríguez, home');
  document.querySelector('.footer-contact').setAttribute('aria-label', isSpanish ? 'Enlaces de contacto' : 'Contact links');
  document.querySelector('[data-i18n-alt="collectv-alt"]').alt = isSpanish
    ? 'Vista previa del proyecto web CollecTV'
    : 'CollecTV website project preview';
  document.querySelector('[data-i18n-alt="youtube-alt"]').alt = isSpanish
    ? 'Vista previa del proyecto YouTube Audio Player'
    : 'YouTube Audio Player project preview';
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks[0].setAttribute('aria-label', isSpanish ? 'Ver proyecto CollecTV' : 'View CollecTV project');
  projectLinks[1].setAttribute('aria-label', isSpanish ? 'Ver proyecto YouTube Audio Player' : 'View YouTube Audio Player project');
  languageButtons.forEach((button) => {
    const active = button.lang === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = button.lang.toUpperCase();
  });
  syncThemeButton();
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.lang)));
setLanguage('en');
