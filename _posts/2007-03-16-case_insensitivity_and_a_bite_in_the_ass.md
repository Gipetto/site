---
id: 209
title: Case Insensitivity and a bite in the ass
date: 2007-03-16T09:37:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=209
permalink: /2007/03/16/case_insensitivity_and_a_bite_in_the_ass/
categories:
  - PHP Scripting
tags:
  - ass
  - bite
  - case
  - hfs+
  - insensitive
  - mysql
  - osx
  - php
  - script
  - unix
---
I made a disturbing discovery lately and I can't believe that it has taken me this long to run across it. Case insensitivity in OS X can play havoc with a website, like completely bring it down, if any capitalization errors are made and not caught before moving to a case-sensitive server, like a unix server. And its all, most likely, attributable to HFS+.



I first noticed issues with including files in PHP. If I include a file that is named _File.php_ and I request _file.php_ there will be no error on OS X and the file will include. On unix this will fail. 4 years and I've never run into this before… I don't know why. This one at least makes sense as it is the file system's behavior and should be expected.

The next is a bit disturbing. Case insensitivity slips into MySQL. And not just through PHP. Through CocoaMySQL as well and even through the MySQL command line client. I've successfully called a table like _AP_users_ by asking for _AP_Users_ and gotten the right table, and successfully queried it as well. Again, moving the system to unix works as expected – table not found.

I'm not only baffled by this behavior but also by how I could have overlooked it for so long. My solution is gonna be to move all sites and sql databases to a UFS partition to force case sensitivity, unless, someone has a better idea (no, I'm not switching all out to *nix). So far this is the only solution I've been able to come to.