<template>
  <section class="hot-list-grid-section">
    <div class="container">
      <!-- 加载骨架 -->
      <div v-if="loading && hotLists.length === 0" class="hot-list-grid">
        <div v-for="n in 3" :key="n" class="skeleton-column">
          <div class="skeleton skeleton--header" />
          <div v-for="i in 10" :key="i" class="skeleton skeleton--item" />
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="error-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>{{ error }}</p>
      </div>

      <!-- 热榜列表 -->
      <div v-else class="hot-list-grid">
        <PlatformColumn
          v-for="hotList in hotLists"
          :key="hotList.platformId"
          :hotList="hotList"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PlatformColumn from '@/components/hotlist/PlatformColumn.vue'
import type { HotList } from '@/types'

defineProps<{
  hotLists: HotList[]
  loading: boolean
  error: string | null
}>()
</script>

<style scoped>
.hot-list-grid-section {
  padding: 32px 0 0;
}

.hot-list-grid {
  display: grid;
  /* minmax(0,1fr) 而非 1fr：强制三列真正等宽，不被内容撑开 */
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

/* 骨架屏 */
.skeleton-column {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}

.skeleton--header {
  height: 48px;
  margin-bottom: 16px;
}

.skeleton--item {
  height: 20px;
  margin-bottom: 12px;
}

.skeleton--item:last-child {
  margin-bottom: 0;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 错误状态 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px;
  color: var(--text-secondary);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 900px) {
  .hot-list-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .hot-list-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .hot-list-grid-section {
    padding: 20px 0 0;
  }
}
</style>
