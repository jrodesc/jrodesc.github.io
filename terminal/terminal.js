const root = document.documentElement;
const output = document.querySelector('#terminal-output');
const form = document.querySelector('#terminal-form');
const input = document.querySelector('#terminal-input');
const status = document.querySelector('#terminal-status');
const langButton = document.querySelector('#language-control');
const themeButton = document.querySelector('#theme-control');
let language = 'en';
let history = [];
let historyIndex = 0;

const profile = {
  en: {
    welcome: 'Welcome to Jose Luis Rodríguez’s portfolio terminal.',
    hint: "Type 'help' for commands. Use up/down arrows for history, Tab to complete, Ctrl/Cmd+L to clear.",
    bar: 'PORTFOLIO TERMINAL', gui: 'GUI VERSION', foot: 'HTML / CSS / JAVASCRIPT', inspiration: 'Thanks to Noah Kim for the inspiration:',
    unknown: (command) => `Command not found: ${command}. Type 'help' to see available commands.`,
    helpTitle: 'AVAILABLE COMMANDS',
    help: [
      ['help', 'Show available commands'], ['ls', 'List portfolio sections'], ['about', 'About Jose Luis'],
      ['experience', 'Work experience'], ['projects', 'Selected projects'], ['skills', 'Languages and CS skills'],
      ['cv', 'Download the CV'], ['email', 'Send an email'], ['github', 'Open GitHub profile'],
      ['linkedin', 'Open LinkedIn profile'], ['theme', 'Toggle light / dark theme'], ['lang en|es', 'Set interface language'],
      ['gui', 'Open the visual portfolio'], ['clear', 'Clear this terminal'],
    ],
    list: 'about  experience  projects  skills  cv  email  github  linkedin  theme  lang  gui  clear  help',
    aboutTitle: 'ABOUT',
    about: 'Jose Luis Rodríguez is a software engineer based in Almeria, Spain. He enjoys learning about systems and software, and works across the stack from data models to interface details.',
    experienceTitle: 'EXPERIENCE',
    jobs: [
      ['Software Engineer', 'Acciosoft', 'December 2025 — March 2026', 'El Ejido, Spain / Software engineering', 'Built and maintained websites for professional clients, from landing pages to full e-commerce sites, managing each project through its lifecycle. Also developed reusable Angular components for internal projects and connected front ends to company REST APIs through Laravel (PHP).', 'Angular · Laravel / PHP · REST APIs'],
      ['IT Technician', 'Altec', 'April 2025 — June 2025', 'Almeria, Spain / IT consulting', 'Implemented Java CRUD operations and business logic, designed MySQL queries for data management and reporting, and connected front end and back end using jQuery and AJAX.', 'Java · MySQL · jQuery · AJAX'],
      ['IT Technician', 'Andalusian Digital Agency', 'September 2023 — January 2024', 'Andalusia, Spain / IT support', 'Provided help desk support, diagnosed hardware, software, and network issues, repaired and maintained PCs, and installed and configured software on staff laptops.', 'Help desk · Hardware · Networking · Software setup'],
    ],
    projectsTitle: 'SELECTED PROJECTS',
    projects: [
      ['CollecTV', '2026', 'A working e-commerce website for a small business focused on geek culture. Built with Laravel, Angular 2, Bootstrap, and MariaDB.', 'Laravel · Angular 2 · MariaDB', 'https://joselu.teconecto.es', '../imgs/CollecTV.png'],
      ['YouTube Audio Player', '2026', 'An open-source desktop audio player that fetches YouTube videos and streams their audio. Still in progress; Windows support is incomplete.', 'Python · PyQt6 · CSS', 'https://github.com/jrodesc/audio-proyect', '../imgs/yt-audio-player.png'],
    ],
    skillsTitle: 'SKILLS',
    skills: [
      ['Languages', 'TypeScript / JavaScript · Python · Java · SQL · HTML · CSS'],
      ['Engineering', 'Data structures and algorithms · Object-oriented design · Distributed systems · API design · Testing and debugging'],
      ['Tools and platforms', 'Angular 2 · Node.js · MariaDB / MySQL · Git · GitHub · Docker · Linux · AWS'],
      ['Working style', 'Technical writing · Code review · Agile collaboration · Accessibility · Product thinking'],
    ],
    cv: 'Download Jose Luis Rodríguez’s CV', email: 'Email Jose Luis', github: 'Jose Luis on GitHub', linkedin: 'Jose Luis on LinkedIn', guiLink: 'Open GUI portfolio',
    themeLight: 'LIGHT', themeDark: 'DARK', languageSet: 'Language set to English.', languageEs: 'Language set to Spanish.',
    errorLang: "Use 'lang en' or 'lang es'.", aboutEnd: 'Curious by nature. Engineer by practice.',
  },
  es: {
    welcome: 'Bienvenido al terminal del portfolio de Jose Luis Rodríguez.',
    hint: "Escribe 'help' para ver los comandos. Usa las flechas arriba/abajo para el historial, Tab para autocompletar y Ctrl/Cmd+L para limpiar.",
    bar: 'TERMINAL DEL PORTFOLIO', gui: 'VERSIÓN VISUAL', foot: 'HTML / CSS / JAVASCRIPT', inspiration: 'Gracias a Noah Kim por la inspiración:',
    unknown: (command) => `Comando no encontrado: ${command}. Escribe 'help' para ver los comandos.`,
    helpTitle: 'COMANDOS DISPONIBLES',
    help: [
      ['help', 'Mostrar los comandos disponibles'], ['ls', 'Listar secciones del portfolio'], ['about', 'Sobre Jose Luis'],
      ['experience', 'Experiencia laboral'], ['projects', 'Proyectos destacados'], ['skills', 'Lenguajes y habilidades de informática'],
      ['cv', 'Descargar el currículum'], ['email', 'Enviar un correo'], ['github', 'Abrir el perfil de GitHub'],
      ['linkedin', 'Abrir el perfil de LinkedIn'], ['theme', 'Alternar tema claro / oscuro'], ['lang en|es', 'Cambiar el idioma'],
      ['gui', 'Abrir el portfolio visual'], ['clear', 'Limpiar el terminal'],
    ],
    list: 'about  experience  projects  skills  cv  email  github  linkedin  theme  lang  gui  clear  help',
    aboutTitle: 'SOBRE MÍ',
    about: 'Jose Luis Rodríguez es ingeniero de software y vive en Almería, España. Le gusta aprender sobre sistemas y desarrollo, y trabaja en distintas capas, desde modelos de datos hasta interfaces.',
    experienceTitle: 'EXPERIENCIA',
    jobs: [
      ['Ingeniero de software', 'Acciosoft', 'Diciembre 2025 — Marzo 2026', 'El Ejido, España / Ingeniería de software', 'Desarrollé y mantuve sitios web para clientes profesionales, desde páginas de aterrizaje hasta tiendas en línea completas, y gestioné el ciclo de vida de cada proyecto. También desarrollé componentes reutilizables con Angular para proyectos internos y conecté el front-end con las API REST de la empresa mediante Laravel (PHP).', 'Angular · Laravel / PHP · API REST'],
      ['Técnico informático', 'Altec', 'Abril 2025 — Junio 2025', 'Almería, España / Consultoría informática', 'Implementé operaciones CRUD y lógica de negocio en Java, diseñé consultas MySQL para gestionar y reportar datos y conecté el front-end con el back-end mediante jQuery y AJAX.', 'Java · MySQL · jQuery · AJAX'],
      ['Técnico informático', 'Agencia Digital de Andalucía', 'Septiembre 2023 — Enero 2024', 'Andalucía, España / Soporte informático', 'Presté soporte de help desk a usuarios, diagnostiqué incidencias de hardware, software y conectividad, reparé y mantuve equipos e instalé y configuré software en portátiles para dejarlos listos para el trabajo.', 'Help desk · Hardware · Redes · Configuración de software'],
    ],
    projectsTitle: 'PROYECTOS DESTACADOS',
    projects: [
      ['CollecTV', '2026', 'Tienda en línea funcional para un pequeño negocio dedicado a la cultura geek. Creada con Laravel, Angular 2, Bootstrap y MariaDB.', 'Laravel · Angular 2 · MariaDB', 'https://joselu.teconecto.es', '../imgs/CollecTV.png'],
      ['YouTube Audio Player', '2026', 'Reproductor de audio de código abierto que obtiene vídeos de YouTube y reproduce su audio. Sigue en desarrollo; la compatibilidad con Windows está incompleta.', 'Python · PyQt6 · CSS', 'https://github.com/jrodesc/audio-proyect', '../imgs/yt-audio-player.png'],
    ],
    skillsTitle: 'HABILIDADES',
    skills: [
      ['Lenguajes', 'TypeScript / JavaScript · Python · Java · SQL · HTML · CSS'],
      ['Ingeniería', 'Estructuras de datos y algoritmos · Diseño orientado a objetos · Sistemas distribuidos · Diseño de API · Pruebas y depuración'],
      ['Herramientas y plataformas', 'Angular 2 · Node.js · MariaDB / MySQL · Git · GitHub · Docker · Linux · AWS'],
      ['Forma de trabajo', 'Documentación técnica · Revisión de código · Colaboración ágil · Accesibilidad · Visión de producto'],
    ],
    cv: 'Descargar el currículum de Jose Luis Rodríguez', email: 'Escribir a Jose Luis', github: 'GitHub de Jose Luis', linkedin: 'LinkedIn de Jose Luis', guiLink: 'Abrir portfolio visual',
    themeLight: 'CLARO', themeDark: 'OSCURO', languageSet: 'Idioma cambiado a inglés.', languageEs: 'Idioma cambiado a español.',
    errorLang: "Usa 'lang en' o 'lang es'.", aboutEnd: 'Curioso por naturaleza. Ingeniero por vocación.',
  },
};

