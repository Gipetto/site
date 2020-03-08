---
id: 73
title: My first OOP
date: 2005-04-23T11:55:00+00:00
layout: post
guid: http://top-frog.com/?p=73
permalink: /2005/04/23/my_first_oop/
categories:
  - 'Web Design & Development'
tags:
  - php
  - oop
  - learning
---
The next logical step in my education of PHP is to learn PHP5's implementation of OOP. I started that this morning and wrote myself a short, useless script using a couple of the new features in PHP5.

I learned how to use static variables and constructors. Not bad for my first hour. :: cue child's voice :: I made this:

``` php
Class myCounter {
    static $counter = 0;
    public $id;

    // constructor runs at function open
    function __construct() {
        self::$counter++;
        $this->id = self::$counter;
    }                
}

Class myObj extends MyCounter 
{
    function showMyId() {
        return $this->id . "n";
    }
}

$one = new myObj();
$two = new myObj();

echo $one->showMyId();  // prints: 1
echo $two->showMyId();  // prints: 2
```

Pretty much all it does is inherit and increment the myCounter Class each time the myObj class is instantiated, but still its pretty cool. I haven't even done anything constructive with OOP and I'm already excited about it.

Now onto Polymorphism.