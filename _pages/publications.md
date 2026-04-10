---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

<p class="scholar-callout">
  You can also find my work on <a href="{{ site.author.googlescholar }}">Google Scholar</a>.
</p>

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
