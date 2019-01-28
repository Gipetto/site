.PHONY: build, watch, serve

build:
	jekyll build --lsi --profile

watch:
	jekyll build --lsi --watch

serve:
	jekyll serve --host=0.0.0.0 \
		--trace \
		--lsi \
		--livereload \
		--incremental \
		--profile
