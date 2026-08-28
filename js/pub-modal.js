/**
 * pub-modal.js — Modal de demande d'espace publicitaire AlerteMarché
 * Utilisé par : index.html, marches-publics.html, marches-prives.html
 * API cible  : POST /api/pub-inquiry
 */
(function () {
  'use strict';

  /* ── CSS ─────────────────────────────────────────────────────────── */
  const CSS = `
    #pm-overlay {
      display: none;
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,.55);
      backdrop-filter: blur(3px);
      align-items: center; justify-content: center;
      padding: 16px;
    }
    #pm-overlay.pm-open { display: flex; animation: pmFade .18s ease; }
    @keyframes pmFade { from { opacity:0 } to { opacity:1 } }

    #pm-box {
      background: #fff;
      border-radius: 18px;
      width: 100%; max-width: 480px;
      box-shadow: 0 24px 60px rgba(0,0,0,.22);
      overflow: hidden;
      animation: pmSlide .22s cubic-bezier(.22,.61,.36,1);
    }
    @keyframes pmSlide { from { transform:translateY(18px); opacity:0 } to { transform:none; opacity:1 } }

    #pm-header {
      background: linear-gradient(120deg, #f97316 0%, #ea580c 100%);
      padding: 20px 24px 18px;
      position: relative;
    }
    #pm-header h3 {
      margin: 0 0 4px;
      color: #fff;
      font-size: 1.15rem;
      font-weight: 900;
      line-height: 1.25;
    }
    #pm-header p {
      margin: 0;
      color: #fed7aa;
      font-size: .82rem;
    }
    #pm-close {
      position: absolute; top: 14px; right: 16px;
      background: rgba(255,255,255,.2);
      border: none; cursor: pointer;
      color: #fff; border-radius: 50%;
      width: 30px; height: 30px;
      font-size: 1.1rem; line-height: 30px; text-align: center;
      transition: background .15s;
    }
    #pm-close:hover { background: rgba(255,255,255,.35); }

    #pm-body { padding: 22px 24px; }

    .pm-field { margin-bottom: 14px; }
    .pm-field label {
      display: block;
      font-size: .82rem;
      font-weight: 700;
      color: #44403c;
      margin-bottom: 5px;
    }
    .pm-field input,
    .pm-field select,
    .pm-field textarea {
      width: 100%; box-sizing: border-box;
      border: 1.5px solid #e7e5e4;
      border-radius: 9px;
      padding: 10px 13px;
      font-size: .92rem;
      color: #1c1917;
      font-family: inherit;
      transition: border-color .15s, box-shadow .15s;
      background: #fafaf9;
    }
    .pm-field input:focus,
    .pm-field select:focus,
    .pm-field textarea:focus {
      outline: none;
      border-color: #f97316;
      box-shadow: 0 0 0 3px rgba(249,115,22,.12);
      background: #fff;
    }
    .pm-field textarea { resize: vertical; min-height: 80px; }

    #pm-submit {
      width: 100%;
      background: #f97316;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 13px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      transition: background .2s, transform .1s;
      margin-top: 4px;
    }
    #pm-submit:hover:not(:disabled) { background: #ea6c0a; transform: translateY(-1px); }
    #pm-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

    #pm-notice {
      margin-top: 12px;
      padding: 11px 14px;
      border-radius: 9px;
      font-size: .85rem;
      font-weight: 600;
      display: none;
    }
    #pm-notice.pm-ok  { background: #dcfce7; color: #15803d; display: block; }
    #pm-notice.pm-err { background: #fee2e2; color: #b91c1c; display: block; }

    #pm-footer {
      padding: 12px 24px 18px;
      text-align: center;
      font-size: .75rem;
      color: #a8a29e;
    }
  `;

  /* ── HTML ─────────────────────────────────────────────────────────── */
  const HTML = `
    <div id="pm-overlay" role="dialog" aria-modal="true" aria-labelledby="pm-title">
      <div id="pm-box">
        <div id="pm-header">
          <button id="pm-close" aria-label="Fermer">✕</button>
          <h3 id="pm-title">📢 Réservez votre espace pub</h3>
          <p>Touchez nos décideurs inscrits dans 5 pays — Bénin, Togo, Côte d'Ivoire, Sénégal &amp; Burkina Faso</p>
        </div>
        <div id="pm-body">
          <form id="pm-form" novalidate>
            <div class="pm-field">
              <label for="pm-company">Entreprise / Nom *</label>
              <input id="pm-company" type="text" placeholder="Ex : SARL Dupont, Cabinet Conseil…" required>
            </div>
            <div class="pm-field">
              <label for="pm-email">Email de contact *</label>
              <input id="pm-email" type="email" placeholder="vous@entreprise.com" required>
            </div>
            <div class="pm-field">
              <label for="pm-country">Pays ciblé</label>
              <select id="pm-country">
                <option value="all">🌍 Tous les 5 pays (recommandé)</option>
                <option value="BJ">🇧🇯 Bénin</option>
                <option value="TG">🇹🇬 Togo</option>
                <option value="CI">🇨🇮 Côte d'Ivoire</option>
                <option value="SN">🇸🇳 Sénégal</option>
                <option value="BF">🇧🇫 Burkina Faso</option>
              </select>
            </div>
            <div class="pm-field">
              <label for="pm-message">Votre besoin (optionnel)</label>
              <textarea id="pm-message" placeholder="Décrivez brièvement votre produit ou service à promouvoir…"></textarea>
            </div>
            <div id="pm-notice"></div>
            <button type="submit" id="pm-submit">Envoyer ma demande →</button>
          </form>
        </div>
        <div id="pm-footer">
          Réponse sous 24 h • <a href="mailto:info@alertemarche.com" style="color:#f97316;">info@alertemarche.com</a>
        </div>
      </div>
    </div>
  `;

  /* ── API URL ────────────────────────────────────────────────────────── */
  // Même origine si le backend est servi sous /api, sinon URL absolue.
  const API_URL = 'https://alertemarche.com/api/pub-inquiry';

  /* ── Init ─────────────────────────────────────────────────────────── */
  function init() {
    // Injecter CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Injecter HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper);

    const overlay = document.getElementById('pm-overlay');
    const form    = document.getElementById('pm-form');
    const notice  = document.getElementById('pm-notice');
    const submit  = document.getElementById('pm-submit');

    // Fermer
    document.getElementById('pm-close').addEventListener('click', closePubModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePubModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePubModal();
    });

    // Soumettre
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      notice.className = '';
      notice.textContent = '';

      const company = document.getElementById('pm-company').value.trim();
      const email   = document.getElementById('pm-email').value.trim();
      const country = document.getElementById('pm-country').value;
      const message = document.getElementById('pm-message').value.trim();

      if (!company || !email) {
        notice.textContent = '⚠ Veuillez renseigner votre nom/entreprise et votre email.';
        notice.className = 'pm-err';
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Envoi en cours…';

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ company, email, country, message }),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          notice.textContent = '✅ ' + json.message;
          notice.className = 'pm-ok';
          form.reset();
          submit.style.display = 'none';
        } else {
          const firstError = json.errors ? Object.values(json.errors)[0][0] : (json.message || 'Une erreur est survenue.');
          notice.textContent = '⚠ ' + firstError;
          notice.className = 'pm-err';
        }
      } catch (_) {
        notice.textContent = '⚠ Impossible d\'envoyer la demande. Veuillez réessayer ou écrire à info@alertemarche.com';
        notice.className = 'pm-err';
      } finally {
        if (notice.className !== 'pm-ok') {
          submit.disabled = false;
          submit.textContent = 'Envoyer ma demande →';
        }
      }
    });
  }

  /* ── API publique ────────────────────────────────────────────────── */
  window.openPubModal = function () {
    const overlay = document.getElementById('pm-overlay');
    if (!overlay) { console.warn('pub-modal: overlay introuvable'); return; }
    // Réinitialiser le bouton au cas où il avait été masqué
    const submit = document.getElementById('pm-submit');
    if (submit) { submit.style.display = ''; submit.disabled = false; submit.textContent = 'Envoyer ma demande →'; }
    document.getElementById('pm-notice').className = '';
    document.getElementById('pm-notice').textContent = '';
    overlay.classList.add('pm-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('pm-company')?.focus(), 80);
  };

  window.closePubModal = function () {
    const overlay = document.getElementById('pm-overlay');
    if (overlay) overlay.classList.remove('pm-open');
    document.body.style.overflow = '';
  };

  // Lancer après chargement DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
