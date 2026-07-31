# 部署博客与后台

Cyrene 包含两个独立部署单元：Astro 博客和 Cloudflare Worker 管理后台。部署后台是可选的，博客不能依赖后台、D1 或管理 API 才能运行。

## 部署关系

```text
GitHub 仓库
├─ 博客内容与配置 → Vercel / Netlify / 其他静态托管
└─ 管理后台代码   → Cloudflare Worker + D1
```

后台向 GitHub 提交内容后，博客托管平台自行检测提交并构建。后台不会等待或追踪最终部署结果。

## 博客本地构建

```bash
pnpm install
pnpm check
pnpm type-check
pnpm build
```

构建输出为 `dist`。Node.js 应使用 22 或更高版本。

## Vercel

Vercel 是当前推荐的博客部署目标。

1. 在 Vercel 中导入博客仓库。
2. 框架预设选择 `Astro`。
3. 根目录保持仓库根目录。
4. 构建命令填写 `pnpm build`。
5. 输出目录填写 `dist`。
6. 安装命令填写 `pnpm install`。
7. Node.js 选择 22 或更高版本。

部署完成后，把正式域名填写到“基础配置 → 站点配置 → 正式地址”。

## 其他静态托管平台

Netlify、Cloudflare Pages 和其他支持 Astro 的平台使用相同核心设置：

| 设置 | 值 |
| --- | --- |
| 框架 | Astro |
| 安装命令 | `pnpm install` |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node.js | 22 或更高 |

使用子路径部署时，还需要正确设置站点的 `base`；使用自定义域名时，应同时更新站点正式地址。

## 部署管理后台

管理后台通过 GitHub Actions 部署到 Cloudflare Workers。第一次部署时，不需要在本地安装 Wrangler，也不需要手动创建 Worker 或 D1。

### 最少需要填写什么

> 最少配置是 **5 个 Repository Secrets，0 个 Repository Variables**。

GitHub 的设置页同时提供 `Secrets` 和 `Variables`。下面 5 项必须全部添加到 **Repository secrets**，即使账户 ID 本身不属于密码，也不要放到 Variables。工作流会在部署开始前逐项检查，缺少任何一项都会停止。

| Repository Secret | 填写内容 | 最小权限或要求 |
| --- | --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | 要部署到的 Cloudflare 账户 ID | 从目标 Cloudflare 账户的概览页复制 |
| `CLOUDFLARE_API_TOKEN` | Cloudflare 自定义 API Token | 目标账户的 `Workers Scripts: Edit` 和 `D1: Edit`；不需要使用 Global API Key |
| `BLOG_GITHUB_PAT` | 后台长期读写博客仓库使用的 GitHub PAT | 建议使用 fine-grained token，只选择目标仓库，并授予 `Contents: Read and write` |
| `ADMIN_PASSWORD` | 登录管理后台使用的密码 | 使用独立的高强度密码，不要与其他网站共用 |
| `SESSION_SECRET` | 登录会话的签名密钥 | 使用与管理密码不同的长随机值，建议至少 32 个随机字符 |

当前部署不使用 R2 或 KV，因此不需要填写相关密钥、存储桶或命名空间。

### 最快部署步骤

1. 打开博客仓库的 `Settings → Secrets and variables → Actions`。
2. 停留在 `Secrets` 页签，点击 `New repository secret`，依次添加上面的 5 项。
3. 打开仓库的 `Actions`，选择 `Deploy Admin Worker`。
4. 点击 `Run workflow`，选择默认分支，再确认运行。
5. 等待工作流全部变绿；在 `Create or update Worker` 步骤的输出中可以找到部署后的 `workers.dev` 地址。
6. 打开后台地址，使用 `ADMIN_PASSWORD` 登录，并在首次设置中填写要管理的仓库所有者、仓库名称和发布分支。

这就是首次部署的最短路径。工作流会自动完成：

1. 安装后台依赖并同步 Vditor 静态资源。
2. 检查 Worker 类型。
3. 创建或复用 D1 数据库。
4. 执行尚未应用的数据库迁移。
5. 创建或更新 Worker。
6. 通过 Wrangler secrets 注入 GitHub Token、管理密码和会话签名密钥。

### 两个可选 Variables

- `ADMIN_WORKER_NAME`：自定义 Worker 名称。
- `ADMIN_D1_NAME`：自定义 D1 数据库名称。

它们位于同一设置页的 `Variables` 页签，但都可以留空。未设置时，工作流会根据仓库名生成稳定名称：Worker 为 `<仓库名>-admin`，D1 为 `<仓库名>-admin-db`。后续部署会复用同名资源，不会重复创建。

除非账户中已经存在同名资源，或确实需要自定义名称，否则不要填写这两个 Variables，最省步骤也最不容易填错。

### 失败时先看这里

| Action 提示或失败步骤 | 优先检查 |
| --- | --- |
| `Missing required repository secret` | 5 个值是否全部建在 `Secrets` 页签，名称是否完全一致，值是否为空 |
| D1 列表、创建或迁移失败 | `CLOUDFLARE_ACCOUNT_ID` 是否属于目标账户，API Token 是否拥有目标账户的 `D1: Edit` |
| Worker 部署或 `secret put` 失败 | API Token 是否拥有目标账户的 `Workers Scripts: Edit` |
| 后台首次设置无法连接 GitHub | PAT 是否选择了正确仓库，并拥有 `Contents: Read and write` |
| 推送代码后没有自动部署 | 是否推送到了默认分支，以及变更是否位于 `admin/**` 或后台部署工作流中 |

### 自动部署范围

手动运行 Action 时，工作流会直接部署所选分支；首次部署建议始终选择默认分支。之后，只有默认分支中的后台代码或后台部署工作流发生变更时，才会自动触发 Worker 部署。文章、动态和博客配置的提交只需要触发博客静态托管平台，不应重复部署后台。

## 生产安全

- 不把任何 Token、密码或账户凭据写入源码和公开配置。
- `ADMIN_PASSWORD` 与 `SESSION_SECRET` 使用不同的高强度随机值。
- 删除 Worker、D1、生产数据或重置数据库前先确认影响。
- 定期审查 GitHub PAT 和 Cloudflare Token 权限。
- 不把后台域名当作公开 API 提供给第三方前端。
