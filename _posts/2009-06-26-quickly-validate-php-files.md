---
id: 709
title: Quickly validate PHP files
date: 2009-06-26T15:13:54+00:00
layout: post
guid: http://top-frog.com/?p=709
permalink: /2009/06/26/quickly-validate-php-files/
categories:
  - Computers
  - PHP Scripting
tags:
  - bash
  - command line
  - files
  - php
  - validate
---
Ever needed to quickly scan a directory full of PHP files for syntax errors? You can do this quickly on a *nix command line with:

``` shell
find . -type f -name \*.php -exec php -l {} \;
```