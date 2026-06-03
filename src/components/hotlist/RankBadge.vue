<template>
  <span class="rank-badge" :class="rankClass">{{ rank }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ rank: number }>()

const rankClass = computed(() => {
  if (props.rank === 1) return 'rank-badge--1'
  if (props.rank === 2) return 'rank-badge--2'
  if (props.rank === 3) return 'rank-badge--3'
  return 'rank-badge--default'
})
</script>

<style scoped>
.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  line-height: 1;
}

.rank-badge--1 {
  background: var(--rank-1);
  color: white;
}

.rank-badge--2 {
  background: var(--rank-2);
  color: white;
}

.rank-badge--3 {
  background: var(--rank-3);
  color: white;
}

.rank-badge--default {
  background: transparent;
  color: var(--rank-default);
  font-weight: 500;
}
</style>
