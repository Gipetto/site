---
layout: cheatsheet
title: Cheat Sheets
section: cheatsheets
---

<ul>
    {% for page in site.pages -%}
        {%- if page.category == "cheatsheet" %}
            <li>
                <a href="{{ page.url }}">{{ page.title }}</a>
            </li>
        {% endif -%}
    {%- endfor %}
</ul>