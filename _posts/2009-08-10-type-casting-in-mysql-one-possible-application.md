---
id: 894
title: Type Casting in MySQL, One Possible Application
date: 2009-08-10T18:53:51+00:00
layout: post
guid: http://top-frog.com/?p=894
permalink: /2009/08/10/type-casting-in-mysql-one-possible-application/
categories:
  - Computers
tags:
  - cast
  - data
  - mysql
  - select
  - type
---
Long story short: If you have a closed system and have to store signed integers in a MySQL varchar field you can still get the benefits of the signed integer by type casting the field during the query.



Sometimes when writing functionality for a system like WordPress that has a definite benefit to using the built in storage mechanism the data can end up being stored in less than optimal formats. For example, signed integers in a varchar field. Fortunately it can still be made to work using the built in MySQL [CAST function](http://dev.mysql.com/doc/refman/5.0/en/cast-functions.html#function_cast).

First, some test data if you want to follow along at home:

``` sql
CREATE TABLE IF NOT EXISTS `casting_test` (
  `number` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
INSERT INTO `casting` (`number`) VALUES ('2'),('-2'),('4'),('-4'),('10'),('-10'),('1'),('-1');
```

Now, in the following query I select the number field and cast it as a signed integer. Pretty straight forward.

``` sql
SELECT number,
CAST(number as signed) AS sortfield
FROM casting_test
ORDER BY sortfield DESC
```

The results are this:

```
+--------+-----------+
| number | sortfield |
+--------+-----------+
| 10     |        10 | 
| 4      |         4 | 
| 2      |         2 | 
| 1      |         1 | 
| -1     |        -1 | 
| -2     |        -2 | 
| -4     |        -4 | 
| -10    |       -10 | 
+--------+-----------+
8 rows in set (0.00 sec)
```

This was done on MySQL 5.0.83 and I haven't done a heck of a lot of research but it certainly seems promising (and, according to Google, a relatively widely accepted practice).

CAST can be used to convert to the following types:

  * BINARY[(N)]
  * CHAR[(N)]
  * DATE
  * DATETIME
  * DECIMAL[(M[,D])]
  * SIGNED [INTEGER]
  * TIME
  * UNSIGNED [INTEGER]

So, while your best storage option may not be the optimal storage option, you don't have to lose the benefit of doing as much work on the SQL server as possible when selecting your data sets.