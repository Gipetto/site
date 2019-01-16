---
id: 196
title: Show PHP source without duplicating files
date: 2006-11-22T15:50:00+00:00
layout: post
guid: http://top-frog.com/?p=196
permalink: /2006/11/22/show_php_source_without_duplicating_files/
categories:
  - PHP Scripting
tags:
  - htaccess
  - mod_rewrite
  - php
  - php-source
  - phps
  - source
  - view
---
Every once in a while I want to show a php script's source code. I would always have a `.php` file to show an active file in use and a companion `.phps` file (php-source) to show the source. With a little `mod_rewrite` and php this can be done with just the one active file, and two supporting files that never change.



The original setup was just to use mod_rewrite to map any `.phps` request that didn't find a real file to a `.php` variant, if it existed, and remap the `.php` file's mime type to that of a `.phps` file. However, that didn't work for me. I think php might have been grabbing and processing the file before it could be remapped and delivered.

The trick was to route the request to another file that took the requested file as a passed variable and then have it check for the file and show it. Here's how it works:

#### The .htaccess file

This the core to making the system work. It grabs any request for `file.phps` where `file.phps` does not exist and routes it to `source.php?f=file.php`.

``` apache
OptionsFollowSymLinks
RewriteEngineon

#donotrunonrealfiles
RewriteCond%{REQUEST_FILENAME}!-f
RewriteCond%{REQUEST_FILENAME}!-d

#mapphpstophp
RewriteRule^(.+.php)s$source.php?f=$1
```

#### The PHP file

Well, see, we'll do it through the new mechanism: [source.phps](/script_src/source.phps).

What it does it take the passed variable via `$_GET` and if its a file it uses the built in php function `highlight_file` to do the source coloring. The source is then dropped into a mildly formatted html template.

#### Security Concerns

There are many things to consider with this script. For one, I don't scrub the `$_GET` var.

My best assertion of keeping it secure is to keep this limited to the directory that you're showing files from. If you do enough validation and checking you can have it go directly to source files in your site, but going this route requires you to be very sure you do the proper exclusions so that people can't grab any config or password files.

Right now this file will show itself – this is a security concern if you do allow it to dig through your actual source files since it then reveals all or part of your source structure.

Since I would mainly use this for showing off conceptual files I have no problem with it being a "sandbox" and limit its access to the system.

#### The End

There it is, nothing revolutionary, very straight forward, and very useful if you like to share code ideas with others. The script is terribly generic and will work with a base install of PHP4 or PHP5. As usual, if you make this better or find any bugs, please let me know.