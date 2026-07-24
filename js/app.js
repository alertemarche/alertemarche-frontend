/* ============================================================
   AlerteMarché — Front (vanilla JS) · Focus Bénin
   ============================================================ */

const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8080/api'
    : '/api';

/* -------- Icônes SVG (stroke currentColor) -------- */
const IC = {
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  helmet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20v2H2z"/><path d="M4 18v-3a8 8 0 0 1 16 0v3"/><path d="M12 4v3M9 5.2 10 8M15 5.2 14 8"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
  ngo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-1.5A4.5 4.5 0 0 1 6.5 15h5a4.5 4.5 0 0 1 4.5 4.5V21"/><path d="M18 21v-1a3 3 0 0 0-2-2.83"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
};

/* -------- Helpers -------- */
const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const token = () => localStorage.getItem('am_token');

async function api(path, { method = 'GET', body = null, auth = false } = {}) {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    if (auth && token()) headers['Authorization'] = 'Bearer ' + token();
    const res = await fetch(API_BASE + path, { method, headers, body: body ? JSON.stringify(body) : null });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.message || 'Erreur'), { data, status: res.status });
    return data;
}

/* -------- Sélecteur de pays --------
   Utilise de vraies images de drapeaux (flagcdn.com) car les emojis drapeaux
   ne s'affichent PAS sur Windows/Chrome (rendus en lettres « BJ », « TG »…).
   Le Bénin est actif ; Togo et Côte d'Ivoire sont proposés (« Bientôt »)
   pour les visiteurs de ces pays. Le choix est mémorisé dans localStorage. */
const AM_COUNTRIES = [
    {
        code: 'BJ', name: 'Bénin', cc: 'bj', available: true,
        color: '#008751',
        hero: 'img/amazone.jpg',
        heroTitle: 'au Bénin',
        heroLead: "Recevez par <b>e-mail</b> des alertes instantanées sur les opportunités de votre secteur.",
        armp: 'ARMP Bénin',
        mockInst: 'Autorité de Régulation des Marchés Publics - Bénin',
        mockObject: "Travaux de construction d'un bâtiment R+2",
        mockLoc: 'Cotonou',
    },
    {
        code: 'TG', name: 'Togo', cc: 'tg', available: true,
        color: '#006A4E',
        hero: 'img/hero-tg.jpg',
        heroTitle: 'au Togo',
        heroLead: "Recevez par <b>e-mail</b> des alertes instantanées sur les opportunités de votre secteur.",
        armp: 'ARMP Togo',
        mockInst: 'ARCOP Togo - Marchés Publics',
        mockObject: "Fourniture d'équipements informatiques",
        mockLoc: 'Lomé',
    },
    {
        code: 'CI', name: "Côte d'Ivoire", cc: 'ci', available: true,
        color: '#F77F00',
        hero: 'img/hero-ci.jpg',
        heroTitle: "en Côte d'Ivoire",
        heroLead: "Recevez par <b>e-mail</b> des alertes instantanées sur les opportunités de votre secteur.",
        armp: 'ANRMP Côte d\'Ivoire',
        mockInst: 'DGMP Côte d\'Ivoire',
        mockObject: "Réhabilitation de voirie urbaine",
        mockLoc: 'Abidjan',
    },
];
const flagImg = (cc, alt) =>
    `<img class="flag-img" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" width="22" height="16" alt="${alt}" loading="lazy">`;
const currentCountry = () => {
    const saved = localStorage.getItem('am_country');
    return AM_COUNTRIES.find((c) => c.code === saved && c.available) || AM_COUNTRIES[0];
};
/* Code pays courant (BJ/TG/CI) — utilisé pour filtrer les appels API. */
const amCode = () => currentCountry().code;
/* Métadonnées du pays courant (nom, hero, drapeau, régulateur…). */
const amMeta = () => currentCountry();
/* Exposition globale pour les scripts inline des différentes pages. */
window.amCode = amCode;
window.amMeta = amMeta;
window.AM_COUNTRIES = AM_COUNTRIES;
/* Retourne l'entrée pays correspondant à un code (BJ/TG/CI), défaut Bénin. */
const amByCode = (code) =>
    AM_COUNTRIES.find((c) => c.code === (code || '').toUpperCase()) || AM_COUNTRIES[0];
