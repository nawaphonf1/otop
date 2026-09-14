<script setup>
import { useRouter } from 'vue-router'
import TheNav from '../components/layout/TheNav.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import ScrollTop from '../components/layout/ScrollTop.vue'

import sceneImg  from '../assets/community/life-scene.png'
import phImage   from '../assets/common/ph-image.svg'
import phVector  from '../assets/common/ph-vector.svg'

import CommunityImg1 from '../assets/community/1.jpg'
import CommunityImg2 from '../assets/community/2.jpg'
import CommunityImg3 from '../assets/community/3.jpg'
import CommunityImg4 from '../assets/community/4.jpg'
import CommunityImg5 from '../assets/community/5.jpg'
import CommunityImg6 from '../assets/community/6.jpg'
import CommunityImg7 from '../assets/community/7.jpg'
import CommunityImg8 from '../assets/community/8.jpg'
import CommunityImg9 from '../assets/community/9.jpg'
import CommunityImg10 from '../assets/community/บ้าน.png'
import CommunityImg11 from '../assets/community/วัด.jpg'
import CommunityImg12 from '../assets/community/โรงเรียน.jpg'
import CommunityImg13 from '../assets/community/13.jpg'

const router = useRouter()

/* รากวัฒนธรรม — 3 รายการ (green pill) */
const cultureItems = [
  'ภาษา - ใช้ภาษาอีสานในการสื่อสาร',
  'การแต่งกาย - นิยมสวมผ้าฝ้ายย้อมสีธรรมชาติ',
  'อาหาร - สืบทอดรสชาติและวิถีอาหารแบบอีสาน',
]

/* บวร — 3 การ์ด */
const bvr = [
  { title: 'บ้าน', desc: 'พื้นที่แห่งวิถีชีวิตและความสัมพันธ์', img: CommunityImg10 },
  { title: 'วัด', desc: 'ศูนย์รวมจิตใจและศรัทธา', img: CommunityImg11 },
  { title: 'โรงเรียน', desc: 'พื้นที่แห่งการเรียนรู้ของเยาวชน', img: CommunityImg12 },
]

/* รูปภาพชุมชน — เรียงตามเลข ใส่ในช่อง "ใส่ภาพ" (ข้ามหมวดบวร) */
const twoColA = [CommunityImg2, CommunityImg3]                                 // 2 ช่อง (บล็อกวิถีชีวิต)
const fourGrid = [CommunityImg4, CommunityImg5, CommunityImg6, CommunityImg7]  // 4 ช่อง (รากวัฒนธรรม)
const twoColB = [CommunityImg8, CommunityImg9]                                 // 2 ช่อง (ก่อน closing quote)
</script>

