#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const dist = path.join(process.cwd(), "src/.vuepress/dist");
const redirects = [
  {
    file: "vpnrecs/naiyun/index.html",
    target: "https://www.pyjichang.com/vpnrecs/ds0jr525/",
    title: "奈云机场旧地址已迁移",
    label: "奈云机场资料页",
  },
  {
    file: "vpnrecs/okanc/index.html",
    target: "https://www.pyjichang.com/vpnrecs/giwzl7sq/",
    title: "OKANC 机场旧地址已迁移",
    label: "OKANC 机场资料页",
  },
];

const redirectHtml = ({ target, title, label }) => `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="canonical" href="${target}">
  <title>${title}</title>
  <script>
    const anchor = window.location.hash;
    window.location.replace("${target}" + anchor);
  </script>
</head>
<body>
  <p>页面已迁移至 <a href="${target}">${label}</a>。</p>
</body>
</html>
`;

await Promise.all(redirects.map(async (redirect) => {
  const file = path.join(dist, redirect.file);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, redirectHtml(redirect), "utf8");
}));
