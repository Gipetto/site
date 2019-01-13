---
id: 249
title: Javascript table row highlighting. Then and Now.
date: 2009-02-12T07:19:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=249
permalink: /2009/02/12/javascript_table_row_highlighting-then_and_now/
categories:
  - 'Web Design &amp; Development'
tags:
  - code
  - highlight
  - javascript
  - jquery
  - prototype
  - row
  - table
---
Just so that you're sufficiently warned: This post offers no practical information. Its a "remember when? didn't that suck?" post.

I think it was 2004. Prototype.js was new and was rocking my world. But it was still just a few convenience features put on top of JavaScript. I needed to stripe table rows dynamically and ended up with 2 functions and ~25 lines of code. My, how things have changed.



So, with a litle help from Prototype.js I had this:

``` js
// js function to stripe the rows of a table
function stripeTable() {
    var stripeMe = document.getElementsByClassName('stripeme');
    if (!stripeMe) { return; }
	    for(var s = 0; s < stripeMe.length; s++) {
        var teeBodies = stripeMe[s].getElementsByTagName('tbody');
        // loop through tbody elements
        for (var c = 0; c < teeBodies.length; c++) {
            //get TRs in tbody
            var teeRs = teeBodies[c].getElementsByTagName('tr');
            // loop through rows and assign even numbered, non styled rows a new class
            for (var i = 0; i < teeRs.length; i++) {
                if(i % 2 == true) {
                    if(isStyled(teeRs<i>) == false) { teeRs<i>.className = 'stripeme_two'; }
                    else if(isStyled(teeRs<i>) !== false) { teeRs<i>.className = teeRs<i>.className + ' stripeme_two'; }
                }
            }
        }
    }
}

// gleened from ALA, see if an object has styling
function isStyled(obj) {
    var result = false;
    if (obj.getAttributeNode('class') != null) { result = obj.getAttributeNode('class').value; }
    return result;
}
Event.observe(window, 'load', stripeTable,false);
```

Damn n00b! Look at all that code. Now lets step to 2 months ago. Striping tables with jQuery turns in to:

``` js
jQuery('.stripe_me tbody tr:odd').addClass('stripe');
```

With a few more chained items I could add in JS row rollover highlighting (because IE hasn't implemented the CSS to do it yet, that's how they do!). I'm so digging other people doing the nitty gritty.

I'd like to welcome myself to 2008. 😉