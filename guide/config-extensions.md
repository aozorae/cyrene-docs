# 拓展功能

**入口：后台 → 拓展功能**

这里管理樱花特效、页脚、页脚 HTML、文章许可证和看板娘模型。它们都不是博客正常运行的必需项，建议先完成内容和基础配置，再逐项开启。

## 特效 {#effects}

**入口：后台 → 拓展功能 → 特效**  
**手动配置对象：`sakuraConfig`**

| 字段 | 说明 |
| --- | --- |
| 启用 | 樱花特效总开关 |
| 数量 | 同屏樱花数量，越多性能开销越大 |
| 越界次数 | `-1` 表示无限循环 |
| 尺寸 | 最小和最大缩放倍数 |
| 透明度 | 最小和最大不透明度 |
| 水平速度 | 负值向左，正值向右 |
| 垂直速度 | 控制下落速度 |
| 旋转速度 | 控制花瓣旋转 |
| 消失速度 | 不应高于最小不透明度 |
| 层级 | 控制特效位于页面元素的前后关系 |

移动端和低性能设备对全屏粒子更敏感。建议使用较少数量，并同时检查滚动、输入和文章阅读体验。

当前默认参数可以作为调整起点：数量 `21`，尺寸 `0.5` 到 `1.1`，透明度 `0.3` 到 `0.9`，水平速度 `-1.7` 到 `-1.2`，垂直速度 `1.5` 到 `2.2`，旋转速度 `0.03`，消失速度 `0.03`，层级 `100`。

- 水平速度全部为负时，花瓣整体向左飘；跨过 `0` 的范围会同时出现左右方向。
- 垂直速度为正时向下落，绝对值越大移动越快。
- 最小值应小于或等于最大值，否则随机范围会失去意义。
- `fadeSpeed` 每帧降低透明度，值过大会让花瓣突然消失。
- 较高 `zIndex` 会让花瓣覆盖按钮和输入框；只想作为背景装饰时应保持较低层级。

## 页脚 {#footer}

**入口：后台 → 拓展功能 → 页脚**  
**手动配置对象：`footerConfig`**

“页脚”子菜单只有一个总开关，用于决定是否注入自定义 HTML。关闭后，“页脚 HTML”中保存的内容不会显示，但不会被删除。

## 页脚 HTML {#footer-html}

**入口：后台 → 拓展功能 → 页脚 HTML**

这是高级文本编辑入口，可用于备案号、版权补充、站点声明或少量可信链接。

这里保存的内容会按 HTML 原样注入，不会自动把 Markdown 转成 HTML，也不会替你修复未闭合标签。推荐只使用 `p`、`a`、`span`、`br` 等简单标签；样式优先使用现有主题类名，避免大段内联样式。

```html
<p>
  <a href="https://beian.miit.gov.cn/" rel="noreferrer">备案信息</a>
</p>
```

::: danger 只粘贴你理解并信任的 HTML
自定义 HTML 会进入公开页面。不要粘贴来源不明的脚本、统计代码或要求访问账号信息的内容；统计脚本应优先使用“功能配置 → 统计分析”。
:::

## 许可证 {#license}

**入口：后台 → 拓展功能 → 许可证**  
**手动配置对象：`licenseConfig`**

- **启用**：在文章顶部显示许可证信息。
- **名称**：例如 `CC BY-NC-SA 4.0`、`MIT` 或 `All Rights Reserved`。
- **链接**：指向许可证全文或版权说明。
- **图标**：可选 Iconify 名称；留空时根据许可证名称自动匹配。

内置匹配会识别常见 Creative Commons、CC0、公共领域和主流开源软件许可证。每篇文章仍可通过高级 Frontmatter 覆盖全局名称和链接。

## 看板娘模型 {#mascot}

**入口：后台 → 拓展功能 → 看板娘模型**  
**手动配置对象：`spineModelConfig`、`live2dWidgetConfig`**

Spine 与 Live2D 可以独立配置。通常只开启一种，避免遮挡和重复加载资源。

### Spine

| 分组 | 主要设置 |
| --- | --- |
| 模型 | 路径、缩放、X/Y 偏移 |
| 位置 | 四个角落和边缘偏移 |
| 尺寸 | 容器宽度和高度 |
| 交互 | 点击动画、点击消息、待机动画和间隔 |
| 响应式 | 移动端隐藏和断点 |
| 显示 | 层级和透明度 |

点击消息会随机显示；消息显示时间和待机间隔单位均为毫秒。

