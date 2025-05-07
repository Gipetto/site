---
id: 51
title: Making life easier with exec
date: 2005-03-04T22:45:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=51
permalink: /2005/03/04/making_life_easier_with_exec/
categories:
  - PHP Scripting
---

<div class="alert warning">
<p><b>Don't do this</b>: running exec off the file system is a security hole, expecially if you're taking user input to run the command. Just... don't.</p>
</div>

I've been playing more and more with the [php exec command](http://us3.php.net/manual/en/function.exec.php) to do stuff – I got my first taste of doing this with running htDig as a command and pulling its results into an array.

So I decided to find out if using exec to do directory listing would save any script length or not.

Well, as you can see [in this file](/script_src/exec_vs_php.html) there is little difference in length and a tradeoff or two to get there.

Initially the script looks more compact and there is definitely less individual things going on. The scripts are so short though that trying to benchmark them is pretty futile.

Initially I can see on area where the old route would have the advante: file size. The php way of getting the file size needs to be computed no matter what so wether you want to write in KB, MB, or B you run no extra cycles to do so. The exec command returns KB only so if you needed to do anything different when listing the size you're sol.

Another benefit of the php method is that the exec method is more consistent if running with a full path – not truly a big deal since you can always use `$_SERVER['DOCUMENT_ROOT']` to help find your way around.

The exec method is a boon in that non visible files (ie: . files) are filtered by default so you don't need to filter out hidden files or the up and down directory references and that directories are easily identified by a slash in the name instead of another call to the system to determine if the entry is a directory or a file. Yes, you could do this by looking for a file extension but with the ability to make folders with a period on the name it isn't really truly foolproof way of making that determination.

Adding URL building capabilities is a moot point – both scripts would add the same overhead to make the entries into links.

This is far from being a conclusive test but I think the ability to interact with the shell is a wonderful thing to be able to do with PHP. It limits the scripts that are written to running on *NIX but I can live with that – I can't see ever running on IIS and the chances of running on any other OS (ie: Solaris) is so remote that it isn't even worth worring about.

I pondered a different application for this earlier in the day – uploading files. If the command could be handed off to a terminal command for an FTP upload then the time limit on running php scripts could be overcome for very large files. Also, when moving files after an upload the file then becomes property of the www user – this is bad since it requires a chmod or another script to run to delete the files. With an exec command the file could be moved with normal user credentials to make later deletion of the file manually easier.

Overall I can't say that this is a conclusive test, but it certainly was a neat excercise in using php in a different way. And finding ways to interact with the system like we find ways to interact with the user will be a new way of thinking. Now I need to go perusing `/usr/bin` to see what I can use to make life easier.
