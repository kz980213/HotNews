<template>
  <div class="platform-header">
    <PlatformIcon :platformId="platformId" :color="platformColor" :size="36" />
    <div class="platform-header__info">
      <div class="platform-header__top">
        <span class="platform-header__name">{{ name }}</span>
        <span class="platform-header__time">更新于 {{ updatedAt }}</span>
      </div>
      <span class="platform-header__subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PlatformIcon from '@/components/icons/PlatformIcon.vue'
import { PLATFORM_MAP } from '@/config/platforms'

const props = defineProps<{
  platformId: string
  name: string
  subtitle: string
  updatedAt: string
}>()

const platformColor = computed(() => PLATFORM_MAP[props.platformId]?.color ?? '#6b7280')
</script>

<style scoped>
.platform-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 4px;
}

.platform-header__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.platform-header__top {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.platform-header__name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.platform-header__time {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

.platform-header__subtitle {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
