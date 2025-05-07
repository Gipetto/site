---
id: 1476
title: Firefox view-source tab-width
date: 2010-07-15T17:53:37+00:00
layout: post.liquid
guid: http://top-frog.com/?p=1476
permalink: /2010/07/15/firefox-view-source-tab-width/
categories:
  - Computers
tags:
  - about
  - config
  - firefox
  - mozilla
  - option
  - source
  - view
---
[<img src="/assets/articles/firefox.png />](/assets/articles/firefox.png)Rejoice! There's a way to set the tab with of the view-source window in Firefox. In March of this year Mozilla [finally added an about:config option](https://bugzilla.mozilla.org/show_bug.cgi?id=295506) to control the tab-width in Firefox.

I'm on Firefox 3.6.6 and it works like so:

  1. Enter `about:config` in the url bar.
  2. Filter the list (using the search box at the top) by typing `view_source`.
  3. If you already have an option for `view_source.tab_size` then simply change its integer value and you're done.
  4. If you don't have an option for `view_source.tab_size` then continue.
  5. Right click in the window and select `New > Integer` from the flyout menu.
  6. Name the field `view_source.tab_size` and give a value appropriate to your needs, for me that was the common default of `4`.
  7. Rejoice!

For more info there is [a full list of `about:config` options at Mozillazine](http://kb.mozillazine.org/About:config_entries).

**[update]:** Pingbacks and Trackbacks have been disabled on this post 'cause its getting abused by people using the PingCrawl plugin.
  
**[update 2011-12-13]:** As noted below by **fx** this is now named `tab_size` in the latest versions of FF.
