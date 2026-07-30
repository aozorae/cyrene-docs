# 基础组件

**入口：后台 → 基础组件**

这里管理导航栏菜单预设、侧边栏布局和组件清单。站点 Logo 与导航标题位于“基础配置 → 站点配置”。

## 导航栏 {#navbar}

**入口：后台 → 基础组件 → 导航栏**  
**手动配置对象：`navBarSearchConfig`、`LinkPresets`、`navBarConfig`**

### 搜索

当前搜索方式固定为 Pagefind，后台中以只读字段显示。Pagefind 在博客构建后生成搜索索引，因此开发服务器和最终构建的搜索结果可能不同。

### 链接预设

后台可以编辑常用页面预设的名称、URL、图标和页面开关关联。常见预设包括：

- 主页、归档、分类、标签
- 动态、友链、留言、相册
- 打赏、关于、追番、番组计划

`pageKey` 用于关联“基础配置 → 站点配置”中的页面开关。关闭对应页面后，使用该预设的导航入口会自动隐藏。

```ts
Archive: {
  name: "归档",
  url: "/archive/",
  icon: "material-symbols:archive",
}
```

### 菜单分组与顺序

菜单的顶层顺序、下拉分组和自定义链接由 `navBarConfig` 生成。当前后台不编辑这部分函数结构，需要手动调整。

每个链接可以使用：

| 字段 | 说明 |
| --- | --- |
| `name` | 显示文字 |
| `url` | 站内路径、完整 URL 或 `#` |
| `icon` | Iconify 图标名 |
| `external` | 是否作为外部链接打开 |
| `children` | 下拉菜单中的子链接数组 |
| `pageKey` | 关联页面开关 |

::: tip 修改菜单时的建议
先修改 `LinkPresets` 中的通用页面名称和图标；只有需要改变分组、顺序或添加特殊链接时，才调整 `navBarConfig`。
:::

## 侧边栏与组件 {#sidebar}

**入口：后台 → 基础组件 → 侧边栏与组件**  
**手动配置对象：`sidebarLayoutConfig`**

### 整体布局

| 字段 | 说明 |
| --- | --- |
| 启用侧边栏 | 关闭后不渲染左右侧边栏 |
| 位置 | `left`、`right` 或 `both` |
| 平板端侧边栏 | 双侧栏时，769 到 1279px 显示左侧或右侧 |
| 文章页隐藏侧边栏 | 只在首页等非文章页显示 |
| 文章页保持双侧栏 | 单侧栏模式下，文章页补充另一侧组件 |

### 三组组件

- **左侧组件**：桌面左侧栏。
- **右侧组件**：桌面右侧栏。
- **移动端底部组件**：小于移动端断点时，在正文之后显示。

数组中的顺序决定显示顺序，但 `top` 组件会优先于 `sticky` 组件。后台支持添加、删除、上移和下移；已有项目默认折叠，新增项目自动展开。

### 通用字段

| 字段 | 说明 |
| --- | --- |
| `type` | 组件类型 |
| `enable` | 是否启用 |
| `showTitle` | 是否显示组件标题，默认开启 |
| `position` | `top` 固定在普通流中，`sticky` 跟随页面滚动 |
| `showOnPostPage` | 是否在文章详情页显示 |
| `hideOnNonPostPage` | 是否只在文章详情页显示 |
| `specificConfig` | 当前组件的专属设置 |

`showOnPostPage` 和 `hideOnNonPostPage` 很容易混淆：

| 目标 | 推荐设置 |
| --- | --- |
| 所有页面都显示 | `showOnPostPage: true`，`hideOnNonPostPage: false` |
| 只在首页等非文章页显示 | `showOnPostPage: false` |
| 只在文章详情页显示 | `showOnPostPage: true`，`hideOnNonPostPage: true` |

`enable: false` 的优先级最高，关闭后其余显示条件都不会让组件出现。

### 可用组件

| 类型 | 用途 | 常用专属设置 |
| --- | --- | --- |
| `profile` | 个人资料 | 内容来自“基础配置 → 个人资料” |
| `announcement` | 公告 | 内容来自“基础配置 → 公告” |
| `music` | 音乐播放器 | 需要同时启用音乐侧边栏显示 |
| `categories` | 分类列表 | 折叠阈值 |
| `tags` | 标签列表 | 折叠阈值 |
| `dynamic` | 最新动态 | 显示数量 `limit` |
| `stats` | 文章与站点统计 | 无额外必填项 |
| `siteInfo` | 站点运行与构建信息 | 未知构建平台回退文字 |
| `calendar` | 日历与年度热力图 | 是否显示热力图 |
| `sidebarToc` | 文章目录 | 通常只在文章页显示 |
| `advertisement` | 图片或文字内容块 | 内容、链接、关闭开关、显示次数、内边距 |

### 专属设置怎么填

- `collapseThreshold`：分类或标签数量超过这个值后自动折叠。它控制初始展示密度，不会删除内容。
- `dynamic.limit`：侧边栏最多显示几条最新动态，与动态页面的每页数量互不影响。
- `siteInfo.unknownBuildPlatform`：无法识别部署平台时显示的替代文字。
- `calendar.showHeatmap`：是否在日历组件下显示年度文章热力图。
- 音乐组件需要同时在“功能配置 → 音乐播放器”开启侧边栏显示，否则组件位置存在也不会播放音乐。

### 广告栏的两种内容

图片广告使用 `image`，文字公告使用 `title`、`content` 和 `link`。两种形式都可以设置：

| 字段 | 含义 |
| --- | --- |
| `closable` | 是否显示关闭按钮 |
| `displayCount` | `-1` 表示不限次数；正数表示同一浏览器最多展示的次数，计数保存在浏览器本地 |
| `external` | `true` 作为外部链接打开，站内地址通常使用 `false` |
| `padding.all` | 为四边设置同一内边距，例如 `1rem`；也可分别使用 `top`、`right`、`bottom`、`left` |
| `expireDate` | 可选的过期时间，使用 ISO 8601 日期时间；当前后台未提供该字段，需要手动配置 |

```ts
// 图片内容块
specificConfig: {
  ad: {
    image: {
      src: "/assets/images/ad/banner.webp",
      alt: "内容说明",
      link: "/about/",
      external: false,
    },
    closable: true,
    displayCount: 3,
    padding: { all: "1rem" },
  },
}
```

`alt` 应说明图片内容，而不是填写“图片”或文件名。若同一个项目同时填写图片和文字字段，实际呈现会更难预测，建议一个项目只选一种内容形式。

### 常见布局

只保留左侧资料和右侧目录：

```ts
export const sidebarLayoutConfig = {
  enable: true,
  position: "both",
  tabletSidebar: "left",
  leftComponents: [
    { type: "profile", enable: true, position: "top", showOnPostPage: true },
  ],
  rightComponents: [
    {
      type: "sidebarToc",
      enable: true,
      position: "sticky",
      showOnPostPage: true,
      hideOnNonPostPage: true,
    },
  ],
};
```

::: warning 组件开关需要互相配合
把音乐、公告或动态组件加入侧边栏，并不会自动完成对应功能配置。请同时确认“功能配置 → 音乐播放器”“基础配置 → 公告”或“页面 → 动态”已经设置。
:::
