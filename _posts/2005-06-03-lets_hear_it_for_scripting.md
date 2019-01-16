---
id: 87
title: "Let's hear it for scripting!"
date: 2005-06-03T18:19:00+00:00
layout: post
guid: http://top-frog.com/?p=87
permalink: /2005/06/03/lets_hear_it_for_scripting/
categories:
  - 'Web Design &amp; Development'
tags:
  - php
  - script
  - command line
---
Ya know, 3 years ago I never thought that command line could do much more than system administration tasks. Whenever people talked about writing scripts to do tasks I could never think of a task that I'd use the command line for in a normal days work. 

Well, now I've found something. I actually wrote and first used the script about 4 months ago but it wasn't until recently that it became a normal part of my toolset.

#### Where it all began

It turns out that using PHP from the command line can save me a ton of time and hassle when processing images for our eStore at work. We need the images processed in 2 ways. We need to have 40 px square thumbnails and the larger image can be no wider than 400 px if horizontal or no taller than 250 px if vertical.

On top of having to make two of each image I'm typically given 10 or more images at a time to process. I started doing them with Photoshop's scripting ability. Speed didn't concern me since I was doing such small batches.

But then came the day I was given something out of the ordinary. I was given 600 images and a spreadsheet of the 340 that they'd like to use. I was staring at the next 3 days of just sorting and processing images. But then I thought about it and came to a conclusion. This can all be done by php. After a little research I learned that I didn't even need to do it via a webserver – though my only unix box was my test webserver, so it was done there.

It took me about 30 minutes to write 2 scripts. One that took a CSV file of the desired files, rooted through the images folder, and moved the needed images to another folder. The next script went through the images and did 2 resizing operations. The first made the larger image, scaling down to one of two sizes based on what turned out to be the longest edge – the vertical or the horizontal. This image was saved out as a jpg to a new folder under the same name it came in with. The next routine shrunk the image down to be no longer than 40px on its longest edge and then plopped it smack dab in the middle of a blank 40px square area and saved that out with a `-thumb` before the file extension to the same folder as the larger one.

All in all, with writing, testing and processing time I invested about one and a half hours in the project. I surprised the hell out of the IT director when I handed over a flash drive with his images on them.

I took 3 days of work and shrunk it down to an hour. Once the scripts were written the actual processing time on a 233mhz Gentoo box was all of a minute and forty seconds.

#### The long term benefit

And recently I've been getting more and more images to process – typically between 10 and 30 images at a time. I put the images in one folder on the server, call the script, and – zoink – its done in a flash. Much easier and faster than waiting for Photoshop to open, process, save, close, repeat. Granted the scripting ability of Photoshop is nice to have but is surely is slow.

#### Can he keep going?

This has actually opened new doors for me. I'm finding more and more ways to take care of tasks by command line. Mostly right now its backup scripts and image manipulation, but when I have time I'll finish up a PDF generation script that emails the built PDF to the user… fun stuff.