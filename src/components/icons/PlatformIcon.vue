<template>
  <!-- 有专属 SVG 图标的平台 -->
  <component v-if="specificIcon" :is="specificIcon" :size="size" />
  <!-- 通用彩色徽章：平台色背景 + 缩写 -->
  <span v-else class="platform-icon-generic" :style="style">{{ initials }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WeiboIcon from './WeiboIcon.vue'
import ZhihuIcon from './ZhihuIcon.vue'
import BilibiliIcon from './BilibiliIcon.vue'

const SPECIFIC: Record<string, unknown> = {
  weibo: WeiboIcon,
  zhihu: ZhihuIcon,
  bilibili: BilibiliIcon,
}

// 各平台在徽章上显示的缩写
const INITIALS: Record<string, string> = {
  douyin:       '抖',
  kuaishou:     '快',
  baidu:        '百',
  toutiao:      '头',
  ithome:       'IT',
  '36kr':       '36',
  juejin:       '掘',
  sspai:        '少',
  thepaper:     '澎',
  'netease-news': '网',
  'qq-news':    '腾',
  genshin:      '原',
  lol:          '盟',
  weread:       '读',
  history:      '历',
  tieba:        '吧',
  'douban-movie': '豆',
  v2ex:         'V2',
}

const props = defineProps<{
  platformId: string
  color: string
  size?: number
}>()

const size = props.size ?? 36

const specificIcon = computed(() => SPECIFIC[props.platformId] ?? null)

const initials = computed(
  () => INITIALS[props.platformId] ?? props.platformId.charAt(0).toUpperCase(),
)

const style = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
  background: props.color,
  fontSize: size <= 28 ? '11px' : '13px',
  borderRadius: props.platformId === 'weibo' ? '50%' : '8px',
}))
</script>

<style scoped>
.platform-icon-generic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: -0.5px;
}
</style>
