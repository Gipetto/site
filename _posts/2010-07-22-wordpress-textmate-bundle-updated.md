---
id: 1488
title: WordPress TextMate Bundle Updated
date: 2010-07-22T00:38:30+00:00
layout: post
guid: http://top-frog.com/?p=1488
permalink: /2010/07/22/wordpress-textmate-bundle-updated/
categories:
  - Plugins
  - TextMate
tags:
  - cache
  - cron
  - event
  - recurring
  - schedule
  - script
  - style
  - textmate
  - transient
  - wordpress
---
I just updated the [WordPress TexMate Bundle](/projects/wordpress-textmate-bundle/) with some new features. 

#### Cron/Scheduled Events

I've never really worked with the built in Cron in WordPress but have heard others talk about how much of a pain it is. After recently reading a [Sitepoint.com article on scheduling events](http://articles.sitepoint.com/article/wordpress-scheduling) I was able to get the jist of it. The WordPress Bundle now includes snippets for complete actions such as registering single and recurring events. I figure I had better get the snippets in there while it was fresh in my mind.

#### Transients

A little less fresh in my mind were Transients. After watching a presentation on caching at WordCamp Boulder by the [very likable (and, yes, smart) Sean O’Shaughnessy and Chris Scott from Voce Communications](http://vocecommunications.com/) I got pretty stoked about these functions. Like the `wp_cache&hellip;` shortcuts there are now shortcuts to the `transients` functions. For more information about the wonderful world of transients check out [WordPress Codex pages on the Transients API](http://codex.wordpress.org/Transients_API).

#### Scripts & Styles

Two new shortcuts for `wp_register_script` and `wp_register_style` were added. Though they're a couple lesser used functions, I feel they're a bit underused as well.

#### All done for now

So, while not a huge update it adds some obscure references that hopefully help some folks dive deeper in to developing for WordPress.