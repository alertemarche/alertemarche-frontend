# Vérification Google Search Console — Balise HTML

## 🎯 Objectif

Ajouter la balise de vérification Google Search Console dans le `<head>` de toutes les pages du site pour que Google puisse vérifier que vous êtes bien propriétaire d'alertemarche.com.

---

## 📋 Étapes

### 1. Obtenir votre code de vérification

1. Allez sur **https://search.google.com/search-console**
2. Ajoutez la propriété `https://alertemarche.com` (préfixe d'URL)
3. Choisissez la méthode **« Balise HTML »**
4. Google vous donne une balise du type :
   ```html
   <meta name="google-site-verification" content="VOTRE_CODE_ICI_xxxxxxxxxxxxxxxxxxx" />
   ```
5. Copiez **uniquement la valeur du `content`** (le code entre guillemets)

### 2. Remplacer le placeholder dans le code

La balise est déjà préparée dans toutes les pages principales du site. Cherchez cette ligne dans le `<head>` :

```html
<!-- Google Search Console verification -->
<meta name="google-site-verification" content="REMPLACER_PAR_VOTRE_CODE_GSC" />
```

Remplacez `REMPLACER_PAR_VOTRE_CODE_GSC` par le code fourni par Google.

**Exemple :**
```html
<!-- Google Search Console verification -->
<meta name="google-site-verification" content="8kL3mN5oP7qR9sT1uV2wX3yZ4a" />
```

### 3. Déployer

```bash
cd /home/ubuntu/github_repos/alertemarche-frontend
git add *.html
git commit -m "Add: Google Search Console verification meta tag"
git push origin main

# Déployer sur le VPS (copier les fichiers HTML mis à jour)
```

### 4. Valider dans GSC

1. Retournez sur Google Search Console
2. Cliquez sur **« Valider »**
3. ✅ Votre site est vérifié ! Vous pouvez maintenant soumettre le sitemap.

---

## 📄 Pages concernées

La balise sera ajoutée dans ces pages :
- `index.html` (accueil)
- `marches-publics.html`
- `marches-prives.html`
- `tarifs.html`
- `blog.html`
- `blog-appels-offres-benin.html`
- `blog-appels-offres-togo.html`
- `blog-appels-offres-cote-ivoire.html`
- `blog-appels-offres-senegal.html`
- `contact.html`
- `inscription.html`
- `connexion.html`
- `dashboard.html`

---

## ⚠️ Note importante

Cette méthode (balise HTML) est **plus simple** que la méthode DNS si vous n'avez pas accès au gestionnaire DNS ou si vous voulez aller vite. Si vous préférez la méthode DNS (recommandée pour « Domaine » dans GSC), suivez le guide principal `GUIDE-Google-Search-Console.md`.

---

**Une fois la balise ajoutée et déployée, Google détectera automatiquement la vérification en quelques minutes.**
