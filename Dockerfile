FROM jekyll/jekyll:3.8
LABEL gippy-pages=true

RUN apk add gsl gsl-dev