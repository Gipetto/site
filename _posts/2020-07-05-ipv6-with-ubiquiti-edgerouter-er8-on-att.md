---
title: "IPv6 with Ubiquiti Edgerouter ER8 on AT&T"
date: 2020-07-05T16:28:42-0700
layout: post
categories:
- Computers
tags:
- network
- ubiquiti
- edgerouter
- ipv6
- icmpv6
- dhcp
- interface
- configure
- edgeos
threads:
---

This isn't the first blog post on how to do this, and it probably won't be the last, but since IPv6, even within AT&T, seems to vary, and the quality of the blog posts out there vaires, this is also so that I have record of what I did for my actual needs.

I'm not a network engineer. So this was mostly just piecing together bits of information that I could find posted by others, and then correcting it for my needs, mostly through trial and error.

**This will all assume that you**:
- are working on an EdgeRouter _without_ a built in switch
- are working with EdgeOS 2+ (this was done on 2.0.8)
- have the internet coming in on the `eth0` and aren't some kind of monster that uses another port for your WAN. If you are, then adjust the interfaces below accordingly

Since the only part of the interface that knows how to manage IPv6 in EdgeOS is the config tree, and the config tree isn't the easiest to work with, we'll just work on the command line.

#### Modem Configuration
My modem is NVG599. I had to enable IPv6 and its settings. I won't go in to detail here, but I had to ensure that the IPv6 was turned on under _Home Network_ > _IPv6_. That then allowed me to enable DHCPv6 and DHCPv6 Prefix Delegation. Once that was enabled I could see in the main _Home Network_ tab that the modem had received an IPv6 address and that prefix delegation was enabled.

The modem is  operating in bridge mode, but I believe that has no effect on this setup information.

Once enabled, take note of the **IPv6 Delegated Prefix Subnet** in the _Home Network_ tab. The number after the slash if your prefix length. In my case I saw `::/64`.

#### EdgeOS Command Line Basics
Hopefully you're comfortable with making changes to your router over SSH. If not, here's a quick primer to editing the configuration.

Once logged in to the router, you can check your current configuration:

``` conf
# To see the entire configuration tree
show configuration

# To see neatly formatted interface information
show interfaces

# To see neatly formatted firewall configuration
show firewall
```

You can use those commands later on to confirm your changes.

To actually edit the configuration:

``` conf
# enter configuration mode
configure

# … make changes as outlined below

# commit the changes for them to take effect, changes are
# not permanent until they're saved
commit

# save so that changes are persisted in the config file.
# this makes the changes permanent.
save

# get out
exit
```

If at any time you're not comfortable with the changes you've made, you can always bail out with:

``` conf
exit discard
```

#### Interface Configuration
Now, we need to setup the WAN interface on the router to enable IPv6 to use slaac and to accept an address range as specified by the service. This is commonly `/48`, `/56` and `/64`. Your modem should tell you what you're dealing with. Despite most advice I found for AT&T saying it would be `/56`, as noted in the previous section, for me it was `/64`.

Most articles out there will have you set the `host-address` and `prefix-id` configuration options. I found these aren't necessary unless you know your specific needs. Most likely if you're reading _this_, you don't have specific needs, you're just wanting it to work.

``` conf
edit interfaces ethernet eth0
set ipv6 address autoconf
set dhcpv6-pd pd 0 prefix-length /64
set dhcpv6-pd pd 0 interface eth1 service slaac
top
```

Some information out there says that this isn't needed on newer versions of EdgeOS, but I had to set up router advertisement for this to work.

``` conf
edit interfaces ethernet eth1
set ipv6 router-advert prefix ::/64
set ipv6 router-advert radvd-options "RDNSS DNS-SERVER-IPV6-ADDRESS {};"
top
```

**Important:** The `radvd-options` entry above is optional if you're OK with getting DNS from your ISP. I'm using a Pi-hole internally so I've set it up so that I can get ad blocking across my entire network. I replaced `DNS-SERVER-IPV6-ADDRESS` with the **local-only** IPv6 address of my Pi-hole server (the address that starts with `fe`). Raspbian OS generates these link-local addresses from the MAC address on the device, so it can be considered a predictable/static self assigned address.

Save it all

``` conf
commit
save
```

#### Firewall Configuration
For IPv6 to work properly we need to let those ICMPv6 control messages through. I'm not entirely sure about the internal specifics of the firewall rule as it is applied, but these ICMPv6 packets should only be considered valid by the router if they meet the hop limit, which helps ensure the integrity and authenticity of the request.

``` conf
edit firewall ipv6-name WANv6_IN
set default-action dropset rule 10 action accept
set rule 10 description "allow established"
set rule 10 protocol all
set rule 10 state established enable
set rule 10 state related enableset rule 20 action drop
set rule 20 description "drop invalid packets"
set rule 20 protocol all
set rule 20 state invalid enableset rule 30 action accept
set rule 30 description "allow ICMPv6"
set rule 30 protocol icmpv6
top
```

Since DHCP is done via SLAAC, which is managed by AT&T, we have to also allow the internal network to properly relay the DHCP packets to flow over UDP.

``` conf
edit firewall ipv6-name WANv6_LOCAL
set default-action dropset rule 10 action accept
set rule 10 description "allow established"
set rule 10 protocol all
set rule 10 state established enable
set rule 10 state related enableset rule 20 action drop
set rule 20 description "drop invalid packets"
set rule 20 protocol all
set rule 20 state invalid enableset rule 30 action accept
set rule 30 description "allow ICMPv6"
set rule 30 protocol icmpv6set rule 40 action accept
set rule 40 description "allow DHCPv6 client/server"
set rule 40 destination port 546
set rule 40 source port 547
set rule 40 protocol udp
top
```

Apply the rules to the LAN interface(s) as required. Repeat for any and all active interfaces on the router.

``` conf
set interfaces ethernet eth1 firewall in ipv6-name WANv6_IN
set interfaces ethernet eth1 firewall local ipv6-name WANv6_LOCAL
```

And, again, save it all

``` conf
commit
save
```

#### Special Case for Ubuntu
For my Ubuntu client I needed to enable an IPv6 security feature. Normally an IP address is derived based on the network adapter's MAC address to make it predictable, or static. If the computer is not a server and doesn't need a static address it is better to occasionally roll that public ip address to maintain a bit of anonymity. This is done automatically in almost every other OS, including Android, so I was surprised to find out that I had to enable it in Ubuntu.

This can be enabled via `sysctl`. Replace `enp7s0` with your primary network interface address. Mostly this is `eth0`, but in my case, and becoming more common, is a different scheme that is derived from the network interface's MAC address to make internal interface naming more consistent and predictable when multiple network interfaces are present.

``` sh
sudo sysctl net.ipv6.conf.enp7s0.use_tempaddr=2
sudo /etc/init.d/networking restart
```

I've seen recommendations to set `net.ipv6.conf.all.use_tempaddr = 2` and `net.ipv6.conf.default.use_tempaddr = 2` but I've also read that those are applied AFTER the initial boot sequence, after the interfaces have already initialized, but that when naming the interface it happens prior to the interface coming online. I'm not sure which is true, but with one network interface in the system naming it in the config is hardly a burden.

#### Voila
With that I have functioning IPv6 addresses and traffic. Head on over to [https://ipv6-test.com/](https://ipv6-test.com/) to validate your configuration. It was a bit of a ride to get there and I'm sure this article will be confusing to someone else in the future as the configuration options change and are renamed in EdgeOS, but maybe this'll help me reconfigure everything in the future when I eventually upgrade my network to get 10GB internal networking :D 
