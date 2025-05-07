---
id: 179
title: Setting the base directory in PHP
date: 2006-09-30T14:48:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=179
permalink: /2006/09/30/setting_the_base_directory_in_php/
categories:
  - 'Web Design & Development'
tags:
  - base
  - constant
  - directory
  - dirname
  - php
  - realpath
---
Knowing the base directory that you're working from when building a site is a pretty basic need. For the longest time I had been content with just manually setting the base paths and switching between them based on the name of the server. 

I recently learned a much better way. I hadn't really sought this out since I really hadn't thought about a better way to do it since my old way worked. This new way takes away the need to manually define your document root.



A very handy thing to do is have a constants file that holds all your commonly used information and most of the time this file is in or near your document root. A single line of PHP helps us find where this file is and use it to set the document root for the site.

``` php
define('DOCUMENT_ROOT', dirname(realpath(__FILE__)).'/');
```

That snippet of code will define a document root (including the trailing slash) constant that can be called from any script.

`__FILE__` is a magic constant that contains the full path to the file it is written in. No matter if this file is included within another one, it always points to the file in which it was written. Since older versions of PHP would sometimes return a relative path to the file we need to call `realpath()` on the string. We shouldn't need to do that now in newer versions of PHP but for safety's sake I keep it in. Finally `dirname()` returns just the directory in which the file is contained and negates the need to manually remove the filename from the path.

Its pretty easy to adjust this snippet to adjust for where the constants file is stored. With this you'll never need to worry about where your site is hosted and what the base path is as it'll automatically know where its document root is.
