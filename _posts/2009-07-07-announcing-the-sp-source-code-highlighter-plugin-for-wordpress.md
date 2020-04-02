---
id: 779
title: Announcing the SP Source Code Highlighter plugin for WordPress
date: 2009-07-07T00:55:04+00:00
layout: post
guid: http://top-frog.com/?p=779
permalink: /2009/07/07/announcing-the-sp-source-code-highlighter-plugin-for-wordpress/
categories:
  - TextMate
  - WordPress
  - 'Web Design & Development'
tags:
  - code
  - highlight
  - html
  - javascript
  - php
  - plugin
  - source
  - wordpress
---
Maybe you noticed already, maybe you didn't (I'll wager on the latter 😉 ) that recently this site got new source code highlighting in posts. Or, should I say, that it GOT source code highlighting in posts.

I had made a simple Script Source viewer a while back. Something simple and straight forward that I could use to display full source code files in an easy to read and copy format (since the source is an ordered list the line numbers don't copy). I was so happy with the way the source highlighting along with the line numbers turned out that I really wanted to put that in my posts. But I guess not wanted bad enough to do right away.

So, now I finally got around to putting this together for use inline in my posts and decided to package it together for public consumption. The highlighting is pretty durned nice and fully CSS configurable. It supports a decent number of languages and if it doesn't support your language of choice, chances are there's something in there that's close enough.

The only drawback, and this may be a show stopper for some folks on shared hosting, is that it has a dependency on the Pear Text_Highlighter package. Since this plugin was primarily for me and I have control over my servers this isn't a big deal here, but may keep some from being able to use it at all. If you like it enough then contact your host. You never know, they might be accommodating. There's more about this on the project page. It basically boils down to: if you don't know, it doesn't hurt to ask.

So, enough already, head on over to the [SP Source Code Highlighter Plugin's Project page](http://top-frog.com/projects/sp-highlight-source/) and see how it looks and works.