const routes = {
  email: 'mailto:jrodesc1511@gmail.com',
  github: 'https://github.com/jrodesc',
  linkedin: 'https://www.linkedin.com/in/jose-luis-rodriguez-escobar-219b12284',
};

function safe(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function add(html, className = '') {
  const row = document.createElement('p');
  row.className = `output-line ${className}`.trim();
  row.innerHTML = html;
  output.append(row);
  return row;
}

function heading(text) {
  add(safe(text), 'section-title');
}

function link(url, text, download = false) {
  return `<a href="${url}"${download ? ` download="${safe(download)}"` : ' target="_blank" rel="noopener noreferrer"'}>${safe(text)}</a>`;
}

function setLanguage(next) {
  language = next;
  root.lang = next;
  const t = profile[language];
  langButton.textContent = language.toUpperCase();
  langButton.setAttribute('aria-label', language === 'en' ? 'Change language to Spanish' : 'Cambiar idioma a inglés');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t[element.dataset.i18n];
  });
}

function syncTheme() {
  const isDark = root.dataset.theme === 'dark';
  themeButton.textContent = isDark ? profile[language].themeLight : profile[language].themeDark;
  themeButton.setAttribute('aria-label', language === 'en'
    ? `Switch to ${isDark ? 'light' : 'dark'} theme`
    : `Cambiar al tema ${isDark ? 'claro' : 'oscuro'}`);
}

