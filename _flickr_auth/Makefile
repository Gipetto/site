.PHONY: cache auth install

install:
	pipenv shell; \
	pipenv install flickr_api;

auth:
	pipenv run python cache.py

cache:
	pipenv run python cache.py