FROM jekyll/jekyll:4.0
LABEL gippy-pages=true

RUN apk add gsl gsl-dev