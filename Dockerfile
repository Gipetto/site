FROM httpd:2.4-alpine

RUN echo $'# Gippy Pages requirements \n\
LoadModule deflate_module modules/mod_deflate.so \n\
LoadModule headers_module modules/mod_headers.so \n\
LoadModule filter_module modules/mod_filter.so \n\
LoadModule rewrite_module modules/mod_rewrite.so \n\
<Directory "/usr/local/apache2/htdocs"> \n\
  AllowOverride All \n\
</Directory> \n\
' > /usr/local/apache2/conf/extra/gippy-pages.conf

RUN echo $'# Gippy Pages requirements \n\
Include conf/extra/gippy-pages.conf \n\
' >> /usr/local/apache2/conf/httpd.conf