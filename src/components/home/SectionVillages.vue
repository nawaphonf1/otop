<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import img1 from '../../assets/home/SectionVillages/1.jpg'
import img2 from '../../assets/home/SectionVillages/2.jpg'
import img3 from '../../assets/home/SectionVillages/3.jpg'
import img4 from '../../assets/home/SectionVillages/4.jpg'

/* การ์ดหมู่บ้าน — รูปจริงจาก assets/home/SectionVillages */
const cards = [
  { title: 'หมู่บ้านผารังหมี ต.ไทรย้อย', tint: 'a', icon: 'mountain', img: img1 },
  { title: 'หมู่บ้านอารมณ์ดี', tint: 'b', icon: 'weave' , img: img2},
  { title: 'วิถีเกษตรอินทรีย์', tint: 'c', icon: 'leaf' , img: img3},
  { title: 'ผ้าทอมือภูมิปัญญา', tint: 'd', icon: 'thread', img: img4},
]
/* ทำสำเนาต่อท้าย เพื่อให้เลื่อนวนเป็นวงกลมแบบไร้รอยต่อ */
const loopCards = computed(() => [...cards, ...cards])

const track = ref(null)
const active = ref(0)

const SPEED = 0.04 // px ต่อ ms (~40px/วินาที) — ยิ่งมากยิ่งเร็ว
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function cardStep() {
  const el = track.value
  const first = el?.querySelector('.v-card')
  return first ? first.offsetWidth + 14 : 0 // ความกว้างการ์ด + gap
}
function loopWidth() {
  return cardStep() * cards.length // ความกว้าง 1 ชุด
}

/* ---------- จุดบอกตำแหน่ง (sync กับ scroll) ---------- */
let dotRaf = null
function onScroll() {
  if (dotRaf) return
  dotRaf = requestAnimationFrame(() => {
    dotRaf = null
    const step = cardStep()
    if (!step) return
    active.value = Math.round(track.value.scrollLeft / step) % cards.length
  })
}

/* ---------- เลื่อนอัตโนมัติ ไหลลื่นต่อเนื่อง วนเป็นวงกลม ---------- */
let rafId = null
let running = false
let lastTs = 0
function frame(ts) {
  if (!running) return
  const el = track.value
  if (el && lastTs) {
    el.scrollLeft += SPEED * (ts - lastTs)
    const w = loopWidth()
    if (w && el.scrollLeft >= w) el.scrollLeft -= w
  }
  lastTs = ts
  rafId = requestAnimationFrame(frame)
}
function startAuto() {
  if (reduceMotion || running) return
  running = true
  lastTs = 0
  rafId = requestAnimationFrame(frame)
}
function stopAuto() {
  running = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}
let resumeT = null
function pauseThenResume() {
  stopAuto()
  clearTimeout(resumeT)
  resumeT = setTimeout(startAuto, 2000)
}

function goTo(i) {
  const step = cardStep()
  if (!step) return
  track.value.scrollTo({ left: step * i, behavior: 'smooth' })
  pauseThenResume()
}

/* ---------- ลากด้วยเมาส์ (desktop) — มือถือใช้ swipe อยู่แล้ว ---------- */
let dragging = false
let startX = 0
let startLeft = 0
let moved = false
function onDown(e) {
  const el = track.value
  if (!el) return
  dragging = true
  moved = false
  startX = e.clientX
  startLeft = el.scrollLeft
  el.classList.add('dragging')
  stopAuto()
}
function onMove(e) {
  if (!dragging) return
  const el = track.value
  const dx = e.clientX - startX
  if (Math.abs(dx) > 4) moved = true
  el.scrollLeft = startLeft - dx
}
function onUp() {
  if (!dragging) return
  dragging = false
  const el = track.value
  if (el) el.classList.remove('dragging')
  pauseThenResume()
}
/* กันการ์ดถูก "คลิก" หลังลาก */
function onClickCapture(e) {
  if (moved) {
    e.preventDefault()
    e.stopPropagation()
    moved = false
  }
}

onMounted(() => {
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  startAuto()
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  stopAuto()
  clearTimeout(resumeT)
  if (dotRaf) cancelAnimationFrame(dotRaf)
})
</script>

<template>
  <section id="villages" class="villages">
    <div
      ref="track"
      class="track"
      @scroll="onScroll"
      @pointerdown="onDown"
      @click.capture="onClickCapture"
      @mouseenter="stopAuto"
      @mouseleave="startAuto"
    >
      <a
        v-for="(c, i) in loopCards"
        :key="i"
        class="v-card"
        href="#"
        :aria-hidden="i >= cards.length ? 'true' : 'false'"
      >
        <div class="thumb" :class="'tint-' + c.tint">
          <img
            class="thumb-img"
            :src="c.img"
            :alt="c.title"
            loading="lazy"
            draggable="false"
          />
        </div>
        <p class="caption">{{ c.title }}</p>
      </a>
    </div>

    <div class="dots">
      <button
        v-for="(c, i) in cards"
        :key="i"
        class="dot"
        :class="{ on: i === active }"
        :aria-label="'ไปการ์ดที่ ' + (i + 1)"
        @click="goTo(i)"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.villages {
  background: #fff;
  padding: 26px 0 30px;
}

.track {
  display: flex;
  gap: 14px;
  padding: 6px 20px 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
}
.track::-webkit-scrollbar {
  display: none;
}
.track.dragging {
  cursor: grabbing;
  user-select: none;
}

.v-card {
  flex: 0 0 46%;
  display: block;
}
.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 22px rgba(15, 77, 30, 0.16);
  overflow: hidden;
  -webkit-user-drag: none;
}
/* รูปจริงเต็มกรอบ 4/3 (พอดีช่อง ไม่ยืด) */
.thumb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  -webkit-user-drag: none;
}
.tint-a {
  background: linear-gradient(150deg, #4c9a4f, #1c6b2c);
}
.tint-b {
  background: linear-gradient(150deg, #f5a623, #c67f12);
}
.tint-c {
  background: linear-gradient(150deg, #3b8a3f, #0f4d1e);
}
.tint-d {
  background: linear-gradient(150deg, #d98a3d, #a85a1f);
}

.caption {
  margin: 12px 4px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.4;
}

/* ---------- จุดบอกตำแหน่ง ---------- */
.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}
.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(15, 77, 30, 0.2);
  transition: width 0.25s ease, background 0.25s ease;
}
.dot.on {
  width: 22px;
  background: var(--orange);
}

/* จอกว้างขึ้น — โชว์ 3 การ์ด */
@media (min-width: 560px) {
  .v-card {
    flex-basis: 31%;
  }
}
</style>
