---
id: 205
title: Classes for file uploading in PHP
date: 2006-12-22T13:18:00+00:00
layout: post
guid: http://top-frog.com/?p=205
permalink: /2006/12/22/classes_for_file_uploading_in_php/
categories:
  - PHP Scripting
tags:
  - class
  - code
  - file
  - oop
  - php
  - php5
  - script
  - upload
---
Surprisingly, I still get a lot of referrals from ~~[The Stickman](http://the-stickman.com/web-development/javascript/upload-multiple-files-with-a-single-file-element/)~~ for his work on a multi-file javascript upload helper on which I briefly assisted on Safari compatibility. The script adds and removes file upload form elements as requested by the user. So a form can be designed to handle as many uploads as you'd like and the user can have up to that many files uploaded to the server. It really is a nice script.

I posted a comment there that linked back to a file upload script that I wrote. Well, since then I've written something much better and its about time to show it off. I actually wrote it a while back and recently cleaned it up to go all PHP5 with it.

The script works in two parts. In OOP fashion I separated out tasks that could be shared by other processes and that gave me an [upload class](/script_src/Upload.class.phps) and a [mime-type class](/script_src/MimeTypes.class.phps).

With these two classes, processing uploaded files is as easy as:

``` php
/**
 * This represents just the file portion of the form processing
 */
require_once('Upload.class.php');
require_once('MimeTypes.class.php');

// set destination folder
$destination = '/path/to/destination/';

// start new upload object
$ul = new AP_File_Upload();

// loop through uploaded files and save each one
foreach($_FILES as $file) {
	if(!empty($file['name']) && $ul->save($file,$destination) == false) {
		// you'll want to handle error in some way
		// more elegant than dying
		die($ul->get_error());
	}
}

// continue processing files as needed
```

With the mime types class you can filter the kinds of files that are accepted by the script. For example you can only allow image file uploads by doing:

``` php
$m = new AP_File_MimeTypes();
$types = $m->getTypes('image');

$ul = new AP_File_Upload($types);
```

Predefined groups in the class include: image, office, web, compressed, video, audio. If you look in the class you can see how easy it is to create your own groups. That could be a little more efficient if the MimeTypes class was static… but, well, it works and I'm lazy 😉 Even if you don't filter the mime types you still need the MimeTypes class. The script uses it to check the file type that the upload reports vs. what the extension thinks it should be. Its not 100% accurate, but is OK for a first level check. 

#### That's all folks

The class makes handling uploads painfully easy. Just don't let yourself be abused. Double checking files and altering the file names a good steps towards keeping your site safe. And if you're dealing with files that you need to make available to others and that can potentially be used against you, you might consider zipping the contents of the file, unless you need to use it directly, then you've got other things to consider as well.

#### Update

**2007-01-23** – fixed a line of code inside the foreach statement to correctly handle the submitted data. If using the multi-file script from the Stickman and uploading less than the limit of files, the first file in the $_FILES array is empty and thus threw a wrench in the works. I fixed the if statement to first check to make sure the name of a file is present. This gets around the issue that the 2nd and 3rd posters below were having.

#### Update 2

**2007-08-30** – fixed the script to properly do file type checking. Embarrassingly enough I had written all the code needed but forgot to actually implement it in the script. 

#### Update 3

**2007-12-12** – disabled mime-type checker. Bah! Also, a change was made to the core functionality – the method save_file() has been renamed to save().