---
id: 1196
title: "Blinking question mark on OS X Boot? Don't panic just yet."
date: 2010-02-03T21:53:53+00:00
layout: post
guid: http://top-frog.com/?p=1196
permalink: /2010/02/03/blinking-question-mark-on-os-x-boot-dont-panic-just-yet/
categories:
  - Computers
tags:
  - Apple
  - boot
  - disk utility
  - flashing
  - folder
  - macbook
  - master boot record
  - mbr
  - os x
  - partition
  - question
  - table
---
My MacBook Pro has been acting up again lately. Crashes, stalls, and overall wacky goodness. Yesterday I pulled it out of my bag after getting home and although I had put it to sleep, and confirmed that it was asleep before packing it away, it had crashed on the way home.

When I restarted it I was faced with a question mark flashing inside a folder icon. The computer couldn't find a valid system to boot from.



I was able to see a valid system directory when using the Startup Disk selector on the OS X install DVD. I was able to use the Terminal on the DVD to browse the disk as well. All the data was still there. 

I tried everything that I could to get it back but had no success. That is, until I ran across a forum post that I now cannot find again. The person in the post had seemingly run across the solution by luck and I'm very thankful he did.

The problem, as it turns out, was that my Master Boot Record was hosed. This is bad. The computer essentially couldn't find anything that would tell it about the hard drive, so it didn't even know where to look for a bootable system.

The solution is rather counter-intuitive. At least to me it is. The instructions below are based on OS X 10.6, but I suspect they'll work on 10.5 as well.

  1. Boot from the OS X install disk.
  2. Instead of installing OS X, select Disk Utility from the Tools menu.
  3. Select the hard drive that is having the problem in the list on the left.
  4. Now select the Partitions tab in the right side of the panel.
  5. If you have one partition, this part is easy. Simply use the slider in the bottom right corner of the partition diagram to resize the partition, then put it back where it was. If you have multiple partitions take note of the size of the partition you're resizing so you can get it back to right where it was before.
  6. After putting the partition size back the way you found it click the Apply button. You'll be asked to confirm the decision and told that its non-destructive. Hopefully in all cases this is true 😉

So, basically what we've done here is forced disk utility to rewrite the master boot record without actually changing the partition structure of the disk, so the existing partition table will simply be re-written to the master boot record.

This works in 10.6, and should probably work in 10.5 as well since it allowed for live disk resizing to support creating Bootcamp installs.

Good luck!
