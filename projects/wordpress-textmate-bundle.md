---
layout: page
title: WordPress TextMate Bundle
section: projects
---

<div class="alert warning">
    <b>Notice:</b> This plugin was last updated in April of 2014. I no longer work in WordPress every day, and TextMate isn't used as much as it used to, so this plugin is not longer in active development.
    
    If you'd like to take over this plugin do let me know.
</div>

<img src="/assets/articles/bundle-announce-header.png" alt="WordPress TextMate Bundle Screenshot" aria-hidden="true" />

The WordPress TextMate Bundle is a <a href="http://macromates.com">TextMate</a> bundle built with the sole purpose of reducing the amount of time spent digging around the <a href="http://wordpress.org">WordPress</a> core to look up the little things that we work with every day.

<a class="darr" href="#download">Skip to download link</a>

The plugin features auto-completion of WordPress functions, snippets for common sections of code, and templates for WordPress components. We even snuck in function completion for the Carrington theme framework functions. We're always making improvements as we find more that we want covered by the plugin (merged from WordPress MU with the WordPress 3.0 code base consolidation).

#### Features {#features}

- Auto-completion of WordPress functions with parameter hinting.
- Parameter hinting for common functions like `[get_]bloginfo()` and query vars.
- Snippets of common page and plugin parts like widget blogs, admin menus, and loops.
- Templates for some WordPress components like plugins and page templates.
- Carrington Blog function completion support
- Fully tab stopped parameter entries in function templates
- Function definition tool-tips
- Goto function command to jump to file and line number where a function is defined
- Validation of your Plugin's `README.txt` file against the WordPress online validator
- Multisite support starting with WordPress 3.0 (codebase merge from WordPress MU)
- Internationalization of strings in proper context
- Custom Post type functionality as refined in WordPress 3.0

#### Function Completion {#function_completion}

General function completion can be invoked with a slight modification of the regular PHP function completion. We chose to use `Control-Shift-Escape` as its easy to remember next to the regular PHP command (`Option-Escape`). The completed function will include parameter hits for the function as best as my simple grep of the core will allow. I'm still trying to build a better way of grabbing comprehensive function definitions.

It does leave just a little bit to be desired. It doesn't distinguish between classes, functions and methods, and though it does filter out &#8220;magic&#8221; &amp; private methods (those prefixed with an underscore), it does index all function declarations it finds. And I believe that there's a stray JavaScript function or two in there. ;)

&#8220;Common&#8221; function prefixes are duplicated in to their own commands. They all pull from the same function definition list, but offer a limited scope search. These limited scopes are available for:

- `get_⇥` , ie: `get_permalink`, `get_post_meta`
- `is_⇥`, ie: `is_home`, `is_search`
- `the_⇥`, ie: the<em>post, the</em>title
- `wp_⇥`, ie: `wp_cache_add`, `wp_themes_dir`
- `esc_⇥`, ie: `esc_attr_e`

Functions that have many options or required a bit of special attention have been expanded in to their own completions:

- `bloginfo⇥` & `get_bloginfo⇥` for bloginfo vars
- `wp_list_pages⇥` for listing pages and providing a standard starting point
- `get_posts⇥`
- `wp_query⇥`
- `metadata⇥` for quick access to the WordPress metadata apis
- `remote⇥` for quick access to the `wp_remote_*` functions 
- `cache⇥` - for quick access to the `wp_cache_` functions
- `transients⇥` - for quick access to the transient functions

Each of these is invoked with a tab trigger, for example: `wp_⇥`
We can't (yet) look at the current project to pull in any custom defined functions (ie: in plugins and theme function files), but we're working on that possibility.

#### Function Definitions {#function_definitions}

Function definitions can be brought up by selecting or setting the carat inside the function that needs to be defined and then using `Command-Shift-H` to bring up the function definition dialog.

#### Support WordPress Features {#support_wordpress_features}

- `custom_post_type⇥` & `cptm⇥` - Snippets for adding a custom post types and customizing the edit screen messages
- `shortcode⇥` - snippet for generating shortcode functions
- `thumbnail⇥` - shortcut to display post_thumbnail related functions
- `taxonomy⇥` - shortcut to display taxonomy related functions
- `add_theme_support⇥` & `remove_theme_support⇥` - enabler functions for some built in WordPress features

#### Multisite Functions {#multisite_functions}

WordPress 3.0 finally merged the WordPress MU code base in to the WordPress core. So now we have easy access to the MU functions (ie: I was too lazy before to scrape the MU code base separately) with `wpmu_⇥`.

#### Goto Function {#goto_function}

When pointed to an install of the current version of WordPress the bundle can jump to the definition of a function so that the function can be inspected.

Simply place the carat in a function name, or highlight the function, and press `Command-Shift-Option-H`. If needed (and it will be the first time you run the command) you'll be directed to enter the full path to your WordPress (or WordPress MU) install in the Preferences (`Command-Option-,`) before the function completion can work properly.

#### Template Snippets {#template_snippets}

The bundle includes snippets for some common operations we encounter during WordPress development. These include:

- `plugin_head⇥` - Insert plugin header
- `adminmenu⇥` & `adminsubmenu⇥` - Add admin menu/submenu
- `widget⇥` - Add widget and widget control for WordPress 2.8+
- `widget-old⇥` - Add widget and widget control for versions older than WordPress 2.8
- `nwpq⇥` New WP_Query
- `theme_head⇥` - Theme head
- `comment⇥` - Comment template
- `commentform⇥` - Comment form template
- `post⇥` - Post template
- `sidebar⇥` - Sidebar template
- `wp-config⇥` - a full blown WP config file with all the possible options represented
- `readme⇥` - a sample plugin readme file

