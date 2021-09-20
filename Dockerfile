FROM jekyll/jekyll:4.2.0
LABEL gippy-pages=true

RUN apk add gsl gsl-dev