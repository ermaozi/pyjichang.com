import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "便宜机场",
  description: "便宜、稳定、高性价比机场推荐",
  head: [
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
