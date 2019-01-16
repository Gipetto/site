---
id: 2379
title: So, who likes that new Y! nav bar on Flickr?
date: 2013-07-13T13:03:48+00:00
layout: post
guid: http://top-frog.com/?p=2379
permalink: /2013/07/13/so-who-likes-that-new-y-nav-bar-on-flickr/
categories:
  - Computers
tags:
  - bar
  - browser
  - css
  - custom
  - hide
  - navigation
  - style
  - stylesheet
  - yahoo
---
Yeah, that's what I thought. There's a lot going on in the Flickr interface as it is. Adding a garish purple Yahoo! bar across the top just sends my eyes in to fits.

So here's a bit of CSS that'll hide nav bar in its current incarnation:

``` css
body.with-eyebrow #eyebrow {
	display: none;
}
body.with-eyebrow {
	background-position: left top !important;
}
body.with-eyebrow #global-nav {
	top: 0 !important;
}
body.with-eyebrow .subnav-refresh {
	margin-top: 0 !important;
}
```

Now, here's the tricky part: where do you put this? Most browsers include a user stylesheet override that can be edited. Its just a matter of where this file is. 

For example, on OSX using Chromium that file is located at `~/Library/Application\ Support/Chromium/Default/User\ StyleSheets/Custom.css`

Finding the location of the file on your specific browser is outside the scope of this article. So do a quick search on Google, edit your custom CSS file, and bask in the glory of a less suckage on the flickr interface.