---
id: 245
title: 30 Minute, 4 AM, jQuery image slider
date: 2008-09-28T21:37:00+00:00
layout: post
guid: http://top-frog.com/?p=245
permalink: /2008/09/28/30_minute_4_am_jquery_image_slider/
categories:
  - 'Web Design &amp; Development'
tags:
  - code
  - image
  - javascript
  - jquery
  - slider
  - utah
  - wordcamp
---
**Update:** This script has been overhauled since this post. [View the new code and demo here](/2009/02/19/jquery_image_slider_improved).

As fate would have it the first night of my trip to Provo, Utah turned in to an all night work session to get a few things wrapped up so that we could release them during [WordCamp Utah](http://utah.wordcamp.org/). As it turned out we needed a last minute feature to show off some images. Thanks to the miracle of jQuery it turned out to be all of a 30 minute venture.

I have to admit it feels a bit hackish, but in my defense it was done at 4am. Please also keep in mind I'm writing this after being up all night.

#### For Example

First, the example: [Click here to view the example page](/stuff/slider/).

The goal was to have a screenshot gallery viewer that nicely and quietly sat in the page so that we could maintain the simple & clean layout of the page and also allow us to dynamically update the featured images and not have to fuss with any logic to make new images work and also not have to load a carousel plugin to do it. After a quick conversation with [Alex](http://alexking.org) (the boss) we had the distance logic pretty much figured out and just had to write it. The principle is very simple and hopefully the code is commented enough to be self explanatory. 

Unlike some other carousel plugins/libraries/scripts, Javascript (jQuery) is used here only for the animation and to create the navigation links. All display is handled by CSS. This gave us a lot of freedom to keep it lightweight and maintain tight control over the display of the images. It also allowed for control of the images and dynamic generation of the navigation buttons in just 35 lines of javascript.

So, is there anything extra special about this? I don't think so. Is it still neat? Yeah, I think so. Its nice, clean functionality in a small package. I think the neatest little thing going on is that in all browsers jQuery recognizes that `'left':+=-760` is negative movement.

#### Shameless plug

If you're so inclined, ~~[head on over to the site and see it in action](http://crowdfavorite.com/portfolio/addictomatic/)~~. I guess that pretty much says where I work (I've tried my best to keep my employers away from this blog, but now that I'm actually working in the social networking space I guess its ok). Or, if you're so bold, steal this script!