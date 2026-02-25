import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "便宜机场",
  description: "便宜、稳定、高性价比机场推荐",

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
