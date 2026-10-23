# Alma Ríos — 插画师个人作品集

基于 React + Vite 的响应式作品集。奶油色背景、本地衬线字体、自由错位画廊、作品筛选、六个独立项目详情页、About 和 Contact；支持键盘访问、减少动态效果偏好和手机布局。

## 本地运行

要求 Node.js 20.19+ 或 22.12+（此环境已用 Node.js 24 验证）。

```sh
npm ci
npm run dev
```

构建：`npm run build`。预览构建：`npm run preview`。

## 单文件 HTML 预览

执行 `npm run export:html`，生成 `exports/illustrator-portfolio.html`。将这个文件下载后直接用浏览器打开，无需安装 Node 或启动服务器；图片、字体和代码已内嵌，可离线预览。作品详情和 About 使用 hash 路由，筛选与导航可用。邮箱和 Instagram 仍需外部应用或网络。

## 替换为你的内容

- `src/data.js`：修改 `artist` 中的姓名、邮箱、Instagram、简介及地址；修改 `projects` 中的作品图片、标题、年份、分类、项目描述、色彩和图片尺寸。
- `public/art/`：放置个人插画，使用 `/art/文件名` 引用。画廊保留原始图片比例。
- `src/main.jsx`：修改 About 介绍、首页标题及页面文字。`Sketch` 是演示用植物线稿，可替换为真实过程草图。
- `src/styles.css`：调整纸张色、文字色、字体、间距和画廊编排。六个默认作品有各自的位置规则；新增作品可扩展 `.work-item-N` 规则。
- 真实项目若有多张图，在项目数据加入 `gallery` 数组：`[{ src: '/art/page-01.png', alt: '图片描述', caption: '第一话', size: 'wide', align: 'center' }]`。支持 `wide / medium / small` 宽度与 `left / center / right` 对齐，可展示系列插画、漫画页面或过程图。当前详情页展示主图、线稿示意、色彩笔记及主图局部。

Alma Ríos 为虚构展示身份，邮箱和 Instagram 链接需替换。六张插画为生成的示例素材，不是 Ana Leovy 的原作。页面依据提供的视觉参考重新开发，未使用 Wix 运行脚本。上传的压缩脚本不足以还原原网站，且参考网址在此环境返回 403。

## 检查

```sh
npm test
```

Playwright 测试会构建并启动生产预览，检查分类筛选、六个项目路由及刷新、下一作品、About、Contact、404、图片载入及 360 / 390 / 768 / 1440 宽度的页面溢出。此环境使用 `/usr/bin/chromium`；其他机器先运行 `npx playwright install chromium`。

## 部署

发布 `dist/` 目录。静态托管需将非文件路径回退到 `index.html`，以支持 `/about` 和 `/work/项目名` 的直接访问；`public/_redirects` 已提供 Netlify / Cloudflare Pages 的回退规则。图片及字体均为本地资源，不依赖第三方 CDN。

云任务已在隔离环境运行，直接使用 `/workspace/illustrator-portfolio` 的现有 checkout，无需另建 Git worktree。

## GitHub Pages 自动部署

将项目上传到新仓库的 `main` 分支后，在 GitHub 仓库 `Settings → Pages → Build and deployment → Source` 中选择 **GitHub Actions**。`.github/workflows/deploy-pages.yml` 会自动构建并发布。若首次推送时还未启用 Pages，启用后在 Actions 中重新运行部署即可。

部署流程自动识别仓库子路径，并启用 HashRouter，作品与 About 页面可直接打开及刷新。普通部署仍默认使用 BrowserRouter。已在本地静态服务器验证单文件 HTML 与 `/illustrator-portfolio/` 子路径下的筛选、图片、详情、刷新、About、Contact 及手机布局；线上发布需待新仓库地址与相应权限可用。
