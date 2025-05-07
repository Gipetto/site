---
id: 171
title: Turn off FTP. Go Secure!
date: 2006-08-03T07:18:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=171
permalink: /2006/08/03/turn_off_ftp_go_secure/
categories:
  - Computers
tags:
  - firewall
  - ftp
  - osx
  - secure
  - sftp
  - ssh
  - tunnel
---
If you use <dfn title="File Transfer Protocol">FTP</dfn> to connect to your Mac, TURN IT OFF! While FTP is nice and convenient its not terribly secure.

### FTP over SSH

A little known fact is that if you turn off FTP, but turn on Secure Shell Access in the Sharing Preferences you then can connect to your Mac using Secure FTP (SFTP) – [Wikipedia entry](http://en.wikipedia.org/wiki/Secure_FTP). Regular FTP is left off and an SSH tunnel is then required to connect via FTP and is done over port 22. 

You'll need to make sure this port is open on any firewall inbetween your Mac and the rest fo the world. OS X will automatically open port 22 on the local firewall when you enable Secure Shell Access.

You do have that local firewall enabled, right?
