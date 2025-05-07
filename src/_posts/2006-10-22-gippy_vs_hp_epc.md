---
id: 190
title: Gippy vs. HP EPC
date: 2006-10-22T00:44:00+00:00
eleventyExcludeFromCollections: true
layout: post.liquid
guid: http://top-frog.com/?p=190
permalink: /2006/10/22/gippy_vs_hp_epc/
categories:
  - Computers
tags:
  - bios
  - epc
  - hp
  - linux
  - ubuntu
  - window
---
So, in my infinite wisdom I decided to get myself a generic PC, used, and dual boot Windows XP Pro and Ubuntu Linux. Simple, eh? There are tutorials littering the web about how to do this.

So as not to bore you with a long, sorded story about the entire troubleshooting process I'll get straight to the point. It is super easy to botch up a Intel machine, especially one like an HP EPC where you have a very limited BIOS and no floppy drive.



I used qtparted to adjust the partition table on the hard drive. This is standard practice and I didn't think anything of it. Well, silly me, I didn't check my BIOS version first and found out the hard way that qtparted kills the MBR on older BIOS setups. Basically my drive was taken out of LBR mode and everything on it was essentially invisible to the computer.

My problem in all of this is that the EPC line comes with some kind of simple BIOS setup that doesn't allow you to go in and change the hard drive mode. And, on top of that I have no floppy drive.

Everything that I found out there on teh intarweb about how to set a drive into LBR mode entails the disk that came with the drive. That disk is typically a floppy. 

I don't own a computer with a floppy drive. And I own 6 computers.

#### Don't worry, it gets better

The situation, not the story.

After getting close to my wits end on being able to get Windows back on this drive I found a suggestion to boot from a Win98 SE disk and reformat the drive from there. Lo and behold, the Win98 SE disk asks if you want to format with LBR support. 

So, I'm half way there. The next step was to reboot from the XP CD and format myself a partition. The trick to not screwing up again was to use the NTFS(quick) option when formatting. I did that and I'm now off to the races.

So, my next trick is to get an XP install CD. My install CD is for XP Pro Corporate. It seems that XP Pro Corporate does not accept the same CD keys as XP Pro, so I have to get an XP Pro install CD since the computer didn't come with one. It did come with the Genuine Windows sticker on it so I have a valid key, but the guy I bought it from didn't have the install CD anymore. Bummer.

And to think, this is all just to test CSS hacks against Internet Explorer and some Linux browsers.
