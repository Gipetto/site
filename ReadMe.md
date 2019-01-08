# Top-Frog Static

Simpler is better. Too bad I have to use Ruby.

## Speeding up LSI

`brew install gsl` to get parent package.
Then add `gsl`, `nmatrix` & `narray` gems to `Gemfile`. Then `bundle install`.

You may have to install `nmatrix` and `narray` gems first, then install `gsl`.

## Lightbox

	{% include lightbox.html 
		id="unique-url-safe-id"
		img_lg="/path/to/large/photo.jpg"
		img_sm="/path/to/small/photo.jpg"
		title="Title for image alt."
		caption="Figure caption. Triple escape quotes if you must have them."
	%}

## Flickr embedding with lightbox

	{% flickr_photo '17141038408' %} 

## Todo

- Clean up author data
- ~~Cowsay~~
- ~~Threads~~
- wordcamp post downloads
- downloads for "Classes for file uploading in PHP"
- xhtmlr image (and others from that dir)
- add body class for page type, then use same class on nav items to auto-highlight active nav item
- post-process with grunt to minify html?
- kill all <!--more--> tags
- don't do paginated listing for home and older... just show the latest post on home, then use next/previous post links to filter down.