function showHelp() {
  const t = profile[language];
  heading(t.helpTitle);
  t.help.forEach(([name, description]) => add(`<span class="entry-title">${safe(name)}</span><span class="entry-meta"> — ${safe(description)}</span>`));
}

function showExperience() {
  const t = profile[language];
  heading(t.experienceTitle);
  t.jobs.forEach(([role, company, dates, place, description, tags]) => {
    add(`<span class="entry-title">${safe(role)}</span> <span class="entry-meta">@ ${safe(company)} / ${safe(dates)}</span><br><span class="entry-meta">${safe(place)}</span><br><span class="entry-body">${safe(description)}</span><br><span class="entry-tags">${safe(tags)}</span>`, 'entry');
  });
}

function showProjects() {
  const t = profile[language];
  heading(t.projectsTitle);
  t.projects.forEach(([name, year, description, tags, url, imageUrl]) => {
    const previewAlt = language === 'es' ? `Vista previa de ${name}` : `${name} project preview`;
    add(`<span class="entry-title">${safe(name)}</span> <span class="entry-meta">/ ${safe(year)}</span><br><span class="entry-body">${safe(description)}</span><br><img class="project-preview" src="${safe(imageUrl)}" alt="${safe(previewAlt)}"><span class="entry-tags">${safe(tags)}</span><br>${link(url, language === 'es' ? 'Ver proyecto' : 'View project')}`, 'project-entry');
  });
}

