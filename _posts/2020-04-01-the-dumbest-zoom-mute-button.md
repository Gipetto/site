---
title: 'The Dumbest Zoom Mute Button In The World'
date: 2020-04-01T13:28:00+00:00
layout: post
categories:
  - Computers
tags:
  - zoom
  - mute
  - ruby
---

Now that we're all stuck at home and working more and more on video conferencing, and most of us on Zoom as they appear to have won the video conferencing war (despite their privacy bungles). On top of that, I'm often not totally paying attention all the time (I'm writing this during an engineering wide ops meeting), so I'm noticing that despite the various shortcuts available in Zoom my ability to quickly mute and unmute is severly lacking.

While clearing out my desk space and making room to effectively work I noticed this old usb Big Red Button from Dream Cheeky. It was purchased many years ago by a co-worker so that we could make fun of a different co-worker, but that time is now long gone. 

I remembered that there was a Ruby library for interfacing with the button, which is a simple USB HID device. So with a little bit of quick googling on Applescipt libraries in Ruby I was able to crap out a bare bones event listener. Here's the crappy code:

``` ruby
require 'rubygems'
require 'dream_cheeky'
require 'applescript'

DreamCheeky::BigRedButton.run do

    push do
        script = <<-KEYPRESS
tell application "zoom.us"
activate
    tell application "System Events"
        keystroke "a" using {shift down, command down}
    end tell
end tell
KEYPRESS

        AppleScript.execute(script)
    end

end
```

Its not even a managed application, I just launch it with `ruby mute-button.rb` and let it run in a terminal window that gets minimized in to my dock. 

<span class="frame">
<img class="frame" src="/assets/articles/mute-button-large.gif" alt="Mute!" role="presentation" />
</span>

It will run amok if I unplug and go to work downstairs, but the laptop's fans kindly remind me when I've done this.

I know this can be better, but for just pulling something out of a drawer and banging out a little bit of code I'm quite happy and it means that I can continue to divert my attention during meetings and push down the MTTR on my attention span.
