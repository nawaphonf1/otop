<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import sceneImg from '../../assets/home/history-scene.png'
import bearImg from '../../assets/home/history-bear.png'
import waterImg from '../../assets/home/history-water.png'

const card = ref(null)

/* ---------- typewriter การ์ด ---------- */
const segments = [
  { t: 'ชื่อชุมชนเริ่มต้นจาก', b: false },
  { t: 'เรื่องเล่าของหมีตัวหนึ่งที่เคยลงมากินน้ำ', b: true },
  {
    t: ' จนเป็นที่มาของชื่อเดิม “ผาหลังหมี” ก่อนที่จะเปลี่ยนเป็น “ผารังหมี” ในปัจจุบัน แต่ยังคงสะท้อนความอบอุ่น ความอุดมสมบูรณ์ และวิถีชีวิตของชุมชนจากรุ่นสู่รุ่นมาจนถึงวันนี้',
    b: false,
  },
]
const total = segments.reduce((n, s) => n + s.t.length, 0)
const shown = ref(0)
let typer = null
function escapeHtml(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
const typedHtml = computed(() => {
  let left = shown.value
  let html = ''
  for (const s of segments) {
    if (left <= 0) break
    const part = s.t.slice(0, left)
    html += s.b ? `<b>${escapeHtml(part)}</b>` : escapeHtml(part)
    left -= s.t.length
  }
  return html
})
function startTyping() {
  stopTyping()
  shown.value = 0
  typer = setInterval(() => {
    shown.value++
    if (shown.value >= total) stopTyping()
  }, 22)
}
function stopTyping() {
  if (typer) {
    clearInterval(typer)
    typer = null
  }
}

let cardIO = null
onMounted(() => {
  cardIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) startTyping()
        else {
          stopTyping()
          shown.value = 0
        }
      }
    },
    { threshold: 0.35 }
  )
  if (card.value) cardIO.observe(card.value)
})
onBeforeUnmount(() => {
  stopTyping()
  if (cardIO) cardIO.disconnect()
})
</script>

<template>
  <section id="history" class="history">
    <div class="scene">
      <img
        v-reveal="{ y: 40 }"
        class="scene-bg"
        :src="sceneImg"
        alt="ความเป็นมาของชุมชนบ้านผารังหมี"
      />

      <!-- หัวข้อ (HTML) animate เข้า/ออก -->
      <h2 v-reveal="{ y: 26 }" class="htitle">
        <span class="l1">จากร่องรอยหมี...</span>
        <span class="l2">สู่เรื่องราวของชุมชน</span>
      </h2>

      <!-- น้ำ ขยับตลอด -->
      <img class="water" :src="waterImg" alt="" aria-hidden="true" />

      <!-- หมี ขยับอยู่กับที่ -->
      <img class="bear" :src="bearImg" alt="หมีบ้านผารังหมีในสายน้ำ" />
    </div>

    <div class="info">
      <h3 v-reveal class="know">รู้หรือไม่?</h3>
      <div ref="card" class="card">
        <p class="typed">
          <span v-html="typedHtml"></span><span class="caret"></span>
        </p>
      </div>
      <RouterLink v-reveal="{ y: 16, delay: 120 }" class="more" to="/history">
        <span>อ่านเพิ่มเติม</span>
        <span class="more-arrow">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M4 11h12.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H4z" />
          </svg>
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.history {
  background: #34a142; /* พื้นหลังเขา */
  border-radius: 10px 120px 10px 10px; /* มุมขวาบนโค้ง 120px */
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* ---------- ฉาก ---------- */
.scene {
  position: relative;
  width: 100%;
  container-type: inline-size;
  margin-top: clamp(70px, 30vw, 200px); /* เว้นระยะจากขอบบนของพาเนล */
}
.scene-bg {
  display: block;
  width: 100%;
  height: auto;
}

/* หัวข้อ (สเกลตามความกว้างฉาก) */
.htitle {
  position: absolute;
  top: -14%;
  left: 0;
  right: 0;
  margin: 0;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
  font-weight: 700;
  letter-spacing: 0.9px;
  line-height: 1.24;
}
.htitle .l1 {
  display: block;
  font-size: 7.6cqw;
  color: rgba(255, 255, 255, 0.61);
}
.htitle .l2 {
  display: block;
  font-size: 6.6cqw;
  color: #fff;
}

/* น้ำ — คลื่นวนตลอด */
.water {
  position: absolute;
  left: 0;
  bottom: 23%;
  width: 59%;
  height: auto;
  pointer-events: none;
  animation: wwave 5s ease-in-out infinite;
  will-change: transform;
}
@keyframes wwave {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 2px); }
  50% { transform: translate(0, 4px); }
  75% { transform: translate(5px, 2px); }
  100% { transform: translate(0, 0); }
}

/* หมี — ขยับอยู่กับที่ */
.bear {
  position: absolute;
  left: 69.5%;
  bottom: 37%;
  width: 20%;
  height: auto;
  transform-origin: bottom center;
  animation: bearidle 3.4s ease-in-out infinite;
  will-change: transform;
}
@keyframes bearidle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(-1.4deg); }
  50% { transform: translateY(-1px) rotate(0deg); }
  75% { transform: translateY(-3px) rotate(1.4deg); }
}

/* ---------- ข้อมูล ---------- */
.info {
  position: relative;
  margin-top: -13%;
  padding: 6px 26px 40px;
  text-align: center;
}
.know {
  margin: 0 0 12px;
  color: #ffd800;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.48px;
}
.card {
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 14px 30px rgba(20, 60, 20, 0.22);
  min-height: 150px;
}
.typed {
  margin: 0;
  color: #414042;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.42px;
  text-align: center;
}
.typed :deep(b) {
  color: #80433b;
  font-weight: 700;
}
.caret {
  display: inline-block;
  width: 2px;
  height: 1em;
  vertical-align: -2px;
  margin-left: 1px;
  background: #80433b;
  animation: blink 0.9s steps(1) infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
.more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0 20px;
  float: right;
  padding: 7px 8px 7px 20px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  background: linear-gradient(180deg, #f8b23e, var(--orange));
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(245, 166, 35, 0.38);
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}
.more:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(245, 166, 35, 0.5);
  filter: brightness(1.03);
}
.more:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(245, 166, 35, 0.4);
}
.more-arrow {
  display: inline-grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #fff;
  color: var(--orange);
  transition: transform 0.2s ease;
}
.more:hover .more-arrow {
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .water,
  .bear { animation: none; }
  .caret { animation: none; }
}
</style>
