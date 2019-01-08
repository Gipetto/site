<?php

/**
 * First, the exec way
 */
function recursive_list_dir($get_dir) {				
	exec("ls -skp {$get_dir}", $files) or Die ("Could not list directory");

	echo("<ul>");
	
	foreach($files as $file) {
		$file = explode(" ", $file);
		
		if(eregi("/", $file[2])) {
			echo("<li>{$file[2]}</li>");
			recursive_list_dir($get_dir . $file[2]);
		} else {
			echo("<li>{$file[2]} is {$file[1]} Kilobytes</li>");
		}
	}

	echo("</ul>");
}

recursive_list_dir("/full/path/to/dir/");

/**
 * Now the traditional PHP way
 */
function recursive_list_directory($getDir) {		
	$myDirectory = opendir("$getDir") or Die ("Could not list directory");  
	
	while($entryName = readdir($myDirectory)) { 
		if ($entryName != "." && $entryName != ".." && $entryName != ".DS_Store") {
		  $dirArray[] = $entryName;
		}
	}

	closedir($myDirectory);
		
	echo("<ul>");
	
	foreach($dirArray as $value) {
			if(is_dir("$getDir/$value")) {
				echo("<li>{$value}</li>");
				recursive_list_directory("$getDir/$value");
			} else {
				echo("<li>{$value} is " . sprintf("%01.1f", filesize("$getDir/$value") / 1024) . " Kilobytes</li>");
			}
	}
	
	echo("</ul>");
}

recursive_list_directory("relative/path/to/dir/");
