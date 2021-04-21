---
title: "Adventures in Rust: Cross Compile on Linux to OS X"
date: 2020-11-08T13:49:00-0700
layout: post
categories:
- Computers
tags:
- rust
- compile
- linux
- osx
threads:
---

I've been learning rust, because why not? I'm mostly interested in writing my own simple command line utilties. But I spend enough time on OS X and Ubuntu that I want to be able to have the same suite of stupid tools on both systems. I've been looking at the best way to do this. For the longest time I've written things in scripting languages, but they were generally slow, especially when you want some to run when starting a new shell session. The little amounts of time add up. 

I like Scala, so I tried packaging little apps to run on multiple architectures, but the end results were... large, to say the least. I admit, I barely knew what I was doing, but I wasn't satisfied with the result.

I'd been wanting to poke around with Rust for some time so I gave it a go.

