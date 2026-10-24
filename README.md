# Wanyue Wang — 插画作品集

线上网站：https://wanyue-wang.github.io/illustrator-portfolio/

React + Vite 响应式作品集，使用本地 DM Sans 无衬线字体与中文无衬线回退字体、非对称作品画廊、中英文切换、作品分类、独立项目详情页、About 与纯文字 Contact。首次访问默认英文，语言选择保存在当前浏览器。

## 本地运行

要求 Node.js 20.19+ 或 22.12+；此环境使用 Node.js 24。

```sh
npm ci
npm run dev
```

构建：`npm run build`。预览构建：`npm run preview`。

## 内容与样式

- `src/data.js`：`artist` 保存姓名、微信、邮箱及 Instagram；`projects` 保存图片、尺寸、英文文案与分类，`chineseProjects` 保存对应中文文案。
- 分类使用稳定的 `artistic`、`commercial` 标识；全部作品筛选为 `all`，显示文字在语言文件中。示例作品中，原 Personal 归入 artistic，原 Editorial / Collaborations 归入 commercial。
- `src/i18n.jsx`：导航、分类名称、About、联系区、详情标签及页面元信息的中英文文案。语言状态保存在 `wanyue-portfolio-language` 本地存储键中，不按浏览器语言自动切换。
- `public/art/`：替换个人插画，使用 `/art/文件名` 引用；部署构建会自动加上仓库路径。画廊保留图片原始比例。
- `src/styles.css`：背景、字体、间距、画廊编排及 `--hover: #ff9cf8` 粉色信息条。六个默认作品各有位置规则，新增作品可扩展 `.work-item-N`。
- 图片信息在悬停或键盘聚焦时显示，触屏设备常驻显示；图片下方不另设标题或类别。
- 多图项目可加入 `gallery` 数组，例如 `[{ src: '/art/page-01.png', alt: '图片描述', caption: '第一话', size: 'wide', align: 'center' }]`。支持 `wide / medium / small` 宽度及 `left / center / right` 对齐；可选 `translations.zh` 提供中文图片描述与图注。

六张现有插画为生成的示例素材，项目叙述与 About 介绍可继续替换。`Sketch` 是过程线稿示意组件，可换成真实创作草图。联系方式已按提供的修改文档设置。

## 单文件 HTML

执行 `npm run export:html`，生成 `exports/illustrator-portfolio.html`。图片、字体、样式和脚本全部内嵌，可下载后用浏览器打开。详情页和 About 使用 hash 路由，无需服务器；中英文切换和作品筛选均可用。邮箱和 Instagram 需要对应外部应用或网络。

## 验证

```sh
npm test
```

6 组 Playwright 浏览器测试覆盖品牌与同级导航、左侧分类、粉色悬停信息、图片与筛选、项目路由及刷新、中英文切换与记忆、纯文字联系信息、404、触屏访问，以及两种语言在 360 / 390 / 768 / 1024 / 1440 宽度下的字体与溢出。

此环境使用 `/usr/bin/chromium`；其他机器先运行 `npx playwright install chromium`。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 自动构建并部署至 GitHub Pages。仓库 **Settings → Pages → Source** 保持为 **GitHub Actions**。工作流会识别仓库子路径并启用 HashRouter，避免详情页面刷新时出现 404。

其他静态托管发布 `dist/`。默认 BrowserRouter 部署需要将非文件路径回退到 `index.html`；已提供 Netlify / Cloudflare Pages 的 `_redirects` 规则。字体和插画均为本地资源，不依赖第三方 CDN。

云任务已有隔离环境，直接使用 `/workspace/illustrator-portfolio` 的现有 checkout，无需另建 Git worktree。
