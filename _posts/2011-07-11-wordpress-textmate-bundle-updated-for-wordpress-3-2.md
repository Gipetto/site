---
id: 2005
title: WordPress TextMate bundle updated for WordPress 3.2
date: 2011-07-11T00:56:20+00:00
layout: post
guid: http://top-frog.com/?p=2005
permalink: /2011/07/11/wordpress-textmate-bundle-updated-for-wordpress-3-2/
categories:
  - PHP Scripting
  - TextMate
  - WordPress
tags:
  - bundle
  - documentation
  - doxygen
  - function
  - method
  - php
  - scrape
  - search
  - textmate
  - tmbundle
  - wordpress
---
So, WordPress 3.2 has been out for a little while now and I've just gotten around to updating the bundle. My apologies, I've just been super swamped with a new job in a new city. But that's some whining for another post.

After much fiddling, the updated [WordPress TextMate Bundle](http://top-frog.com/projects/wordpress-textmate-bundle/) is here and it has been updated with a much better function definition display. I've ditched the old function scraper that was an abomination of grep & regex matches and replaced it with [doxygen](http://www.stack.nl/~dimitri/doxygen/) and some ruby abomination to provide much more information about the function or method being inspected.

{% flickr_photo '5925516548' %}

I'm pretty sure there's a lingering issue with the parsing and display of special characters in the doxygen output (which I blame squarely on strange handling by doxygen) that I haven't handled yet. There may be HTML Entities missing from the documentation here and there.

Also improved is that the function definition search is contextually sensitive. It'll only look for methods when in object scope (ie: `$object->method();`) and only look for functions when in regular php scope (ie: `function();`). There's also a prompt to select the method that you're actually after when multiple matches are found.

So, as always there's something that can be improved upon with the bundle, but its moving forward and getting better with each revision. I guess that's something, right? RIGHT?

So, fire up [GetBundles](http://onethingwell.org/post/1344303536/getbundles) or head on over to the [WordPress TextMate Bundle's Github Page](https://github.com/Gipetto/wordpress.tmbundle) to update your bundle!