---
id: 1163
title: Quickly View WordPress DB Credentials
date: 2009-12-18T15:40:22+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1163
permalink: /2009/12/18/quickly-view-wordpress-db-credentials/
categories:
  - 'Web Design &amp; Development'
tags:
  - credentials
  - ssh
  - terminal
  - wordpress
---
**Stupid Gippy Trick #2495:** The title may sound funny, and the concept a bit weird, but when you're working on many different client servers, development and production servers, with as many different configurations, keeping track of DB credentials can get a little tiresome and time consuming.

Here's a command line one liner to print the database credentials so that they're easily used to manually log in to MySQL or do a database dump:

``` shell
$ grep DB_ wp-config.php
```

Which prints out:

``` php
define('DB_NAME', 'putyourdbnamehere');
define('DB_USER', 'usernamehere');
define('DB_PASSWORD', 'yourpasswordhere');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
```

Voila! No more switching back and forth from a credentials file or database or get the credentials, you simply use that's already there.

Somebody more ambitious could probably make a little function that parses that output and creates a MySQL login command or mysqldump command, but right now that's not me. 😉