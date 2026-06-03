<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#0066ff" />
    <text
      x="20"
      y="27"
      font-size="20"
      font-weight="bold"
      text-anchor="middle"
      fill="white"
      font-family="PingFang SC, Microsoft YaHei, sans-serif"
    >知</text>
  </svg>
</template>

<script setup lang="ts">
const { size = 36 } = defineProps<{ size?: number }>()
</script>
