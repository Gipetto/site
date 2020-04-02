---
id: 2048
title: New WP Salts command in the WordPress TextMate bundle
date: 2011-09-14T10:00:05+00:00
layout: post
guid: http://top-frog.com/?p=2048
permalink: /2011/09/14/new-wp-salts-command-in-the-wordpress-textmate-bundle/
categories:
  - TextMate
  - WordPress
  - 'Web Design & Development'
tags:
  - bundle
  - salt
  - secret
  - secret-key
  - textmate
  - wordpress
---
<img class="alignright" src="/assets/articles/TextMate-icon.png" alt="TextMate Icon" aria-hidden="true" /> I just merged a pull request from [Simon Wheatley](https://github.com/simonwheatley) in to the [WordPress TextMate Bundle](/projects/wordpress-textmate-bundle/) that adds the command `wpsalts` to generate the [Security Keys](http://codex.wordpress.org/Editing_wp-config.php#Security_Keys) for the WP Config file. The command uses the [WordPress.org secret-key Service](https://api.wordpress.org/secret-key/1.1/salt).

Very handy. 

Thanks Simon!