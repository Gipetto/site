---
id: 169
title: Javascript, IE and Generating Tables
date: 2006-07-09T22:31:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=169
permalink: /2006/07/09/javascript_ie_and_generating_tables/
categories:
  - 'Web Design &amp; Development'
tags:
  - dom
  - explorer
  - html
  - internet
  - javascript
  - table
  - tbody
---
It seems that when generating tables in JavaScript IE requires that you generate a tBody with that table or else nothing at all shows up. See, when loading a page browsers will generate a tBody automatically and slip it into the dom. That's why even when you don't have one in your page you still have to dig through them when traversing the DOM.

The only catch is that other browsers do this for generated tables as well. IE doesn't like to do it on the fly, hence, a generated table without a tBody is a no show.

I guess I must have skimmed over one or two things while learning Javascript. I have a bad habit of stopping reading when I "feel" like I can do what I'm setting out to do at that moment. This time it bit me in the ass for a few hours.

So, remember kids, when generating tables always generate a tbody…