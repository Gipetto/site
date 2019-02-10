.PHONY: build, watch, serve

install:
	mkdir _bin
	bundle install
	wget -P _bin \
		https://dl.google.com/closure-compiler/compiler-latest.zip
	unzip _bin/compiler-latest.zip -d _bin/closure-compiler

clean:
	rm -rf _site
	rm -f js/*.min.*

optimize-svgs:
	svgo --disable=removeTitle \
		-i assets/icons/icons-sprite.svg \
		-o assets/icons/icons-sprite.optimized.svg
	svgo --disable=removeTitle \
		-i assets/big-frog.svg \
		-o assets/big-frog.optimized.svg
	svgo --disable=removeTitle \
		-i assets/name.svg \
		-o assets/name.optimized.svg

minify-js:
	java -jar _bin/closure-compiler/closure-compiler-*.jar \
		--js js/behavior.js \
		--js_output_file js/behavior.min.js \
		--create_source_map js/behavior.min.js.map \
		--strict_mode_input \
		--language_out STABLE \
		--env BROWSER \
		--compilation_level SIMPLE
	echo "//# sourceMappingURL=/js/behavior.min.js.map" >> js/behavior.min.js
	cp -fX js/*.min.* _site/js

package: clean build minify-js

build:
	JEKYLL_ENV=production jekyll build \
		--lsi \
		--incremental \
		--profile \
		--trace

deploy:
	rsync --archive \
		--partial \
		--progress \
		--delete \
		--inplace \
		--whole-file \
		--itemize-changes \
		_site/ gipetto1@top-frog.com:top-frog.com/public_html_static

watch:
	JEKYLL_ENV=local jekyll build \
		--lsi \
		--incremental \
		--limit_posts=50 \
		--profile \
		--trace \
		--watch

serve: clean
	JEKYLL_ENV=local jekyll serve \
		--host=0.0.0.0 \
		--limit_posts=50 \
		--trace \
		--lsi \
		--livereload \
		--incremental \
		--profile

serve-php:
	php -S 0.0.0.0:8000
