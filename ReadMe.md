# Top-Frog Static

~~Simpler is better.~~ (That died fast)  
Too bad I have to use Ruby. And, yes, I know that this whole thing is less than simple ;)

## Running Generator

### Flickr auth

*Setup*
- copy `auth.json.dist` to `auth.json`
- get your flickr api key data and enter to `auth.json`
- run `pipenv run python auth.py`
- copy and paste the generated url in a browser
- extract the `oauth_verifier` token from the XML output and provide it to the script
- you should now have a fully populated `auth.json` file

*Run*
- `pipenv run python cache.py`

### Local dev server

First we need to install a few things and intialize our docker container:

```
make install
```

To run local instance of the site with Apache in Docker, with the latest 50 posts only, and Jekyll watching for changes:

```
make serve
```

This starts a docker container and runs jekyll build with the watch flag. Access the site at `localhost:8080`.

### Build

To test the build, which includes full `.htaccess` config, Content Security Policies, and built assets:

```
make package
```

### Publish

_requires key based SSH auth on remote destination_

```
make package deploy
```

## Writing Posts

### Manual lightbox

	{% include lightbox-image.html 
		id="unique-url-safe-id"
		img_lg="/path/to/large/photo.jpg"
		img_sm="/path/to/small/photo.jpg"
		title="Title for image alt."
		caption="Figure caption. Triple escape quotes if you must have them."
	%}

### Flickr embedding with lightbox

	{% flickr_photo '17141038408' %} 

## Notes

### Speeding up LSI

`brew install gsl` to get parent package. (install `libgsl` on linux).  
Then add `gsl`, `nmatrix` & `narray` gems to `Gemfile`. Then `bundle install`.

You may have to install `nmatrix` and `narray` gems first, then install `gsl`.
