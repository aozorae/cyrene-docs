# 手动配置与高级字段

管理后台覆盖日常使用所需的大部分配置，但不会把运行时函数、构建常量和所有高级字段都转换成表单。本页说明什么时候需要手动修改，以及如何避免破坏配置结构。

## 后台如何读取配置

后台只编辑白名单中的字面量配置对象和数组，并在保存时替换对应的 `export const` 值。这样可以保留文件中的类型声明、函数和大部分注释，也能避免后台变成任意文件编辑器。

以下内容通常不会出现在表单中：

- 通过函数调用动态生成的配置。
- 运行时函数和辅助方法。
- 顶部常量，例如站点语言常量。
- 后台尚未加入白名单的配置对象。
- 需要代码结构而不只是 JSON 数据的内容。

## 手动修改流程

1. 根据文档找到对应的配置对象名称。
2. 只修改对象值，不删除类型导入、导出名称或周围函数。
3. 保持字符串、数字、布尔值、数组和对象的原有类型。
4. 运行 `pnpm check` 和 `pnpm type-check`。
5. 运行 `pnpm build`，确认构建期插件与内容数据正常。
6. 提交到 GitHub，等待静态托管平台部署。

::: warning 不要把密钥放入博客配置
博客配置会进入公开仓库或浏览器产物。API Key、Token、数据库凭据和后台密码应使用托管平台环境变量、GitHub Secrets 或 Wrangler secrets。
:::

## 显示设置面板

**后台状态：暂未提供图形化入口**  
**手动配置对象：`displaySettingsConfig`**

这个对象控制读者在博客“显示设置”面板中可以切换哪些选项。关闭某项后，读者看不到对应控制，但站点默认配置仍然生效。

| 字段 | 控制内容 |
| --- | --- |
| `themeColorSwitchable` | 主题色选择器 |
| `layoutSwitchable` | 文章列表布局切换 |
| `cardBorderSwitchable` | 卡片边框和阴影 |
| `cardFollowThemeSwitchable` | 卡片跟随主题色 |
| `wallpaperModeSwitchable` | 壁纸模式切换 |
| `wavesSwitchable` | 水波纹开关 |
| `gradientSwitchable` | 渐变过渡开关 |
| `bannerTitleSwitchable` | 横幅标题显示开关 |
| `bannerCarouselSwitchable` | 壁纸轮播开关 |
| `sakuraSwitchable` | 樱花特效开关 |

全屏透明模式的三个滑块可以整体关闭，也可以分别控制：

```ts
overlaySwitchable: {
  opacity: true,
  blur: true,
  cardOpacity: true,
}
```

## 导航栏分组

**后台入口：基础组件 → 导航栏**

后台可以编辑链接预设，但顶层分组、下拉层级和链接顺序由 `navBarConfig` 的构建函数决定，需要手动调整。

```ts
links.push({
  name: "文章",
  url: "#",
  icon: "material-symbols:article",
  children: [LinkPresets.Archive, LinkPresets.Categories, LinkPresets.Tags],
});
```

建议优先复用 `LinkPresets`，这样页面开关、图标和 URL 的含义保持一致。

## 文章高级字段

**后台入口：发布文章**

当前表单尚未提供以下字段：

| 字段 | 用途 |
| --- | --- |
| `updated` | 记录最后更新时间 |
| `draft` | 手动控制文章是否进入公开构建 |
| `pinned` | 将文章置顶 |
| `lang` | 覆盖站点默认语言 |
| `author` | 覆盖默认作者 |
| `sourceLink` | 标注转载或参考来源 |
| `licenseName` | 覆盖全局许可证名称 |
| `licenseUrl` | 覆盖全局许可证链接 |
| `comment` | 单独关闭或开启评论 |
| `password` | 设置文章访问密码 |
| `passwordHint` | 给读者显示密码提示 |

```yaml
---
title: 高级字段示例
published: 2026-07-30
updated: 2026-08-02
pinned: true
comment: false
licenseName: CC BY 4.0
licenseUrl: https://creativecommons.org/licenses/by/4.0/
sourceLink: https://example.com/source
password: example-password
passwordHint: 与文章主题有关
---
```

文章密码适合普通访问限制。仓库中保存的内容与构建流程仍可能被有权限的人读取，不应把它当作机密文档系统。

## 配置数据限制

后台会拒绝异常大的配置，以避免 Worker 请求耗时过长或意外覆盖仓库：

- 对象嵌套不能无限加深。
- 单个数组不适合保存数百个以上项目。
- 超长字符串和过大的总配置会被拒绝。
- 不允许使用 `__proto__`、`prototype`、`constructor` 等危险字段名。

大量结构化数据应拆成专门的内容数据源，而不是继续塞入一个配置对象。

## 修改后需要重启的设置

以下设置参与构建插件初始化，本地开发时修改后应重新启动 `pnpm dev`：

- 代码块主题与插件。
- 提醒框主题与 Python-Markdown 兼容模式。
- 字体定义和字体 Provider。
- Mermaid、PlantUML 等构建期渲染设置。

