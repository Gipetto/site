---
id: 235
title: MySQL bug with GROUP BY
date: 2008-06-19T08:12:00+00:00
layout: post
guid: http://top-frog.com/?p=235
permalink: /2008/06/19/mysql_bug_with_group_by/
categories:
  - 'Web Design & Development'
tags:
  - bug
  - group
  - mysql
---
Found a nice little bug in the stable version of MySQL5 in the [MacPorts](http://macports.org) repository yesterday.

Version is 5.051a and when using `GROUP BY` it ignored `ORDER BY DESC` and returned results in ascending order.

Its been a known bug since MARCH.

The MySQL5-devel port is working fine in the mean time, but holy shit. I have to wonder a few things.

1. how did it take me this long to find the bug (to my credit, I have no idea when macports pushed 5.0.51x).
2. why in the world hasn't it been fixed or patched yet?

**Edit:**

Now that I think a bit harder on the issue I might have noticed it earlier and chalked it up to being a n00b when I wrote other queries. When I upgraded this site I had to rewrite some queries that had mulitple joins and group by statements… I wonder if that was the same bug?