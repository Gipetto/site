---
id: 62
title: Site Housekeeping
date: 2005-03-28T22:11:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=62
permalink: /2005/03/28/site_housekeeping/
categories:
  - 'Web Design &amp; Development'
---
Got a few improvements done on the site. Most notable being setting a cookie for comment data so you'll be remembered the next time you come back and comment. As I write this I realize that I should enable the choice to be remembered or not, but for now it'll remember everybody.

<!--more-->

I'm not too worried about it remembering everything since the data in the cookie is encrypted using mcrypt. Each time you comment you'll be assigned a new key and the data will be re-encrypted. There is a way I can make it even more secure but I'll leave that for a future update as well.

Other site improvements were for me. I finally got the admin interface flushed out so that I could edit existing stories without a trip to phpmyadmin – I can do it right here in the site which responds much faster than phpmyadmin does. Pretty much all that is left on the admin side is to make a way to add categories for both the links and the stories and a way to add links. The only holdup is my laziness.

And now that I think of it I need to fix some encoding issues on submitting stories… those damn ampersands.