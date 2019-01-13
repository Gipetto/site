---
id: 822
title: Excluding packages from MacPorts operations
date: 2009-07-14T07:59:33+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=822
permalink: /2009/07/14/excluding-packages-from-macports-operations/
categories:
  - Code
tags:
  - exclude
  - macports
---
As much as I'd like to jump whole hog on the PHP 5.3 bandwagon I just haven't had the time to read up on the compatibility issues not work out what I'd need to do to maintain a PHP 5.2 and a PHP 5.3 environment on my computer. For now I'll just be sticking with PHP 5.2.x.

This creates a problem, though, as MacPorts constantly lists my PHP 5.2 as outdated. 

While I don't want to upgrade to PHP 5.3 right away, I still want to have a quick and easy upgrade of everything else that I have installed. There's not any clear documentation about excluding ports from a port command, but there is a tasty morsel in the `port` man page.



> Logical operators &#8220;and&#8221;, &#8220;or&#8221;, &#8220;not&#8221;, &#8220;!&#8221;, &#8220;(&#8221; and &#8220;)&#8221; may be used to combine individual portnames, port glob patterns and/or pseudo-portnames to construct complex port expressions that expand to the set of matching ports. For example:
> 
> &nbsp;&nbsp;port upgrade installed and apache*
  
> &nbsp;&nbsp;port echo maintainer:jberry and uninstalled and \
  
> &nbsp;&nbsp;&nbsp;&nbsp;( category:java and not commons* )

That means I can do this to exclude the PHP 5.3 upgrade until I'm ready:

``` shell
sudo port upgrade outdated and not php*
```

A little less than optimal as I'd love to be able to modify a config file somewhere to effect this change on a global level but I'll take this until that functionality gets added or until someone points me to where I might find that special config setting.

I could probably do something similar to [my svn pre-/post-commit client side hooks](/2009/04/23/client-side-pre-and-post-svn-hooks-with-unix-aliases/) hack, but I get the feeling that I'd forget about this one if I did it and end up cursing my computer later when it won't install PHP 5.3 😉