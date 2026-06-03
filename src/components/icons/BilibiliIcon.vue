<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#fb7299" />
    <!-- TV body -->
    <rect x="6" y="14" width="28" height="19" rx="3" fill="white" />
    <!-- Left ear -->
    <rect x="10" y="10" width="4" height="6" rx="2" fill="white" />
    <!-- Right ear -->
    <rect x="26" y="10" width="4" height="6" rx="2" fill="white" />
    <!-- Eyes -->
    <circle cx="15" cy="23" r="3" fill="#fb7299" />
    <circle cx="25" cy="23" r="3" fill="#fb7299" />
    <!-- Smile -->
    <path d="M14 29 Q20 33 26 29" stroke="#fb7299" stroke-width="1.8" fill="none" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
const { size = 36 } = defineProps<{ size?: number }>()
</script>
