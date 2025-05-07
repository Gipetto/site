---
layout: source
title: tmbundle.sh
article: /2008/01/17/tmbundle_update/
---

{% highlight sh linenos %}
#! /bin/bash
# Script for updating TextMate bundles from SVN
# @author Shawn Parker
# @copyright none
#
# Written because the GetBundles bundle never seems to work right, no offense to its author...
# this follows suggestions made on the TextMate wiki for how to pull from the TextMate SVN
# http://macromates.com/textmate/manual/bundles#getting_more_bundles
#
# updated 2008-01-17
# fixed update function to work properly
# added 'list installed' option and the ability to update a single bundle only.
# see http://www.top-frog.com/archives/2008/01/17/tmbundle_update for more information

# define some base vars
AS_TEXTMATE_DIR='/Library/Application Support/TextMate';
BUNDLE_DIR='Bundles';
SUPPORT_DIR='Support';
SVN_URL='http://macromates.com/svn/Bundles/trunk';
BUNDLE_EXT='.tmbundle';
UPDATE_SUPPORT=0;

# set LC_TYPE to avoid encoding issues
export LC_CTYPE=en_US.UTF-8;

# make sure we have our bundles svn directory
if ! [ -d "$AS_TEXTMATE_DIR/$BUNDLE_DIR" ]; then
	if ! [ -d "$AS_TEXTMATE_DIR" ]; then
		mkdir "$AS_TEXTMATE_DIR";
	fi			
	mkdir "$AS_TEXTMATE_DIR/$BUNDLE_DIR";
fi

# make sure an action is defined
if ! [ $1 ]; then
	echo '';
	echo 'Missing action. Options are [install | list | update]';
	echo 'usage: ./tmbundle.sh install package.tmbundle';
	echo '       ./tmbundle.sh list [installed]';
	echo '       ./tmbundle.sh update [bundle]';
	echo '';
	echo 'note: encapsulate long names with spaces in quotes';
	echo '      ./tmbundle.sh install "name with spaces.tmbundle"';
	echo '';
	exit 1;
fi

# install bundle
if [ $1 = 'install' ]; then
	# make sure we have our 2nd variable
	if ! [ "$2" ]; then
		echo '';
		echo 'You must supply a bundle name to fetch for installs';
		echo 'usage: ./tmbundle [install] [package.tmbundle]';
		echo '';
		exit 2;
	fi
	
	# make sure we have a .tmbundle extention
	if ! [ "${2##*.}" = 'tmbundle' ]; then
		echo '';
		echo 'invalid file extension or no file extension found';
		echo "trying $2$BUNDLE_EXT";
		BUNDLE="$2$BUNDLE_EXT";
	else
		BUNDLE=$2;
	fi
	
	svn co "$SVN_URL/$BUNDLE_DIR/$BUNDLE" "$AS_TEXTMATE_DIR/$BUNDLE_DIR/$BUNDLE";
	UPDATE_SUPPORT=1;
	
# list installed bundles	
elif [ $1 = 'list' ] || [ $1 = 'ls' ]; then 
	if ! [ "$2" ]; then
		echo 'Listing available bundles:';
		svn list "$SVN_URL/$BUNDLE_DIR";
	else
		echo 'Listing installed bundles:';
		ls -1 "$AS_TEXTMATE_DIR/$BUNDLE_DIR";
	fi
	
# udpated bundles
elif [ $1 = 'update' ] || [ $1 = 'up' ]; then
	# if no specific bundle specified, then update them all
	if ! [ "$2" ]; then
		echo "Updating Bundles:";
		find "$AS_TEXTMATE_DIR/$BUNDLE_DIR" -maxdepth 1 -type d -name '*.tmbundle' -exec bash -c 'echo -n "${0##*/}: "; svn update "$0";' '{}' \;
		RES=$?;
		if ! [ RES = 0 ]; then
			echo 'Bundles Updated';
		else
			echo "SVN failed with code: $RES";
		fi
	# update specific bundle
	else
		echo "Updating Bundle: $2";
		# fix missing file extension
		if ! [ "${2##*.}" = 'tmbundle' ]; then
			echo '';
			echo 'invalid file extension or no file extension found';
			echo "trying $2$BUNDLE_EXT";
			BUNDLE="$2$BUNDLE_EXT";
		else
			BUNDLE=$2;
		fi
		
		# check to see if bundle is installed, if not, checkout instead of update
		if [ -d "$AS_TEXTMATE_DIR/$BUNDLE_DIR/$BUNDLE" ]; then
			svn update "$AS_TEXTMATE_DIR/$BUNDLE_DIR/$BUNDLE";
		else
			echo "Bundle $2 not installed - trying to install";
			svn co "$SVN_URL/$BUNDLE_DIR/$BUNDLE" "$AS_TEXTMATE_DIR/$BUNDLE_DIR/$BUNDLE";
		fi	
	fi
	UPDATE_SUPPORT=1;
fi

# make sure we have an up to date support folder
if [ $UPDATE_SUPPORT = 1 ]; then
	echo -n 'Updating Support Folder: ';
	# only do check out if support folder doesn't exist
	if ! [ -d "$AS_TEXTMATE_DIR/$SUPPORT_DIR" ]; then
		svn co "$SVN_URL/$SUPPORT_DIR" "$AS_TEXTMATE_DIR/$SUPPORT_DIR";
	else
		svn up "$AS_TEXTMATE_DIR/$SUPPORT_DIR";
	fi
fi

# tell TextMate to reload bundles
osascript -e 'tell app "TextMate" to reload bundles';

# if we made it this far, exit (somewhat) gracefully
echo '';
echo 'action complete';
echo '';
{% endhighlight %}