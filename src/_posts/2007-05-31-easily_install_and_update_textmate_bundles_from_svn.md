---
id: 213
title: Easily install and update TextMate bundles from SVN
date: 2007-05-31T10:36:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=213
permalink: /2007/05/31/easily_install_and_update_textmate_bundles_from_svn/
categories:
  - Computers
tags:
  - bash
  - bundle
  - command
  - install
  - line
  - script
  - subversion
  - svn
  - textmate
  - tmbundle
  - update
---

<div class="alert warning">
  <p>This script was rendered obsolete by newer versions of TextMate and is no longer available.</p>
</div>

I'm lazy. I'll admit it. It comes at weird expenses though. I'm too lazy to remember the subversion commands for updating TextMate bundles and keeping the support folder up to date, and the GetBundle bundle never seems to completely update or remember what it has updated, so I spend time learning how to script the damn thing via bash. Weird. But handy.

~~tmbundle.sh~~ is the result of that effort. Its a pretty simple bash script that allows for listing available bundles, installing a bundle, and updating all installed bundles. This script is only for items from the Subversion repository of TextMate bundles, so if you haven't pulled the SVN version of the `HTML.tmbundle` it will not update the default bundle that shipped with TextMate. It will not update a bundle that you have not already pulled from the SVN repository. Install only allows for installing one bundle at a time (I haven't researched function overloading in bash yet).



#### Listing available bundles

``` sh
./tmbundle.sh list
```

This will show all bundles available in the SVN repository.

#### Installing a bundle

``` sh
./tmbundle.sh install XML
```

This will install the XML bundle. The script will assume the `.tmbundle` extension if its not given, so telling it `XML.tmbundle` is the same as telling it just `XML`. Long names with spaces need to be encapsulated in quotes. So, for example:

``` sh
./tmbundle.sh install "JavaScript Prototype & Script_aculo_us.tmbundle"
```

Any install will automatically update the bundle support folder so that any dependencies are met.

#### Updating bundles

``` sh
./tmbundle.sh update
```

This will update all the bundles that you have installed from SVN as well as the bundle support folder. If you need to just update one bundle, do an install instead.

#### Conclusion

So, that's it. Pretty simple and nothing fancy. I'm sure others could easily improve on this or even encapsulate it in an automator action or maybe even using [Pashua](http://www.bluem.net/downloads/pashua_en/). For now, though, this works gangbusters for me, and hopefully helps one or two of you out there as well.
