---
id: 214
title: Safari 3 Beta
date: 2007-06-12T06:44:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=214
permalink: /2007/06/12/safari_3_beta/
categories:
  - Computers
tags:
  - "3"
  - Apple
  - background
  - beta
  - css
  - image
  - inspector
  - menu
  - multiple
  - safari
  - terminal
  - windows
---
So, while the Safari 3 beta is nice in many ways, and showing much promise on Windows, I was disappointed to find out that it still required a trip to the terminal to turn on the Inspector element.

So, if you want to check out elements in a page and how they're styled open up the terminal and type:

``` sh
defaults write com.apple.Safari WebKitDeveloperExtras -bool true
```

You'll now have a new item in your contextual menus – control-click / right click – to inspect elements. You can run up and down the dom tree and also inspect elements that have been added via JavaScript. Very handy stuff. Its just too bad the UI for it sucks. I still don't understand the UI elements like this – they simply feel clunky to me.

All in all, though, its nice to see some advanced CSS features finally hit Windows! I can show all these people at work what MS and even FF are holding back on! Go ahead, [give multiple CSS background images a look see](http://decaffeinated.org/archives/2005/08/03/background-image). And lets not forget those [super nice css drop shadows](/stuff/text-shadow.html).