<template>
  <div class="cs-shell">
    <TheNav />

    <main class="cs-main">

      <!-- ══════════ 1. Hero placeholder + back ══════════ -->
      <section class="hero-sec">
        <div class="hero-ph">
          <img class="fill-img" :src="CommunityImg1" alt="ชุมชนบ้านผารังหมี" />
        </div>
      </section>

      <!-- ══════════ 2. Quote 1 ══════════ -->
      <section v-reveal="{ y: 16 }" class="quote1-sec">
        <span class="q-mark">“</span>
        <p class="q1-text">
          <span class="q-brown">ธรรมชาติและภูเขาหินปูน</span><br />
          <span class="q-brown">วิถีเกษตรและข้าวปลอดสารพิษ</span><br />
          <span class="q-green">ผ้าฝ้ายย้อมสีธรรมชาติ</span><br />
          <span class="q-green">วัฒนธรรมอีสาน</span><br />
          <span class="q-brown">ศรัทธาและประเพณี</span><br />
          <span class="q-brown">อาหารพื้นถิ่น</span>
        </p>
      </section>

      <!-- ══════════ 3. หัวข้อ เสน่ห์ + แคปชั่น ══════════ -->
      <section class="intro-sec">
        <h2 v-reveal="{ y: 16 }" class="intro-title">เสน่ห์บ้านผารังหมี</h2>
        <p v-reveal="{ y: 16, delay: 60 }" class="intro-sub">
          ชุมชนริมภูเขาหินปูนที่ผสมผสานธรรมชาติ วัฒนธรรม และวิถีชีวิตแบบเกษตรกรอย่างลงตัว
        </p>
      </section>

      <!-- ══════════ 4. การ์ดแคปชั่น ══════════ -->
      <section v-reveal="{ y: 18 }" class="introcard-sec">
        <div class="introcard">
          <p class="introcard-text">
            “ บ้านผารังหมี<strong>มีเสน่ห์จากการผสมผสานระหว่างธรรมชาติและวิถีชีวิต</strong> โดยมีภูเขาหินปูนและพื้นที่เกษตรกรรมเป็นฉากหลังของชุมชน ผู้คนมีวิถีชีวิตเรียบง่ายเป็นมิตร ”
          </p>
        </div>
      </section>

      <!-- ══════════ 5. Scene illustration ══════════ -->
      <div v-reveal="{ y: 20 }" class="scene-wrap">
        <img class="scene-img" :src="sceneImg" alt="วิถีชีวิตชุมชนบ้านผารังหมี" />
      </div>

      <!-- ══════════ 6. วิถีชีวิต เรียบง่าย ══════════ -->
      <section class="block">
        <h2 v-reveal="{ y: 18 }" class="head2">
          วิถีชีวิต เรียบง่าย<br /><span class="h-brown">อยู่กับธรรมชาติ</span>
        </h2>
        <p v-reveal="{ y: 16, delay: 60 }" class="para">
          วิถีชีวิตของชาวบ้านผารังหมีมีความผูกพันกับธรรมชาติและการประกอบอาชีพเกษตรกรรมมาอย่างยาวนาน โดยชาวบ้านส่วนใหญ่ประกอบอาชีพปลูกข้าวปลอดสารพิษ และทำการเกษตร
        </p>
      </section>

      <!-- ══════════ 7. รูป 2 คอลัมน์ (รูป 2,3) ══════════ -->
      <div class="ph2col-wrap">
        <div
          v-for="(img, i) in twoColA"
          :key="i"
          v-reveal="{ y: 18, delay: i * 80 }"
          class="ph-box"
        >
          <img class="fill-img" :src="img" alt="วิถีชีวิตบ้านผารังหมี" />
        </div>
      </div>

      <!-- ══════════ 8. รากวัฒนธรรม + pills ══════════ -->
      <section class="block">
        <h2 v-reveal="{ y: 18 }" class="head2">
          <span class="h-green">รากวัฒนธรรม</span> <span class="h-brown">กลิ่นอายอีสานที่ยังคงอยู่</span>
        </h2>
        <p v-reveal="{ y: 16, delay: 60 }" class="para">
          ชาวบ้านผารังหมีมีพื้นเพเดิมจากภาคตะวันออกเฉียงเหนือ จึงได้มีการนำภาษา อาหาร การแต่งกายและขนบธรรมเนียมจากถิ่นเดิมมาผสมผสานกับวิถีชีวิตในพื้นที่ จนเกิดเป็นอัตลักษณ์เฉพาะของชุมชน
        </p>
        <ul class="pill-list">
          <li
            v-for="(c, i) in cultureItems"
            :key="i"
            v-reveal="{ y: 14, delay: i * 80 }"
            class="pill"
          >{{ c }}</li>
        </ul>
      </section>

      <!-- ══════════ 9. รูป 4 กล่อง (2×2) (รูป 4,5,6,7) ══════════ -->
      <div class="ph2col-wrap ph2col-grid">
        <div
          v-for="(img, i) in fourGrid"
          :key="i"
          v-reveal="{ y: 18, delay: (i % 2) * 80 }"
          class="ph-box"
        >
          <img class="fill-img" :src="img" alt="รากวัฒนธรรมบ้านผารังหมี" />
        </div>
      </div>

      <!-- ══════════ 10. บวร หัวใจของชุมชน + การ์ด ══════════ -->
      <section class="block">
        <h2 v-reveal="{ y: 18 }" class="head2">
          <span class="h-green">บวร</span><br /><span class="h-brown">หัวใจของชุมชน</span>
        </h2>
        <p v-reveal="{ y: 16, delay: 60 }" class="para">
          บ้านผารังหมีมีองค์ประกอบของ บวร ได้แก่ บ้าน วัด และโรงเรียน ที่เชื่อมโยงผู้คนเข้าด้วยกัน เกิดเป็นพื้นที่สำหรับการเรียนรู้ การทำกิจกรรมและการสืบทอดวัฒนธรรมของชุมชน
        </p>
        <ul class="bvr-list">
          <li
            v-for="(b, i) in bvr"
            :key="i"
            v-reveal="{ y: 18, delay: i * 80 }"
            class="bvr-card"
          >
            <div class="bvr-ph">
              <img class="fill-img" :src="b.img" alt=""  />
            </div>
            <div class="bvr-text">
              <strong class="bvr-title">{{ b.title }}</strong>
              <p class="bvr-desc">{{ b.desc }}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- ══════════ 11. ชุมชนแห่งการเรียนรู้ ══════════ -->
      <section class="block block-center">
        <div v-reveal="{ y: 14 }" class="loc-badge">
          <svg class="loc-pin" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
          <span class="loc-text">
            <span class="loc-main">ชุมชนบ้านผารังหมี</span>
            <span class="loc-sub">อ.เนินมะปราง จ.พิษณุโลก</span>
          </span>
        </div>
        <h2 v-reveal="{ y: 18, delay: 60 }" class="head2 head2-single">ชุมชนแห่งการเรียนรู้</h2>
        <p v-reveal="{ y: 16, delay: 100 }" class="para">
          เสน่ห์อีกด้านของบ้านผารังหมีคือการเปิดโอกาสให้ผู้มาเยือนได้เรียนรู้และสัมผัสวิถีชีวิตของชุมชนจริง ไม่ว่าจะเป็นการเรียนรู้ด้านการเกษตร อาหาร วัฒนธรรม ประเพณี การแต่งกาย หรือภูมิปัญญาท้องถิ่น
        </p>
      </section>

      <!-- ══════════ 12. Placeholder (ใส่ vector) ══════════ -->
      <div v-reveal="{ y: 20 }" class="ph-wrap">
        <div class="ph-box ph-tall">
          <img class="fill-img" :src="CommunityImg13" alt=""  />
        </div>
      </div>

      <!-- ══════════ 13. รูป 2 คอลัมน์ (รูป 8,9) ══════════ -->
      <div class="ph2col-wrap">
        <div
          v-for="(img, i) in twoColB"
          :key="i"
          v-reveal="{ y: 18, delay: i * 80 }"
          class="ph-box"
        >
          <img class="fill-img" :src="img" alt="ชุมชนแห่งการเรียนรู้" />
        </div>
      </div>

      <!-- ══════════ 14. Closing quote ══════════ -->
      <section v-reveal="{ y: 16 }" class="quote2-sec">
        <span class="q-mark">“</span>
        <p class="q2-text">
          <span class="q-green">การท่องเที่ยวของชุมชนจึงไม่ได้มุ่งเน้น</span><br />
          <span class="q-brown">เพียงการชมสถานที่</span> <span class="q-green">แต่เป็นการสร้างประสบการณ์ให้</span><br />
          <span class="q-brown">ผู้มาเยือนได้มีส่วนร่วม ”</span>
        </p>
      </section>

    </main>

    <TheFooter />
    <ScrollTop />
  </div>
