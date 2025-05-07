---
id: 177
title: Tasty VIM Morsel
date: 2006-09-26T10:27:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=177
permalink: /2006/09/26/tasty_vim_morsel/
categories:
  - Computers
tags:
  - command
  - insert
  - line
  - output
  - vim
---
I just learned a nice little bit on using VIM and feel the need to share.

When using vim you can insert the contents of command line output by using the `:r!` command.

For example:

``` viml
:r! ls /etc/httpd
```

would insert the directory list of the `/etc/httpd` directory.

``` viml
:r! cat file.txt
```

would insert the contents of `file.txt` and insert it into the current file.

``` viml
:r! man cd | col -b
```

would insert a clean verson of the MAN page for the `cd` command. `col -b` is needed to strip special line breaks that man pages contain.

``` viml
:r! php file.php
```

would insert the output of the PHP script into the current file.

I can probably stop providing examples now. Handy freakin' dandy! I dig it.
