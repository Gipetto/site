---
id: 157
title: Tabular image layouts in print and on the web
date: 2006-03-28T23:13:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=157
permalink: /2006/03/28/tabular_image_layouts_in_print_and_web/
categories:
  - 'Web Design &amp; Development'
tags:
  - css
  - image
  - indesign
  - inline
  - javascript
  - layout
  - padding
  - pagemaker
  - print
  - quark
  - reflow
  - screen
  - tab
  - table
  - tabular
  - tracking
  - web
---
For a long time I've been lusting over a way to neatly arrange a block of images on paper the way it is so easy to do on screen. Or, at least, they way it has become so easy to do on screen. CSS actually opened the door to me finding a nice way to do this. I know this is vague, but if you've ever had to arrange images in a grid in print you'll like this (and maybe even be ahead of me on doing it!).



To clarify, here's what I'm after. At work we have several publications in which we show off all the logos of the vendor product that we distribute. We typically show them off in a grid and they change often. That means that keeping an updated arrangement is a pain in the butt. Common thinking (for me at least) would be to draw out a grid to fit into or, in the case of newer page layout software, make a table so that all the rows and columns lined up nicely.

My way, maybe not a new way, sets everything so the logos are dynamically placed, so that its easy to slip a new one in the grid and have everything else reflow to a correct position.

#### Inline Images

There it is, the trick. Inline images in a text box. It didn't dawn on me until about 8 months ago when I was doing a landing page for an event we were putting on. I needed an easy way to just add a sponsor logo and be done with it. What I came up with was inserting images that were all the same size and adjusting the padding on the images so that they automatically spaced themselves and bumped to new lines. All my images were square and the same size with the logo placed in the image so that it proportionally matched all the others. So, no matter if the logo was vertical or horizontal it fit into the same space as the previous one. This same concept works in print and works all the way back to Quark 4 (for those who are still fumbling around in the dark).

_Yeah, that was a cheap shot but this is my website!_

Pretty much any page layout software that is worth a damn from the last 8 years is Quark, PageMaker or InDesign, supports putting an image inline in a text box. I'm going to use InDesign as the example since it is what I use and by far the leading application in its market.

The concept for InDesign is the same as for the web. Where on the web I use a <p> tag or <div> as the container in print I use a textbox. Instead of CSS's padding there's tracking values in print.

Simply make sure that all your image boxes are all the same width and paste them into the text box. Change your tracking so that your images space apart in the correct number of columns and adjust your leading to get the vertical spacing you want. It takes a while to set up as you can only paste one image at a time into the text box but once set up it makes adding a new image a snap.

#### Tables for tabular information?

Not in this case, even if you could call a grid of images tabular data. A table becomes much too cumbersome when the information needs to be updated. In the case of web design a table could still make sense as the table could updated with a dynamic language like PHP, Perl or (shudder) ASP. Short of diving into InDesign's ability to be scripted (which is super-duper powerful and nifty, by the way), updating an arranged set of images can be very cumbersome in a print layout application. This little tidbit makes it a snap.

#### Caveat Emptor

There is just one difference between web and print in this case. On the web, as visible [in my example](/stuff/tabular_images/), margin-right will also determine when the image flows to the next line – the margin keeps the image from touching the right side of our container div. In print the tracking does not do this – your image will go as far to the right as the text box allows before flowing to the next line.

There are ways around this with creative use of CSS and/or JavaScript but that's beyond this article right now. More than I have time for at the very least.