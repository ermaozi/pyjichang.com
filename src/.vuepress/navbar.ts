import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "机场推荐",
    icon: "mdi:airplane-takeoff",
    prefix: "机场推荐/",
    link: "vpnrecs/",
  },
  {
    text: "跑路机场",
    icon: "mdi:airplane-landing",
    prefix: "跑路机场/",
    link: "scamvpn/",
  },
  {
    text: "文档",
    icon: "book",
    prefix: "文档/",
    link: "doc/",
  },
]);
