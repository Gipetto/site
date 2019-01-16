---
id: 149
title: Nokia Cellphone Wallpaper Format
date: 2006-01-05T20:36:00+00:00
layout: post
guid: http://top-frog.com/?p=149
permalink: /2006/01/05/nokia_cellphone_wallpaper_format/
categories:
  - Computers
tags:
  - cellphone
  - convert
  - distortion
  - engage
  - export
  - format
  - nokia
  - Photoshop
  - png
  - wallpaper
---

<span class="frame alignright">
  ![Fuzzy Coconut wallpaper for Nokia N-Gage](/assets/png.jpg)
</span>It may seem trivial to some but I spent some time tonight figuring out the best file format to use when making a wallpaper for a Nokia phone that's running the Symbian OS. I noticed artifacts on my first attempt and just couldn't have any of that. The image needed to be smooth like I made it. Those little lines were threatening to rub me the wrong way.

Maybe I've got too much time. Maybe not. Read on if you dare… I take no responsibility for you absorbing useless information if you read this.

I couldn't find a definitive answer online about the kinds of file formats that my new (used) Nokia N-Gage would accept as file formats when uploading a wallpaper. The only thing I could find was that it could take RGB JPEG files. So I made myself a fun little wallpaper and uploaded it.

<span class="frame alignright">
  ![Symbian OS hates JPEGs](/assets/jpg-dk.png)
</span>Upon setting it as a wallpaper I noticed faint vertical lines through the image (Illustrated at right on a darkened screenshot from the camera). It was easily seen since the background was white and there was a lot of it. For some reason odd things were happening to the image once it was uploaded to the phone.

The next try, which turned out to be successful, was PNG. I exported the same file from Photoshop as an 8-bit PNG, no transparency, no interlacing and uploaded it to the phone. This time the image looked great when set as a wallpaper.

The files are both fine as stored on the phone as sending them back to the computer shows no distortion in the JPEG file. The phone is doing a conversion of some sort on the files before setting them as wallpapers and it probably has something to do with the color table. The JPEG is probably being converted to an indexed color table before being set as a wallpaper and the 8-bit PNG is already indexed color so it just drops right in with no conversion or artifacts.

So, long story short. If you have a Nokia phone with the Symbian OS send your wallpaper images as 8-bit PNG so that they don't suffer any ill effects of conversion. That is, if you're anal about the quality of the background image on your phone… Oh well, at least I'm keeping myself entertained.