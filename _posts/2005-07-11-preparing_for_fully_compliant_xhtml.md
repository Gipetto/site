---
id: 106
title: Preparing for fully compliant XHTML
date: 2005-07-11T19:27:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=106
permalink: /2005/07/11/preparing_for_fully_compliant_xhtml/
categories:
  - 'Web Design &amp; Development'
tags:
  - css
  - html
  - javascript
  - table
  - utf-8
  - xhtml
  - xml
---
Well, I'm playing around with delivering actual xml content for xml aware browsers, or maybe I should say I'm playing around with delivering xml content to everybody but IE, and am realizing how much I don't know about xhtml. So much changes in document structure it will take a while to find the right balance of old and new and a little bit of browser sniffing for IE & older browsers to keep full compatability. 

I'm going to start playing with this site soon and trying to achieve that balance. It'll be a challenge since my forte is not front end display. In any event, it'll give me something to break this site with. In the mean time, here is what I've learned up to this point. This is in no way a complete tutorial or official writeup – I haven't even tried some of this yet. This is a note to myself in preparation for making the move. Hopefully this spurs some good commenting to make this a nice little primer on transitioning to a pure xhtml delivery.

<!--more-->

I'm sure I have some errors in here so please correct me where I'm wrong.

## Character encoding

`ISO-8859` characters can be a crap shoot as  and such will be rendered just as such – straight text. Only 5 elements are guaranteed to render correctly.

```
< > & " '
```

utf-8 should be used which gives you the freedom of using any character you'd like but will also recognize any numbered character reference.

## Doctypes

The doctype delcaration is only used for the validators! This actually turns out to be true to an extent with straight HTML since it can effect browser rendering but doesn't necissarily tell the browser which language you are using to code with. Confused? Good.

## Content Type

The content-type declaration isn't needed if the server properly sends the data as `application/xhtml+xml`. This can be accomplished by sending the proper http header. The easiest way I've found to do it for now is through php. Otherwise it is dealing with some pretty complicated browser sniffing with mod_rewrite. A simple declaration as the very first element on your page will take care of it. 

``` php
<?php 
header('Content-Type: application/xhtml+xml; charset=iso-8859-1');
```

You'll want to incorporate this with some browser sniffing so you can deliver IE and some older browsers with a `text/html` compliant header so that they can still understand your data.

For example:

``` php
function sniffIE() {
    if(eregi("MSIE",$_SERVER['HTTP_USER_AGENT']))
        return true;
    else 
        return false;
    }
}
```
## Correct opening declarations

The html opener should include an xml delcaration and all stylesheet declarations should be made xml style right before said html opener. Style declarations in the head are mostly (if not totally) ignored unless you're doing an @import.

``` html
<?xml-stylesheet href="stylesheet1.css" type="text/css"?>
<html xmlns="http://www.w3.org/1999/xhtml" 
        xml:lang="en" lang="en">
```

and / or

``` html
<style type="text/css">
    @import "stylesheet2.css";
</style>
```

Now, if you're using PHP pages then the XML declarations will play havoc with your php scripting so you have to use some creative output to get them to the browser and ignored by PHP.

``` php
<?php 
header('Content-Type: application/xhtml+xml; charset=iso-8859-1'); 
echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n");
echo("<?xml-stylesheet href=\"stylesheet.css\" type=\"text/css\"?>\n");
```

## Comments

html/sgml comments are honored for EVERYTHING. Must use the CDATA hack to get Javascript to work correctly.

``` html
<script language="JavaScript" type="text/javascript">
<!--//--><![CDATA[ 
... 
<!--//-->]]>
</script>
```

or, simpler

``` html
<script language="JavaScript" type="text/javascript">
// <![CDATA[
...
// ]]>
</script>
```

## JavaScript

`document.write` does not work in xml – must use `document.createElementNS()` to properly write out with JavaScript. Since I don't play much with JavaScript it will be a little while before I get far enough to test this for sure.

## Tables

Another caveat that I found that I've never even used before. A table's tbody will not be inferred if it is missing in the markup. If you don't include it, it simply does not exist. This can wreak havok with CSS and JavaScript if not taken into consideration. (Now I have to go and play around with tbody because it looks like an interesting tag when tables are called for).

## And that's just the head of the document…

Documents must be well formed xml – xhtml compliance doesn't matter. A well formed xml structure must be adheared to or else the document rendering will be aborted and an error displayed. XHTML is allowed to be delivered as text/html under the W3C specs but when done so it is interpreted as straight html – no xhtml considerations are taken except for some of the minor differences in markup that xhtml requires. This can hide some mistakes in what should be an xml compliant markup that will actually fail when delivered correctly.

That is all for now. I'll do some more research and then start updating soon. If you have anything to add please comment on it and I'll edit the article as needed. I'm planning on keeping this as an overall reference until I can do a writeup on my conversion to true xhtml. I've got some reading to do on using utf-8 as well so that will be added soon too.