# CLAUDE.md — Jul Fan Website

## Contexte

Site fan statique pour Jul (Julien Mari Bogaert), rappeur marseillais né le 14 janvier 1990.  
Généré avec **Jekyll**, hébergé sur **GitHub Pages**.  
Langue : **français uniquement**.

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

```
_data/          # Données structurées YAML (albums.yml, collabs.yml, records.yml)
_includes/      # Partials HTML réutilisables (header.html, footer.html, nav.html, card-album.html…)
_layouts/       # Templates Jekyll (default.html, page.html, post.html, discographie.html)
_posts/         # Articles actualités au format YYYY-MM-DD-titre.md
_sass/          # Styles SCSS
  _variables.scss   # Tokens de design (couleurs, typo, breakpoints)
  _base.scss        # Reset & styles globaux
  _components.scss  # Boutons, cards, badges…
  _dark-gold.scss   # Thème sombre & doré
  _marseille.scss   # Thème Marseille vibes
assets/
  images/       # Photos, covers d'albums
  fonts/        # Bebas Neue, Inter
  js/           # Scripts vanilla
pages/          # Pages du site (.md avec front matter)
```

## Direction artistique

### Palette

| Token | Valeur | Usage |
|-------|--------|-------|
| `$color-dark` | `#0A0A0A` | Fond sombre |
| `$color-gold` | `#C9A84C` | Accent doré (D'Or et de Platine) |
| `$color-gold-light` | `#E8C97A` | Hover, highlights |
| `$color-marseille-blue` | `#4A90D9` | Thème Marseille |
| `$color-marseille-sky` | `#87CEEB` | Fond clair Marseille |
| `$color-sun` | `#F5A623` | Accent soleil |
| `$color-white` | `#F5F5F0` | Blanc cassé |
| `$color-text-dark` | `#1A1A1A` | Texte sur fond clair |

### Typographie

- **Titres** : `Bebas Neue` (Google Fonts) — condensé, impactant
- **Corps & UI** : `Inter` (Google Fonts) — lisible, moderne
- **Tailles** : scale 1.25 (minor third), base 16px

### Thèmes par page

- **Dark & doré** → Accueil, Médias, Actualités, Discographie
- **Marseille vibes** → Biographie, Fan Zone, Galerie, Collaborations

Un layout Jekyll peut recevoir `theme: dark-gold` ou `theme: marseille` dans son front matter pour appliquer le bon thème. L'identité visuelle (typo, composants, espacement) reste identique dans les deux thèmes.

## Données YAML

### `_data/albums.yml`
```yaml
- title: "Dans ma paranoïa"
  year: 2014
  certification: platine
  cover: dans-ma-paranoia.jpg
```

Certifications possibles : `platine`, `double-platine`, `triple-platine`, `diamant`

### `_data/records.yml`
Contient les chiffres clés animés sur l'accueil (albums vendus, streams, années #1 Spotify…).

## Conventions

- Nommer les includes avec des tirets : `card-album.html`, `section-hero.html`
- Les layouts héritent de `default.html` via `layout: default`
- Les posts d'actualités suivent le format Jekyll standard : `YYYY-MM-DD-slug.md`
- Les images d'albums : `assets/images/albums/slug-album.jpg` (ratio 1:1, min 400×400px)
- Ne pas committer `_site/` ni `.jekyll-cache/` (dans `.gitignore`)
- Pas de dépendances JavaScript tierces sauf si absolument nécessaire — vanilla JS en priorité

## Biographie (résumé pour le contenu)

- **Nom complet** : Julien François Alain Mari Bogaert
- **Né le** : 14 janvier 1990, 12e arrondissement de Marseille
- **Label** : D'Or et de Platine (indépendant depuis 2015)
- **~24 albums studio** (2014–2025), tous certifiés au moins platine, 5 certifiés diamant
- **10M+ albums vendus** (décembre 2025)
- **5 années consécutives** artiste le plus streamé sur Spotify France (2021–2025)
- **8 mai 2024** : allume le chaudron olympique à Marseille pour les JO de Paris 2024
- **Avril 2025** : record du Stade de France avec 97 816 spectateurs
