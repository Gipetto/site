---
title: "Install Home Assistant on RPi"
date: 2021-12-04T13:49:00-0700
layout: post
categories:
- Computers
tags:
- raspberrypi
threads:
---

## Requirements

- Debian Bullseye
- Docker
- Docker Compose
- ZWave USB Adapter


## RPi Up to Date

``` sh
$ sudo apt update && sudo apt upgrade
$ sudo apt install vim
```


## Install Docker

``` sh
 $ curl -fsSL https://get.docker.com -o get-docker.sh
 $ DRY_RUN=1 sh ./get-docker.sh
```

Remove `DRY_RUN=1` and run with `sudo` if satisfied with the output.


## Add current user to Docker Group

``` sh
$ sudo usermod -aG docker ${USER}
```


## Install docker-compose

``` sh
$ sudo apt install libffi-dev libssl-dev
$ sudo apt install python3 python3-dev python3-pip
$ sudo pip install docker-compose
```

Enable docker to start at system boot
``` sh
$ sudo systemctl enable docker
```


## Optional: Move data-root

I prefer to host contianer files where I can remember to find them.

Create the docker directory:
``` sh
mkdir -p /home/pi/containers/docker
```

Create `/etc/docker/daemon.json` if it doesn't exist, and add a `data-root` entry:
``` json
{
  "data-root": "/home/pi/containers/docker"
}
```


## Build compose file

Make a home directory for home assistant

``` sh
mkdir -p /home/pi/containers/home-assistant/config
```

``` yaml
version: "3"
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/raspberrypi3-homeassistant:stable"
    devices:
      - /dev/ttyUSB1:/devttyUSB1
    volumes:
      - /home/pi/containers/home-assistant/config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
```

## Enable Nortek ZWave interface

Ensure that you can find the device when plugged in

Running:
```
$ udevadm info -a -n /dev/ttyUSB0 | grep '{interface}'
```

Should return:
```
    ATTRS{interface}=="HubZ Z-Wave Com Port"
```

Add ZWave bridge docker container

``` yaml
  zwavejs2mqtt:
    container_name: zwavejs2mqtt
    image: zwavejs/zwavejs2mqtt:latest
    restart: always
    tty: true
    stop_signal: SIGINT
    environment:
      - SESSION_SECRET=mysupersecretkey
      - ZWAVEJS_EXTERNAL_CONFIG=/usr/src/app/store/.config-db
      # Uncomment if you want logs time and dates to match your timezone instead of UTC
      # Available at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
      - TZ=America/Los_Angeles
    networks:
      - zwave
    devices:
      # Do not use /dev/ttyUSBX serial devices, as those mappings can change over time.
      # Instead, use the /dev/serial/by-id/X serial device for your Z-Wave stick.
      - '/dev/serial/by-id/insert_stick_reference_here:/dev/zwave'
    volumes:
      - zwave-config:/usr/src/app/store
    ports:
      - '8091:8091' # port for web interface
      - '3000:3000' # port for Z-Wave JS websocket server
networks:
  zwave:
volumes:
  zwave-config:
    name: zwave-config
```

## Start

``` sh
$ docker-compose -f docker-compose.yaml up -d
```

Now access the service at:
- `http://{rpi-hostname}:8123`


## Maintenance

Update docker: Use the package manager, so just `sudo apt update && sudo apt-upgrade` once in a while, or set up unattended upgrades, like we normally want to do.

Update docker-compose:
```
$ sudo pip install docker-compose --upgrade
```
