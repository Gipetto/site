---
id: 845
title: WordPress Post Password Token plugin
date: 2009-09-08T08:50:16+00:00
layout: post
guid: http://top-frog.com/?p=845
permalink: /2009/09/08/wordpress-post-password-token-plugin/
categories:
  - Plugins
tags:
  - password
  - php
  - pluign
  - post
  - token
  - wordpress
---
[<img class="alignright" src="/assets/articles/ppt-thumb.png" alt=""/>](http://wordpress.org/extend/plugins/post-password-plugin/) This post is to introduce the WordPress Post Password plugin. This is a plugin designed to allow users to access password protected content without having to enter the password. This plugin was built based on an idea from, and in cooperation with, [Gordon Brander](http://gordonbrander.com).

The concept is simple: when a post is given a password the plugin will automatically generate a password token that when used in a URL will automatically log the user in to the post without them having to know or enter the password. So, in the event that you just want to keep the riff-raff out don't care about &#8220;ultimate&#8221; security this plugin can help you distribute an easy to use URL instead of a URL & Password. The tokens are built based on the post's password, so changing the post password will change the token. In the event that you need to reset all the tokens at once there's a central &#8220;salt&#8221; that can be updated to force all the tokens to update.

You can read more and download the plugin at the [Post Password Plugin's page on WordPress.org](http://wordpress.org/extend/plugins/post-password-plugin/).

This is version 1.0. We already have plans for version 1.5 😉