| 字段 | 怎么填 |
| --- | --- |
| `model.path` | Spine 模型入口 JSON 的公开地址，例如 `/pio/models/spine/character/model.json` |
| `model.scale` | 模型缩放倍数，先从 `1` 开始调整 |
| `model.x` / `model.y` | 模型在画布内的偏移量；不是页面边距 |
| `position.corner` | `bottom-left`、`bottom-right`、`top-left` 或 `top-right` |
| `offsetX` / `offsetY` | 画布距离所选页面边缘的像素数 |
| `size.width` / `size.height` | 画布尺寸，单位像素；过小会裁掉模型 |
| `clickAnimations` / `idleAnimations` | 模型资源中真实存在的动画名；名称写错时该动画不会播放 |
| `messageDisplayTime` | 点击消息停留时间，单位毫秒 |
| `idleInterval` | 待机动画切换间隔，单位毫秒 |
| `mobileBreakpoint` | 小于该宽度时按移动端处理，单位像素 |
| `opacity` | `0` 到 `1`；`0` 为完全透明，`1` 为完全不透明 |

```ts
export const spineModelConfig = {
  enable: true,
  model: { path: "/pio/models/spine/character/model.json", scale: 1, x: 0, y: 0 },
  position: { corner: "bottom-left", offsetX: 0, offsetY: 0 },
  size: { width: 180, height: 220 },
  interactive: {
    enabled: true,
    clickAnimations: ["tap"],
    clickMessages: ["你好。"],
    messageDisplayTime: 3000,
    idleAnimations: ["idle"],
    idleInterval: 8000,
  },
  responsive: { hideOnMobile: true, mobileBreakpoint: 768 },
  zIndex: 1000,
  opacity: 1,
};
```

### Live2D

Live2D 支持单个模型或模型数组。模型数组会启用切换能力。

| 分组 | 主要设置 |
| --- | --- |
| 模型 | 地址、动作声音、缩放、X/Y 偏移 |
| 位置与尺寸 | 左下或右下、画布宽高 |
| 外观 | 主题色、入场时长和动画类型 |
| 菜单 | 图标、文字、动作和对齐方式 |
| 气泡 | 欢迎消息、循环消息、显示时长、间隔和偏移 |
| 响应式 | 移动端隐藏和断点 |

内置菜单动作包括返回主页、返回顶部、休眠、切换模型和打开 GitHub。自定义动作前应确认模型库是否支持。

| 字段 | 怎么填 |
| --- | --- |
| `model.path` | Live2D 模型入口 JSON 的站内地址或允许跨域访问的完整 URL |
| `model.volume` | 动作声音音量，范围 `0` 到 `1`；`0` 为静音 |
| `model.scale` | 模型缩放倍数，先从 `1` 开始 |
| `model.x` / `model.y` | 推荐范围 `-2` 到 `2`；X 正值向右，Y 正值向上 |
| `position` | `bottom-left` 或 `bottom-right` |
| `size` | 画布宽高，单位像素 |
| `primaryColor` | CSS 颜色，例如 `#4f8f7a`、`rgba(...)` 或 `var(--primary)` |
| `transitionDuration` | 入场和退场时长，单位毫秒 |
| `transitionType` | `slide` 滑入滑出，`fade` 淡入淡出 |
| `tips.duration` / `tips.interval` | 单条气泡显示时间和消息切换间隔，单位毫秒；间隔应大于显示时间 |
| `tips.offset.x` / `tips.offset.y` | 气泡位置微调，单位像素；正 X 向右，正 Y 向下 |

菜单动作只接受组件内置标识：

| 动作 | 效果 |
| --- | --- |
| `home` | 返回博客主页 |
| `scrollToTop` | 滚动到页面顶部 |
| `sleep` | 暂时隐藏模型 |
| `switchModel` | 切换到模型数组中的下一项；只有一个模型时没有实际效果 |
| `github` | 打开项目设定的 GitHub 链接 |

远程模型除了入口 JSON 本身，还会继续加载纹理、动作和声音文件。模型服务器必须允许这些资源跨域访问，并保持 JSON 内的相对路径有效；任一依赖返回 404 都可能导致模型空白。

### 调整顺序

1. 先设置画布尺寸和显示角落。
2. 再调整模型缩放和 X/Y 偏移。
3. 检查是否遮挡返回顶部、播放器或移动端导航。
4. 最后开启交互、音量、提示气泡和入场动画。

模型文件通常较大。启用前应确认资源版权、压缩体积和跨域策略。
