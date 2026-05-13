import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import kebabCase from "lodash.kebabcase";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "data", "blog");

function showUsage() {
  console.log("用法：pnpm new-post \"文章标题\"");
  process.exit(1);
}

function createPost(title) {
  const slug = kebabCase(title);
  const filename = `${slug}.md`;
  const filepath = path.join(BLOG_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.error(`❌ 文件已存在：src/data/blog/${filename}`);
    process.exit(1);
  }

  const content = `---
title: "${title}"
description: ""
pubDatetime: ${new Date().toISOString()}
tags:
  - others
---
`;

  fs.writeFileSync(filepath, content, "utf-8");
  console.log(`✅ 已创建：src/data/blog/${filename}`);
}

const title = process.argv[2];
if (!title) {
  showUsage();
}

createPost(title);
