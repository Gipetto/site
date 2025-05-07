---
id: 79
title: Those Pesky Icon Files
date: 2005-05-12T21:56:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=79
permalink: /2005/05/12/those_pesky_icon_files/
categories:
  - Computers
tags:
  - osx
  - icons
  - automator
  - applescript
---
<img class="alignright" src="/assets/articles/launch.png" alt="iTunes Icon" />Now that I've been playing with Tiger for a while I keep finding new uses for Automator. So far its just two things but there's a few more on the drawing board.

However my first hurdle was to get rid of that pesky little robot icon and replace it with something more becoming of the purpose. Don't get me wrong I don't have anything against the little guy, but he's not very appropriate and when you start accumulating little applications like this it is counter intuitive to have a duplicate icons in a folder all identifying different objects.

#### The reasoning

Since I'm opting to keep my iTunes library on a server it is always down to sequence when launching iTunes. I want to avoid those pesky exclamation marks that pop up when a song is played and that song is unavailable to the system. So the server share needs to be mounted before the song is played. This gets tedious to mount the share each time to do this.

This is where Automator comes in. It is a snap to make a routing that I can run to mount the server and launch iTunes. Tip: when defining the volume to mount, include your username and password in the string to get this to work, otherwise the routing will simply run with no error and also no result. That syntax is: `afp://user:pass@server/share`

#### The quandry

Now, with this built I needed to replace the icon. Since I opted to export my workflow as a stand-alone application it has an icns file in its bundle that defines the icon. A traditional copy and paste of the icon won't work properly. I needed to edit the icns file. The editing was the easy part thanks to PhotoShop and Icon Composer (part of the Apple Developer Tools). The hard part was figuring out what to do next.

Being the tinkerer that I am, or maybe destruction artiste is a more apt title, I decided to leave the current icon intact and change the plist file to add a reference to the new icon. This didn't work. 

So, now the easiest way to do this is to rename the old icns file so that it is no longer (technically) an icns file, this can be done by simply changing the file extension by adding to the file name. Put a `.bak` or `.old` on the end and it is no longer a valid file. Now your new icns file into the package and name it what the old icns file was named.

#### Resolution

For me this did not automatically change the icon, nor did a launch of the application force the icon to take effect. What I had to do was paste a new icon in the old fashioned way into the get info window and then undo it. Voila, my icon showed up. Now, I probably jinxed myself by trying to change the plist file the first time around as many websites say that launching the application should get the new icon into use. Hopefully that is true, I haven't tested that theory yet.

Either way, getting a new icon on this application makes it much easier to distinguish. Despite its similarity to the original iTunes icon it still has enough differences to let it be identifiable as something other than iTunes. Maybe I'll change the color a bit to really set it off, but for now this works nicely.
