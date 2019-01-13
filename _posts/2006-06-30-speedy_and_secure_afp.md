---
id: 166
title: Speedy and Secure AFP
date: 2006-06-30T09:05:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=166
permalink: /2006/06/30/speedy_and_secure_afp/
categories:
  - Computers
tags:
  - afp
  - Apple
  - client
  - file
  - filing
  - osx
  - protocol
  - secure
  - server
  - ssh
  - transfer
---
One of my long time complaints about using AFP (Apple Filing Protocol) has been its speed and my inability to get a secure connection. Well, all that changed this morning as I found some hints that fixed both speed and security issues. And it was under my nose the whole time…



The problem is that for some reason OS X Server, at least my install, is not advertising that it can connect AFP via SSH so the trickery has to happen on the client side. Initiating the connection from the client is the same – use Command-K or choose &#8216;Connect To Server' from the Go menu. 

Before sending your credentials click the cog icon in the lower left corner of the window and select Options. In here, deselect &#8216;Allow sending password in clear text' – this will ensure that if a secure connection can't be made it won't fall back onto a plain connection.

Next check the box &#8216;Allow secure connections using SSH'. But here's the kicker – turn off &#8216;Warn when connection does not support SSH' – the problem with secure connections was that the server didn't respond that it was OK and thus the connection would then default over to clear text. Without this check the connection is forced over SSH.

A side benefit for me is that this significantly improved the responsiveness of the server and increased transfer speeds between client and server. This just might allow me to put my music back on the server where it belongs since I can connect with decent speeds now.