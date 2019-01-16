---
id: 1373
title: "Open a file's parent folder as a Project in TextMate"
date: 2010-05-27T22:31:55+00:00
layout: post
guid: http://top-frog.com/?p=1373
permalink: /2010/05/27/open-a-files-parent-folder-as-a-project-in-textmate/
categories:
  - TextMate
---

<div class="alert warning">
**NOTICE:** This is long since obsolete with the addition of the `mate` command line helper.
</div>

<img class="alignright" src="/assets/TextMate-icon.png" alt="TextMate Icon" title="TextMate-icon" />So, I can't count how many times I've opened a single file for editing in TextMate and then realized that I need to do more than just edit that one file. And most of the time the other files that I need to edit are in the same folder as the file that I'm currently editing. Rather than head back out to the finder each time I do this I finally wrote a command to do it for me. The following code will close the current document and open its parent folder as a TextMate project. 



So, create a new command in your personal Bundle (you do have your own bundle where you store common snippets and commands, right? I keep mine [here](http://github.com/Gipetto/sp_general.tmbundle)) and create a new command. Paste the following in to the Command(s) box:

``` shell
#!/bin/bash

# safeguard against the vars changing after closing the frontmost file
CURRENT_FILE=$TM_FILEPATH
CURRENT_DIR=$TM_DIRECTORY
CURRENT_LINE=$TM_LINE_NUMBER

# close the file
/usr/bin/osascript -e "tell application \"TextMate\" to close (every window whose name is \"$TM_FILENAME\")"

# open the project and file
mate "$CURRENT_DIR"
mate -l $CURRENT_LINE "$CURRENT_FILE"
```

Set the Input select box to &#8220;None&#8221; and the Output select box to &#8220;Discard&#8221;. Set a key equivalent if you'd like, I found that `control-option-command-o` works pretty well for me. Move focus in the bundle editor to a different bundle to save your changes and then close the bundle editor.

Now when you've got a single file open you can quickly get its containing folder open as a project. 

#### Bonus Tip

I know you've been there. You have to remote edit a few files (yeah, sometimes it just can't be avoided) so you've opened your favorite FTP client and used its &#8220;Open in external editor&#8221; feature to open a file or two in TextMate. But you've already got a few windows open and you're starting to get cluttered. No problem. With this command you're covered. After you open the first file in TextMate issue this command to open the file's parent folder as a project. The file will be closed when the project opens (at least it was when I tested this with Cyberduck) but after you return to your FTP client and re-open that file and then open some other they'll all open in the project window instead of separate windows. This is a huge brain saver if you're trying to work with more than a few remote files.
