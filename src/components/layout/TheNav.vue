<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '../../assets/common/logo-bear.svg'

const open = ref(false)
const hidden = ref(false)
// เมนูนำทาง: ชี้ไปหน้า/section จริง ใช้ได้ทุกหน้า (router จัดการ smooth-scroll ตาม hash ให้เอง)
const links = [
  { label: 'หน้าแรก',        to: { path: '/', hash: '#hero' } },
  { label: 'เกี่ยวกับชุมชน', to: '/history' },
  { label: 'วิถีชีวิต',      to: '/community-story' },
  { label: 'ผลิตภัณฑ์ OTOP', to: '/products' },
  { label: 'ผู้ผลิต',        to: '/producers' },
  { label: 'ติดต่อเรา',      to: { path: '/', hash: '#contact' } },
  { label: 'ผู้ดูแลระบบ',    to: '/admin/products' },
]

function closeMenu() {
  open.value = false
}

// ซ่อน navbar เมื่อเลื่อนลง / โผล่กลับเมื่อเลื่อนขึ้น
let lastY = 0
let ticking = false
function apply() {
  ticking = false
  const y = window.scrollY || document.documentElement.scrollTop
  const delta = y - lastY
  if (y < 70) {
    hidden.value = false // ใกล้บนสุด แสดงเสมอ
  } else if (delta > 6) {
    hidden.value = true // เลื่อนลง → ซ่อน
    open.value = false // ปิดเมนูที่เปิดค้าง
  } else if (delta < -6) {
    hidden.value = false // เลื่อนขึ้น → โผล่กลับ
  }
  lastY = y
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(apply)
  }
}
onMounted(() => {
  lastY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav-wrap" :class="{ hidden }">
    <div class="pill">
      <RouterLink class="brand" :to="{ path: '/', hash: '#hero' }" @click="closeMenu">
        <img :src="logo" alt="โลโก้บ้านผารังหมี" />
        <span>บ้านผารังหมีน่าอยู่</span>
      </RouterLink>

      <button
        class="burger"
        :class="{ on: open }"
        :aria-expanded="open"
        aria-label="เมนู"
        @click="open = !open"
      >
        <span></span><span></span>
      </button>

      <transition name="drop">
        <nav v-if="open" class="drawer">
          <RouterLink
            v-for="l in links"
            :key="l.label"
            :to="l.to"
            @click="closeMenu"
            >{{ l.label }}</RouterLink
          >
        </nav>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 12px clamp(12px, 4vw, 20px);
  background: transparent;
  pointer-events: none; /* ให้คลิกทะลุช่องว่างข้าง pill ได้ */
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  will-change: transform;
}
/* เลื่อนลง → ซ่อนขึ้นด้านบน */
.nav-wrap.hidden {
  transform: translateY(-140%);
  opacity: 0;
  pointer-events: none;
}
.pill {
  pointer-events: auto;
}

.pill {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 12px 20px;
  border-radius: 999px;
  background: #381e04;
  box-shadow: 0 10px 24px rgba(56, 30, 4, 0.35);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  font-weight: 600;
  font-size: clamp(16px, 4.4vw, 19px);
  color: #fff;
  min-width: 0;
}
.brand img {
  width: 34px;
  height: 34px;
  object-fit: contain;
  flex: none;
}
.brand span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.burger {
  flex: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  width: 44px;
  height: 40px;
  padding: 9px 8px;
  background: transparent;
  border: 0;
}
.burger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 3px;
  transition: transform 0.25s, opacity 0.2s;
}
.burger.on span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}
.burger.on span:nth-child(2) {
  transform: translateY(-5px) rotate(-45deg);
}

.drawer {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #381e04;
  border-radius: 22px;
  padding: 8px;
  box-shadow: 0 14px 30px rgba(56, 30, 4, 0.4);
}
.drawer a {
  padding: 12px 16px;
  border-radius: 14px;
  color: #f1e7d8;
  font-size: 15px;
}
.drawer a:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--orange);
}

.drop-enter-active,
.drop-leave-active {
  transition: all 0.2s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
