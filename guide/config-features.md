# 功能配置

**入口：后台 → 功能配置**

这一组包含八个子菜单：字体、代码块、文章封面、音乐播放器、评论系统、统计分析、Mermaid 图表和 PlantUML 图表。

## 字体 {#font}

**入口：后台 → 功能配置 → 字体**  
**手动配置对象：`fontsList`、`fontConfig`**

字体分为“字体定义”和“使用位置”两层。先在字体列表中定义来源，再在字体选择中引用对应的 CSS 变量。

### 字体定义

| 字段 | 说明 |
| --- | --- |
| 名称 | 便于识别的字体名称 |
| CSS 变量 | 以 `--font-` 开头的唯一变量名 |
| Provider | `google`、`fontsource`、`local`、`bunny`、`fontshare` 或 `npm` |
| 字重 | 例如 `400`、`500`、`700` |
| 字形 | 通常为 `normal`，按字体实际能力填写 |
| 子集 | 例如 `latin`、`cyrillic` |
| 回退字体 | 字体加载失败时依次使用 |

本地字体需要为每个变体填写字体资源地址。远程 Provider 会在构建阶段下载并缓存字体，修改后通常需要重新启动开发服务器。

Provider 决定“字体从哪里来”，名称则必须与对应服务中的字体名称一致。远程服务不可访问或字体名称写错时，构建可能失败；面向中国大陆访问时，应特别留意 Google Fonts 的可用性。

本地字体的每个变体可以设置：

| 字段 | 说明 |
| --- | --- |
| `src` | 一个或多个字体文件地址；优先使用 WOFF2，也可使用 TTF 或 OTF |
| `weight` | 该文件对应的字重，例如 `400` 或 `700` |
| `style` | `normal`、`italic` 或 `oblique` |

```ts
{
  name: "My Local Font",
  cssVariable: "--font-my-local",
  provider: "local",
  options: {
    variants: [
      { src: ["./public/assets/fonts/my-local.woff2"], weight: "400", style: "normal" },
    ],
  },
  fallbacks: ["sans-serif"],
}
```

同一个 CSS 变量不能重复定义。页面选择中引用的变量也必须出现在字体列表里，否则浏览器只能使用回退字体。

### 字体选择

- **启用自定义字体**：总开关。
- **全局字体**：可以填写多个 CSS 变量；使用 `system` 表示系统字体。
- **横幅主标题字体**、**横幅副标题字体**、**导航标题字体**：留空时跟随全局字体。
- **代码字体**：建议使用等宽字体。
- **本地字体子集化**：构建时扫描站点字符并生成较小的 WOFF2 文件。

`subsetFonts.extraChars` 用来强制保留扫描阶段不一定能发现的字符，例如通过脚本动态生成的图标文字、名字或特殊符号。只填写确实需要的字符；内容越多，生成的字体文件越大。

```ts
export const fontConfig = {
  enable: true,
  selected: ["system"],
  bannerTitleFont: "--font-zen-maru-gothic",
  bannerSubtitleFont: "--font-inter",
  navbarTitleFont: "",
  codeFont: "--font-jetbrains-mono",
};
```

::: tip 字体加载建议
中文字体文件通常较大。优先使用系统中文字体，或启用本地字体子集化；不要一次加载大量字重和字形。
:::

## 代码块 {#code-block}

**入口：后台 → 功能配置 → 代码块**  
**手动配置对象：`expressiveCodeConfig`**

代码块由 Expressive Code 渲染，修改主题或插件设置后需要重新启动开发服务器。

| 设置 | 说明 |
| --- | --- |
| 暗色主题 | 暗色模式使用的代码主题 |
| 亮色主题 | 亮色模式使用的代码主题 |
| 折叠开关 | 长代码是否显示折叠按钮 |
| 行数阈值 | 超过多少行后允许折叠 |
| 预览行数 | 折叠状态显示前几行 |
| 默认折叠 | 长代码是否初始收起 |
| 语言徽章 | 右上角显示语言名称 |
| 语言 Logo | 右下角显示语言图标 |
| Logo 颜色 | `mono`、`original`、`theme` 或自定义颜色 |
| 排除语言 | 指定不显示 Logo 的语言列表 |

