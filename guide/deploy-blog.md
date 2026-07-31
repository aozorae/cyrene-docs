# 部署前端

博客前端是独立的 Astro 静态站点。只部署前端就能正常访问博客；只有需要在网页中发布内容和修改配置时，才继续部署管理后台。

## 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aozorae/cyrene-blog&project-name=cyrene-blog&repository-name=cyrene-blog)

点击按钮后，Vercel 会引导你完成下面几件事：

1. 登录或创建 Vercel 账号。
2. 授权 Vercel 访问 GitHub。
3. 在自己的 GitHub 账号中创建 Cyrene 博客仓库。
4. 导入该仓库并开始第一次生产构建。

前端不需要数据库，也没有必须填写的环境变量。仓库已经提供构建配置，通常保持默认值即可。

## 部署前需要准备

- 一个 GitHub 账号，用来保存自己的文章、动态和博客配置。
- 一个 Vercel 账号，用来构建和托管博客前端。
- 确认新仓库创建在自己有管理权限的个人账号或组织下。

## 部署完成后

1. 打开 Vercel 提供的正式域名，确认首页能够正常访问。
2. 记下这个域名；部署后台后，在“基础配置 → 站点配置 → 正式地址”中填写它。
3. 需要自定义域名时，在 Vercel 项目的 `Settings → Domains` 中添加域名，再同步更新站点正式地址。

以后向该 GitHub 仓库推送文章、动态或配置时，Vercel 会自动重新构建前端，不需要重复点击一键部署按钮。

## 下一步

需要可视化发布文章和修改配置时，继续[部署后台](./deploy-admin)。不需要后台时，也可以在 GitHub 或本地直接修改内容。

::: tip 已经有自己的仓库
如果已经 Fork、克隆或导入了 Cyrene 仓库，可以直接在 Vercel 中选择现有仓库，不必通过按钮再创建一个副本。
:::
