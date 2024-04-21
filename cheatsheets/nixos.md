---
layout: cheatsheet
title: NixOS Cheat Sheet
section: cheatsheets
category: cheatsheet
---

Find details on Packages, NixOS options and Flakes: 
[https://search.nixos.org](https://search.nixos.org)

## Flakes

| Operation | Command |
| --------- | ------- |
| Install | `sudo nixos-rebuild switch` |
| Upgrade | `nix flake update`<br>`sudo nixos-rebuild switch --upgrade` |

## Nix Commands

| Operation | Command |
| --------- | ------- |
| Search | `nix search nixpkgs 'package'` |

## Nix-Env (pre nix-commands)

| Operation | Command |
| --------- | ------- |
| Search | `nix-env -qaP '.*package.*'` |
| Install | `nix-env -i package-name` |
| Upgrade | `nix-channel --update nixpkgs`<br>`nix-env --upgrade '*'` |
| Uninstall | `nix-env --uninstall package-name` |
| Rollback | `nix-env --rollback` |
| Info (short) | `nix-env -qaP --description '.*package.*'` |
| Info (full) | `nix-env -qaP --description --json --meta '.*package.*'` |
| List packages in the current environment<br>(non-system packages) | `nix-env -qa --installed "*"` |

## Nix-Shell

| Operation | Command |
| --------- | ------- |
| New shell with packages | `nix-shell -p pandoc` |

## Garbage Collection & Pruning

| Operation | Command |
| --------- | ------- |
| Remove all generations | `nix-env --delete-generations old` |
| Remove specific generations | `nix-env --delete-generations 10 11 14` |
| Remove generagions by age | `nix-env --delete-generations 14d` |
| Garbage collect | `nix-store --gc` |
| Remove old & garbage collect | `nix-collect-garbage -d` |

## Systemctl

Not NixOS specific.

| Operation | Command |
| --------- | ------- |
| List running services | `systemctl --type=service --state=running` |
| Show timers | `systemctl list-timers` |

## Mounting Drives

To permanently mount a drive, rebuild the hardware-configuration after the drive has been mounted. You many need to prune out Docker overlays before applying with `nixos-rebuild`.

``` sh
$ nixos-regenerate-config
$ nixos-rebuild switch
```
