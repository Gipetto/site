.PHONY: cache auth install

install:
	python -m pipenv shell; \
	pipenv install flickr_api;

auth:
	python -m pipenv run python auth.py

cache:
	python -m pipenv run python cache.py
