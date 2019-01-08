---
id: 1364
title: Add Bash syntax highlighting to Coda
date: 2010-05-27T10:39:37+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1364
permalink: /2010/05/27/add-bash-syntax-highlighting-to-coda/
categories:
  - Computers
tags:
  - coda
  - highlight
  - mode
  - subethaedit
  - syntax
---
<img class="floatright" src="https://i0.wp.com/top-frog.com/wp-content/uploads/2010/05/coda-icon.png" alt="Coda Logo" data-recalc-dims="1" />Just a quick tip here. [Panic's web-focused IDE Coda](http://panic.com/coda/) uses [SubEthaEdit's](http://www.codingmonkeys.de/subethaedit/) rendering engine. Coda uses an OLDER version of SubEthaEdit's rendering engine. So if you want to add syntax highlighting modes to Coda they have to be older versions. 

I wanted to add the Bash syntax mode from SubEthaEdit to Coda, but had to go back a few versions in SubEthaEdit to get one that would load. Fortunately SubEthaEdit 2.2 is still available for download and contains a compatible Bash mode.

To extract it you need to download the [SubEthaEdit 2.2](http://www.codingmonkeys.de/subethaedit/old/SubEthaEdit-2.2.dmg) version and mount the .dmg file. Right click on the SubEthaEdit icon and select &#8220;Show Package Contents&#8221;. Navigate to the Resources/modes folder and copy the bash.mode to your &#8220;`~/Library/Application Support/Coda/Modes`&#8221; folder. Restart Coda if it was open.

I'm not sure how to identify the newer versions of modes other than to just let Coda tell me that it won't work after I add the mode, and I'm not sure what it is about the newer modes that invalidates them for the older rendering engine in Coda. At least we're not left out in the cold, though.

It's no TextMate, but it'll work 😉