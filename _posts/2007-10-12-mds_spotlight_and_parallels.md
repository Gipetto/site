---
id: 218
title: MDS (Spotlight) and Parallels
date: 2007-10-12T10:54:00+00:00
layout: post
guid: http://top-frog.com/?p=218
permalink: /2007/10/12/mds_spotlight_and_parallels/
categories:
  - Computers
tags:
  - macbook pro
  - machine
  - mbp
  - mds
  - parallels
  - spotlight
  - virtual
  - vm
  - windows
---
I was having an annoyance on my MBP for a while where MDS (Spotlight) would start indexing and try to hijack the machine… it was working hard and at random intervals.

Then it hit me… Parallels was typically active at the same time (despite Windows being "idle" inside the VM), usually jumping to about 25-25% CPU as well. Was Parallels writing out a page file that Spotlight was indexing.

I took Parallel's VM folder (~/Library/Parallels) and added it to the spotlight exclude list and I've had no more MDS hijacks. I've been good for a few days now. 

Don't know if this was common knowledge or not, but it sure was annoying the hell out of me.