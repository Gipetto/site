---
id: 56
title: Spoiled on Gentoo
date: 2005-03-18T21:20:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=56
permalink: /2005/03/18/spoiled_on_gentoo/
categories:
  - Computers
---
Red Hat Linux Enterprise Edition.

I'm fearing it. I have to do an install at work to run a test server and I'm not looking forward to it. Since I've started using Gentoo the RPM based distro's seem like such a pain in the ass.

<!--more-->

A little background for the non-geeks. Linux packages typically consist of just what is needed to perform a certain function. Because of this when you install one package you probably need others to do this, they have dependencies. But if you don't have a dependency installed you can't install it later, it has to be installed before you install the one you're after. WIth RPM based distros this can be a pain in the ass especially when you want to install 3 things but you have 30 or more dependencies. And the crappy thing about RPM based distros, unless I'm missing something here, is that you'll find out about dependencies one at a time. So you'll have to try a build 30 times to find you have 30 dependencies that you need to get first. And sometimes dependencies have dependencies.

This is where Portage on Gentoo comes in handy. You tell it what you want, it factors dependencies and it installs what you need. I put CVS, Python and a couple of CVS extras on my Gentoo box at work and it downloaded and compiled 76 items. That would have wasted a bunch of time on an RPM based system.

That said – I'm dreading this install of Red Hat. I'm not geeky enough to just punch out an install. I had to look up recommended partition tables for Red Hat so I knew how to manipulate it and still get the system what it wanted. Granted, the install of Gentoo wasn't quite smooth as silk – my build took 3 days because it was an old machine and I had to boot Knoppix to do it. But I just don't want to think about the crap I'm gonna have to do to get Red Hat installed and happy with everything that I need.

I really have been spoiled by Gentoo.