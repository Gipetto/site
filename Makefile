.PHONY: build, watch, serve

build:
	jekyll build --lsi --profile

watch:
	jekyll build --lsi --watch

serve:
	jekyll serve --trace --lsi --livereload --incremental --profile
