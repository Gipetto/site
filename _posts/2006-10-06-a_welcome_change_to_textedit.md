---
id: 184
title: A Welcome Change to TextEdit
date: 2006-10-06T12:24:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=184
permalink: /2006/10/06/a_welcome_change_to_textedit/
categories:
  - Computers
tags:
  - "10.4"
  - Apple
  - html
  - list
  - nested
  - osx
  - rtf
  - textedit
---
As a you might know I'm a huge proponent of a simple utility called TextEdit on OS X for its ability to export good looking HTML. I use it almost exclusively to convert word files by first exporting to RTF and then opening the file with TextEdit.It must have happened with the 10.4.8 update – TextEdit now properly nests lists when exporting as HTML.

**Updated below**

<!--more-->

It wasn't a huge deal before since it was easily fixed, but TextEdit used to do nested lists like this:

``` html
<ul>
    <li>item</li>
    <li>item2</li>
    <ul>
        <li>item3</li>
        <li>item4</li>
    </ul>
    <li>item5</li>
</ul>
```

See how the nested list is not contained within a list item? On long and nasty lists it could be very time consuming to go back and clean all this up by hand. Now that has been fixed and we properly get this:

``` html
<ul>
    <li>item</li>
    <li>item2
        <ul>
            <li>item3</li>
            <li>item4</li>
        </ul>
    </li>
    <li>item5</li>
</ul>
```

The list is properly embedded in the list item.

Happy day.

**Update:** No sooner do I write this than do I convert another document and don't get the properly nested lists… I have to now figure out what the trigger was to get those properly nested lists.