---
id: 152
title: 'Well, that was easy…'
date: 2006-02-03T07:38:00+00:00
layout: post
guid: http://top-frog.com/?p=152
permalink: /2006/02/03/well_that_was_easy/
categories:
  - PHP Scripting
tags:
  - css
  - excel
  - header
  - html
  - php
  - row
  - table
---
For a while here at work I'd been struggling with the best way to deliver content to Excel users so they could further manipulate or repurpose the data. The best thing I'd found had been to deliver an Excel content header on a tab deliniated string of data from the database.

Well, in a stroke of "hey, idiot, why the hell didn't you think of that sooner" I think I've found the perfect solution: HTML.

Long story short: Excel can open HTML files and format the data. More importantly it can retain the proper, and complex, formatting from HTML tables. So rowspans, colspans, header rows, some CSS etc… all get translated from HTML.

So all I had to do was create a properly formatted HTML table of my data and deliver it to the browser with an Excel content header and Voila. Styled, formatted data sets delivered to happy little Excel users.

Who'da thunk it would be that easy?