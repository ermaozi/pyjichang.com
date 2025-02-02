import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "机场推荐",
      icon: "mdi:airplane-takeoff",
      prefix: "vpnrecs/",
      link: "vpnrecs/",
      children: "structure",
    },
    {
      text: "跑路机场",
      icon: "mdi:airplane-landing",
      prefix: "scamvpn/",
      link: "scamvpn/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "doc/",
      link: "doc/",
      children: "structure",
    },
  ],
});