</template>

<style scoped>
.cs-shell {
  min-height: 100dvh;
  background: #fff;
}
.cs-main { overflow: hidden; }

/* ─── Hero placeholder ─────────────── */
.hero-sec {
  position: relative;
  padding: 20px 16px 0;
  background: #fff;
}
.hero-ph {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 220px;
  background: #e8e3d9;
  border: 1px solid #d6cfc7;
  border-radius: 16px;
  overflow: hidden;
}
.back-btn {
  position: absolute;
  left: 8px;
  bottom: -18px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #2d7a2d;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

/* ─── Quote 1 ──────────────────────── */
.quote1-sec {
  background: #fff;
  padding: 30px 24px 24px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.q-mark {
  display: block;
  font-size: 40px;
  line-height: 1;
  color: #6e3d17;
  font-weight: 500;
}
.q1-text {
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
}
.q-brown { color: #6e3d17; }
.q-green { color: #308b30; }

/* ─── หัวข้อ เสน่ห์ + แคปชั่น ───────── */
.intro-sec {
  background: #fff;
  padding: 12px 24px 14px;
}
.intro-title {
  margin: 0 0 10px;
  font-size: 26px;
  font-weight: 800;
  color: #308b30;
  line-height: 1.2;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.intro-sub {
  margin: 0;
  font-size: 15px;
  color: #414042;
  line-height: 1.5;
}

/* ─── การ์ดแคปชั่น ─────────────────── */
.introcard-sec {
  background: #fff;
  padding: 14px 24px 18px;
}
.introcard {
  background: #fff;
  border-radius: 15px;
  padding: 18px 20px;
  box-shadow: 0 3px 14px rgba(72,71,71,0.28);
}
.introcard-text {
  margin: 0;
  font-size: 16px;
  line-height: 25px;
  color: #414042;
  text-align: center;
  letter-spacing: 0.48px;
}
.introcard-text strong { color: #6e3d17; font-weight: 700; }

/* ─── Scene ────────────────────────── */
.scene-wrap {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background: #fff;
}
.scene-img { width: 100%; height: auto; display: block; }

/* ─── Block (หัวข้อ + ย่อหน้า) ──────── */
.block {
  background: #fff;
  padding: 22px 24px 8px;
}
.block-center { text-align: center; }
.head2 {
  margin: 0 0 14px;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.3;
  color: #308b30;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.head2-single { margin-bottom: 12px; }
.h-green { color: #308b30; }
.h-brown { color: #69411f; }
.para {
  margin: 0;
  font-size: 15px;
  line-height: 28px;
  color: #414042;
  text-indent: 28px;
}
.block-center .para { text-indent: 0; }

/* ─── Placeholder boxes ────────────── */
.ph-wrap {
  background: #fff;
  padding: 16px 20px;
}
.ph2col-wrap {
  background: #fff;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.ph2col-grid { grid-template-columns: 1fr 1fr; }
.ph-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 160px;
  background: #e8e3d9;
  border: 1px solid #d6cfc7;
  border-radius: 16px;
  overflow: hidden;
}
.ph-box.ph-tall { height: 220px; }
/* รูปจริงเต็มกล่อง (พอดีช่อง ไม่ยืด) */
.fill-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ph-icon { opacity: 0.9; }
.ph-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b5e54;
}

/* ─── รากวัฒนธรรม pills ────────────── */
.pill-list {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 11px;
}
.pill {
  width: 100%;
  max-width: 307px;
  background: #308b30;
  color: #fff;
  font-size: 15px;
  /* กึ่งกลางทั้งแนวนอน+แนวตั้ง (ครอบคลุมข้อความหลายบรรทัด และ override .pill global) */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 9px 16px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

/* ─── บวร cards ────────────────────── */
.bvr-list {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bvr-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid #d6cfc7;
  border-radius: 16px;
  padding: 16px;
}
.bvr-ph {
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  border-radius: 12px;
  background: #e8e3d9;
  border: 1px solid #d6cfc7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.bvr-text { flex: 1; min-width: 0; }
.bvr-title {
  display: block;
  color: #308b30;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 6px;
}
.bvr-desc {
  margin: 0;
  color: #414042;
  font-size: 15px;
  line-height: 1.5;
}

/* ─── Location badge ───────────────── */
.loc-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #308b30;
  color: #fff;
  padding: 6px 14px;
  border-radius: 11px;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);
  margin-bottom: 16px;
}
.loc-pin { flex-shrink: 0; }
.loc-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  text-align: left;
}
.loc-main { font-size: 12px; font-weight: 600; }
.loc-sub { font-size: 8px; opacity: 0.95; }

/* ─── Closing quote ────────────────── */
.quote2-sec {
  background: #fff;
  padding: 28px 24px 34px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.q2-text {
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
}
</style>
