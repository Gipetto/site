---
id: 1319
title: New Internationalization feature in the WordPress TextMate Bundle
date: 2010-05-21T23:46:18+00:00
layout: post
guid: http://top-frog.com/?p=1319
permalink: /2010/05/21/new-internationalization-feature-in-the-wordpress-textmate-bundle/
categories:
  - Plugins
  - 'Web Design &amp; Development'
tags:
  - bundle
  - function
  - international
  - internationalization
  - snippet
  - textmate
  - tmbundle
  - wordpress
---
The [WordPress TextMate Bundle](/projects/wordpress-textmate-bundle/) was just updated to include support for internationalizing strings. Its not terribly obvious how the feature can be used, so I thought that I'd do a quick outline of its features.

The goal of adding this support was to make it as seamless as possible to integrate with your coding style. The command will properly adjust itself for whether your selected text is within a single or double quoted string, it is a quoted string itself, or if it is in a block of HTML instead of PHP.

The command is found under the &ldquo;Plugin API&rdquo; section of the plugins menu or by using the `command-shift-i` keyboard shortcut.



#### Inside Single and Double Quoted Strings

With the sample code:

``` php
<?php
$string1 = 'one two three four';
$string2 = "one two three four";
```

Selecting text `two three` WITHIN the quoted strings will return:

``` php
<?php
$string = 'one ' . __('two three', 'domain') . ' four';
$string2 = "one " . __("two three", 'domain') . " four";
```

#### Single and Double Quoted Strings

Again, with the same sample code:

``` php
<?php
$string1 = 'one two three four';
$string2 = "one two three four";
```

Selecting the entire quoted string, including the quotes, will return:

``` php
<?php
$string = __('one two three four', 'domain');
$string2 = __("one two three four", 'domain');
```

#### Inside an HTML scope

Here our code will return a bit different. With this as our example:

``` html
<p>one two three four</p>
```

Selecting the string `one two three four` will return:

``` html
<p><?php _e('one two three four', 'domain'); ?></p>
```

Here it uses the `_e()` (echoes the result) function instead of the `__()` (returns the result) function.

#### And there it is…

So, overall not complicated but super duper handy. I can't believe that I didn't think about this earlier. It was just suggested by [Mr. Gordon Brander](http://gordonbrander.com) earlier today and I was so giddy to get it implemented here I am on a Friday night getting it worked in!