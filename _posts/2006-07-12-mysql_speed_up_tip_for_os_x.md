---
id: 170
title: MySQL speed up tip for OS X
date: 2006-07-12T23:19:00+00:00
layout: post
guid: http://top-frog.com/?p=170
permalink: /2006/07/12/mysql_speed_up_tip_for_os_x/
categories:
  - Computers
tags:
  - config
  - my.cnf
  - mysql
  - optimize
  - osx
  - server
  - speed
---
So, while it was nice to have MySQL on my server and on my laptop I had always felt that it was a bit pokey as far as response times go. Turns out I wasn't wrong. And its easy to fix.



The OS X version of MySQL that you can download straight from MySQL AB does not install a `my.cnf` file. Yep, its running with no optimization.

There are two ways to rectify this for a multi-user environment and 1 way to make changes user specific. The user-specific method doesn't address a web-server being pokey so I won't even mention it.

The correction is easy and dependent upon wether you want to effect the entire server (will effect multiple installs of MySQL) or just a single install of MySQL.

Most of us only run one instance of MySQL on our machines so this first method will be the easiest and also allows for a bit easier access to the `my.cnf` file for later tweaking. Locate your mysql install via the command line – mine was in `/usr/local/mysql-super-long-name/`. Once in the directory issue this command

``` sh
sudo cp support-files/my-medium.cnf /etc/my.cnf
```

This puts the `my.conf` file in a global location, the `/etc` directory. This means that all installs of MySQL will respond to changes made to this file.

If by chance you need to effect a specific server instance you can do

``` sh
sudo cp support-files/my-medium.cnf data/my.cnf
```

If you later need to edit this `my.cnf` file be sure to take care – the data dir is, you guessed it, where all your data lives. A slip in there and you can really bork your data.

Whichever way you decided to go you should now notice a marked improvement in server response times when accessing the database.