---
id: 76
title: Command line goodness
date: 2005-05-02T00:22:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=76
permalink: /2005/05/02/command_line_goodnessd/
categories:
  - Computers
---
Just learned these and thought I'd log it for posterity (and so I don't forget). I'm always looking to do things, fun things, in the terminal and thought these were cool.

<!--more-->

The first is a way to easily add that long, long path to your next command in Terminal. Say you're looking to see what's in a directory and you do:

``` sh
ls -alh /etc/httpd
```

to see all your config files for apache. Now, you don't want to type the path in again, so lets use the `!$` command to auto append the last word you typed to the next command. 

So the last word you typed was: `/etc/httpd` without the trailing slash, so don't forget that the added string is literal and we need to make sure the new string is complete, so we write:

``` sh
vim !$/httpd.conf.bak
```

From that Terminal will build the full command as

``` sh
vim /etc/httpd/httpd.conf.bak
```

It doesn't get much easier than that. `/etc/httpd` was but one example, just image not having to dive back into typing `/usr/local/program/build/db/conf/` or whatever stupidly long path you need to type.

**Beggining and End of line**

I often times will screw up a command and mistype the command I want to run. Terminal will tell me the command was not found, so I use the up arrow to get the last command and see that I accidentally wrote `vin` instead of `vim`. Easily changed – use `CTL-A` to get to the beginning to the line and fix that typo. Forget to put a statement on the end, now use `CTL-R` to get to the end of the line. Easy to do, easy to forget as well.

**Last, but not least, awk.**

`awk` will take the out put of a command and only print the column you're looking for. The standard column delimiter is whitespace, so use the `-F` flag to give it one of your own.

A good example is to check the last few hits to the webserver, this is easy with the `tail` command and `awk`. Here is a typical line of an httpd access log.

```
192.168.1.5 - - [30/Apr/2005:23:42:04 -0600] "GET /~sparker/oop/css/oop.css HTTP/1.1" 200 107
```

What we want is between the quotes, so we do:

``` sh
tail /private/var/log/httpd/access_log | awk -F\" '{print $2}'
```

Note the backslash in front of the quote character – this is needed for single and double quotes so they're treated as literal characters and not part of the command.

This brings back:

```
GET /~sparker/oop/css/oop.css HTTP/1.1
```

That gives us the method, url, and http code for the request. If we just wanted the url then we could do:

``` sh
tail /private/var/log/httpd/access_log | awk '{print $7}'
```

which would bring back:

```
/~sparker/oop/css/oop.css
```

Well, that's it for now. Don't know if I'll keep doing this but I just might. I like digging around in the command line but have much to learn about its subtleties.