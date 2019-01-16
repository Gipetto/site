---
id: 104
title: Another baton? What will they think of next?
date: 2005-07-10T23:19:00+00:00
layout: post
guid: http://top-frog.com/?p=104
permalink: /2005/07/10/another_baton/
categories:
  - Computers
tags:
  - apache
  - baton
  - epson
  - ibook
  - meme
  - mitsubishi
  - mysql
  - php
  - powerbook
  - powermac
  - setup
---
So, it seems, I've been passed ~~[another baton](http://milkcarton.protonage.net/)~~. This time on system setup. I use a 15" powerbook so there's not much of a thrill there. The desk is still a mess from moving the server but [I do have a pic of the server for those interested enough to look](/assets/server.jpg).

So, I guess the system specs are in order.

#### The Powerbook

This is a 2005 15" aluminum powerbook, 1.67ghz, 1gb of Ram, 80gb hard drive, 64mb video, airport extreme (though my wireless is still on the b spec). The system is, of course, running Tiger.

The only thing special about its setup is that it has Apache 2, MySQL 4.1 and PHP 5 installed. In its server setup it is a mirror of my production server. It got me in trouble once when I was doing stuff for work where we still use PHP 4 since that is what the web host uses.

I have it partitioned so I can dual-boot into Yellow Dog Linux but until they get the trackpad supported in this version of the PowerBook that partition will remain empty.

When I get the desk back in order he'll have access to a 19" Mitsubishi DiamondTron monitor, an Epson scanner and an indispensable oversized mousepad.

The wife uses a 2005 12" PowerBook that is stock aside from its 768mb of Ram.

#### The Server

The server, which is running this site as well as ~~[Puddlemonkey's site](http://puddlemonkey.com)~~ is a Dual 1ghz MDD G4 Tower, 1.75gb of Ram, 110gb of internal hard drive and another 180gb of FireWire hard drive (used for backup).

It is running 10.3 Server with Apache 1.3, MySQL 4.1 and PHP 5. The system is the central hub of the house providing print, DNS, AFP, web, FTP, Mail (outgoing only), and will soon be providing Open Directory services as soon as I get around to organizing it.

He's currently hooked up to a generic 19" monitor but while he was my main production machine he drove multiple 19" monitors, one of them being the 19" Mitsu mentioned above.

The internal network all runs through a WatchGuard Soho 6tcw at 100bt full duplex. I wired parts of the house for Ethernet.

#### The Backup Server

The backup server is a Tangerine iBook 300 with 320gb of Ram and a 6gb hard drive. He isn't even on the network right now and he really isn't much of a backup since he's not a mirror of the production server. I really use him as a testbed before putting new schemes into production on the PowerMac.

He's been a trusty machine for a looong time and the only glitch is that his battery is stone dead. So any move that he has to go through requires a shutdown to do. Kind of unfortunate for a laptop. 

He used to have an Airport card in him but we cannibalized that to give my wife's work machine, a 667mhz Powerbook, wireless abilities.

#### The Winders box

I do have a Windows machine on the network. Yep, its an old HP Omnibook that is pretty much just there to RDP into so that I can do web site checks in IE (something I should do to this site a little more often – yikes!). He's not allowed to talk to the outside world except on port 80 and only on communication that he starts. I've locked down a bunch of firewall rules on the WatchGuard to keep him in line. So far he hasn't been a problem though he does pop weird trackpad errors once in a while. I'm not sure what that's all about and since it doens't hold back IE I really don't care. Windows is gonna break and he can stay broken as long as IE works. I deal with that crap too much at work to try and make it work at home.

#### Printers

We have 3 printers, one is still packed away. The 2 main printers are an HP LaserJet 2100M and an [Epson Stylus Color 1520](/2004/11/21/thats_why_i_keep_doing_it).

The HP is tucked away in the closet since he fits. The Epson is on a small table in the office. The Epson disappeared from the network a while back and I haven't troubleshooted that yet since I haven't needed to print from him in a while. I'll have to look into it now since I have some color stuff coming up that I'm gonna need him for. It was a bit of a hack to get him to work with OSX but it was doable since he has the network card in him.

#### Most Wanted

Well, I've been pining over a pro digital camera – the Canon EOS 20D. We have a Nikon 4300 but it is far from a full featured SLR and has focus issues on busy backgrounds. Other than that I'm pretty satisfied with my setup. I guess 1.5 or 2gb of Ram would be nice but, really, I'm very happy with my current slew of computer paraphernalia.

#### Move Along

So, that's it. My list of silicon geek. I don't think I'm gonna pass this one on. Mainly because I don't think anyone that I can pass it on to would be interested. But we'll see. I'll leave an open invite to participate to whoever wants to take this and run with it.