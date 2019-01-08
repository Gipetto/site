---
layout: page
title: WordPress Clippings for BBEdit
section: projects
---

<div class="alert warning">
    <b>Notice:</b> This plugin was last updated in July of 2013. I no longer work in WordPress every day, and TextMate isn't used as much as it used to, so this plugin is not longer in active development.
    
    If you'd like to take over this plugin do let me know.
</div>

This is a Clipping bundle for BBEdit 9+ to help make working with WordPress (hopefully) a lot easier. These clippings will be maintained for the current version of WordPress. No conscious effort will be maintained to provide backward compatibility.

&#x2193; <a href="#download">Skip to download link</a>

Function completion is enabled under the PHP scope.

Please keep in mind that I'm not a regular user of BBEdit, so if something can be done better please don't hesitate to let me know through the contact form here on my blog or through the bug/issue tracker on the GitHub page.

#### Functions {#functions}

Clippings are provided for all functions present in the WordPress standard distribution. No attempt is made at intelligent sorting nor is there a distinction at this time between regular functions and class methods. I think a Javascript function even crept in there somewhere. 

#### Actions and Filters {#actions-filter}

Clippings are also provided for all the Actions and Filters contained within WordPress. The Action and Filter names for selection are formatted as `add_action-action_name` and `add_filter-filter_name`. For those Actions and Filters that pass through more than 1 parameter the number of parameters will part of the function completion. If there is only one parameter as part of the Action or Filter then the parameters parameter is left off.

#### Carrington Functions {#carrington}

If you're doing <a href="http://carringtontheme.com/">Carrington Theme</a> development these extra function helpers should come in handy.

#### Installation {#installation}

Copy the WordPress.php folder in to your `~/Library/Application Support/BBEdit/Clippings` folder and restart BBEdit.

#### Bugs and Suggestions {#bugs-suggestions?}

Should be submitted to: <a href="http://github.com/Gipetto/BBEdit-WordPress-Clippings/issues">http://github.com/Gipetto/BBEdit-WordPress-Clippings/issues</a>

#### Download {#download}

The Clipping bundle is hosted over at GitHub. You can download it or check it out in to your BBEdit Application Support folder. 

<a href="http://github.com/Gipetto/BBEdit-WordPress-Clippings">Get the WordPress Clippings for BBEdit</a>.

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
