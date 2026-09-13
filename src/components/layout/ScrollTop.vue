<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
let last = 0

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop
  const delta = y - last

  if (y < 250) {
    // ใกล้บนสุด → ซ่อน
    visible.value = false
  } else if (delta > 4) {
    // เลื่อนลง → แสดงค้างไว้
    visible.value = true
  } else if (delta < -4) {
    // เลื่อนขึ้น → เฟดหายลงล่าง
    visible.value = false
  }
  last = y
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  last = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <button
    class="to-top"
    :class="{ show: visible }"
    type="button"
    aria-label="เลื่อนขึ้นบนสุด"
    @click="toTop"
  >
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d="M6 13.5l6-6 6 6M6 18l6-6 6 6"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<style scoped>
.to-top {
  position: fixed;
  z-index: 60;
  bottom: 22px;
  /* เกาะขอบขวาของคอลัมน์เนื้อหาบนจอกว้าง, ไม่หลุดขอบบนจอแคบ */
  right: clamp(16px, calc(50vw - 400px + 14px), 50vw);
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(180deg, var(--green-500), var(--green-700));
  box-shadow: 0 10px 22px rgba(15, 77, 30, 0.4);

  /* สถานะเริ่มต้น = ซ่อน (จมลงล่าง + จางหาย) */
  opacity: 0;
  transform: translateY(80px);
  pointer-events: none;
  transition: opacity 0.35s ease, transform 0.35s ease, background 0.15s;
}
.to-top.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.to-top:hover {
  background: linear-gradient(180deg, var(--green-600), var(--green-800));
}
.to-top:active {
  transform: translateY(2px);
}
</style>
