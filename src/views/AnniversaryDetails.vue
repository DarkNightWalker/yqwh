<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 静态导入图片，确保构建时被打包到 dist/assets
import memories1 from '@/assets/memories1.jpg'
import memories2 from '@/assets/memories2.jpg'
import memories3 from '@/assets/memories3.jpg'
import future1 from '@/assets/future1.jpg'
import future2 from '@/assets/future2.jpg'
import future3 from '@/assets/future3.jpg'

interface Item { image: string; text: string }

const props = defineProps<{ type: 'memories' | 'future' }>()
const router = useRouter()

const title = computed(() => (props.type === 'memories' ? '美好回忆' : '未来憧憬'))

const items = computed<Item[]>(() =>
  props.type === 'memories'
    ? [
        { image: memories1, text: '第一次约会，那天阳光刚刚好。' },
        { image: memories2, text: '日落下的你，比夕阳更温柔。' },
        { image: memories3, text: '海浪记录的脚印，也是我们的印记。' }
      ]
    : [
        { image: future1, text: '想牵着你看一次极光漫天。' },
        { image: future2, text: '一起把家装满喜欢的颜色。' },
        { image: future3, text: '等白发苍苍，还一起荡秋千。' }
      ]
)

const activeIndex = ref(0)

function next() {
  activeIndex.value = (activeIndex.value + 1) % items.value.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length
}
</script>

<template>
  <div class="stage">
    <!-- 背景渐变色会随 type 切换 -->
    <div :class="['bg', type]" />

    <!-- 顶部返回 -->
    <button class="back" @click="router.back()">
      <svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
      返回
    </button>

    <!-- 主标题 -->
    <h1 class="title">{{ title }}</h1>

    <!-- 轮播区域 -->
    <div class="carousel">
      <transition name="fade" mode="out-in">
        <div :key="activeIndex" class="slide">
          <img :src="items[activeIndex].image" />
          <p class="caption">{{ items[activeIndex].text }}</p>
        </div>
      </transition>

      <!-- 左右箭头 -->
      <button class="nav prev" @click="prev">‹</button>
      <button class="nav next" @click="next">›</button>

      <!-- 小圆点 -->
      <div class="dots">
        <span
          v-for="(_, i) in items"
          :key="i"
          :class="{ active: i === activeIndex }"
          @click="activeIndex = i"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
  overflow: hidden;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  transition: background 1.2s ease;
}
.bg.memories {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
}
.bg.future {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.back {
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.3s;
}
.back:hover {
  background: rgba(255, 255, 255, 0.4);
}
.back svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 32px;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.carousel {
  position: relative;
  width: 340px;
  height: 480px;
  perspective: 1000px;
}
.slide {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  font-size: 16px;
  text-align: center;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.25);
  border: none;
  color: #fff;
  font-size: 28px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.3s;
  z-index: 2;
}
.nav:hover {
  background: rgba(255, 255, 255, 0.4);
}
.prev {
  left: -60px;
}
.next {
  right: -60px;
}

.dots {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
}
.dots span.active {
  background: #fff;
  transform: scale(1.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .carousel {
    width: 280px;
    height: 400px;
  }
  .prev {
    left: -50px;
  }
  .next {
    right: -50px;
  }
}
</style>
