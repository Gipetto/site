---
id: 130
title: MySQL Class Updated
date: 2005-09-12T22:23:00+00:00
layout: post
guid: http://top-frog.com/?p=130
permalink: /2005/09/12/mysql_class_updated/
categories:
  - PHP Scripting
tags:
  - class
  - code
  - database
  - escape
  - mysql
  - oop
  - php
  - sql
---
The change is minor but has significant meaning to the script. I added two functions – `escapeData()` and `buildQuery()`.

The significance of adding these is mainly in the `escapeData()` function. Instead of encouraging the user the use `addslashes` before using submitted data or, worse yet, encouraging the user to rely on `magic_quotes`, the `escapeData()` function uses the `mysql_real_escape_string` function to escape the data per the MySQL server's instruction. In this case the escaping is more in tune to what the SQL server needs and is also consistent with the character encoding that the database uses. Character encoding is picky when storing binary data in the database, so this helps maintain a proper matchup of data encodings.



And example of usage would be:

``` php
$query = sprintf("SELECT * FROM table WHERE email=%1 AND name=%2",
          $this->escapeData($email),
          $this->escapeData($name));
```

The other is `buildQuery()`. buildQuery ties in directly to escapeData in that it uses the escapeData function to put together an escaped query string like so:

``` php
$base_query = "SELECT * FROM table WHERE email=%1 AND name=%2";
$query = $db->buildQuery($base_query,$var1,$var2,etc...);
```

The function is nothing extraordinary (it actually emulates using sprintf with a foreach loop) but it can save you some typing on long queries that use a lot of outside data.

So, nothing huge, just trying to be correct. Download the updated [dbConnect script here](/files/scripts/dbConnect.class.zip) or [peruse the source code here](/files/scripts/dbConnect.class.phps).