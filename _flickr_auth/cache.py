from itertools import chain
import flickr_api
import json
import os
import re
import sys

cache_file = '../.flickr-cache.json'

posts_dir = '../_posts'
photography_dir = '../photography'
dirs = (
  posts_dir,
  photography_dir
)

photo_regex = re.compile(r"\{% flickr_photo '([0-9]+)' %\}")
album_regex = re.compile(r"\{% flickr_album '([0-9]+)' %\}")


def flickr_auth():
  with(open('auth.json', 'r')) as j:
    creds = json.load(j)
  j.close()

  flickr_api.set_keys(api_key = creds['api_key'], api_secret = creds['api_secret'])
  flickr_api.set_auth_handler('oauth_token.txt')


def load_cache_data():
  with(open(cache_file, 'r')) as c:
    cache = json.load(c)
  c.close()

  return cache


def write_cache_data(cache_data):
  with(open(cache_file, 'w')) as c:
    json.dump(cache_data, c)
  c.close()


def scrape_ids():
  photo_ids = []
  album_ids = []

  for path, _, filenames in chain.from_iterable(os.walk(path) for path in dirs):
    for file in filenames:
      with open(os.path.join(path, file), 'r') as post:
        content = post.read()
        photo_ids.extend(photo_regex.findall(content))
        album_ids.extend(album_regex.findall(content))
      post.close()

  return (photo_ids, album_ids)


def cache(ids, cache_data, user):
  _page = 1

  while True:
    try:
      print("Page: {}".format(_page))
      photos = user.getPhotos(page = _page, per_page = 500)
      for photo in photos:
        if photo.id in ids and photo.id not in cache_data:
          info = photo.getInfo()
          # exorcize data we don't want that doesn't serialize well
          info.pop('owner', None)
          info.pop('tags', None)
          info.pop('notes', None)
          cache_data[photo.id] = {
            'info': info,
            'sizes': photo.getSizes()
          }

    except Exception as e:
      print(e)

    write_cache_data(cache_data)

    if _page == photos.info.pages:
      break

    _page += 1

  return cache_data

def extract_albums(albums, user):
  '''
  For now assuming albums don't contain more than 500 entries.
  When we hit that just implement pagination
  '''
  ids = []

  for photoset in user.getPhotosets(per_page = 500):
    if photoset.id in albums:
      photos = map(lambda photo: photo.id, photoset.getPhotos())
      ids.extend(photos)

  return ids


def main():
  flickr_auth()
  user = flickr_api.test.login()

  cache_data = load_cache_data()
  ids, albums = scrape_ids()
  ids.extend(extract_albums(albums, user))
  updated_cache_data = cache(ids, cache_data, user)

  print("Objects in cache: {}".format(len(updated_cache_data)))

if __name__ == '__main__':
  main()
