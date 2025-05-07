---
title: JQuery Togglr Plugin
---

<div class="alert warning">
    <p><b>Notice:</b> This plugin was written in 2013. With the state of modern browser features this plugin is overkill. A few lines of vanilla javascript and some css can take the place of this plugin. Figure it out. You'll be glad you did.</p> 
</div>

The jQuery Togglr Plugin is designed to eliminate some of the redundant code that we end up using a lot at work. A lot of admin areas in WordPress benefit from the ability to show and hide content. With the Togglr Plugin this can be achieved quickly and consistently and it degrades nicely if some other plugin kills your javascript.

#### Usage

Usage is very simple. The Togglr attaches to an anchor element and uses its href attribute as a pointer to a div that it will toggle. For example this is all you need to get started:

```html
<script type="text/javascript">
  jQuery(".toggl").togglr();
</script>

<a class="toggl" href="#my-div">My Div</a>
<div id="my-div"><p>Content here</p></div>

<a class="toggl closed" href="#my-div-too">My Other Div</a>
<div id="my-div-too"><p>Content here</p></div>
```

In this example the links will be appended with “Show” or “Hide” depending upon their toggled status. The 2nd div, `#my-div-too`, will start in a closed state.

#### More Advanced Example

In this example we’ll set custom text to signify the open/close action and provide a callback function.

```html
<script type="text/javascript">
  opts = {showtext:"Expand",hidetext:"Contract","callback":myCallback};
  jQuery(".toggl").togglr(opts);
  myCallback = function(){ alert("hello from" + this.id); }
</script>

<a class="toggl" href="#my-div">My Div</a>
<div id="my-div">Content goes here</div>
```

The link will read “Expand My Div” or “Contract My Div” depending upon the toggle state. Upon completion of the animation the callback function will be called and 'this' within the function will be the target div.

#### Options

Options are:

- type: slide/show, defaults to slide<br />Slide and show are the built in jQuery slide and show effects.
- speed: slow/normal/fast, defaults to normal<br />These are the built in jQuery effects speeds.
- callback: function to be passed to the toggle function as a callback
- showtext: "show" text, prepended to link HTML when target is closed
- hidetext: "hide" text, prepended to link HTML when target is open
- openclass: class to identify targets with when they are open
- closedclass: class to identify targets with when they are closed

#### Get it here

Check out the <a href="http://gipetto.github.io/jquery.togglr.js/" target="_blank" rel="external" rel="noopener">Togglr Plugin in action</a>.<br /> The source can be grabbed from <a href="http://github.com/Gipetto/jquery.togglr.js" target="_blank" rel="external noopener">the jQuery Togglr GitHub Project Page</a>.
