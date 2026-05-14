# CLAUDE.md — Jul Fan Website

## Contexte

Site fan statique pour Jul (Julien Mari Bogaert), rappeur marseillais né le 14 janvier 1990.
Généré avec **Jekyll 4.3**, hébergé sur **GitHub Pages**.
Langue : **français uniquement**.
Logo : deux mains (signe Jul) dans un cercle — `assets/images/logo.svg` (placeholder SVG) / `assets/images/logo.png` (à fournir par l'utilisateur).

## Commandes essentielles

```bash
# Lancer le serveur de dev avec rechargement automatique
bundle exec jekyll serve --livereload

# Build production
bundle exec jekyll build

# Installer les dépendances
bundle install
```

## Architecture du projet

Voir `docs/architecture.md` pour la structure détaillée.

```
_data/          # Données YAML — source de vérité pour tout le contenu
_includes/      # nav.html, footer.html
_layouts/       # default.html, page.html, post.html
_posts/         # Articles actualités (YYYY-MM-DD-slug.md)
_sass/          # _variables.scss, _base.scss, _components.scss, main.scss
assets/
  images/       # logo.svg, albums/, gallery/, artists/
  js/main.js    # JS vanilla : nav, compteurs, filtres, quiz, lightbox
pages/          # Pages Jekyll avec front matter (nav_order, theme…)
index.html      # Accueil
docs/           # Documentation développeur
```

## Direction artistique

### Palette

| Token | Valeur | Usage |
|-------|--------|-------|
| `$dark` | `#0A0A0A` | Fond sombre |
| `$gold` | `#C9A84C` | Accent doré (D'Or et de Platine) |
| `$gold-light` | `#E8C97A` | Hover, highlights |
| `$marseille-blue` | `#2E6DB4` | Thème Marseille |
| `$sun` | `#F5A623` | Accent soleil / upcoming |
| `$white` | `#F5F5F0` | Blanc cassé |

### Typographie

- **Titres** : `Bebas Neue` (Google Fonts) — condensé, impactant
- **Corps & UI** : `Inter` (Google Fonts) — lisible, moderne

### Thèmes par page

- **Dark & doré** (`theme: dark`) → Accueil, Biographie, Discographie, Actualités, Médias
- **Marseille vibes** (`theme: marseille`) → Collaborations, Galerie, Fan Zone

## Données YAML — formats

### `_data/albums.yml`
```yaml
- id: slug-album
  title: "Titre"
  year: 2026
  date: "2026-05-15"
  certification: platine  # platine | double-platine | triple-platine | diamant | ~
  status: sorti           # sorti | upcoming
  tracks_count: 21
  slug: slug-album
  tracklist:
    - { num: 1, title: "Titre", feat: "Artiste" }  # feat optionnel
```

### `_data/feats.yml`
```yaml
- artist: "Nom"
  song: "Titre"
  album: "Album ou —"
  year: 2026
  category: marseille  # marseille | rap-fr | international
  certification: platine  # optionnel
```

### `_data/quiz.yml`
```yaml
- question: "Question ?"
  options: ["A", "B", "C", "D"]
  answer: 0  # index 0-based
  explanation: "Texte affiché après réponse"
```

## Conventions

- Tous les includes : tirets (`card-album.html`, pas `cardAlbum.html`)
- Images albums : `assets/images/albums/slug-album.jpg` (ratio 1:1, min 400×400px)
- Posts : `YYYY-MM-DD-slug.md` avec `layout: post`
- Ne pas committer `_site/`, `.jekyll-cache/` (dans `.gitignore`)
- Pas de dépendances JS tierces — vanilla JS uniquement
- Icônes : Phosphor Icons (`ph ph-nom`) chargé en CDN dans `default.html`

## Navigation auto-générée

La nav se construit automatiquement depuis les pages avec `nav_order` dans leur front matter :

```yaml
nav_order: 2
nav_title: Biographie
```

## JavaScript (`assets/js/main.js`)

Modules présents :
- **Nav hamburger** — scroll, toggle, Escape
- **Compteurs animés** — `IntersectionObserver` + `easeOutQuart`
- **Filtres discographie** — `data-filter`, `data-cert`
- **Filtres featurings** — `data-feat`
- **Filtres galerie** — `data-gallery`
- **Lightbox** — `data-src`, Escape, clic hors image
- **Quiz** — state machine complète, injection `QUIZ_DATA` depuis Jekyll
- **Fade-up** — `IntersectionObserver` sur `.anim-fade-up`

## Biographie & chiffres (référence rapide)

- **Nom complet** : Julien François Alain Mari Bogaert
- **Né le** : 14 janvier 1990, 12e arrondissement de Marseille
- **Label** : D'Or et de Platine (indépendant depuis 2015)
- **27 albums studio** (2014–2026), tous certifiés au moins Platine, 5 certifiés Diamant
- **10M+ albums vendus** (décembre 2025)
- **+2 300 sons** dans sa discographie
- **5 années consécutives** artiste le plus streamé sur Spotify France (2021–2025)
- **8 mai 2024** : allume le chaudron olympique à Marseille pour les JO de Paris 2024
- **Avril 2025** : record du Stade de France avec 97 816 spectateurs
- **15 mai 2026** : sortie de « Oubliez-moi » (26e album, 21 titres, 1 seul feat : Houari)
- **15-16 mai 2026** : concerts Stade de France (sold-out)
- **29-30 mai 2026** : concerts Orange Vélodrome (sold-out)

## Guide d'ajout de contenu

Voir `docs/ajouter-contenu.md` pour les procédures détaillées.
