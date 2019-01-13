---
id: 129
title: Text editors galore
date: 2005-09-11T23:45:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=129
permalink: /2005/09/11/text_editors_galore/
categories:
  - PHP Scripting
tags:
  - autocomplete
  - css
  - editor
  - highlight
  - html
  - jedit
  - notepad++
  - php
  - phpeclipse
  - skedit
  - smultron
  - snippet
  - studio
  - subethaedit
  - syntax
  - text
  - textmate
  - textwrangler
  - zend
---
This is a post spurred into existence by not being able to post my complete views in a comment box on Jon Hicks' recent article about an [ideal text editor for OS X](http://www.hicksdesign.co.uk/journal/ideal-os-x-text-editor) (I hate to name drop but didn't have much choice here). I've been wanting to write this for some time and his post was the kick in the butt I needed. So, without further procrastination, here is my rundown of the current crop of text editors for OS X and why I like, dislike, use or don't use them. The only order I'll work in is that I'll start with the editor that gets the bulk of my work, skEdit.



#### skEdit

My editor of choice (right now) is [skEdit](http://skti.org/skEdit.php). The main criteria for me on making this decision was that is has a project manager, Snippets are a welcome time saver to doing regex replacements, and the price was good at $20. The snippets were the icing on the cake. In case you don't know, snippets in skEdit are a really simplified way of applying regex like transformations on sections of text. They're one of those things that rank as being a &#8216;best thing since sliced bread.'

skEdit does have a few drawbacks. The built in FTP abilites are limited to SFTP only which effectively excludes a good majority of hosts that I can connect to. Not all hosts allow ssh access, or even telnet for that matter, so SFTP only has been a bit of a hinderance for me. The other drawback is that snippets don't like windows line endings. I'm getting windows text files on a semi-regular basis in skEdit and to use a snippet that relies on line endings requires that I first go through and change the line endings for the effected section. If anyone has any recommendations for this I'd be open to hearing them. (I have not yet submitted this as a but to skti).

skEdit has also become my main writing application too. I've made a site project that is just filled with text files so that I can write freely and then copy and paste the text into the entry box in this blog. Very handy indeedio.

#### Smultron

[Smultron](http://smultron.sourceforge.net/) used to be my editor of choice before I discovered and bought skEdit. The feel of the program is very nice and its syntax coloring is first rate. The ability to store a library code snippets (much different than skEdit's snippets) is nice as well. The main drawback which kept me looking for a different program was that the project manager didn't let you subdivide into folders – so it was impossible to replicate a server file structure in the project manager. That was a real bummer since I really like this program. 

#### SubEthaEdit

Man, this program has been the steady runner amongst so many people as being their favorite program. And though I can see its merits and applaud its very efficient syntax coloring (the ability to add bolding by using certain types of fonts is an especially nice touch) as well as its very comfortable editing feel, it just doesn't match up to a program with a project manager. Yep, that's gonna be a recurring theme from here on out…

What I do keep SubEthaEdit around for though is for collaborative editing. I've used that successfully to both take notes jointly at a meeting and to help teach html/css to my wife. It has been a super handy tool to have on hand.

#### TextWrangler

I am flat out overwhelmed by the scope of abilities of [TextWrangler](http://www.barebones.com/products/textwrangler/index.shtml). The more I learn about it the more I like it. I used its predecessor, BBEdit Lite, for a long time before this came out and love it too (though I never used it to its full potential, much like Textwrangler). This program simply does so much it is a must have for any coder. My main deal for using a text editor day in and day out is easy access to files (ie: a project manager) so that disqualifies TextWrangler from day to day use. 

What does keep TextWrangler around is its ability to open damn near any file as its raw source. This is very handy for repairing EPS files that got slight corruption due to versioning differences or due to failures during email transit. I've pulled a file out of the abyss many times with both TextWrangler and BBEdit Lite.

#### Textmate

[TextMate](http://macromates.com/) is another one that I would really like to use more. It has a good project manager and its syntax coloring and editing feel are first rate. Code blocks and function folding are two wonderful additions to this very nice editor. However, and I seem to be the lone ranger on this one, I seem to have an issue with it on my network. I edit remotely on a local test server and TextMate doesn't like my network. I'm not sure if it is my network or a certain network config (like I have) that it doesn't like. The problem is that when coming back to TextMate after being in another program, and coming back to a project whose files are on my local test server, it takes more than 30 seconds to become active. The computer is still functional but TextMate fails to respond while it tries to figure something out. &#8216;Tis a shame – I like the program.

#### Zend Studio

Other than the price, [Zend Studio](http://www.zend.com/store/products/zend-studio/) only has one drawback. I'll get to that in a second.

The latest version of Zend Studio is very, very nice. The boon of it being that there is a built in SQL editor which allows for fine tuning and testing SQL calls without loading up the page and echoing arrays to test if the result is perfect. It also keeps me out of the command line to type, retype and retype again to test a query. Syntax coloring is great and customizeable. 

A really nice feature of Zend Studio is the function completion and hinting for user made functions. ie: it will look at all the functions in your site and when you go to use one of your functions it will hint it just like it would for a built in PHP function. This is very very nice and something that I had forgotten about up until writing this. It might make me rething my decision. The debugger is first rate as well and really helps in finding errors before actually launching a page.

It is a Java application but that is not even noticeable. A moderately long startup time is all that is noticeable about it being Java based.

The project editor is first rate with a great refresh ability and built in FTP client. I'd be all over this, even at its $299 price tag (there is a $99 version but it lacks the database connectivity feature), were it not for one very annoying trait: when editing a CSS file it won't tab. Sorry, can't work with that… yeah. In the grand scheme of things it is pretty minor but I like my files sturctured a certain way.

#### Vim

I think I'll just refer this over to my [previous article about Vim](/2005/08/02/getting_to_know_vim). Basically, its not a front line editor for me but I like to have it loaded up and ready on the server in case some remote editing is needed. Its also fun to let the inner geek run wild once in a while.

#### A few others to mention

I've also played around with PHPEclipse and JEdit but found them to be either way too overwhelming or too clunky. Don't get me wrong but I think they're more for the super geek – they require a moderate amount of attention to get them even set up properly, something I don't really feel like doing to use a text editor.

#### Windows

I've only found one program I really like to code in when using Windows. [Notepad++](http://notepad-plus.sourceforge.net/uk/site.htm) is simply the easiest to use. Unfortunately it does not have a project manager or else it would be almost everything I wanted when using Windows. It is also the only text editor that hasn't developed some form of debilitating bug that keeps it from being useable.

#### Conclusion

Now, I probably don't get into the nuts and bolts of programs as much as I should – I'm really pretty basic in my usage other than taking advantage of skEdit's snippets. I'm not sure why that is, but it suits me pretty well. Getting down to it I really just like to have a couple of things, and one of them is a decent feel to a program. The feel is a combination of how the text renders on screen and how it reacts to how I like to work. Right now, skEdit is a lot of that but maybe now I'll give Zend Studio another shot…