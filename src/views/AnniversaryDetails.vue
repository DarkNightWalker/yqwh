<script setup lang="ts">
import { ref } from 'vue'

// 定义props接收页面类型参数
const props = defineProps<{
  type: 'memories' | 'future'
}>()

// 根据类型设置页面标题和内容
const title = ref('')
const items = ref<Array<{image: string, text: string}>>([])

if (props.type === 'memories') {
  title.value = '美好回忆'
  items.value = [
    { 
      image: new URL('../assets/memories1.jpg', import.meta.url).href, 
      text: '这是我们第一次约会的地方，阳光正好，微风不燥。' 
    },
    { 
      image: new URL('../assets/memories2.jpg', import.meta.url).href, 
      text: '一起看日落的黄昏，你的笑容比夕阳更美。' 
    },
    { 
      image: new URL('../assets/memories3.jpg', import.meta.url).href, 
      text: '在海边留下的足迹，就像我们爱情的印记。' 
    }
  ]
} else {
  title.value = '未来憧憬'
  items.value = [
    { 
      image: new URL('../assets/future1.jpg', import.meta.url).href, 
      text: '希望有一天我们能一起去看极光。' 
    },
    { 
      image: new URL('../assets/future2.jpg', import.meta.url).href, 
      text: '梦想中的小家，和你一起装饰每一个角落。' 
    },
    { 
      image: new URL('../assets/future3.jpg', import.meta.url).href, 
      text: '一起变老，坐在摇椅上回忆这一生的美好。' 
    }
  ]
}

// 返回首页的方法
const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="details-container">
    <div class="header">
      <button @click="goBack" class="back-button">← 返回</button>
      <h1>{{ title }}</h1>
    </div>
    
    <div class="items-container">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="item-card"
      >
        <div class="image-container">
          <img 
            :src="item.image" 
            :alt="title + '图片' + (index + 1)"
            class="item-image"
          >
        </div>
        <div class="item-text">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.header h1 {
  color: #d46a6a;
  font-size: 2rem;
  margin: 0;
}

.back-button {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff0f0;
  border: 1px solid #d46a6a;
  color: #d46a6a;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #d46a6a;
  color: white;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.item-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: white;
}

.item-card:hover {
  transform: translateY(-5px);
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.item-card:hover .item-image {
  transform: scale(1.05);
}

.item-text {
  padding: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  color: #5a4a4a;
  background: linear-gradient(to bottom, #fff9f9, #fff0f0);
}

@media (max-width: 768px) {
  .details-container {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
  
  .image-container {
    height: 200px;
  }
  
  .item-text {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>