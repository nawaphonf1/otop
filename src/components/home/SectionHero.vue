<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import sceneImg from '../../assets/home/hero-scene.png'
import bearSvg from '../../assets/home/hero-bear.svg'
import treeSvg from '../../assets/home/hero-tree.svg'

const root = ref(null)
const scene = ref(null)
const sceneBg = ref(null)
const bear = ref(null)
const tree = ref(null)
const head = ref(null)
const enter = ref(false)

let ticking = false
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

function update() {
  ticking = false
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const p = clamp(-r.top / (r.height * 0.7), 0, 1)

  // ข้อความ fade out + เลื่อนขึ้น
  if (head.value) {
    head.value.style.opacity = String(1 - clamp(p * 1.5, 0, 1))
    head.value.style.transform = `translateY(${-p * 48}px)`
  }
  // พื้นหลังฉาก parallax เบาๆ
  if (sceneBg.value) {
    sceneBg.value.style.transform = `translateY(${-p * 14}px) scale(${1 + p * 0.03})`
  }
  // หมีเดินไปทางขวา + ย่ำเท้า แล้วค่อยจางหาย
  if (bear.value && scene.value) {
    const w = scene.value.clientWidth
    const tx = p * w * 0.45
    const bob = p > 0.001 ? Math.sin(p * Math.PI * 3) * -7 : 0
    const rot = p > 0.001 ? Math.sin(p * Math.PI * 3) * 3 : 0
    bear.value.style.transform = `translate(${tx}px, ${bob}px) rotate(${rot}deg)`
    bear.value.style.opacity = String(1 - clamp((p - 0.6) * 2.6, 0, 1))
  }
  // ต้นไม้ขยับ (parallax + เอนตามการเลื่อน) แล้วค่อยจางหาย
  if (tree.value) {
    const sway = Math.sin(p * Math.PI * 2) * 2.5
    tree.value.style.transform = `translate(${-p * 14}px, ${-p * 8}px) rotate(${sway}deg)`
    tree.value.style.opacity = String(1 - clamp((p - 0.6) * 2.6, 0, 1))
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

onMounted(() => {
  requestAnimationFrame(() => (enter.value = true))
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section id="hero" ref="root" class="hero" :class="{ enter }">
    <div class="head" ref="head">
      <p class="eyebrow">จากภูมิปัญญาท้องถิ่น นำมาสู่...</p>
      <h1 class="title">
        <span class="l1">ผลิตภัณฑ์</span>
        <span class="l2">OTOP นวัตวิถี</span>
      </h1>
      <p class="place">บ้านผารังหมี อ.เนินมะปราง จ.พิษณุโลก</p>
    </div>

    <div class="scene" ref="scene">
      <img
        ref="sceneBg"
        class="scene-bg"
        :src="sceneImg"
        alt=""
        aria-hidden="true"
      />
      <div class="tree-enter">
        <div class="tree-sway">
          <img ref="tree" class="tree" :src="treeSvg" alt="" aria-hidden="true" />
        </div>
      </div>
      <div class="bear-enter">
        <img
          ref="bear"
          class="bear"
          :src="bearSvg"
          alt="หมีบ้านผารังหมีกำลังกอดผลผลิตของชุมชน"
        />
      </div>
    </div>

    <div class="body-wrap">
      <p class="body">
        แพลตฟอร์มนี้ถูกสร้างขึ้นเพื่อการประชาสัมพันธ์
        สินค้า OTOP ชุมชนบ้านผารังหมีเท่านั้น
      </p>

      <blockquote class="quote">
        “ เชิญชวนร่วมค้นพบเรื่องราวของผลิตภัณฑ์ที่ถูก<b
          >ถ่ายทอดอัตลักษณ์และภูมิปัญญาท้องถิ่นผ่านงานฝีมือ</b
        >และความตั้งใจของคนในพื้นที่ เพื่อส่งต่อคุณค่า ส่งเสริมการสนับสนุน
        และการสร้างรายได้อย่างยั่งยืนให้แก่ชุมชน ”
      </blockquote>

      <a
        class="chip"
        href="https://maps.app.goo.gl/zck7TqaaAo2y7qpJ6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
        </svg>
        บ้านผารังหมี อำเภอเนินมะปราง จังหวัดพิษณุโลก
      </a>

      <router-link class="cta" to="/products">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M7 4h-2l-1 2v2h1l2 9h11l2-7h-13"/>
          <circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/>
        </svg>
        สินค้า OTOP
      </router-link>
    </div>

    <!-- คำโปรยชุมชน (ตาม Figma) -->
    <div v-reveal class="community">
      <span class="q">“</span>
      <p class="ctext">
        <span class="c-brown">ชุมชนบ้านผารังหมี</span><br />
        <span class="c-green">ชุมชนอารมณ์ดีแห่งอำเภอเนินมะปราง</span><br />
        <span class="c-brown">รายล้อมด้วยธรรมชาติอุดมสมบูรณ์</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: #ffffff; /* พื้นหลังสีขาว (ฉากเขียวเป็นรูปวางบนขาว = ภาพ 1) */
  padding-top: 8px;
  overflow: hidden;
}

/* ---------- หัวข้อ ---------- */
.head {
  text-align: center;
  padding: 48px 20px 14px; /* เว้นระยะจาก navbar ลงมาตาม Figma */
  will-change: opacity, transform;
}
.eyebrow {
  margin: 0 0 4px;
  color: #6E3D17; /* ตรงตาม Figma */
  font-size: clamp(15px, 4.4vw, 18px);
  font-weight: 500;
}
.title {
  margin: 0;
  color: #308b30; /* ตรงตาม Figma */
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: 0.5px;
}
.title .l1,
.title .l2 {
  display: block;
  font-size: clamp(30px, 9vw, 40px);
}
.place {
  margin: 8px 0 0;
  color: #6E3D17; /* ตรงตาม Figma */
  font-size: clamp(14px, 4vw, 17px);
  font-weight: 500;
}
.head .eyebrow,
.head .title .l1,
.head .title .l2,
.head .place {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.enter .head .eyebrow { transition-delay: 0.05s; }
.enter .head .title .l1 { transition-delay: 0.18s; }
.enter .head .title .l2 { transition-delay: 0.3s; }
.enter .head .place { transition-delay: 0.42s; }
.enter .head .eyebrow,
.enter .head .title .l1,
.enter .head .title .l2,
.enter .head .place {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- ฉาก ---------- */
.scene {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: clamp(28px, 8vw, 48px); /* เว้นระยะ head → scene ตาม Figma */
}
.scene-bg {
  position: relative;
  display: block;
  width: 100%;
  height: auto; /* แสดงภาพเต็ม ไม่ crop (ยอดเขาไม่โดนตัด) */
  opacity: 0;
  transition: opacity 0.9s ease;
  will-change: transform, opacity;
}
.enter .scene-bg { opacity: 1; }

/* ต้นไม้ (ขวา) — ตำแหน่ง/ขนาดตามภาพ 2 */
.tree-enter {
  position: absolute;
  right: 1%;
  bottom: 6%;
  width: 45%;
  opacity: 0;
  transform: translateY(26px) scale(0.96);
  transition: opacity 1s ease 0.15s, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s;
}
.enter .tree-enter {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.tree-sway {
  transform-origin: 50% 100%;
  animation: sway 5s ease-in-out infinite alternate;
}
.tree {
  width: 100%;
  height: auto;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
}
@keyframes sway {
  from { transform: rotate(-1.5deg); }
  to { transform: rotate(1.5deg); }
}

/* หมี (ซ้าย-กลาง) — ตำแหน่ง/ขนาดตามภาพ 2 */
.bear-enter {
  position: absolute;
  left: 12%;
  bottom: 3%;
  width: 32%;
  opacity: 0;
  transform: translateX(-165%);
  transition: opacity 0.9s ease 0.25s,
    transform 1.2s cubic-bezier(0.18, 0.7, 0.2, 1) 0.25s;
}
.enter .bear-enter {
  opacity: 1;
  transform: translateX(0);
}
.bear {
  width: 100%;
  height: auto;
  transform-origin: bottom center;
  filter: drop-shadow(0 10px 8px rgba(40, 60, 25, 0.18));
  will-change: transform, opacity;
}

/* ---------- เนื้อหาใต้ฉาก ---------- */
.body-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 22px 28px;
  text-align: center;
  background: #fff;
}
.body {
  margin: 0;
  max-width: 340px;
  color: var(--ink-soft);
  font-size: 14px;
}
.quote {
  margin: 0;
  max-width: 360px;
  border: 1.5px solid rgba(47, 125, 50, 0.35);
  border-radius: 16px;
  padding: 16px 18px;
  color: var(--green-800);
  font-size: 14px;
  line-height: 1.7;
  background: #fff;
  box-shadow: var(--shadow);
}
.quote b { color: var(--orange-dark); font-weight: 600; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(47, 125, 50, 0.4);
  border-radius: 999px;
  padding: 8px 16px;
  color: var(--green-700);
  font-size: 13px;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.chip:hover {
  background: rgba(47, 125, 50, 0.08);
  border-color: rgba(47, 125, 50, 0.7);
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--orange);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 11px 28px;
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(245, 166, 35, 0.4);
  transition: transform 0.15s, background 0.15s;
}
.cta:hover { transform: translateY(-2px); background: var(--orange-dark); }

/* ---------- คำโปรยชุมชน (Figma: IBM Plex Sans Thai) ---------- */
.community {
  text-align: center;
  background: #fff;
  padding: 30px 22px 44px;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.community .q {
  display: block;
  font-size: 40px;
  line-height: 1;
  color: #6e3d17;
  font-weight: 500;
}
.community .ctext {
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
}
.community .c-brown { color: #6e3d17; }
.community .c-green { color: #308b30; }

.body-wrap > * {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.enter .body-wrap > * { opacity: 1; transform: translateY(0); }
.enter .body-wrap > *:nth-child(1) { transition-delay: 0.5s; }
.enter .body-wrap > *:nth-child(2) { transition-delay: 0.62s; }
.enter .body-wrap > *:nth-child(3) { transition-delay: 0.74s; }
.enter .body-wrap > *:nth-child(4) { transition-delay: 0.86s; }
</style>
