/**
 * AlerteMarché — Système de protection contre les erreurs JavaScript
 * 
 * Ce module capture et reporte toutes les erreurs JS pour éviter que le site
 * reste bloqué silencieusement. Il inclut aussi des validations runtime.
 * 
 * @version 1.0.0
 * @date 2026-09-16
 */

(function() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. CONFIGURATION
  // ══════════════════════════════════════════════════════════════
  
  const CONFIG = {
    // Mode debug : affiche les erreurs en console (désactivé en prod)
    DEBUG_MODE: window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1'),
    
    // Endpoint backend pour reporter les erreurs (à implémenter côté Laravel)
    ERROR_REPORT_ENDPOINT: '/api/log-js-error',
    
    // Seuil d'erreurs avant d'afficher une modale à l'utilisateur
    ERROR_THRESHOLD: 3,
    
    // Durée du cache pour éviter de spammer le backend (5 min)
    ERROR_CACHE_DURATION: 5 * 60 * 1000,
  };

  // ══════════════════════════════════════════════════════════════
  // 2. CAPTURE GLOBALE DES ERREURS
  // ══════════════════════════════════════════════════════════════
  
  let errorCount = 0;
  const reportedErrors = new Set();

  /**
   * Gestionnaire global d'erreurs non capturées
   */
  window.addEventListener('error', function(event) {
    const error = {
      message: event.message,
      filename: event.filename,
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack || 'No stack trace',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    handleError(error, 'uncaught');
  });

  /**
   * Gestionnaire pour les promesses rejetées non capturées
   */
  window.addEventListener('unhandledrejection', function(event) {
    const error = {
      message: event.reason?.message || String(event.reason),
      stack: event.reason?.stack || 'No stack trace',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    handleError(error, 'promise');
  });

  /**
   * Traite et reporte une erreur
   */
  function handleError(error, type) {
    errorCount++;
    
    // Log console en mode debug
    if (CONFIG.DEBUG_MODE) {
      console.error('[ErrorProtection]', type, error);
    }
    
    // Signature unique pour éviter les duplicatas
    const signature = `${error.message}:${error.filename}:${error.line}`;
    
    // Déjà reportée ?
    if (reportedErrors.has(signature)) {
      return;
    }
    
    reportedErrors.add(signature);
    
    // Envoyer au backend (sans bloquer l'exécution)
    reportToBackend(error, type);
    
    // Si trop d'erreurs, afficher un message à l'utilisateur
    if (errorCount >= CONFIG.ERROR_THRESHOLD) {
      showUserErrorModal();
    }
  }

  /**
   * Envoie l'erreur au backend pour logging (non bloquant)
   */
  function reportToBackend(error, type) {
    if (typeof fetch === 'undefined') return;
    
    try {
      fetch(CONFIG.ERROR_REPORT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, type }),
      }).catch(() => {
        // Échec silencieux — ne pas générer d'erreur secondaire
      });
    } catch (e) {
      // Échec silencieux
    }
  }

  /**
   * Affiche une modale discrète à l'utilisateur
   */
  function showUserErrorModal() {
    // Ne montrer qu'une seule fois par session
    if (sessionStorage.getItem('am_error_modal_shown')) return;
    sessionStorage.setItem('am_error_modal_shown', '1');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 999999;
      background: #fff3cd; border: 2px solid #ff9800; border-radius: 8px;
      padding: 16px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 400px; font-family: sans-serif;
    `;
    modal.innerHTML = `
      <div style="font-weight: 600; color: #856404; margin-bottom: 8px;">
        ⚠️ Un problème technique a été détecté
      </div>
      <div style="font-size: 14px; color: #856404; line-height: 1.4; margin-bottom: 12px;">
        Si la page ne fonctionne pas correctement, essayez de <strong>recharger</strong> ou <a href="/" style="color: #0066cc;">retourner à l'accueil</a>.
      </div>
      <button onclick="location.reload()" style="background: #ff9800; color: #fff; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-weight: 600;">
        Recharger la page
      </button>
      <button onclick="this.closest('div').remove()" style="background: transparent; border: 1px solid #ff9800; color: #ff9800; padding: 7px 16px; border-radius: 5px; cursor: pointer; margin-left: 8px;">
        Fermer
      </button>
    `;
    document.body.appendChild(modal);
    
    // Auto-fermeture après 15 secondes
    setTimeout(() => modal.remove(), 15000);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. VALIDATIONS RUNTIME (détection proactive)
  // ══════════════════════════════════════════════════════════════
  
  /**
   * Vérifie que les fonctions critiques sont définies
   */
  function validateCriticalFunctions() {
    const critical = [
      'amCode',
      'amMeta',
      'API_BASE',
    ];
    
    const missing = critical.filter(name => typeof window[name] === 'undefined');
    
    if (missing.length > 0) {
      console.error('[ErrorProtection] Fonctions critiques manquantes:', missing);
      handleError({
        message: `Fonctions critiques manquantes: ${missing.join(', ')}`,
        filename: 'error-protection.js',
        line: 0,
        stack: 'Runtime validation',
        timestamp: new Date().toISOString(),
        url: window.location.href,
      }, 'validation');
    }
  }

  /**
   * Vérifie l'intégrité de la page après chargement
   */
  function validatePageIntegrity() {
    // Vérifier que les éléments DOM critiques existent
    const criticalIds = ['tendersGrid', 'marketShowing', 'countNum'];
    const missing = criticalIds.filter(id => !document.getElementById(id));
    
    if (missing.length > 0 && window.location.pathname.includes('marches')) {
      console.warn('[ErrorProtection] Éléments DOM critiques manquants:', missing);
    }
  }

  /**
   * Protection contre les variables TDZ (Temporal Dead Zone)
   * Vérifie que les variables sont déclarées avant utilisation
   */
  function wrapAsyncFunction(fn, fnName) {
    return async function(...args) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        if (error instanceof ReferenceError) {
          console.error(`[ErrorProtection] TDZ detected in ${fnName}:`, error.message);
          handleError({
            message: `TDZ in ${fnName}: ${error.message}`,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
          }, 'tdz');
        }
        throw error; // Re-throw pour que l'appelant puisse gérer
      }
    };
  }

  // ══════════════════════════════════════════════════════════════
  // 4. INITIALISATION
  // ══════════════════════════════════════════════════════════════
  
  // Attendre que le DOM soit prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Exécuter les validations après un court délai
    setTimeout(() => {
      validateCriticalFunctions();
      validatePageIntegrity();
    }, 1000);
    
    // Exposer les utilitaires globalement pour usage externe
    window.AM_ERROR_PROTECTION = {
      handleError,
      wrapAsyncFunction,
      getErrorCount: () => errorCount,
    };
    
    if (CONFIG.DEBUG_MODE) {
      console.log('[ErrorProtection] Système de protection initialisé');
    }
  }

})();
