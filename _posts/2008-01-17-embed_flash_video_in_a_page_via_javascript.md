---
id: 222
title: Embed Flash Video in a page via JavaScript
date: 2008-01-17T22:31:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=222
permalink: /2008/01/17/embed_flash_video_in_a_page_via_javascript/
categories:
  - 'Web Design &amp; Development'
tags:
  - clubhouse
  - code
  - embed
  - flash
  - google
  - javascript
  - metacafe
  - prototype
  - video
  - youtube
---
I just finished up a new version of my script that embeds flash video in a web page to make it more diversified in what kinds of video it can handle. There are some that will not work since they're doing some url manipulation on the ID of the flash object that make it impossible to gather the requisite information via the URL, but for the most part this script can cover most sites that are worth doing.

<!--more-->

## New from the ground up

The script has been completely overhauled and contains some major improvements. First off, it can handle many different sources besides just YouTube and Google Video. It currently handles video from YouTube, Google Video, College Humor, MetaCafe, LiveVideo, 5 Minutes, Live Leak, and Crackle. It can also be easily modified to at least understand other video sites so that they can be highlighted or otherwise formatted via CSS.

## Only under certain conditions

The script will only replace links to videos where the link href is the same as the link text. If the link text is different than the link href then the script adds a className of &#8216;videosite' to the link so that CSS can be used to designate the links destination as being a video site. This was a special request at [The Clubhouse](http://clubhouse54.com), the main reason this script was even conceived.

## Extensible

If you know your way around a bit of JavaScript then you can probably extend the script to accept a new source – provided that source's url provides the real video ID.

## Requires Prototype.js

The script uses some convenient Hash functions present in Prototype.js 1.5.1+

## Action Shot & Script

The script can be seen in action [here](/stuff/clubhouse/embed/). 

The script source is [available heer](/script_src/embed_flash_video.js).

## Conclusion

I know that's not a lot of documentation. I'm drawing a blank on coherent writing right now, so if there's any questions (yeah, right, nobody reads this shit any more) I'll post more information as needed.