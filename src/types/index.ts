export interface HotItem {
  rank: number
  title: string
  metric: string
  url?: string
}

export type PlatformCategory = '社交与短视频' | '问答与社区' | '科技与资讯' | '游戏与其他'

export interface PlatformConfig {
  id: string
  name: string
  subtitle: string
  color: string
  apiPath: string
  metricUnit: string
  category: PlatformCategory
}

export interface PlatformCategoryGroup {
  label: PlatformCategory
  platforms: PlatformConfig[]
}

export interface HotList {
  platformId: string
  items: HotItem[]
  updatedAt: string
}

export interface AppStats {
  platformCount: number   // 当前已选平台数
  totalItems: number
  cacheMinutes: number
  lastUpdatedAt: Date | null
}
