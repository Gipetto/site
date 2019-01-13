---
id: 867
title: Sort arrays by key revisited
date: 2009-07-29T00:15:19+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=867
permalink: /2009/07/29/sort-arrays-by-key-revisited/
categories:
  - PHP Scripting
tags:
  - array
  - key
  - multisort
  - php
  - sort
  - sort_by_key
  - uasort
---
I don't know why but I have an infatuation with little utility functions. Its pretty stupid, but it keeps me entertained and provides me with a cheap blog post 😉 That and I've noticed it trending _A LOT_ in my search keywords lately, so I figure I should post some updated and easier to use code.

A few years ago I posted on [Sorting Multidimensional Arrays by Key](http://top-frog.com/2006/11/08/php_sort_multidimensional_arrays_by_key/). The solution had php4 and php5 version and they were class based. Kind of awkward to use. They were originally dumped in a framework and accessed statically. After much tweaking and moving it from project to project it is down to a single function that also sorts arrays of objects my member variables.



``` php
<?php
/**
 * Sort an array by a key within the array_items
 * Items can be arrays or objects, but must all be the same type
 *
 * @example
 * 		$array = array(
 *					'mary' => array('age' => 21),
 * 					'bob' => array('age' => 5),
 *					'justin' => array('age' => 15)
 *					);
 *		$array = cf_sort_by_key($array,'age');
 *		# array is now: bob,justin,mary
 *
 * @param $data - the array of items to work on
 * @param $sort_key - an array key or object member to use as the sort key
 * @param $ascending - wether to sort in reverse/descending order
 * @return array - sorted array
 */
function array_sort_by_key($data,$sort_key,$ascending=true) {
	$order = $ascending ? '$a,$b' : '$b,$a';

	if(is_object(current($data))) {
		$callback = create_function($order,'return strnatcasecmp($a->'.$sort_key.',$b->'.$sort_key.');');
	} else {
		$callback = create_function($order,'return strnatcasecmp($a["'.$sort_key.'"],$b["'.$sort_key.'"]);');
	}

	uasort($data,$callback);
	return $data;
}
```

Less code. Easier to use. Single code base for php4 and php5. And once php 5.3 becomes more ubiquitous I can rewrite it again to use lambda functions 😉