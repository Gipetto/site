---
id: 254
title: Lipsum Plugin for WordPress, Version 2
date: 2009-02-22T19:14:00+00:00
layout: post
guid: http://top-frog.com/?p=254
permalink: /2009/02/22/lipsum_plugin_for_wordpress_version_2/
categories:
  - Plugins
  - 'Web Design & Development'
tags:
  - code
  - lipsum
  - php
  - plugin
  - wordpress
---
After a while of using and not using this plugin I decided that it needed an update. The previous version would simply insert paragraphs of lipsum but now the plugin is set up to return a few helpful elements as well.

#### Supported Elements

Now supported is:

  * 1-10: A number from 1-10 will insert that number of paragraphs of lipsum text. 
  * ol: Inserts an ordered list 
  * ul: Inserts an unordered list 
  * dl: Inserts a definition list 
  * table: Inserts a fully semantic table 
  * blockquote: Inserts a blockquote with citation 

Items can be combined to get the layout you want. For example, to get 3 paragraphs, an unordered list, and then a closing paragraph would be:

```
{lipsum:3}
{lipsum:ul}
{lipsum:1}
```

#### Why?

While I know that there are plenty of people supplying demo content out there sometimes we need to test the creation of pages or shortcode and input/output filters. Having dummy text easily at hand is very useful. At least, to me it is.

So, there it is. Hopefully one or two people find this useful. If not, well, it kept me entertained for a while and will keep me flush with demo text.

#### Download

[Click here to view the plugin source](/script_src/lipsum.php.html).