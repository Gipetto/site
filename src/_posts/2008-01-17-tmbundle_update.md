---
id: 224
title: tmbundle update
date: 2008-01-17T17:32:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=224
permalink: /2008/01/17/tmbundle_update/
categories:
  - Computers
tags:
  - bash
  - bundle
  - code
  - command
  - install
  - line
  - script
  - svn
  - textmate
  - tmbundle
  - update
---
I've been making incremental updates to my TextMate bundle updater for a while now and can finally publish the updated script. It now properly handles updating installed bundles and adds the ability to update only a single bundle and to list installed bundles.

Read on for the nitty gritty.



The file remains at a new URL: [tmbundle.sh](/script_src/tmbundle.sh.html). Again, this only works with the SVN bundle repository. It will not update the default bundles that ship with TextMate. So be sure that if you need to update a default bundle you need to install it before updating it, however, if you do try to update a non-installed bundle this version of the script will attempt to find and install that bundle. Its not perfect – an error will be ugly, but not harmful. I haven't fully taken advantage of error codes to intelligently handle errors – that will come in a future update.

The scripts basic functions haven't changed, but I'll still do a full description here.

#### Listing available bundles

``` sh
./tmbundle.sh list
```

This will show all bundles available in the SVN repository.

#### Listing installed bundles – NEW

``` sh
./tmbundle.sh list installed
```

This will show all bundles you have currently checked out from the SVN repository.

#### Installing a bundle

``` sh
./tmbundle.sh install XML
```

This will install the XML bundle. The script will assume the .tmbundle extension if its not given, so telling it `XML.tmbundle` is the same as telling it just `XML`. Long names with spaces need to be encapsulated in quotes. So, for example:

``` sh
./tmbundle.sh install "JavaScript Prototype & Script_aculo_us.tmbundle"
```

Any install will automatically update the bundle support folder so that any dependencies are met.

#### Updating bundles

``` sh
./tmbundle.sh update
```

This will update all the bundles that you have installed from SVN as well as the bundle support folder.

#### Updating a single bundle – NEW

``` sh
./tmbundle.sh update XML
```

This will just update the XML bundle. If it does not exist, it will attempt to install it.

#### Auto update TextMate's Bundles menu – NEW

The script will now automatically update TextMate's Bundles menu if TextMate is running. So to use this script you don't have to shut down TextMate or manually refresh the bundles. (Tested and working on OS X 10.5, if I recall there were problems with this on OS X 10.4. I will verify this).

#### Conclusion

Something I forgot to mention in the original version – you'll need to chmod it to make it executable.

``` sh
chmod +x tmbundle.sh
```

So, while the code still has some n00bish methodology in it, it now functions better than before, ie: it actually performs the updates, and tries to make life a bit simpler. Who knows, I might actually use Applescript Studio to put this into a GUI. Probably not, I might try to convince Halbie he can achieve fame and fortune by doing it for me, though.
