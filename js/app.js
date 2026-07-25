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
/* ============================================================
   Configuration SEO par pays pour le référencement Google
   ============================================================ */
const SEO_CONFIG = {
    BJ: {
        keywords: 'appels d\'offres Bénin, marchés publics Bénin, DNCMP, ARMP Bénin, soumission Bénin, appel à concurrence Bénin, marché public Cotonou, opportunités Bénin',
        homeTitle: 'Appels d\'Offres Bénin 🇧🇯 | Marchés Publics & DNCMP | AlerteMarché',
        homeDesc: 'Recevez TOUS les appels d\'offres publics et privés du Bénin en temps réel. Surveillance 24/7 de la DNCMP, ARMP et bailleurs. Plus de 4000 marchés actifs.',
        publicTitle: 'Marchés Publics Bénin 🇧🇯 | DNCMP & ARMP | 4000+ Appels d\'Offres',
        publicDesc: 'Tous les appels d\'offres publics du Bénin : DNCMP, ministères, agences. Alertes email automatiques sur les opportunités qui vous concernent.',
        priveTitle: 'Marchés Privés Bénin 🇧🇯 | ONG & Bailleurs Internationaux',
        priveDesc: 'Appels d\'offres privés au Bénin : PNUD, Banque Mondiale, BAD, UE. Consultations d\'ONG et organismes internationaux en temps réel.',
        schema: { region: 'BJ', city: 'Cotonou' }
    },
    TG: {
        keywords: 'appels d\'offres Togo, marchés publics Togo, DNCCP Togo, ARCOP Togo, soumission Togo, appel à concurrence Togo, marché public Lomé, opportunités Togo',
        homeTitle: 'Appels d\'Offres Togo 🇹🇬 | Marchés Publics & DNCCP | AlerteMarché',
        homeDesc: 'Recevez tous les appels d\'offres publics et privés du Togo en temps réel. Surveillance 24/7 de la DNCCP, ARCOP et bailleurs internationaux.',
        publicTitle: 'Marchés Publics Togo 🇹🇬 | DNCCP & ARCOP | Appels d\'Offres',
        publicDesc: 'Tous les appels d\'offres publics du Togo : DNCCP, ministères, agences publiques. Alertes email automatiques personnalisées.',
        priveTitle: 'Marchés Privés Togo 🇹🇬 | ONG & Bailleurs Internationaux',
        priveDesc: 'Appels d\'offres privés au Togo : PNUD, Banque Mondiale, BAD, UE. Consultations d\'ONG et organismes internationaux.',
        schema: { region: 'TG', city: 'Lomé' }
    },
    CI: {
        keywords: 'appels d\'offres Côte d\'Ivoire, marchés publics CI, ARCOP, ANRMP, DGMP, soumission Côte d\'Ivoire, marché public Abidjan, opportunités CI',
        homeTitle: 'Appels d\'Offres Côte d\'Ivoire 🇨🇮 | Marchés Publics & ARCOP',
        homeDesc: 'Recevez tous les appels d\'offres publics et privés de Côte d\'Ivoire en temps réel. Surveillance 24/7 de l\'ARCOP, DGMP et bailleurs internationaux.',
        publicTitle: 'Marchés Publics Côte d\'Ivoire 🇨🇮 | ARCOP & ANRMP',
        publicDesc: 'Tous les appels d\'offres publics de Côte d\'Ivoire : ARCOP (ex-ANRMP), ministères, agences. Alertes email automatiques.',
        priveTitle: 'Marchés Privés Côte d\'Ivoire 🇨🇮 | ONG & Bailleurs',
        priveDesc: 'Appels d\'offres privés en Côte d\'Ivoire : PNUD, Banque Mondiale, BAD, UE. Consultations d\'ONG et organismes internationaux.',
        schema: { region: 'CI', city: 'Abidjan' }
    },
    SN: {
        keywords: 'appels d\'offres Sénégal, marchés publics Sénégal, DCMP Sénégal, ARMP Sénégal, soumission Sénégal, appel à concurrence Sénégal, marché public Dakar, opportunités Sénégal',
        homeTitle: 'Appels d\'Offres Sénégal 🇸🇳 | Marchés Publics & DCMP | AlerteMarché',
        homeDesc: 'Recevez tous les appels d\'offres publics et privés du Sénégal en temps réel. Surveillance 24/7 de la DCMP, ARMP et bailleurs internationaux.',
        publicTitle: 'Marchés Publics Sénégal 🇸🇳 | DCMP & ARMP | Appels d\'Offres',
        publicDesc: 'Tous les appels d\'offres publics du Sénégal : DCMP, ministères, agences publiques. Alertes email automatiques personnalisées.',
        priveTitle: 'Marchés Privés Sénégal 🇸🇳 | ONG & Bailleurs Internationaux',
        priveDesc: 'Appels d\'offres privés au Sénégal : PNUD, Banque Mondiale, BAD, UE. Consultations d\'ONG et organismes internationaux.',
        schema: { region: 'SN', city: 'Dakar' }
    }
};

