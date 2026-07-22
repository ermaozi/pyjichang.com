import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "便宜机场评测",
  description: "专注低价机场套餐的价格核验、试用条件、风险记录与选购方法，帮助预算有限的用户先试后买。",
  head: [
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" }],
    ["meta", { property: "og:site_name", content: "便宜机场评测" }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:image", content: "https://www.pyjichang.com/logo.png" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["link", { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLM 内容索引" }],
    ["script", { type: "application/ld+json" }, JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.pyjichang.com/#website",
          url: "https://www.pyjichang.com/",
          name: "便宜机场评测",
          description: "低价机场套餐价格核验、试用条件、风险记录与选购方法。",
          inLanguage: "zh-CN",
          publisher: { "@id": "https://www.pyjichang.com/about.html#organization" },
        },
        {
          "@type": "Organization",
          "@id": "https://www.pyjichang.com/about.html#organization",
          name: "便宜机场评测",
          url: "https://www.pyjichang.com/",
          logo: { "@type": "ImageObject", url: "https://www.pyjichang.com/logo.png" },
          sameAs: ["https://ermao.net", "https://ermao.org", "https://ermaozi.org"],
        },
      ],
    })],
    [
      "meta",
      {
        name: "msvalidate.01",
        content: "AA6A94C11C3165EA5B4259E999ED105F",
      },
    ],
  ],

  theme,

  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ["if-function"],
          },
        },
      },
    },
  }),

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
