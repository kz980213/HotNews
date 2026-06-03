import type { HotList, HotItem } from '@/types'
import { PLATFORMS } from '@/config/platforms'

// ─── DailyHotApi 响应结构 ───────────────────────────────────────────────────

interface DailyHotItem {
  id?: number | string
  title: string
  hot?: number | string
  url?: string
  mobileUrl?: string
  cover?: string
  desc?: string
}

interface DailyHotResponse {
  code: number
  message?: string
  updateTime?: string
  data: DailyHotItem[]
}

// ─── 工具函数 ───────────────────────────────────────────────────────────────

function currentTimeStr(): string {
  return new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/**
 * 将 DailyHotApi 返回的原始热度数字格式化为带单位的字符串。
 * hot 可能是数字（如 28760000）或已格式化字符串（如 "2876万"）。
 */
function formatHot(hot: number | string | undefined, unit: string): string {
  if (hot === undefined || hot === null || hot === '') return ''
  if (typeof hot === 'string') {
    return hot.endsWith(unit) ? hot : `${hot}${unit}`
  }
  if (hot >= 1_0000_0000) return `${(hot / 1_0000_0000).toFixed(1)}亿${unit}`
  if (hot >= 1_0000) return `${(hot / 1_0000).toFixed(1)}万${unit}`
  return `${hot}${unit}`
}

// ─── 适配器：将 DailyHotApi 数据转成内部 HotItem 格式 ──────────────────────

function adaptItems(items: DailyHotItem[], metricUnit: string): HotItem[] {
  return items.slice(0, 10).map((item, idx) => ({
    rank: idx + 1,
    title: item.title,
    metric: formatHot(item.hot, metricUnit),
    url: item.url || item.mobileUrl,
  }))
}

// ─── Mock 数据（DailyHotApi 未启动时的兜底） ───────────────────────────────

const MOCK_DATA: Record<string, HotList> = {
  weibo: {
    platformId: 'weibo',
    updatedAt: '',
    items: [
      { rank: 1,  title: '神十八载人飞船发射圆满成功',   metric: '2876万热度' },
      { rank: 2,  title: 'iPhone 16 系列正式发布',       metric: '2154万热度' },
      { rank: 3,  title: '多地开启"秋老虎"模式',         metric: '1789万热度' },
      { rank: 4,  title: '杭州亚运会火炬传递启动',       metric: '1324万热度' },
      { rank: 5,  title: '刘亦菲新剧路透',               metric: '1256万热度' },
      { rank: 6,  title: '2024诺贝尔物理学奖揭晓',       metric: '1123万热度' },
      { rank: 7,  title: '男子徒手攀爬数十米高楼救人',   metric: '987万热度'  },
      { rank: 8,  title: '上海迪士尼新项目曝光',         metric: '842万热度'  },
      { rank: 9,  title: '国庆假期火车票开售',           metric: '761万热度'  },
      { rank: 10, title: '网红城市与烟火气的双向奔赴',   metric: '689万热度'  },
    ],
  },
  zhihu: {
    platformId: 'zhihu',
    updatedAt: '',
    items: [
      { rank: 1,  title: '如何评价《黑神话：悟空》销量破千万？', metric: '98.6万关注' },
      { rank: 2,  title: '为什么现在年轻人越来越不愿意结婚？',   metric: '78.3万关注' },
      { rank: 3,  title: '未来 10 年，哪些行业会有颠覆性变化？', metric: '65.1万关注' },
      { rank: 4,  title: '大学里最值得坚持的习惯有哪些？',       metric: '52.8万关注' },
      { rank: 5,  title: '普通人如何有效提升自己的执行力？',     metric: '48.7万关注' },
      { rank: 6,  title: 'AI 会让哪些职业最先消失？',           metric: '43.2万关注' },
      { rank: 7,  title: '如何看待"睡眠负债"这一说法？',         metric: '38.6万关注' },
      { rank: 8,  title: '如果可以回到过去，你最想改变什么？',   metric: '33.9万关注' },
      { rank: 9,  title: '存钱的意义到底是什么？',               metric: '29.7万关注' },
      { rank: 10, title: '如何培养长期主义的心态？',             metric: '26.4万关注' },
    ],
  },
  bilibili: {
    platformId: 'bilibili',
    updatedAt: '',
    items: [
      { rank: 1,  title: '【4K】黑神话：悟空 全流程实况第1期', metric: '352.6万播放' },
      { rank: 2,  title: '最近很火的 AI 短片，我也来试试',     metric: '287.4万播放' },
      { rank: 3,  title: 'Up主的录音设备分享！干货满满',       metric: '241.2万播放' },
      { rank: 4,  title: '原神5.0版本前瞻特别节目',           metric: '198.7万播放' },
      { rank: 5,  title: '一口气看完《三体》动画全集',         metric: '176.3万播放' },
      { rank: 6,  title: '这才是红烧肉最好吃的做法！',         metric: '158.9万播放' },
      { rank: 7,  title: '100天挑战自律生活丨DAY1',           metric: '146.2万播放' },
      { rank: 8,  title: '宇宙有多大？一分钟带你看懂！',       metric: '133.5万播放' },
      { rank: 9,  title: '盘点游戏中那些刀哭玩家的剧情',       metric: '121.4万播放' },
      { rank: 10, title: '旅行vlog丨川西秘境之旅',            metric: '110.7万播放' },
    ],
  },
}

// ─── 导出函数 ───────────────────────────────────────────────────────────────

export async function fetchHotList(platformId: string): Promise<HotList> {
  const platform = PLATFORMS.find((p) => p.id === platformId)
  if (!platform) throw new Error(`Unknown platform: ${platformId}`)

  try {
    const res = await fetch(platform.apiPath, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json: DailyHotResponse = await res.json()

    if (json.code !== 200 || !Array.isArray(json.data)) {
      throw new Error('Invalid response format')
    }

    return {
      platformId,
      updatedAt: currentTimeStr(),
      items: adaptItems(json.data, platform.metricUnit),
    }
  } catch {
    // DailyHotApi 未启动或请求失败时，静默回退到 mock 数据
    console.warn(`[hotlist] ${platformId} API failed, using mock data`)
    const mock = MOCK_DATA[platformId]
    // 有 mock 数据就返回 mock，否则返回空列表（避免 { ...undefined } 崩溃）
    return mock
      ? { ...mock, updatedAt: currentTimeStr() }
      : { platformId, updatedAt: currentTimeStr(), items: [] }
  }
}

export async function fetchAllHotLists(): Promise<HotList[]> {
  return Promise.all(PLATFORMS.map((p) => fetchHotList(p.id)))
}
