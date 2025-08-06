<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 纪念日日期 (可以修改为你们的实际纪念日)
const anniversaryDate = new Date('2023-06-15')

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

onMounted(() => {
  calculateDays()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>我们的纪念日</h1>
      <div class="hearts">
        <span class="heart">❤️</span>
        <span class="heart">💖</span>
        <span class="heart">💗</span>
      </div>
    </div>
    
    <div class="card warm-card">
      <h2>在一起的时光</h2>
      <div class="days-count">{{ daysTogether }} 天</div>
      <p>从 {{ anniversaryDate.toLocaleDateString('zh-CN') }} 开始，我们已经一起走过了 {{ daysTogether }} 个美好的日子</p>
    </div>
    
    <div class="card accent-card yellow">
      <h2>下一个纪念日</h2>
      <div class="days-count">{{ daysToNext }} 天</div>
      <p>距离下一个纪念日 ({{ nextAnniversary }}) 还有 {{ daysToNext }} 天</p>
    </div>
    
    <div class="memories">
      <div class="card accent-card green">
        <h3>美好回忆</h3>
        <p>一起看过的日落、一起走过的街道、一起吃过的美食...</p>
      </div>
      
      <div class="card accent-card blue">
        <h3>未来憧憬</h3>
        <p>一起旅行、一起看雪、一起变老...</p>
      </div>
    </div>
    
    <div class="quote">
      <p>"爱是恒久忍耐，又有恩慈；爱是不嫉妒，爱是不自夸，不张狂"</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #d46a6a;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hearts {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.card {
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
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
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .memories {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .days-count {
    font-size: 2rem;
  }
}
</style>