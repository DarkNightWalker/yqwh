<template>
  <div class="animation-page">
    <canvas ref="canvas"></canvas>

    <div class="overlay" ref="overlay">
      <div class="countdown" ref="countdown">距离生日还有 -- 天 -- 时 -- 分 -- 秒</div>
      <h1 ref="title">🎂 Happy Birthday 🎂</h1>
      <h2 ref="subtitle">祝自己 2025 年的每一天都开心</h2>
      <h3 ref="name">—— 来自 自己 的祝福</h3>
      <button class="home-btn" @click="goHome">去 Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

// ====== 配置（修改生日日期到你需要的月/日） ======
const BIRTHDAY_MONTH_INDEX = 7 // 0=Jan, 7=Aug
const BIRTHDAY_DAY = 12
// ==============================================

const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const name = ref<HTMLElement | null>(null)
const countdown = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const overlay = ref<HTMLElement | null>(null)
const router = useRouter()

let rafId = 0
let intervalId: number | null = null
let celebrating = false
let nextBirthday: Date | null = null

function getNextBirthday() {
  const now = new Date()
  let year = now.getFullYear()
  let target = new Date(year, BIRTHDAY_MONTH_INDEX, BIRTHDAY_DAY, 0, 0, 0)
  if (target <= now) target = new Date(year + 1, BIRTHDAY_MONTH_INDEX, BIRTHDAY_DAY, 0, 0, 0)
  return target
}

function goHome() {
  router.push('/home').catch(() => {})
}

function formatCountdown(diffMs: number) {
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
  return `距离生日还有 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`
}

function startCountdown() {
  nextBirthday = getNextBirthday()
  // 立即更新一次
  updateCountdown()
  // 每秒更新
  intervalId = window.setInterval(updateCountdown, 1000)
}

function updateCountdown() {
  if (!countdown.value) return

  const now = new Date()
  const nowTime = now.getTime()

  // 生日当天（只比较月和日）
  if (now.getMonth() === BIRTHDAY_MONTH_INDEX && now.getDate() === BIRTHDAY_DAY) {
    if (!celebrating) {
      celebrating = true
      countdown.value.textContent = '🎉 生日快乐！ 🎉'
      triggerMegaFireworks()
    }
    return
  }

  // 非生日当天，计算下一个生日时间并倒计时
  if (!nextBirthday) nextBirthday = getNextBirthday()
  const diff = nextBirthday.getTime() - nowTime

  if (diff <= 0) {
    if (!celebrating) {
      celebrating = true
      countdown.value.textContent = '🎉 生日快乐！ 🎉'
      triggerMegaFireworks()
    }
    return
  }

  countdown.value.textContent = formatCountdown(diff)
}

// ===== Canvas 动画（彩带 + 烟花） =====
function initCanvasEffects() {
  if (!canvas.value) return
  const el = canvas.value
  const ctx = el.getContext('2d')!
  let W = window.innerWidth
  let H = window.innerHeight
  let dpr = window.devicePixelRatio || 1

  function resize() {
    W = window.innerWidth
    H = window.innerHeight
    dpr = window.devicePixelRatio || 1
    el.style.width = W + 'px'
    el.style.height = H + 'px'
    el.width = Math.floor(W * dpr)
    el.height = Math.floor(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const colors = ['#ff7a7a', '#ffb07a', '#ffd27a', '#a8ff7a', '#7affd2', '#7ab0ff', '#d77aff']
  const confetti: Array<any> = []
  const fireworks: Array<any> = []

  function initConfetti() {
    confetti.length = 0
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 0.5 - 0.25,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 1.5 + 0.5
      })
    }
  }

  function launchFirework(x?: number, y?: number, count = 36) {
    const cx = x ?? Math.random() * W
    const cy = y ?? Math.random() * H * 0.45
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      fireworks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * (Math.random() * 3 + 2),
        vy: Math.sin(angle) * (Math.random() * 3 + 2),
        life: Math.random() * 40 + 40,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }

  initConfetti()

  function update() {
    // confetti
    confetti.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.tilt += 0.02;
      if (p.y > H + 20) {
        p.x = Math.random() * W;
        p.y = -20;
        p.vy = Math.random() * 1 + 0.5;
      }
    });

    // fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const f = fireworks[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.02;
      f.life -= 1;
      if (f.life <= 0) fireworks.splice(i, 1);
    }

    // occasionally launch
    if (Math.random() < 0.02) launchFirework();
  }


  function draw() {
    ctx.clearRect(0, 0, W, H)
    // confetti
    confetti.forEach((p) => {
      ctx.fillStyle = p.color
      ctx.fillRect(p.x, p.y, p.r * 1.4, p.r * 0.9)
    })
    // fireworks
    fireworks.forEach((f) => {
      ctx.beginPath()
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
      ctx.fillStyle = f.color
      ctx.fill()
    })
  }

  function loop() {
    update()
    draw()
    rafId = requestAnimationFrame(loop)
  }
  loop()

  // resize handling
  window.addEventListener('resize', resize)

  // return cleanup + helpers
  return {
    resize,
    launchFirework,
    initConfetti,
    destroy() {
      window.removeEventListener('resize', resize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }
}

let canvasController: any = null

function triggerMegaFireworks() {
  // 在庆祝时多发几波烟花
  if (!canvasController) return
  for (let i = 0; i < 5; i++) {
    setTimeout(() => canvasController.launchFirework(undefined, undefined, 60), i * 300)
  }
}

onMounted(() => {
  // 动画文本入场
  gsap.from(title.value, { y: -80, opacity: 0, duration: 1.2, ease: 'power3.out' })
  gsap.from(subtitle.value, { opacity: 0, delay: 1.6, duration: 1 })
  gsap.from(name.value, { opacity: 0, delay: 2.4, duration: 1 })

  // 启动 canvas 特效
  canvasController = initCanvasEffects()

  // 启动倒计时（确保 DOM 挂载）
  startCountdown()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
  if (rafId) cancelAnimationFrame(rafId)
  if (canvasController && canvasController.destroy) canvasController.destroy()
})
</script>

<style>
/* 全局 reset（确保没有浏览器默认 margin 导致偏右） */
:root, html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.animation-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9ff, #fff7f0);
  box-sizing: border-box;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #333;
  width: min(980px, 94%);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay h1 {
  font-size: clamp(28px, 4.2vw, 56px);
  margin: 12px 0 0 0;
}

.overlay h2 {
  font-size: clamp(16px, 2.2vw, 24px);
  margin-top: 14px;
}

.overlay h3 {
  font-size: 16px;
  margin-top: 10px;
  color: #666;
}

.countdown {
  font-size: clamp(14px, 1.8vw, 22px);
  font-weight: 700;
  margin-bottom: 12px;
}

.home-btn {
  margin-top: 26px;
  padding: 10px 20px;
  border: none;
  background: linear-gradient(90deg, #ff7a7a, #ffb07a);
  color: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
