# Guide pas-à-pas : Référencer AlerteMarché sur Google

Ce guide vous accompagne pour faire apparaître **alertemarche.com** dans les résultats Google des 4 pays (Bénin, Togo, Côte d'Ivoire, Sénégal). Comptez **30 à 45 minutes** au total.

---

## 📍 Étape 1 — Google Search Console (le plus important)

Google Search Console (GSC) est l'outil gratuit qui permet à Google de découvrir et d'indexer votre site. **Sans lui, votre site met beaucoup plus de temps à apparaître.**

### 1.1 Créer le compte

1. Allez sur **https://search.google.com/search-console**
2. Connectez-vous avec le compte Google de l'entreprise (idéalement `info@alertemarche.com` si c'est un compte Google, sinon votre compte Gmail pro).
3. Cliquez sur **« Ajouter une propriété »**.

### 1.2 Choisir le type de propriété

Deux options s'affichent :

| Type | Recommandation |
|------|----------------|
| **Domaine** (alertemarche.com) | ✅ **Recommandé** — couvre http, https, www et sous-domaines. Nécessite un accès DNS. |
| **Préfixe d'URL** (https://alertemarche.com) | Plus simple si vous n'avez pas accès au DNS. |

**Comme votre DNS est géré (OVH/Cloudflare), choisissez « Domaine ».**

### 1.3 Vérifier la propriété (méthode DNS)

1. Google vous donne un **enregistrement TXT** du type :
   ```
   google-site-verification=xxxxxxxxxxxxxxxxxxxxxxxx
   ```
2. Connectez-vous à votre gestionnaire DNS :
   - **Si le DNS est chez Cloudflare** → onglet **DNS** → **Add record** → Type **TXT**, Name **@**, Content = la valeur fournie.
   - **Si le DNS est chez OVH** → **Zone DNS** → **Ajouter une entrée** → Type **TXT**.
3. Enregistrez, patientez 5 à 60 minutes, puis cliquez sur **« Valider »** dans GSC.

> 💡 Si vous préférez la méthode « Préfixe d'URL », vous pouvez aussi valider en ajoutant une **balise HTML** dans le `<head>` de la page d'accueil. Dites-le moi, je l'ajoute pour vous en 2 minutes.

### 1.4 Soumettre le sitemap (crucial)

Une fois la propriété validée :

1. Dans le menu de gauche, cliquez sur **« Sitemaps »**.
2. Dans le champ, saisissez : `sitemap.xml`
3. Cliquez sur **« Envoyer »**.

✅ Votre sitemap est déjà en ligne : **https://alertemarche.com/sitemap.xml** (15 URLs).

### 1.5 Demander l'indexation des pages clés

Pour accélérer :

1. En haut, collez une URL (ex. `https://alertemarche.com/marches-publics`) dans **« Inspection de l'URL »**.
2. Cliquez sur **« Demander une indexation »**.
3. Répétez pour vos pages prioritaires :
   - `/` (accueil)
   - `/marches-publics`
   - `/marches-prives`
   - `/blog`
   - `/blog-appels-offres-benin`
   - `/blog-appels-offres-togo`
   - `/blog-appels-offres-cote-ivoire`
   - `/blog-appels-offres-senegal`
   - `/tarifs`

---

## 📍 Étape 2 — Bing Webmaster Tools (bonus, 5 min)

Bing représente 5-10 % du trafic et est très facile à configurer.

1. Allez sur **https://www.bing.com/webmasters**
2. Connectez-vous et cliquez sur **« Importer depuis Google Search Console »** → tout se configure automatiquement.
3. Sinon, ajoutez le site manuellement et soumettez `sitemap.xml`.

---

## 📍 Étape 3 — Google Business Profile (SEO local, 4 fiches)

Les fiches Google Business (ex-Google My Business) apparaissent dans Google Maps et boostent **énormément** le référencement local. Créez **une fiche par pays**.

1. Allez sur **https://www.google.com/business/**
2. Créez une fiche pour chaque pays :

| Fiche | Ville | Catégorie suggérée |
|-------|-------|--------------------|
| AlerteMarché Bénin | Cotonou | Service d'information / Éditeur de logiciels |
| AlerteMarché Togo | Lomé | Service d'information |
| AlerteMarché Côte d'Ivoire | Abidjan | Service d'information |
| AlerteMarché Sénégal | Dakar | Service d'information |

3. Renseignez pour chaque fiche :
   - **Nom** : AlerteMarché
   - **Site web** : https://alertemarche.com
   - **Description** : « Plateforme de veille des appels d'offres et marchés publics au [pays]. Alertes e-mail personnalisées en temps réel. »
   - **Zone desservie** : tout le pays (vous pouvez cocher « Je livre des biens/services à mes clients » sans adresse physique si vous n'en avez pas).

> ⚠️ La vérification Google Business peut demander une adresse ou un numéro local. Comme PRO BENIN SARL est enregistrée à Cotonou, commencez par la **fiche Bénin** (la plus facile à vérifier), puis les autres au fur et à mesure.

---

## 📍 Étape 4 — Google Analytics (déjà en place ✅)

Bonne nouvelle : le code Google Analytics (`G-RRXKSCN05J`) est **déjà installé** sur toutes vos pages, y compris les nouvelles pages blog. Vous pouvez suivre votre trafic sur **https://analytics.google.com**.

---

## 📅 À quoi s'attendre (calendrier réaliste)

| Délai | Résultat attendu |
|-------|------------------|
| **24-72 h** | Google commence à explorer le site (vérifiable dans GSC → « Pages »). |
| **1 semaine** | Recherchez `site:alertemarche.com` sur Google → vos pages apparaissent. |
| **2-4 semaines** | Premières positions sur les requêtes faciles (« appels d'offres Bénin », « appels d'offres Togo »). |
| **2-3 mois** | Positions consolidées, trafic organique régulier, surtout si vous ajoutez des backlinks (voir le guide dédié). |

---

## ✅ Checklist rapide

- [ ] Compte Google Search Console créé
- [ ] Propriété alertemarche.com vérifiée (DNS ou balise HTML)
- [ ] Sitemap `sitemap.xml` soumis
- [ ] Indexation demandée pour les 9 pages clés
- [ ] Bing Webmaster Tools configuré (bonus)
- [ ] Fiche Google Business Bénin créée
- [ ] Fiches Google Business Togo / CI / Sénégal créées
- [ ] Backlinks lancés (voir `GUIDE-Backlinks.md`)

---

*Besoin d'aide sur une étape ? Je peux ajouter la balise HTML de vérification GSC directement dans le site, ou préparer les textes de description pour chaque fiche Google Business. Demandez-moi.*
