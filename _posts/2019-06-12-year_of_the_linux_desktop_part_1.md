---
title: 'Year of the Linux Desktop, Part 1'
date: 2019-06-12T22:03:00+00:00
layout: post
categories:
  - computers
tags:
  - linux
  - desktop
  - ubuntu
  - '*nix'
thread:
  - Year of the Linux Desktop
---

Over the years I've had a fleeting relationship with Linux. I use it every day, but mostly on remote servers. But I've never committed to actually _using_ linux.

Until today. Well, last month, really.

#### Enter the Penguin

I did some research, ordered some parts off of Amazon, and put together a computer. I made a couple of bad decisions on timing[^1] and the Video Card[^2], but overall its good. Really good. I got a plenty fast CPU in the Ryzen 7 2700X. The RX580 is overall a solid performer. Gobs of RAM and fast hard drives help a lot too. I loaded up the case with fans and the largest CPU cooler known to man and it runs cool and quiet. Overall I'm digging it a lot.

For the OS I decided that mainstream was the best place to start. So Ubuntu it was. I reinstalled a few times to check out XUbuntu and to try different versions to see what felt right. In the end I chose 19.04 solely because I didn't see much use in an LTS system at this point. I'm gonna fuck it up to the point of needing a reinstall anyway, so why not try the latest and see how it goes.

#### The warm glow of Television

One criteria that I did have for this machine is that it should be able to run Plex Media Server and do it while running happily in the background. I already had the docker setup from using an older MacBook Pro as a media server. I pulled the mdadm raid array straight over, started the docker containers and had my media center back. Now I don't care if I get video from the right source. Transcoding on this machine is a non-issue. In fact, I need to do it for larger files because my network goes over MoCA (coax) to get to the living room and that leaves a bit to be desired. Limiting the bandwidth doesn't sacrifice quality on 1080p content and keeps the network overhead in check. The hard drives also get to hook up to a real SATA 6Gbps bus, so they're no longer strangled by an older Firewire 800 Connection. All in all, huge win here.

Most of my dot-file configs came right over. I installed ZSH, all my favorite helpers and I get the same terminal experience that I had on my MacBook Pro, and that I get on my work MacBook Pro. So that's pretty nice. I'm still working on small little things, but they're mainly pathing differences between systems. Another huge win.

#### What's next?

That leaves a few topics for the future:

**Every Day Usefulness**: There's a lot of little things that I've learned to lean on with OSX. Spotlight/Launchbar. Quicklook. iCloud. iMessage. There's a lot of functionality there that as of yet just doesn't have a full featured equivalent on Linux.

**Creative Apps**: I've gotten used to Pixelmator, Affinity Designer and Lightroom on the Mac (but I long for the return of Aperture). Good apps (mostly[^3]) with hardware acceleration support (because, lets face it, they get it for free if they're using OSX to its fullest). Hardware accelerated anything on Linux seems to be... missing? Unless you're mining Bitcoin, that is, and we'll be having none of that pre-pubescent bullshit here.

**Development**: Most of my common tools are available on Ubuntu. JetBrains software for the heavy lifting as well as Visual Studio Pro for the rest of it. Everything that I lean on the command line for, mostly the software stacks themselves, are fast, but no less a slog to configure. Linux is great, but far from magic. So far so good. There's enough here for its own post.

**Gaming**: I'm not a hard core gamer, but pulling out that really old copy of Half Life 2[^4] and getting 300 FPS is pretty cool. Now I need to find some game to keep my occupied. I don't think Kerbel Space Program is gonna hold my interest for that long, but only time will tell there.

#### Onward

In time I'll have a better picture and understanding of wether Linux is where its at. If this experiment fails it'll be unfortunate because I don't see myself ever accepting Windows in to my house. The computer might be a freebie to my parents if that happens. But so far it feels like the worst case scenario is useful, but disappointing. But that's jumping the gun. I'll probably brick the OS a few more times before I make that determination ;)

**Postscript**: In case anyone is interested, this is the parts list - [https://pcpartpicker.com/list/VcZjmq](https://pcpartpicker.com/list/VcZjmq)

---

[^1]: I knew that Ryzen 9 CPUs were coming this year, but I didn't want to wait long. Well... the day I first booted this Ryzen 7 system AMD releases ship dates for the new Ryzen 9 line. Dammit. At least, though, I bought an up to date motherboard so forward compatability with the 9 series should be OK if I feel that the benchmarks look droolworthy.

[^2]: I thought that I could get away with an Amd RX580 and be happy. Apple has been on Nvidia for a while and I never quite was happy with what I got when I did load Linux on my MacBook Pro. So I thought I'd give AMD a shot. Everything was good, it performs really well, gaming is solid, but then I got to OpenCL hardware acceleration for photo editing. It just isn't there on the AMD drivers. In fact, the AMD drivers for Linux are quite puzzling in that they don't appear to be fully maintained by AMD. They feel like a side project that never quite gets done.

[^3]: I'm looking at you, Lightroom. What gives?

[^4]: 15 years old and still awesome.