---
id: 155
title: MySQL Class Updated for PHP 5 part 1
date: 2006-03-06T15:42:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=155
permalink: /2006/03/06/mysql_class_updated_for_php5_1/
categories:
  - PHP Scripting
tags:
  - class
  - code
  - database
  - dbconnect
  - mysql
  - oop
  - php
  - php4
  - php5
  - script
  - sql
---
I've updated the SQL class to use some native PHP 5, namely constructors and destructors and include some backward compatibility so PHP 4 does not freak out when it loads the class.

I'll hopefully be making this 100% PHP 5 native soon enough as I'll actually have a native PHP 5 environment to apply it to.



Namely the class makes use of `register_shutdown_function` and `call_user_func_array` to simulate constructor behavior on PHP 4. So by doing this:

``` sh
function dbConnect($settings=array()) {
  if(phpversion('tidy') < 5) {
    // construct
    $argcv = func_get_args();
    call_user_func_array(array(&$this, '__construct'), $argcv);
    // destruct
    register_shutdown_function(array(&$this), '__destruct');
  }
}
```

I can now use `__construct` and `__destruct` in a PHP 4 compatible script and have the script be a little more PHP fun. The main advantage is that this script can close the db connection by itself now instead of having to do it in the page.

Hopefully this is useful to somebody…

You can view the entire source [here](/script_src/dbConnect.class.php.html).
