---
id: 1308
title: Post Password Token plugin for WordPress version 1.2 released
date: 2010-05-20T08:32:03+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1308
permalink: /2010/05/20/post-password-token-plugin-for-wordpress-version-1-2-released/
categories:
  - Plugins
tags:
  - custom post type
  - help center
  - passwork
  - post
  - post password token
  - post type
  - token
  - type
  - wordpress
  - wordpress help center
  - wphc
---
I'm happy to announce that version 1.2 of the [Post Password Token](/projects/post-password-token/) plugin for WordPress is ready to go and [available for download from the WordPress Plugin Library](http://wordpress.org/extend/plugins/post-password-plugin/). If you already have it installed you just might have an upgrade notice on your plugins page.

Version 1.2 adds support for Custom Post Types and allows the token functionality to be enabled or disabled for Posts and Pages. In WordPress 3.0 this will also allow custom configuration of the newly exposed Custom Post Types as well (pending that you're using that feature). Simply select which post types you want the plugin to work on in the Settings page.

This version also fixes a couple of security issues. **First:** The settings page has been hardened against the possibility of Cross Site Scripting Forgeries. Not that it was a huge deal before since this plugin doesn't advertise itself on your blog in any way, but its nice to know that we're protected. **Second:** The settings page in the admin is not exposed to users who do not have the privilege to manage-options. The settings page wouldn't display for these users before but the menu item was still there. Now the plugin doesn't expose itself at all to users who don't have the privileges to use it.

Version 1.2 supports the upcoming WordPress 3.0 release and deprecates support for WordPress versions earlier than 2.8. It probably still works on 2.6 & 2.7 but, frankly, I don't want to test on those versions any more.

<p style="text-decoration: line-through">
  Lastly, and this was a change that I actually snuck in with the last minor release, support is now being handled through <a href="http://wphelpcenter.com">The WordPress Help Center</a> (<a href="http://wphelpcenter.com/plugins/post-password-token/">the PPT page on WPHC</a>). The WordPress Help Center is pretty much a one stop shop for troubleshooting any issues you may have with using or managing your WordPress install and can also be hired on for small design and development tasks. Give 'em a look see. I bet you'll like them ;).
</p>

**Edit:** WPHelpCenter is dead.