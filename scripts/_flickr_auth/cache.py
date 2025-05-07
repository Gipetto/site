import io
from itertools import chain
import flickr_api # https://github.com/alexis-mignon/python-flickr-api
import json
import os
import re
import shutil

flickr_api.enable_cache()

cache_file = './flickr-cache.json'

posts_dir = '../../src/_posts'
photography_dir = '../../src/photography'
dirs = (
  posts_dir,
  photography_dir
)

photo_regex = re.compile(r'\{% render "flickr-photo" with flickr.photos\["([0-9]+)"\]')
album_regex = re.compile(r'\{% render "flickr-album" with flickr.albums\["([0-9]+)"\]')


def flickr_auth():
  with(open('auth.json', 'r')) as j:
    creds = json.load(j)

  flickr_api.set_keys(api_key = creds['api_key'], api_secret = creds['api_secret'])
  flickr_api.set_auth_handler('oauth_token.txt')


def load_cache_data():
  try:
    with(open(cache_file, 'r+')) as c:
      cache = json.load(c)
  except FileNotFoundError:
    cache = {
      "albums": {},
      "photos": {}
    }

  except io.UnsupportedOperation:
    cache = {
      "albums": {},
      "photos": {}
    }

  return cache


def write_cache_data(cache_data):
  with(open(cache_file, 'w')) as c:
    json.dump(cache_data, c, indent=2)


def scrape_ids():
  photo_ids = []
  album_ids = []

  for path, _, filenames in chain.from_iterable(os.walk(path) for path in dirs):
    for file in filenames:
      with open(os.path.join(path, file), 'r') as post:
        content = post.read()
        photo_ids.extend(photo_regex.findall(content))
        album_ids.extend(album_regex.findall(content))

  return (photo_ids, album_ids)


def cache(ids, albums, cache_data, user):
  _page = 1

  while True:
    try:
      print("Page: {}".format(_page))
      photos = user.getPhotos(page = _page, per_page = 500)
      for photo in photos:
        if photo.id in ids and photo.id not in cache_data["photos"]:
          print(f"getting info for '{photo.id}'")
          info = photo.getInfo()
          # exorcize data we don't want or that doesn't serialize well
          info.pop('owner', None)
          info.pop('tags', None)
          info.pop('notes', None)
          cache_data["photos"][photo.id] = {
            'info': info,
            'sizes': photo.getSizes()
          }

    except Exception as e:
      print(e)


    if _page == photos.info.pages:
      break

    _page += 1

  write_cache_data(cache_data)
  return cache_data

def extract_albums(album_ids, user):
  '''
  For now assuming albums don't contain more than 500 entries.
  When we hit that just implement pagination
  '''
  albums = {}

  for photoset in user.getPhotosets(per_page = 500):
    if photoset.id in album_ids:
      photo_ids = list(map(lambda photo: photo.id, photoset.getPhotos()))
      albums[photoset.id] = photo_ids

  return albums


def main():
  flickr_auth()
  user = flickr_api.test.login()

  cache_data = load_cache_data()
  ids, album_ids = scrape_ids()
  albums = extract_albums(album_ids, user)
  cache_data["albums"] = albums
  ids.extend([id for ids in albums.values() for id in ids])
  updated_cache_data = cache(ids, albums, cache_data, user)

  print("Objects in cache: {}".format(len(updated_cache_data["photos"])))

  shutil.copy(cache_file, "../../src/_data/")

if __name__ == '__main__':
  main()
