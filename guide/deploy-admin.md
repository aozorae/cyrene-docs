# 部署后台

管理后台是独立的 Cloudflare Worker。它通过 GitHub API 读取和提交博客仓库中的文章、动态与配置，并使用 D1 保存后台设置、草稿、登录限流和审计记录。

请先完成[部署前端](./deploy-blog)，确保自己的 GitHub 账号或组织中已经有一份博客仓库。

## 最少需要填写什么

> 最少配置是 **5 个 Repository Secrets，0 个 Repository Variables**。

打开博客仓库的 `Settings → Secrets and variables → Actions`。下面 5 项必须全部添加到 **Repository secrets**，不要放到 `Variables` 页签。工作流会在部署开始前逐项检查，缺少任何一项都会停止。

1. **`CLOUDFLARE_ACCOUNT_ID`**  
   填写要部署到的 Cloudflare 账户 ID，可以从目标账户的概览页复制。

2. **`CLOUDFLARE_API_TOKEN`**  
   填写 Cloudflare 自定义 API Token。它只需要目标账户的 `Workers Scripts: Edit` 和 `D1: Edit`。

3. **`BLOG_GITHUB_PAT`**  
   填写后台长期读写博客仓库使用的 GitHub PAT。只选择目标博客仓库，并授予 `Contents: Read and write`。

4. **`ADMIN_PASSWORD`**  
   填写登录管理后台使用的独立高强度密码，不要与其他网站共用。

5. **`SESSION_SECRET`**  
   填写与管理密码不同的长随机值，用来签名登录会话，建议至少 32 个随机字符。

当前后台不使用 R2 或 KV，因此不需要填写相关密钥、存储桶或命名空间。

## 创建 GitHub PAT

`BLOG_GITHUB_PAT` 不是 Action 临时使用的部署密码。后台部署完成后，Worker 仍然需要它调用 GitHub API，所以不能用只在 Action 运行期间有效的默认 `GITHUB_TOKEN` 代替。

建议创建 fine-grained personal access token：

1. 打开 [GitHub Fine-grained tokens](https://github.com/settings/personal-access-tokens)，点击 `Generate new token`。
2. `Resource owner` 选择拥有博客仓库的个人账号或组织。
3. `Repository access` 选择 `Only select repositories`，只勾选刚才部署的博客仓库。
4. 在 `Repository permissions` 中将 `Contents` 设置为 `Read and write`。
5. 创建后立即复制 Token，并保存为仓库 Secret `BLOG_GITHUB_PAT`。

GitHub 会自动提供只读的仓库元数据权限。后台不需要 Actions、Administration、Issues 或 Pull requests 权限。仓库属于组织时，如果组织启用了审批或 SSO，还需要按组织要求授权这个 Token。

这个 Token 用于：

- 读取仓库、分支、文章、动态和配置。
- 创建或更新文件、Git tree 和 commit。
- 删除已发布内容。
- 把目标分支更新到后台创建的新提交。

## 创建 Cloudflare API Token

打开 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)，创建自定义 Token，并把账户资源限制到用于部署后台的那个账户：

| 权限范围 | 权限 |
| --- | --- |
| Account | `Workers Scripts: Edit` |
| Account | `D1: Edit` |

`D1: Edit` 用于查找或创建数据库并执行迁移；`Workers Scripts: Edit` 用于部署 Worker 和注入 Worker Secrets。不需要使用权限更大的 Global API Key。

## 运行部署 Action

1. 确认 5 个 Repository Secrets 已全部保存，名称与表格完全一致。
2. 打开博客仓库的 `Actions`，选择 `Deploy Admin Worker`。
3. 点击 `Run workflow`，选择默认分支，再确认运行。
4. 等待所有步骤变绿；工作流会自动创建或复用 D1、执行迁移、部署 Worker，并注入后台所需的三个运行时 Secrets。
5. 在 `Create or update Worker` 步骤的输出中找到 `workers.dev` 地址。
6. 打开后台地址，使用 `ADMIN_PASSWORD` 登录。
7. 在首次设置中填写博客仓库所有者、仓库名称和发布分支，然后验证连接。

## 可选资源名称

只有需要自定义 Cloudflare 资源名称时，才在 `Variables` 页签添加：

- `ADMIN_WORKER_NAME`：自定义 Worker 名称。
- `ADMIN_D1_NAME`：自定义 D1 数据库名称。

两项都可以留空。默认 Worker 名称是 `<仓库名>-admin`，默认 D1 名称是 `<仓库名>-admin-db`；后续部署会复用同名资源。

## 自动部署范围

首次部署建议手动运行默认分支。之后，默认分支中的 `admin/**` 或后台部署工作流发生变化时，Action 会自动重新部署后台。文章、动态和普通博客配置的提交只触发前端托管平台，不会重复部署后台。

## 常见失败

| Action 提示或失败步骤 | 优先检查 |
| --- | --- |
| `Missing required repository secret` | 5 个值是否全部建在 `Secrets` 页签，名称是否完全一致，值是否为空 |
| D1 列表、创建或迁移失败 | Account ID 是否属于目标账户，Token 是否拥有该账户的 `D1: Edit` |
| Worker 部署或 `secret put` 失败 | Token 是否拥有该账户的 `Workers Scripts: Edit` |
| 后台首次设置无法连接 GitHub | PAT 是否选择了正确仓库，并拥有 `Contents: Read and write` |
| 后台原本可用，之后无法读写 GitHub | PAT 是否已经过期、被撤销，或失去组织授权 |
| 推送后台代码后没有自动部署 | 是否推送到默认分支，以及变更是否位于 `admin/**` 或后台部署工作流中 |

::: warning 密钥安全
不要把 Token、密码或账户凭据写入源码。`ADMIN_PASSWORD` 与 `SESSION_SECRET` 必须使用不同的随机值。删除 Worker、D1 或生产数据前，应先确认影响。
:::
