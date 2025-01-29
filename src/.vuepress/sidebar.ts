import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "机场推荐",
      icon: "mdi:airplane-takeoff",
      prefix: "机场推荐/",
      link: "机场推荐/",
      children: "structure",
    },
    {
      text: "跑路机场",
      icon: "mdi:airplane-landing",
      prefix: "跑路机场/",
      link: "跑路机场/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "文档/",
      link: "文档/",
      children: "structure",
    },
  ],
});