#### Actions &amp; Filters {#actions_filters}

We've also included a complete list of built in WordPress Actions &amp; Filters so that using `add_action⇥` or `add_filter⇥` brings up a pre-compiled list of available actions and filters. 

#### Scripts &amp; Styles {#scripts_styles}

By typing `enqueue⇥` you'll be presented with a list of options for enqueuing scripts and styles. All the standard script options are included when using the straight enqueue option, or a parameter hinted function template can be inserted for enqueuing custom scripts.

There are also shortcuts for `register_style⇥` and `register_script⇥` for access to `wp_register_style` and `wp_register_script` respectively.

#### User Roles {#user_roles}

Who can ever remember all the user role levels? Now you don't have to. With `user_can⇥` you'll be presented with all the available user role levels to choose from. 

#### Common Variables {#common_variables}

Included are functions for quickly accessing common object members for post objects, query objects and the database object. The currently available completions are:

- `qv1⇥` for query vars
- `pv⇥` for post vars
- `wpdb⇥` for wbdb vars and methods
- `wp_query⇥` for wp_query vars and methods

#### Internationalization {#internationalization}

Strings can be wrapped in internationalization functions using the shortcut `command-shift-i`. Strings are wrapped according to their proper context:

- selected text inside single or double quotes is appropriately broken out of their quotes and added to `__()` function
- selected strings, including their quotes, are added to an `__()` function 
- selected text in HTML scope are added to a `<?php _e(); ?>` block

A quick blog post writeup of the feature <a href="http://top-frog.com/2010/05/21/new-internationalization-feature-in-the-wordpress-textmate-bundle/">is here</a>.

Starting with version 3.0 of this bundle the TextMate Shell Variable `WP_TEXT_DOMAIN` is pulled (if present) and is used for the text-domain.

#### WP-Cron {#wp_cron}

For some wp-cron can be a bit of a mystery. With the help of <a href="http://articles.sitepoint.com/print/wordpress-scheduling">Sitepoint.com's article on scheduling events</a> this was demystified for me. I've used that article to build in some helpers for working with wp-cron's system. Available triggers are:

- `register_event⇥` - register a one time event
- `schedule_event⇥` - register a recurring event
- `register_schedule⇥` - register a new time schedule for the cron system
- `clear_scheduled⇥` - unschedule a recurring event
- `clear_event⇥` - unschedule a one time event

#### Plugin README.txt Creation &amp; Validation {#plugin_readmetxt_creation_validation}

Use `readme⇥` to drop in a template of the WordPress plugin `README.txt` file.

`README.txt` validation just got a little bit easier. The bundle includes functionality to validate your `README.txt` file without leaving TextMate. Once validated the `README.txt` can be modified in the validation window and resubmitted if necessary.

#### Shell Variables {#shell_variables}

Why bother typing your name and URL each time you create a new plugin or theme? Set these Variables in TextMate <em>(Preferences > Advanced > Shell Variables)</em> to have them automatically replaced with the values you specify:

- `TM_NAME`
- `TM_HOMEPAGE`

#### And more&hellip; {#and_more}

There's even more included that's not yet mentioned here. Just browse through the bundle menu to see everything that's available and play around with some of the function completions to see the multiple-levels of assistance that it provides.

#### Version Compatibility {#version_compatibility}

The bundle will be kept up to date with WordPress' latest release. There will be no conscious effort made to retain backwards compatibility in the current version of the bundle. If you need legacy support the last available bundle build for a version of WordPress will be tagged for backwards compatibility. Look at the github project page for this bundle and look at the available tags to see which backward versions are available.

#### Bugs/Suggestions {#bugs_suggestions}

If you find a bug, would like to see a feature implemented, or would like to contribute a feature to the project please use the <a href="http://github.com/Gipetto/wordpress.tmbundle/issues">Issue Tracker</a> over at our GitHub project page. We're not opposed to anything, though you may have to put up with our ideals in how we like to implement things ;)

#### Download {#download}

- <b>GetBundles</b> (preferred method): The bundle is accessible in a couple of ways. If you use GetBundles you already have access to it. Look for the WordPress bundle authored by Gipetto and install it. GetBundles also keeps the TextMate support libraries up to date so this is the preferred option. Not using GetBundles? <a href="http://al3x.net/2008/12/03/how-i-use-textmate.html">Alex Payne</a> includes GetBundles in a good writeup that includes a few other must have items for TextMate.

If you don't use GetBundles then skip on over to the <a href="http://github.com/Gipetto/wordpress.tmbundle/tree/master">Project page</a> over at GitHub. There you'll have a couple of options:

- <b>Git:</b> If you're familiar with Git then grab the Public Clone url and pull the plugin down to your `~/Library/Application Support/TextMate/Bundles` directory (its OK to create this structure if it doesn't exist). Reload your bundles or restart TextMate to load the bundle.
- <b>Direct download:</b> If you don't do Git then click on the download link and pull down your preferred compressed format. Decompress it to `~/Library/Application Support/TextMate/Bundles` (its OK to create this structure if it doesn't already exist). Reload your bundles or restart TextMate to load the bundle.

#### Please Donate {#donate}

Donations buy donuts. Donuts help keep us motivated. When we&rsquo;re motivated we make plugins. Please help keep us motivated to make more useful contributions to the coding community.

<div id="paypal">
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
		<input type="hidden" name="cmd" value="_s-xclick" /><br />
		<input type="hidden" name="hosted_button_id" value="6908957" /><br />
		<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" /><br />
		<img alt="" border="0" src="{{ site.baseurl }}/assets/pixel.gif" width="1" height="1" /><br />
	</form>
</div>
