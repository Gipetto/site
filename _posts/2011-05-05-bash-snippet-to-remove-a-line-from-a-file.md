---
id: 1970
title: Bash snippet to remove a line from a file
date: 2011-05-05T09:03:42+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1970
permalink: /2011/05/05/bash-snippet-to-remove-a-line-from-a-file/
categories:
  - Computers
tags:
  - bash
  - function
  - line
  - number
  - remove
  - rmline
  - sed
---
A while back I was working on a project that involved spooling up and shutting down a lot of Amazon EC2 instances while testing and I was constantly running in to an issue where my `~/.ssh/known_hosts` file was out of sync with the server that I was connecting to.

Despite how simple it is, I could never remember the `sed` command to remove a line from a file. To help get around having to repeatedly manage my known_hosts file and/or look up the `sed` command I wrote a little function to remove lines from files using sed. Hopefully someone else out there finds this useful.

``` sh
rmline() {
	if ! [  "$#" = "2" ]; then
		echo 'Invalid paramter count';
		echo 'Usage: rmline line-num filename'
		return;
	fi
	
	sed -i 0 "$1d" $2
}
```

So, stick that in your `.profile` and <strike>smoke it</strike> enjoy!