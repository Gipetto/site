---
id: 176
title: Disk Image to the Rescue!
date: 2006-09-19T09:06:00+00:00
layout: post
guid: http://top-frog.com/?p=176
permalink: /2006/09/19/disk_image_to_the_rescue/
categories:
  - Computers
tags:
  - Apple
  - boot
  - cd
  - disk
  - firewire
  - image
  - install
  - osx
  - reformat
  - reinstall
  - rescue
  - tiger
---
The last time I decided to mess around with the formatting of this laptop I decided to dual boot YDL and OS X. Last night I needed more space to import video from our new (to us) video camera and decided to nuke the Linux partition since I didn't use it anyway.

It wasn't until a minute after I booted from the OS X install CD and wiped the Linux partition that I realized I just deleted the yaboot config file – essentially my computer didn't know where to find any installed OS. Funny how hindsight is 20/20, eh?

#### Oops

So, not knowing quite what to do next I decided to image the hard drive to an external drive. Booted to the Tiger install CD I loaded up the Disk Utility and made a disk image of the entire hard drive to an external firewire drive. This took about 2 hours.

After that I couldn't see any other way to resurrect the current state of the drive so I reformatted the drive. Not wanting to do a complete reinstall of everything I decided to see if I could restore the disk image I made back to the hard drive. I started the process and then went to bed.

This morning I got up and it had finished imaging and I hesitantly rebooted the machine.

It booted. It prompted me to log in. And there it was. Everything that was on the computer before I broke it. Even the MySQL database server was up and running and I had full access to all the data. I'm even still logged into the Clubhouse54 forums.

I kinda figured I'd be able to boot the machine but I thought that since I simply made a disk image and didn't do a proper clone of the hard drive that I'd run into a lot of permission errors and possibly a bad user account. So far its like nothing happened to the machine – I just have a bit more hard drive space now without Linux on board.

#### phew!

I color myself super lucky on this one. I really screwed up pretty bad and ran a huge risk of losing everything but it seems that Apple really made the system resilient to being moved around and it saved my ass.

Thanks Apple! And from here on out disk images just might be my preferred format of backup since they're bootable copies.