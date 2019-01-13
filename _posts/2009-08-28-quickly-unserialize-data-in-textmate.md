---
id: 927
title: Quickly unserialize PHP array data in TextMate
date: 2009-08-28T22:51:14+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=927
permalink: /2009/08/28/quickly-unserialize-data-in-textmate/
categories:
  - PHP Scripting
tags:
  - array
  - php
  - serialize
  - textmate
  - unserialize
---
Every once in a while I need to see what's hiding in a serialized array in a database field and finally just wrote a little TextMate command to do the job for me. If I'm already working in that area of code its easier to just dump it someone in the page output to read it, or maybe dump it to the error_log, but often enough I just need to see the data. It turned out to be much different than I thought it'd be. I figured I'd write a line of Ruby to call PHP via the command line but then I found that PHP can be used directly in TextMate commands.



Okay, that helps.

So, add a new command to your bundle (I keep a bundle just for adding miscellaneous things to so that I don't pollute other bundles and/or lose my additions when those bundles are upgraded). Make a new command whose _Input_ is _&#8220;Entire Document&#8221;_ and _Output_ is _&#8220;Replace Document&#8221;_. Give it a key binding if you want.

Then put this code in as the script:

``` php
#!/usr/bin/env php
<?php
print_r(unserialize(file_get_contents('php://stdin')));
exit;
```

There is no save button for bundle items. Simply switch to another item, any item in the bundle to save this one.

Voila. Copy and paste some serialized array data in to a new document, run the command and it'll be replaced with a nicely formatted output of the array data and structure. Haven't tried it with objects yet, but they probably won't work anyway unless they're generic objects that don't need to have their class definition loaded to properly unserialize.