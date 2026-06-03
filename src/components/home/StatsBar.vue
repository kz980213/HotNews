<template>
  <div class="stats-bar">
    <!-- ① 已接入平台 — 可点击，触发平台选择器 -->
    <StatCard
      label="已接入"
      :value="`${stats.platformCount} 个平台`"
      iconBg="#dbeafe"
      :clickable="true"
      :active="selectorOpen"
      @click="$emit('open-selector')"
    >
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </template>
    </StatCard>

    <!-- ② 热榜条目 -->
    <StatCard label="热榜条目" :value="`${stats.totalItems}+`" iconBg="#ffedd5">
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        </svg>
      </template>
    </StatCard>

    <!-- ③ 缓存 -->
    <StatCard label="缓存" :value="`${stats.cacheMinutes} 分钟`" iconBg="#dcfce7">
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </template>
    </StatCard>

    <!-- ④ 最近更新 -->
    <StatCard label="最近更新" :value="lastUpdatedLabel" iconBg="#ede9fe">
      <template #icon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      </template>
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import StatCard from './StatCard.vue'
import type { AppStats } from '@/types'

defineProps<{
  stats: AppStats
  lastUpdatedLabel: string
  selectorOpen: boolean
}>()

defineEmits<{ 'open-selector': [] }>()
</script>

<style scoped>
.stats-bar {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stats-bar > :deep(.stat-card) {
  flex: 1;
  min-width: 160px;
}

@media (max-width: 600px) {
  .stats-bar { gap: 10px; }

  .stats-bar > :deep(.stat-card) {
    min-width: calc(50% - 5px);
    flex: none;
  }
}
</style>
