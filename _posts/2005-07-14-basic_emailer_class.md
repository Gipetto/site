---
id: 108
title: Basic Emailer Class
date: 2005-07-14T00:25:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=108
permalink: /2005/07/14/basic_emailer_class/
categories:
  - PHP Scripting
tags:
  - class
  - email
  - emailer
  - php
---
So, I ended up on a project that required a lot of mail notifications to be sent so I went ahead and whipped up a class for sending emails via PHP. They didn't have to be pretty to start off with so this is merely a plain text email class at the moment. HTML and Attachments are slated for future additions but I don't have time to pop 'em in just yet. So, if you need one, [check it out](/files/scripts/emailer.class.phps)



The class is easy to use. It requires some settings to be passed to it at runtime so there's no hard coding and each use can be unique. Give it a recipient, a sender, a subject, and a message and you're off to the races.

It does have a bit of power in being able to use text files as email templates so you can reuse code easily if you need to. Templates can be customized at runtime with variable replacement. Simply set your items to be replaced with double brackets, ie: {{NAME}}, and pass replacement values to the script and you can do some nice variable data emails. There's no limit on the amount of variables that you can use.

So, if this sounds interesting, by all means [download it and give it a whirl](/dl/scripts/emailer.class.php.zip).