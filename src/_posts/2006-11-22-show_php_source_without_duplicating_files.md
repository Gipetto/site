---
id: 196
title: Show PHP source without duplicating files
date: 2006-11-22T15:50:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=196
permalink: /2006/11/22/show_php_source_without_duplicating_files/
categories:
  - PHP Scripting
tags:
  - htaccess
  - mod_rewrite
  - php
  - php-source
  - phps
  - source
  - view
---
Every once in a while I want to show a php script's source code. I would always have a `.php` file to show an active file in use and a companion `.phps` file (php-source) to show the source. With a little `mod_rewrite` and php this can be done with just the one active file, and two supporting files that never change.



The original setup was just to use mod_rewrite to map any `.phps` request that didn't find a real file to a `.php` variant, if it existed, and remap the `.php` file's mime type to that of a `.phps` file. However, that didn't work for me. I think php might have been grabbing and processing the file before it could be remapped and delivered.

The trick was to route the request to another file that took the requested file as a passed variable and then have it check for the file and show it. Here's how it works:

#### The .htaccess file

This the core to making the system work. It grabs any request for `file.phps` where `file.phps` does not exist and routes it to `source.php?f=file.php`.

``` apacheconf
OptionsFollowSymLinks
RewriteEngineon

#donotrunonrealfiles
RewriteCond%{REQUEST_FILENAME}!-f
RewriteCond%{REQUEST_FILENAME}!-d

#mapphpstophp
RewriteRule^(.+.php)s$source.php?f=$1
```

#### The PHP file

``` php
<?php
	/**
	 * PHPS source file viewer
	 *
	 * @author: Shawn Parker, http://www.top-frog.com
	 * 			http://www.top-frog.com/archives/2006/11/22/show_php_source_without_duplicating_files
	 *			This file has been modified slightly since the article was written
	 *
	 * @requires: http://pear.php.net/package/Text_Highlighter/docs
	 *
	 * @example: put this file and an htaccess file with the information outlined below 
	 * in a dedicated directory. Add in any other files that you'd like to view the 
	 * source for and call them with an extra s in the name. So, for example myscript.php 
	 * can be viewed at myscript.phps
	 *
	 * .htaccess requirement
	 *
	 * include the following items in the .htaccess file in
	 * the directory you'd like to use

		Options FollowSymLinks

		RewriteEngine on
		RewriteRule (.*) source.php

	*
	*/

	$types = array(
		'js' => 'JAVASCRIPT',
		'php' => 'PHP',
		'phps' => 'PHP',
		'css' => 'CSS',
		'xml' => 'XML',
		'sql' => 'SQL',
		'py' => 'PYTHON',
		'htm' => 'HTML',
		'html' => 'HTML',
		'shtml' => 'HTML',
		'rb' => 'RUBY',
		'pl' => 'PERL',
		'sh' => 'SQL' // not a great solution, but it looks the best
	);

	$filename = str_replace(
		'phps','php',
		array_pop(explode('/',$_SERVER['REQUEST_URI']))
	);
	$file = dirname(realpath(__FILE__)).
		($filename != 'source.php' ? '/files/' : '/').$filename;
	
	if(is_file($file)) {
		require_once('Text/Highlighter.php');
		$th =& Text_Highlighter::factory(
			$types[pathinfo($file,PATHINFO_EXTENSION)],
			array('numbers' => HL_NUMBERS_LI)
		);
		$src = $th->highlight(file_get_contents($file));
	}
	else {
		$src = <<<FFF <p>I could not find <i>{$file}</i> in the 
allowed directory structure. Please check your request 
and try again. If you followed a link here then please 
contact that system administrator and inform him/her 
of the bad link.</p>
FFF;
		$file = 'File not found';
	}

?><!DOCTYPE html>
<html lang="en-US">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<title>Source for: <?php echo $file; ?></title>
	<link rel="stylesheet" type="text/css" href="highlight.css" />
	<style type="text/css" media="all">
		body{margin:30px;}
		h1,#footer{background:#ddd;}
		h1{font-family:arial,helvetica,sans-serif;font-size:18px;border-bottom:1px solid gray;padding:10px;}
		#footer{padding:5px;border-top:1px solid gray;font-size:11px;margin-top:15px;}
		#footer p{margin:0;padding:0;}
		ol.hl-main{background:#efefef;}
		ol.hl-main li{white-space:pre;font:10px/1.3 sans-serif;background:white;margin-bottom:1px;padding:1px;}
		ol.hl-main li span{font:12px/1.3 courier,"courier new",monospaced;}
	</style>
</head>
<body>
	<h1>Source code for <?php echo $file;  ?></h1>
	<div id="source">
<?php echo $src ?>
	</div>
	<div id="footer">
		<p>Page delivered by: <a href="source.phps">PHPS source file viewer</a>.</p>
	</div>
</body>
</html>
```

What it does it take the passed variable via `$_GET` and if its a file it uses the built in php function `highlight_file` to do the source coloring. The source is then dropped into a mildly formatted html template.

#### Security Concerns

There are many things to consider with this script. For one, I don't scrub the `$_GET` var.

My best assertion of keeping it secure is to keep this limited to the directory that you're showing files from. If you do enough validation and checking you can have it go directly to source files in your site, but going this route requires you to be very sure you do the proper exclusions so that people can't grab any config or password files.

Right now this file will show itself – this is a security concern if you do allow it to dig through your actual source files since it then reveals all or part of your source structure.

Since I would mainly use this for showing off conceptual files I have no problem with it being a "sandbox" and limit its access to the system.

#### The End

There it is, nothing revolutionary, very straight forward, and very useful if you like to share code ideas with others. The script is terribly generic and will work with a base install of PHP4 or PHP5. As usual, if you make this better or find any bugs, please let me know.
