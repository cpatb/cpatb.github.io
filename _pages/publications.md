---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: false
classes: wide
---

{% include base_path %}

<p class="pubs-note">
  You can also find my work on <a href="https://scholar.google.com/citations?user=HRr72-UAAAAJ&hl=en&authuser=1&oi=ao">Google Scholar</a>.
</p>

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
