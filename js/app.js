/* ============================================================
   AlerteMarché — Front (vanilla JS)
   ============================================================ */

// URL de l'API : même origine en production (proxy Nginx), sinon localhost.
const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8080/api'
    : '/api';

const COUNTRIES = {
    BJ: { name: 'Bénin', flag: '🇧🇯' },
    TG: { name: 'Togo', flag: '🇹🇬' },
    CI: { name: "Côte d'Ivoire", flag: '🇨🇮' },
};

const PROFILES = {
    prestataire:  { label: 'Prestataires', emoji: '🏢', base: 50000,  promo: 25000, desc: 'Entreprises & PME' },
    artisan:      { label: 'Artisans',     emoji: '🛠️', base: 10000,  promo: 5000,  desc: 'Auto-entrepreneurs' },
    admin_public: { label: 'Administration', emoji: '🏛️', base: 150000, promo: 75000, desc: 'Ministères, mairies' },
    ong:          { label: 'ONG',          emoji: '🤝', base: 150000, promo: 75000, desc: 'Agences & humanitaire' },
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

/* -------- Navbar + Footer injectés -------- */
function renderNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    const links = [
        ['index.html', 'Accueil'],
        ['appels-offres-publics.html', "Appels d'offres publics"],
        ['appels-offres-prives.html', "Appels d'offres privés"],
        ['artisans.html', 'Artisans & Prestataires'],
        ['tarifs.html', 'Tarifs'],
        ['ressources.html', 'Ressources'],
    ];
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML = `
      <div class="container nav__inner">
        <a href="index.html" class="brand">
          <span class="brand__mark">🔔</span>
          <span>Alerte<b>Marché</b></span>
        </a>
        <ul class="nav__links" id="navLinks">
          ${links.map(([h, t]) => `<li><a href="${h}" class="${h === path ? 'active' : ''}">${t}</a></li>`).join('')}
        </ul>
        <div class="nav__actions">
          <span class="nav__geo" id="geoBadge" title="Pays détecté">🌍 …</span>
          <a href="connexion.html" class="btn btn--ghost btn--sm">Connexion</a>
          <a href="inscription.html" class="btn btn--primary btn--sm">S'inscrire</a>
          <button class="nav__toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>`;
    document.body.prepend(nav);
    $('#navToggle')?.addEventListener('click', () => $('#navLinks').classList.toggle('open'));
}

function renderFooter() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand"><span class="brand__mark">🔔</span> Alerte<b style="color:#fff">Marché</b></div>
            <p style="max-width:320px;font-size:.9rem;">La plateforme de référence pour la veille des appels d'offres en Afrique de l'Ouest. Opportunités • Veille • Croissance.</p>
            <p class="footer__flags mt-2">🇧🇯 Bénin &nbsp; 🇹🇬 Togo &nbsp; 🇨🇮 Côte d'Ivoire</p>
          </div>
          <div>
            <h4>Plateforme</h4>
            <a href="appels-offres-publics.html">Appels d'offres publics</a>
            <a href="appels-offres-prives.html">Appels d'offres privés</a>
            <a href="artisans.html">Artisans & Prestataires</a>
            <a href="tarifs.html">Tarifs</a>
          </div>
          <div>
            <h4>Ressources</h4>
            <a href="ressources.html">Blog & Guides</a>
            <a href="ressources.html#faq">FAQ</a>
            <a href="inscription.html">Créer un compte</a>
            <a href="connexion.html">Se connecter</a>
          </div>
          <div>
            <h4>PRO BENIN SARL</h4>
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">CGU</a>
            <a href="mailto:info@alertemarche.com">info@alertemarche.com</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 AlerteMarché — PRO BENIN SARL. Tous droits réservés.</span>
          <span>Édité au Bénin • alertemarche.com</span>
        </div>
      </div>`;
    document.body.appendChild(f);
}

/* -------- Géolocalisation -------- */
async function detectCountry() {
    let code = localStorage.getItem('am_country');
    if (!code) {
        try {
            const geo = await api('/geo/detect');
            code = geo.country_code || 'BJ';
        } catch { code = 'BJ'; }
        localStorage.setItem('am_country', code);
    }
    const c = COUNTRIES[code] || COUNTRIES.BJ;
    const badge = $('#geoBadge');
    if (badge) badge.textContent = `${c.flag} ${c.name}`;
    document.dispatchEvent(new CustomEvent('am:country', { detail: code }));
    return code;
}

function setCountry(code) {
    localStorage.setItem('am_country', code);
    const c = COUNTRIES[code] || COUNTRIES.BJ;
    const badge = $('#geoBadge');
    if (badge) badge.textContent = `${c.flag} ${c.name}`;
    document.dispatchEvent(new CustomEvent('am:country', { detail: code }));
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
        detectCountry();
    }
    initFaq();
});
