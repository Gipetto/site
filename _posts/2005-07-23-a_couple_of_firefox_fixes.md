---
id: 112
title: A couple of Firefox fixes
date: 2005-07-23T21:46:00+00:00
layout: post
guid: http://top-frog.com/?p=112
permalink: /2005/07/23/a_couple_of_firefox_fixes/
categories:
  - Computers
tags:
  - config
  - firefox
  - fix
  - pipelining
  - preferences
  - scrolling
---
This is more a note to myself than it is a tip. I've lost this info several times so I'm just leaving myself a note here since this gets backed up regularly. Both of these tips can be performed by entering Firefox and entering &#8216;about:config' in the address bar and searching for part of the strings to bring up the lines that need editing.



#### The side scrolling isse

Two fingered scrolling on the new Powerbooks causes Firefox to go forward and backwards when a horizontal scroll is performed on the trackpad. This can happen inadvertantly so it is easier just to turn the feature off.

```
mousewheel.horizscroll.withnokey.action to 0
mousewheel.horizscroll.withnokey.numlines to 1
```

This allows vertical and side scrolling to act as it should.

#### HTTP Pipelining

When using Firefox on a broadband connection pipelining can help speed up the browser.

```
network.http.pipelining to true
network.http.pipelining.maxrequests to 50
network.http.proxy.pipelining to true
```
