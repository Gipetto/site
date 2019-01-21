---
id: 574
title: 'Client side pre- and post-svn hooks with Unix Aliases'
date: 2009-04-23T08:31:10+00:00
layout: post
guid: http://top-frog.com/?p=574
permalink: /2009/04/23/client-side-pre-and-post-svn-hooks-with-unix-aliases/
categories:
  - Code
  - Computers
tags:
  - bash
  - command line
  - linux
  - os x
  - script
  - subversion
  - svn
  - unix
---
Its probably nothing new but I came up with a way to do client side post- or pre-svn actions. Its nothing revolutionary but has already come in handy. The script is \*nix only (though I don't see why the same process wouldn't work on Windows if it supports command line aliases like \*nix does).

I had to write [this bash script](/script_src/ssh-action.sh.html) because we had files at work that needed to be version controlled but still writable by the server process. The need arose because when Subversion updates a file it updates the files permissions with that of the user that did the SVN action. I'm not entirely sure but I think this is because the file isn't actually updated, but replaced by Subversion (if anyone can confirm that, I'd appreciate it).

So, this script is pretty simple. It sits in between you and Subversion via an alias and passes everything it gets through to Subversion and then operates based on the action that was taken in Subversion. 

In the case of the sample file, we look to see if an update has been performed. If so, we update any files we find in the base path that have a file name that indicates that it needs to be an editable file. I use chmod, but assigning to a group, depending upon the security level needs of the server, would probably be a better idea. In my case simple 0777 assignment as fine.

The key parts of the script are two fold:

  * Use of an alias in the `~/.bashrc` file to override the default SVN command with this script. Unix will look in a user's local scope for command aliases before it searches the path, so we can capture svn command so that we don't have to a) remember that this special script is there, b) remember to tell others that this special script is there. Its automatic just by calling svn as normal.
  * Use of the `$@` bash operator to pass every parameter this script received, just as it received it, down to the proper svn command for execution

All in all not terribly complicated and the instructions and example are so straight forward it doesn't warrant duplicating the instructions [that are in the script](/script_src/ssh-action.sh.html). Now that I think of it this might be a good candidate for being a Ruby script instead of a Bash script, but the proof of concept is there and I know Bash much better than I do Ruby at this point (though, I do have a decent Ruby based project that'll be announced soon for you WordPress & TextMate users. That also assumes anyone is actually reading this 😉 ).