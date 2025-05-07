---
id: 961
title: Flickr Image URLs to BBCode in OS X 10.6 and Automator
date: 2009-09-12T21:42:58+00:00
layout: post.liquid
guid: http://top-frog.com/?p=961
permalink: /2009/09/12/flickr-image-urls-to-bbcode-in-os-x-10-6-and-automator/
categories:
  - Computers
tags:
  - automator
  - menu
  - os x
  - php
  - service
---
I guess its just kinda worked out that the forums that I participate in all deal with BBCode and their text formatting. S'okay – I've been doing one thing or another in BBCode since, well, BBCode came out. At one point I even wrote my own expanded parser. But the time involved in posting flickr images to these forums is ALMOST not worth the effort. The almost is 'cause I'm lazy. 

So what do lazy programmers do? They automate the task 😉

So here's a little Automator Setup for OS X 10.6 (aka: Snow Leopard) that'll add an item to the Services Menu so that all you have to do is highlight the HTML in Flickr to have it copied to the Clipboard.



The heart of Service is a little PHP that uses preg_replace to transform the HTML in to BBCode.

``` php
php -r 'echo preg_replace("/<a href=\"(.*?)\".*?><img src=\"(.*?)\".*?\/><\/a>/","[url=$1][img]$2[/img][/url]",fgets(STDIN));' $@;
```

Next step is to add this to Automator. When Automator is launched it asks what kind of Template to use. For this we want &#8220;Service&#8221;. Services are already set to receive selected text in any application so the next step is to add the two actions. First, move the &#8220;Run Shell Script&#8221; in to the workplace and add the above code. Next add the &#8220;Copy to Clipboard&#8221; action and you're done.

Save the action and it shows up in the Services Menu without restarting your applications. Below is the way it should look (plus a little extra command line goodness to pop a Growl notification when its done).

<div class="frame">
  <img src="/assets/articles/automator-flickr-2.png" alt="automator-flickr" title="automator-flickr" />
</div>

To use it, go to one of your Flickr images, click on &#8220;all sizes&#8221; and select the image you'd like to use. Highlight the HTML in Section 1 below the heading &#8220;To link to this photo on other websites you can either:&#8221; that appears under the photo. Go to the Services Menu, select your service, and then paste the result in to whatever forum post you're working on. 

Voila! 30 seconds of formatting time saved! 😉
