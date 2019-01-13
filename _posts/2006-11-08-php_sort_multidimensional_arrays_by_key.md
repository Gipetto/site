---
id: 192
title: 'PHP: Sort Multidimensional arrays by key'
date: 2006-11-08T15:53:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=192
permalink: /2006/11/08/php_sort_multidimensional_arrays_by_key/
categories:
  - PHP Scripting
tags:
  - array
  - key
  - multi-dimensional
  - php
  - php4
  - php5
  - sort
---
**Update 2009-07-29:** This code has been updated and posted here: [Sort Arrays by Key Revisited](http://top-frog.com/2009/07/29/sort-arrays-by-key-revisited/).

* * *

So, I had to do some array sorting this week and finally bit the bullet and wrote a class to handle it. If you've got the need to sort a multidimensional array by a sub-array key then this might be of interest to you.



I often have something like this:

``` php
$a['sjohnson'] = array('name' => 'Sam','age' => '4');
$a['bjones'] = array('name' => 'bill','age' => '3');
$a['mslavos'] = array('name' => 'Max','age' => '1');
$a['abrova'] = array('name' => 'aNn', 'age' => '2');
```

and need to sort by, say, the name. So I wrote this script to take care of that. Since I have both PHP4 and PHP5 environments I wrote for both.

#### PHP5

``` php
/**
 * Sort a multidimensional array by a given key
 *
 * @example $b = AP_Array_SortByKey::sort_by_key($a,$sort_by);
 */
class AP_Array_SortByKey {
    /**
     * array key to sort by
     *
     * @var string
     */
    private static $key;

    /**
     * Sort a multidimensional array by a given key
     *
     * @param array $array
     * @param string $key
     * @return array
     */
    public static function sort_by_key($array, $key) {
        self::$key = $key;
        usort($array, array(self, 'sort_by'));
        return $array;
    }

    /**
     * comparison function for usort
     *
     * @param array $a
     * @param array $b
     * @return int
     */
    private static function sort_by($a, $b) {
        return (strcasecmp($a[self::$key], $b[self::$key]));
    }
}
```

#### PHP4

``` php
class AP_Array_SortByKey {
    public $key;
    public function sort_by_key($array, $key) {
        $this->key = $key;
        usort($array, array($this, 'sort_by'));
        return $array;
    }

    public function sort_by($a, $b) {
        return (strcasecmp($a[$this->key], $b[$this->key]));
    }
}
```

As you can tell, I was lazy and didn't bother to comment the PHP4 version.

#### Usage

It differs slightly between PHP4 and PHP5 because PHP4 doesn't understand static class members and methods.

So in PHP5 you can use:

``` php
$b = AP_Array_SortByKey::sort_by_key($a,'age');
```

and in PHP4 you would use:

``` php
$s = new AP_Array_SortByKey();
$b = $s->sort_by_key($a,'age');
```

to get back this from the sample array above

``` php
$a[0] = array('name' => 'Max','age' => '1'); 
$a[1] = array('name' => 'aNn', 'age' => '2');
$a[2] = array('name' => 'bill','age' => '3');
$a[3] = array('name' => 'Sam','age' => '4');
```

#### Drawbacks

There's only one that I can think of and that is that this class will strip the first level keys as it reorders. I'm not sure how to keep them without making it much more complex and, really, that loss doesn't worry me.

So, use freely and be sure if you find a way to make it better to let me know.