.PHONY: build watch serve serve-php install clean http-check deploy

LOCALHOST := 0.0.0.0
JKLFLAGS := --lsi --profile --trace
SVGFLAGS := --disable=removeTitle
CRLFLAGS := -isN -H 'Cache-Control: no-cache'
SITE := _site
ASSETS := assets
JS := js
JS_COMPILE := SIMPLE
JS_INFILE := $(JS)/behavior.js
JS_OUTFILE := $(JS)/behavior.min.js

install: docker-build
	mkdir -p _bin
	mkdir -p _site
	bundle install
	wget -P _bin \
		https://dl.google.com/closure-compiler/compiler-latest.zip
	unzip _bin/compiler-latest.zip -d _bin/closure-compiler

clean:
	rm -rf $(SITE)/*
	rm -f $(JS)/*.min.*
	rm -f .jekyll-metadata
	rm -rf .sass-cache/*

optimize-svgs:
	svgo $(SVGFLAGS) \
		-i $(ASSETS)/icons/icons-sprite.svg \
		-o $(ASSETS)/icons/icons-sprite.optimized.svg
	svgo $(SVGFLAGS) \
		-i $(ASSETS)/big-frog.svg \
		-o $(ASSETS)/big-frog.optimized.svg
	svgo $(SVGFLAGS) \
		-i $(ASSETS)/name.svg \
		-o $(ASSETS)/name.optimized.svg

minify-js:
	java -jar _bin/closure-compiler/closure-compiler-*.jar \
		--js $(JS_INFILE) \
		--js_output_file $(JS_OUTFILE) \
		--create_source_map $(JS_OUTFILE).map \
		--strict_mode_input \
		--language_out STABLE \
		--env BROWSER \
		--compilation_level $(JS_COMPILE)
	echo "//# sourceMappingURL=/$(JS_OUTFILE).map" >> $(JS_OUTFILE)
	cp -f $(JS)/*.min.* $(SITE)/$(JS)

stupid-http-check:
	sleep 3s
	curl $(CRLFLAGS) https://top-frog.com | head -1
	curl $(CRLFLAGS) https://top-frog.com/photography/ | head -1
	curl $(CRLFLAGS) https://top-frog.com/projects/ | head -1
	curl $(CRLFLAGS) https://top-frog.com/about | head -1
	curl $(CRLFLAGS) https://top-frog.com/js/behavior.min.js | head -1
	curl $(CRLFLAGS) https://top-frog.com/css/main.css | head -1

package: clean build minify-js
deploy: rsync stupid-http-check

rsync:
	rsync --archive \
		--partial \
		--progress \
		--delete \
		--inplace \
		--whole-file \
		--itemize-changes \
		$(SITE)/ gipetto1@top-frog.com:top-frog.com/public_html_static

build:
	JEKYLL_ENV=production jekyll build $(JKLFLAGS)

serve: clean docker
	JEKYLL_ENV=docker jekyll build \
		$(JKLFLAGS) \
		--incremental \
		--limit_posts=50 \
		--watch

serve-php:
	php -S $(LOCALHOST):4001

docker-build:
	docker build \
		--no-cache \
		-t gippy-pages:latest .

docker: stop
	docker run -dit \
		--rm \
		--name gippy-pages \
		-p 8080:80 \
		-v "$(PWD)/_site":/usr/local/apache2/htdocs/ \
		gippy-pages:latest

stop:
	docker stop gippy-pages || true