/* Génère le badge pays (pastille colorée + drapeau) affiché sur les cartes d'appels d'offres. */
const countryBadge = (code) => {
    const c = amByCode(code);
    return `<span class="country-pill" style="background:${c.color}">` +
        `<img src="https://flagcdn.com/w20/${c.cc}.png" srcset="https://flagcdn.com/w40/${c.cc}.png 2x" width="16" height="11" alt="" loading="lazy">` +
        `${c.name}</span>`;
};
window.amByCode = amByCode;
window.countryBadge = countryBadge;
function countrySelector() {
    const cur = currentCountry();
    const opts = AM_COUNTRIES.map((c) => `
        <button type="button" class="country-opt ${c.code === cur.code ? 'active' : ''} ${c.available ? '' : 'soon'}"
                data-country="${c.code}" ${c.available ? '' : 'aria-disabled="true"'}>
          ${flagImg(c.cc, c.name)}
          <span class="country-opt-name">${c.name}</span>
          ${c.available ? (c.code === cur.code ? `<span class="country-opt-check">${IC.check}</span>` : '') : '<span class="country-opt-soon">Bientôt</span>'}
        </button>`).join('');
    return `
      <div class="country-select" id="countrySelect">
        <button type="button" class="country-badge" id="countryBadge" title="Changer de pays" aria-haspopup="true" aria-expanded="false">
          ${flagImg(cur.cc, cur.name)}
          <span class="country-badge-name">${cur.name}</span>
          <span class="caret">▼</span>
        </button>
        <div class="country-menu" id="countryMenu">
          <div class="country-menu-head">Choisissez votre pays</div>
          ${opts}
          <a href="/country-select.html?choose=1" class="country-menu-more">Voir la page de sélection →</a>
        </div>
      </div>`;
}

/* -------- Header -------- */
function renderNav() {
    const path = location.pathname.split('/').pop() || '/index';
    // Repère la page courante en tenant compte du paramètre de procédure
    // (/procedures?p=…) afin de surligner la bonne sous-catégorie.
    const params = new URLSearchParams(location.search);
    const current = path + (path === '/procedures' && params.get('p') ? '?p=' + params.get('p') : '');
    const isActive = (h) => (h === current || h === path) ? 'active' : '';

    // Menu simplifié : « Marchés publics » et « Marchés privés » sont des liens
    // directs. En cliquant sur « Marchés publics », l'utilisateur accède
    // directement à la page regroupant l'ENSEMBLE des marchés publics, qu'il
    // peut ensuite affiner grâce aux filtres (catégories, mots-clés, type,
    // institution, localisation, budget, dates). Plus de sous-catégories.
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container header-inner">
        <a href="/index" class="brand">
          <span class="brand-mark">${IC.bell}</span>
          <span class="brand-lines">
            <span class="brand-text">Alerte<span class="brand-accent">Marché</span></span>
            <span class="brand-tag">Opportunités • Veille • Croissance</span>
          </span>
        </a>
        ${countrySelector()}
        <nav class="main-nav" id="mainNav">
          <a href="/index" class="${isActive('/index')}">Accueil</a>
          <a href="/appels-offres-publics" class="${isActive('/appels-offres-publics')}">Marchés publics</a>
          <a href="/appels-offres-prives" class="${isActive('/appels-offres-prives')}">Marchés privés</a>
          <a href="/publier" class="nav-publier ${isActive('/publier')}">📢 Publier une annonce</a>
          <a href="/tarifs" class="${isActive('/tarifs')}">Abonnement</a>
          <a href="/inscription" class="nav-auth-mobile ${isActive('/inscription')}">Créer un compte</a>
          <a href="/connexion" class="nav-auth-mobile ${isActive('/connexion')}">Se connecter</a>
        </nav>
        <div class="header-actions">
          <a href="/connexion" class="btn btn-outline btn-sm">${IC.user}<span>Se connecter</span></a>
          <a href="/inscription" class="btn btn-primary btn-sm">S'inscrire gratuitement</a>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>`;
    document.body.prepend(header);
    $('#navToggle')?.addEventListener('click', () => $('#mainNav').classList.toggle('open'));

    // -------- Sélecteur de pays --------
    const cBadge = $('#countryBadge');
    const cSelect = $('#countrySelect');
    if (cBadge && cSelect) {
        cBadge.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = cSelect.classList.toggle('open');
            cBadge.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // Sélection d'un pays
        $$('.country-opt', cSelect).forEach((opt) => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = opt.getAttribute('data-country');
                const country = AM_COUNTRIES.find((c) => c.code === code);
                if (!country) return;
                if (!country.available) {
                    // Pays pas encore disponible : message informatif, pas de changement.
                    alert(`${country.name} sera bientôt disponible sur AlerteMarché.\n\nNous travaillons à l'ouverture de ce pays. Restez connecté !`);
                    return;
                }
                localStorage.setItem('am_country', code);
                location.reload();
            });
        });
        // Fermer au clic extérieur
        document.addEventListener('click', () => {
            cSelect.classList.remove('open');
            cBadge.setAttribute('aria-expanded', 'false');
        });
    }
}

