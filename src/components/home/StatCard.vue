<template>
  <!--
    不在 defineEmits 中声明 'click'，
    父组件的 @click 会通过 Vue3 attrs fallthrough 自动绑定到这个根 div。
  -->
  <div
    class="stat-card"
    :class="{ 'stat-card--clickable': clickable, 'stat-card--active': active }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
  >
    <div class="stat-card__icon" :style="{ background: iconBg }">
      <slot name="icon" />
    </div>
    <div class="stat-card__body">
      <div class="stat-card__value">{{ value }}</div>
      <div class="stat-card__label">{{ label }}</div>
    </div>
    <!-- 可展开时的下拉箭头 -->
    <svg
      v-if="clickable"
      class="stat-card__arrow"
      :class="{ 'stat-card__arrow--open': active }"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  iconBg: string
  clickable?: boolean
  active?: boolean
}>()
// 不声明 click emit，让 @click 通过 fallthrough 穿透到根 div
</script>

<style scoped>
.stat-card {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
  /* flex: 1 移除：由父级 grid 控制尺寸，自身不需要 flex grow */
  min-width: 0;
  transition: box-shadow var(--transition), border-color var(--transition);
  border: 1.5px solid transparent;
}

.stat-card--clickable {
  cursor: pointer;
  user-select: none;
}

.stat-card--clickable:hover {
  box-shadow: var(--shadow-md);
}

.stat-card--active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.stat-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card__body {
  min-width: 0;
  flex: 1;
}

.stat-card__value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-card__label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.stat-card__arrow {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform 0.25s ease, color 0.2s;
}

.stat-card__arrow--open {
  transform: rotate(180deg);
  color: #3b82f6;
}

@media (max-width: 480px) {
  .stat-card { padding: 14px 16px; gap: 10px; }
  .stat-card__icon { width: 38px; height: 38px; }
  .stat-card__value { font-size: 18px; }
}
</style>
