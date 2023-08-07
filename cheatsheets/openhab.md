---
layout: cheatsheet
title: OpenHab Cheat Sheet
section: cheatsheets
category: cheatsheet
---

## Homekit

If Apple Home says that the OpenHab device needs to be reset, check the status of the OpenHab homekit integration:

```sh
avahi-browse _hap._tcp -vr
```

In the result you should find:

```
= enp7s0 IPv4 OpenHAB                                       _hap._tcp            local
   hostname = [nab5-wookiee-internal.local]
   address = [192.168.1.180]
   port = [9123]
   txt = ["id=8e:5e:58:2f:e0:38" "md=OpenHAB" "pv=1.1" "ci=2" "sh=Kg7NjQ==" "sf=0" "ff=0" "s#=1" "c#=3"]
```

For the integration you should see `sf=1`. If you see `sf=0` then the integration is already paired and needs to be released.

Then:

```sh
$ docker exec -it openhab /openhab/runtime/bin/client
```

Password: `habopen`

```sh
$ openhab:homekit clearPairings
```

If that doesn't work, stop OpenHab, then backup and edit `userdata/jsondb/homekit.json` to remove the `user:` entries. Upon restarting OpenHab you should be able to connect to Apple Home. **Note:** Don't forget to remove the trailing comma from the JSON object entries!