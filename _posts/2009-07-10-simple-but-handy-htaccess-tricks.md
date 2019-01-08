---
id: 794
title: Simple, but handy .htaccess tricks
date: 2009-07-10T22:14:34+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=794
permalink: /2009/07/10/simple-but-handy-htaccess-tricks/
categories:
  - Code
  - Computers
tags:
  - "401"
  - access
  - apache
  - auth
  - file
  - htaccess
  - http
  - protect
  - web
---
These two have always been questions in my mind but until recently I've never had the need to actually put time in to satisfying my curiosity and as I look around I haven't (easily) found any real world examples of these out there.

So, we all know how to set up [basic HTTP authentication](http://httpd.apache.org/docs/2.2/howto/auth.html), right? Good. Here we go&hellip;

<!--more-->

<p class="error">
  <strong>Please re-read this post. It has been corrected for erroneous information!</strong>
</p>

You might have something like this in your `.htaccess` file:

``` apache
AuthType Basic
Require valid-user
AuthName "Halt! Who goes there?"
AuthUserFile /www/passwords/.passwd
```

Now with just a few tweaks we can make less of a simple all or nothing wall between your users and the content and set some of it free.

## Allowing Access via IP Address

So, you want to require a password to outsiders but you and your co-workers are getting tired of entering the username and password for every small visit needed to the site? If your office has a static IP address, allow it.

``` apache
AuthType Basic
Require valid-user
AuthName "Halt! Who goes there?"
AuthUserFile /www/passwords/.passwd
Allow from xxx.xxx.xxx.xxx
Satisfy Any
```

What we're telling Apache is to allow access from the IP address and to Satisfy any of the access requirements. If Satisfy were set to all, access would require username, password _and_ IP address matches to grant access.

## Unprotecting Content

Sometimes we need to poke holes in the wall to allow unfettered access to one resource or another. This is pretty straight forward. 

First off, lets allow access to an entire directory. In the directory you want to open up, make a .htaccess file and add just this code:

``` apache
Satisfy Any
Allow from all
```

We pretty much just tell Apache that anyone should be let in and all auth directives should be considered satisfied.

But maybe we don't want to give full access to everything in that folder. Maybe its just one file. That can be done too. All we need to do is use the Apache `Files` directive to provide a filename to allow access to.

``` apache
<Files file.html>
    Satisfy Any
    Allow from all
</Files>
```

Lastly, this can also be done for a series of files based on regex filename matching. This code allows access to images without requiring auth:

``` apache
<FilesMatch "\.(gif|jpe?g|png)$">
    Satisfy Any
    Allow from all
<FilesMatch>
```

## And that's not all

This is really just scratching the surface, but for a lot of day to day needs of projects in development that shouldn't be opened up to the whole world these guys can go a long way to helping make life just a little bit easier.