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

管理后台通过 GitHub Actions 部署到 Cloudflare Workers。正式部署流程会自动：

1. 安装后台依赖并同步 Vditor 静态资源。
2. 检查 Worker 类型。
3. 创建或复用 D1 数据库。
4. 执行尚未应用的数据库迁移。
5. 创建或更新 Worker。
6. 通过 Wrangler secrets 注入 GitHub Token、管理密码和会话签名密钥。

### 必需的 GitHub Secrets

| Secret | 用途 |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户标识 |
| `CLOUDFLARE_API_TOKEN` | 创建和更新 Worker、D1 的 API 令牌 |
| `BLOG_GITHUB_PAT` | 后台读写目标博客仓库 |
| `ADMIN_PASSWORD` | 单管理员登录密码 |
| `SESSION_SECRET` | 会话签名密钥，应与登录密码不同 |

GitHub PAT 应只授予目标仓库所需的最小内容读写权限。Cloudflare API Token 也应限制在必要账户和资源范围内。

### 可选仓库变量

- `ADMIN_WORKER_NAME`：自定义 Worker 名称。
- `ADMIN_D1_NAME`：自定义 D1 数据库名称。

未设置时，部署流程会根据仓库名生成稳定名称。后续部署会复用同名资源，不会重复创建。

### 首次运行

1. 配置所有 Secrets。
2. 在 GitHub Actions 中手动运行“Deploy Admin Worker”。
3. 打开部署得到的 Worker 地址。
4. 使用管理密码登录。
5. 在首次设置中填写仓库所有者、仓库名称和发布分支。
6. 验证连接后检查仪表盘数据。

### 自动部署范围

后台代码或后台部署工作流发生变更时，会触发 Worker 部署。文章、动态和博客配置的提交只需要触发博客静态托管平台，不应重复部署后台。

## 生产安全

- 不把任何 Token、密码或账户凭据写入源码和公开配置。
- `ADMIN_PASSWORD` 与 `SESSION_SECRET` 使用不同的高强度随机值。
- 删除 Worker、D1、生产数据或重置数据库前先确认影响。
- 定期审查 GitHub PAT 和 Cloudflare Token 权限。
- 不把后台域名当作公开 API 提供给第三方前端。

