---
id: 58
title: Server Upgrade
date: 2005-03-21T22:39:00+00:00
author: Shawn
layout: post
guid: http://top-frog.com/?p=58
permalink: /2005/03/21/server_upgrade/
categories:
  - Computers
---
The server got an upgrade tonight. It produced a little down time but its all good now. We're now running on a Dual 1Ghz MDD with 1.75 GB of Ram. I'm already seeing a great speed improvement in the page load times. I think the old iBook was just a bit overwhelmed with the image generation that needed to take place.

<!--more-->

Another thing that is better is the mySQL security. The old server was a bit lax in that I had one main user for all the databases. Now the users are segmented into ownerships and can only be edited by those who have been given privileges. This means that different users can log into the same phpMyAdmin and only see the databases they have privilges on. So my users, the rest of the fuzzy coconut team, will be able to see their personal databases and the master fc database but won't be able to play jokes on other's dbs.

And it really wasn't hard to do for such a slick scheme. It's pretty darn secure too. The only username and password that is somewhat in the open, meaning that it is hardcoded into the conf file, is a read only user that can check usernames and passwords. Pretty harmless to have out in the open since all the passwords are encrypted in the database.

So, I'm that much closer to providing this server as a central repository for the fc buddy list. It'll be a busy little server too. It'll house the gippy pages, the soon to be released puddlemonkey blog (until I can find it a more permanent home with a decent provider), a cvs server, a file server, a SQL server, a Web Server and, maybe, an iTunes server.

We'll see how it holds up. I was hoping to have gotten more work done tonight but I ended up doing a bit of leg work on getting some drywall guys in here tomorrow, along with an electrician and a plumber to do the finishing touches on the bathroom so I wasn't as productive as I would have liked. Oh well, life goes on and our bathroom needs to get done.

So, that said, I'm off to let the dogs out and go to bed. 'till next time.