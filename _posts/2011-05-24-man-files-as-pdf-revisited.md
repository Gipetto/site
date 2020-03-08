---
id: 1988
title: man Files as PDF, revisited.
date: 2011-05-24T13:32:37+00:00
layout: post
guid: http://top-frog.com/?p=1988
permalink: /2011/05/24/man-files-as-pdf-revisited/
categories:
  - Computers
tags:
  - '*nix'
  - pdf
  - man
  - help
  - script
---
[I've posted before on converting man files to PDF](/2011/01/18/view-man-files-as-pdf/) for easier reading and forgot to post this update. The code is much terser, reminds you when you've invoked it without a parameter, and doesn't leave turds that it has to clean up.

``` sh
#! /bin/bash
mpg=$1

if [ ! $mpg ]; then
	echo "Enter a man page to convert: ";
	read mpg;
fi

if [ ! $mpg ]; then
	exit;
fi

man -t $mpg | open -f -a /Applications/Preview.app;
```

Enjoy!