---
layout: section
section: blog
eleventyImport:
  collections: ["posts"]
scripts: 
  - https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.js
---

<h2>Blog Archives</h2>

{% assign all_categories = collections.posts | map: "data.categories" | uniq | sort %}

{% assign year = undefined %}
{% assign month = undefined %}
{% assign closeUl = undefined %}

<section class="archives-list">
  
  <aside>
    <div class="search">
      <h3>Search</h3>
      <form>
        <input type="search" name="q" value="" placeholder="Search">
        <button class="sr-only">
          <svg viewBox="0 0 16 16" class="icon" aria-hidden="true" width="16" height="16">
            <use xlink:href="#icon-magnifier"></use>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
    </div>
    <div class="categories">
      <div>
        <h3>Filter</h3>
        <form>
          <ul>
            {% for category in collections.categories -%}
              <li>
                <input type="checkbox" id="{{category | downcase | slugify}}" name="{{ category | downcase }}" value="{{ category | downcase }}">
                <label for="{{ category | downcase | slugify }}">{{ category }}</label>
              </li>
            {%- endfor %}
            <li><button type="reset">Reset Filter</button></li>
          </ul>
        </form>
      </div>
    </div>
    <div class="rss-feed">
      <hr>
      <p>{% render "./assets/icons/rss.svg" %} <a href="{{ site.url }}/feed.xml">Blog RSS</a></p>
    </div>
  </aside>

  <div class="posts">
    <ul>
      {% for post in collections.posts -%}
      <li data-categories="{{ post.data.categories | join: " " | downcase }}" data-slug="{{ post.page.fileSlug }}">
        <a class="card" href="{{ post.url }}">
          <div>
            <span>
              <span class="day">{{ post.date | date: "%d" }}</span>,
              <span class="month">{{ post.date | date: "%b" }}</span>
            </span>
            <span>
              <span class="year">{{ post.date | date: "%Y" }}</span>
            </span>
          </div>
          <div>
              <h3>{{ post.data.title }}</h3>
              <p class="meta">{{ post.data.categories | join: ", " }}</p>
          </div>
        </a>
      </li>
      {%- endfor %}
      <li class="no-results" hidden>
        <h3>No results found.</h3>
      </li>
    </ul>
  </div>

</section>
