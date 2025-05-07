---
layout: source
title: ssh-action.sh
article: /2009/04/23/client-side-pre-and-post-svn-hooks-with-unix-aliases/
---

{% highlight sh linenos %}
#!/bin/bash
# 
# Script to override the default SVN command and pass all parameters to the "proper"
# svn command while running a few operations after the svn command has run.
# 
# To install:
#   as root:
#      1. move this script to another location on the server so that it can be customized
#      2. edit the paths for REAL_SVN and BASE_PATH to reflect the server setup
#      3. make sure this file is editable with chmod +x svn-perms.sh
#   as normal user:
#      4. edit the ~/.bashrc file and add a new line:
#           alias svn="/path/to/this/file $@"
# 
# Usage
#
#   Usage should not vary from any other SVN command. Call svn as normal and all svn commands will
#   be passed through to the normal svn executable. SVN will respond as normal but the commands also
#   listed in this file will be executed on update commands.
# 
#   This will work in the scope of the current user. Someone doing updates as root will have the same 
#   effect on the editability of files as with normal SVN operation.

# to avoid this script calling itself, define the full path to the SVN binary
REAL_SVN='/usr/bin/svn';

# define the base path to where operations are to be constrained
# helps keep any find commands from trying to search the entire system
# this doesn't have to be here, it could be hard coded below if you prefer
BASE_PATH='/path/to/web/root/';

# put any pre-svn actions here, make sure to add the `wait` command after whatever
# you add so that the operation is sure to finish before svn operates

# call svn
$REAL_SVN $@;
wait;

# post-svn actions
if [ $1 = 'up' ]; then
	find -L $BASE_PATH -type f -name 'editable.file' -exec bash -c 'chmod 0777 $0' '{}' \;
fi
{% endhighlight %}