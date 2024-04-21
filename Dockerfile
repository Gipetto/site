FROM jekyll/jekyll:latest
LABEL gippy-pages=true

RUN apk add lapack-dev openblas-dev

ADD Gemfile /srv/jekyll
ADD Gemfile.lock /srv/jekyll
WORKDIR "/srv/jekyll"
RUN bundle config set --local system 'true'
# RUN bundle update
RUN bundle install
