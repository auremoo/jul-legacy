# Architecture du site

## Structure Jekyll

```
jul-legacy/
├── _config.yml           # Configuration Jekyll (baseurl, plugins, collections, defaults)
├── Gemfile               # Dépendances Ruby (Jekyll 4.3, plugins SEO/feed/sitemap/paginate)
│
├── _data/                # Données YAML (aucun hardcode dans les templates)
│   ├── albums.yml        # 27 albums studio avec tracklists et certifications
│   ├── compilations.yml  # 13 Organisé 1 & 2
│   ├── singles.yml       # Singles notables avec YouTube ID
│   ├── feats.yml         # Featurings de Jul chez d'autres artistes
│   ├── records.yml       # Chiffres clés (stats animées) + milestones
│   ├── bio.yml           # Événements de la timeline biographique
│   └── quiz.yml          # Questions/réponses du quiz Fan Zone
│
├── _layouts/
│   ├── default.html      # Layout racine (head, nav, footer, lightbox, scripts)
│   ├── page.html         # Pages standard avec page-hero (thème injecté via front matter)
│   └── post.html         # Articles d'actualités
│
├── _includes/
│   ├── nav.html          # Navigation fixe + hamburger mobile (auto-générée depuis pages nav_order)
│   └── footer.html       # Footer avec liens sociaux et chiffres clés
│
├── _sass/
│   ├── _variables.scss   # Tokens de design : couleurs, typo, breakpoints, mixins
│   ├── _base.scss        # Reset, thèmes body (.theme-dark / .theme-marseille), container, typo
│   ├── _components.scss  # Tous les composants : cards, boutons, filtres, grids, quiz, galerie…
│   └── main.scss         # Point d'entrée SCSS : nav, footer, hero, page-hero, animations
│
├── assets/
│   ├── images/
│   │   ├── logo.svg      # Logo SVG (deux mains Jul + cercle) — à remplacer par logo.png fourni
│   │   ├── albums/       # Covers d'albums (slug-album.jpg, ratio 1:1, min 400×400px)
│   │   ├── gallery/      # Photos de galerie
│   │   └── artists/      # Photos des artistes (featurings)
│   └── js/
│       └── main.js       # JS vanilla : nav hamburger, compteurs, filtres, quiz, lightbox
│
├── pages/                # Pages du site (front matter : layout, title, theme, nav_order)
│   ├── biographie.html
│   ├── discographie.html
│   ├── collaborations.html
│   ├── actualites.html
│   ├── galerie.html
│   ├── fan-zone.html
│   └── medias.html
│
├── _posts/               # Articles d'actualités (YYYY-MM-DD-slug.md)
│   └── 2026-05-14-oubliez-moi-sort-demain.md
│
├── index.html            # Page d'accueil (layout: default, thème dark)
│
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Actions : build Jekyll + deploy GitHub Pages
```

## Système de thèmes

Le site utilise deux thèmes visuels définis dans le front matter de chaque page :

```yaml
theme: dark      # Fond noir #0A0A0A, accents dorés #C9A84C
theme: marseille # Fond blanc cassé #F8F7F2, accents bleu #2E6DB4
```

| Page | Thème |
|------|-------|
| Accueil | dark |
| Biographie | dark |
| Discographie | dark |
| Collaborations | marseille |
| Actualités | dark |
| Galerie | marseille |
| Fan Zone | marseille |
| Médias | dark |

L'identité visuelle (Bebas Neue + Inter, composants, espacement) est identique dans les deux thèmes.

## Navigation auto-générée

La nav est générée depuis les pages ayant un `nav_order` dans leur front matter :

```yaml
nav_order: 2
nav_title: Biographie  # Label court pour la nav
```

## Données YAML → HTML

Toutes les données sont dans `_data/`. Les templates itèrent via Liquid :

```liquid
{% for album in site.data.albums %}
  {{ album.title }} — {{ album.year }}
{% endfor %}
```

Ajouter un album = modifier `_data/albums.yml`. Aucun template à toucher.

## JavaScript vanilla

`assets/js/main.js` gère :
- **Nav hamburger** : toggle `.open`, `aria-expanded`, overflow body
- **Compteurs animés** : `IntersectionObserver` + easing `easeOutQuart`
- **Filtres discographie** : `data-filter` / `data-cert` sur les boutons
- **Filtres featurings** : `data-feat` category
- **Filtres galerie** : `data-gallery` category
- **Lightbox** : ouverture/fermeture, Escape, clic hors image
- **Quiz** : state machine (current, score, answered), rendu dynamique
- **Fade-up scroll** : `IntersectionObserver` sur `.anim-fade-up`

Aucune dépendance JS tierce.
