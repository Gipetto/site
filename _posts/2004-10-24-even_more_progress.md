---
id: 10
title: Even more progress
date: 2004-10-24T22:18:00+00:00
layout: post
guid: http://top-frog.com/?p=10
permalink: /2004/10/24/even_more_progress/
categories:
  - 'Web Design & Development'
tags:
  - php
  - bbcode
---
I finally figured out how to get lists into and out of the db without using html in the db.

WooHoo!

``` php
// find all lists in the text
preg_match_all("|(\[list\])(.*?)(\[/list\])|s",$text, $matches);
$i = "0";
// run each list
foreach($matches[2] as $lis) {
    // break out each list element
    $eachli = explode("[*]", $lis);
    // start list string
    $listring = "<ul>" . PHP_EOL;
    foreach($eachli as $key => $li) {
        // first array element is always
        // empty and we don't need it
        if($key > 0) {
            // build list elements
            $listring .= "<li>" . $li . "</li>" . PHP_EOL;
        }
    }
    // close list
    $listring .= "</ul>" . PHP_EOL;
    // insert new list text into original text
    $text = str_replace($matches[0][$i], $listring, $text);
    $i++;
}
```

Ha! I write this like someone's actually gonna read it!
