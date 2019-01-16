---
id: 200
title: 'Embed Google Video and YouTube – Now bigger and better'
date: 2006-12-14T13:19:00+00:00
layout: post
guid: http://top-frog.com/?p=200
permalink: /2006/12/14/embed_google_video_and_youtube-now_bigger_and_better/
categories:
  - 'Web Design &amp; Development'
tags:
  - browser
  - code
  - embed
  - google
  - innerhtml
  - javascript
  - prototype
  - script
  - video
  - youtube
---
Well, technically smaller. This new version actually has less lines of code. See, I was trying to be a good boy when [I first wrote the script](/2006/10/13/javascript_embed_youtube_and_google_video). I tried to be fully DOM compliant and not use innerHTML as it is a non-standard function and has somewhat of a dubious reputation.

Well. Screw it. IE will do the DOM standard element replacement, but doesn't do setAttribute. Opera would take the DOM replacement and make space for it in the layout but wouldn't show the video element. All this goes away with innerHTML.



This new version has been tested with Safari, Firefox 1.5+, Opera 8.5+, & Internet Explorer 7. The only catch with this version is with Internet Explorer 6 in that it won't display the Google Video objects, but will show the YouTube video objects. I can probably fix that later as its probably more an issue with the display code than the JavaScript. I also have not tested with any Linux browsers yet, but don't anticipate many issues.

Please take a look at the [new sample page](/stuff/clubhouse/embed_new/) (the old one is still available through the old article). If you could leave a note in the comments about your experiences with your particular browser I'd appreciate it, but I'm pretty sure that IE 6 is my only real concern. I'm not going to target IE 5.5 on Mac or PC.

You can view [the source (embed\_yt\_gv.js)](/stuff/clubhouse/embed_new/embed_yt_gv.js) and please feel free to use it. If you do, as always, just drop me an email or a comment here to let me see where you're using it.