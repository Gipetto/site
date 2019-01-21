---
id: 255
title: WordCamp Denver, 2009. My humble experience.
date: 2009-03-02T23:37:00+00:00
layout: post
guid: http://top-frog.com/?p=255
permalink: /2009/03/02/wordcamp_denver_2009-my_humble_experience/
categories:
  - PHP Scripting
tags:
  - cloud
  - code
  - denver
  - plugin
  - presentation
  - tag
  - wordcamp
  - wordpress
---
Amazingly enough I had the opportunity to speak at WordCamp Denver. As nervous as I was before hand (I very well could have puked) I came out pumped. Hopefully a few others did as well.

#### Say what?

My talk was about the basics of WordPress plugin development: actions and filters. The amount of ground I had to cover was akin to having 10lbs. of shit in a 5lb. bag. In retrospect I could have cut one part of the plugin short to leave myself time to cover the other bases at a bit more of a leisurely pace, but in reality what I needed was about 2 more hours to have time to discuss what I was doing and why. Hopefully, though, the amount of ground covered in a short amount of time was a decent illustration of just how quickly one can develop for WordPress. While its not the optimal system (don't take that the wrong way, nothing is optimal in the blogging space right now) WordPress makes changing the system very straight forward. 

The responses vary from _WTF?_ all the way around _Thank You!_ I'm not too worried about the variances in responses because at events like this there will be the advanced programmers who view an introductory presentation and then blog about how basic it was and then there will be those that didn't understand anything and feel the need to say it was way too complex. Fortunately most of the responses I've dealt with have been in the middle. I even had a long talk with one of the attendees immediately following my presentation about everything from OOP & MVC programming approaches, why WordPress can't do that right now, and even a little bit about operating system choices to another attendee who stopped in on the conversation. 

All in all: **I want to do it again. And I hope I have the chance to.**

#### The demo plugin

The demo plugin I chose to build was a Featured Post plugin. The goal was simple: create a plugin that adds a meta box to the post-edit admin screen so that I could record the post's status as being featured and then differentiate the post on the wordpress front end. I also wanted to show a list of featured posts in the sidebar as well as at the bottom of each post. And to do it all without touching the WordPress core or a theme file.

For those that are interested, [the plugin source can be viewed here](/script_src/my-featured-posts.php.html). That source is heavily commented to help anyone learn from the file. If there's anything I left out I'd be glad to add more information, and if there's demand I could write up a post here that details the creation of the plugin even more. Just let me know. That script can also be downloaded along with my presentation slides (in PDF format) by [going here](/dl/wordcamp) (that is the same page linked to from the WordCamp schedule page).

For anyone who wants to go for the full effect, here is the image I used as a badge and the CSS used to place it:

![Featured Article Starburst Icon](https://top-frog.com/images/articles/starburst-omg-white.png)

``` css
/* BASIC STYLING */
span.mfp-featured {
    display: none;
}
.post span.mfp-featured {
    display: inline;
}
#mfp-featured-posts-list-inline li span.mfp-featured {
    display: none;
}
/* BADGE STYLING */
span.mfp-featured {
    display: none;
}
.post span.mfp-featured {
    display: block;
    width: 75px;
    height: 75px;
    background: transparent url('images/starburst-omg-white.png') 0 0 no-repeat;
    text-indent: -9999px;
    position: absolute;
    left: -80px;
    top: -20px;
}
#mfp-featured-posts-list-inline li {
    margin-bottom: 2px;
    margin-left: 20px;
}
.post h2 {
    position: relative;
    text-align: left;
}
```

#### Extras

To compliment the talk I’ve put together a Tag Cloud of the [WordPress actions and filters from WordPress 1.5 to present](/htc/). It is a first revision and has just some basic styling and functionality, but covers all the bases. I can see this turning in to a larger deconstruction of the WordPress core so we’ll just have to see what kind of time I have to put in to it. This all by itself is pretty durned handy and I know I’ll be referencing it quite a bit. I just like mousing around and watching the pop-ups too 😉 It has been tested in Firefox and Safari. I haven’t even gandered at it in IE and probably never will. **Updated 2019 to require JavaScript only and update to WP 5.0**.

There is one filter in there that’s not completely right. If anyone can point it out before I fix it I’ll buy ya cup of coffee.

#### Not yet extra

There was another document that I brought up on screen that was requested by someone in the audience. I haven't had time to make sure that its at least 95% accurate so I'm holding on to that one until I have the chance to properly edit it and I'd also like to do it for WordPress 2.7. The one I brought up was done for WordPress 2.6.

#### Fin

So, thanks if you've gotten through this far and I hope to be throwing more WordPress knowledge out soon. Maybe first, though, I should actually get this heap on to WordPress so that I can use it as a functional example as well. This back end code, though light and efficient, doesn't have any built in conveniences.