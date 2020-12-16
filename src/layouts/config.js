/**
 * 系统默认菜单配置项
 */
export default [
  {
    icon: "wp-hot",
    path: "/dashboard",
    title: "可视化设计器",
    roles: ["admin", "editor", "guest"]
  },
  {
    icon: "wp-box",
    path: "/factory",
    title: "schema组件",
    roles: ["admin", "editor", "guest"]
  },
  {
    icon: "wp-discount",
    path: "/sketch-ruler",
    title: "测量工具尺",
    roles: ["admin", "editor", "guest"]
  },
  {
    icon: "wp-remind1",
    path: "/utils",
    title: "自定义 hooks",
    roles: ["admin", "editor"]
  },
  {
    icon: "wp-data",
    path: "/iframe",
    title: "iframe通信",
    roles: ["admin", "editor"]
  }
];
