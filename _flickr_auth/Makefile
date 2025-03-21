.PHONY: cache auth install

install:
	# python -m pipenv shell; \
	# pipenv install flickr_api;
	PIPENV_VENV_IN_PROJECT=1 pipenv install
	cp auth.json.dist auth.json
	echo '{}' > ../.flickr-cache.json

auth:
	python -m pipenv run python auth.py

cache:
	python -m pipenv run python cache.py
