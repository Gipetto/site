---
id: 2299
title: A few handy git aliases
date: 2013-05-16T00:34:19+00:00
layout: post.liquid
guid: http://top-frog.com/?p=2299
permalink: /2013/05/16/a-few-handy-git-aliases/
categories:
  - Computers
tags:
  - alias
  - branch
  - config
  - fetch
  - git
  - log
  - master
  - origin
  - pull
  - push
  - '*nix'
---
I finally got fed up with some repetitive Git tasks and decided to make a few aliases in my `.gitconfig` file. Here are the commands, they all assume that they're run from a valid git repo:

### Push your current branch to your upstream repository

How often do you repeat the git command to push your current branch by typing `git push origin [current-branch-name]` because you never remember to set up the branch to track? Does this sound easier?

``` shell
$ git pb
```

Alternately, here, you can add a default push method to your `.gitconfig`:

``` ini
[push]
  default = current
```

So that you can just call `git push` to and have git automatically assume you typed `git push origin [branch-name]`

### Pull just the current branches updates

With larger groups of developers it is easy for a `git pull` to fetch a lot of new refs that you don't care about. This alias shortcuts `git pull origin [current-branch-name]`.

``` shell
$ git up
```

A quick and easy update of just what you care about. Save big the `git pull` for lunch time or a coffee break.

### Open the current branch on GitHub

We use GitHub Enterprise at work and going to look at the current branch/repo on the server is pretty common. So to make it super quick to get where you want to go this command will open up the GitHub server to the current repo and branch that you're on. This works with self-hosted GitHub FI/Enterprise installs as well as public GitHub.

``` shell
$ git gh
```

### Open up GitHub to a new Pull Request

As a part of using GitHub Enterprise at work we've heavily adopted Pull Requests as the primary method of requesting code reviews and for pulling approved code in to master. However constantly finding the branch or manipulating browser history becomes tiresome. So this alias opens up GitHub to &#8216;`/owner/repoName/pulls/new/current-branch-name`&#8216; so that you can fill in a detailed pull request (you are filling out a pull request with a description and testing plan, right?).

``` shell
$ git pr
```

### Git log graph on the Cli

I don't now about you, but I've not been able to get on board with the dedicated git apps for browsing and visualizing history trees, but once in a while I do want to look at the tree but don't want to load an app to do it when a simple view on the cli will do. 

``` shell
$ git lg
```

<span class="frame">
  <img src="/assets/articles/git-lg.gif" alt="Git Aliases Screenshot" title="git-lg" />
</span>

### Ok, enough jabber, gimme the code

Ok, its pretty straight forward. Just add this to your `.gitconfig`:

``` ini
[alias]
  lg = log --graph --pretty=format:'%Cred%h%Creset %C(yellow)%an%d%Creset %s %Cgreen(%cr)%Creset' --date=relative
  pb = "!git push origin \"$(git rev-parse --abbrev-ref HEAD)\""
  up = "!git pull origin \"$(git rev-parse --abbrev-ref HEAD)\""
  pr = "!open \"$(git remote -v | grep origin | grep push | cut -f 2 | cut -d \" \" -f 1 | sed -e \"s|git@\\(.*\\):\\(.*\\).git|https://\\1/\\2|\")/pull/new/$(git rev-parse --abbrev-ref HEAD)\""&<;br />
  gh = "!open \"$(git remote -v | grep origin | grep push | cut -f 2 | cut -d \" \" -f 1 | sed -e \"s|git@\\(.*\\):\\(.*\\).git|https://\\1/\\2|\")/tree/$(git rev-parse --abbrev-ref HEAD)\""
```

Are those ugly? Sure. Do they help? Yep!

I'm sure as time goes on I'll figure out a few more. Or maybe the three of you that actually read this far have suggestions? Lemme know.
