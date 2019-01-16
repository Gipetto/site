---
id: 194
title: InDesign, XML Import, and Whitespace
date: 2006-11-10T10:19:00+00:00
layout: post
guid: http://top-frog.com/?p=194
permalink: /2006/11/10/indesign_xml_import_and_whitespace/
categories:
  - Computers
tags:
  - import
  - indesign
  - preferences
  - scripting
  - whitespace
  - xml
---
This is as much a note to myself as it is an attempt to make this information easier to find by others.

Seemingly still undocumented in the InDesign Scripting Guide is a setting for controlling whitespace in imported XML files.

So, if you don't want whitespace between XML elements honored on import while using a script run the import then set the preference for `xmlImportPreferences.ignoreWhitespace` and set it to `true`. The syntax is slightly different whether you are using JavaScript, Applescript or (shudder) VBScript. Since I'm using Javascript to be cross platform compatible that's the only one I've bothered to set up. So, if you're interested, simply use this:

``` js
app.xmlImportPreferences.ignoreWhitespace=true;
```

When trying to find this information I had found several suggestions that were close but had wrong capitalization or other very slightly off spellings. This works.

So, hopefully this helps somebody.