“行数阈值”决定何时出现折叠能力，“预览行数”决定折叠后保留多少行。预览行数应小于行数阈值；例如阈值 `30`、预览 `12`，表示超过 30 行的代码可以先显示前 12 行。

## 文章封面 {#cover-image}

**入口：后台 → 功能配置 → 文章封面**  
**手动配置对象：`coverImageConfig`**

- **文章页显示封面**：不影响文章列表中的封面卡片。
- **标题叠加布局**：把标题和元数据放在文章封面上。
- **显示加载状态**：使用加载动画替代低清预览图。
- **随机封面开关**：允许文章使用 `image: api`。
- **图片 API 列表**：按顺序尝试，全部失败时保留低清预览并显示错误。

随机图片接口会影响构建稳定性和页面一致性，建议至少准备一个稳定的备用服务，并确认接口允许你的使用方式。

## 音乐播放器 {#music-player}

**入口：后台 → 功能配置 → 音乐播放器**  
**手动配置对象：`musicPlayerConfig`**

### 通用设置

| 字段 | 说明 |
| --- | --- |
| 导航栏显示 | 在顶部提供播放器入口 |
| 侧边栏显示 | 允许 `music` 侧边栏组件渲染 |
| 模式 | `meting` 在线音乐服务，或 `local` 本地列表 |
| 默认音量 | `0` 到 `1` |
| 播放模式 | `list` 列表循环、`one` 单曲循环、`random` 随机播放 |
| 显示歌词 | 显示 LRC 歌词 |

### Meting 模式

- API 地址可以保留 `:server`、`:type`、`:id` 和 `:r` 占位符。
- 平台支持网易云、QQ 音乐、酷狗等服务，取决于 API 实现。
- 类型可选择单曲、歌单、专辑、搜索或艺术家。
- 备用 API 会在主服务失败时依次尝试。
- `id` 的含义由 `type` 决定：歌单模式填歌单 ID，单曲模式填歌曲 ID，搜索模式通常填关键词。
- `auth` 只在你使用的 Meting 服务明确要求认证参数时填写；前端配置会公开给访问者，不能把真正的私密令牌放在这里。

备用 API 按数组顺序请求，因此把最稳定、响应最快的服务放在前面。所有服务都失败时，播放器无法取得在线曲目；它不会自动切换到本地播放列表。

不要在会被浏览器或公开仓库读取的配置中放入真正的私密凭据。

### 本地模式

每首歌可以设置名称、作者、音频地址、封面和歌词。歌词可以是 LRC 文件地址，也可以直接填写 LRC 文本。

```ts
playlist: [
  {
    name: "歌曲名称",
    artist: "作者",
    url: "/assets/music/song.mp3",
    cover: "/assets/music/cover.webp",
    lrc: "/assets/music/song.lrc",
  },
]
```

## 评论系统 {#comments}

**入口：后台 → 功能配置 → 评论系统**  
**手动配置对象：`commentConfig`**

先在“评论系统类型”中选择一个服务。后台只显示当前服务相关字段；选择 `none` 会关闭全站评论。

### Twikoo

| 字段 | 说明 |
| --- | --- |
| 环境地址 | Twikoo 后端地址 |
| 语言 | 例如 `zh-CN` |
| 访问量 | 是否使用 Twikoo 统计文章访问量 |
| JS 地址 | 可替换为适合访问地区的 CDN |
| CSS 地址 | 可选的自定义样式 |

### Waline

- `serverURL`：Waline 服务地址。
- `emoji`：表情包地址列表。
- `login`：`enable` 允许匿名与登录，`force` 强制登录，`disable` 只允许匿名。
- `visitorCount`：文章访问量统计。

### Giscus

Giscus 基于 GitHub Discussions。需要填写仓库、仓库 ID、分类、分类 ID和映射方式。

- `mapping` 常用 `title`、`pathname`、`url` 等方式。
- `strict` 控制严格匹配。
- `reactionsEnabled` 控制主帖反应。
- `emitMetadata` 控制元数据事件。
- `inputPosition` 可选顶部或底部。
- `loading` 建议使用 `lazy`。

