import type { PlatformConfig, PlatformCategoryGroup } from '@/types'

// ─── 所有支持的平台（对应 DailyHotApi 路由）──────────────────────────────────

export const PLATFORMS: PlatformConfig[] = [
  // 社交与短视频
  { id: 'weibo',        name: '微博',         subtitle: '热搜榜',   color: '#e6162d', apiPath: '/api/weibo',        metricUnit: '热度', category: '社交与短视频' },
  { id: 'douyin',       name: '抖音',         subtitle: '热点榜',   color: '#161823', apiPath: '/api/douyin',       metricUnit: '热度', category: '社交与短视频' },
  { id: 'kuaishou',     name: '快手',         subtitle: '热点榜',   color: '#ff4906', apiPath: '/api/kuaishou',     metricUnit: '热度', category: '社交与短视频' },
  { id: 'bilibili',     name: '哔哩哔哩',     subtitle: '热门视频', color: '#fb7299', apiPath: '/api/bilibili',     metricUnit: '播放', category: '社交与短视频' },

  // 问答与社区
  { id: 'zhihu',        name: '知乎',         subtitle: '热榜',     color: '#0066ff', apiPath: '/api/zhihu',        metricUnit: '关注', category: '问答与社区' },
  { id: 'tieba',        name: '百度贴吧',     subtitle: '热议榜',   color: '#1456cc', apiPath: '/api/tieba',        metricUnit: '热度', category: '问答与社区' },
  { id: 'douban-movie', name: '豆瓣',         subtitle: '电影及讨论小组', color: '#007722', apiPath: '/api/douban-movie', metricUnit: '',   category: '问答与社区' },
  { id: 'v2ex',         name: 'V2EX',         subtitle: '热议话题', color: '#4a9eff', apiPath: '/api/v2ex',         metricUnit: '',     category: '问答与社区' },

  // 科技与资讯
  { id: 'baidu',        name: '百度',         subtitle: '热搜榜',   color: '#2932e1', apiPath: '/api/baidu',        metricUnit: '热度', category: '科技与资讯' },
  { id: 'toutiao',      name: '今日头条',     subtitle: '热榜',     color: '#e63228', apiPath: '/api/toutiao',      metricUnit: '热度', category: '科技与资讯' },
  { id: 'ithome',       name: 'IT之家',       subtitle: '热榜',     color: '#d71a18', apiPath: '/api/ithome',       metricUnit: '热度', category: '科技与资讯' },
  { id: '36kr',         name: '36氪',         subtitle: '热榜',     color: '#0f9d58', apiPath: '/api/36kr',         metricUnit: '',     category: '科技与资讯' },
  { id: 'juejin',       name: '稀土掘金',     subtitle: '热榜',     color: '#1e80ff', apiPath: '/api/juejin',       metricUnit: '热度', category: '科技与资讯' },
  { id: 'sspai',        name: '少数派',       subtitle: '热门文章', color: '#d71517', apiPath: '/api/sspai',        metricUnit: '',     category: '科技与资讯' },
  { id: 'thepaper',     name: '澎湃新闻',     subtitle: '热榜',     color: '#003399', apiPath: '/api/thepaper',     metricUnit: '热度', category: '科技与资讯' },
  { id: 'netease-news', name: '网易新闻',     subtitle: '热榜',     color: '#cc0000', apiPath: '/api/netease-news', metricUnit: '热度', category: '科技与资讯' },
  { id: 'qq-news',      name: '腾讯新闻',     subtitle: '热榜',     color: '#1677ff', apiPath: '/api/qq-news',      metricUnit: '热度', category: '科技与资讯' },

  // 游戏与其他
  { id: 'genshin',      name: '原神',         subtitle: '新闻',     color: '#6b5aab', apiPath: '/api/genshin',      metricUnit: '',     category: '游戏与其他' },
  { id: 'lol',          name: '英雄联盟',     subtitle: '更新公告', color: '#c89b3c', apiPath: '/api/lol',          metricUnit: '',     category: '游戏与其他' },
  { id: 'weread',       name: '微信读书',     subtitle: '热搜榜',   color: '#07c160', apiPath: '/api/weread',       metricUnit: '热度', category: '游戏与其他' },
  { id: 'history',      name: '历史上的今天', subtitle: '历史事件', color: '#7c5cfc', apiPath: '/api/history',      metricUnit: '',     category: '游戏与其他' },
]

// 默认选中的平台
export const DEFAULT_SELECTED_IDS = ['weibo', 'zhihu', 'bilibili']

// 按分类分组（用于 PlatformSelector 展示）
export const PLATFORM_CATEGORY_GROUPS: PlatformCategoryGroup[] = [
  '社交与短视频',
  '问答与社区',
  '科技与资讯',
  '游戏与其他',
].map((label) => ({
  label: label as PlatformCategoryGroup['label'],
  platforms: PLATFORMS.filter((p) => p.category === label),
}))

export const CACHE_MINUTES = 10
export const AUTO_REFRESH_MS = CACHE_MINUTES * 60 * 1000

// 根据 ID 快速查找平台配置
export const PLATFORM_MAP = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]))
