# Jace's Blog

基于 [AstroPaper](https://github.com/satnaing/astro-paper) 构建的个人博客，部署在 [blog.sanage.xyz](https://blog.sanage.xyz)。

## 技术栈

- [Astro](https://astro.build/) — 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) — 样式
- [PageFind](https://pagefind.app/) — 站内搜索
- [TypeScript](https://www.typescriptlang.org/)

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

开发服务器运行在 `http://localhost:4321`。

## 编译部署

```bash
# 构建生产版本（包含搜索索引生成）
pnpm build

# 本地预览构建结果
pnpm preview
```

构建输出在 `./dist/` 目录。该目录可直接部署到任何静态托管服务：

- **Cloudflare Pages** — 连接 Git 仓库自动部署
- **Vercel** — 导入项目，自动识别 Astro
- **Netlify** — 拖拽 `dist` 目录或连接 Git
- **GitHub Pages** — 使用 GitHub Actions 推送 `dist` 到 `gh-pages` 分支

## 新增文章

### 一键创建

```bash
pnpm new-post "文章标题"
```

脚本会自动生成带 frontmatter 的 markdown 文件到 `src/data/blog/` 目录。

### 手动创建

在 `src/data/blog/` 目录下新建 `.md` 文件：

```bash
src/data/blog/my-new-post.md
```

支持子目录组织，URL 映射规则如下：

| 文件路径 | 生成的 URL |
|----------|-----------|
| `src/data/blog/post.md` | `/posts/post` |
| `src/data/blog/2025/post.md` | `/posts/2025/post` |
| `src/data/blog/_drafts/post.md` | `/posts/post`（下划线前缀不影响 URL） |
| `src/data/blog/docs/_legacy/post.md` | `/posts/docs/post` |

### Frontmatter 必填字段

```yaml
---
title: "文章标题"
description: "文章描述，用于 SEO 和摘要"
pubDatetime: 2025-01-15T08:00:00Z
---
```

### 完整 Frontmatter 选项

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `title` | 文章标题 | 必填 |
| `description` | 文章描述 | 必填 |
| `pubDatetime` | 发布时间（ISO 8601） | 必填 |
| `modDatetime` | 修改时间 | 无 |
| `author` | 作者 | `SITE.author` |
| `slug` | 自定义 URL 路径 | 文件名 |
| `featured` | 是否在首页 Featured 区展示 | `false` |
| `draft` | 是否为草稿（不发布） | `false` |
| `tags` | 标签数组 | `["others"]` |
| `ogImage` | OG 图片路径或远程 URL | 自动生成 |
| `canonicalURL` | 规范 URL（若文章已在其他平台发布） | `Astro.site` + 路径 |
| `hideEditPost` | 隐藏文章底部的编辑按钮 | `false` |
| `timezone` | 文章时区（IANA 格式） | `SITE.timezone` |

### 文章格式建议

- 文章正文的标题从 `##`（h2）开始，`#` 已由 frontmatter 的 `title` 占用
- 需要目录时，在适当位置插入 `## Table of contents`
- 时间戳可通过浏览器控制台运行 `new Date().toISOString()` 获取

### 图片引用

**方式一：放在 `src/assets/` 目录（推荐，会自动优化）**

```md
![描述](@/assets/images/example.jpg)
<!-- 或相对路径 -->
![描述](../../assets/images/example.jpg)
```

> 注意：不能用 `<img>` 标签引用 `src/assets/` 下的图片。

**方式二：放在 `public` 目录（不会优化，需自行处理）**

```md
![描述](/assets/images/example.jpg)
```

### OG 图片

- 推荐尺寸：**1200 x 640 px**
- 若不在 frontmatter 中指定 `ogImage`，系统会自动生成
- 建议发布前用 [TinyPng](https://tinypng.com/) 或 [TinyJPG](https://tinyjpg.com/) 压缩图片以优化性能
