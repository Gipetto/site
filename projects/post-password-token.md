---
layout: page
title: Post Password Token Plugin for WordPress
section: projects
---
The Post Password Token plugin lets you issue secret urls that allow readers to access protected content without having to enter a password. It extends the default WordPress post password protection functionality by creating secret urls to the post that have an encoded token. This is similar to the guest pass functionality that can be found on Flickr.

<a class="darr" href="#download">Skip to download link</a>

####  Who is it for?

Sometimes you would like to share your blog posts with a specific group of people, but not with the wider world. For example, a family might want to blog about their adventures together for friends and family, but would rather not broadcast this to everyone. WordPress provides for this scenario by allowing you to password-protect a post. Unfortunately, we've found through experience that a lot of our friends never make it past the password form. Either they mis-type the password, are confused about what it is, or are simply scared off by an intimidating form.

The solution: give password-protected posts a secret url that can be shared with friends and family. The url allows your select audience to see the content without the confusion and hassle of an authentication form, while hiding the special content from search spiders and the wider-world. You can revoke secret urls at any time, so if a secret url gets to someone you don't want it to, you can simply invalidate it.

#### The Details

The encoded tokens are made by taking the post-name and post-password and encoding them together. The plugin's admin page also allows you to create a &#8220;salt&#8221;, or a unique key that makes the resulting encoded token more secure. Please note that once the salt option is set, changing it will change the secret urls for all posts. Unless you want to invalidate all of your old secret urls, it is recommended that you set the salt and leave it.

#### Frequently Asked Questions

So, what do I have to do?
: Not much. After you install the plugin all you have to do is set a password on a post using WordPress' standard <a href="http://codex.wordpress.org/Content_Visibility">Password Protection Functionality</a>. After the password is set and you've saved the post there will be a new meta box on the post edit screen (in the center content area, below the post-content editor) that will present you with a full URL to the post including the token. Distribute this URL to give people automatic access to your post.

Does the normal password functionality still work?
: Yes, this still functions as normal. Accessing a password-protected post by its standard url will still show the expected password dialog, but when a reader accesses a password-protected post by its secret Password Token url, they will be automatically authenticated and be able to see the full content.

Do I have to do anything special to generate tokens for my old password-protected content?
: No. Since the tokens aren't stored but instead generated when needed there's no need to to do anything but navigate to the post edit page for your protected post to retrieve your token.

How long does a secret url last?
: The url itself lasts forever, unless you change it. Additionally, accessing a post by its secret url will set an authentication cookie for the user that lasts for 10 days.

Can I have a single token for all protected content?
: Not yet.

How do I revoke a secret url?
: If you need to revoke the secret urls for an individual post, you can simply change the post password. Once you save the post it will create new secret urls and invalidate the old ones: the old url will no longer automatically log readers in and they'll be asked to enter a password if they use that URL. You can also revoke all secret urls site-wide (the &#8220;nuclear&#8221; option). To do so, go to the plugin admin page and change the password salt.

Does this work with caching plugins such as WP Super Cache?
: Yes. The token in the URL triggers a unique cache. Be aware that this does create a potential security risk. Not huge, but potential. If you don't want these pages cached then use the settings in your caching plugin to keep urls with <code>ppt=</code> in the url from being cached.

#### Download {#download}

The Post Password Plugin is hosted at the <a href="http://wordpress.org/extend/plugins/post-password-plugin/">WordPress.org Plugins Directory</a>.

#### Support

The Post Password Token plugin is supported back to WordPress 3.0. Older versions of WordPress are not supported and will not be.
