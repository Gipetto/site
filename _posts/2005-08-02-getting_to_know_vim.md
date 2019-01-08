---
id: 116
title: Getting to know vim
date: 2005-08-02T22:41:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=116
permalink: /2005/08/02/getting_to_know_vim/
categories:
  - PHP Scripting
tags:
  - command line
  - commands
  - features
  - help
  - unix
  - vim
---
Since OS X brought Unix into my everyday life I've been fascinated by command line text editing. Mainly for remote tweaks and working directly on the server. 

However, the more I learn about vim the more I like it… vim is one powerful little editor. This is actually my second exploration into vim but I've unfortunately lost my notes on the first one. That's why I'm blogging this – so I have it backed up…

vim started out as a mystery to me as it is one of those programs that if you don't know what you're doing you'll be immediately lost. I found the documentation of little help as it is written rather cryptically and is very hard to get around. I ended up scouring the internet for tips and tricks for just getting started. I'm now to the point where I'm comfortable editing directly in vim without wasting time figuring out what I'm trying to do.<!--more-->

## vim Basics

So, for in uninitiated, here is a primer:

```
i    -  enter insert mode
esc  -  exit insert mode
```

These are the two basic commands that will get you typing in VIM. Now to save the file:

```
:w  -  This will write the file
```

To exit vim:

```
:q   -  This will quit vim
:q!  -  Quit vim without saving changes
```

Now for some basic movement. The arrow keys will take you up, down, left and right as expected, but the way vim writes is that a paragraph is considered a line. So when navigating up and down through your text you are taken essentially paragraph by paragraph. This is where a few keyboard commands come in handy. You don't want to be in editing mode for this, so after hitting esc to get out of edit mode you can use:

```
h  -  Move left
j  -  Move down
k  -  Move up
l  -  Move right
w  -  Jump to the beginning of the nextt word
e  -  Jump to the end of the next word
b  -  Jump backwards a word
0  -  (zero)  Jump to the start of the line
$  -  Jump to the end of the line
G  -  Goto a line - prefix with number
        ie: 5G to jump to line 5
```

To round out the basic feature set we'll need to be able to copy and paste. While its not entirely intuitive it does work. Copy is called Yank and is all based on wether you're Yanking a word, a line or multiple lines. The companion to Yank is Put. And not to be left out is Delete for Cutting text.

```
yy   -  Yank a line
2yy  -  Yank 2 lines
yw   -  Yank word
y$   -  Yank to end of line
p    -  Put text after cursor
P    -  Put text before cursor
dd   -  Delete line
dw   -  Delete word
x    -  Delete current character
```

vim contains a search engine that I still haven't quite mastered – but then I do admit that I haven't tried to hard at it either. To search for a partial word or phrase you have to exit editing mode.

```
/pattern  -  search for pattern
?pattern  -  search backward for pattern
n  -  repeat search in same direction
N  -  repeat search in opposite direction
:%s/old/new/g   -  replace all old with new
:%s/old/new/gc  -  replace with confirmations
```

So that gets you started moving around the document. Remembering the commands is the hardest part. With these basics in mind vim becomes a very nice, lightweight text editor. I have to admit it has taken me about 2 years to really get the hang of vim since I haven't really sat down and really gone hard core on learning it. But the more I learn the more I'm glad I did.

I would especially recommend researching the visual mode if you are serious about getting to know vim. Visual mode makes copying and pasting very easy. However visual mode is a little beyond what I want to cover in this article.

## Extending the power of vim

Every now and then I learn a little bit that makes vim even more powerful. Syntax coloring, auto and smart tabs, word wrap, and custom dictionaries make vim a nimble php editor for remote editing and also for everyday editing when a change of pace is needed to give the mind some stimulation (I often find that changing text editors once in a while can help me keep going when my brain is tired)

Syntax coloring was my first big 'wow' with vim. vim can understand a multitude of languages that include my core languages which are html, css, php, and javascript. vim also comes with support for writing shell scripts, java, perl and c and is set up so that custom language files can be written for any language.

Syntax coloring, as well as the commands that follow, can be enabled and disabled while using vim or set to be defaults by using a `.vimrc` file. I'll focus mainly on the `.vimrc` file since I use a lot of these settings as defaults since I mainly use vim when coding (though I am writing this article in vim just to force myself to get to know it better).

To set syntax coloring as a default it needs to be written into a config file that resides at the root of the home folder. When entering the command line through a terminal the starting point is typically the user home folder – right where we want to be. Once the terminal is up and running type:

``` sh
touch .vimrc
```

This creates our config file.

Next we'll want to add in our extra config items. Here are some of what I've done to make vim a comfortable coding environment: (comments can be left in a `.vimrc` file by starting the line with a quote mark " )

``` viml
" set terminal type
set term=builtin_ansi

" enable syntax coloring
syntax on

" enable line numbering
set number

" turn on auto indenting
" uses the previous line as a marker for indenting
set autoindent

" smartindent uses c like syntax structure to 
" increase / reduce tab indent where necessary
set smartindent

" set scrolloff to define how many lines to show  in 
" front of and behind the current line
set scrolloff=3

" set how many lines to scroll ahead when the bottom
" of the window is reached
set scrolljump=5

" set word wrapping - default for vim is to break
" lines at the letters, this forces full words to
" be flowed
set linebreak

" set vim to always show the last line of a paragraph
" in the current view
set display+=lastline
```

The only part of that I'm not quite sure about is setting the term type. But, everything is cool here so there's no worries on my part.

Those commands bring vim up to par with most coding applications for a fraction of the cost and memory footprint. The only thing lacking is a project / site mananger but there are plenty of free and low cost options for that.

## PHP Syntax Completion in vim

This last part reallys set vim aside for me. Because of my lousy memory I'm constantly referencing the php.net website for the proper name of a function. I ran accross this the other day and unfortunately can't find the link to credit where I got it from… really, I want to because this is a killer tip.

Vim has built in dictionary support so you can provide the program with a list of words that it makes available via simple autocomplete commands. I think in some ways I actually like this method of code hinting better than automatic suggestion. Half the time I don't need completion help so only getting code completion when I ask for it is nice.

Now, enough with my chatter, here's how to do it. You'll need a dictionary for vim to reference. I got mine at [lerdorf.com](http://lerdorf.com/funclist.txt). To be honest I don't know how up to date this file is but I've noticed a few other dictionaries around so there's bound to be an up to date copy available if this one is not. Place this file someplace save and then insert this code into your `.vimrc` file. You'll need to replace the placeholder with an actual path to your text file:

``` viml
" set dictionary to a php tag list
set dictionary-=/path/to/funclist.txt dictionary+=/path/to/funclist.txt

" use the dictionary completion
set complete-=k complete+=k
```

Now you can simply start to type a function and use `ctl-n` to move forward through the list and `ctl-p` to move backward. A very handly little reference

## Wrapping up

So, this has been just a surface view of using vim. There's much more below the surface still to be revealed. So dive in and check it out. It is definitely a handy application to know your way around. Knowing how to use it has made remote server config and minor file tweaks a breeze. The next project is to get into 2html – a vim routine that will convert your text file into HTML… something that could be very handy for performing basic conversion of text to html.

Oh, yeah: you can wake up now crabbycakes…