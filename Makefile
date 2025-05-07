.PHONY: serve

SVGFLAGS := --config ./svgo.config.mjs
SVGFLAGS_SPRITES := --config ./svgo-sprites.config.mjs
ASSETS := src/assets

install:
	npm ci
	cd scripts/flickr_cache && make install

serve:
	npm run dev

optimize-svgs:
	npx svgo $(SVGFLAGS_SPRITES) \
		-i $(ASSETS)/icons/icons-sprite.svg \
		-o $(ASSETS)/icons/icons-sprite.optimized.svg
	npx svgo $(SVGFLAGS) \
		-i $(ASSETS)/projects/big-frog.redux.svg \
		-o $(ASSETS)/projects/big-frog.redux.optimized.svg
