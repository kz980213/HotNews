<template>
  <div class="platform-column">
    <PlatformHeader
      :platformId="hotList.platformId"
      :name="platformConfig.name"
      :subtitle="platformConfig.subtitle"
      :updatedAt="hotList.updatedAt"
    />

    <!-- 有数据 -->
    <ul v-if="hotList.items.length > 0" class="platform-column__list">
      <HotItem
        v-for="item in hotList.items"
        :key="item.rank"
        :item="item"
      />
    </ul>

    <!-- 暂无数据 -->
    <div v-else class="platform-column__empty">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PlatformHeader from './PlatformHeader.vue'
import HotItem from './HotItem.vue'
import { PLATFORMS } from '@/config/platforms'
import type { HotList } from '@/types'

const props = defineProps<{ hotList: HotList }>()

const platformConfig = computed(
  () => PLATFORMS.find((p) => p.id === props.hotList.platformId)!
)
</script>

<style scoped>
.platform-column {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition);
  /* 防止卡片内容撑出 grid 格子，确保 ellipsis 生效 */
  min-width: 0;
  overflow: hidden;
}

.platform-column:hover {
  box-shadow: var(--shadow-hover);
}

.platform-column__list {
  list-style: none;
  margin-top: 8px;
}

.platform-column__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 0 24px;
  color: var(--text-muted);
  font-size: 13px;
}
</style>
