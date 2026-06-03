import { ref, computed, watch, watchEffect, type Ref } from 'vue'
import { fetchHotList } from '@/api/hotlist'
import type { HotList, AppStats } from '@/types'
import { CACHE_MINUTES } from '@/config/platforms'

export function useHotList(selectedIds: Ref<string[]>) {
  // 按平台 ID 缓存已拉取的数据
  const hotListMap = ref<Record<string, HotList>>({})
  // 当前正在加载的平台 ID
  const loadingIds = ref<string[]>([])
  const error = ref<string | null>(null)
  const lastUpdatedAt = ref<Date | null>(null)

  // 每秒 tick 一次，驱动"X秒前/X分钟前"实时更新
  // 用 watchEffect + onCleanup，比 onMounted/onUnmounted 更可靠（HMR 友好）
  const now = ref(Date.now())
  watchEffect((onCleanup) => {
    const timer = setInterval(() => { now.value = Date.now() }, 1000)
    onCleanup(() => clearInterval(timer))
  })

  // 只返回当前已选平台的数据（按选择顺序）
  const hotLists = computed<HotList[]>(() =>
    selectedIds.value
      .map((id) => hotListMap.value[id])
      .filter(Boolean) as HotList[],
  )

  const loading = computed(() => loadingIds.value.length > 0)

  const stats = computed<AppStats>(() => ({
    platformCount: selectedIds.value.length,
    totalItems: hotLists.value.reduce((sum, l) => sum + l.items.length, 0),
    cacheMinutes: CACHE_MINUTES,
    lastUpdatedAt: lastUpdatedAt.value,
  }))

  const lastUpdatedLabel = computed(() => {
    if (!lastUpdatedAt.value) return '未更新'
    // 依赖 now.value（每秒更新），让显示文字随时间流逝自动刷新
    const diff = Math.floor((now.value - lastUpdatedAt.value.getTime()) / 1000)
    // diff ≤ 0：now 与 lastUpdatedAt 几乎同时，避免出现"0秒前"或"-1秒前"
    if (diff <= 0) return '刚刚'
    if (diff < 60) return `${diff}秒前`
    const mins = Math.floor(diff / 60)
    if (mins < 60) return `${mins}分钟前`
    return `${Math.floor(mins / 60)}小时前`
  })

  const lastUpdatedTimeStr = computed(() => {
    if (!lastUpdatedAt.value) return '--:--'
    return lastUpdatedAt.value.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  })

  /** 只补拉 hotListMap 中还没有数据的平台（用于新增平台时按需加载） */
  async function fetchMissing(ids: string[]) {
    const missing = ids.filter((id) => !hotListMap.value[id])
    if (missing.length === 0) return

    loadingIds.value = [...loadingIds.value, ...missing]
    error.value = null

    const results = await Promise.allSettled(missing.map(fetchHotList))

    results.forEach((result, idx) => {
      const id = missing[idx]
      loadingIds.value = loadingIds.value.filter((x) => x !== id)
      if (result.status === 'fulfilled') {
        hotListMap.value = { ...hotListMap.value, [id]: result.value }
      }
    })

    lastUpdatedAt.value = new Date()
  }

  /** 强制重新拉取所有已选平台（定时刷新 / 手动刷新） */
  async function refresh() {
    if (loading.value) return
    const ids = [...selectedIds.value]
    loadingIds.value = [...ids]
    error.value = null

    const results = await Promise.allSettled(ids.map(fetchHotList))
    const newMap: Record<string, HotList> = { ...hotListMap.value }

    results.forEach((result, idx) => {
      const id = ids[idx]
      if (result.status === 'fulfilled') {
        newMap[id] = result.value
      }
    })

    hotListMap.value = newMap
    loadingIds.value = []
    lastUpdatedAt.value = new Date()
  }

  // 当选中平台增加时，补拉新增平台的数据（不重置已有数据）
  watch(selectedIds, (newIds) => {
    fetchMissing(newIds)
  }, { deep: true })

  return {
    hotLists,
    loading,
    error,
    stats,
    lastUpdatedLabel,
    lastUpdatedTimeStr,
    refresh,
  }
}
