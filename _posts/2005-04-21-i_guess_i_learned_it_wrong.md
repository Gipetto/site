---
id: 70
title: I guess I learned it wrong
date: 2005-04-21T22:38:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=70
permalink: /2005/04/21/i_guess_i_learned_it_wrong/
categories:
  - PHP Scripting
---
Globals.

When I first started learning PHP it was well after the push to ship PHP with register_globals off by default, so I never learned to use them. However, I also thought the `$GLOBALS` variable was off limits as well.

I was wrong.

<!--more-->

It seems that this wonderful little variable can do more to help with variable scope than I ever thought possible.

Consider this code.

``` php
$var = "global";
function edit($n) {
    $GLOBALS['var'] = $n . " edit";
}
edit($var);
echo($var);
```

This code returns `global edit` when run. The `$GLOBALS` array is only made up of variables defined and set by the script – it doesn't contain super globals like POST and GET vars and thus are safe from code contamination that might occur from someone trying to change variable content in your scripts.

Wow. I've got a whole new world set out in front of me now that I've learned references and that `$GLOBALS` are available.

Maybe I should be a little embarrassed that it took me this long to discover these two basic, basic gems of PHP but I'm not. For being self taught I'm not doing too bad.

Now, off to learn OOP.