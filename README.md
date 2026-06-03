# 今日热搜

> 聚合微博、知乎、B站等 21 个平台的实时热搜数据，一屏看全网热点。

![Vue3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)

---

## 功能特性

- 🔥 聚合 **21 个平台**热搜（微博、知乎、B站、抖音、今日头条等）
- ✅ 平台选择器：按分类勾选，选择结果自动持久化
- 🔗 条目可点击，直接跳转对应平台原始内容
- ⏱️ 实时显示更新时长（X 秒前 / X 分钟前）
- 🔄 每 10 分钟自动刷新，支持手动刷新
- 📱 响应式布局，适配桌面 / 平板 / 移动端
- 🛡️ API 不可用时自动回退 mock 数据，页面不报错

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript + Vite |
| 数据来源 | [DailyHotApi](https://github.com/imsyy/DailyHotApi) |
| 并发启动 | concurrently |

---

## 快速开始

### 前置条件

- Node.js >= 18
- Git

### 第一步：克隆项目

```bash
# --recurse-submodules 会同时拉取内置的 DailyHotApi
git clone --recurse-submodules https://github.com/kz980213/HotNews.git
cd HotNews
```

### 第二步：初始化依赖

```bash
npm run setup
```

此命令会自动完成：
1. 安装前端依赖（`npm install`）
2. 安装 DailyHotApi 依赖（`npm install --prefix server`）
3. 从 `server/.env.example` 生成 `server/.env`（含端口 6688 等默认配置）

### 第三步：启动项目

```bash
npm run dev:all
```

启动后访问：**http://localhost:5173**

> DailyHotApi 运行在 `http://localhost:6688`，前端通过 Vite proxy 自动转发，无需手动配置跨域。

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run setup` | 首次使用初始化（安装依赖 + 生成配置） |
| `npm run dev:all` | **同时启动** API 后端 + 前端开发服务器 |
| `npm run dev` | 仅启动前端（适合 API 已在运行的情况） |
| `npm run api` | 仅启动 DailyHotApi |
| `npm run build` | 构建前端生产包 |

---

## 注意事项

### 克隆时忘记加 `--recurse-submodules`

如果 `server/` 目录为空，执行以下命令补初始化：

```bash
git submodule update --init
npm run setup
```

### 修改 API 端口

编辑 `server/.env`，修改 `PORT` 的值，同时同步修改 `vite.config.ts` 中 proxy 的 `target` 地址：

```ts
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:6688', // ← 改成新端口
  }
}
```

### 无网络 / API 不可用

微博、知乎、B站三个平台内置了 mock 数据，其余平台在 API 不可用时会显示「暂无数据」，不影响页面整体使用。

---

## 项目结构

```
HotNews/
├── server/               # DailyHotApi（git submodule）
├── scripts/
│   └── setup.cjs         # 初始化脚本
├── src/
│   ├── api/              # 数据请求 + mock 兜底
│   ├── components/
│   │   ├── home/         # Hero、StatCard、PlatformSelector 等
│   │   ├── hotlist/      # PlatformColumn、HotItem、RankBadge 等
│   │   └── icons/        # 平台图标组件
│   ├── composables/      # useHotList、usePlatformSelector、useAutoRefresh
│   ├── config/           # 平台配置（21 个平台 + 分类）
│   ├── types/            # TypeScript 类型定义
│   └── views/            # HomeView
├── vite.config.ts        # Vite 配置（含 API proxy）
└── package.json
```

---

## License

MIT
