---
id: 97
title: "More gettin' my OOP on: Aggregation"
date: 2005-06-21T22:30:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=97
permalink: /2005/06/21/more_gettin_my_oop_on/
categories:
  - PHP Scripting
tags:
  - aggregation
  - class
  - oop
  - php
---
I promised myself that I'd write about something else but this has me so stoked that I just can't keep it in.

One of my biggest problems with getting into large PHP application programming with OOP was the sharing of functions. Inheritance just wasn't doing it the way I wanted it to. I knew it was possible but hadn't gotten the hang of it until I found Aggregation. Sweet, sweet aggregation…



#### Serious $geek++; coming up

So you're probably wondering what the hell I'm talking about. Unless you're seriously into php you've probably already glassed over so why not head over to [Chipotle.com](http://chipotle.com) and witness a very neat flash website. For the rest of you that have any kind of remote interest in PHP and OOP, hopefully you come back and read the rest of this.

What aggregation is not: anything related to agriculture.

What it is: a way to share object functions across objects. You can safely create a library of general functions and share their functionality within other objects wherever needed. 

This is the code reuse that I've been looking for – I finally learned it.

#### Class Association

There are a couple different ways to aggregate objects. The first is by instatiating a class inside another class. For example:

``` php
class myDate {
	var $date;
	
	function __construct($ts) {
		$this->date = date("Y-m-d", $ts);
	}
	
	function __toString() {
		return $this->date;
	}
}

class Writer {

	var $dt;

	function writeDate($ts) {
		$this->dt = &new myDate($ts);
		echo $this->dt;
	}
}

// using the classes
$wr = new Writer();
$wr->writeDate(time());

// echoes the date to the browser
```

This example creates an instance of the setDate class inside the Writer class. This means that any variable manipulations made with this instance of myDate will stay within this instance of Writer. The variables will not be shared outside of the Writer class instance. Any other function that wants to use the myDate object will have to create its own instance. This method is good if all you need to do is share routines and not any variables that they create.

#### Object Association

The next example will share the function by passing it along as a reference. I'll use the same example and modify it a bit:

``` php
class myDate {
	var $date;
	
	function __construct($ts) {
		$this->date = date("Y-m-d", $ts);
	}
	
	function __toString() {
		return $this->date;
	}
}

class Writer {
	function writeDate(&dt) {
		echo $dt;
	}
}

// using the classes

$wr = new Writer();
$dt = new myDate(time());

$wr->writeDate(&dt);

// echoes the date to the browser
```

This example is very slightly different than the first example in that it shares the myDate object by passing the object pointer in by reference – this way there is only one instance of the myDate class running and all variable manipulations will be available across any other object that aggregates it in. 

This is handy if you're dealing with globally used vars in a larger application – variables created and manipulated by the aggregated object can be passed around to whatever other class pulls it in.

#### Conclusion

With these two methods of aggregation we have ways of manipulating shared and private variables, depending upon how aggregate the classes and have a nice way of pulling in classes that are simply data processors and who just have supporting functions in them.

I can see a whole new world opening up to me now. And since I've gotten a handle on OOP I haven't looked back – I can't stand the idea of procedural code unless its just a snippet in a page – otherwise it should be a class or a function.

So hopefully I haven't bored you to tears, and maybe I've shown you something new. Either way, thanks for tuning in. Though I can see it now – there's gonna be more comments on the Chipotle site than there were about this article. Did you see the dogs running circles around the office in that site? No? Go look again…