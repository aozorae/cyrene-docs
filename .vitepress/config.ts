import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Cyrene 文档",
  description: "Cyrene 博客与可视化管理后台使用文档",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["README.md"],
  head: [
    ["link", { rel: "icon", href: "/images/brand-mark.png" }],
    ["meta", { name: "theme-color", content: "#1f6b52" }],
  ],
  themeConfig: {
    logo: "/images/brand-mark.png",
    siteTitle: "Cyrene 文档",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "快速开始",
        items: [
          { text: "部署前端", link: "/guide/deploy-blog" },
          { text: "部署后台", link: "/guide/deploy-admin" },
        ],
      },
      { text: "后台使用", link: "/guide/admin-overview" },
      {
        text: "配置指南",
        items: [
          { text: "基础配置", link: "/guide/config-foundation" },
          { text: "基础组件", link: "/guide/config-components" },
          { text: "功能配置", link: "/guide/config-features" },
          { text: "页面", link: "/guide/config-pages" },
          { text: "拓展功能", link: "/guide/config-extensions" },
        ],
      },
      { text: "博客", link: "https://cyrene-blog.vercel.app" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始使用",
          items: [
            { text: "认识管理后台", link: "/guide/admin-overview" },
            { text: "发布文章与动态", link: "/guide/content-publishing" },
          ],
        },
        {
          text: "按后台入口配置",
          items: [
            { text: "基础配置", link: "/guide/config-foundation" },
            { text: "基础组件", link: "/guide/config-components" },
            { text: "功能配置", link: "/guide/config-features" },
            { text: "页面", link: "/guide/config-pages" },
            { text: "拓展功能", link: "/guide/config-extensions" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "本地开发与手动部署", link: "/guide/getting-started" },
            { text: "手动配置与高级字段", link: "/guide/manual-configuration" },
            { text: "常见问题", link: "/guide/troubleshooting" },
          ],
        },
        {
          text: "快速开始",
          items: [
            { text: "部署前端", link: "/guide/deploy-blog" },
            { text: "部署后台", link: "/guide/deploy-admin" },
          ],
        },
      ],
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
          modal: {
            noResultsText: "没有找到相关内容",
            resetButtonTitle: "清除搜索",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/aozorae/cyrene-docs" },
    ],
    editLink: {
      pattern: "https://github.com/aozorae/cyrene-docs/edit/main/:path",
      text: "在 GitHub 上编辑此页",
    },
    outline: { label: "本页内容", level: [2, 3] },
    lastUpdated: { text: "最后更新" },
    docFooter: { prev: "上一页", next: "下一页" },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "文档目录",
    darkModeSwitchLabel: "切换主题",
    footer: {
      message:
        "Cyrene 在 Firefly 与 Fuwari 的基础上持续演进，管理后台与博客保持独立部署。",
      copyright: "Copyright © 2026 Cyrene",
    },
  },
});
