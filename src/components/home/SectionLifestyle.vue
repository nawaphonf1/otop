<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
/* ใช้ภาพ product เป็นตัวอย่างสไลด์ไปก่อน (ยังไม่มีภาพจริงของวิถีชุมชน) */
import img1 from '../../assets/home/product-fabric.jpg'
import img2 from '../../assets/home/product-mat.jpg'
import img3 from '../../assets/home/product-mango.jpg'
import img4 from '../../assets/home/product-notebook.jpg'
import bannerImg from '../../assets/home/Group-1000001800.png'

const slides = [
  { src: img1, cap: 'วิถีชีวิตของชาวบ้าน ยังคงเรียบง่าย' },
  { src: img2, cap: 'ภูมิปัญญางานจักสานที่สืบทอดกันมา' },
  { src: img3, cap: 'ผลผลิตจากธรรมชาติของชุมชน' },
  { src: img4, cap: 'งานหัตถกรรมจากมือคนในพื้นที่' },
]
const n = slides.length
/* โคลนใบแรกต่อท้าย เพื่อวนลูปแบบไร้รอยต่อ */
const loop = computed(() => [...slides, slides[0]])

const index = ref(0)
const animate = ref(true)

function goNext() {
  animate.value = true
  index.value++
}
function goPrev() {
  if (index.value <= 0) {
    // กระโดดไปตำแหน่งโคลน (เท่ากับใบแรก) แบบไม่มี transition แล้วค่อยเลื่อนถอย
    animate.value = false
    index.value = n
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animate.value = true
        index.value = n - 1
      })
    })
  } else {
    animate.value = true
    index.value--
  }
}
function onEnd() {
  // ถ้าเลื่อนถึงใบโคลน (ใบแรก) → รีเซ็ตกลับ 0 แบบไร้รอยต่อ
  if (index.value >= n) {
    animate.value = false
    index.value = 0
  }
}

/* เลื่อนอัตโนมัติต่อเนื่อง */
let timer = null
function start() {
  stop()
  timer = setInterval(goNext, 3200)
}
function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
function goTo(i) {
  animate.value = true
  index.value = i
  start()
}

const activeDot = computed(() => index.value % n)

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section id="lifestyle" class="vithi">
    <!-- หัวข้อ (พาเนลเขียว — พื้นหลังเป็นภาพ Group-1000001800) -->
    <div v-reveal class="banner">
      <img class="banner-bg" :src="bannerImg" alt="" aria-hidden="true" />
      <h2 class="btitle">
        <span class="t1">“วิถีชุมชน”</span>
        <span class="t2">สู่ผลิตภัณฑ์จากภูมิปัญญา</span>
      </h2>
    </div>

    <!-- รูปภาพสไลด์ต่อเนื่อง -->
    <div
      class="slider"
      @mouseenter="stop"
      @mouseleave="start"
    >
      <div
        class="strip"
        :class="{ noanim: !animate }"
        :style="{ transform: `translateX(-${index * 100}%)` }"
        @transitionend="onEnd"
      >
        <div v-for="(s, i) in loop" :key="i" class="slide">
          <img :src="s.src" :alt="s.cap" draggable="false" />
          <span class="scap">{{ s.cap }}</span>
        </div>
      </div>

      <button class="nav prev" aria-label="ก่อนหน้า" @click="goPrev(); start()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button class="nav next" aria-label="ถัดไป" @click="goNext(); start()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="dots">
        <button
          v-for="(s, i) in slides"
          :key="i"
          class="dot"
          :class="{ on: i === activeDot }"
          :aria-label="'ไปภาพที่ ' + (i + 1)"
          @click="goTo(i)"
        ></button>
      </div>
    </div>

    <!-- การ์ดข้อความ -->
    <div v-reveal="{ y: 24 }" class="card">
      <p class="ctext">
        บ้านผารังหมีเป็นชุมชนที่ผู้คนอยู่ร่วมกันอย่างอบอุ่นและ<b class="c1">ร่วมกันพัฒนา</b>หมู่บ้าน<b
          class="c2"
          >ผ่านการนำภูมิปัญญาและทรัพยากรในท้องถิ่น</b
        > <b class="c2">มาสร้างสรรค์</b>เป็นผลิตภัณฑ์ OTOP
        ที่สะท้อนเอกลักษณ์และวิถีชีวิตของคนในชุมชน
      </p>
      <router-link class="more" to="/community-story">
        <span>อ่านเพิ่มเติม</span>
        <span class="more-arrow">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M4 11h12.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H4z" />
          </svg>
        </span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.vithi {
  background: #fff;
  padding-bottom: 34px;
}

/* ---------- หัวข้อพาเนลเขียว (พื้นหลังเป็นภาพ) ---------- */
.banner {
  position: relative;
  /* full-bleed: ทะลุคอลัมน์ 800px ออกไปเต็มความกว้างจอ */
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
.banner-bg {
  display: block;
  width: 100%;
  height: auto;
}
.btitle {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5.5%; /* ดันลงมาให้อยู่กลางพื้นเขียว (~58% ของความสูง เว้นขอบโค้งด้านบน) */
  margin: 0;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
  font-weight: 700;
  color: #fff;
  letter-spacing: 1.4px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 1.2;
}
.btitle .t1 {
  display: block;
  font-size: 28px;
}
.btitle .t2 {
  display: block;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.63);
}

/* ---------- รูปภาพสไลด์ ---------- */
.slider {
  position: relative;
  margin-top: -1px; /* ชิดขอบล่างพาเนลเขียวแบบไร้รอยต่อ */
  overflow: hidden;
}
.strip {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.22, 0.7, 0.2, 1);
  will-change: transform;
}
.strip.noanim {
  transition: none;
}
.slide {
  position: relative;
  flex: 0 0 100%;
  aspect-ratio: 16 / 10;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}
.slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.45));
  pointer-events: none;
}
.scap {
  position: absolute;
  right: 16px;
  bottom: 12px;
  max-width: 45%;
  text-align: right;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

/* ปุ่มลูกศร */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.82);
  color: var(--green-800);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  transition: background 0.15s, transform 0.15s;
}
.nav:hover {
  background: #fff;
}
.nav:active {
  transform: translateY(-50%) scale(0.92);
}
.nav.prev {
  left: 10px;
}
.nav.next {
  right: 10px;
}

/* จุดบอกตำแหน่ง */
.dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  display: flex;
  justify-content: center;
  gap: 7px;
}
.dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  transition: width 0.25s ease, background 0.25s ease;
}
.dot.on {
  width: 20px;
  background: #fff;
}

/* ---------- การ์ดข้อความ ---------- */
.card {
  position: relative;
  margin: 26px 24px 0;
  background: #fff;
  border-radius: 15px;
  padding: 20px 22px 62px;
  box-shadow: 0 12px 26px rgba(20, 60, 20, 0.16);
}
.ctext {
  margin: 0;
  text-align: center;
  color: #414042;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.28px;
}
.ctext .c1 {
  color: #80433b;
  font-weight: 700;
}
.ctext .c2 {
  color: #6e391d;
  font-weight: 700;
}

/* ปุ่มอ่านเพิ่มเติม (ธีมเดียวกับส่วนความเป็นมา) */
.more {
  position: absolute;
  right: 18px;
  bottom: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px 7px 20px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  background: linear-gradient(180deg, #f8b23e, var(--orange));
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(245, 166, 35, 0.38);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}
.more:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(245, 166, 35, 0.5);
  filter: brightness(1.03);
}
.more:active {
  transform: translateY(0);
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
</style>
