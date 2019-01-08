---
id: 238
title: SU from within VIM
date: 2008-07-28T09:22:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=238
permalink: /2008/07/28/su_from_within_vim/
categories:
  - Computers
tags:
  - code
  - linux
  - su
  - vim
---
I can't even count how many times I've edited a read only file in VIM, not even noticing the warning that pops up telling me so. Its a royal pain to type in thing twice, especially config changes. After a little looking around I found a way around it. Its not perfect and its not really a solution, per se, its just a way to get around having to type things twice when you forget to sudo.

The if you don't have a `.vimrc` then create one. Add this line to it:

``` viml
cmap w!! %!sudo tee > /dev/null %
```

So, when you forget to sudo in and need to save that file this will get you fixed up. First, exit edit mode by pressing escape, then enter a colon to start the command mode, then enter:

``` viml
w!!
```

While I'm not 100% sure what is happening in the background I think what happens in that VIM's buffer gets overwritten with admin privileges, essentially sudoing the changes into the file. Pretty slick. Not a replacement for doing it right the first time, but it'll work in a pinch.

**Updated 2008-08-27**: I wrote it down wrong, which means it was transcribed here wrong… its right now. Not that anyone will notice.