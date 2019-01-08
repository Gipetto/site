---
id: 1509
title: WordPress export, import and double serialization.
date: 2010-08-02T23:32:47+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1509
permalink: /2010/08/02/wordpress-export-import-and-double-serialization/
categories:
  - 'Web Design &amp; Development'
  - WordPress
tags:
  - export
  - import
  - maybe_serialize
  - maybe_unserialize
  - meta
  - post
  - postmeta
  - wordpress
  - wxr
---
Ran in to a fun one in the WordPress core today. If your plugin stores post meta and you store that post meta as an array then you're prone to a bug in the WordPress core that can break your data should someone export their data and reimport it on another WordPress install. Yeah, this is a small minority of what actually goes on in WordPress but when you're dealing with migrating data from one install to another, or are trying to supply complex sample data with a theme distribution, then things like this tend to get on your nerves. Quickly.

I'm gonna sound jaded through this writeup, but I'll get over it. 

<!--more-->

Say your plugin saves and retrieves data correctly, like this greatly oversimplified example:

``` php
global $post;
$postmeta = array('one','two','bunnies');
add_post_meta($post->ID, 'my-meta-key', $postmeta);
// ...
// and later
// ...
$postmeta = get_post_meta($post->ID, 'my-meta-key');
```

You're properly using the post-meta api and your array is serialized in the database, all safe and sound.

Now imagine your user migrates to a new host, exports a WXR and imports that WXR on their new host. Your data will break. Why? On import your serialized array is then double serialized as a string. The post-meta in the WXR is imported the same way as if the data had been saved programmatically which means it makes a trip through the function `maybe_serialize`. Unfortunately `maybe_serialize` has a bug that explicitly serializes already serialized data. So now your data is broken because your serialized array has just been serialized as a string. Don't expect this behavior to change any time soon. The core WordPress team is too worried about breaking the functionality of plugins who have been saving data the wrong way to try and make this function work correctly. You have to safeguard yourself against its behavior.

Its not a lost cause, though, you can protect yourself by being a bit more verbose when pulling your post meta. When retrieving your post meta don't assume that you know how its gonna come out. Yeah, it sounds funny, but its better safe than broken. Simply changing the above code by one line can help protect your data when it moves from server to server. Like so:

``` php
global $post;
$postmeta = array('one','two','bunnies');
add_post_meta($post->ID, 'my-meta-key', $postmeta);
// ...
// and later
// ...
$postmeta = maybe_unserialize(get_post_meta($post->ID, 'my-meta-key'));
```

By wrapping the `get_post_meta` function call in a `maybe_unserialize` call you force the data coming out of the database to be inspected one more time and then double-unserialize if necessary. Its extra work but it can save your butt.