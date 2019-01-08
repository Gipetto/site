---
id: 143
title: Alternate Syntax for PHP Control Structures
date: 2005-11-17T09:45:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=143
permalink: /2005/11/17/alternate_syntax_for_php_control_structures/
categories:
  - PHP Scripting
tags:
  - alternate
  - brace
  - code
  - control
  - php
  - structure
  - syntax
---
I posted a link to this in my links section but get excited about it every time I use it, so I have to post a blurb on it here just in case any PHP geeks that read this didn't click the link.

Its cool, dammit! Really, it is. No more curley braces for if, while, for, foreach, and switch statements!

C'mon – I know you're interested.

<!--more-->

So we're all used to writing:

``` php
if($this == $that) {
    // do this
} else {
    // do that
}
```

That in and of itself isn't too bad. But when we get into this:

``` php
if($this == $that) {
    if($this > 1) {
        // do other
    } elseif($this =< 1) {
        // wat?
    } else {
        // more
    }
} else {
    if($that != 0) {
        // do that
    } elseif($that > 0) {
        if($that < 10) {
            // whoa
        }
    } else {
        // panic
    }
}
```

It can get a bit hairy matching up all those braces.

I don't know when this was added, but PHP has an [alternate syntax](http://us2.php.net/manual/en/control-structures.alternative-syntax.php) for controlling these statements that eliminates the curley brace.

``` php
if($this == $that):
    // do this
endif;
```

We're able to eliminate matching curley braces with an easier to find `endif;` statement. Now longer and deeply embedded statements get easier to make sure they're closed. For example:

``` php
if($this == $that):
    if($this > 1):
        // do other
    elseif($this =< 1):
        // wat?
    else:
        // more
    endif;
else:
    if($that != 0):
        // do that
    elseif($that > 0):
        if($that < 10):
            // whoa
        endif;
    else:
        // panic
    endif;
endif;
```

Like I said, I don't know when this was first introduced but I've never seen it taught in a book. The lowest version of PHP I currently work with is PHP 4.3.11 and it works fine. I suggest you give it a look see on your version (if older than that) to see if you can use it… I have no reason to think that you wouldn't since there is no version caveat on the [php page that explains using this](http://us2.php.net/manual/en/control-structures.alternative-syntax.php) but we all know to check first before depending on something, right? right?

So, hopefully this has been useful to ya, I know it has been for me!