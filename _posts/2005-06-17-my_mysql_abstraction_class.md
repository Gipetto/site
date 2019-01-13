---
id: 96
title: My MySQL Abstraction Class
date: 2005-06-17T13:03:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=96
permalink: /2005/06/17/my_mysql_abstraction_class/
categories:
  - PHP Scripting
tags:
  - abstraction
  - class
  - mysql
  - object
  - oop
  - php
---
We all do it, and its a foundation of providing dynamic web content. The database call is almost everywhere now as dynamic pages are becoming the norm and not the exception. More and more I'm making database calls and my old class just wasn't cutting it anymore.



If you'd like to just dive in and see the script, [Dive in and take a look](/files/scripts/dbConnect.class.phps).

#### History

My first MySQL Abstraction class was actually written by a friend and slightly modded by me to add some error reporting functions. I took that version because at the time it was more than I knew not just about OOP but about MySQL functions in general.

I've used it for a great many things but have gradually outgrown it and found it to be a bit rough around the edges. The author admits that it was one of the first ventures he had into OOP. It seems that many of us make our first ventures into PHP OOP with MySQL Abstraction classes – probably because we use databases so much.

So, having outgrown that, I decided to make my own.

#### Wish List

I want a lot out of a MySQL Abstraction class – I want:

  1. The ability to override the default settings 
  2. A decent error reporter 
  3. An error emailer 
  4. Test settings to show errors based on IP 
  5. Easy DB reporting like pulling table lists 
  6. As much automatic functionality as possible

That's a good start, eh?

#### My Version

Well, I present my class. It's easy to use and works mostly by itself with little user interaction. After configuring the settings within the file I can do a query in all of 4 lines.

``` php
$db = &new dbConnect();
$query = 'SELECT * FROM table';
$db->queryDB($query);
$array = $db->arrayAssoc();
```

That gives me an associative array with my query results.

It has all the basic functionality like pulling results as associative results, objects, standard arrays, but will also loop through results and drop them into an array if I want it to. This is something I do 98% of the time anyway, so having it built in to the class was a boon.

I also added the ability to query the tables in 1 shot.

``` php
$tables = $db->showTables();
```

This returns an array of all the available tables.

Not sure what the server config is for a new client?

``` php
$sys = $db->sysInfo();
```

I now have the MySQL client version, server version, and host info.

I also like to have robust error reporting without revealing anything but an oops to the user. Now I have that. Any errors are emailed to me with a detail of date, time, page, query, and server that it occured on and what the error was.

I have also included settings for changing the mode of connection between a normal and persistent connection and to change the user from read only to read/write so that its not running with write privileges the whole time.

#### And now my favorite part

All major settings can be overidden at runtime.

I've run into several occasions where I needed to connect to a different database within the same page for a snippet of data. It is ususally a one time deal, not worth setting up a whole new script for.

Enter the runtime config.

I've made almost all the major config settings changeable by inclusion in the instantiation. Username, password (for both read-only and read/write), email recipient, database, server, error reporting can all be controlled by passing an array of values.

So I can switch databases easily by writing:

``` php
$settings = array(
  'username' => 'user',
  'password' => 'pass',
  'database' => 'db',
  'server' => 'server'
);

$db = &new dbConnect($settings);
```

One extra item and I'm connecting to a different database. I love it.

And if I need to use the script in a multi-user environment and I don't want any settings overidden I can easily set a flag in the script to disallow overrides. Then changing permissions on the file or storing the file in a directory that is only accessible by the webserver I can lock users out of changing that setting.

#### Open for consumption

So, after using it for a while, adding a few features, and polishing the rough edges (well, most of 'em, no guarantees that there aren't flaws) I'm releasing it as a no warranty, no guarantee, no license script that you can use, abuse, alter or improve upon if you're needing something of this nature.

It is php4 compatable since we all mostly work on php4 right now – I'm itching to get my sites on php5 but hosts are moving slowly right now and there's not much I can do about it. There's a few nice things I could do with php5 but that'll just have to wait. 

Other future improvements might be to move the error reporting into its own, more general, class and integrate it through aggregation. But I've got a few other things to do before that.

So, if you're interested, download it here: [dbConnect.class.php.zip](/dl/scripts/dbConnect.class.zip)

There's a full usage description at the bottom of the file where the full functionality is documented.

If you use it please drop me a line or leave a comment. I'm open to all suggestions and criticisms, so don't feel bashful about letting me know if something could be done better.

Later.