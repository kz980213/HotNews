<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#e6162d" />
    <!-- Simplified Weibo eye/smile shape -->
    <ellipse cx="20" cy="21" rx="11" ry="9" fill="white" />
    <ellipse cx="20" cy="21" rx="9" ry="7.5" fill="#e6162d" />
    <ellipse cx="17" cy="19" rx="3.5" ry="4" fill="white" />
    <ellipse cx="17" cy="20" rx="2" ry="2.2" fill="#333" />
    <ellipse cx="16.2" cy="19.2" rx="0.7" ry="0.7" fill="white" />
    <!-- Antenna -->
    <path d="M26 11 Q30 8 31 12" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M23 9 Q25 5 28 7" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </svg>
</template>

<script setup lang="ts">
const { size = 36 } = defineProps<{ size?: number }>()
</script>
