<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* การ์ดตัวอย่าง (ยังไม่มีภาพ/รายละเอียดจริง) — แก้ทีหลังได้ */
const cards = [
  { title: 'หมู่บ้านผารังหมี ต.ไทรย้อย', tint: 'a', icon: 'mountain' },
  { title: 'หมู่บ้านอารมณ์ดี', tint: 'b', icon: 'weave' },
  { title: 'วิถีเกษตรอินทรีย์', tint: 'c', icon: 'leaf' },
  { title: 'ผ้าทอมือภูมิปัญญา', tint: 'd', icon: 'thread' },
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
          <svg
            v-if="c.icon === 'mountain'"
            viewBox="0 0 24 24"
            width="34"
            height="34"
          >
            <path
              fill="currentColor"
              d="M14 6l5 8h-4l-3-5-1 1.6L14 6zM8.5 9.5L14 18H3l5.5-8.5z"
            />
          </svg>
          <svg
            v-else-if="c.icon === 'weave'"
            viewBox="0 0 24 24"
            width="34"
            height="34"
          >
            <path
              fill="currentColor"
              d="M4 5h16v2H4V5zm0 12h16v2H4v-2zM6 8h2v8H6V8zm4 0h2v8h-2V8zm4 0h2v8h-2V8zm4 0h2v8h-2V8z"
            />
          </svg>
          <svg
            v-else-if="c.icon === 'leaf'"
            viewBox="0 0 24 24"
            width="34"
            height="34"
          >
            <path
              fill="currentColor"
              d="M5 19c0-7 5-13 14-13 0 9-6 14-13 14l-1-1c1-4 4-7 8-8-5 1-7 4-8 8z"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="34" height="34">
            <path
              fill="currentColor"
              d="M4 4h16v3H4V4zm2 5h3l3 11H9L6 9zm7 0h3l-3 11h-3l3-11z"
            />
          </svg>
          <span class="ph">ตัวอย่างรูปภาพ</span>
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
.thumb .ph {
  position: absolute;
  bottom: 10px;
  font-size: 11px;
  letter-spacing: 0.4px;
  opacity: 0.85;
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
