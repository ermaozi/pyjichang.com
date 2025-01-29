import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "便宜机场",
  description: "便宜、稳定、高性价比机场推荐",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
