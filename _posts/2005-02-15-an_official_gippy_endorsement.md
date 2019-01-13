---
id: 42
title: An Official Gippy Endorsement
date: 2005-02-15T10:57:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=42
permalink: /2005/02/15/an_official_gippy_endorsement/
categories:
  - 'Web Design &amp; Development'
---
I've been testing out many a search script to find something that will run fast, comprehensively index pages, and be highly customizeable because I sure as hell wasn't going to write one myself. My search took about 36 hours of time dedicated to installing and running different search applications. I finally found what I was looking for in a free program called [htdig](http://www.htdig.org).



Even though I haven't yet put it into production Htdig has proven to be everything I was looking for in a search script. I will spider a site, it respects robots.txt files, you can specify areas of pages that are not to be indexed (handy for excluding common navigational elements – be careful though – it won't follow the links in these areas either so be sure that anything you comment out is able to be found through a sitemap or something) and will display results by relevance and apply a 5 star rank to listings.

The script is by no means a simple setup as it requires compiling on the server. This can be a major drawback if you host doesn't already have it installed and won't let you compile applications on the server. Fortunately it is allowed by our ISP that we use at work, Pair Networks. But once configured it is a very powerful program.

The coolest part is that I didn't have to break my templates to run it. With a little creative usage of PHP you can run the htsearch script and pull the results into an array with the [exec](http://us2.php.net/manual/en/function.exec.php) command.

I'm not up to writing a full tutorial right now (but if anyone is interested I can write one up later) but the jist of it is that the search script, when run by the exec command, can be configured to return the results (page title, url, description, rank, etc…) line by line into an array that you can then output in any way that fits the site structure.

The only time it gets ugly in my setup is when I have to go to multiple pages of results. I like to keep a clean url structure and don't like to pass any $\_GET vars. Well, there was no way around it this time so I had to set up the multiple page links with $\_GET vars so that I wasn't creating 10 forms on a page just to keep a clean url. I can live with this in a search script especially since it creates a bookmarkable search result.

I'll hopefully have this in production within a week. We need to get some more comprehensive meta tags on our website now that I have a direct boss that understands the importance and can dedicate the appropriate time to it.

Next project: registration system for events and webinars…