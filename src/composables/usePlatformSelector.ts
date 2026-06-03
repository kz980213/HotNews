import { ref, computed } from 'vue'
import { PLATFORM_CATEGORY_GROUPS, DEFAULT_SELECTED_IDS, PLATFORM_MAP } from '@/config/platforms'

const STORAGE_KEY = 'hot-news:selectedPlatformIds'

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...DEFAULT_SELECTED_IDS]
    const ids: string[] = JSON.parse(raw)
    // 过滤掉已不存在的平台
    return ids.filter((id) => PLATFORM_MAP[id])
  } catch {
    return [...DEFAULT_SELECTED_IDS]
  }
}

export function usePlatformSelector() {
  // 已确认的选中平台 ID
  const selectedIds = ref<string[]>(loadFromStorage())
  // 面板中正在编辑但尚未确认的 ID
  const pendingIds = ref<string[]>([...selectedIds.value])
  // 面板是否展开
  const isOpen = ref(false)

  const selectedPlatforms = computed(() =>
    selectedIds.value.map((id) => PLATFORM_MAP[id]).filter(Boolean),
  )

  const pendingCount = computed(() => pendingIds.value.length)

  const categoryGroups = PLATFORM_CATEGORY_GROUPS

  function open() {
    pendingIds.value = [...selectedIds.value]
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function confirm() {
    if (pendingIds.value.length === 0) return // 至少选一个
    selectedIds.value = [...pendingIds.value]
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds.value))
    } catch { /* ignore */ }
    isOpen.value = false
  }

  function clearPending() {
    pendingIds.value = []
  }

  function togglePending(id: string) {
    const idx = pendingIds.value.indexOf(id)
    if (idx === -1) {
      pendingIds.value.push(id)
    } else {
      pendingIds.value.splice(idx, 1)
    }
  }

  function isPending(id: string) {
    return pendingIds.value.includes(id)
  }

  return {
    selectedIds,
    selectedPlatforms,
    pendingIds,
    pendingCount,
    isOpen,
    categoryGroups,
    open,
    close,
    confirm,
    clearPending,
    togglePending,
    isPending,
  }
}
