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
DOCKER_IMAGE := gippy-pages
CC_VERSION := v20211201

TODAYS_DAY := $(shell date +%F)
TODAYS_DATE := $(shell date +%FT%T%z)

post:
	@read -p "Slug for new post: " SLUG; \
	NEW_POST=_posts/$(TODAYS_DAY)-$$SLUG.md; \
	cat .post-template > $$NEW_POST; \
	sed -i 's/{{date}}/$(TODAYS_DATE)/' $$NEW_POST; \
	code -r $$NEW_POST -

install: docker-build
	mkdir -p _bin
	mkdir -p _site
	bundle install
	rm -f _bin/closure-compiler/closure-compiler-*.jar
	wget -P _bin/closure-compiler \
		https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/$(CC_VERSION)/closure-compiler-$(CC_VERSION).jar

clean:
	rm -rf $(SITE)/*
	rm -f $(JS)/*.min.*
	rm -f .jekyll-metadata
	rm -rf .sass-cache/*

optimize-svgs:
	# we want to ensure the sprite retains the width and height attributes
	svgo $(SVGFLAGS) \
		--disable removeDimensions \
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
	curl $(CRLFLAGS) -4 https://top-frog.com | head -1
	curl $(CRLFLAGS) -4 https://top-frog.com/photography/ | head -1
	curl $(CRLFLAGS) -4 https://top-frog.com/projects/ | head -1
	curl $(CRLFLAGS) -4 https://top-frog.com/about/ | head -1
	curl $(CRLFLAGS) -4 https://top-frog.com/js/behavior.min.js | head -1
	curl $(CRLFLAGS) -4 https://top-frog.com/css/main.css | head -1
	curl $(CRLFLAGS) -6 https://top-frog.com | head -1
	curl $(CRLFLAGS) -6 https://top-frog.com/photography/ | head -1
	curl $(CRLFLAGS) -6 https://top-frog.com/projects/ | head -1
	curl $(CRLFLAGS) -6 https://top-frog.com/about/ | head -1
	curl $(CRLFLAGS) -6 https://top-frog.com/js/behavior.min.js | head -1

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
		$(SITE)/ top-frog.com:top-frog.com/public_html_static

build: clean validate-avatar-json
	docker run --rm -it \
		--cpus 4 \
		--memory=4g \
		--volume "$(PWD):/srv/jekyll" \
		--volume "$(PWD)/vendor/bundle:/usr/local/bundle" \
		--env JEKYLL_ENV=production \
		--name $(DOCKER_IMAGE) \
		$(DOCKER_IMAGE):latest \
		jekyll build \
		$(JKLFLAGS)

serve: clean
	docker run --rm -it \
		--volume "$(PWD):/srv/jekyll" \
		--volume "$(PWD)/vendor/bundle:/usr/local/bundle" \
		--env JEKYLL_ENV=development \
		-p 4000:4000 \
		-p 35729:35729 \
		--name $(DOCKER_IMAGE) \
		$(DOCKER_IMAGE):latest \
		jekyll serve \
		$(JKLFLAGS) \
		--incremental \
		--limit_posts 50 \
		--livereload \
		--watch 

serve-php:
	php -S $(LOCALHOST):4001

docker-build:
	docker build \
		--no-cache \
		-t $(DOCKER_IMAGE):latest .

validate-avatar-json:
	python -mjson.tool avatar/avatar.json > /dev/null \
		&& echo "Avatar JSON OK"

flickr-cache:
	cd _flickr_auth && pipenv run python cache.py
