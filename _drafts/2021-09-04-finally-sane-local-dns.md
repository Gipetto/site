---
title: "Finally, a Sane Local DNS Configuration"
date: 2021-09-04T11:39:21-0700
layout: post
categories:
- Computers
tags:
- pihole
- network
- ubiquiti
- edgerouter
- dns
- dhcp
threads:
---

Because I don't know much about networking it feels like I'm always fumbling around to get my local network running just a little bit better. My last configuration had all my network clients looking to the router for DNS, and the router would forward requests to my local pihole install. I landed on this because I want local host name resolution but couldn't get the right configuration on my pihole to get conditional forwarding to work.

I had also just set up an [L2TP VPN](https://help.ui.com/hc/en-us/articles/204950294-EdgeRouter-L2TP-IPsec-VPN-Server) and while I was getting general DNS resolution, I got nothing for the local network.  

It felt like no matter what I did I would either lose local name resolution or do something that blocked MDNS from working correctly. After a bit more reading I think that I landed on a workable configuration.

I had landed on a configuration where my Edgerouter was the primary DNS server on the network, and it would forward DNS lookups to the Pihole when it couldn't resolve the name as a local hostname. While this worked, this meant that I only ever saw the Edgerouter in the Pihole's access logs. I couldn't pinpoint any errant host activity on the network.

## Use dnsmasq

My first realization was that my Edgerouter just plain wasn't doing hostname resloution for network clients. It turns out that I just needed to read this [KnowledgeBase article about setting up Local DNS](https://help.ui.com/hc/en-us/articles/115002673188) to figure out that I needed to enable `dnsmasq` for DHCP. They key line in that article for me was:

```
set service dhcp-server use-dnsmasq enable 
```

With that, I could now query the router for local addresses.

``` sh
nslookup tower 192.168.1.1
```
Now returns:
```
Server:         192.168.1.1
Address:        192.168.1.1#53

Name:   tower.wookiee.internal
Address: 192.168.1.86
```

This was a huge improvement all on its own.

## Proper DNS settings on the Edgerouter

After that, setting all clients to use the pihole was straight forward, I simpliy went in to the DHCP Server configuration on the Edgerouter and set the DNS provider to my pihole's IP Address.

The next was an interesting find that I belive I only stumbled upon out of luck. I'd always wondered what the System Name Server option was for (In the EdgeOS admin, click on System at the bottom to bring up the global settings, then find the Name Server entry). Not really knowing what to do with this setting, and not getting clear direction from the EdgeOS docs, I had set it to the Pihole's IP address.

However, when using Conditional Forwarding on the Pihole this created a circular lookup as they both would ask each other to do local host name resolution. This worked out OK when I had the router set as the Primary DNS host for the network, but created enough traffic to slow down the entire network when the Pihole was the primary.

I could now turn off DNS forwarding on the Edgerouter, as well as set my ipv6 router advertising settings back to pointing straight at the Pihole. 

## Set Conditional Forwarding

Now I could set conditional forwarding on the Pihole. For IPV4 it was straight forward, I could use the Admin UI to set it on the DNS settings page. However I eeded a config file to set the IPV6 reverse lookup because Pihole only has one entry box for this in the UI. 

Pihole uses the `rev-server` setting in dnsmasq to define upstream hostname lookup servers. While the Pihole UI only accepts one entry, `dnsmasq` can support many of these upstream services being defined. So we can create a config file for `dnsmasq` to define the Edgerouter as a source for IPV6 lookups.

``` sh
sudo touch /etc/dnsmasq/90-reverse-ipv6.conf
echo "rev-server=fd::/64,192.168.1.1" > /etc/dnsmasq/90-reverse-ipv6.conf
```

Now the pihole can resolve hostnames via IPV4 and IPV6. Well, supposedly. I still get a lot of raw IPV6 hostnames in my Pihole stats, but I also get some that do proper name resolution, so I'm not sure what's happening there.