---
id: 524
title: Mac OS X, Subversion, and Keychain
date: 2009-03-30T12:30:36+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=524
permalink: /2009/03/30/mac-os-x-subversion-and-keychain/
categories:
  - Computers
tags:
  - keychain
  - osx
  - password
  - subversion
  - svn
---
I just learned this morning that [Subversion](http://subversion.tigris.org) since [version 1.4](http://subversion.tigris.org/svn_1.4_releasenotes.html#keychain) will cache passwords on OS X using the OS X Keychain. Lack up support for multiple passwords with Subversion has been a frustration for me for quite a while, but lo and behold its been under my nose the whole time.

<!--more-->

**Note:** This is all based on command line usage. I'm not gonna speak for any of the SVN utilities out there.

The trick is that you need to let Subversion ask you for your password, not supply it in the SVN command string. So, while its tempting to do:

``` shell
svn co --username=me --password=that https://example.com/svn/repo .
```

We should actually be doing:

``` shell
svn co --username=me https://example.com/svn/repo .
```

We'll then be prompted with:

``` shell
Authentication realm:
Password for 'me':
```

Enter the password and its cached with the Keychain instead of as plain text. The entry is still retained in `~/.subversion/svn.simple/server-name-hash` but now it contains a reference to the Keychain for the password instead of storing it in the file. To verify that the password was stored in the Keychain look in the file and if it has been stored in the Keychain you should see something like:

``` shell
...
K 8
passtype
V 8
keychain
...
```

Getting your password in to the keychain requires re-authenticating with the SVN repository. So to update all your entries to instead use the Keychain you'll need to delete the files in `~/.subversion/svn.simple/` and re-authenticate with the server using the method outlined above.

It is not necessary to re-checkout the entire repository. Simply doing an update will suffice.

So, I feel like this should be a &#8220;well, duh!&#8221; moment since this has been available since 2006 but guaging by the lack of documentation out there on the tubes and the lack of knowledge of this around here at the office I'm gonna say that this is kind of a hidden gem. At least, I'm gonna keep telling myself that to make me feel better 😉