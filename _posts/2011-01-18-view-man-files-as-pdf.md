---
id: 1845
title: View man files as PDF
date: 2011-01-18T09:58:40+00:00
layout: post
guid: http://top-frog.com/?p=1845
permalink: /2011/01/18/view-man-files-as-pdf/
categories:
  - Computers
tags:
  - bash
  - command line
  - man
  - pdf
  - preview
  - script
---
Sometimes viewing man pages on the command line is less than convenient. Ok, its always inconvenient. But there's a better way: convert the man page to pdf and view it with Preview.

Add this to a file, I named mine `manv`, put it in a safe place (I keep a `/bin` folder in my home directory) and make it executable with `chmod a+x filename`.

``` shell
#! /bin/bash
if [ "$#" = "1" ]; then
	man -t ${1} > /tmp/${1}.ps
	pstopdf /tmp/${1}.ps /tmp/${1}.pdf
	open -a Preview.app /tmp/${1}.pdf
	sleep 10
	rm /tmp/${1}.ps /tmp/${1}.pdf
fi
```

Now invoke the man page with your new script name instead of with man and read it in Preview. Enjoy!