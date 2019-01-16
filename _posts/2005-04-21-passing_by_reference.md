---
id: 69
title: Passing by Reference
date: 2005-04-21T15:18:00+00:00
layout: post
guid: http://top-frog.com/?p=69
permalink: /2005/04/21/passing_by_reference/
categories:
  - PHP Scripting
tags:
  - php
  - reference
---
Being a self taught php programmer I tend to learn something every time I run accross an article outlining different techniques. Lately I've been learning about references. At first I thought "so what?" at the thought of using a reference to a variable instead of the variable itself. But once I thought about it some more it made more and more sense.

Passing by reference, in case you don't know, means that you can make a statement like:

``` php
$var1 = 1;
$var2 =& $var1;
$var2 *= 2;
echo($var1);
```

In this instance the last echo statement will print 2. Right now, if you've never used references before you're thinking "yeah, so what?" Well, let's dive into a more complex example.

``` php
function manipulate_var(&$num) {
  $num = $num * $num;
}
$var = 4;
manipulate_var($var);
echo ($var);
```

This example returns `$var` as `16`. So instead of declaring a global in the fuction or calling and setting the variable via `$GLOBAL['var']` we can simply set a reference inside a function that effects the original variable.

This is something I wish I had learned a while back because I've been bitten in the ass by variable scope a few times and haven't liked the workarounds. This really makes life easier.

**Making life a little bit simpler**

Another less profound use is to make working with values in large multidimensional arrays much easier. So instead of having to write `$array[0][5]['var']` a bunch of times we can simply associate `$n = &$array[0][5]['var']` and work with var instead of having to dive into an array each time. Or you could make an array of values that is easier to work on than the master array. For example, if you have an array full of user data for multiple users: phone, fax, email, whatever, you could make another array of just phone numbers whose array values are referenced to the original array – that way you can work with smaller, more manageable arrays of data and always have your original array kept up with any changes you make down the line.

**Hope for the future**

Now a more profound example, manipulating each item in an array without having to dive into an array_walk. Unfortunately this only works in php5 so its a bit of a teaser until we can safely count on php5 being a standard available option. But here goes anyway:

``` php
$arr = array(1,2,3);
foreach($arr as &$v) {
  $v = $v * 2;    
}
print_r($arr);
```

This returns:

```
Array
(
    [0] => 2
    [1] => 4
    [2] => 6
)
```

Holy handy, Batman! This can essentially cut my usage of for loops in half.

**Returning References**

Another feature of references is being able to set the output of an entire function to references.

``` php
function &func($var) {
    ...
    return $var;
}
```

I haven't actually found a use for this yet so I can't comment on its total value. If anyone reading this has I'd be interested to see an example of its usage.

**A little warning**

Now, as handy as it might seem, don't try to use what is called 'call time' reference passing. That would be sending a function a reference when it is not expecting it. This can cause headaches when trying to troubleshoot a script. We all know how hard it is to find a mis-named variable (I can't tell you how many times I've mis-typed mysql as msyql) so think of how hard it would be to troubleshoot a reference being passed to a function unexpectedly. It would not be fun.

You can avoid this by setting the php setting `allow_call_time_pass_reference = On` to `Off`. This can be set in the `php.ini`, in a virtual server block in your apache configs or even at the head of a script with `ini_set()` to ensure you don't accidentally do this while learning or to prevent others from breaking your scripts.