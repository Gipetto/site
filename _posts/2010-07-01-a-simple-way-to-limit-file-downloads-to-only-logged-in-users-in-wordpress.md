---
id: 1344
title: A simple way to limit file downloads to only logged in users in WordPress
date: 2010-07-01T12:51:38+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=1344
permalink: /2010/07/01/a-simple-way-to-limit-file-downloads-to-only-logged-in-users-in-wordpress/
categories:
  - 'Web Design &amp; Development'
  - WordPress
tags:
  - download
  - file
  - filter
  - htaccess
  - mod_rewrite
  - php
  - protect
  - rewrite
  - wordpress
  - wp_list_pages
---
So, you've used WordPress to build your client's site and to provide downloads for the site's users. You're hiding the links to download content based on the user's logged in status. Great. But what happens when the logged in user copies the download URL and sends it to his friend? Well, unless you're filtering the download links and checking them with WordPress first his friend gets to download the file.

I'm not a big fan of checking every file download with WordPress as it can take a lot of overhead if you're running a busy site. So here is a pretty straight forward way to limit downloads from a WordPress site with a minimal amount of code. In this example I'll illustrate how to prevent non-logged in users from downloading audio files in `mp3` and `m4a` format.

<!--more-->

## Basic Blocking

First, lets use some ModRewrite rules to get Apache to show users a 403 forbidden page when trying to access the files. This isn't pretty, it simply gets Apache to dump the user in to a default 403 page and the user is told that their access is forbidden. **The .htaccess changes:**

``` apache
# These next two lines will already exist in your .htaccess file
RewriteEngine On
RewriteBase /
# Add these lines right after the preceding two
RewriteCond %{REQUEST_FILENAME} ^.*(mp3|m4a)$
RewriteCond %{HTTP_COOKIE} !^.*wordpress_logged_in.*$ [NC]
RewriteRule . - [R=403,L]
```

On the first line of this code you'll see `(mp3|m4a)`. This is the part that looks at the ending of the file name and determines which files it will act upon. replace the items inside the parentheses with the file types that you want to protect, each one separated by the pipe character. So, for example, if you wanted to protect PDF and RTF files you'd change it to: `RewriteCond %{REQUEST_FILENAME} ^.*(pdf|doc)$`

That is really all we need but its not very nice to dump the user like that and not inform them of why they were forbidden. They may assume that the site is broken. So lets do this the right way and get the users redirected to a page that will inform them of why they were denied access to the content.

## Redirecting the Access Denied

For this we'll need a page template. You can create anything you'd like, but the basics of it are: 

``` php
<?php
/**
 * Template Name: 403
 *
 * The template for displaying 403 pages (Forbidden/Not Allowed).
 */
get_header(); ?>
<div id="container">
	<div id="content" role="main">
		<div id="post-0" class="post error403 not-allowed">
			<h1 class="entry-title"><?php _e( "Action Not Allowed", "twentyten" ); ?></h1>
			<div class="entry-content">
				<p><?php _e("Apologies, but you are not allowed to download files while not logged in.", "twentyten"; ); ?></p>
			</div><!-- .entry-content -->
		</div><!-- #post-0 -->
	</div><!-- #content -->
</div><!-- #container -->
<?php get_footer(); ?>
```

Your template will obviously look a bit different. I did this one as an extension to the new Twenty Ten theme in WordPress 3.0 and based it off of the provided 404 template.

Save the file to your theme's directory. It doesn't matter what you name it. WordPress will actually pick up on the `Template Name: 403` portion as the template ID. 

Next we need to create a page in the WordPress admin for our notification page. Create a new page, name it whatever you want. For my purposes I titled the page &#8220;Not Allowed&#8221; so my slug ended up as &#8220;not-allowed&#8221;. You can edit these to be any values you want if the page title created a slug that you don't like. You'll need that slug here in the next step. Next select the 403 page template from page templates select input in the Attributes meta box (typically on the right side of the page, underneath the Publish button. Publish the page.

Now let's alter that `.htacess` directive to redirect to this page instead of showing that unfriendly Apache notice. The modified directives are:

``` apache
RewriteCond %{REQUEST_FILENAME} ^.*(mp3|m4a)$
RewriteCond %{HTTP_COOKIE} !^.*wordpress_logged_in.*$ [NC]
RewriteRule . /not-allowed [R,L]
```

The relevant change happened on the third line where the dash was replaced by the relative url to my 403 page. In my case that is `/not-allowed`. Yours will differ depending upon how named your page. Don't forget the leading slash when adding your slug so that it's a valid relative path. (This can be an absolute path as well, ie: one that contains the full `http://domain.com/blah-blah` but there's no need to do that here unless you've got valid reason to do so, like if you want to redirect the user to a different domain).

Now, whenever someone who is not logged in tries to download a file type that you've specified they'll be redirected to your 403 page. What you tell them there is up to you.

## But&hellip;

&hellip;now, if you're theme lists out pages anywhere, you've got this 403 page sticking its nose in where it doesn't belong. Not very pretty, now, is it? This is pretty easily remedied. Head on in to the WP Admin and to the page edit screen for the 403 page. Take note of its page ID in the url. It will be the number after the word `post=` in the url. For example, if your URL looks like `http://wp30.local/wp-admin/post.php?post=8&action=edit` the post id is **8**.

We now need to make an addition to your theme's `functions.php` file. This file is located in your theme directory. Open this file and add in the following code:

``` php
// Do error page excludes
function exclude_error_pages($excludes) {
	array_push($excludes, 8);
	return $excludes;
}
// we don't want any funny stuff in the admin, only add to front end
if (!is_admin()) {
	add_filter('wp_list_pages_excludes', 'exclude_error_pages');
}
```

On the line that says `array_push($excludes, 8);` replace the `8` with the id of the page you just created. This will keep the function `wp_list_pages()` from outputting the 403 page in any of its lists. 

**Note:** if you've got other places in your theme that are pulling page lists through different means you'll want to modify or filter those results as well. Depending upon the methods used to make the lists you can probably exclude the page as a parameter of the call for pages instead of using a filter. Your mileage will vary, but it is certainly doable.

## Ta da!

And there you have it. Simple and straight forward. No real frills, though. As it sits now the user is redirected to a page that just tells then simply that they need to be a logged in user. That's not very informative all by itself. There are a hundred ways to modify this to make it more convenient on the user.

Hopefully this gives you some ideas on what can be done to help legitimate users get to your content while keeping the rif-raff from poaching it.