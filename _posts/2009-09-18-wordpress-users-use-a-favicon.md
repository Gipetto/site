---
id: 993
title: 'WordPress users: USE A FAVICON!'
date: 2009-09-18T16:33:37+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=993
permalink: /2009/09/18/wordpress-users-use-a-favicon/
categories:
  - 'Web Design &amp; Development'
tags:
  - favicon
  - favicon.ico
  - htaccess
  - ico
  - wordpress
---
If you're using a favicon on your site, then you're fine. If you're not:

Just recently I noticed that WordPress will do something evil: if you don't have a favicon.ico on your server WordPress will do a 404 return on the favicon.ico request that's made by pretty much every modern browser. To say it again, slightly differently: if you're not supplying a favicon.ico in your webroot, or defining a valid location specifically in your page head, WordPress is picking up the call for the non-existent file and spooling up just to show a 404 page.

This means that you're spinning up WordPress twice for every page load just by not having a file in the server root.

## BAD! BAD! BAD!

There are 2 ways to fix this.

<!--more-->

  1. Use a favicon. Get more details about favicons at [favicon.com](http://www.favicon.com/n). You can also [create one quickly](http://www.favicon.cc/) if you just want to get at it.
  2. Modify WordPress' .htaccess rules to exclude the favicon.ico file from being an option for WordPress to handle. I'll show you how to do that next.

The fix, if you don't want to add a favicon file to your site, is pretty straight forward, but requires modifying a file on in the webroot. You'll need to have file system level access to your server and permissions to write to this file. If the WordPress install was done automatically by the host or through a control panel you may not have permissions to edit this file and may find it easier to just add a favicon to your web root.

This is the line you want to add to your .htaccess file:

``` apache
RewriteCond %{REQUEST_FILENAME} !favicon.ico
```

Insert it in your .htaccess file so that the effected section looks like this:

``` apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !favicon.ico
RewriteRule . /index.php [L]
```

On WordPress MU you'll look like:

``` apache
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule . - [L]
RewriteRule  ^([_0-9a-zA-Z-]+/)?(wp-.*) $2 [L]
RewriteRule  ^([_0-9a-zA-Z-]+/)?(.*\.php)$ $2 [L]
RewriteCond %{REQUEST_FILENAME} !favicon.ico
RewriteRule . index.php [L]
```

This will cause the 404 to be handled by Apache which will be much less resource intensive than letting WordPress handle it. The best solution, though, is to provide a favicon.ico in your server root, then everybody, including the server, is happy.