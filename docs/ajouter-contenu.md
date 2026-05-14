# Guide : ajouter du contenu

## Ajouter un nouvel album

Dans `_data/albums.yml` :

```yaml
- id: nom-album-slug
  title: "Nom de l'album"
  year: 2026
  date: "2026-12-01"          # Format ISO YYYY-MM-DD
  certification: platine       # platine | double-platine | triple-platine | diamant | ~
  status: sorti                # sorti | upcoming
  tracks_count: 20
  note: "Info optionnelle"     # ex: "Double album", "2e meilleur démarrage rap FR"
  slug: nom-album-slug
  tracklist:
    - { num: 1, title: "Titre 1" }
    - { num: 2, title: "Titre 2", feat: "Nom de l'artiste" }
```

## Ajouter un album à venir

Même format, avec `status: upcoming` et `certification: ~`. L'album apparaîtra :
- Dans la bannière de la page d'accueil
- En premier dans la discographie
- Dans l'onglet « À venir »

## Ajouter un article d'actualité

Créer un fichier dans `_posts/` au format `YYYY-MM-DD-slug.md` :

```markdown
---
layout: post
title: "Titre de l'article"
date: 2026-06-01
tags: [album, concert, feat]
emoji: 🎵
excerpt: "Résumé de l'article affiché dans la liste."
---

Contenu de l'article en Markdown...
```

## Ajouter une photo à la galerie

1. Placer la photo dans `assets/images/gallery/nom-photo.jpg`
2. Dans `pages/galerie.html`, ajouter une entrée dans `gallery_items` :

```
concerts,🎤,Description de la photo
```

Ou créer un include `_includes/gallery-item.html` pour plus de contrôle.

## Ajouter un featuring dans les données

Dans `_data/feats.yml` :

```yaml
- artist: "Nom de l'artiste"
  song: "Titre du son"
  album: "Nom de l'album (ou —)"
  year: 2026
  certification: platine        # optionnel
  category: rap-fr              # marseille | rap-fr | international
  note: "Info optionnelle"
```

## Ajouter une question au quiz

Dans `_data/quiz.yml` :

```yaml
- question: "Ta question ici ?"
  options: ["Option A", "Option B", "Option C", "Option D"]
  answer: 0            # Index (0-based) de la bonne réponse
  explanation: "Explication affichée après la réponse."
```

## Mettre à jour les chiffres clés (accueil)

Dans `_data/records.yml`, modifier les valeurs `value` et `display` des stats :

```yaml
- label: "Albums vendus"
  value: 10000000
  display: "10M+"
```

## Modifier les thèmes d'une page

Dans le front matter de la page :

```yaml
theme: dark       # Noir & doré
theme: marseille  # Bleu & blanc
```

## Ajouter un embed Spotify

Dans `pages/medias.html`, dupliquer un bloc `<iframe>` Spotify en remplaçant l'ID d'album/artiste :

```html
<iframe
  src="https://open.spotify.com/embed/album/ID_ALBUM?theme=0"
  width="100%"
  height="352"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```

L'ID se trouve dans l'URL Spotify : `open.spotify.com/album/**ID_ICI**`
