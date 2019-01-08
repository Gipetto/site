.PHONY: build, watch, serve

build:
	jekyll build --profile

watch:
	jekyll build --watch

serve:
	jekyll serve --livereload --incremental --profile
