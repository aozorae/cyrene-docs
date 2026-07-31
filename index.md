---
layout: page
title: Cyrene 文档
description: 从管理后台出发，完成博客配置、内容发布与部署。
sidebar: false
aside: false
pageClass: cyrene-home
---

<section class="cyrene-hero">
  <div class="cyrene-hero-inner">
    <p class="cyrene-kicker">Cyrene Blog Documentation</p>
    <h1><span>从后台入口开始</span><span>配置你的博客</span></h1>
    <p class="cyrene-hero-copy">这份文档按 Cyrene 管理后台的真实导航组织。优先告诉你从哪里进入、应该填写什么；需要手动调整时，再补充配置对象与参数含义。</p>
    <div class="cyrene-actions">
      <a class="cyrene-action cyrene-action-primary" href="/guide/deploy-blog">快速开始</a>
      <a class="cyrene-action" href="/guide/admin-overview">认识管理后台</a>
    </div>
  </div>
</section>

<section class="cyrene-section">
  <div class="cyrene-section-head">
    <h2>快速开始</h2>
    <p>先一键部署博客前端，需要可视化管理时再部署后台。两个部署单元彼此独立。</p>
  </div>
  <div class="cyrene-grid">
    <a class="cyrene-entry" href="/guide/deploy-blog">
      <small>STEP 01</small>
      <strong>部署前端</strong>
      <span>通过 Vercel 一键创建自己的仓库并上线博客。</span>
    </a>
    <a class="cyrene-entry" href="/guide/deploy-admin">
      <small>STEP 02 · OPTIONAL</small>
      <strong>部署后台</strong>
      <span>配置最小权限后，通过 GitHub Actions 部署管理后台。</span>
    </a>
  </div>
</section>

<section class="cyrene-section">
  <div class="cyrene-section-head">
    <h2>按后台分类查找配置</h2>
    <p>侧栏中的五个配置入口就是文档主目录。进入某一类后，再通过页面顶部的子菜单切换具体配置。</p>
  </div>
  <div class="cyrene-grid">
    <a class="cyrene-entry" href="/guide/config-foundation">
      <small>01 · FOUNDATION</small>
      <strong>基础配置</strong>
      <span>站点配置、个人资料、公告和背景壁纸。</span>
    </a>
    <a class="cyrene-entry" href="/guide/config-components">
      <small>02 · COMPONENTS</small>
      <strong>基础组件</strong>
      <span>导航栏、侧边栏以及侧边栏组件的顺序和显示条件。</span>
    </a>
    <a class="cyrene-entry" href="/guide/config-features">
      <small>03 · FEATURES</small>
      <strong>功能配置</strong>
      <span>字体、代码块、文章封面、音乐、评论、统计与图表。</span>
    </a>
    <a class="cyrene-entry" href="/guide/config-pages">
      <small>04 · PAGES</small>
      <strong>页面</strong>
      <span>动态、友链、相册和打赏等独立页面。</span>
    </a>
    <a class="cyrene-entry" href="/guide/config-extensions">
      <small>05 · EXTENSIONS</small>
      <strong>拓展功能</strong>
      <span>特效、页脚、页脚 HTML、许可证和看板娘模型。</span>
    </a>
    <a class="cyrene-entry" href="/guide/manual-configuration">
      <small>ADVANCED</small>
      <strong>手动配置与高级字段</strong>
      <span>后台尚未开放的显示设置、导航结构和文章高级字段。</span>
    </a>
  </div>
</section>

<section class="cyrene-section">
  <div class="cyrene-section-head">
    <h2>一次发布会经过哪里</h2>
    <p>后台和博客是两个独立部署单元。后台负责生成 GitHub 提交，博客仍由你选择的静态托管平台构建。</p>
  </div>
  <div class="cyrene-flow">
    <div><b>1 · 编辑</b><span>在后台编辑文章、动态或配置。</span></div>
    <div><b>2 · 草稿</b><span>需要稍后处理时，保存到 D1 的待提交区。</span></div>
    <div><b>3 · 提交</b><span>确认后由后台创建 GitHub commit。</span></div>
    <div><b>4 · 部署</b><span>Vercel 等平台检测提交并重新构建博客。</span></div>
  </div>
</section>
