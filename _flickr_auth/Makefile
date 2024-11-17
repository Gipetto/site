.PHONY: cache auth install

install:
	# python -m pipenv shell; \
	# pipenv install flickr_api;
	PIPENV_VENV_IN_PROJECT=1 pipenv install

auth:
	python -m pipenv run python auth.py

cache:
	python -m pipenv run python cache.py
