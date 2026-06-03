<template>
  <Teleport to="body">
    <!-- 遮罩层，点击关闭 -->
    <div class="ps-backdrop" @click="$emit('close')" />

    <!-- 选择面板 -->
    <div class="ps-panel" role="dialog" aria-modal="true" aria-label="选择平台">
      <!-- 面板头部 -->
      <div class="ps-panel__head">
        <span class="ps-panel__title">选择平台</span>
        <button class="ps-panel__close" @click="$emit('close')" aria-label="关闭">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- 分类 + 复选框列表 -->
      <div class="ps-panel__body">
        <div
          v-for="group in categoryGroups"
          :key="group.label"
          class="ps-group"
        >
          <div class="ps-group__label">{{ group.label }}</div>
          <div class="ps-group__grid">
            <label
              v-for="platform in group.platforms"
              :key="platform.id"
              class="ps-item"
              :class="{ 'ps-item--checked': isPending(platform.id) }"
            >
              <input
                type="checkbox"
                :checked="isPending(platform.id)"
                @change="$emit('toggle', platform.id)"
                class="ps-item__input"
              />
              <span
                class="ps-item__dot"
                :style="{ background: isPending(platform.id) ? platform.color : '#e5e7eb' }"
              />
              <span class="ps-item__name">{{ platform.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="ps-panel__foot">
        <button class="ps-btn ps-btn--ghost" @click="$emit('clear')">清空选择</button>
        <span class="ps-count">
          已选 <strong>{{ pendingCount }}</strong> 项
        </span>
        <button
          class="ps-btn ps-btn--primary"
          :disabled="pendingCount === 0"
          @click="$emit('confirm')"
        >
          确定
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { PlatformCategoryGroup } from '@/types'

defineProps<{
  categoryGroups: PlatformCategoryGroup[]
  pendingCount: number
  isPending: (id: string) => boolean
}>()

defineEmits<{
  toggle: [id: string]
  confirm: []
  clear: []
  close: []
}>()

// ── 滚动穿透锁定 ──────────────────────────────────────────────────────────
// 使用 position:fixed 方案，同时兼容 iOS Safari（overflow:hidden 在 Safari 上对 body 无效）

let savedScrollY = 0

onMounted(() => {
  savedScrollY = window.scrollY
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.width = '100%'
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  // 恢复到关闭面板时的滚动位置
  window.scrollTo({ top: savedScrollY, behavior: 'instant' })
})
</script>

<style scoped>
/* ── 遮罩 ─────────────────────────────────────────── */
.ps-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 200;
  animation: fade-in 0.15s ease;
}

/* ── 面板 ─────────────────────────────────────────── */
.ps-panel {
  position: fixed;
  z-index: 201;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(380px, calc(100vw - 32px));
  max-height: min(580px, calc(100vh - 48px));
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  animation: slide-up 0.2s ease;
  overflow: hidden;
}

/* ── 头部 ─────────────────────────────────────────── */
.ps-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 14px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.ps-panel__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.ps-panel__close {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  border: none;
  background: #f3f4f6;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition);
}

.ps-panel__close:hover {
  background: #e5e7eb;
}

/* ── 内容区（可滚动） ───────────────────────────────── */
.ps-panel__body {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  scrollbar-width: thin;
}

/* ── 分类组 ───────────────────────────────────────── */
.ps-group {
  margin-bottom: 16px;
}

.ps-group:last-child {
  margin-bottom: 4px;
}

.ps-group__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.ps-group__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

/* ── 复选框行 ─────────────────────────────────────── */
.ps-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);
  border: 1.5px solid transparent;
}

.ps-item:hover {
  background: #f5f7ff;
}

.ps-item--checked {
  background: #f0f5ff;
  border-color: #dbeafe;
}

.ps-item__input {
  display: none;
}

.ps-item__dot {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: background 0.2s;
  position: relative;
}

/* 选中时显示勾 */
.ps-item--checked .ps-item__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M2 5 L4.5 7.5 L8 3' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/10px no-repeat;
}

.ps-item__name {
  font-size: 13px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── 底部操作栏 ───────────────────────────────────── */
.ps-panel__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.ps-count {
  flex: 1;
  font-size: 13px;
  color: var(--text-secondary);
  text-align: center;
}

.ps-count strong {
  color: #3b82f6;
  font-weight: 700;
}

.ps-btn {
  padding: 7px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all var(--transition);
  white-space: nowrap;
}

.ps-btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.ps-btn--ghost:hover {
  background: #f3f4f6;
}

.ps-btn--primary {
  background: #3b82f6;
  color: white;
}

.ps-btn--primary:hover:not(:disabled) {
  background: #2563eb;
}

.ps-btn--primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── 动画 ─────────────────────────────────────────── */
@keyframes fade-in {
  from { opacity: 0 }
  to   { opacity: 1 }
}

@keyframes slide-up {
  from { opacity: 0; transform: translate(-50%, -46%) }
  to   { opacity: 1; transform: translate(-50%, -50%) }
}

/* ── 移动端 ───────────────────────────────────────── */
@media (max-width: 480px) {
  .ps-panel {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    width: 100%;
    max-height: 85vh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    animation: sheet-up 0.25s ease;
  }

  @keyframes sheet-up {
    from { transform: translateY(100%) }
    to   { transform: translateY(0) }
  }
}
</style>
