---
layout: page
title: 关于
window_title: 关于本机
permalink: /about/
---

<div style="text-align: center; padding: 40px 20px;">
    <img src="{{ '/assets/images/happy-mac.png' | relative_url }}" 
         alt="Happy Mac" 
         class="pixel-img" 
         style="width: 64px; height: 64px; margin-bottom: 20px;"
         onerror="this.style.display='none'">
    
    <h1>{{ site.title }}</h1>
    <p style="margin-top: 20px; font-size: 1.1rem;">版本 2.0</p>
    <p>致敬 1984</p>
    
    <p style="margin-top: 30px; font-weight: normal; max-width: 600px; margin-left: auto; margin-right: auto;">
        本站采用复古 1984 年苹果 Macintosh 风格设计。<br>
        基于 Jekyll 构建，使用 Markdown 撰写文章。<br>
        部署于 GitHub Pages。
    </p>
    
    <div style="margin-top: 40px; padding: 20px; border: 1px solid var(--text-color); display: inline-block;">
        <h3 style="margin-bottom: 15px;">技术栈</h3>
        <ul style="list-style: none; font-weight: normal; text-align: left;">
            <li><i class="fa-brands fa-github"></i> GitHub Pages</li>
            <li><i class="fa-solid fa-gem"></i> Jekyll 4.3</li>
            <li><i class="fa-brands fa-markdown"></i> Markdown / Kramdown</li>
            <li><i class="fa-solid fa-palette"></i> 纯 CSS 复古风格</li>
        </ul>
    </div>
    
    <div style="margin-top: 40px;">
        <h3 style="margin-bottom: 15px;">联系方式</h3>
        <div style="display: flex; justify-content: center; gap: 20px; font-size: 1.5rem;">
            {% if site.social.github %}
            <a href="https://github.com/{{ site.social.github }}" target="_blank" title="GitHub">
                <i class="fa-brands fa-github"></i>
            </a>
            {% endif %}
            {% if site.social.twitter %}
            <a href="https://twitter.com/{{ site.social.twitter }}" target="_blank" title="Twitter">
                <i class="fa-brands fa-twitter"></i>
            </a>
            {% endif %}
            {% if site.social.email %}
            <a href="mailto:{{ site.social.email }}" title="Email">
                <i class="fa-solid fa-envelope"></i>
            </a>
            {% endif %}
        </div>
    </div>
</div>
