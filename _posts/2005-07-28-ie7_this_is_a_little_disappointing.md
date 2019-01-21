---
id: 114
title: 'IE 7: this is a little disappointing'
date: 2005-07-28T22:24:00+00:00
layout: post
guid: http://top-frog.com/?p=114
permalink: /2005/07/28/ie7_this_is_a_little_disappointing/
categories:
  - 'Web Design &amp; Development'
tags:
  - beta
  - browser
  - bugs
  - css
  - html
  - ie7
  - interface
  - internet explorer
  - microsoft
  - phishing
  - png transparency
  - positioning
  - rendering
  - rss
  - tabbed browsing
  - tabs
  - update
  - user_agent
---
The Internet Explorer 7 seems to be a basic functionality release. All the talk on the IE Blog about standards compatability didn't seem to leak its way into this release.

This version is actually seems worse than IE 6 at page rendering and compatability. The text to follow is a highly biased review (hey, I'm a Mac bigot after all) as I sit and play with a fresh install of the beta.

I apologize now to anyone who gets an RSS update each time I edit this. I'm going to update this article as I discover more and find more around teh intarweb.



#### Page Rendering

[The complex spiral page](http://meyerweb.com/eric/css/edge/complexspiral/demo.html) over at Eric Meyer's site gets completely mutilated – but this is nothing new to IE users. Compare that link in your standards compliant web browser to [this screenshot](/assets/articles/spiral.png). 

I tested a list of knows bugs over at positioniseverything.net and here is what I got:

  * [The peekaboo bug seems to be fixed](http://www.positioniseverything.net/explorer/peekaboo.html). 
  * [The disappearing list background bug persists](http://www.positioniseverything.net/explorer/ie-listbug.html). 
  * [The guillotine bug is fixed](http://www.positioniseverything.net/explorer/guillotine.html). 
  * [The unscrollable content bug persists](http://www.positioniseverything.net/explorer/unscrollable.html). 
  * [The duplicate characters bug persists](http://www.positioniseverything.net/explorer/dup-characters.html). 
  * [The double floated margin bug persists](http://www.positioniseverything.net/explorer/doubled-margin.html). 
  * [The escaping float bug persists](http://www.positioniseverything.net/explorer/escape-floats.html). 
  * There's a definite pattern emerging here, so I'm gonna stop checking now… if there's a specific bug you'd like checked just ask in the comments. 

Basically – the rendering engine doesn't look like it has received any attention towards the upgrade of CSS compatability and a lot of bugs are still unaddressed at this time and I've noticed a few little things with positioning that have popped up in this new release. I sincerely hope that Microsoft takes the time to address CSS2 as a legitimate standard despite their opinion that it is a flawed standard. 

Yes, I keep telling myself that this is a beta but the lack of attention towards killing these bugs and implementing more of the CSS specification has me a bit worried.

Though it has issues, at least it is fast. I'm posting this over an RDP connection to a 300mhz laptop and it is surprisingly responsive.

#### Javascript

It does seem to improve some Javascript support. A script I was having issues with before that involved fading alpha seems to work now. So there is one upside.

[John](http://blog.pennypacker.net) will be pleased to know that his new window link javascript works in the new version – though all the little images do have link borders on them the functionality of the Javascript is there. ***Correction:** The link icons show up but the links do not open in a new window/tab.

#### Phishing Filter

An interesting security add on is the Microsoft Phishing Filter which is aimed at trying to determine the authenticity of the site you are visiting. I haven't tried it out yet as I wanted to get into testing the standards compliancy of this new beta.

***Update:** After reading around a bit I found out that this feature compares the link you click to a list of links at Microsoft. The list is hosted at Microsoft so there is an extra call before the page loads that could slow down the browser response time. This feature also seems like it could be abused by Microsoft to gather browsing habits and to potentially track down cracks and warez sites.

#### The Interface

The interface has undergone a significant transformation as well. I read a thread over at the MacAddict forums that, based on really bad images from a conference, critiziced IE7 for looking like Safari. Those people were smoking crack. IE7 moves the menus underneath the tab bar, removes the refresh button, and adds a searchbar (which asks you if you want to turn on autocomplete when you first use it). This new interface is definitely a slap in the face of any existing UI convention. Not only general UI convention but even those of Microsoft itself. I wonder if this is going to be a trend in Redmond. If it is I will stand up and protest loudly – granted it'll fall on deaf ears but at least my piece will be said.

***Update:** The toolbars can be rearranged but they cannot be put above the tabs.

#### Alpha Transparency Support

We finally get native PNG Alpha Transparency support in this version but, at least on my machine, it comes at the cost of application performance. Scrolling speed declined significanlty when alpha transparency is being rendered.

#### Built in RSS Reader

Well, its there. My first attempt to load a feed resulted in text so small it was unreadable. But it loaded the feed quickly. However once I realized that the default text size was set to `smallest` I was able to reset that and read the page. I have to say that the RSS reader is fast and smooth. The scrolling is actually better in this than in Safari (one of my beefs with Safari's RSS reader is that scrolling is sporadic when using two fingered scrolling on the powerbook) and it seems to handle inline images better than Safari as well.

It does lack some of the nicities that Safari has for controlling preview length, sorting, and feed aggregation. The reader also has no support for Atom feeds which is not really surprising considering Microsoft's new RSS Everywhere initiative in Longhorn.

#### XML Content

Despite the addition of the built in RSS reader IE will still prompt to download XML content. Browser detection for proper content delivery is a known issue with the beta at this time and, according to Microsoft, it is a problem with the detection code on the sites:

> “At present, IE7 has a problem rendering some Web pages. According to Microsoft, this is caused by the sites, which need to update their detection code for IE7.”

via [molly.com](http://www.molly.com/2005/07/28/thats-why-its-called-beta/)

IE7 Identifies itself in the `HTTP_USER_AGENT` with

```
Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322)
```

#### Unicode

The unicode support, though it may be because it is running on XP and not Vista, is severely lacking. When checking out [Mezzoblue's unicode character article](http://mezzoblue.com/archives/2005/07/25/glyphs/) IE7 was only able to render 5 out of the 34 characters.

#### Pop-up Blocking

The built in pop-up blocker is rather nice. It is configurable to add exempt sites and to set levels of acceptible pop ups.

#### Tabbed Browsing

The tabs, while ugly, are functional. Implementation is a little odd in that to the right of the tabs is a half-tab that acts as a new tab button. The tabs are disconnected from the content that they display by the menu bar – an odd choice on Microsoft's end since this disassociates the displayed content from its identifier in the tab bar. Not very friendly if you ask me. 

Control-clicking a link will open it in a new tab. By default new tabs are not selected when spawned by control-clicking but there is a preference setting to adjust this as well as a preference to set links that pop a new window to actually spawn a new tab. That's a nice option.

#### Built in Searchbar

In a surprising move – the built in search bar lets you select your search engine of choice. I really thought that IE would be MSN only. Good job Microsoft, I really didn't expect this one.

#### Conclusion

So, while IE7 introduces native Tabbed Browsing (you can add tabs to IE6 with the MSN Toolbar), RSS Reader and robust Pop-up Blocker it is a letdown in that page rendering hasn't considerably changed. I hope the CSS compatability has been left for later inclusion instead of left by the wayside.

Yeah, yeah. It's a beta, but at least we got a token of sincerity towards standards compliance with 2 bug fixes. I just hope that keeps up – I'm ever doubtful of Microsoft anymore.

**Update:** It looks like we'll be waiting for beta 2 of IE 7 for any standards fixes. [IE Blog has the details](http://blogs.msdn.com/ie/archive/2005/07/29/445242.aspx).