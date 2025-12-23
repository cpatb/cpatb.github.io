---
title: "Personal Blog"
permalink: /blog/
layout: password 
author_profile: true
---

Just figured out how to add a blog section to the website. I will hopefully populate this pages with scientific ideas and curios that are informal and tangentially related to research.

<hr>

<!-- This loop lists all posts from the _posts folder -->
<div class="entries-list">
  {% for post in site.posts %}
    <article class="archive__item">
      <h2 class="archive__item-title">
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h2>
      <p class="page__meta"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%B %d, %Y" }}</p>
      {% if post.excerpt %}
        <p class="archive__item-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
      {% endif %}
    </article>
  {% endfor %}
</div>
