---
id: 2059
title: A few PHP Dev Helper functions
date: 2011-09-27T00:51:47+00:00
layout: post.liquid
guid: http://top-frog.com/?p=2059
permalink: /2011/09/27/a-few-php-dev-helper-functions/
categories:
  - 'Web Design & Development'
tags:
  - commit
  - debug
  - error_log
  - export
  - function
  - helper
  - method
  - output
  - php
  - print_r
  - var_dump
---

<div class="alert warning">
<p><b>Don’t do this</b>: There are much better debugging and introspection tools out there. Use this as a good example of what not to do.</p>
</div>

I’ve come to be pretty reliant on a few little dev helper functions that I’ve written that help introspect data in a couple of different output methods. A lot of development, especially development with unfamiliar systems, involves looking at objects and their contents. 

These helpers are designed to help give consistently formatted output no matter where they’re used. They output specific styling inline to override the current site’s style sheets and output readable, monospace formatted code in most scenarios.

The `pp()` & `dp()` functions output to screen and the `ep()` function outputs to the error log.

``` php
<?php
/**
 * A few helper functions for debugging PHP
 * See: http://top-frog.com/2011/09/27/a-few-php-dev-helper-functions/ for info
 */
$__style = 'white-space: pre; text-align: left; '.
  'font: normal normal 11px/1.4 menlo, monaco, monospaced; '.
  'background: white; color: black; padding: 5px; '.
  'letter-spacing: normal; word-spacing: normal';
  
function pp() {
  global $__style;
  $msg = __v_build_message(func_get_args());
  echo '<pre style="'.$__style.'">'.htmlspecialchars($msg).'</pre>';
}

function dp() {
  global $__style;
  $msg = __v_build_message(func_get_args(), 'var_dump');
  echo '<pre style="'.$__style.'">'.htmlspecialchars($msg).'</pre>';
}

function ep() {
  $msg = __v_build_message(func_get_args());
  $msg_array = explode("\n", $msg);
  foreach ($msg_array as $line) {
    error_log('**: '.str_replace("\t", '  ', $line));
  }
}

function __v_build_message($vars, $func = 'print_r', $sep = ', ') {
  $msgs = array();
  if (!empty($vars)) {
    foreach ($vars as $var) {
      if (is_bool($var)) {
        $msgs[] = ($var ? 'true' : 'false');
      } elseif (is_scalar($var)) {
        $msgs[] = $var;
      } else {
        switch ($func) {
          case 'print_r':
          case 'var_export':
            $msgs[] = $func($var, true);
            break;
          case 'var_dump':
            ob_start();
            var_dump($var);
            $msgs[] = ob_get_clean();
            break;
        }
      }
    }
  }
  
  return implode($sep, $msgs);
}
```

#### Install

Copy the code above. Paste the contents in to a file that is accessible to your web-server software. Next, edit your `php.ini` file and edit the line with the `auto_prepend_file` setting with the full path to your helper file. Now restart apache to reload the `php.ini`.

#### Usage

All methods will output simple scalar values in their normal format and will translate boolean values to their string values instead of their numerical values. Object and arrays are then run through either `print_r()` or `var_dump()` depending upon which method you use.

In general `pp()` will give you the most readable output as it uses `print_r()` to output. But one drawback of `print_r()` is that it doesn't tell you what type the variable is. This can be a drawback if you're working specifically against boolean or null types. In that case you can use the `dp()` method which uses `var_dump()` to output. `var_dump()`'s output is less easy to read, but it does output the variable types which is very handy.

The `ep()` method outputs to the PHP error log. Handy for inspecting data in ajax or api calls or when outputting data is either inconvenient or hard to access.

All functions can be overloaded to take as many arguments as required. Each parameter is parsed separately and output comma separated.

#### Caveat

_There's only one:_ make sure that you don’t commit code that contains these function calls – others likely won’t have the same helper methods and your production server most assuredly doesn't. There’s nothing like committing these function calls and not realizing it until someone asks you why `dp() is undefined`. I’m actually pretty close to putting pre-commit hooks in to my version control repositories that reject any commit that has these methods in it. Its very easy to forget to strip them out first.

So, there it is. Nothing special, but I find these lil’ guys super handy. I hope you do too.

<div class="quicknav">
  
**Update 2012-02-10:** Updated the `ep()` function to output each line of a multi-line log message to its own line.</b>
  
**Update 2012-05-27:** added `htmlspecialchars` to output for `ep()` and `dp()` functions to fix issue where html would render instead of be shown in its helpful, readable source.

</div>
