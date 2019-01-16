---
id: 1211
title: Enable Etherpad to send email via GMail
date: 2010-03-15T14:42:34+00:00
layout: post
guid: http://top-frog.com/?p=1211
permalink: /2010/03/15/enable-etherpad-to-send-email-via-gmail/
categories:
  - Computers
tags:
  - ajstdlib
  - appjet
  - authenticate
  - etherpad
  - s starttls
  - scala
  - smtp
  - tl
---
By default [Etherpad](http://code.google.com/p/etherpad/) wants a local mail server to send email. We didn't want to muck around with the security details of hosting a mail server so we decided to use our catch all GMail account to send email. The only problem was that Etherpad wasn't set up to do TLS authentication when sending email.

It was a relatively easy fix once I could a) figure out the problem and b) actually find the mail functionality within the Etherpad source.

Simply make the change below and recompile your .jar. Update your SMTP settings to point and authenticate to GMail and you're off to the races.

``` diff
--- a/trunk/infrastructure/net.appjet.ajstdlib/ajstdlib.scala   Fri Dec 25 22:53:09 2009 -0500
+++ b/trunk/infrastructure/net.appjet.ajstdlib/ajstdlib.scala   Thu Mar 11 14:38:29 2010 -0700
@@ -217,6 +217,7 @@
         val debug = false;</p>
         val props = new Properties;
+        props.put("mail.smtp.starttls.enable","true");
         props.put("mail.smtp.host", config.smtpServerHost);
         props.put("mail.smtp.port", config.smtpServerPort.toString());
         if (config.smtpUser != "")
```

Now, if anyone points out where this was previously documented I'll politely ask you to keep that to yourself 'cause I spent a fair amount of time tracking this bad boy down! 😉

**Update:** In case anyone is wondering, yes, I did submit this back to the [Etherpad Google Group](http://groups.google.com/group/etherpad-open-source-discuss/browse_thread/thread/7a9289c642ccfc87) as well.