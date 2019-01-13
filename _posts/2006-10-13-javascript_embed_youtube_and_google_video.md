---
id: 186
title: Javascript to embed YouTube and Google Video
date: 2006-10-13T13:03:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=186
permalink: /2006/10/13/javascript_embed_youtube_and_google_video/
categories:
  - 'Web Design &amp; Development'
tags:
  - clubhouse
  - code
  - embed
  - google
  - javascript
  - script
  - video
  - youtube
---
**NOTICE:** This script has been updated and there is a new version available [here](/2006/12/14/embed_google_video_and_youtube-now_bigger_and_better). Thanks!

A while back I got the urge to write this for no other reason than to make my life over at the [Clubhouse](http://www.clubhouse54.com) a bit more convenient. Frankly, I didn't want to have to click through to watch YouTube and Google Videos.

So, with a little bit of JavaScript I was able to make it work. Its really nothing special in the grand scheme of code efficiency but it works. Its been in service for a while now with no complaints that I've heard of other than an initial caching issue where it refused to load if the page had been previously cached without the script. But I consider that a growing pain as there's not much you can do about a viewer's cache when first implementing something new like this.

**Updated: 2006-10-14.**

**Updated: 2006-10-20.**



So, I won't really bore you with the details. The script works off of a link URL – so merely pasting a link into your text won't suffice, it has to actually be a link to the video. I did it this way for usability reasons. If JavaScript is disabled the link to the video will still work. Basic usability.

It also makes no attempt to make a distinction between videos that you'd like to link to and videos that you'd like to embed. It embeds every YouTube or Google Video link it finds in a page. I guess if there's a need or desire from anybody I can add that functionality – it would actually be pretty easy. But in the scope of its initial use there was no need to make this distinction.

The script also has no outside dependencies. I originally constructed it to use Prototype.js but I was only using one feature of Prototype.js (the each array iterator) so I decided to just add 3 lines of code to do the same thing. So now it stands alone which in the long run I think I prefer.

#### Less babble, more script!

So, without further ado, [here's a sample page](/stuff/clubhouse/embed/) – you can see the slight flash between the page loading and the content switching out. Aside from a server side solution there's no way to get rid of that. I personally don't care about it since doing this via JavaScript makes the script very portable and easy to integrate just about anywhere.

You can view the JavaScript directly [here (embed\_yt\_gv.js)](/stuff/clubhouse/embed/embed_yt_gv.js). Feel free to use it. Just please give me a link back somewhere if you do.

Implementation is easy as the file takes care of everything. All you need to do it link to it in the head of your document like so:

``` html
<script src="/path/to/embed_yt_gv.js" type="text/javascript"></script>
```

#### And one more thing…

I forgot to mention when I originally posted this story that this script is intentionally incompatible with non-DOM aware browsers and with Internet Explorer.

It is incompatible with non-DOM aware browsers because I didn't want to screw around with duplicating code to accommodate old browsers.

It is incompatible with IE because IE does not recognize the `setAttribute` function. This is the fault of Microsoft, not of any use of JavaScript. If I get enough requests I can change that, but at the time of the script's writing and considering its audience over at the clubhouse that was not an issue.

**Edit:** As of IE7's release the `setAttribute` clause is still true. Why? Meh, IE sux.