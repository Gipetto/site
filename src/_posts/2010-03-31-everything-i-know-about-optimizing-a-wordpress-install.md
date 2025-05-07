---
id: 1247
title: Everything I know about optimizing a WordPress install on Apache
date: 2010-03-31T00:03:34+00:00
layout: post.liquid
guid: http://top-frog.com/?p=1247
permalink: /2010/03/31/everything-i-know-about-optimizing-a-wordpress-install/
categories:
  - 'Web Design & Development'
tags:
  - apache
  - apc
  - cache
  - cdn
  - compress
  - content
  - css
  - delivery
  - gzip
  - headers
  - htaccess
  - javascript
  - mod_deflate
  - mod_expires
  - mod_rewrite
  - mysql
  - optimize
  - php
  - server
  - wordpress
---

<div class="alert warning">

**NOTICE:** This article is very old and lots has changed since it was published. Be aware that while the syntax/options below may have changed, the concepts are still the same.

</div>

I don't mean to badmouth WordPress when I say this, but if you deploy a WordPress based site without optimizing your install you're just asking for a slow site.

Below is everything I know about optimizing a WordPress installation. It is by no means a list of everything you can do to optimize a server for WordPress, but its a damn good base. Because of the nature of tweaking servers, you'll need access to the server config files (and most likely access to the root user on the server) to make most of these changes.



<div class="quicknav">
  <p>
    <b>Update 2010-04-01:</b> To be honest, this is mostly an article on optimizing your LAMP stack with some WordPress items at the end. I wrote it because I had seen some people put up some WordPress based sites that were struggling under load. It really applies to any general website deployment.
  </p>
  
  <p>
    <b>Update 2010-07-21:</b> Updated with a snippet for excluding subversion directories via the .htaccess file.
  </p>
</div>

### 1. Apache

Apache is the backbone of your server install. Getting it serving your content well is one of the more important parts of the optimization. Some folks will evangelize the removal of modules that you don't need to reduce Apache's memory footprint but I've found that this mostly creates issues in one form or another. Deleting this or deleting that disables functionality that you may not realize that you needed or wanted. I've found that those are best of being left alone. The default module set for PHP is long, but not terribly gratuitous.

#### Use mod_expires to Control Browser Caching

