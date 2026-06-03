<template>
  <section class="hero">
    <div class="container">
      <h1 class="hero__title">今日热搜</h1>
      <p class="hero__subtitle">
        聚合微博、知乎、B站等平台实时热点，快速了解正在发生什么
      </p>
      <StatsBar
        :stats="stats"
        :lastUpdatedLabel="lastUpdatedLabel"
        :selectorOpen="selectorOpen"
        @open-selector="$emit('open-selector')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StatsBar from './StatsBar.vue'
import type { AppStats } from '@/types'

defineProps<{
  stats: AppStats
  lastUpdatedLabel: string
  selectorOpen: boolean
}>()

defineEmits<{ 'open-selector': [] }>()
</script>

<style scoped>
.hero {
  background: var(--bg-hero);
  padding: 48px 0 40px;
}

.hero__title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  letter-spacing: -1px;
  margin-bottom: 12px;
}

.hero__subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.6;
}

@media (max-width: 480px) {
  .hero { padding: 32px 0 28px; }
  .hero__subtitle { font-size: 13px; margin-bottom: 24px; }
}
</style>
