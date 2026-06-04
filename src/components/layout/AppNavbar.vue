<template>
  <header class="navbar">
    <div class="container navbar__inner">
      <div class="navbar__brand">
        <span class="navbar__title">今日热搜</span>
        <span class="navbar__slogan">一屏看全网热点</span>
      </div>

      <div class="navbar__actions">
        <span v-if="updatedTime" class="navbar__update-time">
          更新时间 {{ updatedTime }}
        </span>

        <button
          class="btn btn--outline"
          :class="{ 'btn--loading': loading }"
          :disabled="loading"
          @click="$emit('refresh')"
        >
          <svg
            class="btn__icon"
            :class="{ 'icon--spinning': loading }"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          刷新
        </button>

        <a
          href="https://github.com/kz980213/HotNews"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--dark"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  updatedTime?: string
  loading?: boolean
}>()

defineEmits<{ refresh: [] }>()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.navbar__brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.navbar__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.2px;
}

.navbar__slogan {
  font-size: 13px;
  color: var(--text-secondary);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar__update-time {
  font-size: 13px;
  color: var(--text-secondary);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all var(--transition);
  white-space: nowrap;
}

.btn--outline {
  color: var(--text-primary);
  border-color: var(--border-color);
  background: var(--bg-surface);
}

.btn--outline:hover:not(:disabled) {
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn--outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--dark {
  color: #ffffff;
  background: #1f2937;
  border-color: #1f2937;
}

.btn--dark:hover {
  background: #374151;
  border-color: #374151;
}

.btn__icon {
  flex-shrink: 0;
  transition: transform 0.6s linear;
}

.icon--spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .navbar__slogan,
  .navbar__update-time {
    display: none;
  }
}
</style>
