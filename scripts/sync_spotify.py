#!/usr/bin/env python3
"""
Sync Jul's discography from Spotify API → _data/albums.yml + _data/records.yml
Ajoute automatiquement les nouveaux albums studio avec leur tracklist complète.
"""

import os
import re
import sys
import requests

ARTIST_ID    = '3IW7ScrzXmPvZhB27hmfgy'   # Jul sur Spotify
ALBUMS_FILE  = '_data/albums.yml'
RECORDS_FILE = '_data/records.yml'
GRATUITS_FILE = '_data/albums_gratuits.yml'

# Albums à ne pas ajouter dans albums.yml (compilations, gratuits, projets collectifs)
EXCLUDED_TITLE_FRAGMENTS = [
    'album gratuit', '13 organisé', 'classico organisé',
    'planète rap gratuit', 'bande organisée',
]


# ─── Auth ────────────────────────────────────────────────────────────────────

def get_token():
    resp = requests.post(
        'https://accounts.spotify.com/api/token',
        data={'grant_type': 'client_credentials'},
        auth=(os.environ['SPOTIFY_CLIENT_ID'], os.environ['SPOTIFY_CLIENT_SECRET']),
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()['access_token']


def spotify_get(token, url, params=None):
    resp = requests.get(
        url,
        headers={'Authorization': f'Bearer {token}'},
        params=params or {},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


# ─── Spotify data ─────────────────────────────────────────────────────────────

def get_studio_albums(token):
    """Récupère tous les albums studio de Jul (Jul en artiste principal)."""
    albums, url = [], f'https://api.spotify.com/v1/artists/{ARTIST_ID}/albums'
    params = {'include_groups': 'album', 'market': 'FR', 'limit': 50}
    while url:
        data = spotify_get(token, url, params)
        for a in data['items']:
            if a['artists'][0]['id'] == ARTIST_ID:
                title_lower = a['name'].lower()
                if not any(frag in title_lower for frag in EXCLUDED_TITLE_FRAGMENTS):
                    albums.append(a)
        url, params = data.get('next'), {}
    return albums


def get_tracks(token, album_id):
    tracks, url = [], f'https://api.spotify.com/v1/albums/{album_id}/tracks'
    params = {'limit': 50, 'market': 'FR'}
    while url:
        data = spotify_get(token, url, params)
        tracks.extend(data['items'])
        url, params = data.get('next'), {}
    return sorted(tracks, key=lambda t: t['track_number'])


# ─── Helpers ─────────────────────────────────────────────────────────────────

def make_slug(title):
    s = title.lower()
    for src, dst in [("'", ''), ("'", ''), ('é', 'e'), ('è', 'e'), ('ê', 'e'),
                     ('à', 'a'), ('â', 'a'), ('î', 'i'), ('ï', 'i'), ('ô', 'o'),
                     ('ù', 'u'), ('û', 'u'), ('ç', 'c'), ('œ', 'oe'), ('æ', 'ae'),
                     ('?', ''), ('!', ''), ('.', '')]:
        s = s.replace(src, dst)
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    return re.sub(r'[-\s]+', '-', s).strip('-')


def escape_yaml(text):
    return text.replace('"', '\\"')


def full_date(date_str):
    """Complète une date Spotify (peut être YYYY ou YYYY-MM) en YYYY-MM-DD."""
    parts = date_str.split('-')
    return '-'.join(parts + ['01'] * (3 - len(parts)))


def format_track_line(track):
    num   = track['track_number']
    title = escape_yaml(track['name'])
    feats = [a['name'] for a in track['artists'] if a['id'] != ARTIST_ID]
    if feats:
        feat_str = escape_yaml(', '.join(feats))
        return f'    - {{ num: {num}, title: "{title}", feat: "{feat_str}" }}'
    return f'    - {{ num: {num}, title: "{title}" }}'


def format_album_entry(album, tracks):
    slug  = make_slug(album['name'])
    date  = full_date(album['release_date'])
    year  = date[:4]
    lines = [
        f'\n- id: {slug}',
        f'  title: "{escape_yaml(album["name"])}"',
        f'  year: {year}',
        f'  date: "{date}"',
        f'  certification: ~',
        f'  status: sorti',
        f'  tracks_count: {len(tracks)}',
        f'  slug: {slug}',
        f'  tracklist:',
    ] + [format_track_line(t) for t in tracks]
    return '\n'.join(lines)


def load_slugs(filepath):
    try:
        with open(filepath) as f:
            return set(re.findall(r'^\s*slug:\s*(.+)$', f.read(), re.MULTILINE))
    except FileNotFoundError:
        return set()


def update_records_count(new_count):
    with open(RECORDS_FILE) as f:
        content = f.read()
    content = re.sub(
        r'(- label: "Albums studio"\n    value: )\d+(\n    display: ")\d+(")',
        lambda m: f'{m.group(0).split(chr(10))[0].rsplit(" ", 1)[0]} {new_count}\n'
                  f'    display: "{new_count}"',
        content,
    )
    # Simpler regex approach:
    content = re.sub(r'(?<=value: )\d+(?=\n    display: "\d+")', str(new_count), content)
    content = re.sub(r'(?<=display: ")\d+(?=" \n    icon: "ph-disc)', str(new_count), content)
    with open(RECORDS_FILE, 'w') as f:
        f.write(content)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    if not os.environ.get('SPOTIFY_CLIENT_ID'):
        print('❌ SPOTIFY_CLIENT_ID manquant')
        sys.exit(1)

    print('🎵 Authentification Spotify…')
    token = get_token()

    print('📀 Récupération des albums de Jul…')
    spotify_albums = get_studio_albums(token)
    print(f'   {len(spotify_albums)} albums trouvés sur Spotify')

    existing = load_slugs(ALBUMS_FILE) | load_slugs(GRATUITS_FILE)
    print(f'   {len(load_slugs(ALBUMS_FILE))} albums déjà dans albums.yml')

    new_entries = []
    for album in spotify_albums:
        slug = make_slug(album['name'])
        if slug in existing:
            continue
        print(f'   ✨ Nouvel album : {album["name"]} ({album["release_date"]})')
        tracks = get_tracks(token, album['id'])
        entry  = format_album_entry(album, tracks)
        new_entries.append((album['release_date'], entry))

    if not new_entries:
        print('✅ Aucun nouvel album — rien à mettre à jour.')
        return

    new_entries.sort(key=lambda x: x[0])

    with open(ALBUMS_FILE, 'a') as f:
        for _, entry in new_entries:
            f.write(entry + '\n')

    new_total = len(load_slugs(ALBUMS_FILE))
    update_records_count(new_total)

    print(f'✅ {len(new_entries)} nouvel(s) album(s) ajouté(s). Total : {new_total}')


if __name__ == '__main__':
    main()
