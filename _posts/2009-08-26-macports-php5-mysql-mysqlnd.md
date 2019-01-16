---
id: 917
title: 'MacPorts, php5-mysql & mysqlnd'
date: 2009-08-26T11:59:02+00:00
layout: post
guid: http://top-frog.com/?p=917
permalink: /2009/08/26/macports-php5-mysql-mysqlnd/
categories:
  - PHP Scripting
tags:
  - macports
  - mysql
  - mysql native driver
  - mysqli
  - php
  - php5
  - php5-mysql
  - phpmyadmin
  - wordpress
---
If you don't know what that title says, don't bother reading on 😉

A little useless history: MacPorts decided to use the recent release of PHP 5.3 to change the way they handle PHP5 Extensions. They used to be applied by the MacPorts variants system but have been changed (and appear to still be in transition) to each be their own package. This doesn't bother me as it brings MacPorts to be more in line with how other package managers manage PHP extensions.

What I didn't notice in my most recent upgrade was that the php5-mysql extension defaults to using a new extension from MySQL called [MySQL Native Driver](http://dev.mysql.com/downloads/connector/php-mysqlnd/). Its benefits sure look nice and I can understand why they'd want to unify everything.

It would be nice if it worked in MacPorts… 'cause it doesn't. And the error messages are stupidly cryptic. For example, I got these error messages when trying to load a project:

``` apache
PHP Warning:  mysqli::real_escape_string() [<a href="mysqli.real-escape-string mysqli.real-escape-string</a>]: 
Couldn't fetch mysqli in /path/to/file.php on line 72,
referer: http://localhost/dir/test.php
```

Pretty darned informative, eh? And on top of that PHPMyAdmin continued to function normally and without incident. WordPress wouldn't connect either.

~~I still have no idea what this means or why it was happening, I just know that I found a workaround. Re-install php5-mysql with the mysql5 variant. ie:~~

``` sh 
$ sudo port deactivate php5-mysql
$ sudo port install php5-mysql +mysql5
```

~~This tells PHP to use the old-style MySQL install specific libraries. In my case (and I suspect in just about every case I'll ever run in to) this will be fine. WordPress is now back up and all my other projects are still functional as well. All is right with the world again… well, sort of. 😉~~

~~The only drawback is that I'll probably never notice when the MySQL Native Driver actually starts working as I'll forget this in a few months and never think to check it again…~~

**Update:** It turns out that I'm a doofus on this one. When upgrading PHP I didn't notice one of the install messages left during the build process. It reads:

```
To use mysqlnd with a local MySQL server, edit 
/opt/local/etc/php5/php.ini and set mysql.default_socket, 
mysqli.default_socket and pdo_mysql.default_socket to
/opt/local/var/run/mysql5/mysqld.sock
```

So, with that change, I'm up and running using the default mysqlnd variant of php5-mysql.