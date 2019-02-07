.PHONY: build, watch, serve

build:
	jekyll build --lsi --profile

watch:
	jekyll build --lsi --watch

serve:
	JEKYLL_ENV=local jekyll serve --host=0.0.0.0 \
		--trace \
		--lsi \
		--livereload \
		--incremental \
		--profile

serve-avatar:
	cd avatar && php -S 0.0.0.0:8000