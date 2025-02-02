import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "机场推荐",
    icon: "mdi:airplane-takeoff",
    prefix: "vpnrecs/",
    link: "vpnrecs/",
  },
  {
    text: "跑路机场",
    icon: "mdi:airplane-landing",
    prefix: "scamvpn/",
    link: "scamvpn/",
  },
  {
    text: "文档",
    icon: "book",
    prefix: "doc/",
    link: "doc/",
  },
]);
