---
title: "PXE Boot a Raspberry Pi on a Synology NAS via a Ubiquiti Edgerouter"
date: 2021-10-01T13:49:00-0700
layout: post
categories:
- Computers
tags:
- raspberrypi
- boot
- pxe
- linux
- dhcp
- synology
- nas
- tftp
- nfs
threads:
---

Official Docs: https://www.raspberrypi.org/documentation/computers/raspberry-pi.html#network-booting

# Getting Started

**Get permanent mac address prefix**
(not used since we're not limiting access to the pxe response)

``` sh 
ethtool -P eth0
```
b8:27:eb:f5:14:f1 // pihole-too
b8:27:eb:69:20:2e // monitor-pi

**Get the Pi's serial number**

``` sh
cat /proc/cpuinfo | grep Serial | awk -F " " '{printf($3)}' | tail -c 8
```
0000000081f514f1 // pihole-too
000000004c69202e // monitor-pi

Find the latest installed eeprom image

``` sh
ls -alh /lib/firmware/raspberrypi/bootloader/stable/
```

Raspberry Pi 3b+ won't ask the DCHP server for PXE Boot info if it has an SD card installed

## DHCP Server Config

```
# Define option 43
set service dhcp-server global-parameters "option option-43 code 43 = string;"
# Set option 43, includes 3 trailing spaces to fix a bug in the legacy boot controller
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 subnet-parameters "option option-43 &quot;Raspberry Pi Boot   &quot;;"
# Set the bootfile-server
set service dhcp-server shared-network-name LAN1 subnet 192.168.1.0/24 bootfile-server 192.168.1.135
# Set tftp-server-name
set service dhcp-server shared-network-name LAN subnet 192.168.1.0/24 tftp-server-name 192.168.1.135
```

@TODO: how to I limit PXE Boot by hardware address?


## Synology Config

### Add new shared folders

- `rpi-pxe`: primary rpi filesystem storage
  - enable NFS access
  - No squash
  - Enable recycle bin
- `rpi-tftproot`: rpi boot volume
  - enable NFS access
  - No squash
  - No recycle bin

### Enable TFTP Server

Control Panel > File Services > Advanced > TFTP

- Enable
- Select `rpi-tftpboot` as the root folder

### Copy the filesystem

```
sudo mkdir /nfs/rpi-pxe
sudo mount 192.168.1.135:/volume1/rpi-tftpboot /nfs/rpi-pxe
sudo mkdir /nfs/rpi-pxe/{last 8 of rpi serial number}
sudo rsync -xa --progress --exclude /nfs / /nfs/rpi-pxe/{last 8 of serial number}
```


### Update /etc/fstab on the nfs mounted filesystem

We need to disable the `fstab` mount points so that the pi no longer tries to mount the SD card file system

```
sudo vim /nfs/rpi-pxe/{last 8 of rpi serial number}/etc/fstab
```

Comment out everything but the proc line. Remove the obsolete lines if you're feeling confident.

After:
```
proc            /proc           proc    defaults          0       0
#PARTUUID=996e7622-01  /boot           vfat    defaults          0       2
#PARTUUID=996e7622-02  /               ext4    defaults,noatime  0       1
# a swapfile is not a swap partition, no line here
#   use  dphys-swapfile swap[on|off]  for that
```

### Copy the boot files

```
sudo mkdir /nfs/rpi-tftpboot
sudo mount 192.168.1.135:/volume1/rpi-tftpboot /nfs/rpi-tftpboot
sudo mkdir /nfs/rpi-tftpboot/{last 8 of rpi serial number}
sudo cp -r /boot/* /nfs/rpi-tftpboot/{last 8 of rpi serial number}
```

### Edit the `cmdline.txt` to mount the root filesystem from nfs

Before:
```
$ cat cmdline.txt
console=serial0,115200 console=tty1 root={root filesystem partition uuid} rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait
```

- Change `root` to `/dev/nfs`
- Change `rootfstype` to `nfs`
- Add `nfsroot` of `{tftp-server-ip}:{nfs-root}/{rpi specific directory}`
- Add `ip` of `dhcp`

After:
```
$ cat cmdline.txt
console=serial0,115200 console=tty1 root=/dev/nfs nfsroot=192.168.1.135:/volume1/rpi-pxe/{last 8 of rpi serial number} rw rootfstype=nfs ip=dhcp elevator=deadline fsck.repair=yes rootwait
```

First time only: On the NAS, **COPY** `/volume1/rpi-tftpboot/{last 8 of serial number}/bootcode.bin` to `/volume1/rpi-tftpboot` 


## Confirmation after boot

### PXE Boot DHCP Query

The RPi will make 2 different DHCP requests. The first will be to discover the TFTP Server, the 2nd will be a regular DHCP request to setup networking during the boot sequence.

```
$ sudo tcpdump -vnes0 -i eth1 port 67 or port 68
```
Replace `eth1` with the LAN port that you want to listen to

Don't worry when you see `link-type EN10MB (Ethernet)`, that doesn't mean your network is runing at 10Mbit speeds, it is just a type designator for 10/100/100Mbit ethernet.

The TFTP discovery request will look like:
```
15:09:58.068712 b8:27:eb:69:20:2e > ff:ff:ff:ff:ff:ff, ethertype IPv4 (0x0800), length 364: (tos 0x0, ttl 128, id 0, offset 0, flags [none], proto UDP (17), length 350)
    0.0.0.0.68 > 255.255.255.255.67: BOOTP/DHCP, Request from b8:27:eb:69:20:2e, length 322, xid 0x26f30339, Flags [none]
	  Client-Ethernet-Address b8:27:eb:69:20:2e
	  Vendor-rfc1048 Extensions
	    Magic Cookie 0x63825363
	    DHCP-Message Option 53, length 1: Discover
	    Parameter-Request Option 55, length 14: 
	      Vendor-Option, Vendor-Class, BF, Option 128
	      Option 129, Option 130, Option 131, Option 132
	      Option 133, Option 134, Option 135, TFTP
	      Subnet-Mask, Default-Gateway
	    ARCH Option 93, length 2: 0
	    NDI Option 94, length 3: 1.2.1
	    GUID Option 97, length 17: 0.46.32.105.76.46.32.105.76.46.32.105.76.46.32.105.76
	    Vendor-Class Option 60, length 32: "PXEClient:Arch:00000:UNDI:002001"
```
Note the `TFTP` entry in the Parameter-Request options as well as the Vendor-Class line that defines the client as a PXE client

The response should look something like:
```
15:09:58.069658 78:8a:20:df:c2:f0 > b8:27:eb:69:20:2e, ethertype IPv4 (0x0800), length 344: (tos 0xc0, ttl 64, id 19318, offset 0, flags [none], proto UDP (17), length 330)
    192.168.1.1.67 > 192.168.1.131.68: BOOTP/DHCP, Reply, length 302, xid 0x26f30339, Flags [none]
	  Your-IP 192.168.1.131
	  Server-IP 192.168.1.1
	  Client-Ethernet-Address b8:27:eb:69:20:2e
	  Vendor-rfc1048 Extensions
	    Magic Cookie 0x63825363
	    DHCP-Message Option 53, length 1: Offer
	    Server-ID Option 54, length 4: 192.168.1.1
	    Lease-Time Option 51, length 4: 86400
	    RN Option 58, length 4: 43200
	    RB Option 59, length 4: 75600
	    Subnet-Mask Option 1, length 4: 255.255.255.0
	    BR Option 28, length 4: 192.168.1.255
	    Default-Gateway Option 3, length 4: 192.168.1.1
	    TFTP Option 66, length 14: "192.168.1.135^@"
```
Note the `TFTP` option that points the client to the TFTP server. 

### Filesystem

Before:
```
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        15G  3.2G   11G  24% /
devtmpfs        454M     0  454M   0% /dev
tmpfs           487M  7.0M  480M   2% /dev/shm
tmpfs           487M  6.5M  480M   2% /run
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           487M     0  487M   0% /sys/fs/cgroup
/dev/mmcblk0p1  253M   49M  204M  20% /boot
tmpfs            98M     0   98M   0% /run/user/999
tmpfs            98M     0   98M   0% /run/user/1000
```

After:
```
$ df -h
Filesystem                               Size  Used Avail Use% Mounted on
192.168.1.135:/volume1/rpi-pxe/4c69202e  8.8T  1.8T  7.0T  20% /
devtmpfs                                 454M     0  454M   0% /dev
tmpfs                                    487M     0  487M   0% /dev/shm
tmpfs                                    487M   13M  474M   3% /run
tmpfs                                    5.0M  4.0K  5.0M   1% /run/lock
tmpfs                                    487M     0  487M   0% /sys/fs/cgroup
tmpfs                                     98M     0   98M   0% /run/user/1000
```