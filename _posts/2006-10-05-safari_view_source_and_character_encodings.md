---
id: 181
title: Safari, View Source and Character Encodings
date: 2006-10-05T13:31:00+00:00
layout: post
guid: http://top-frog.com/?p=181
permalink: /2006/10/05/safari_view_source_and_character_encodings/
categories:
  - 'Web Design &amp; Development'
tags:
  - browser
  - character
  - encoding
  - html
  - redner
  - safari
  - source
  - w3c
---

<div class="alert info">
<b>Update:</b> With modern browsers this issue appears to be long gone. Browsers are now smarter about how they interpret the source and are more forgiving about what they will and won't automatically correct.
</div>

I just hit an interesting snafu with Apple's Safari browser. While correctly rendering special characters from a page that lacked a doctype and character encoding meta tag, I viewed the page's source and noticed that Safari wasn't rendering any special characters that it was rendering in the actual page view.

With the help of the W3C validator I was able to figure out what character encoding the page was in fact using, windows-1252. That's not really any obscure. So I wonder why Safari was able to correctly decipher the page in HTML view but couldn't apply the same logic the the source view.

#### Update and Addition

I've created a couple of pages to help illustrate my point. A [valid page](/stuff/char-encoding/valid-1252.html) and an [invalid page](/stuff/char-encoding/valid-1252.html). For reference here is a [valid utf-8 page](/stuff/char-encoding/valid.html) for comparison. It seems that Safari has issues showing windows-1252 characters in source view in general.

So I guess its rather unfortunate that wether given the correct character encoding or not that Safari won't show windows-1252 special characters at all in source view.