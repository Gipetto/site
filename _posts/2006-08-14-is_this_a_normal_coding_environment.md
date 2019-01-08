---
id: 172
title: Is this a normal coding enviroment?
date: 2006-08-14T20:55:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=172
permalink: /2006/08/14/is_this_a_normal_coding_environment/
categories:
  - PHP Scripting
tags:
  - aquadatastudio
  - cocoamysql
  - code
  - cvs
  - docblock
  - editor
  - html
  - javascript
  - mysql
  - php
  - skedit
  - smarty
  - sql
  - studio
  - subethaedit
  - svn
  - textedit
  - textmate
  - textwrangler
  - tidy
  - zend
---
## Or: Editors, Editors Everywhere. Go Nuts

I know I've done an "Editor Roundup" before, but:

Doing work in a variety of languages has had me jumping editors and IDEs looking for the single perfect editor for handling PHP, HTML, CSS, JavaScript, SQL and the occasional Bash script. I recently gave up and just settled on having preferred editors for particular languages. My reasons may be petty in some cases, (ie: purely cosmetic), but in the end it seems to all boil down to personal preference. If you're interested in an outline of how I've settled in then by all means read on.

I think I may have my list of editors down to 5: Zend Studio, skEdit, SubEthaEdit, TextEdit, CocoaMySQL, Aqua Data Studio and Textwrangler.

<!--more-->

## Zend Studio: PHP

I was really hoping that Zend Studio was going to end up being my all purpose text editor but it leaves me wanting in HTML and Javascript editing. While it is a fantastic IDE and overall good for managing an entire site's worth of files I don't like it for much outside of PHP and light SQL development. Its handling of function completion, integration with the docBlock coding standard, the ability to query SQL servers and code hinting from both the PHP manual and the afore mentioned docBlocks make it a fantastic environment for coding PHP applications.

What it lacks is any kind of reasoning for coding outside of PHP & SQL. ZS can routinely get confused with coding Javascript and its lack of configurability for the little things in HTML is a bit frustrating. I wish it could handle docBlocks in other languages besides PHP since it is an efficient way of commenting scripts and is very useful in Javascript.

Built in support for CVS and SVN are just icing on the cake. I don't use them properly yet but with my current development I'm soon going to need it.

## skEdit: HTML, Javascript, CSS

skEdit is my editor for HTML, Javascript and CSS. It just works very well and its syntax coloring and auto tag closing is much better suited to HTML than for PHP. I don't think it quite knows what to do with SQL syntax. Snippets are also the best thing since sliced break and make formatting plain text into HTML a snap. HTML Tidy integration is nice as well for cleaning any MS infected files.

The site manager leaves a little to be desired but overall it offers nice concise access to a site's files and its ability to do FTP, sFTP and WebDAV without leaving the program is a huge bonus. I'm really starting to like WebDAV.

My main gripe with skEdit (aside from stability) is that it uses a non-standard implementation of RegEx search and replace. The replacement string is included in parentheses instead of preceded by a dollar sign (Zend Studio, TextMate) or backslash (TextWrangler, SubEthaEdit). It trips me up every time… it really is the odd man out on that one.

## SubEthaEdit: Smarty Templates

I recently started using Smarty as my templating engine but was disappointed in the lack of syntax coloring support for it in major coding applications. I was finally pointed to SubEthaEdit as having support for it and found that it is decent. I also tried Textmate but found its syntax coloring was either lacking or needed way too much tweaking to even get to work. On top of that Textmate has always just felt weird to me as well has having a few issues loading projects over a network.

## TextEdit: Word, RTF

As I previously wrote about [TextEdit's HTML exporting capabilites](/2005/12/07/html_formatting_with_textedit) this can be short: Word => RTF=>TextEdit => XHTML. I might do a post in the future about the options of getting text out of Word and into usable HTML – there's more than just TextEdit working for us here. Now, if TextEdit just had RegEx it would be about as nice an RTF editor as I could ask for, though with [TextExtras](http://www.lorax.com/FreeStuff/TextExtras.html) it comes very close – I've still only scratched the surface of what TextExtras can add to a "normal" application.

## CocoaMySQL: SQL

For straight content management and database/table creation with MySQL I've found CocoaMySQL just about perfect to the task. Recent builds added proper support for database types and encoding types so it is now the default MySQL management program. PHPMyAdmin still has its place but why deal with all that refreshing when you don't have to?

## Aqua Data Studio

Though its a bit sluggish and a little overbearing on first launch Aqua Data Studio is a stellar application for managing multiple database servers. Though it isn't as easy to just edit the content of a table as it is in CocoaMySQL, ADS has all the lower level tools needed to completely administer your database. On top of that it has a visual query editor that makes the building of complex SQL joins a snap. I thoroughly appreciate that because SQL joins are something that I have yet to be able to really wrap my head around and this allows me to get 1 query in place of 3 without asking for help or wasting 2 hours getting it just right. Using the query builder has actually sped up a few pages…

## TextWrangler

For all other formats including Bash scripts I like TextWrangler. All in all it can open damn near anything and not screw it up. TextWrangler, and its predecessor, BBEditLite, have saved many an EPS file from email corruption. A very nice tool to have in the box.

## Well?

So, that's it. Just for coding and text processing I have a 7 application arsenal.