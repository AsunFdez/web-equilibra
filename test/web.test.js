
/**
 * Pruebas sencillas para la web Equilibra.
 *
 * Se ejecutan con Node.js, sin instalar dependencias:
 *   node --test web.test.js
 *
 * Comprueba la estructura principal de index.html y algunos
 * comportamientos de script.js mediante un DOM mínimo simulado.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
const deletionHtml = fs.readFileSync(
  path.join(ROOT, 'eliminar-cuenta.html'),
  'utf8'
);
const deletionScript = fs.readFileSync(
  path.join(ROOT, 'eliminar-cuenta.js'),
  'utf8'
);

function createClassList() {
  const classes = new Set();

  return {
    add(name) {
      classes.add(name);
    },
    remove(name) {
      classes.delete(name);
    },
    contains(name) {
      return classes.has(name);
    },
    toggle(name, force) {
      const shouldAdd = force === undefined
        ? !classes.has(name)
        : Boolean(force);

      if (shouldAdd) classes.add(name);
      else classes.delete(name);

      return shouldAdd;
    },
  };
}

function createElement(dataset = {}) {
  const attributes = new Map();
  const listeners = new Map();

  return {
    dataset,
    style: {},
    classList: createClassList(),
    textContent: '',
    innerHTML: '',
    focused: false,

    addEventListener(eventName, callback) {
      if (!listeners.has(eventName)) {
        listeners.set(eventName, []);
      }
      listeners.get(eventName).push(callback);
    },

    dispatch(eventName, event = {}) {
      for (const callback of listeners.get(eventName) || []) {
        callback({ target: this, ...event });
      }
    },

    setAttribute(name, value) {
      attributes.set(name, String(value));
    },

    getAttribute(name) {
      return attributes.has(name) ? attributes.get(name) : null;
    },

    focus() {
      this.focused = true;
    },

    contains(element) {
      return element === this;
    },
  };
}

function createBrowserEnvironment() {
  const menuToggle = createElement();
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');

  const navLinks = createElement();
  const navLink = createElement();

  navLinks.querySelectorAll = (selector) =>
    selector === 'a' ? [navLink] : [];

  const currentButton = createElement({ period: 'current' });
  const previousButton = createElement({ period: 'previous' });

  currentButton.classList.add('is-active');
  currentButton.setAttribute('aria-pressed', 'true');
  previousButton.setAttribute('aria-pressed', 'false');

  const periodCaption = createElement();
  const demoBalance = createElement();
  const demoChange = createElement();
  const demoIncome = createElement();
  const demoExpenses = createElement();
  const currentYear = createElement();

  const bars = Array.from(
    { length: 5 },
    () => createElement()
  );

  const elements = new Map([
    ['.menu-toggle', menuToggle],
    ['.nav-links', navLinks],
    ['#period-caption', periodCaption],
    ['#demo-balance', demoBalance],
    ['#demo-change', demoChange],
    ['#demo-income', demoIncome],
    ['#demo-expenses', demoExpenses],
    ['#current-year', currentYear],
  ]);

  const documentListeners = new Map();
  const windowListeners = new Map();

  const document = {
    documentElement: {
      classList: createClassList(),
    },

    querySelector(selector) {
      return elements.get(selector) || null;
    },

    querySelectorAll(selector) {
      if (selector === '.period-button') {
        return [currentButton, previousButton];
      }

      if (selector === '.demo-bars .bar') {
        return bars;
      }

      return [];
    },

    addEventListener(eventName, callback) {
      if (!documentListeners.has(eventName)) {
        documentListeners.set(eventName, []);
      }
      documentListeners.get(eventName).push(callback);
    },

    dispatch(eventName, event = {}) {
      for (const callback of documentListeners.get(eventName) || []) {
        callback(event);
      }
    },
  };

  const window = {
    innerWidth: 1024,

    addEventListener(eventName, callback) {
      if (!windowListeners.has(eventName)) {
        windowListeners.set(eventName, []);
      }
      windowListeners.get(eventName).push(callback);
    },

    dispatch(eventName, event = {}) {
      for (const callback of windowListeners.get(eventName) || []) {
        callback(event);
      }
    },
  };

  vm.runInNewContext(script, { document, window });

  return {
    document,
    window,
    menuToggle,
    navLinks,
    navLink,
    currentButton,
    previousButton,
    periodCaption,
    demoBalance,
    demoChange,
    demoIncome,
    demoExpenses,
    currentYear,
    bars,
  };
}

// TEST 1: Estructura principal de la página

test('la página contiene sus secciones principales y carga script.js', () => {
  assert.match(html, /<title>Equilibra/);
  assert.match(html, /<main\b/);
  assert.match(html, /<script\s+src="script\.js"\s+defer\s*>/);

  for (const sectionId of [
    'inicio',
    'filosofia',
    'funciones',
    'demo',
    'bienestar',
    'demos',
  ]) {
    assert.match(
      html,
      new RegExp(`id="${sectionId}"`),
      `Debe existir la sección #${sectionId}`
    );
  }
});

test('la galería incluye vídeos reproducibles cuyos archivos están publicados', () => {
  const videos = [...html.matchAll(/<video\b([^>]*)>([\s\S]*?)<\/video>/g)];

  assert.equal(videos.length, 6);

  const sources = videos.map(([, attributes, content]) => {
    assert.match(attributes, /\bcontrols\b/);
    assert.match(attributes, /\bpreload="none"/);

    const source = content.match(
      /<source\s+src="([^"]+)"\s+type="video\/mp4">/
    );
    assert.ok(source, 'Cada vídeo debe tener una fuente MP4');

    const filePath = path.join(ROOT, source[1]);
    assert.ok(fs.existsSync(filePath), `Debe existir ${source[1]}`);
    return filePath;
  });

  assert.equal(new Set(sources).size, videos.length);
});

test('las políticas están publicadas, enlazadas y sin URLs pendientes', () => {
  const policyPages = [
    ['politica-privacidad.html', /Política de privacidad/],
    ['cookies.html', /Cookies y tecnologías/],
    ['terminos-condiciones.html', /Términos y condiciones/],
  ];

  for (const [fileName, heading] of policyPages) {
    const policyHtml = fs.readFileSync(path.join(ROOT, fileName), 'utf8');

    assert.match(html, new RegExp(`href="${fileName}"`));
    assert.match(policyHtml, heading);
    assert.doesNotMatch(policyHtml, /\[URL(?: de privacidad)?\]/i);
  }

  const terms = fs.readFileSync(
    path.join(ROOT, 'terminos-condiciones.html'),
    'utf8'
  );
  assert.match(
    terms,
    /https:\/\/asunfdez\.github\.io\/web-equilibra\/politica-privacidad\.html/
  );
  assert.match(
    terms,
    /https:\/\/asunfdez\.github\.io\/web-equilibra\/terminos-condiciones\.html/
  );
});

test('la página de eliminación aclara el alcance y prepara un correo revisable', () => {
  assert.match(html, /href="eliminar-cuenta\.html"/);
  assert.match(deletionHtml, /La cuenta de Google vinculada no se elimina/);
  assert.match(deletionHtml, /datos guardados únicamente en tu dispositivo/);
  assert.match(deletionHtml, /type="email"[^>]*required/);

  const form = createElement();
  const accountEmail = createElement();
  accountEmail.value = 'persona@example.com';
  const details = createElement();
  details.value = 'Quiero borrar mi cuenta.';
  const status = createElement();
  const elements = new Map([
    ['#deletion-request-form', form],
    ['#account-email', accountEmail],
    ['#request-details', details],
    ['#request-status', status],
  ]);
  const document = {
    querySelector(selector) {
      return elements.get(selector) || null;
    },
  };
  const window = { location: { href: '' } };

  vm.runInNewContext(deletionScript, { document, window });

  let prevented = false;
  form.dispatch('submit', {
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.match(window.location.href, /^mailto:asunfdezdiez@gmail\.com\?/);
  assert.match(decodeURIComponent(window.location.href), /persona@example\.com/);
  assert.match(decodeURIComponent(window.location.href), /Quiero borrar mi cuenta/);
  assert.match(status.textContent, /Revísala y envíala/);
});

// TEST 2: Apertura y cierre del menú móvil

test('el menú móvil se abre y se cierra actualizando sus atributos accesibles', () => {
  const app = createBrowserEnvironment();

  app.menuToggle.dispatch('click');

  assert.equal(app.menuToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(app.menuToggle.getAttribute('aria-label'), 'Cerrar menú');
  assert.equal(app.navLinks.classList.contains('is-open'), true);

  app.menuToggle.dispatch('click');

  assert.equal(app.menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(app.menuToggle.getAttribute('aria-label'), 'Abrir menú');
  assert.equal(app.navLinks.classList.contains('is-open'), false);
});

// TEST 3: Cierre del menú con la tecla Escape

test('el menú se cierra al pulsar Escape y devuelve el foco al botón', () => {
  const app = createBrowserEnvironment();

  app.menuToggle.dispatch('click');
  app.document.dispatch('keydown', { key: 'Escape' });

  assert.equal(app.menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(app.navLinks.classList.contains('is-open'), false);
  assert.equal(app.menuToggle.focused, true);
});

// TEST 4: Cierre del menú al seleccionar un enlace

test('al seleccionar un enlace de navegación se cierra el menú', () => {
  const app = createBrowserEnvironment();

  app.menuToggle.dispatch('click');
  app.navLink.dispatch('click');

  assert.equal(app.menuToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(app.navLinks.classList.contains('is-open'), false);
});

// TEST 5: Cambio al periodo anterior

test('el selector de periodo actualiza los datos del resumen financiero', () => {
  const app = createBrowserEnvironment();

  app.previousButton.dispatch('click');

  assert.match(app.demoBalance.innerHTML, /\+1\.138,60/);
  assert.equal(app.demoChange.textContent, '↗ 8,4%');
  assert.equal(app.demoIncome.textContent, '2.180,00 €');
  assert.equal(app.demoExpenses.textContent, '1.041,40 €');
  assert.equal(
    app.periodCaption.textContent,
    'Mayo · una vista de ejemplo'
  );

  assert.equal(app.previousButton.getAttribute('aria-pressed'), 'true');
  assert.equal(app.currentButton.getAttribute('aria-pressed'), 'false');
  assert.equal(app.previousButton.classList.contains('is-active'), true);

  assert.deepEqual(
    app.bars.map((bar) => bar.style.height),
    ['59%', '43%', '79%', '63%', '52%']
  );
});

// TEST 6: Regreso al periodo actual

test('el resumen permite volver al periodo actual', () => {
  const app = createBrowserEnvironment();

  app.previousButton.dispatch('click');
  app.currentButton.dispatch('click');

  assert.match(app.demoBalance.innerHTML, /\+1\.284,50/);
  assert.equal(app.demoChange.textContent, '↗ 12,8%');
  assert.equal(app.demoIncome.textContent, '2.250,00 €');
  assert.equal(app.demoExpenses.textContent, '965,50 €');
  assert.equal(
    app.periodCaption.textContent,
    'Junio · una vista de ejemplo'
  );

  assert.equal(app.currentButton.getAttribute('aria-pressed'), 'true');
  assert.equal(app.previousButton.getAttribute('aria-pressed'), 'false');

  assert.deepEqual(
    app.bars.map((bar) => bar.style.height),
    ['47%', '72%', '58%', '86%', '67%']
  );
});

// TEST 7: Actualización automática del año

test('el año del pie de página se rellena automáticamente', () => {
  const app = createBrowserEnvironment();

  assert.equal(
    String(app.currentYear.textContent),
    String(new Date().getFullYear())
  );
});
