---
layout: page
title: PHP-Cowsay
section: projects
---
PHP-CowSay is just that, a PHP port of the Cowsay *nix command line utility. This library is not designed for command line use. You should install the original Cowsay for that.

&#x2193; <a href="#download">Skip to download link</a>

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

#### Update History {#update-history}

About the closest I'll get to an official changelog on this is the GitHub commit log: <a href="changelog">View Commit History</a>.

#### Please Donate {#donate}

Donations buy donuts. Donuts help keep us motivated. When we&rsquo;re motivated we make plugins. Please help keep us motivated to make more useful contributions to the coding community.

<div id="paypal">
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
      <input type="hidden" name="cmd" value="_s-xclick" /><br />
      <input type="hidden" name="hosted_button_id" value="6908957" /><br />
      <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" /><br />
      <img alt="" border="0" src="{{ site.baseurl }}/assets/pixel.gif" width="1" height="1" /><br />
	</form>
</div>
