.PHONY: build, watch, serve

build:
	jekyll build \
		--lsi \ 
		--profile

serve:
	JEKYLL_ENV=local jekyll serve \
		--host=0.0.0.0 \
		--limit_posts=10 \
		--trace \
		--lsi \
		--livereload \
		--incremental \
		--profile

serve-php:
	php -S 0.0.0.0:8000