/* Met à jour dynamiquement les meta tags SEO selon le pays */
function updateSeoMeta(page = 'home') {
    const cc = amCode();
    const seo = SEO_CONFIG[cc];
    if (!seo) return;
    
    // Title
    const titles = { home: seo.homeTitle, public: seo.publicTitle, prive: seo.priveTitle };
    const title = titles[page] || seo.homeTitle;
    document.title = title;
    
    // Description
    const descs = { home: seo.homeDesc, public: seo.publicDesc, prive: seo.priveDesc };
    const desc = descs[page] || seo.homeDesc;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
    
    // Keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
        metaKeys = document.createElement('meta');
        metaKeys.name = 'keywords';
        document.head.appendChild(metaKeys);
    }
    metaKeys.content = seo.keywords;
    
    // Open Graph
    updateOgTag('og:title', title);
    updateOgTag('og:description', desc);
    updateOgTag('og:url', window.location.href);
    updateOgTag('og:type', 'website');
    updateOgTag('og:locale', 'fr_FR');
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', desc);
}

function updateOgTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.content = content;
}

function updateMetaTag(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
    }
    tag.content = content;
}

window.updateSeoMeta = updateSeoMeta;

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
        testimonials: [
            {
                name: 'Rodrigue Ahouandjinou', role: 'Directeur Général, BTP Concept SARL', city: 'Cotonou',
                text: "Depuis que nous utilisons AlerteMarché, nous ne manquons plus aucun appel d'offres dans le BTP. Les alertes arrivent le jour même de la publication : nous avons remporté trois marchés publics en six mois.",
            },
            {
                name: 'Sylvie Dossou', role: 'Gérante, Sodifourn Distribution', city: 'Porto-Novo',
                text: "Un outil sérieux et fiable. Je reçois uniquement les opportunités qui correspondent à mon secteur, ce qui me fait gagner un temps précieux au quotidien. Le rapport qualité-prix est imbattable.",
            },
            {
                name: 'Marius Adjovi', role: 'Responsable commercial, Bénin Ingénierie', city: 'Parakou',
                text: "La veille est complète et bien organisée. Nos équipes suivent les marchés publics et privés depuis une seule plateforme. Un vrai gain de compétitivité pour notre entreprise.",
            },
        ],
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
        testimonials: [
            {
                name: 'Kodjo Amégan', role: 'Directeur Général, Togo Bâtiment & Travaux', city: 'Lomé',
                text: "AlerteMarché a transformé notre manière de faire de la veille. Nous recevons les appels d'offres publics dès leur parution et pouvons préparer nos dossiers dans les délais. Un partenaire indispensable.",
            },
            {
                name: 'Afi Dosseh', role: 'Fondatrice, Delta Services Togo', city: 'Kara',
                text: "Une plateforme professionnelle et très bien pensée. Les alertes par e-mail sont précises et pertinentes. Depuis notre inscription, notre carnet de commandes s'est nettement renforcé.",
            },
            {
                name: 'Komlan Adjété', role: 'Gérant, Sokodé Fournitures', city: 'Sokodé',
                text: "Enfin un service fiable qui centralise les marchés publics et privés du Togo. Le suivi est sérieux et le service client réactif. Je recommande à toutes les PME togolaises.",
            },
        ],
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
        testimonials: [
            {
                name: 'Konan Kouassi', role: 'Directeur Général, Ivoire Constructions', city: 'Abidjan',
                text: "AlerteMarché nous donne une longueur d'avance. Nous suivons en temps réel les marchés publics de l'ensemble du pays et répondons plus vite que la concurrence. Les résultats sont au rendez-vous.",
            },
            {
                name: 'Aïcha Traoré', role: 'Directrice, Baraka Fournitures & Services', city: 'Bouaké',
                text: "Un service professionnel qui inspire confiance. Les alertes sont ciblées sur mes secteurs et arrivent instantanément par e-mail. C'est devenu un outil incontournable pour développer mon entreprise.",
            },
            {
                name: 'Ismaël Koffi', role: 'Gérant, San-Pédro Logistique', city: 'San-Pédro',
                text: "Grâce à AlerteMarché, je ne rate plus aucune opportunité, qu'elle soit publique ou privée. La plateforme est claire, fiable et le gain de temps est considérable. Je recommande vivement.",
            },
        ],
    },
    {
        code: 'SN', name: 'Sénégal', cc: 'sn', available: true,
        color: '#00853F',
        hero: 'img/hero-sn.jpg',
        heroTitle: 'au Sénégal',
        heroLead: "Recevez par <b>e-mail</b> des alertes instantanées sur les opportunités de votre secteur.",
        armp: 'ARMP Sénégal',
        mockInst: 'DCMP Sénégal - Marchés Publics',
        mockObject: "Fourniture de matériel médical",
        mockLoc: 'Dakar',
        testimonials: [
            {
                name: 'Abdoulaye Diop', role: 'Directeur Général, Dakar BTP Services', city: 'Dakar',
                text: "AlerteMarché a révolutionné notre veille commerciale. Nous recevons les appels d'offres des bailleurs internationaux dès leur publication. Un outil stratégique pour notre développement.",
            },
            {
                name: 'Fatou Sall', role: 'Gérante, Teranga Fournitures', city: 'Thiès',
                text: "Une plateforme professionnelle qui répond à nos besoins. Les alertes sont précises et nous permettent de répondre rapidement aux marchés. Le service client est excellent.",
            },
            {
                name: 'Ousmane Ndiaye', role: 'Directeur commercial, Sénégal Équipements', city: 'Saint-Louis',
                text: "Grâce à AlerteMarché, nous suivons efficacement les opportunités au Sénégal. La qualité des données et la réactivité des alertes nous donnent un avantage compétitif réel.",
            },
        ],
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

/* -------- Liens d'authentification (dynamiques) --------
   Le header reflète l'état de connexion : quand un jeton est présent, on
   affiche « Tableau de bord » + « Déconnexion » au lieu de « Se connecter »
   / « S'inscrire ». La présence du jeton suffit pour un premier rendu ;
   refreshAuthUI() ré-affine l'affichage après résolution du statut réel
   (un jeton expiré est purgé par fetchUserStatus → on repasse en anonyme). */
function isLoggedIn() {
    return !!token();
}

/* Actions du header (version bureau, boutons à droite). */
function authActions() {
    if (isLoggedIn()) {
        return `
          <a href="/dashboard" class="btn btn-outline btn-sm">${IC.user}<span>Tableau de bord</span></a>
          <a href="#" class="btn btn-primary btn-sm am-logout">Déconnexion</a>`;
    }
    return `
          <a href="/connexion" class="btn btn-outline btn-sm">${IC.user}<span>Se connecter</span></a>
          <a href="/inscription" class="btn btn-primary btn-sm">S'inscrire gratuitement</a>`;
}

/* Liens d'authentification dans le menu mobile (dans la nav déroulante). */
function authLinksMobile() {
    const path = location.pathname.split('/').pop() || '/index';
    const isActive = (h) => (('/' + path) === h) ? 'active' : '';
    if (isLoggedIn()) {
        return `
          <a href="/dashboard" class="nav-auth-mobile ${isActive('/dashboard')}">Tableau de bord</a>
          <a href="#" class="nav-auth-mobile am-logout">Déconnexion</a>`;
    }
    return `
          <a href="/inscription" class="nav-auth-mobile ${isActive('/inscription')}">Créer un compte</a>
          <a href="/connexion" class="nav-auth-mobile ${isActive('/connexion')}">Se connecter</a>`;
}

/* Déconnexion : invalide le jeton côté serveur (best effort), le purge en
   local, puis renvoie vers l'accueil. */
async function amLogout(e) {
    if (e) e.preventDefault();
    try { await api('/auth/logout', { method: 'POST', auth: true }); } catch (_) {}
    try { localStorage.removeItem('am_token'); } catch (_) {}
    window.AM_USER_STATUS = 'anonymous';
    location.href = '/index';
}
window.amLogout = amLogout;

/* (Re)lie les boutons de déconnexion présents dans le header. */
function bindLogoutButtons() {
    $$('.am-logout').forEach((b) => {
        b.removeEventListener('click', amLogout);
        b.addEventListener('click', amLogout);
    });
}

/* Ré-affiche les zones d'authentification du header selon l'état courant.
   Appelée après fetchUserStatus() pour corriger le cas d'un jeton expiré. */
function refreshAuthUI() {
    const actions = document.getElementById('headerActions');
    if (actions) {
        const toggle = actions.querySelector('#navToggle');
        actions.innerHTML = authActions() + (toggle ? toggle.outerHTML : '<button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>');
        actions.querySelector('#navToggle')?.addEventListener('click', () => $('#mainNav').classList.toggle('open'));
    }
    const mob = document.getElementById('navAuthMobile');
    if (mob) mob.innerHTML = authLinksMobile();
    bindLogoutButtons();
}
window.refreshAuthUI = refreshAuthUI;

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
          <a href="/marches-publics" class="${isActive('/marches-publics')}">Marchés publics</a>
          <a href="/marches-prives" class="${isActive('/marches-prives')}">Marchés privés</a>
          <a href="/blog" class="${isActive('/blog')}">Blog</a>
          <a href="/publier" class="nav-publier ${isActive('/publier')}">📢 Publier une annonce</a>
          <a href="/tarifs" class="${isActive('/tarifs')}">Abonnement</a>
          <span id="navAuthMobile">${authLinksMobile()}</span>
        </nav>
        <div class="header-actions" id="headerActions">
          ${authActions()}
          <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>`;
    document.body.prepend(header);
    $('#navToggle')?.addEventListener('click', () => $('#mainNav').classList.toggle('open'));
    bindLogoutButtons();

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
            <a href="/marches-publics">Marchés publics</a>
            <a href="/marches-prives">Marchés privés</a>
            <a href="/blog">Blog & Guides</a>
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

/* ============================================================
   PAYWALL FREEMIUM
   Trois statuts d'accès :
     • 'anonymous'  : visiteur non connecté
     • 'free'       : inscrit sans abonnement payant actif
     • 'subscribed' : abonné payant actif (accès complet)
   Les cartes de marchés sont « verrouillées » (champs sensibles masqués)
   pour anonymous et free. La source de vérité est le backend (is_locked).
   ============================================================ */
window.AM_USER_STATUS = 'anonymous';
// Passe à true une fois le statut réellement déterminé (anti-race).
window.AM_STATUS_RESOLVED = false;
// Promesse partagée résolue quand le statut d'accès est connu.
window.AM_STATUS_READY = null;

/* Interroge /auth/me pour déterminer le statut réel de l'utilisateur. */
async function fetchUserStatus() {
    if (!token()) {
        window.AM_USER_STATUS = 'anonymous';
        window.AM_STATUS_RESOLVED = true;
        return window.AM_USER_STATUS;
    }
    try {
        const me = await api('/auth/me', { auth: true });
        window.AM_USER_STATUS = (me && me.has_active_subscription) ? 'subscribed' : 'free';
    } catch (e) {
        // Jeton invalide/expiré → on le purge et on repasse en anonyme.
        try { localStorage.removeItem('am_token'); } catch (_) {}
        window.AM_USER_STATUS = 'anonymous';
    }
    window.AM_STATUS_RESOLVED = true;
    return window.AM_USER_STATUS;
}
window.fetchUserStatus = fetchUserStatus;

/* Un avis est-il verrouillé pour l'utilisateur courant ?
   Priorité au champ backend `is_locked` ; repli sur le statut client. */
function amIsLocked(t) {
    if (t && typeof t.is_locked === 'boolean') return t.is_locked;
    return window.AM_USER_STATUS !== 'subscribed';
}
window.amIsLocked = amIsLocked;

/* Injecte (une seule fois) les styles du paywall : flou, bandeau, modale. */
function injectPaywallStyles() {
    if (document.getElementById('am-paywall-styles')) return;
    const css = `
      .locked-field { filter: blur(4px); user-select: none; color: #94a3b8; }
      .locked-icon { margin-right: 4px; }
      .am-lock-val { color:#94a3b8; letter-spacing:2px; user-select:none; }
      .am-lock-ic { display:inline-flex; vertical-align:-2px; margin-right:5px; color:#94a3b8; }
      .am-paywall-banner { width:100%; }
      .am-pb-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 20px; }
      .am-paywall-green { background:#0f7a3d; color:#fff; }
      .am-paywall-orange { background:#f59e0b; color:#fff; }
      .am-pb-text { font-weight:700; font-size:.98rem; }
      .am-pb-btn { background:#fff; color:#0f172a; font-weight:800; padding:8px 18px; border-radius:8px; text-decoration:none; white-space:nowrap; }
      .am-paywall-orange .am-pb-btn { color:#b45309; }
      @media(max-width:640px){ .am-pb-inner{flex-direction:column; align-items:flex-start; gap:10px;} .am-pb-text{font-size:.9rem;} .am-pb-btn{width:100%; text-align:center;} }
      .am-modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.62); display:flex; align-items:center; justify-content:center; z-index:9999; padding:20px; }
      .am-modal { background:#fff; border-radius:18px; max-width:840px; width:100%; padding:34px 32px; position:relative; box-shadow:0 30px 80px rgba(0,0,0,.4); max-height:92vh; overflow:auto; }
      .am-modal-close { position:absolute; top:16px; right:16px; border:none; background:#f1f5f9; width:36px; height:36px; border-radius:50%; font-size:20px; line-height:1; cursor:pointer; color:#334155; }
      .am-modal h2 { font-size:1.5rem; font-weight:900; text-align:center; margin-bottom:6px; color:#0f172a; }
      .am-modal-sub { text-align:center; color:#64748b; margin-bottom:26px; }
      .am-plans { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
      .am-plan { border:2px solid #e2e8f0; border-radius:14px; padding:24px 18px 22px; text-align:center; position:relative; }
      .am-plan.hl { border-color:#16a34a; box-shadow:0 10px 30px rgba(22,163,74,.18); }
      .am-plan-badge { position:absolute; top:-11px; left:50%; transform:translateX(-50%); background:#16a34a; color:#fff; font-size:.72rem; font-weight:800; padding:3px 12px; border-radius:20px; white-space:nowrap; }
      .am-plan h3 { font-size:1.05rem; font-weight:800; margin-bottom:12px; color:#0f172a; }
      .am-price { font-size:1.7rem; font-weight:900; color:#0f172a; line-height:1.1; }
      .am-unit { color:#64748b; font-size:.85rem; margin-top:2px; }
      .am-note { color:#16a34a; font-size:.8rem; font-weight:700; margin:8px 0 16px; }
      .am-plan-btn { display:block; background:#16a34a; color:#fff; font-weight:800; padding:11px; border-radius:9px; text-decoration:none; transition:background .15s; }
      .am-plan-btn:hover { background:#128a3d; }
      @media(max-width:640px){ .am-plans{grid-template-columns:1fr;} .am-modal{padding:26px 18px;} }
    `;
    const st = document.createElement('style');
    st.id = 'am-paywall-styles';
    st.textContent = css;
    document.head.appendChild(st);
}
window.injectPaywallStyles = injectPaywallStyles;

/* Affiche le bandeau paywall en haut de page selon le statut.
   Vert pour anonyme, orange pour inscrit gratuit, rien pour abonné. */
function renderPaywallBanner(status) {
    status = status || window.AM_USER_STATUS;
    injectPaywallStyles();
    const existing = document.getElementById('am-paywall-banner');
    if (existing) existing.remove();
    if (status === 'subscribed') return;
    const banner = document.createElement('div');
    banner.id = 'am-paywall-banner';
    if (status === 'anonymous') {
        banner.className = 'am-paywall-banner am-paywall-green';
        banner.innerHTML = `<div class="am-pb-inner">` +
            `<span class="am-pb-text">🔒 Inscrivez-vous gratuitement pour accéder aux offres complètes</span>` +
            `<a href="/inscription" class="am-pb-btn">S'inscrire</a></div>`;
    } else { // free
        banner.className = 'am-paywall-banner am-paywall-orange';
        banner.innerHTML = `<div class="am-pb-inner">` +
            `<span class="am-pb-text">⚡ Plan gratuit · Débloquez l'accès complet à tous les marchés + alertes email automatiques dès 10 000 FCFA / mois</span>` +
            `<a href="/tarifs" class="am-pb-btn">Passer Premium →</a></div>`;
    }
    const header = document.querySelector('.site-header');
    if (header && header.parentNode) header.parentNode.insertBefore(banner, header.nextSibling);
    else document.body.insertBefore(banner, document.body.firstChild);
}
window.renderPaywallBanner = renderPaywallBanner;

/* Modale d'abonnement : présente les 3 formules et renvoie vers /tarifs. */
function showSubscriptionModal() {
    injectPaywallStyles();
    if (document.getElementById('am-sub-modal')) return;
    const plans = [
        { name: 'Mensuel', price: '10 000', unit: 'FCFA / mois', note: 'Sans engagement', hl: false },
        { name: 'Trimestriel', price: '27 000', unit: 'FCFA / 3 mois', note: 'soit 9 000 FCFA/mois', hl: true },
        { name: 'Annuel', price: '96 000', unit: 'FCFA / an', note: 'soit 8 000 FCFA/mois', hl: false },
    ];
    const cards = plans.map((p) => `
        <div class="am-plan ${p.hl ? 'hl' : ''}">
          ${p.hl ? '<span class="am-plan-badge">★ Le plus populaire</span>' : ''}
          <h3>${p.name}</h3>
          <div class="am-price">${p.price}</div>
          <div class="am-unit">${p.unit}</div>
          <div class="am-note">${p.note}</div>
          <a href="/tarifs" class="am-plan-btn">Choisir ce plan</a>
        </div>`).join('');
    const overlay = document.createElement('div');
    overlay.className = 'am-modal-overlay';
    overlay.id = 'am-sub-modal';
    overlay.innerHTML = `
        <div class="am-modal" role="dialog" aria-modal="true">
          <button class="am-modal-close" aria-label="Fermer">&times;</button>
          <h2>🔒 Accès Premium requis</h2>
          <p class="am-modal-sub">Débloquez tous les marchés (budget, date limite, référence, lien officiel) et recevez des alertes automatiques par e-mail.</p>
          <div class="am-plans">${cards}</div>
        </div>`;
    const close = () => overlay.remove();
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.am-modal-close').addEventListener('click', close);
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
    document.body.appendChild(overlay);
}
window.showSubscriptionModal = showSubscriptionModal;

/* Action au clic sur « Voir les détails » d'un avis verrouillé :
   visiteur anonyme → inscription ; inscrit gratuit → modale d'abonnement. */
async function amLockedDetailsAction() {
    // Anti-race : on s'assure que le statut est résolu avant de décider.
    // Cohérent sur les 4 pays et sur toutes les pages, quel que soit le timing.
    if (!window.AM_STATUS_RESOLVED) {
        try { await (window.AM_STATUS_READY || fetchUserStatus()); } catch (_) {}
    }
    // Garde-fou : pas de jeton = visiteur anonyme → inscription gratuite d'abord.
    if (!token() || window.AM_USER_STATUS === 'anonymous') {
        location.href = '/inscription';
        return;
    }
    // Utilisateur connecté sans abonnement → proposition d'abonnement.
    showSubscriptionModal();
}
window.amLockedDetailsAction = amLockedDetailsAction;

/* -------- Init global -------- */
document.addEventListener('DOMContentLoaded', async () => {
    if (!document.body.dataset.noChrome) {
        renderNav();
        renderFooter();
    }
    initFaq();
    // Statut d'accès résolu AVANT le rendu des pages (cartes de marchés).
    // On mémorise la promesse pour que amLockedDetailsAction puisse l'attendre.
    window.AM_STATUS_READY = fetchUserStatus();
    await window.AM_STATUS_READY;
    // Corrige l'affichage du header une fois le statut réel connu
    // (ex. jeton expiré purgé → on rebascule sur Se connecter/S'inscrire).
    if (typeof refreshAuthUI === 'function') refreshAuthUI();
    if (typeof initPage === 'function') initPage();
});
