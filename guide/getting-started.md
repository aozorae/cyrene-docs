# 本地开发与手动部署

本页适合需要修改源码、在本地预览，或自行选择托管平台的用户。只想尽快上线时，请直接使用[部署前端](./deploy-blog)和[部署后台](./deploy-admin)。

## 环境要求

- Node.js 22 或更高版本
- pnpm 9 或更高版本
- Git
- 一个用于保存博客内容的 GitHub 仓库

## 获取并启动博客

```bash
git clone https://github.com/aozorae/cyrene-blog.git
cd cyrene-blog
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321`。

如果准备长期使用，建议先在 GitHub 创建自己的仓库，再把本地项目推送到该仓库。后续的文章、动态和配置都以你的仓库为准。

## 构建检查

```bash
pnpm check
pnpm type-check
pnpm build
```

构建输出为 `dist`。构建过程还会生成低清预览图、处理字体子集，并为站内搜索建立索引，因此第一次构建可能稍慢。

## 手动接入托管平台

将自己的 GitHub 仓库导入 Vercel、Netlify、Cloudflare Pages 或其他支持 Astro 的平台，并使用以下设置：

| 设置 | 值 |
| --- | --- |
| 框架 | Astro |
| 根目录 | 仓库根目录 |
| 安装命令 | `pnpm install` |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node.js | 22 或更高 |

部署完成后，把正式域名填写到“基础配置 → 站点配置 → 正式地址”。使用子路径部署时，还需要正确设置站点的 `base`。

## 修改和发布

1. 在本地修改内容或配置。
2. 运行检查和生产构建。
3. 将改动提交并推送到自己的 GitHub 仓库。
4. 等待托管平台检测提交并重新部署。

需要调整后台未开放的配置对象、运行时函数或文章高级字段时，继续阅读[手动配置与高级字段](./manual-configuration)。
