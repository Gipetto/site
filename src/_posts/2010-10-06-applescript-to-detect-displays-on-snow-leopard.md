---
id: 1620
title: AppleScript to Detect Displays on Snow Leopard
date: 2010-10-06T08:26:28+00:00
layout: post.liquid
guid: http://top-frog.com/?p=1620
permalink: /2010/10/06/applescript-to-detect-displays-on-snow-leopard/
categories:
  - Computers
tags:
  - "10.6"
  - Apple
  - applescript
  - detect
  - display
  - menu
  - menu-bar
  - menu-item
  - os x
  - snow leopard
---
One of the things about having a laptop and continually connecting and disconnecting from an external display is having to tell the system to detect the external (and sometimes the internal) display so that both displays are running. Simply detecting displays doesn't seem to be an easily scriptable system event. I finally got an AppleScript cobbled together so that I can simply launch this AppleScript from [LaunchBar](http://www.obdev.at/products/launchbar/index.html) (you Quicksilver users can do the same thing).

This is based off of code that I've written as well as code that I found on Apple's AppleScript mailing list and should be adaptable to most menu-bar items.

``` applescript
to click_menu_extra at menu_list
	tell application "System Events" to tell process "SystemUIServer"'s menu bar 1
		click (first menu bar item whose value of attributes contains menu_list's beginning)

		repeat with item_name in rest of menu_list
			click (first menu item of result's menu 1 whose name is item_name)
			delay 0.5
		end repeat
	end tell
end click_menu_extra

click_menu_extra at {"displays", "Detect Displays"}
```

The key part that took a while to figure out in there is the delay right after the menu item click. The system just didn't like everything happening so fast and on a whim I tried the delay and it worked.

This works with OS X 10.6 Snow Leopard. It seems that in every major release since about 10.4 Apple has changed something about the syntax for reaching menu-bar items so I don't expect this to work on previous versions of OS X. 

**Update 2011-11-21:** This script continues to work fine on Lion. For those that prefer a Gist to copy from, [you can do that here](https://gist.github.com/1384194).
