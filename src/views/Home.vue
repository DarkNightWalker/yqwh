<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 纪念日日期 (可以修改为你们的实际纪念日)
const anniversaryDate = new Date('2023-06-15')
const router = useRouter()

// 计算纪念日信息
const daysTogether = ref(0)
const nextAnniversary = ref('')
const daysToNext = ref(0)

const calculateDays = () => {
  const today = new Date()
  const start = new Date(anniversaryDate)

  // 计算在一起多少天
  const diffTime = Math.abs(today.getTime() - start.getTime())
  daysTogether.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // 计算下一个纪念日
  const currentYear = today.getFullYear()
  let nextAnniv = new Date(currentYear, anniversaryDate.getMonth(), anniversaryDate.getDate())

  // 如果今年的纪念日已经过了，则计算明年的
  if (nextAnniv < today) {
    nextAnniv = new Date(currentYear + 1, anniversaryDate.getMonth(), anniversaryDate.getDate())
  }

  nextAnniversary.value = nextAnniv.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // 计算距离下一个纪念日还有多少天
  const diffTimeNext = nextAnniv.getTime() - today.getTime()
  daysToNext.value = Math.ceil(diffTimeNext / (1000 * 60 * 60 * 24))
}

// 跳转到回忆页面
const goToMemories = () => {
  router.push('/memories')
}

// 跳转到未来页面
const goToFuture = () => {
  router.push('/future')
}

onMounted(() => {
  calculateDays()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="cupid-header">
        <span class="cupid">💘</span>
        <h1>我们的纪念日</h1>
        <span class="cupid">💘</span>
      </div>
      <div class="hearts">
        <span class="heart">❤️</span>
        <span class="heart">💖</span>
        <span class="heart">💗</span>
        <span class="heart">💓</span>
        <span class="heart">💞</span>
      </div>
    </div>
    <div class="card warm-card">
      <div class="cupid-corner cupid-corner-left">🏹</div>
      <div class="cupid-corner cupid-corner-right">💘</div>
      <h2>在一起的时光</h2>
      <div class="days-count">{{ daysTogether }} 天</div>
      <p>从 {{ anniversaryDate.toLocaleDateString('zh-CN') }} 开始，我们已经一起走过了 {{ daysTogether }} 个美好的日子</p>
    </div>

    <div class="card accent-card yellow">
      <div class="cupid-corner cupid-corner-left">💕</div>
      <div class="cupid-corner cupid-corner-right">💖</div>
      <h2>下一个纪念日</h2>
      <div class="days-count">{{ daysToNext }} 天</div>
      <p>距离下一个纪念日 ({{ nextAnniversary }}) 还有 {{ daysToNext }} 天</p>
    </div>

    <div class="memories">
      <!-- 美好回忆卡片 -->
      <div class="card accent-card green memory-card" @click="goToMemories">
        <div class="cupid-corner cupid-corner-left">💚</div>
        <div class="cupid-corner cupid-corner-right">💝</div>
        <h3>美好回忆</h3>
        <p>一起看过的日落、一起走过的街道、一起吃过的美食...</p>
        <div class="click-hint">点击查看详情 💖</div>
      </div>

      <!-- 未来憧憬卡片 -->
      <div class="card accent-card blue future-card" @click="goToFuture">
        <div class="cupid-corner cupid-corner-left">💙</div>
        <div class="cupid-corner cupid-corner-right">🥰</div>
        <h3>未来憧憬</h3>
        <p>一起旅行、一起看雪、一起变老...</p>
        <div class="click-hint">点击查看详情 💖</div>
      </div>
    </div>

    <div class="quote">
      <div class="cupid-quote">💘</div>
      <p>"爱是恒久忍耐，又有恩慈；爱是不嫉妒，爱是不自夸，不张狂"</p>
      <div class="cupid-quote">💘</div>
    </div>

    <div class="floating-hearts">
      <div class="floating-heart">💘</div>
      <div class="floating-heart">❤️</div>
      <div class="floating-heart">💖</div>
      <div class="floating-heart">💗</div>
      <div class="floating-heart">💕</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.cupid-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.cupid-header h1 {
  color: #d46a6a;
  font-size: 2.5rem;
  margin: 0;
}

.hearts {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.card {
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}

.warm-card {
  background: linear-gradient(135deg, #fff5e6, #ffe6e6);
  border: 2px solid #ffd6d6;
}

.accent-card {
  color: white;
}

.accent-card.yellow {
  background: linear-gradient(135deg, #ffd700, #ffa500);
}

.accent-card.green {
  background: linear-gradient(135deg, #32cd32, #228b22);
}

.accent-card.blue {
  background: linear-gradient(135deg, #87ceeb, #4682b4);
}

.days-count {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
}

.memories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.quote {
  text-align: center;
  font-style: italic;
  color: #d46a6a;
  font-size: 1.1rem;
  margin-top: 2rem;
  padding: 1rem;
  border-top: 2px dashed #ffd6d6;
  position: relative;
}

.cupid-corner {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.7;
}

.cupid-corner-left {
  top: 10px;
  left: 10px;
}

.cupid-corner-right {
  top: 10px;
  right: 10px;
}

.cupid-quote {
  display: inline-block;
  margin: 0 0.5rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.floating-hearts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.floating-heart {
  position: absolute;
  font-size: 1.5rem;
  animation: float 6s ease-in-out infinite;
  top: -10%;
}
  
.floating-heart:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
}

.floating-heart:nth-child(2) {
  left: 20%;
  animation-delay: 1s;
}

.floating-heart:nth-child(3) {
  left: 30%;
  animation-delay: 2s;
}

.floating-heart:nth-child(4) {
  left: 70%;
  animation-delay: 3s;
}

.floating-heart:nth-child(5) {
  left: 80%;
  animation-delay: 4s;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.click-hint {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .memories {
    grid-template-columns: 1fr;
  }

  .cupid-header h1 {
    font-size: 2rem;
  }

  .days-count {
    font-size: 2rem;
  }

  .floating-hearts {
    display: none;
  }
}
</style>