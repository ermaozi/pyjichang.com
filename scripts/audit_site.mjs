#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "src/.vuepress/dist");
const site = "https://www.pyjichang.com";

const decode = (value) => value
  .replaceAll("&quot;", "\"")
  .replaceAll("&#39;", "'")
  .replaceAll("&amp;", "&");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const attr = (tag, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp(`\\s${escaped}\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))`, "i"));
  return decode(match?.[1] ?? match?.[2] ?? match?.[3] ?? "");
};
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
const meta = (html, name) => tags(html, "meta").find((tag) => attr(tag, "name").toLowerCase() === name);
const listHtml = async (directory) => (await Promise.all((await fs.readdir(directory, { withFileTypes: true })).map(async (entry) => {
  const target = path.join(directory, entry.name);
  if (entry.isDirectory()) return listHtml(target);
  return entry.isFile() && entry.name.endsWith(".html") ? [target] : [];
}))).flat();
const routeOf = (file) => {
  const relative = path.relative(dist, file).split(path.sep).join("/");
  return relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
};

const files = await listHtml(dist);
if (!files.length) throw new Error("未找到构建产物，请先运行 pnpm build");

const pages = await Promise.all(files.map(async (file) => ({ file, route: routeOf(file), html: await fs.readFile(file, "utf8") })));
const routes = new Set(pages.flatMap(({ route }) => [route, route.endsWith("/") ? route.slice(0, -1) || "/" : route]));
const issues = [];
const add = (level, type, route, detail) => issues.push({ level, type, route, detail });

for (const { route, html } of pages) {
  const title = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = attr(meta(html, "description") ?? "", "content");
  const robots = attr(meta(html, "robots") ?? "", "content");
  const canonical = attr(tags(html, "link").find((tag) => attr(tag, "rel").split(/\s+/).includes("canonical")) ?? "", "href");
  const indexable = !/\bnoindex\b/i.test(robots) && route !== "/404.html";
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) add("error", "missing-title", route, "缺少 title");
  else if (title.length > 65) add("warning", "long-title", route, `${title.length} 字符`);
  if (indexable && !description) add("error", "missing-description", route, "缺少 description");
  else if (indexable && (description.length < 45 || description.length > 180)) add("warning", "description-length", route, `${description.length} 字符`);
  if (indexable && !canonical) add("error", "missing-canonical", route, "缺少 canonical");
  else if (canonical && canonical !== site && !canonical.startsWith(`${site}/`)) add("error", "canonical-host", route, canonical);
  if (indexable && h1Count !== 1) add("warning", "h1-count", route, `${h1Count} 个 H1`);

  for (const script of html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) ?? []) {
    try { JSON.parse(script.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "")); }
    catch (error) { add("error", "invalid-json-ld", route, error.message); }
  }

  for (const anchor of tags(html, "a")) {
    const href = attr(anchor, "href");
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const url = new URL(href, `${site}${route}`);
      if (url.origin !== site) continue;
      const target = decodeURI(url.pathname).replace(/\/index\.html$/, "/") || "/";
      if (!routes.has(target) && !/\.[a-z0-9]{2,8}$/i.test(target)) add("error", "broken-internal-link", route, href);
    }
    catch { add("error", "invalid-link", route, href); }
  }
}

for (const issue of issues) console.log(`${issue.level.toUpperCase()} ${issue.type} ${issue.route} — ${issue.detail}`);
const errors = issues.filter(({ level }) => level === "error").length;
const warnings = issues.length - errors;
console.log(`审计完成：${pages.length} 个页面，${errors} 个错误，${warnings} 个警告。`);
if (errors) process.exitCode = 1;