function showSkills() {
  const t = profile[language];
  heading(t.skillsTitle);
  t.skills.forEach(([name, items]) => add(`<span class="entry-title">${safe(name)}</span><br><span class="entry-body">${safe(items)}</span>`, 'entry'));
}

function execute(raw) {
  const command = raw.trim();
  if (!command) return;
  add(`<span class="prompt-user">jose@portfolio</span><span class="prompt-path">:~</span><span class="prompt-mark">$</span> ${safe(command)}`, 'prompt-line');
  const [name, ...args] = command.split(/\s+/);
  const t = profile[language];
  switch (name.toLowerCase()) {
    case 'help': case '?': showHelp(); break;
    case 'ls': add(safe(t.list)); break;
    case 'about': heading(t.aboutTitle); add(`${safe(t.about)}<br><span class="entry-meta">${safe(t.aboutEnd)}</span>`); break;
    case 'experience': showExperience(); break;
    case 'projects': showProjects(); break;
    case 'skills': showSkills(); break;
    case 'cv': {
      const spanish = language === 'es';
      const filename = spanish ? 'cv_jose_luis_es.pdf' : 'cv_jose_luis_en.pdf';
      const path = spanish
        ? '../resume/cv_jose_luis_es%20%281%29.pdf'
        : '../resume/cv_jose_luis_en%20%281%29.pdf';
      add(link(path, t.cv, filename));
      break;
    }
    case 'email': case 'github': case 'linkedin': add(link(routes[name.toLowerCase()], t[name.toLowerCase()])); break;
    case 'gui': add(link('../index.html', t.guiLink)); break;
    case 'theme': root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('portfolio-theme', root.dataset.theme); syncTheme(); break;
    case 'lang': {
      const next = args[0]?.toLowerCase();
      if (next !== 'en' && next !== 'es') { add(safe(t.errorLang)); break; }
      setLanguage(next); syncTheme(); add(safe(profile[next].languageSet)); break;
    }
    case 'clear': output.replaceChildren(); break;
    default: add(safe(t.unknown(command)));
  }
  status.textContent = output.lastElementChild?.textContent || command;
  output.scrollTop = output.scrollHeight;
}

function completeCommand() {
  const commands = ['about', 'clear', 'cv', 'email', 'experience', 'github', 'gui', 'help', 'lang', 'linkedin', 'ls', 'projects', 'skills', 'theme'];
  const value = input.value.trim().toLowerCase();
  const matches = commands.filter((command) => command.startsWith(value));
  if (matches.length === 1) input.value = matches[0];
  else if (matches.length > 1) { add(safe(matches.join('    ')), 'hint'); output.scrollTop = output.scrollHeight; }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const command = input.value;
  if (command.trim()) {
    history.push(command);
    historyIndex = history.length;
    execute(command);
  }
  input.value = '';
  input.focus();
});

document.querySelector('.terminal-screen').addEventListener('click', (event) => {
  if (!event.target.closest('a, button, input')) input.focus();
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex] || '';
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || '';
  } else if (event.key === 'Tab') {
    event.preventDefault();
    completeCommand();
  } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    output.replaceChildren();
  }
});

langButton.addEventListener('click', () => {
  setLanguage(language === 'en' ? 'es' : 'en');
  syncTheme();
});
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  syncTheme();
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
setLanguage('en');
syncTheme();
add(safe(profile.en.welcome), 'welcome');
add(safe(profile.en.hint), 'hint');
input.focus();
