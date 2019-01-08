---
id: 1381
title: Automatically download Chromium nightly builds
date: 2010-05-29T13:59:52+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1381
permalink: /2010/05/29/automatically-download-chromium-nightly-builds/
categories:
  - 'Web Design &amp; Development'
tags:
  - bash
  - chrome
  - chromium
  - download
  - nightly
  - script
---
<div class="quicknav">
  <p>
    <b>Updated July 7, 2012</b>: Fixed an issue on Lion where moving old version of Chromium to the trash would fail. Also now opens Chromium after the update is complete.
  </p>
  
  <p>
    <b>Updated June 9, 2011</b>: The nightlies moved again. The script below has been updated for that change.
  </p>
  
  <p>
    <b>Updated Oct. 28, 2010</b>: Sometime recently the Chromium nightlies moved. The script below is a revised version to reflect that change.
  </p>
</div>

So, if you're one of the geeks that likes to live on the cutting edge of cool and use the [Chromium](http://www.chromium.org/Home) [nightly builds](http://commondatastorage.googleapis.com/chromium-browser-continuous/index.html?path=Mac/) instead of Google Chrome proper or one of those paranoid types that wants to stay away from the built in usage tracker in Google Chrome then this post is for you. Well, the Mac users out there at least 😉

I'm not the first to do this and I probably won't be the last, but here is a script that I polished up that downloads the current nightly build of Chromium and drops it in to your Applications folder. Run it manually or hook it up to your favorite cron like system and have it do the work automatically.

<!--more-->

## The Script

``` sh
#!/bin/bash
# Script for auto-updating chrome nightly builds
# Once in a while this will need updating. They like to move the source periodically.
# See: http://top-frog.com/2010/05/29/automatically-download-chromium-nightly-builds/ for info

LATEST=`curl -s http://commondatastorage.googleapis.com/chromium-browser-continuous/Mac/LAST_CHANGE`
CHROMEURL="http://commondatastorage.googleapis.com/chromium-browser-continuous/Mac/$LATEST/chrome-mac.zip"

echo "Fetching $CHROMEURL"
/usr/bin/curl -L "$CHROMEURL" -o /tmp/chrome-mac.zip
wait

echo "Unzipping"
/usr/bin/unzip -o -qq /tmp/chrome-mac.zip -d /tmp
wait

echo "Stopping existing Chromium (if necessary) and moving old file to trash"
/usr/bin/osascript -e "

tell application \"System Events\"
  if exists (some process whose name contains \"Chromium\") then
    tell application \"Chromium\" to quit
  end if
end tell

tell application \"Finder\"
  if exists (file \"Chromium.app\" in folder \"Applications\" of startup disk)
    move file \"Chromium.app\" in folder \"Applications\" of startup disk to trash
  end if
end tell"

echo "Moving new Chromium in to place"
/bin/cp -Rf /tmp/chrome-mac/Chromium.app /Applications
wait

echo "Cleaning up"
/bin/rm -rf /tmp/chrome-*

echo "Done"
open /Applications/Chromium.app

exit 0
```

Save the script to an executable folder (I keep a ~/bin folder in my home folder that I've added to my path), do a `chmod +x filename` on the file to make it executable and have at it. Adding it to [cron](http://en.wikipedia.org/wiki/Cron) or creating a [launchd](http://developer.apple.com/macosx/launchd.html) plist and you'll be up to date automatically (pending that your computer didn't sleep through the designated update time…). 

## The Caveat

If you have an Adobe Creative Suite 4 or earlier installed you have a 32bit version of the &#8220;Adobe Unit Types.osax&#8221; file in your scripting additions folder. This will cause the script to spew chunks at the Applescript portion. The script still operates but it doesn't automatically quit Chromium during the update process. You have two options to fix this:

  * Download a newer version of that library from [Adobe's Support Site](http://kb2.adobe.com/cps/516/cpsid_51615.html)
  * If you don't script your Adobe apps at all you can safely zip up the &#8220;Adobe Unit Types.osax&#8221; file and the script will work.