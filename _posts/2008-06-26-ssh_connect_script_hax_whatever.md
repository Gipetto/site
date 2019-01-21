---
id: 237
title: 'SSH Connect Script, Hax, Whatever…'
date: 2008-06-26T20:58:00+00:00
layout: post
guid: http://top-frog.com/?p=237
permalink: /2008/06/26/ssh_connect_script_hax_whatever/
categories:
  - Computers
tags:
  - bash
  - code
  - command
  - connect
  - line
  - password
  - script
  - server
  - ssh
  - _ssh
---

<div class="alert error">
<p><b>Don't do this</b>: this script pre-dates suitable password managers. This is not how you manage server access!</p>
</div>

I work with many different servers at work. Most tedious part is that I need to ssh in to them on a regular basis. Not all of them can I, nor do I feel should I, be adding SSH keys on to.

So I finally got around to writing a little script to hold onto logins and passwords in a handy little connection script.

#### Caveat Emptor…

Is it a bit insecure to put these into a single file in my home folder? Maybe. Is it even less secure that said file is executable? Sure. Is it damn convenient? Yes.

**So, now on to it:**

``` sh
#!/bin/bash
#
# Server Nicknames
#
# ServerName
nickname='me@server.com';
nicknamepassword='12345';
nicknameextra='an extra reminder';
#
# etc...

# Do not edit below this line
#
if ! [ $1 ]; then
	echo '_ssh error:';
	echo '	please enter a dev server address';
	echo '';
	exit 1;
fi

SERVER=$(eval echo \${$1:=0});
PASSWORD=$(eval echo \${$1password:=0});
EXTRA=$(eval echo \${$1extra:=0});

if ! [ $SERVER == 0 ]; then
	# show extra
	if ! [[ $EXTRA == 0 ]]; then
		echo $EXTRA;
	fi
	# handle password
	if ! [ $PASSWORD == 0 ]; then
		echo $PASSWORD | pbcopy;
		echo 'Password copied to clipboard, paste when prompted to connect';
	else
		echo '* No password recorded for $1';
		echo '* add the password to this file to have it copied for you when connecting';
	fi
	# connect
	if [[ $SERVER =~ '@' ]]; then
		# we were provided user@server
		ssh $SERVER;
	else
		# we were provided just server, assume server name as user name
		ssh $SERVER@$SERVER;
	fi
else
	# error
	echo '_ssh error:';
	echo "	server name '$1' not found";
	echo '';
	exit 2;
fi
```

The script is simple to use and add servers to. Simply add a server's credentials under a nickname and use that nickname to connect to the server. 

Now, here's the really cool part. As an OS X only feature, and this may be a 10.5 only feature, the script will copy the password to the clipboard so all that's needed next is to paste the password at the password prompt. I'm really not sure if I can automatically give SSH a password or not, I'm thinking not, but what I can do is make it really easy continue with the login process. 

That means a connection that has been set up like:

``` sh
google='me@google.com';
googlepassword='12345';
googleextra='Put files in /dev/null';
```

will connect like:

``` sh
$ _ssh google
Put files in /dev/null
Password copied to clipboard, paste when prompted to connect
Password:
```

All that's left right there is to `command-v` to paste the password and login to the server.

#### OMG HAX!

So, yeah, its a bit hackish and there are certainly more secure ways of holding on to this information, but I'm thinking its no less secure than other kinds of password files and central resources. That and it saves precious keystrokes over the course of a day.

So, now, for anyone who actually reads this, I'm interested to hear how you're managing server credentials to many servers and making connections that much easier.