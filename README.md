# MacBlog 84

复古 1984 Macintosh 风格技术博客，基于 Jekyll 构建，部署于 GitHub Pages。

## 功能特性

- 🎨 **复古设计** - 1984 Macintosh 风格界面
- 🌓 **主题切换** - 支持深色/浅色主题
- 📝 **Markdown 写作** - 使用 Markdown 文件撰写文章
- 🏷️ **分类与标签** - 文章分类和标签系统
- 📑 **文章目录** - 自动生成文章 TOC
- 📊 **阅读统计** - 字数统计和阅读时间估算
- 🔍 **全文搜索** - 站内文章搜索
- 🔗 **社交分享** - 分享到社交媒体
- 📱 **响应式设计** - 支持移动端访问
- 📡 **RSS 订阅** - 支持 RSS Feed

## 项目结构

```
my-blog/
├── _config.yml          # Jekyll 配置文件
├── _posts/              # 文章目录（Markdown 文件）
├── _layouts/            # 布局模板
│   ├── default.html     # 默认布局
│   ├── post.html        # 文章布局
│   └── page.html        # 页面布局
├── _includes/           # 可复用组件
│   ├── header.html      # 头部
│   ├── footer.html      # 底部
│   └── sidebar.html     # 侧边栏
├── assets/
│   ├── css/main.css     # 主样式文件
│   └── js/main.js       # JavaScript 文件
├── index.html           # 首页
├── about.md             # 关于页面
├── categories.html      # 分类页面
├── tags.html            # 标签页面
└── Gemfile              # Ruby 依赖
```

## 本地开发

### 环境要求

- Ruby 2.7+
- RubyGems
- GCC 和 Make

### 安装步骤

1. 安装 Jekyll 和 Bundler：

```bash
gem install jekyll bundler
```

2. 克隆仓库并安装依赖：

```bash
git clone https://github.com/your-username/my-blog.git
cd my-blog
bundle install
```

3. 启动本地服务器：

```bash
bundle exec jekyll serve
```

4. 打开浏览器访问 `http://localhost:4000`

## 写作指南

### 创建新文章

在 `_posts` 目录下创建 Markdown 文件，文件名格式为 `YYYY-MM-DD-title.md`：

```
_posts/
├── 2026-03-15-macintosh-history.md
├── 2026-03-10-apple-basic.md
└── 2026-03-01-gui-design.md
```

### 文章模板

```markdown
---
title: "文章标题"
date: 2026-03-18
author: 作者名
categories: [分类1, 分类2]
tags: [标签1, 标签2, 标签3]
toc: true
---

文章摘要...

## 标题一

正文内容...

### 小标题

更多内容...

## 代码示例

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## 表格

| 列1 | 列2 |
|-----|-----|
| 内容 | 内容 |
```

### Front Matter 说明

| 字段 | 说明 | 必填 |
|------|------|------|
| title | 文章标题 | 是 |
| date | 发布日期 | 是 |
| author | 作者名 | 否 |
| categories | 分类列表 | 否 |
| tags | 标签列表 | 否 |
| toc | 是否显示目录 | 否，默认 true |

## 部署到 GitHub Pages

### 方法一：直接部署

1. 在 GitHub 创建仓库 `your-username.github.io`

2. 推送代码：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

3. 在仓库设置中启用 GitHub Pages：
   - 进入 Settings > Pages
   - Source 选择 `main` 分支
   - 点击 Save

4. 访问 `https://your-username.github.io`

### 方法二：使用 GitHub Actions（推荐）

创建 `.github/workflows/jekyll.yml`：

```yaml
name: Build and deploy Jekyll site

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      
      - name: Build site
        run: bundle exec jekyll build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

## 自定义配置

### 修改站点信息

编辑 `_config.yml`：

```yaml
title: 你的博客名称
description: 你的博客描述
author: 你的名字
email: your-email@example.com

social:
  github: your-username
  twitter: your-username
  email: your-email@example.com
```

### 自定义域名

1. 在仓库根目录创建 `CNAME` 文件，写入你的域名：

```
blog.yourdomain.com
```

2. 在域名服务商处添加 DNS 记录：
   - 类型：CNAME
   - 名称：blog
   - 值：your-username.github.io

## 许可证

MIT License

## 致谢

- 设计灵感来自 1984 年 Apple Macintosh
- 使用 [Jekyll](https://jekyllrb.com/) 构建
- 部署于 [GitHub Pages](https://pages.github.com/)
