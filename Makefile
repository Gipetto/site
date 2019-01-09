.PHONY: build, watch, serve

build:
	jekyll build --lsi --profile

watch:
	jekyll build --lsi --watch

serve:
	jekyll serve --lsi --livereload --incremental --profile
