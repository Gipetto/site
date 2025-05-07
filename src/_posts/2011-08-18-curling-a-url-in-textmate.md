---
id: 2029
title: "curl'ing a URL in TextMate"
date: 2011-08-18T10:07:32+00:00
layout: post.liquid
guid: http://top-frog.com/?p=2029
permalink: /2011/08/18/curling-a-url-in-textmate/
categories:
  - TextMate
tags:
  - bundle
  - command
  - curl
  - github
  - ruby
  - script
  - textmate
  - tmbundle
  - url
---
Ok, sorry, I can't let all the BBEdit users think that they've discovered something new 😉

In case you've noticed the amazement lately on blogs and twitter where BBEdit users have discovered a way to open a curl'd url in BBEdit to view its source you may be wondering &#8220;how do I do this in TextMate&#8221;?

Well, its a little more code, but its also a little more powerful.

``` shell
#!/usr/bin/env ruby -wKU
require ENV['TM_SUPPORT_PATH'] + '/lib/io.rb'
require ENV['TM_SUPPORT_PATH'] + '/lib/current_word'
require 'open3'
require 'cgi'
theUri = Word.current_word('a-zA-Z0-9#\-_\.:;%/?&=@!$^\*\+', :both)
if theUri.include? '@'
  auth, uri = theUri.split('@')
  theCommand = "curl -s  -u #{auth} \"#{uri}\""
else
  theCommand = "curl -s \"#{theUri}\""
end
stdin, stdout, stderr = Open3.popen3(theCommand)
TextMate::IO.exhaust(:out => stdout, :err => stderr) do |data|
  puts data.rstrip
end
```

So, add this as a command in your bundle and tell it to open a new document when its done. Assign it to a keyboard command (if you haven't already assigned other items to every other keyboard combination under the sun like I have). From here you can simply highlight a URL in a document, trigger the command, and get the source of the url in a new document.

On top of that, if the url contains credentials a-la `user:password@http://foo.com` it'll use the `user:password` portion to authenticate you against simple [Apache 401](http://httpd.apache.org/docs/1.3/howto/auth.html) authentication.

I've been thinking that it would be nice to have this also check the clipboard if there's nothing selected. But I haven't gotten around to trying that yet.

This and a few more helpful commands can be found in my [General TextMate Bundle](https://github.com/Gipetto/sp_general.tmbundle) on Github (also available through GetBundles).

Enjoy!
