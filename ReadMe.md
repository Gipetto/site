# Top-Frog Static (Eleventy)

2025 reboot/modernization of the site using the Eleventy static site generator.


## Writing Posts

@TODO: new post generator template

### Manual Lighbox

Images should optimally be included via Flickr to get responsive image sizing.

```
@TODO documentation for updated embedding
```

### Flickr embedding with lightbox

```
{% flickr_photo '17141038408' %} 
```

### Notes:

- When adding a flickr image:
  - re-run the flickr-cache generator
  - restart the dev server


## Dev

```
npm i
npm run dev
```


## Publish

Push/merge to master, GH Actions will build and publish the site.


## Flickr auth

### Setup

  - copy `auth.json.dist` to `auth.json`
  - get your flickr api key data and enter to `auth.json`
  - run `pipenv run python auth.py`
  - copy and paste the generated url in a browser
  - extract the `oauth_verifier` token from the XML output and provide it to the script
  - you should now have a fully populated `auth.json` file

### Run

  - `pipenv run python cache.py`
