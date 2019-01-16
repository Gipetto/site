---
id: 203
title: Convert file size denominations in PHP
date: 2006-12-20T14:58:00+00:00
layout: post
guid: http://top-frog.com/?p=203
permalink: /2006/12/20/convert_file_size_denomination_in_php/
categories:
  - PHP Scripting
tags:
  - code
  - convert
  - denomination
  - file
  - php
  - script
  - size
---
Convert a file size from one measure to another. For example, take a file that is recorded as 512KB and have it converted to .5MB. Yeah, that's an easy example, but that's 'cause I was writing it off the top of my head. So, if you need this sort of thing, here's a function that I thought came out pretty well.



``` php
function convert_file_size($unit, $from, $to) {
  $sizes = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');

  list($pos1) = array_keys($sizes, strtoupper($from));
  list($pos2) = array_keys($sizes, strtoupper($to));

  $up = $pos1 < $pos2 ? true : false;
  for($i = $pos1; $i != $pos2; ($up ? $i++ : $i--)) {
    if ($up) { 
      $unit = $unit / 1024; 
    } else { 
      $unit = $unit * 1024; 
    }
  }

  return $unit;
}
```

So, simply use it like:

``` php
$kbytes = convert_file_size(2.7, 'MB', 'KB');
```

Is any of this code particularly special? No. Do I still think its neat? You betcha!