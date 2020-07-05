---
title: "OS X Samba with a Linux Server"
date: 2020-07-03T14:01:42-0700
layout: post
categories:
  - Computers
tags:
  - osx
  - linux
  - samba
  - config
  - music
  - itunes
threads:
---

Since migrating my iTu~ err... Music library to a Linux server to save space on my MacBook Pro I've been lamenting the move. Accessing my library via SMB was incurring the slowest speeds known to man, as well as was what seemed to be file writing issues. I was also continually having issues with artwork going missing or Music not being able to find the library at all.

Today I finally dug in to see what I was doing wrong. That turned out to be not having read any docs.

#### It is Already a Solved Problem

I don't know much about samba, can't say that I want to either. So I was pleased to find out that I had simply been missing a page in the Samba Wiki that was specifically to show morons like me how to [Configure Samba to Work Better with Mac OS X](https://wiki.samba.org/index.php/Configure_Samba_to_Work_Better_with_Mac_OS_X).

#### Even Apple has Documentation

I also found advice that disabling signing can reduce overhead, so I implemented that as well. And as it turns out there's a support document from apple on how to [Turn off package signing for SMB2 and SMB3 connections](https://support.apple.com/en-us/HT205926). Apple's reasoning isn't speed or stability, but compatibilty, but it helps me out.

#### Other Additions

There's also common configuration recommendations on how to speed up Samba connections by modifying socket options, raw read/writes, and directory path caching.

#### The Change Set

After all was said and done I ended up much happier than I'd been before, and now Music is much, much happier with the setup. 

So, enough blabbing, what you're actually interested in is what you have to do, right?

**On the Linux server side** (for me that's Ubuntu 20.04 with Samba 4.11.6) I added this to my `/etc/samba/smb.conf` file:

``` conf
server signing = no
# This has no effect if connections are signed
min receivefile size = 16384

socket options = TCP_NODELAY IPTOS_LOWDELAY
read raw = yes
write raw = yes
strict locking = auto
getwd cache = yes

min protocol = SMB2
ea support = yes

# VFS enablement, order on this next line is important
vfs objects = catia fruit streams_xattr
fruit:metadata = stream
fruit:model = MacSamba
fruit:veto_appledouble = no
fruit:posix_rename = yes
fruit:zero_file_id = yes
fruit:wipe_intentionally_left_blank_rfork = yes
fruit:delete_empty_adfiles = yes
```

This relies on the install of Samba to include virtual file system modules. I didn't install samba myself on my Linux server, I enabled file sharing via the system preferences. This gave me a pretty full featured Samba install and included the vfs modules I needed. The default modules all appear to get added via a single `samba-vfs-modules` package. Your mileage may vary here. 

Verify the config with `testparm`. Then if you're good restart the Samba service with `sudo service smbd restart`.

**On the OS X side** (for me that is, unfortunately, Catalina) I had to create a new file named `/etc/nsmb.conf` and add this to disable it wanting to use packet signing:

``` conf
[default]
signing_required=no
```

No restart required, just reconnect to the server.

#### And that's it

I have no benchmarks or timings to show before and after results, just less aggravation when loading my Music library. With a large library like mine where my main music directory contains ~1300 directories, an initial hit can still be felt when that directory has be first traversed, but it is much better than it was before, and the system runs much smoother overall.