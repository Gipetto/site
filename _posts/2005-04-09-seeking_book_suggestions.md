---
id: 66
title: Seeking Book Suggestions
date: 2005-04-09T15:22:00+00:00
layout: post
guid: http://top-frog.com/?p=66
permalink: /2005/04/09/seeking_book_suggestions/
categories:
  - 'Web Design &amp; Development'
tags:
  - javascript
  - book
---
So it seems that I'm gonna have to learn some javascript for work. Our eCommerce package is a proprietary piece of shit that runs on MAS and Providex and is the slow and has a very odd construct in the way is processes information.

Take for example is method of repeating a table row based on a template. The template contains code like this (greatly simplified to show only one item):

``` html
<!-- product info repeats here -->
<tr>
   <td>
       ~~IWAA_UT_UDF_IAA~~
   </td>
</tr>
<!-- end product info repeat -->
```

So by initially reviewing the template you'd think that the entire contents of what is inbetween the comments would be evaluated to replace the specific information. But it does not. For some reason the table row has to be there for the loop to work. So I can't strip out the table and use CSS formatting in its place. The only way to get this info would be to grab it via javascript and reformat it. Simply the stupidest workaround I've ever seen (to date). It looks like I'm gonna have to do this with the header and footer as well. Or so I'm told. I've made other edits to the templates in the table structure that haven't broken the structure so I'm wondering if what I've been told is true or just the result of weary programmers not wanting to mess with the code too much. I'm gonna try and simply edit the looped code to see what happens. If it breaks is breaks, if not, I'm gonna be laughing up and down somebody's face.

Either way, I really should know more about javascript so if anyone can recommend a good book I'd appreciate it very much.