---
id: 49
title: 'MultiViews – is it that hard?'
date: 2005-03-03T06:26:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=49
permalink: /2005/03/03/multiviews_is_it_that_hard/
categories:
  - 'Web Design &amp; Development'
---
I'm getting close to getting a simple blog up for the monkey. She's been wanting a blog so that she can get some freeform writing done and just plain have fun with publishing a bit of content – even if it will only be read by a few people.

I have the framework done, it is very much a mirror of what I'm doing here, but with a few enhancements in code to fix a few blunders I made over here.

Still not perfect, but closer to better than this one is.



But when I uploaded the site to my 1and1 server the site fails. Why? MultiViews are not enabled on the server. So I contact tech support and ask them to look into it and what do I get back? An email saying that Mod\_negotiation is working just fine. Well, no, MultiViews is enabled by mod\_negotiation but MultiVeiws has to be specifically stated in the directory options for a site. The server is running apache 1.3.x so the problem lies, most likely, within the httpd.conf (or apache.conf, depending on the install) and will most likely be in the virtual host listing for my account. But no – when I try to enable MultiViews with the .htaccess file nothing happens – zip – nada. So I can only assume that I am right in that the conf file needs updating. Granted, it will require a restart of apache but that takes seconds, even for a large multihosted server.

It'll be interesting to see what they come back with in their next email because I told them where to look to see if MultiViews was even enabled for the server – if its not then I may need to either purchase web space or bring it in locally on Gossamer (300mhz iBook) and see if he can handle the load of two sites being served and bangin' away on a SQL server.

On a side note: anyone know how to check if multiviews is enabled other than trying to load a page? Will apachectl report back anything useful as to server config?

Anyway.

Hopefully this gets resolved soon so I can get Puddlemonkey.com up and running properly and get her the blog I've been promising for a little while now.

Even if it is nothing new it is fun and can be theraputic at times. Just to be able to get the mundane details of life out of your system is a big bonus.