/* -------- Footer -------- */
/* Change le pays courant et recharge la page (utilisé par le pied de page). */
function amSetCountry(code) {
    const c = amByCode(code);
    localStorage.setItem('am_country', c.code);
    location.reload();
}
window.amSetCountry = amSetCountry;

function renderFooter() {
    const cur = amCode();
    const countryLinks = AM_COUNTRIES.map((c) =>
        `<a href="#" class="footer-country${c.code === cur ? ' active' : ''}" data-country="${c.code}" ` +
        `onclick="amSetCountry('${c.code}');return false;">` +
        `<img src="https://flagcdn.com/w20/${c.cc}.png" srcset="https://flagcdn.com/w40/${c.cc}.png 2x" width="18" height="12" alt="">` +
        `${c.name}</a>`).join('');
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand"><span class="brand-mark">${IC.bell}</span> Alerte<b style="color:#fff">Marché</b></div>
            <p>La plateforme de référence pour la veille des appels d'offres en Afrique de l'Ouest. Recevez les meilleures opportunités par e-mail, en temps réel.</p>
          </div>
          <div class="footer-col">
            <h4>Plateforme</h4>
            <a href="/appels-offres-publics">Marchés publics</a>
            <a href="/appels-offres-prives">Marchés privés</a>
            <a href="/tarifs">Abonnement</a>
          </div>
          <div class="footer-col">
            <h4>Compte</h4>
            <a href="/inscription">Créer un compte</a>
            <a href="/connexion">Se connecter</a>
          </div>
          <div class="footer-col">
            <h4>Informations</h4>
            <a href="/contact">Contact</a>
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/confidentialite">Confidentialité</a>
            <a href="/cgu">CGU</a>
          </div>
        </div>
        <div class="footer-countries">
          <span class="footer-countries-label">🌍 Nos pays couverts :</span>
          ${countryLinks}
        </div>
        <div class="footer-bottom">
          <span>© 2026 AlerteMarché. Tous droits réservés.</span>
          <span>alertemarche.com</span>
        </div>
      </div>`;
    document.body.appendChild(f);
}

/* -------- FAQ accordéon -------- */
function initFaq() {
    $$('.faq-q').forEach((q) => q.addEventListener('click', () => q.parentElement.classList.toggle('open')));
}

/* -------- Init global -------- */
document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.dataset.noChrome) {
        renderNav();
        renderFooter();
    }
    initFaq();
    if (typeof initPage === 'function') initPage();
});
