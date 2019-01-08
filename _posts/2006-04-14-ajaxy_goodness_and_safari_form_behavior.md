---
id: 158
title: Ajaxy goodness and Safari form behavior
date: 2006-04-14T22:52:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=158
permalink: /2006/04/14/ajaxy_goodness_and_safari_form_behavior/
categories:
  - 'Web Design &amp; Development'
tags:
  - ajax
  - behavior
  - comment
  - docblock
  - documentation
  - form
  - innerhtml
  - javascript
  - oop
  - pear
  - php
  - php5
  - safari
  - xmlhttprequest
---
Yeah, so I'm about a year behind everybody else on this one. I finally wrote my own little Ajax class. Most other classes out there were way too much for what I needed and I also needed to get my feet wet in OOP programming for Javascript so this was a keen little exercise for me.

Then I went on to tackle the fact that Safari's form labels don't act like form labels in the other browsers – they don't bring focus to their associated form element when clicked. Seems like a minor issue, but when you really think about form usability it is nice to be able to click on the name of an element to select it and not always have to hit the element itself. This is particularly handy for radio buttons and checkboxes.

Read on to find out how I finally caught up to last year.

**Update:** Now that I go browsing through old code to reuse something I've found that my little piece of borrowed code is actually something that is less than what I've been using for some time, but had just forgotten about.

<!--more-->

## I feel so behind

So, its now 2006 and I have what I think is a firm grasp on AJAX (xmlHttpRequest). First made popular by a Google experiment and then taken to the extreme by the popular web crowd, Ajax has become a staple of web application functionality. You can't turn a corner on the internet anymore without hitting something Ajax. Well, you can, but chances are those pages suck. 😉

So, what brings Gippy into the modern world of application design? Well, I finally found a practical application for it in my daily work. I knew full well what it was capable of and also knew how easy it would be to just create an unnecesary monster with it, so I just watched and waited until I found a practical application. Well, I found one and decided that to further my JavaScript education that I should write my own class. This reasoning was two fold 1) I needed the class and really don't like using other people's code, 2) I really wanted to get my feet wet with OOP in JavaScript. Pretty much my entire PHP programming has gone OOP and I so love the benefits is gives. I quickly became lost in JavaScript's OOP model though. 

As it turns out JavaScript has more than one way to skin a cat – that means that there are at least 3 ways to define a class in JavaScript. I quickly became a confused puppy.

My first attempt at JS OOP was a miserable failure as I thought I could apply the same principals to JS as I did PHP – this was only half true as my first class had a myriad of problems, none more odd than my private variables becoming public and my public variables not being found at all. So very odd.

But after reading as much as I could I think I finally got my head around it. I'm not going to try and give a primer here as I don't think I'd do a very good job of explaining it. I'll just point to what I accomplished.

[Here is a page that shows the script in action](/stuff/oop_ajax/), very dull action, but that also shows the source in the page for easy viewing.

It is a simple class, it just handles the core of what AJAX is all about and has a few very rudimentary methods of returning the results of the query back into the code. While these work it is really meant to be extended with a subclass so that those methods can be redefined and customized. That and they use innerHTML which isn't really the bastion of good coding since it is still technically not official JavaScript.

This also marked my debut into a much more elaborate commenting scheme that is being driven by the Pear PHP project. Details can be found [here](http://pear.php.net/manual/en/standards.sample.php). It has certainly improved the consistency of my documentation, even if I'm not following the scheme to the letter.

## Safari: Like a red headed stepchild

Ok, not really.

But I did finally got fed up with Safari acting different than the rest of the browser crowd as I'm really engrossed in forms right now due to a large project that I'm cranking out. Making sure the forms acted properly across all browsers was a key point to this project so bringing Safari back into the room with the other major browsers was a personal vendetta of sorts. Yeah, I know, IE is the devil when it comes to non-conformance but this little issue was one that had to finally be addressed.

This would not be much of a challenge to someone with more JS experience but for me it was a nice exercise in scope and references. Getting functions assigned to many form elements and referring back to the correct elements was a step forward in how I think about Javascript. The script probably isn't perfect but I haven't noticed any performance penalties on using it so it can't be all bad.

[View a sample page here](/stuff/safari_forms/) and [view the Javascript here](/stuff/safari_forms/formScripts.js). I stole a method of object identification in there that I think was first used in Prototype.js (on a side note, I'd like to personally thank the jerk who named his class after a method of OOP programming. Now I need to make sure that someone is referring to using the Prototype class or building a class using prototyping). I think this little snippet came from there:

``` js
function $(objNm) {
    return document.getElementById(objNm);
}
```

It is basically a shortcut to getting an element by id so it is now possible to use $(&#8216;myObj') to access an object on the page.

**Update:** As it turns out, this little tidbit is something that I've been doing for some time, but at the time stole it from somebody else \*\*cough\*\* john \*\*cough\*\* but had forgotten about.

I've been using this for what seems like forever:

``` php
function getObj(id) {
    // older versions of IE will respond to this
    var isOldBrowser = document.all ? true : false;

    if(isOldBrowser) {
        // old, icky
        return document.all[id];
    } else {
        // DOM enabled, yummy
        return document.getElementById(id);
    }
}
```

So, yeah, I guess I didn't find anything groundbreaking, unless my failing memory qualifies.

## Ok, I'll shut up with my behind the times crap now

So, that's it. My foray into bringing my JavaScripting skills up to date with 2005 (arguably 2004). Hopefully this is comes in handy for someone out there.