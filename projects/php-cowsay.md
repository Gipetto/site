---
layout: page
title: PHP-Cowsay
section: projects
---
PHP-CowSay is just that, a PHP port of the Cowsay *nix command line utility. This library is not designed for command line use. You should install the original Cowsay for that.

<a class="darr" href="#download">Skip to download link</a>

``` php
$bessie = new Cow('Hello, Farm!');
echo $bessie;
```

begets:

```
  ------------
< Hello, Farm! >
  ------------
          \   ^__^
           \  (oo)\_______
              (__)\       )\/\
                  ||----w |
                  ||     ||
```

See the full <a href="https://github.com/Gipetto/CowSay">Cowsay ReadMe</a> for more implementation details as well as for information on how to create your own carcasses.

#### Getting the code {#download}

CowSay can be installed directly or via <a href="https://getcomposer.org">Composer</a>. It is listed on <a href="https://packagist.org/packages/gipetto/cowsay">Packagist</a>.

#### Issues

Issues are handled via <a href="https://github.com/Gipetto/CowSay/issues">PHP-Cowsay Github Issues</a>.

{% include paypal.html %}
