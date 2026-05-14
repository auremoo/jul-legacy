# Jul Fan Website

Site fan statique dédié à Jul — rappeur marseillais, artiste le plus certifié du rap français, recordman du Stade de France (97 816 spectateurs, avril 2025).

Hébergé sur **GitHub Pages** via Jekyll.

## Stack

- [Jekyll](https://jekyllrb.com/) — générateur de site statique
- HTML5 / SCSS / JavaScript vanilla
- Polices : Bebas Neue (titres) + Inter (corps)
- Palette : dark & doré (`#0A0A0A` + `#C9A84C`) et Marseille vibes (bleu ciel + blanc)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil — hero, dernière sortie, records |
| `/biographie` | Timeline de vie de Jul |
| `/discographie` | Tous les albums avec certifications |
| `/collaborations` | Feats & projets notables |
| `/actualites` | Blog d'actualités |
| `/galerie` | Galerie photos |
| `/fan-zone` | Quiz, anecdotes, classements fan |
| `/medias` | Clips YouTube & playlists Spotify |

## Développement local

### Prérequis

- Ruby >= 3.0
- Bundler (`gem install bundler`)

### Installation

```bash
bundle install
bundle exec jekyll serve --livereload
```

Le site est accessible sur `http://localhost:4000`.

### Build production

```bash
bundle exec jekyll build
```

Les fichiers générés se trouvent dans `_site/`.

## Déploiement GitHub Pages

Le site se déploie automatiquement via GitHub Actions à chaque push sur `main`.  
Voir `.github/workflows/deploy.yml`.

## Structure du projet

```
jul-legacy/
├── _data/          # Données YAML (albums, collaborations…)
├── _includes/      # Composants réutilisables (header, footer, nav…)
├── _layouts/       # Templates de pages
├── _posts/         # Articles d'actualités
├── _sass/          # Styles SCSS
├── assets/         # Images, polices, JS compilé
├── pages/          # Pages du site (.md / .html)
├── _config.yml     # Configuration Jekyll
└── Gemfile         # Dépendances Ruby
```

## Contribuer

Les contributions sont les bienvenues ! Ouvre une issue ou une pull request.  
Merci de respecter la charte graphique définie dans `_sass/_variables.scss`.

## Licence

Contenu éditorial sous [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).  
Le code source est sous licence MIT.  
Les photos et visuels appartiennent à leurs propriétaires respectifs.
