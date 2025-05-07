---
id: 115
title: "That's just embarrassing"
date: 2005-07-28T14:22:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=115
permalink: /2005/07/28/thats_just_embarrasing/
categories:
  - Computers
tags:
  - advantage
  - crack
  - embarrasing
  - genuine
  - javascripot
  - microsoft
---
Just 24 hours after its announcement the Microsoft "Windows Genuine Advantage" initiative was cracked. And it was cracked by none other than Javascript. This is not only embarrasing for Microsoft that this was cracked but embarrasing to show that they used an easily manipulated technology like Javascript to control the check process.



> "This week, Microsoft started requiring users to verifiy their serial number before using Windows Update. This effort to force users to either buy XP or tell them where you got the illegal copy is called &#8216;Genuine Advantage.' It was cracked within 24 hours."
> 
> Before pressing &#8216;Custom' or &#8216;Express' buttons paste this text to the address bar and press enter:
> 
> `javascript:void(window.g_sDisableWGACheck='all')`
> 
> It turns off the trigger for the key check.

This really baffles me but at the same time it reaffirms that Microsoft will never get it right. Not only was it punishing the legitimate users by instituting this process but now it shows that it has no real knowledge of what it takes to make something secure.

They've got ASP.Net to work with and they chose Javascript. It still just baffle's me.

#### But it doesn't end there…

It seems that there is another way to circumvent the check. When prompted to download the WGA plug-in at the Windows Update site click OK to accept the add-on. Next, go into Tools > Manage Add-ons. From there select "Add-ons that have been used by Internet Explorer". You'll now see "Windows Genuine Advantage" in the list. In the lower left hand corner of the dialog box you have the option to disable it. You'll be presented with a dialog box, accept it and then restart IE. Now if you go to Windows Update you'll be notified that the plug-in was requested but you'll be able to proceed without it.

Good job Microsoft, you succeeded in implementing the most worthless attempt at anti-piracy in history.
