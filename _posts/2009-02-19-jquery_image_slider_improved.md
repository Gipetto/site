---
id: 253
title: 'jQuery Image Slider: Improved'
date: 2009-02-19T01:16:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=253
permalink: /2009/02/19/jquery_image_slider_improved/
categories:
  - 'Web Design &amp; Development'
tags:
  - code
  - image
  - javascript
  - jquery
  - slider
---
In a [previous post](/2008/09/28/30_minute_4_am_jquery_image_slider) I talked about a quick and dirty jQuery image slider technique that was conceived late at night and on a tight deadline. 

Now, with the attention of a friend ([thanks John!](http://pennypacker.net)) and a little time to work on it, the image slider has been _improved!_ Ya.

[View the demo here](https://top-frog.com/stuff/slider/improved.html)

#### Improving the old

This version reduces the amount of code by using jQuery chaining to put together the navigation list at the same time the link actions are defined. 

The script wasn't that heavy before but this does a lot to streamline the code, reduce duplicate loops, and overall make the code more readable.

#### Adding new

New in this version is a quick snippet to take the url hash and try to click a slider link to change to that image – that way an image can be targeted on page load. The url hash is updated on each click as well to make hotlinking to the selected image a breeze. 

If multiple sliders are to be included on a single page this will want to be limited to a single slider or altered so that the hash reflects which list it is targeting. No biggie, adjust as needed.

#### Steal this script!

So, copy, paste, mod as needed. Just drop me a comment if you use it somewhere so I can track my pollution of the internet 😉