仓库必须公开、已启用 Discussions，并安装 Giscus 应用。`repoId` 和 `categoryId` 不是仓库名称或分类名称，可以在 [Giscus 配置页](https://giscus.app/zh-CN) 选择仓库和分类后取得。

```ts
giscus: {
  repo: "owner/repository",
  repoId: "R_...",
  category: "Announcements",
  categoryId: "DIC_...",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "zh-CN",
  loading: "lazy",
}
```

`strict`、`reactionsEnabled` 和 `emitMetadata` 使用字符串 `"1"` 或 `"0"`，不是布尔值。通常推荐 `mapping: "pathname"`，因为标题修改后仍能关联原讨论；如果博客路径会频繁变化，则需要提前规划映射方式。

### Disqus

填写站点的 `shortname`。确认站点域名与 Disqus 后台设置一致。

### Artalk

填写 Artalk 服务端地址、语言和访问量统计开关。

::: warning 评论区仍受页面和文章控制
全局启用评论后，动态页、友链页、打赏页和单篇文章仍可以单独关闭评论。
:::

## 统计分析 {#analytics}

**入口：后台 → 功能配置 → 统计分析**  
**手动配置对象：`analyticsConfig`**

### 基础服务

- Google Analytics：填写 Measurement ID。
- Microsoft Clarity：填写 Project ID。
- 51.la：填写统计 ID，可选自定义 SDK、数据分离标识、事件分析和录屏。

没有使用某项统计服务时，将它的 ID 留空。不要拿示例 ID 上线，否则访问数据可能进入他人的统计项目。

51.la 的字段含义：

| 字段 | 说明 |
| --- | --- |
| `Id` | 51.la 控制台生成的统计 ID；这是启用该服务的核心标识 |
| `sdkUrl` | 自定义 SDK 地址；留空时使用服务默认地址，只有需要自建代理或替换 CDN 时才填写 |
| `ck` | 多个统计 ID 共存时的数据分离标识；只有一个 ID 时通常留空 |
| `autoTrack` | 自动记录常见交互事件，会增加收集的数据范围 |
| `hashMode` | 仅 Hash 路由站点需要；Cyrene 使用 History API，通常保持关闭 |
| `screenRecord` | 允许第三方记录访客会话，隐私与流量开销都高于普通访问统计 |

### Umami

| 字段 | 说明 |
| --- | --- |
| Website ID | Umami 站点标识 |
| 脚本地址 | 支持官方云服务或自建实例 |
| 出站链接 | 是否记录离站点击 |
| Web Vitals | 是否收集浏览器性能指标 |
| 会话回放 | 是否启用录制 |
| 采样率 | `0` 到 `1`，例如 `0.15` 表示 15% |
| 遮罩级别 | `moderate` 遮罩输入框，`strict` 额外遮罩页面文字 |
| 最大时长 | 单次录制时长，单位毫秒 |
| 排除选择器 | 不录制的敏感元素 CSS 选择器 |

启用统计、会话回放或录屏前，请确认当地隐私规则，并在站点隐私说明中如实告知读者。

`sampleRate: 0.15` 表示大约录制 15% 的会话；`maxDuration: 300000` 表示单次最多 5 分钟。即使启用了严格遮罩，也应使用 `blockSelector` 排除登录、评论、支付等敏感区域，并在上线前亲自检查回放内容。

## Mermaid 图表 {#mermaid}

**入口：后台 → 功能配置 → Mermaid 图表**  
**手动配置对象：`mermaidConfig`**

Mermaid 代码块在构建时渲染为静态 SVG，并同时生成亮色和暗色主题版本。

- 亮色主题：`editor-light`、`gruvbox-light`、`ayu-light`。
- 暗色主题：`editor-dark`、`one-dark`、`gruvbox-dark`、`ayu-dark`。

文章中使用：

````markdown
```mermaid
sequenceDiagram
  User->>Admin: 保存草稿
  Admin->>GitHub: 提交内容
```
````

## PlantUML 图表 {#plantuml}

**入口：后台 → 功能配置 → PlantUML 图表**  
**手动配置对象：`plantumlConfig`**

| 字段 | 说明 |
| --- | --- |
| 启用 | 关闭后 `plantuml` 代码块退化为普通代码块 |
| 服务器 | PlantUML 服务地址 |
| 亮色主题 | 留空时使用默认外观 |
| 暗色主题 | 可使用 `cyborg` 等 PlantUML 主题 |

使用公共 PlantUML 服务器意味着图表源码可能会发送到第三方服务。包含内部架构、账号或业务机密时，应使用自建服务器。
