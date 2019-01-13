---
id: 502
title: Site rebuilt on WordPress
date: 2009-03-30T00:00:22+00:00
author: Shawn
layout: post
guid: http://top-frog.local/?p=502
permalink: /2009/03/30/site-rebuilt-on-wordpress/
categories:
  - Life
tags:
  - "404"
  - bofh
  - flickr
  - plugin
  - rebuild
  - smiley
  - theme
  - thickbox
  - wordpress
---
<img src="/assets/blue-m.png" alt="blue-m" title="blue-m" width="100" height="100" />After much futzing, fidgeting, and neglecting of other things I've finally got this site converted to [WordPress](http://wordpress.org). It was just a logical thing to do for many reasons (one of which that I'm in it so damn much I know how to hack the crap out of it. The other main one being: let someone else build the core, I just want to extend and use it). Read on in you're interested in some of the high-level details about what's different.



#### The Theme

Since I'm working on it so much I decided to use the [Carrington Theme Framework](http://carringtontheme.com/) (of which I'm now a contributor, whee!). I opted to use [Carrington Jam](http://carringtontheme.com/themes/) (scroll to the bottom, there's no anchors in the page to directly link to) since it is just a functional Carrington Framework just waiting to be arranged the way you like it. Pretty durnded handy.

Lightbox has given way to Thickbox. Why? Well, simply 'cause I've heard talk of it at work and its being integrated in to Carrington Blog for the galleries so I figured I'd give it a shot. S'okay, I guess. I had to hack it to make it behave, so it may or may not stay.

The design has stayed the same. This was just to get the site switched over to WordPress so that I can now manipulate the theme to have a little bit wider content section. I want the content area to be able to hold a medium sized Flickr photo and right now its just a hair to small. I also want to tweak the header and clean up the CSS.

#### An Actual, Functional, Contact Form!

How 'bout that! It was only 5 years in the making.

#### Plugins

Only a couple at the moment. The venerable [All in One SEO Pack](http://wordpress.org/extend/plugins/all-in-one-seo-pack/) is in use. 

I wrote a quick plugin to replace the smilies on the site to instead use a set created by [David Lanham](http://dlanham.com/). Well, at least I found someone else attribute them to Lanham – I couldn't find the smilies themselves on his site so maybe that's wrong. I might flush out the plugin in the future so that it can take multiple smiley directories and let the user switch between them. That could be cool. I'll have to look and see if there's anything that does anything like that yet.

I also wrote a plugin to spit out BOFH (Bastard Operator From Hell) messages on the 404 page. Right now the 404 page is in some serious need of attention but its there and insulting people so its doing its job, at least. That's another one that I may release if folks are interested. Its a pretty simple plugin as well.

#### Puppycam

Until I can find myself a cheap-ass network camera the Puppycam is gone. I've instead done a quick hack to bring in the latest [Flickr](http://www.flickr.com/photos/tehgipster/) photos in my [Dogs Photoset](http://www.flickr.com/photos/tehgipster/sets/72157603367803058/) so that there's SOMETHING puppy related there. It needs a bit better styling but its functional. That's one place where you'll notice Thickbox falling down a bit. I had to hack the crap out of the titles and fix Thickbox a bit so that I could have the titles that I wanted. Its unfortunate that I couldn't do that easily without hacking. Maybe I can instead implement an iframe setup for displaying the photos so that they don't require a core hack on Thickbox just to work. 

#### Other Highlights

Search now works again. Its the default WordPress search but I'm gonna look at implementing something else on the back end. We've got a nifty plugin at work I could use and there's also a pretty good free engine out there that I could implement. I'll just have to check things out and see which way I want to go. I manipulated the search pagination to have a prettier scheme and to also redirect all searches to a nice url as well. No more get params in the url for searches.

Instead of a &#8220;Works&#8221; page I decided to implement it as a category. That way I can tag all sorts of things as &#8220;noteworthy&#8221; and later on, when I decide how I want to display them all together, I can re-insert a template to show them all in an aggregated setting. For now, though, they're just posts in the blog.

I really dislike the standard WordPress way of grouping archives. This site is simple and I wanted to have a single overview page of the history of posts so I built a function to pull the entire archives in to a single page. I filtered the WP_Query object so that it doesn't pull any content. It pulls just enough so that I can easily build permalinks and that's it. Performance is not too bad and I later intend to integrate it with memcache so that its even less overhead.

Caching: none, yet.

#### So, that's it for now.

I hope to have time in the future to build a few more things out, but now that I have the site functionally transfered to WordPress I can now focus on the design aspects that I want to change.

Thanks for reading, and hopefully I can muster up some more interesting posts in the future.