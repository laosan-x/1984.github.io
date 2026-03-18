---
---

(function() {
    'use strict';

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    function updateThemeIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    window.goHome = function() {
        window.location.href = '{{ "/" | relative_url }}';
    };

    window.toggleTOC = function() {
        const tocContent = document.getElementById('toc-content');
        const toggleBtn = document.querySelector('.toc-toggle');
        if (tocContent && toggleBtn) {
            if (tocContent.classList.contains('toc-hidden')) {
                tocContent.classList.remove('toc-hidden');
                toggleBtn.textContent = '[收起]';
            } else {
                tocContent.classList.add('toc-hidden');
                toggleBtn.textContent = '[展开]';
            }
        }
    };

    window.generateTOC = function() {
        const tocContent = document.getElementById('toc-content');
        const postContent = document.querySelector('.post-content');
        
        if (!tocContent || !postContent) return;

        const headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (headings.length === 0) {
            const toc = document.getElementById('toc');
            if (toc) toc.style.display = 'none';
            return;
        }

        const tocList = document.createElement('ul');
        
        headings.forEach(function(heading, index) {
            const id = 'heading-' + index;
            heading.id = id;

            const li = document.createElement('li');
            li.style.paddingLeft = ((parseInt(heading.tagName.charAt(1)) - 1) * 10) + 'px';
            
            const a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = heading.textContent;
            a.onclick = function(e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            };
            
            li.appendChild(a);
            tocList.appendChild(li);
        });

        tocContent.appendChild(tocList);
    };

    window.calculateReadingTime = function() {
        const postContent = document.querySelector('.post-content');
        const readingTimeEl = document.getElementById('reading-time');
        
        if (!postContent || !readingTimeEl) return;

        const text = postContent.textContent || postContent.innerText;
        const wordCount = text.length;
        const readingTime = Math.ceil(wordCount / 500);

        readingTimeEl.textContent = readingTime + ' 分钟阅读';
    };

    window.calculateWordCount = function() {
        const postContent = document.querySelector('.post-content');
        const wordCountEl = document.getElementById('word-count');
        
        if (!postContent || !wordCountEl) return;

        const text = postContent.textContent || postContent.innerText;
        const wordCount = text.replace(/\s/g, '').length;

        wordCountEl.textContent = wordCount.toLocaleString();
    };

    window.copyLink = function() {
        const url = window.location.href;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function() {
                alert('链接已复制到剪贴板！');
            }).catch(function() {
                fallbackCopy(url);
            });
        } else {
            fallbackCopy(url);
        }
    };

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('链接已复制到剪贴板！');
        } catch (err) {
            alert('复制失败，请手动复制链接：' + text);
        }
        
        document.body.removeChild(textArea);
    }

    const searchIndex = [
        {% for post in site.posts %}
        {
            title: {{ post.title | jsonify }},
            url: {{ post.url | relative_url | jsonify }},
            date: {{ post.date | date: "%Y-%m-%d" | jsonify }},
            content: {{ post.content | strip_html | strip_newlines | jsonify }},
            tags: {{ post.tags | jsonify }},
            categories: {{ post.categories | jsonify }}
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ];

    window.handleSearch = function(query) {
        const searchResults = document.getElementById('search-results');
        const articleList = document.getElementById('article-list');
        
        if (!query || query.trim() === '') {
            if (searchResults) searchResults.innerHTML = '';
            if (articleList) articleList.style.display = 'block';
            return;
        }

        if (articleList) articleList.style.display = 'none';

        const results = searchIndex.filter(function(post) {
            const searchText = query.toLowerCase();
            return post.title.toLowerCase().includes(searchText) ||
                   post.content.toLowerCase().includes(searchText) ||
                   post.tags.some(function(tag) { return tag.toLowerCase().includes(searchText); }) ||
                   post.categories.some(function(cat) { return cat.toLowerCase().includes(searchText); });
        });

        displaySearchResults(results, query);
    };

    function displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">未找到相关文章</div>';
            return;
        }

        let html = '<ul class="article-list">';
        results.forEach(function(post) {
            const highlightedTitle = highlightText(post.title, query);
            const excerpt = getExcerpt(post.content, query, 100);
            
            html += '<li class="article-item" onclick="window.location.href=\'' + post.url + '\'">';
            html += '<div class="article-title">' + highlightedTitle + '</div>';
            html += '<div class="article-desc">' + excerpt + '</div>';
            html += '<div class="article-meta">发布于: ' + post.date + '</div>';
            html += '</li>';
        });
        html += '</ul>';

        searchResults.innerHTML = html;
    }

    function highlightText(text, query) {
        const regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getExcerpt(content, query, maxLength) {
        const lowerContent = content.toLowerCase();
        const queryIndex = lowerContent.indexOf(query.toLowerCase());
        
        if (queryIndex === -1) {
            return content.substring(0, maxLength) + '...';
        }

        const start = Math.max(0, queryIndex - 30);
        const end = Math.min(content.length, queryIndex + query.length + 70);
        let excerpt = content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        return highlightText(excerpt, query);
    }

    document.addEventListener('DOMContentLoaded', function() {
        loadTheme();

        const anchors = document.querySelectorAll('.post-content a[href^="#"]');
        anchors.forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(function(block) {
            block.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(block.textContent);
                    const originalText = block.textContent;
                    block.textContent = '已复制!';
                    setTimeout(function() {
                        block.textContent = originalText;
                    }, 1000);
                }
            });
        });
    });

})();
