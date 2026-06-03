import { onMounted, onUnmounted } from 'vue'
import { AUTO_REFRESH_MS } from '@/config/platforms'

export function useAutoRefresh(callback: () => void, intervalMs = AUTO_REFRESH_MS) {
  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    callback()
    timer = setInterval(callback, intervalMs)
  })

  onUnmounted(() => {
    if (timer !== null) clearInterval(timer)
  })
}
