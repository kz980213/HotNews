<template>
  <div class="home">
    <AppNavbar
      :updatedTime="lastUpdatedTimeStr"
      :loading="loading"
      @refresh="refresh"
    />

    <main>
      <HeroSection
        :stats="stats"
        :lastUpdatedLabel="lastUpdatedLabel"
        :selectorOpen="isOpen"
        @open-selector="open"
      />
      <HotListGrid :hotLists="hotLists" :loading="loading" :error="error" />
    </main>

    <AppFooter />

    <!-- 平台选择面板（Teleport 到 body，避免 z-index 问题） -->
    <PlatformSelector
      v-if="isOpen"
      :categoryGroups="categoryGroups"
      :pendingCount="pendingCount"
      :isPending="isPending"
      @toggle="togglePending"
      @confirm="confirm"
      @clear="clearPending"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import HotListGrid from '@/components/home/HotListGrid.vue'
import PlatformSelector from '@/components/home/PlatformSelector.vue'
import { useHotList } from '@/composables/useHotList'
import { usePlatformSelector } from '@/composables/usePlatformSelector'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const {
  selectedIds,
  isOpen,
  categoryGroups,
  pendingCount,
  isPending,
  open,
  close,
  confirm,
  clearPending,
  togglePending,
} = usePlatformSelector()

const {
  hotLists,
  loading,
  error,
  stats,
  lastUpdatedLabel,
  lastUpdatedTimeStr,
  refresh,
} = useHotList(selectedIds)

useAutoRefresh(refresh)
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
