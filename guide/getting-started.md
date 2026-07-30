# 快速开始

Cyrene 是一个基于 Astro 的静态博客，并附带一个可选的 Cloudflare Worker 管理后台。博客可以单独运行；只有需要可视化发布和配置时，才需要部署后台。

## 环境要求

- Node.js 22 或更高版本
- pnpm 9 或更高版本
- Git
- 一个用于保存博客内容的 GitHub 仓库

## 安装博客

```bash
git clone https://github.com/aozorae/cyrene-blog.git
cd cyrene-blog
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321`。

## 构建检查

```bash
pnpm check
pnpm type-check
pnpm build
```

构建过程会生成低清预览图、构建 Astro 页面、处理字体子集，并为站内搜索建立索引。第一次构建时间通常比普通 Astro 项目更长。

## 两种配置方式

### 使用管理后台

这是推荐方式。登录后台后，从左侧的“配置”区域进入：

- **基础配置**：站点身份、个人资料、公告、壁纸
- **基础组件**：导航栏、侧边栏与组件
- **功能配置**：字体、代码、封面、音乐、评论、统计和图表
- **页面**：动态、友链、相册、打赏
- **拓展功能**：特效、页脚、许可证、看板娘

修改后可以选择“保存草稿”或“提交到 GitHub”。

### 手动修改配置

不部署后台也可以完整使用博客。找到文档中提到的同名配置对象，按示例修改后提交到 GitHub，再由托管平台重新构建。

::: tip 配置对象是什么
例如“站点配置”对应 `siteConfig`，“个人资料”对应 `profileConfig`。文档不会要求你记住具体文件路径，而是同时给出后台入口和对象名称。
:::

## 下一步

1. 先阅读[认识管理后台](./admin-overview)，了解草稿、提交和部署的关系。
2. 按[基础配置](./config-foundation)完成站点标题、资料和壁纸。
3. 通过[发布文章与动态](./content-publishing)创建第一篇内容。

