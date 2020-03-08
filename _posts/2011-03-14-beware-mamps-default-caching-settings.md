---
id: 1954
title: "Beware MAMP's default Caching Settings"
date: 2011-03-14T15:20:46+00:00
layout: post
guid: http://top-frog.com/?p=1954
permalink: /2011/03/14/beware-mamps-default-caching-settings/
categories:
  - Computers
  - 'Web Design & Development'
tags:
  - apache
  - apc
  - cache
  - eaccelerator
  - lamp
  - MAMP
  - mysql
  - php
  - xchache
---
[MAMP](http://www.mamp.info/) is a wonderful thing. It allows for quick setup of a LAMP stack just about anywhere. This makes it great for testing. However, the folks who manage MAMP are focusing MAMP's default settings towards production use, not development use. This means that [XCache](http://xcache.lighttpd.net/) is turned on by default and that means that there is variable caching and file-path caching going on (MAMP also includes the [APC](http://php.net/apc) & [EAccelerator](http://eaccelerator.net/) extensions, which do very similar things, as well).



While enabling these caching settings is good for performance they're not really good for development since both filesystem paths and interpreted code can be cached for periods of time. What made me notice was when a machine here in the office wasn't honoring the new path to a renamed folder. The assets in this folder were all loaded via include statements using relative paths. Hard coded paths should not have been an issue, but for some reason the system kept looking for the files in their old location. 

It took a while before I narrowed it down to the caching settings as a culprit. Once we turned off caching all together our changes were reflected immediately and all was right again with the world.

### What you need to do {#what-you-need-to-do}

The modification is simple, its just a change to the MAMP preferences. 

  1. Open MAMP
  2. Click the &#8220;Preferences&#8221; button or select &#8220;Preferences&#8221; from the MAMP menu
  3. Click on &#8220;PHP&#8221; in the tab-bar if its not already selected
  4. Change the &#8220;Cache&#8221; dropdown to be &#8220;&ndash;&ndash;&#8221; so that no caching extension is used
  5. Click &#8220;OK&#8221; to save the changes
  6. Restart MAMP (click &#8220;Stop Servers&#8221; and then &#8220;Start Servers&#8221; once they've stopped)
