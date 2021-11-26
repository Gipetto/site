FROM jekyll/jekyll:4.2.0
LABEL gippy-pages=true

RUN apk add gsl gsl-dev

ADD Gemfile /srv/jekyll
ADD Gemfile.lock /srv/jekyll
WORKDIR "/srv/jekyll"
RUN bundle config set --local system 'true'
RUN bundle install
