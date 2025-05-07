---
title: SP Highlight Source
---

## SP Highlight Source

<div class="alert warning">
    <p><b>Notice:</b> This plugin is no longer maintained, but I think still serves as a decent plugin example from its time. Don’t use it. Its not worth it.</p>
</div>

The SP Source Code Highlighter WordPress plugin is a free plugin that taps the power of the Pear <a href="http://pear.php.net/package/Text_Highlighter" title="Pear Text_Highlighter class">Text_Highlighter</a> class to provide attractive and layout friendly code blocks for your blog.

Usage is very straight forward and is designed to provide a backwards compatible method of providing source code sections in your posts. The plugin looks for `<code>` blocks in your post and converts and colors them according to a class name applied to the code block.

Is it a new idea? No. Is it unique? No, in fact, there are other plugins that boast more configuration options and more languages to highlight. Is it lightweight and fast? Absolutely. The Text_Highlighter package, though a bit limited, is very efficient and that keeps server loads way down. This is the main reason why I prefer to depend on an outside package.

#### Example

Your code must be entity escaped so that it can be properly processed as well as to provide for backwards compatibility (should you ever decide to not use the plugin, your code blocks will still display the source instead of disappearing in to the page).

Enter the code in your post like this, taking special care to encode the base HTML entities:

``` html
<code type="html">
&lt;h1 class="section-head"&gt;Headline!&lt;h1/&gt;
&lt;p&gt;my sample paragraph&lt;p/&gt;
</code>

<code type="sql">
SELECT * FROM users WHERE clue > 0;
</code>
```

To have it output to the page like this:

``` html
<h1 class="section-head">Headline!</h1>
<p>my sample paragraph</p>

SELECT * FROM users WHERE clue > 0;
```

Splitting code between sequentially numbered blocks is not yet supported but since I want that functionality myself its on the list of things to do. I just want to do it right since those dorks decided to deprecate the “start” attribute on ordered lists (but that’s a whole ’nother rant).

You'll need to manage your posts in source mode (HTML) and not use the visual editor. Using the visual editor can cause issues with the character encodings needed to maintain the separation of the source code from the rest of the post.

#### Supported Languages
The Pear Text_Highlighter class supports a myriad of languages. In the event that a language is specified that is not supported HTML is used as a fallback. If your language is not represented here chances are that there's one that does an adequate job.

- JavaScript
- PHP
- HTML
- CSS
- XML
- Ruby
- Python
- SQL
- PERL

#### Form Fitting Display Widths

Not all source code wraps nicely, that’s why instead of wrapping the source is instead clipped until the user mouses over the text. Mouse over the diff below to see an example of the auto-expanding div width. Currently it only expands out to the right. We'll leave multi-direction expansion for a later release.

``` diff
Index: /Users/me/Sites/wp/wp-content/plugins/sp-highlight-source/sp-highlight-source.php
===================================================================
--- /Users/me/Sites/wp/wp-content/plugins/sp-highlight-source/sp-highlight-source.php	(revision 9)
+++ /Users/me/Sites/wp/wp-content/plugins/sp-highlight-source/sp-highlight-source.php	(working copy)
@@ -65,6 +65,11 @@

if(!array_key_exists($type, $sph_highlighters)) {
$types = array(
+	"abap" => "ABAP",
+	"java" => "JAVA",
+	"cpp" => "CPP",
+	"diff" => "DIFF",
+	"dtd" => "DTD",
"js" => "JAVASCRIPT",
"javascript" => "JAVASCRIPT",
"php" => "PHP",
```

#### Configuration Options

Currently there are none. Its a highlighted ordered list of the syntax. There will be options for toggling the line numbers on and off in the future and an easier way to override the default CSS.

#### What About Pear?

Depending upon a Pear package is definitely not the best decision as far as portability, however it does provide the most robust options for the highlighting of source files. Since I have control over my servers and ultimately this plugin was built for me I decided that the reliance on Pear wasn't enough of a drawback to exclude its use.

If you don't have Pear installed but have access rights to manage and install Pear packages, read up on the <a href="http://pear.php.net/manual/en/installation.php">Pear documentation</a> and you’ll be getting started faster than you think.

If you don’t have command line access to your server or you don't have rights to install Pear packages on your host then try contacting your hosting provider. Text_Highlighter is a pretty innocuous package and there shouldn't be many, if any, arguments against your host installing it for you (unless they flat prohibit the installation and use of Pear packages). Point them here or provide them with the source of the plugin so that they have a better idea of how the package will be used as this could help with their decision to help or not.

#### Download and Installation

<a href="/dl/plugins/sp-highlight-source-0.5.zip">Download the plugin files</a>.

To install:

- Upload the folder `sp-highlight-source` to your `wp-content/plugins` folder. This plugin also works from the WordPress MU mu-plugins folder.
- Activate the plugin through the Plugins page in the WordPress Admin
- When writing a post or page, wrap your source code inside `<code class="type">...</code>` tags where `type` is the language type presented within the code block. Make sure your source code’s `<` and `>` entities have been encoded to `&lt;` and `&gt;` to prevent them from rendering in the final HTML output. 

Though I forgot to include a statement in the plugin itself this plugin is distributed under the GPL.
