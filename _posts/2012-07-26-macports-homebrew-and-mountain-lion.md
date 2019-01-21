---
id: 2189
title: MacPorts, Homebrew and Mountain Lion
date: 2012-07-26T21:25:41+00:00
layout: post
guid: http://top-frog.com/?p=2189
permalink: /2012/07/26/macports-homebrew-and-mountain-lion/
categories:
  - '*nix'
  - Computers
tags:
  - Apple
  - brew
  - homebrew
  - install
  - macports
  - os x
  - xcode
---
The inevitable happened today. Mountain Lion was installed in a couple of different places. Unfortunately one of those places was at work and on a development machine before we had a chance to test out Mountain Lion compatability. Predictably, issues arose. Not surprisingly, at least to me, Homebrew has the biggest issue, and an issue based on its core philosophy.

But first&hellip;

#### XCode

Prior to Mountain Lion the Xcode Command Line Tools could be downloaded separately from Xcode. This saved many of us the bandwidth and storage space required to install Xcode. As of the time of this writing I can only find the individually downloadable Command Line tools available for regular old Lion.

So that means a download of Xcode is required. Dag nabbit.

After downloading and installing Xcode open Xcode and go in to its Preferences, click on the Downloads tab and install the Command Line Tools.

**Update:** As noted by Patrick Quinn-Graham in the comments below, the Command Line Tools are now showing up in Apple's Developer portal. I recommend grabbing that if you don't need the full Xcode suite.

After that is done head to the command line and accept the command line tools usage agreement.

``` sh
$ sudo xcodebuild -license
```

Press space a few times to get through the whole thing and then type &#8220;accept&#8221; when it prompts you to. This provided a fun distraction for both Homebrew and MacPorts as the errors delivered because of needing to accept the usage agreement in no way point to the root cause of the errors. And to add insult to injury this was not needed on every system that I've had to manage. I found this by blind luck.

We're done with Xcode. We're now ready to compile applications on Mountain Lion.

#### MacPorts

MacPorts survived the upgrade just fine. MySQL, PHP and Apache were all running when Mountain Lion restarted. But just to be safe I updated MacPorts. 

``` sh
$ sudo port selfupdate
```

After the update almost everything that I had installed became listed as &#8220;outdated&#8221;. So, everything needed upgrading&hellip; :sigh:

``` sh
$ sudo port -cup upgrade outdated
```

But, all in all, done and done. Ok, eventually it was done after 6 hours of compiling.

#### Homebrew

Homebrew was harder. Homebrew's base philosophy, a philosophy that everyone loves about it (well, except for me) is that it uses already installed system libraries to run. Today that proved to be a bad thing.

Apple removed support for X11 in Mountain Lion. This means that anything that was linking to a library that was supplied by X11 would now complain and die. This meant our custom compiled version of PHP at work. dylibs were missing which prevented PHP from running and header files could not be found which prevented an update to PHP from compiling.

The Homebrew folks saw it coming a while back. There are pull requests and changes in branches that deal with this issue. However the best I can tell not all of that has made it in to master and its still not ready to go.

There is a work around, and it relies on installing XQuartz to provide the required X11 libraries. This may not be required for everyone, but for those of us that run specific versions of software it means a headache. In our case, for PHP, it meant that libraries required for font and image handling were missing. And these are just the errors that came up first. I'm not sure how many other things that X11 provided were waiting to error out should we have tried to link in the parts as we found the errors.

First, download and install [XQuartz](https://www.xquartz.org/). After doing that symlink it in to where Homebrew expects X11 to be. We had folder there, presumably left over from the upgrade.

``` sh
$ cd /usr
$ mv X11 X11.bak
$ ln -s /opt/X11 X11
```

Now, since this was an OS upgrade all of the config and ini files have been renamed and replaced. This means that the Apache conf and PHP ini files needed replacing. Fortunately for us we had a custom Homebrew Formula that handled this portion of the environment for us. So we just had to uninstall and reinstall that Formula to re-configure Apache and PHP how we had it. Your setup will of course be different.

#### Conclusion

So, overall, while my total time spent troublehsooting, updating and fixing a Homebrew install today took up a little more than 4 hours of my day, it was fixed and working. 

While I'm still pissed at Homebrew for taking more of my brainpower today its 4 hour investment is a bit shorter than the time it took MacPorts to get up to date. 

I have to say, though, that despite the longer compile time to update MacPorts I still prefer it for the sheer fact that it didn't force me to pay attention to it to upgrade to ML. I decided to pay attention to it (and would have had to eventually anyway). I was able to address MacPorts on my time, not because something was horribly broken.