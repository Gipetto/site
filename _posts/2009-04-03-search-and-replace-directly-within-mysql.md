---
id: 552
title: Search and replace directly within MySQL.
date: 2009-04-03T08:21:06+00:00
layout: post
guid: http://top-frog.com/?p=552
permalink: /2009/04/03/search-and-replace-directly-within-mysql/
categories:
  - 'Web Design &amp; Development'
tags:
  - database
  - multi-user
  - mysql
  - replace
  - sql
  - string
  - table
  - wordpress
  - wpmu
---
MySQL always amazes me with the breadth of functionality that it has. Too often we just use it to push and pull information from the database. So when I hit an occasion where I can so in a single SQL statement that would require a time consuming PHP I get excited. 



Here, I had to so some simple string replacement on some database values. I had some PDF files in a WordPress MU database that didn't get updated by one means or another when upgrading from WordPress MU 2.6 to 2.7. WordPress 2.6 stores attachment location data will full file paths, so that when the database is moved to another server the file paths are wrong and need updating. This was fixed in 2.7 by storing just the path relative to the upload root. What that also means, though, is that when WordPress MU encounters that full file path that permalink generation borks. 

So, with the scene set, here's the code. Its pretty simple. We simply walk the database table using the `REPLACE()` function (found on the [MySQL.com string functions page](http://dev.mysql.com/doc/refman/5.1/en/string-functions.html)) where we encounter our string. Example:

``` sql
UPDATE wp_1_postmeta
SET meta_value = REPLACE(meta_value,'/path/to/files/','')
WHERE meta_value LIKE '%.pdf'
AND meta_value LIKE '/path/to/files/%'
AND meta_key = '_wp_attached_file'
```

Explanation:

``` sql
Update "table name"
SET "column name" = REPLACE("column name","find","replace")
WHERE "column name" LIKE "ends with .pdf"
AND "column name" LIKE "starts with path to files dir"
AND "other column name" = "file attachment identifier"
```

Yeah, its that simple. Not much more to say except that I know all the DB admins that run across this are gonna want to welcome me to 1998 😉