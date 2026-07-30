# Cyrene Docs

Cyrene 博客与管理后台的中文文档站，内容按后台真实入口组织。

在线文档：[cyrene-docs.vercel.app](https://cyrene-docs.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aozorae/cyrene-docs)

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Vercel 部署

在 Vercel 中导入 `aozorae/cyrene-docs` 即可。仓库已经包含 `vercel.json`：

- 安装命令：`corepack pnpm install`
- 构建命令：`corepack pnpm build`
- 输出目录：`.vitepress/dist`

文档基于 VitePress。博客源码位于 [aozorae/cyrene-blog](https://github.com/aozorae/cyrene-blog)，上游主题为 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)，其基础模板为 [saicaca/fuwari](https://github.com/saicaca/fuwari)。
