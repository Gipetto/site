---
id: 144
title: HTML Formatting with TextEdit
date: 2005-12-07T23:46:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=144
permalink: /2005/12/07/html_formatting_with_textedit/
categories:
  - 'Web Design &amp; Development'
tags:
  - css
  - encoding
  - format
  - html
  - osx
  - preferences
  - strict
  - text
  - textedit
  - xhtml
---
I imagine that I'm not alone in my job duties of having to format long passages of text into html for inclusion in a web site. A lot of time can be wasted hand formatting lots of text with tables and lists. I was pretty surprised when I found that TextEdit in OS X 10.4 Tiger could save XTHML Strict pages with ISO-8859-1 or UTF character encodings and with embedded CSS. I stumbled on this ability in TextEdit while searching for an easy way of converting to numbered html entities instead of using named html entities (For what its worth, XML files don't like named entities outside of the standard 5).

Hopefully I'm not going into something that the rest of you have found and that is painfully obvious by writing this.

<!--more-->

It just takes a quick trip into the preferences to set up the correct settings for your environment (as illustrated below). Set your HTML output type, character encoding and type of CSS styling, open your document and save as an HTML file. 

(story continues after image)

![image](https://top-frog.com/images/articles/text-edit.gif)

The file is constructed complete with a valid (X)HTML header. The only real drawback is that you'll get **<b>** and _<i>_ tags instead of **<strong>** and _<em>_ and there is no way that I know of to change it. Another drawback, one that I won't run into nearly as much is the use of align attributes for table cells. Since I don't use tables much it won't be too much of an issue. 

I've been using this at work for a little while to format press releases for upload. Since I'm currently putting HTML into the database for press releases this works out perfectly (I've thought about implementing a bb-code style setup so other, non-experienced, users can upload press releases but that may wait for a while since this is saving so much time.

Now, I believe that this functionality is provided by the command line utility textutil so the next step could be to set up an automated system for batch processing files. Who knows… maybe I'll get the time to play with that.