The [mod_expires](http://httpd.apache.org/docs/2.0/mod/mod_expires.html) Apache module controls how the Expires cache control header is sent to the browser. Using this module can allow for aggressive caching policies so that user's browsers hold on to the data longer. 

For Example, in your VirtualHost config you can enter:

``` apacheconf
<ifModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 300 seconds"
    ExpiresByType text/html "access plus 600 seconds"
    ExpiresByType text/xml "access plus 600 seconds"
    ExpiresByType text/css "access plus 1 day"
    ExpiresByType text/javascript "access plus 1 day"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
</ifModule>
```

If you don't have access to your Virtual Host config then these can also be used in a .htaccess file.

This is very aggressive caching, but by using WordPress' [version parameter when enqueueing your scripts](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) and [styles](https://developer.wordpress.org/reference/functions/wp_enqueue_style/) you can ensure that your clients are always getting the most current site resources. Increment your style's or script's version each time you push an update to your site and the browser will see it as a unique url and request the new data from the server. This way you can have your cake and eat it too – long cache times and a way to force the content to be re-downloaded when changed.

#### Use mod_deflate to GZip content

If you have [mod_deflate](http://httpd.apache.org/docs/2.0/mod/mod_deflate.html) active in your Apache install you can gzip the content that is delivered to browsers that understand gzipped content. This can decrease the amount of time it takes to transmit data to the user.

Again, we'll need to add config parameters:

``` apacheconf
<IfModule mod_deflate.c>
    # Set output filter for zipping content
    SetOutputFilter DEFLATE
    # Netscape 4.x and 4.06-4.08 have issues
    BrowserMatch ^Mozilla/4 gzip-only-text/html
    BrowserMatch ^Mozilla/4\.0[678] no-gzip
    # MSIE can be an issue, for now catch all MSIE
    BrowserMatch \bMSIE[56] !no-gzip !gzip-only-text/html
    # Exclude file types from compression
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|pdf|zip|tar|rar|gz|dmg|mp3|mp4|m4a|m4p|mov|mpe?g|qt)$ no-gzip dont-vary
    # Make sure proxy servers deliver what they're given
    Header append Vary User-Agent env=!dont-vary
</IfModule>
```

#### Disable the Etag Header

When using the mod_expires changes above the ETag becomes obsolete. Removing the ETag disables the browser's ability to validate the file's cache time so that they rely on the headers that are custom configured. This can save a little bit of overhead in Apache.

For these you'll unfortunately need access to the Apache config as they need to be set globally. If you're on a shared host, talk to your web host about it and see if they can accommodate you. On its own this is not a monster change, so if you can't get this one done I wouldn't sweat it. Every little bit helps, but this isn't crucial.

``` apacheconf
# Send minimal server tokens
# This sends less data about the server with each request. Its measured in bytes, but its also uneeded load
#  You'll probably be finding an existing declaration instead of adding this
ServerTokens Min
# Unset the etag header to reduce apache workload
# This is a global config item and cannot be used in a vhost declaration
Header unset ETag
FileETag None
```

#### mod_rewrite to exclude non-wordpress resources

When using &#8220;Pretty Permalinks&#8221; WordPress will try to catch any file request that wasn't found on the filesystem. By default all requests that can't be met by a file on the system are funneled to WordPress. If you serve a lot of auxiliary files for such things as bulk emails or web galleries this can incur a lot of overhead if a few files somehow go missing or a typo is missed in a url. One or two missing images in an email blast that in turn invokes 404 responses from WordPress can bring even a well endowed server to its knees. Fortunately its very easy to exclude these high-traffic directories from having an impact on WordPress.

Add a line like this to the WordPress .htaccess rules

``` apacheconf
RewriteRule ^(dir_1|dir_2|dir_3) - [L]
```

so that you look like this:

``` apacheconf
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^(dir_1|dir_2|dir_3) - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
```

If you use Subversion to manage and deploy your site then you'll also want to deny access to the .svn directories. Add this line after the RewriteBase directive to keep people from looking at your subversion info:

``` apacheconf
RedirectMatch 404 /\.svn(/|$)
```

There are a few different ways to accomplish this task, but this one is the easiest if you don't control the server.

And, while you're at it, [exclude WordPress from handling the favicon too](http://top-frog.com/2009/09/18/wordpress-users-use-a-favicon/)!

### 2. PHP

The PHP tweaks all require access to your PHP.ini file. I've not tried modifying these at runtime via the .htaccess file or though a ini_set() directive in code as these mostly benefit from being known early by PHP.

#### Alternative PHP Cache (APC)

PHP has a caching structure called [Alternative PHP Cache](http://us.php.net/apc), or APC, which can cache your compiled code. This means that instead of reading files from disk every time they're needed PHP will dedicate some internal memory to caching your code. Less filesystem hits mean better performance, so this one can be good.

If you've got control over the server or your hosting package includes PHP's APC and you have php.ini access then you should consider configuring it for action. Be careful, though, this one can make bugs tricky to diagnose if you forget that you've turned it on. If you're trying to debug something on a live server then be sure to turn this off while you're debugging.

Start with adding a block like this to your php.ini:

``` ini
[APC]
; enable APC
apc.enabled = 1
; enable APC to cache everything by default
apc.cache_by_default = 1
; File stat - wether PHP should check file modification times each time
; if set to 0 php will never check to see if it should update a file from
; cache. This can be a small gain in performance, but means that you
; need to restart apache every time you update your code.
apc.stat = 1
; How many memory shards APC should make for caching.
; If you have gobs of memory, then do not be shy here, but for a typical
; WordPress install 1 segment of 64MB should be more than enough.
apc.shm_segments = 1
; The size in megabytes of each shared memory segment.
apc.shm_size = 64
; The amount of time a memory spot can site idle before it can be used to
; cache other code instead.
apc.ttl = 7200
```

That's the base amount of config that APC needs. If you really want to dig in and tweak then reference the [PHP Manual for APC configuration](http://www.php.net/manual/en/apc.configuration.php).

#### Cache File Paths

PHP has an internal cache called realpath_cache that can hold on to file paths when they're determined. Using this cache means that PHP can skip the file path verification step and jump directly in to grabbing the content when it can. Its a small win, but piled on top of each other small wins give great results.

To enable simply uncomment the two lines in your php.ini file that begin with `realpath_`.

This doesn't need to be set too high. 64 or 128K is plenty. If you've got a lot of plugins or a file heavy framework that you're building on then lean towards the 128k setting.

### 3. MySQL

MySQL tweaks rely on being set in the my.cnf file. So if you don't have access to your MySQL config then don't worry about this.

#### Query Caching

Enabling the [MySQL Query Cache](http://dev.mysql.com/doc/refman/5.1/en/query-cache.html) tells the server to cache the SQL query and its response so that common queries don't have to be repeated. The MySQL server also monitors the database tables so that if any table used in a query has changed since the last query the cache is flushed and the query is performed anew.

To enable query caching edit your my.cnf and add these lines to the `[mysqld]` section:

``` ini
# turn query cache on
query_cache_type = 1
# set query cache size in bytes
# this sets a 64MB cache which is more than enough for most WordPress installs
query_cache_size = 67108864
```

Query cache sizes should be a multiple of 1024. MySQL will round down to the nearest multiple of needed. If needed for special purposes the Query Cache can be circumvented by beginning your queries with `SELECT SQL_NO_CACHE`

### 4. WordPress

#### WP Super Cache

If you run a high volume WordPress site you need to be running [WP Super Cache](http://wordpress.org/extend/plugins/wp-super-cache/) on your production server. End of story. Setup can be a bit tedious, but the returns are indispensable. I'm not going to go in to the details of the plugin here. Others have written a lot about this and, frankly, the install docs pretty much give you everything you need to know.

If you're more adventurous and have memcache installed on your server you can also check out [BatCache](http://wordpress.org/extend/plugins/batcache/) as an alternative.

#### wp-config Optimization

The WordPress wp-config.php file is a very under-used file. The options that can be set here can reduce a few trips to the database and allow WordPress to spool up a little bit quicker when responding to a request. As part of my work on the [WordPress TextMate Bundle](http://top-frog.com/projects/wordpress-textmate-bundle/) I've compiled a functionally complete wp-config.php file that can be [viewed here](http://github.com/Gipetto/wordpress.tmbundle/blob/master/Snippets/WP%20Config%20(complete).tmSnippet). All the different options are documented as they are in the WordPress Codex.

The entries that I recommend using are:

  * **Security options**. These make your cookies unique to your install. Create some arcane, unintelligible values for these to help generate more secure hashes in your cookies and more secure nonces for your admin forms. 
      * `AUTH_KEY`
      * `SECURE_AUTH_KEY`
      * `LOGGED_IN_KEY`
      * `NONCE_KEY`
      * `AUTH_SALT`
      * `SECURE_AUTH_SALT`
      * `LOGGED_IN_SALT`
      * `NONCE_SALT`
  * **Site Config**. These options reduce the amount of trips that WordPress has to make to the database and filesystem to get started. Note that a lot of these options lock you in to a server layout, so if you haven't finalized on your desired filesystem layout then don't do these yet. 
      * `WP_HOME`
      * `WP_SITEURL`
      * `TEMPLATEPATH`
      * `STYLESHEETPATH`
      * `COOKIE_DOMAIN`
      * `COOKIEPATH`
      * `SITECOOKIEPATH`
      * `PLUGINS_COOKIE_PATH`
      * `ADMIN_COOKIE_PATH`

### 5. WordPress Developer Tweaks

If you're a developer and have access or influence over the server config you can also put a few more tricks in to play.

#### Object Caching with Memcache

WordPress includes an internal object caching system which can store the results of database queries and, well, pretty much anything that you can shove in there. The downside to this cache is that without some kind of persistent data store it is only good on a per-page load basis. While this in and of itself is good, its not as good as it could be. Fortunately the WordPress developers realized its potential when building it and created the necessary hooks and replacement mechanisms to replace the simple built in cache with a more persistent solution.

[Memcache](http://memcached.org/) and the [Memcached Plugin](http://wordpress.org/extend/plugins/memcached/) for WordPress is the perfect solution for this. By implementing this solution the WordPress object cache is put in to the Memcache system instead of in to PHP's page load only memory so that the pulled data can persist across many page loads. This can significantly reduce the amount of calls to the database and allow you to store pre-compiled stacks of data for later use. On this site alone I use this system to store at least 9 sections of pre-compiled HTML for output on top of the normal cache that's performed by WordPress.

#### Consolidating & Minimizing Resources

If you're like the rest of us, over time the addition of features and tweaks to layout produce more and more resource files to be included. This slows down site performance. Use a system like [Minify](http://code.google.com/p/minify/wiki/UserGuide) to consolidate and compress your site resources and reduce both the number and size of the files that you need to deliver to the browser.

#### Google Analytics

Upgrade your [Google Analytics](http://www.google.com/analytics/) invocation code. JavaScript loading in the head of a document can slow down a page load as the browser can wait for scripts to load before it finishes rendering the page. The new code looks like this and loads faster than the old version:

``` javascript 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXX-X']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script');
ga.src = ('https:' == document.location.protocol ?
    'https://ssl' : 'http://www') +
    '.google-analytics.com/ga.js';
ga.setAttribute('async', 'true');
document.documentElement.firstChild.appendChild(ga);
})();
```

More information on this is available [here](http://www.stevesouders.com/blog/2009/12/01/google-analytics-goes-async/).

#### Use a Content Delivery Network

If you can, offload resources on the site to other servers. Possible tweaks include:

  * Load scripts from Google. Use the [Google Ajax Libraries](http://code.google.com/apis/ajaxlibs/) instead of serving the files yourself.
  * Photos can be uploaded to Flickr and linked to in your posts. For a photo heavy site like this one it can significantly reduce the amount of content that the server needs to deliver and provide significant speed boots.
  * Store large files on a cloud storage system like Amazon Web Services. The cost is relatively cheap and in the long run is much cheaper than buying a larger web-server package from your host.
  * Use the resources at hand. If you have a development server whose resources are underutilized then put it to work as a file or image server for your site. There's no sense in paying for server resources that sit idle most of the time.

### Phew!

So. That's what I've got, and I didn't even touch on what you should be doing to your theme to make it more efficient. Hopefully this gets your site on its way to being a fast loading dream for your users and keeps you away from those frustrating long load times.
