# Anno — site vitrine

Site vitrine d'**Anno**, entreprise de service et de conseil informatique :
automatisation, création de sites web sur mesure, assistants IA et connexion
d'outils métier pour les petites entreprises.

Site statique, sans framework, sans étape de compilation. On ouvre
`index.html` dans un navigateur et ça marche.

---

## Sommaire

1. [Structure des fichiers](#1-structure-des-fichiers)
2. [Technologies](#2-technologies)
3. [Lancer le site en local](#3-lancer-le-site-en-local)
4. [Modifier les contenus](#4-modifier-les-contenus)
5. [Où modifier les coordonnées](#5-où-modifier-les-coordonnées)
6. [Où mettre le lien LinkedIn](#6-où-mettre-le-lien-linkedin)
7. [Où brancher un outil de réservation (Cal.com)](#7-où-brancher-un-outil-de-réservation-calcom)
8. [Où ajouter les photos de Nour et d'Anis](#8-où-ajouter-les-photos-de-nour-et-danis)
9. [Ce qu'il reste à compléter](#9-ce-quil-reste-à-compléter)
10. [Déployer sur GitHub Pages](#10-déployer-sur-github-pages)
11. [Ajouter un nom de domaine plus tard](#11-ajouter-un-nom-de-domaine-plus-tard)
12. [Sécurité](#12-sécurité)

---

## 1. Structure des fichiers

```
anno/
├── index.html              Page unique du site
├── mentions-legales.html   Mentions légales et confidentialité
├── 404.html                Page d'erreur servie par GitHub Pages
├── README.md               Ce fichier
├── .gitignore              Fichiers exclus du dépôt
├── .nojekyll               Désactive Jekyll sur GitHub Pages
├── robots.txt              Autorise l'indexation, pointe vers le sitemap
├── sitemap.xml             Liste des pages pour les moteurs de recherche
│
├── css/
│   └── style.css           Toute la mise en forme, en 12 sections numérotées
│
├── js/
│   └── script.js           4 fonctions : reveal, menu mobile, modale RDV, simulateur
│
└── assets/
    ├── images/
    │   ├── logo-anno.png            Logo du header (350×66)
    │   ├── logo-anno-footer.png     Logo complet du pied de page (340×382)
    │   ├── monogramme-anno.png      Le « A » en filigrane du hero (300×264)
    │   └── og-image.jpg             Aperçu au partage sur les réseaux (1200×630)
    ├── icons/
    │   ├── favicon.png              64×64
    │   ├── favicon-32.png           32×32
    │   └── apple-touch-icon.png     180×180
    └── fonts/
        ├── cormorant-garamond-latin-500-normal.woff2
        ├── cormorant-garamond-latin-600-normal.woff2
        ├── cormorant-garamond-latin-500-italic.woff2
        ├── manrope-latin-400-normal.woff2
        ├── manrope-latin-500-normal.woff2
        ├── manrope-latin-600-normal.woff2
        └── manrope-latin-700-normal.woff2
```

### Comment le CSS est organisé

`css/style.css` est un fichier unique, découpé en sections numérotées. Le
sommaire est en haut du fichier :

| Section | Contenu |
|---------|---------|
| 1 | Polices (`@font-face`) |
| 2 | Variables et thème (`:root`) |
| 3 | Reset et base |
| 4 | Utilitaires (`.wrap`, `.reveal`, lien d'évitement) |
| 5 | Typographie |
| 6 | Composants : boutons, pastilles, surfaces, panneaux sombres |
| 7 | Structure : header, navigation, menu mobile, footer |
| 8 | Sections : hero, garantie, services, simulateur, méthode, exemples, équipe, contact |
| 9 | Modale de prise de rendez-vous |
| 10 | Responsive |
| 11 | Préférences utilisateur (animations réduites, contraste forcé) |
| 12 | Pages secondaires (mentions légales, 404) |

**Tout ce qui est global passe par des variables CSS**, déclarées dans la
section 2. Pour changer une couleur ou un espacement partout à la fois, il
suffit de modifier la variable :

```css
--paper: #FAF9F6;     /* fond de page */
--ink: #14120F;       /* texte principal */
--accent: #A5691F;    /* accent doré, sur fond clair */
--accent-on-ink:      /* même doré, éclairci pour rester lisible sur fond sombre */
--wrap-max: 1080px;   /* largeur maximale du contenu */
--section-y:          /* espacement vertical entre les sections */
```

### Comment le JavaScript est organisé

`js/script.js` contient quatre fonctions indépendantes, appelées à la fin du
fichier. Aucune dépendance, aucune bibliothèque.

| Fonction | Rôle |
|----------|------|
| `initReveal()` | Fait apparaître les blocs au défilement |
| `initMenu()` | Menu mobile : ouverture, fermeture, clavier, `aria-expanded` |
| `initRdv()` | Modale « Réserver un rendez-vous » |
| `initSimulator()` | Calcul de la section « Faites le calcul chez vous » |

---

## 2. Technologies

- **HTML5** sémantique (`<main>`, `<section>`, `<dialog>`, `<dl>`)
- **CSS3** : variables personnalisées, Grid, Flexbox, `clamp()`, `color-mix()` avec repli
- **JavaScript** natif (ES5+), sans framework ni dépendance
- **Polices auto-hébergées** : Cormorant Garamond et Manrope, sous licence
  SIL Open Font License 1.1 — aucune requête vers Google, donc aucune donnée
  transmise à un tiers (RGPD)
- **Aucun outil de build** : pas de `npm install`, pas de compilation

---

## 3. Lancer le site en local

### Le plus simple

Double-cliquez sur `index.html`. Le site s'ouvre dans votre navigateur.

> **À savoir** : ouvert de cette façon (protocole `file://`), le navigateur
> refuse de charger les polices pour des raisons de sécurité, et le site
> s'affiche avec les polices système. Le reste fonctionne normalement.
> Pour voir le site exactement comme en ligne, utilisez un petit serveur local.

### Avec un serveur local (rendu identique à la production)

Avec Python, déjà installé sur macOS et Linux :

```bash
cd anno
python3 -m http.server 8000
```

Puis ouvrez <http://localhost:8000>.

Avec Node.js :

```bash
cd anno
npx serve
```

Avec VS Code : extension **Live Server**, clic droit sur `index.html` →
*Open with Live Server*.

---

## 4. Modifier les contenus

Tout le texte visible est dans `index.html`. Les sections sont séparées par
de gros blocs de commentaires, dans l'ordre où elles apparaissent à l'écran :

| Section | Ancre | Ce qu'on y trouve |
|---------|-------|-------------------|
| Header | — | Logo, navigation, bouton de rendez-vous |
| Menu mobile | — | Les mêmes liens, version téléphone |
| Hero | — | Titre principal, sous-titre, boutons, zone d'intervention |
| Bande garantie | — | L'engagement 30 jours |
| Services | `#services` | Les trois cartes : Automatiser, Répondre, Connecter |
| Simulateur | `#calcul` | Les trois curseurs et le résultat |
| Méthode | `#methode` | Les quatre étapes |
| Exemples | `#exemples` | Deux situations de métier, trois solutions |
| Équipe | `#equipe` | Nour, Anis, et le message commun |
| Contact | `#contact` | Titre, bouton, e-mail, téléphones, LinkedIn |
| Footer | — | Logo, liens, mention légale |

**Pour ajouter une carte de service** : dupliquez un bloc `<article class="card surface reveal">`
et changez le texte. La grille se réorganise toute seule.

**Pour ajouter un exemple** : dupliquez un bloc `<article class="example surface reveal">`.

**Pour changer les tarifs** : ils sont dans les blocs `<p class="card__meta">` de la section Services.

> Les classes `reveal`, `d1`, `d2`, `d3` gèrent l'apparition au défilement.
> `d1`, `d2`, `d3` décalent l'animation de 0,08 s, 0,16 s et 0,24 s.

---

## 5. Où modifier les coordonnées

Les coordonnées apparaissent à **quatre endroits**. Pour en changer une,
faites une recherche globale dans le projet — c'est le plus sûr.

| Coordonnée | Fichiers concernés |
|------------|--------------------|
| E-mail `contact.pro.anno@gmail.com` | `index.html` (menu mobile, contact, modale), `mentions-legales.html` |
| Téléphone de Nour `+33752066526` | `index.html` (contact, modale, JSON-LD), `mentions-legales.html` |
| Téléphone d'Anis `+33750059944` | `index.html` (contact, modale, JSON-LD), `mentions-legales.html` |

Attention : un numéro s'écrit **deux fois**, sous deux formes différentes.

```html
<a href="tel:+33752066526">07&nbsp;52&nbsp;06&nbsp;52&nbsp;26</a>
      ↑ format international, sans espace       ↑ format affiché
```

Le `&nbsp;` est une espace insécable : elle empêche le numéro d'être coupé en
fin de ligne. Gardez-la.

---

## 6. Où mettre le lien LinkedIn

Le lien est déjà en place :
`https://www.linkedin.com/in/anno-automatisation-b242a8430/`

Il apparaît à **trois endroits** dans `index.html` :

1. Section contact — bloc `<span class="contact__label">LinkedIn</span>`
2. Pied de page — `<nav class="site-footer__nav">`
3. Données structurées JSON-LD — champ `"sameAs"`, en haut du fichier

Si vous changez d'URL (par exemple pour une page entreprise plutôt qu'un
profil), remplacez-la aux trois endroits.

---

## 7. Où brancher un outil de réservation (Cal.com)

Aujourd'hui, le bouton **« Réserver un rendez-vous »** ouvre une petite fenêtre
maison qui propose au visiteur de choisir entre Nour et Anis, puis lance
l'appel directement depuis son téléphone. Aucun outil externe, aucun compte à
créer, aucune donnée qui sort du site.

Le jour où vous voudrez passer à un agenda en ligne (Cal.com, Calendly…),
tout se joue dans **un seul bloc** de `index.html`, tout en bas du fichier :

```html
<dialog class="rdv" id="rdv" aria-labelledby="rdv-titre">
  ...
  <div class="rdv__options">
    <!-- Remplacez le contenu de ce bloc par : -->
    <a class="btn btn--ink" href="https://cal.com/VOTRE-LIEN"
       target="_blank" rel="noopener noreferrer">Choisir un créneau</a>
  </div>
  ...
</dialog>
```

Le `rel="noopener noreferrer"` est important dès qu'un lien s'ouvre dans un
nouvel onglet : sans lui, la page ouverte peut agir sur la vôtre.

Vous pouvez aussi **garder les deux** : l'agenda en ligne pour ceux qui
préfèrent réserver un créneau, et le choix Nour / Anis juste en dessous pour
ceux qui préfèrent appeler.

---

## 8. Où ajouter les photos de Nour et d'Anis

Les emplacements sont prêts. Pour l'instant, chaque médaillon affiche les
initiales en Cormorant Garamond, ce qui reste élégant tant qu'il n'y a pas de
photo.

**En deux étapes :**

1. Déposez les fichiers dans `assets/images/`, en les nommant `nour.jpg` et
   `anis.jpg`. Format conseillé : **carré, 400 × 400 px**, cadrage buste.
2. Dans `index.html`, section « Qui est derrière Anno », décommentez la ligne
   `<img>` correspondante :

```html
<div class="member__portrait">
  <!-- <img src="assets/images/nour.jpg" alt="Portrait de Nour Chouari, cofondatrice d'Anno" width="92" height="92"> -->
  <span class="member__initials" aria-hidden="true">NC</span>
</div>
```

devient :

```html
<div class="member__portrait">
  <img src="assets/images/nour.jpg" alt="Portrait de Nour Chouari, cofondatrice d'Anno" width="92" height="92">
  <span class="member__initials" aria-hidden="true">NC</span>
</div>
```

La photo recouvre automatiquement les initiales, recadrée en cercle. Il n'y a
rien d'autre à modifier — ni le CSS, ni le JavaScript.

> Gardez le texte `alt` : c'est ce que lisent les lecteurs d'écran, et c'est
> ce qui s'affiche si l'image ne charge pas.

---

## 9. Ce qu'il reste à compléter

Trois choses sont volontairement laissées en attente. Cherchez
**`À REMPLACER`** dans le projet pour les retrouver.

### a) L'URL du site

Elle apparaît dans `index.html` (balises `canonical`, `og:url`, `og:image`,
`twitter:image`), dans `robots.txt` et dans `sitemap.xml`, sous la forme :

```
https://VOTRE-PSEUDO-GITHUB.github.io/Anno-automatisation/
```

Remplacez `VOTRE-PSEUDO-GITHUB` par votre nom d'utilisateur GitHub **dès que
le site est en ligne**. Sans cela, l'aperçu au partage sur LinkedIn et
WhatsApp ne s'affichera pas.

Sur macOS ou Linux, une seule commande suffit :

```bash
grep -rl "VOTRE-PSEUDO-GITHUB" . | xargs sed -i '' 's/VOTRE-PSEUDO-GITHUB/votre-pseudo/g'   # macOS
grep -rl "VOTRE-PSEUDO-GITHUB" . | xargs sed -i    's/VOTRE-PSEUDO-GITHUB/votre-pseudo/g'   # Linux
```

### b) Les mentions légales

`mentions-legales.html` est prête et conforme dans sa structure, mais cinq
champs attendent le statut juridique de l'entreprise (ils apparaissent en
pointillés dorés sur la page) :

- dénomination
- forme juridique
- siège social
- SIRET
- numéro de TVA intracommunautaire
- directeur ou directrice de la publication

C'est une **obligation légale** en France (article 6-III de la LCEN) pour tout
site professionnel. À compléter dès que l'immatriculation est faite.

Vérifiez aussi la ligne du pied de page présente sur les trois pages :

```
© 2026 Anno — micro-entreprise. TVA non applicable, art. 293 B du CGI.
```

Elle vient du site d'origine. Si le statut retenu n'est pas la
micro-entreprise, corrigez-la.

### c) Les photos

Voir la [section 8](#8-où-ajouter-les-photos-de-nour-et-danis).

---

## 10. Déployer sur GitHub Pages

Le projet est prêt tel quel : tous les chemins sont **relatifs**, ce qui lui
permet de fonctionner aussi bien à la racine d'un domaine que dans un
sous-dossier GitHub Pages.

### Étape 1 — Créer le dépôt sur GitHub

Sur <https://github.com/new> :

- **Repository name** : `Anno-automatisation`
- **Visibilité** : `Public` (obligatoire pour GitHub Pages sur un compte gratuit)
- Ne cochez **ni** *Add a README file*, **ni** *.gitignore*, **ni** *license* —
  ils sont déjà dans le projet.
- Cliquez sur **Create repository**.

### Étape 2 — Initialiser Git en local

Ouvrez un terminal dans le dossier `anno/` :

```bash
cd anno
git init
git branch -M main
```

### Étape 3 — Premier commit

```bash
git add .
git status                      # vérifiez ce qui va partir
git commit -m "Mise en ligne du site vitrine Anno"
```

### Étape 4 — Relier le dépôt distant

Remplacez `VOTRE-PSEUDO` par votre nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/VOTRE-PSEUDO/Anno-automatisation.git
```

### Étape 5 — Envoyer le code

```bash
git push -u origin main
```

GitHub demandera vos identifiants. Le mot de passe n'est plus accepté :
créez un **jeton d'accès personnel** dans
*Settings → Developer settings → Personal access tokens → Tokens (classic)*,
cochez la case `repo`, et utilisez ce jeton comme mot de passe.

### Étape 6 — Activer GitHub Pages

Dans le dépôt : **Settings → Pages**.

- **Source** : `Deploy from a branch`
- **Branch** : `main`
- **Folder** : `/ (root)`
- **Save**

### Étape 7 — Vérifier le site

Comptez une à deux minutes. L'adresse s'affiche en haut de la page *Pages* :

```
https://VOTRE-PSEUDO.github.io/Anno-automatisation/
```

À vérifier une fois en ligne :

- [ ] Les polices s'affichent bien (titres en serif, texte en sans-serif)
- [ ] Le logo, le monogramme du hero et le logo du pied de page apparaissent
- [ ] Le menu hamburger s'ouvre et se ferme sur téléphone
- [ ] Le bouton « Réserver un rendez-vous » ouvre la fenêtre de choix
- [ ] Les deux numéros lancent bien un appel depuis un téléphone
- [ ] Le lien LinkedIn s'ouvre dans un nouvel onglet
- [ ] La page `mentions-legales.html` s'affiche
- [ ] Une URL inventée (`/nimportequoi`) affiche bien la page 404

Puis remplacez `VOTRE-PSEUDO-GITHUB` partout — voir la
[section 9a](#a-lurl-du-site) — et poussez à nouveau :

```bash
git add .
git commit -m "URL du site renseignée"
git push
```

### Mettre le site à jour ensuite

```bash
git add .
git commit -m "Description de la modification"
git push
```

GitHub Pages se met à jour tout seul en une minute environ.

---

## 11. Ajouter un nom de domaine plus tard

### Étape 1 — Acheter le domaine

Chez OVH, Gandi, Infomaniak, Namecheap… peu importe.

### Étape 2 — Configurer le DNS chez le registraire

Pour le domaine nu (`anno.fr`), créez **quatre enregistrements A** pointant
vers les serveurs de GitHub :

| Type | Nom | Valeur |
|------|-----|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Pour le sous-domaine `www`, créez **un enregistrement CNAME** :

| Type | Nom | Valeur |
|------|-----|--------|
| CNAME | `www` | `VOTRE-PSEUDO.github.io.` |

> Le point final après `.github.io.` est normal, la plupart des interfaces
> l'ajoutent toutes seules.
>
> Ces adresses IP sont celles publiées par GitHub. Vérifiez-les le jour venu
> sur la documentation officielle : <https://docs.github.com/pages>

### Étape 3 — Déclarer le domaine sur GitHub

**Settings → Pages → Custom domain**, saisissez `anno.fr`, puis **Save**.
GitHub crée automatiquement un fichier `CNAME` à la racine du dépôt.

Si vous préférez le créer vous-même :

```bash
echo "anno.fr" > CNAME
git add CNAME && git commit -m "Ajout du domaine personnalisé" && git push
```

### Étape 4 — Attendre la propagation DNS

De quelques minutes à 48 heures. GitHub affiche *DNS check in progress* puis
une coche verte.

### Étape 5 — Activer HTTPS

Toujours dans **Settings → Pages**, cochez **Enforce HTTPS**.

La case reste grisée tant que le certificat n'est pas émis — c'est
automatique et gratuit (Let's Encrypt), comptez jusqu'à 24 heures après la
validation du DNS.

### Étape 6 — Mettre les URL à jour

Une fois le domaine actif, remplacez partout
`https://VOTRE-PSEUDO.github.io/Anno-automatisation/` par `https://anno.fr/`
dans `index.html`, `robots.txt` et `sitemap.xml`, puis poussez.

### Étape 7 — Vérification finale

- [ ] `https://anno.fr` s'affiche avec le cadenas
- [ ] `http://anno.fr` redirige automatiquement vers `https://`
- [ ] `https://www.anno.fr` fonctionne aussi
- [ ] Collez l'URL dans un message LinkedIn : l'aperçu avec le logo apparaît
- [ ] Testez la page sur <https://pagespeed.web.dev>

---

## 12. Sécurité

Ce dépôt ne doit contenir **aucune** donnée sensible : ni clé d'API, ni jeton,
ni mot de passe, ni identifiant privé. Un dépôt public est lisible par tout le
monde, et l'historique Git garde la trace de tout ce qui a été commité — même
supprimé ensuite.

Le `.gitignore` bloque déjà les fichiers les plus courants (`.env`, `*.key`,
`*.pem`, `secrets.json`). Avant chaque `git push`, un réflexe :

```bash
git status
```

Si un fichier douteux apparaît, retirez-le avant de commiter.

Le site lui-même n'a aucune surface d'attaque : il est entièrement statique,
ne contient aucun formulaire, ne dépose aucun cookie, ne charge aucun script
tiers et ne collecte aucune donnée.

---

© 2026 Anno — Analyser · Naviguer · Optimiser
# anno-automatisation
