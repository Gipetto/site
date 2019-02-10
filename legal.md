---
layout: page
section: about
title: Legal
permalink: /legal
---

### Privacy Statement

Effective Date: Feb 10, 2019

Your privacy is very important to me. I have created this Privacy Policy to demonstrate my commitment to your security and privacy. This policy describes how this site collects, processes and uses your personal information. You should read this Privacy Policy carefully.

- I don't want your damn information. 
- I don't collect your information. 
- We're all good here.

### Third Party Licences

Projects listed below were used in the creation or display of this site. The Licensors have not endorsed this site in any way.

While most of this is not actually necessary, it is nice to acknowledge the shoulders that you stand on.

<div class="grid grid-box">
{% for license in site.data.licenses %}
<div class="grid-cell">
    <h4>{{ license.name }}</h4>
    <ul>
        <li>
            License: <a class="ext" href="{{ license.link }}" target="_blank" rel="noopener">
            {{ license.license }}</a>
        </li>
        <li>Changes: {{ license.changes }}</li>
        <li>
            <a class="ext" href="{{ license.source }}" target="_blank" rel="noopener">Source</a>
        </li>
    </ul>
</div>
{% endfor %}
</div>