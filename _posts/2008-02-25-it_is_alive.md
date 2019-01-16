---
id: 225
title: It is Alive!
date: 2008-02-25T20:58:00+00:00
layout: post
guid: http://top-frog.com/?p=225
permalink: /2008/02/25/it_is_alive/
categories:
  - Computers
tags:
  - alive
  - backup
  - blog
  - cardboard
  - chyrp
  - code
  - compusa
  - drive
  - fan
  - firewire
  - hard
  - lvd
  - mdd
  - newegg
  - noise
  - pci
  - powermac
  - puddlemonkey
  - reduce
  - sata
  - scsi
  - silenx
  - sql
  - storage
  - temperature
  - upgrade
  - vantech
---
After a probably much non-missed stint of downtime this piece of shit blog is finally back up and running. The upgrade process took a bit more than expected. Read on for the whole boring story.



#### Dink, donk… OW!

While upgrading the hard drive died. Figures. So I took the opportunity to do a few things that I've been wanting to do. I rearranged the hard drives a bit and also decided to upgrade. I ordered a SATA 300 PCI card and purchased a 500 GB SATA 300 drive. If I can get to CompUSA again before it closes, and after it does it next round of markdowns I'll purchase another one for a total of 1GB of storage. That'll be nice since I'm not nearly as diligent about backups as I should be. 

Though I'm still not convinced that I'll use the entire space as backup. I'm still not sure what to do. I don't want to give up the Ultra SCSI2 LVD raid. Though its only 32GB formatted its nice and fast and makes a superb Photoshop scratch disk. But with those in I only have 2 other HD bays. If I get the extra SATA drive that means all 4 internal HD bays are taken.

I do have an extra bay under the DVD drive, but its currently stuffed with a fan controller and all the subsequent fan connectors (more on that later).

That leaves me with the possibility of 1 GB of internal space and not enough room in the Firewire bay to back it up. It doesn't make much sense to mirror my main drive since its not a sync backup that I'm interested in – I want the versioned backups that I can get via Time Machine. So I'm in a bit of a pickle.

#### Less Noise

On the upside I was able to replace all the fans in the MDD and get it to make 1/5 the noise that it made before, and get it to run 4 degrees cooler on average. 

I replaced the 120mm Pabst with a 120mm SilverStone that came with a speed control dial. I put the speed control dial in the lower optical drive bay so that I wouldn't have to reach around back to alter the fan speed, and also because the controller wasn't on a PCI bracket like NewEgg said it was. Not a huge deal 'cause between that and the other two fans I needed a place for all the extra fan power connections anyway.

I added a fan to the outside of the case. A 120mm Vantec Stealth. I put him on the 5V leads and can't even hear him running. Between the SilverStone pushing and the Vantec pulling the inside of the case runs super cool at a massive reduction in noise. 

The last fan is a bit of a hack. I removed the 2 screamers in the power supply and replaced them with an 80mm SilenX fan. I had to build a shroud to funnel the air into the mouth of the power supply. I ended up with, get ready, CARDBOARD. Lightweight, sturdy, good vibration absorbtion. I can't hear the SilenX even though it is pegged at full speed, yet he's pushing as much air out the back as the two 60mm fans were. 

All in all, I dropped the temperature inside the MDD and reduced the noise at the same time and only lost the lower optical bay to all the extra fan power connectors. Not too bad for a hack job.

I'll post pics later. 

So, while this is up and running I'm waiting for some changes to get done at work to decide if I want to use my framework from work, start a new branch of it that's more lightweight, or use another blog system like Chyrp to redo this blog. I'm still undecided. I can't say that I like everything about the blog systems out there, but the thought of someone else maintaining the code base is very attractive.

We'll have to wait and see. One way or another I need to get UTF 8 on this thing. And I'm finding some SQL oddities with my old, ugly code.

So, for now, here it is. Puddlemonkey will be back up real soon too – so bug the shit out of her to start writing again. She's actually a damn good writer and she needs a creative outlet. Beg her to come back! She's very entertaining.