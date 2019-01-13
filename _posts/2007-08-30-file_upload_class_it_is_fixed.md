---
id: 217
title: 'File upload class – it is fixed!'
date: 2007-08-30T21:53:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=217
permalink: /2007/08/30/file_upload_class_it_is_fixed/
categories:
  - PHP Scripting
tags:
  - class
  - code
  - file
  - fix
  - object
  - oop
  - oriented
  - pear
  - php
  - script
  - source
  - text_highlighter
  - update
  - upload
---
After a long time of knowing there was an issue with the script I finally got around to checking it out. Its a little embarrassing to say, but, here's the dish: I wrote all the functionality to check the file type, but forgot to actually implement it… oops.

The file is correct now, so to those who hung in there until I finally got around to it I say thank you. Soon I'll be sharing my PHP Email script so if you've been looking for an easy way to send email with HTML and Plain Text alternatives as well as handle attachments this should work out nicely for you. Ok, well, nicely if you're hosting on Unix… I haven't tested at all on Windows. Though, I will say, if you're hosting on Windows you really should consider .NET as it has some great functionality and is native to the system.

So, enough said for now, the new script has been added to the old page [located here](/2006/12/22/classes_for_file_uploading_in_php).

#### And source file highlighting

I've also updated the source file highlighting to use the Pear package Text_Highlighter. I won't go into details about how to use Pear since there are many many good articles about that already, but I had to apply [this patch](http://pear.php.net/bugs/bug.php?id=11478) to the installed package to get the renderer to format the output correctly so CSS styling would display as expected. I installed the stable version and had to apply the patch.

So now the source highlighting looks much much better. The proof is in the pudding: [Upload class file](/script_src/Upload.class.phps), [my directory listing class (PHP 5.1+ ONLY)](/script_src/ListDirectory.class.phps), [and maybe some javascript](/script_src/stripe_table.js).