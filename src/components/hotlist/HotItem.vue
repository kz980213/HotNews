<template>
  <li class="hot-item" :class="{ 'hot-item--clickable': !!item.url }">
    <!-- 有 URL：整行变成可点击链接，新标签页打开 -->
    <component
      :is="item.url ? 'a' : 'div'"
      class="hot-item__inner"
      v-bind="item.url
        ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
        : {}"
    >
      <RankBadge :rank="item.rank" />
      <span class="hot-item__title" :title="item.title">{{ item.title }}</span>
      <span class="hot-item__metric">{{ item.metric }}</span>
    </component>
  </li>
</template>

<script setup lang="ts">
import RankBadge from './RankBadge.vue'
import type { HotItem as HotItemType } from '@/types'

defineProps<{ item: HotItemType }>()
</script>

<style scoped>
.hot-item {
  border-bottom: 1px solid #f3f4f6;
}

.hot-item:last-child {
  border-bottom: none;
}

/* 整行内容（链接或普通 div） */
.hot-item__inner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  /* 重置 <a> 的默认样式 */
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}

.hot-item:first-child .hot-item__inner {
  padding-top: 0;
}

.hot-item:last-child .hot-item__inner {
  padding-bottom: 0;
}

/* 有链接时显示手形光标 + hover 高亮 */
.hot-item--clickable .hot-item__inner:hover {
  background: #f5f7ff;
  padding-left: 4px;
  padding-right: 4px;
  margin: 0 -4px;
  width: calc(100% + 8px);
}

.hot-item__title {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  line-height: 1.4;
}

/* 有链接时标题 hover 变蓝 */
.hot-item--clickable .hot-item__inner:hover .hot-item__title {
  color: #3b82f6;
}

.hot-item__metric {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
