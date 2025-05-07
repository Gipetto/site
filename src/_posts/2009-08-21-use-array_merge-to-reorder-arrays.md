---
id: 906
title: Use array_merge to reorder arrays
date: 2009-08-21T07:56:42+00:00
layout: post.liquid
guid: http://top-frog.com/?p=906
permalink: /2009/08/21/use-array_merge-to-reorder-arrays/
categories:
  - PHP Scripting
tags:
  - array
  - array_merge
  - order
  - php
  - sort
---
This one is pretty fun. Well, at least I think it is. 

I was working with jQuery UI Sortables the other day and getting the reordered elements from jQuery back in to PHP for reordering via Ajax I ended up with an array whose elements matched the array keys of the array that I needed to order. Pretty standard fare. But I knew that there had to be a keen way to tackle the reordering process without going through some convoluted code. I was right. The way was the merge the two arrays.



The way [array_merge](http://php.net/array_merge) works is if your array keys are non-numeric and that if the second given array has the same keys as the first given array the data from the second given array replaces the data in the first given array without reordering the first given array. 

This was perfect since the two arrays will match perfectly in length and keys since they were built off the same data. This meany that all I had to do was take the new order data from jQuery Sortable, apply [array_flip](http://php.net/array_flip) and merge the old ordered array in to the new order. Like so:

``` php
<?php
// my "original" array of data
$array = array(
	'a135' => 'one',
	'1b84' => 'two',
	'd934' => 'three',
);

// the "new order" passed back to us from an outside source
$array2 = array(
	'd934',
	'1b84',
	'a135'
);

// flip the keys and values of $array2
$array2f = array_flip($array2);

// merge the arrays and output
$r = array_merge($array2f,$array);
print_r($r);
```

This code outputs:

``` php
Array
(
    [d934] => three
    [1b84] => two
    [a135] => one
)
```

So, the array is reordered without any hubbub. Nothing groundbreaking, just another way to reduce a few lines of code and not have to try and re-invent the wheel.
