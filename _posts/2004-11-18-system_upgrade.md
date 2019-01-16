---
id: 17
title: System upgrade
date: 2004-11-18T10:00:00+00:00
layout: post
guid: http://top-frog.com/?p=17
permalink: /2004/11/18/system_upgrade/
categories:
  - Computers
tags:
  - osx
  - server
---
Well, finally got this computer upgraded to 10.3 Server. And since the version of PHP that comes with 10.3 Server is a bit lacking I upgraded the whole bit and took the plunge into PHP 5.

Everything seems to be OK so far. The server admin software is a bit lacking for in depth server configs so I actually had to dive into the `httpd.conf` file to get everything how I wanted it. It might have something to do with wanting to run this site out of a user Sites folder but a couple of minor tweaks and all is good.

Everything seems to have transfered over just fine – my main concern was SQL and my Avatar script but both are performing splendidly.

My next endeavor on this box is to get internal DNS set up so that I don't have to keep up HOSTS files on 4 different computers. Significantly easier than running scripts to change hosts files based on location too.

Maybe I'll tackle DHCP as well. The admin tools look straight forward enough but even from what little I know about DHCP and DNS they look a bit simple. I wonder if it is because only so much can be done through a GUI. A certain amount of knowledge probably widely surpasses any capabilities they can put into a GUI – so it's the nose into the books for me.
