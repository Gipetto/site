---
layout: page
title: jQuery Togglr Plugin
section: projects
---

The jQuery Togglr Plugin is designed to eliminate some of the redundant code that we end up using a lot at work. A lot of admin areas in WordPress benefit from the ability to show and hide content. With the Togglr Plugin this can be achieved quickly and consistently and it degrades nicely if some other plugin kills your javascript.

<a class="darr" href="#download">Skip to download link</a>

#### Usage

Usage is very simple. The Togglr attaches to an anchor element and uses its href attribute as a pointer to a div that it will toggle. For example this is all you need to get started:

``` html
<script type="text/javascript">
  jQuery(".toggl").togglr();
</script>

<a class="toggl" href="#my-div">My Div</a>
<div id="my-div"><p>Content here</p></div>

<a class="toggl closed" href="#my-div-too">My Other Div</a>
<div id="my-div-too"><p>Content here</p></div>
```

In this example the links will be appended with "Show" or "Hide" depending upon their toggled status. The 2nd div, `#my-div-too`, will start in a closed state.

#### More Advanced Example

In this example we'll set custom text to signify the open/close action and provide a callback function.

``` html
<script type="text/javascript">
  opts = {showtext:"Expand",hidetext:"Contract","callback":myCallback};
  jQuery(".toggl").togglr(opts);
  myCallback = function(){ alert("hello from" + this.id); }
</script>

<a class="toggl" href="#my-div">My Div</a>
<div id="my-div">Content goes here</div>
```

The link will read "Expand My Div" or "Contract My Div" depending upon the toggle state. Upon completion of the animation the callback function will be called and 'this' within the function will be the target div.

#### Options

Options are:

- type: slide/show, defaults to slide<br />Slide and show are the built in jQuery slide and show effects.
- speed: slow/normal/fast, defaults to normal<br />These are the built in jQuery effects speeds.
- callback: function to be passed to the toggle function as a callback
- showtext: "show" text, prepended to link HTML when target is closed
- hidetext: "hide" text, prepended to link HTML when target is open
- openclass: class to identify targets with when they are open
- closedclass: class to identify targets with when they are closed

#### Get it here {#download}
Check out the <a href="http://top-frog.com/stuff/togglr/" target="_blank" rel="external">Togglr Plugin in action</a>.<br /> The source can be grabbed from <a href="http://github.com/Gipetto/jquery.togglr.js" target="_blank" rel="external">the jQuery Togglr GitHub Project Page</a>.

#### Please Donate
Donations buy donuts. Donuts help keep us motivated. When we&rsquo;re motivated we make plugins. Please help keep us motivated to make more useful contributions to the coding community.

<div id="paypal">
<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
		<input type="hidden" name="cmd" value="_s-xclick" /><br />
		<input type="hidden" name="hosted_button_id" value="6908957" /><br />
		<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" /><br />
		<img alt="" border="0" src="{{ site.baseurl }}/assets/pixel.gif" width="1" height="1" /><br />
	</form>
</div>
