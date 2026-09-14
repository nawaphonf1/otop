<script setup>
import { useRouter } from 'vue-router'
import TheNav from '../components/layout/TheNav.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import ScrollTop from '../components/layout/ScrollTop.vue'

import heroImg       from '../assets/common/history-hero.png'
import roofImg       from '../assets/history/hist-green-top.png'
import bottomImg     from '../assets/history/hist-green-bottom.png'
import bearPeekImg   from '../assets/history/hist-bear-top.svg'
import mapImg        from '../assets/history/hist-map.png'
import sceneImg      from '../assets/history/hist-scene.png'

import iconTrees     from '../assets/common/tl-trees.svg'
import iconCircleX   from '../assets/history/tl-circle-x.svg'
import iconMountain  from '../assets/history/tl-mountain.svg'
import iconHome      from '../assets/history/tl-home.svg'

import phImage       from '../assets/common/ph-image.svg'
import phVector      from '../assets/common/ph-vector.svg'

import Img0 from '../assets/history/0.png'
import Img1 from '../assets/history/1.png'
import Img2 from '../assets/history/2.png'
import Img3 from '../assets/history/3.png'
import Img4 from '../assets/history/4.png'

const router = useRouter()

/* ปีพ.ศ. timeline — badge สีทองวงกลม, การ์ดขาว, ไอคอนพื้นเขียวอ่อน (ตรงตาม Figma) */
const timeline = [
  {
    badge: '2507',
    icon: iconTrees,
    title: 'จุดเริ่มต้นของชุมชน',
    line: true,
    body: [
      { t: 'เริ่มจากประชากรของ' },
      { t: 'จังหวัดสระบุรีและพิจิตร จำนวน 4 ครัวเรือน', b: true },
      { t: ' เข้ามาตั้งถิ่นฐานในพื้นที่' },
    ],
  },
  {
    badge: '2516',
    icon: iconCircleX,
    title: 'ภูมิปัญญาจากถิ่นเดิม',
    line: true,
    body: [
      { t: 'ผู้คนทางภาคอีสาน', b: true },
      { t: 'เข้ามาอาศัย พร้อมกับ' },
      { t: 'นำการทอเสื่อและผ้ามัดหมี่มาสืบสานต่อ', b: true },
      { t: 'ในพื้นที่' },
    ],
  },
  {
    badge: 'ชื่อ\nชุมชน',
    icon: iconMountain,
    title: 'จาก "ผาหลังหมี" นำมาสู่ "ผารังหมี"',
    line: true,
    body: [
      { t: 'เริ่มต้นจาก' },
      { t: 'มีคนเห็นหลังของหมีที่ลงมากินน้ำ', b: true },
      { t: ' จึงกลายเป็นที่มาของชื่อ ชุมชน' },
    ],
  },
  {
    badge: 'วันนี้',
    icon: iconHome,
    title: 'วิถีที่ยังคงอยู่',
    line: false,
    body: [
      { t: 'ผู้คนร่วมกันพัฒนาชุมชน', b: true },
      { t: ' ด้วยการสืบสานภูมิปัญญาและวิถีชีวิตที่เป็นเอกลักษณ์ของบ้านผารังหมี' },
    ],
  },
]
</script>

<template>
  <div class="hist-shell">
    <TheNav />

    <main class="hist-main">

      <!-- ══════════════ 1. Hero ══════════════ -->
      <section class="hero-wrap">
        <img class="hero-img" :src="heroImg" alt="บ้านผารังหมี" />
        <div class="hero-shade" aria-hidden="true"></div>
        <button class="back-btn" @click="router.back()" aria-label="กลับ">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="hero-caption">
          <span class="hc-label">ชุมชนท่องเที่ยว OTOP นวัตวิถี</span>
          <span class="hc-main">หมู่บ้านผารังหมี</span>
        </div>
      </section>

      <!-- ══════════════ 2. หัวข้อ + แคปชั่น ══════════════ -->
      <section class="intro-sec">
        <h2 v-reveal="{ y: 16 }" class="intro-title">จากผาหลังหมี สู่บ้านผารังหมี</h2>
        <p v-reveal="{ y: 16, delay: 60 }" class="intro-sub">
          เรื่องราวเต็มรูปแบบของชุมชนผารังหมี จากผู้ย้ายถิ่นฐาน สู่ชุมชนแห่งภูมิปัญญา
        </p>
      </section>

      <!-- ══════════════ 3. Timeline (บ้านสีเขียว) ══════════════ -->
      <section class="timeline-sec">
        <div class="tl-roof-wrap">
          <img class="tl-bear-peek" :src="bearPeekImg" alt="" aria-hidden="true" />
          <img class="tl-roof" :src="roofImg" alt="" aria-hidden="true" />
        </div>

        <div class="tl-inner">
          <p v-reveal="{ y: 12 }" class="tl-year-label">ปีพ.ศ.</p>

          <ul class="tl-list">
            <li
              v-for="(item, i) in timeline"
              :key="i"
              v-reveal="{ y: 24, delay: i * 100 }"
              class="tl-item"
              :class="{ 'is-last': !item.line }"
            >
              <!-- rail: badge + เส้นเชื่อม -->
              <div class="tl-rail">
                <div class="tl-badge">
                  <span class="badge-text">{{ item.badge }}</span>
                </div>
                <div v-if="item.line" class="tl-line"></div>
              </div>

              <!-- การ์ด -->
              <div class="tl-card">
                <div class="tl-title-row">
                  <div class="tl-icon">
                    <img :src="item.icon" alt="" width="18" height="18" />
                  </div>
                  <strong class="tl-title">{{ item.title }}</strong>
                </div>
                <p class="tl-body">
                  <template v-for="(seg, j) in item.body" :key="j">
                    <strong v-if="seg.b" class="tl-b">{{ seg.t }}</strong>
                    <span v-else>{{ seg.t }}</span>
                  </template>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <img class="tl-bottom" :src="bottomImg" alt="" aria-hidden="true" />
      </section>

      <!-- sub-heading ท้าย timeline (บนพื้นขาว) -->
      <h2 v-reveal="{ y: 18 }" class="tl-subheading">
        จากชุมชนเล็ก ๆ สู่<br /><span class="tl-sh-brown">"บ้านผารังหมี"</span>
      </h2>

      <!-- ══════════════ 4. Quote 1 ══════════════ -->
      <section v-reveal="{ y: 18 }" class="quote-sec">
        <span class="q-mark">“</span>
        <p class="q-text">
          เรื่องราวที่ผ่านกาลเวลา<br />
          จากราษฎรผู้ย้ายถิ่นฐาน<br />
          สู่ชุมชนผู้สานภูมิปัญญา
        </p>
      </section>

      <!-- ══════════════ 5. เรื่องราว 3.1 ══════════════ -->
      <section class="story-sec">
        <p v-reveal="{ y: 16 }" class="story-p">
          บ้านผารังหมีเดิมมีชื่อว่า <strong>"บ้านผาหลังหมี"</strong> โดยเริ่มจากมีผู้คนจังหวัดสระบุรีและจังหวัดพิจิตรเข้ามาตั้งถิ่นฐานในปีพ.ศ. 2507 จำนวน 4 ครัวเรือน ต่อมาในปีพ.ศ. 2513 มีผู้คนจากพื้นที่อื่นและในจังหวัดพิษณุโลกเริ่มทยอยเข้ามาอาศัยเพิ่มขึ้น ทำให้ชุมชนค่อยๆ ขยายตัวและมีผู้คนเข้ามาร่วมสร้างบ้านเรือนมากขึ้นเรื่อยๆ
        </p>
      </section>

      <!-- ══════════════ 6. ภาพประกอบ 3.2 (แผนที่ชุมชน) ══════════════ -->
      <div v-reveal="{ y: 20 }" class="map-wrap">
        <img class="map-img" :src="mapImg" alt="แผนที่ท่องเที่ยวบ้านผารังหมี" />
      </div>

      <!-- ══════════════ 7. เรื่องราว 3.3 ══════════════ -->
      <section class="story-sec">
        <p v-reveal="{ y: 16 }" class="story-p">
          ในปี พ.ศ. 2514 ชาวบ้านได้ร่วมกันบูรณะพื้นที่ให้เป็นที่พักสงฆ์ และมีพระจำพรรษาจำนวน 4 รูป ก่อนที่ในปี พ.ศ. 2516 จะมีราษฎรจากหลายจังหวัดในทางภาคอีสานเข้ามาตั้งถิ่นฐานเพิ่มเติม ได้แก่ กาฬสินธุ์ ขอนแก่น มหาสารคาม ศรีสะเกษ ยโสธร สุรินทร์ และอุบลราชธานี มาร่วมตั้งถิ่นฐานในชุมชน
        </p>
        <p v-reveal="{ y: 16, delay: 80 }" class="story-p">
          ผู้คนเหล่านี้ได้นำวิถีชีวิตและภูมิปัญญาจากถิ่นเดิมติดตัวมาด้วย ทั้งการทอเสื่อ การทอผ้ามัดหมี่ การทำงานหัตถกรรม และการประกอบอาชีพเกษตรกรรม
        </p>
      </section>

      <!-- ══════════════ 8. Placeholder (ใส่ vector) ══════════════ -->
      <div v-reveal="{ y: 20 }" class="ph-wrap">
        <div class="ph-box ph-tall">
          <img class="fill-img" :src="Img1" alt="" style="padding: 10px;"/>
        </div>
      </div>

      <!-- ══════════════ 9. เรื่องราว 3.6 ══════════════ -->
      <section class="story-sec">
        <p v-reveal="{ y: 16 }" class="story-p">
          และในเวลาต่อมาในปี พ.ศ. 2518 ได้มีการแยกหมู่บ้านออกจากบ้านหนองขมิ้น ตำบลบ้านมุง อำเภอเนินมะปราง จังหวัดพิษณุโลก เปลี่ยนมาเป็นหมู่ที่ 3 บ้านผารังหมี ตำบลไทรย้อย อำเภอเนินมะปราง จังหวัดพิษณุโลก อย่างเป็นทางการ
        </p>
      </section>

      <!-- ══════════════ 10. แคปชั่น 3.7 ══════════════ -->
      <section class="caption37-sec">
        <div v-reveal="{ y: 14 }" class="loc-badge">
          <svg class="loc-pin" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
          <span class="loc-text">
            <span class="loc-main">ชุมชนบ้านผารังหมี</span>
            <span class="loc-sub">อ.เนินมะปราง จ.พิษณุโลก</span>
          </span>
        </div>
        <h2 v-reveal="{ y: 18, delay: 60 }" class="caption37-title">
          ชื่อที่เปลี่ยนไป<br />
          <span class="c37-brown">พร้อมเรื่องราวที่ยังคงอยู่</span>
        </h2>
      </section>

      <!-- ══════════════ 11. Scene (ภูเขา + หมี + ต้นมะม่วง) ══════════════ -->
      <div v-reveal="{ y: 20 }" class="scene-wrap">
        <img class="scene-img" :src="sceneImg" alt="บรรยากาศบ้านผารังหมี" />
      </div>

      <!-- ══════════════ 12. เรื่องราว 3.9 ══════════════ -->
      <section class="story-sec">
        <p v-reveal="{ y: 16 }" class="story-p">
          มีที่มาจากเรื่องเล่าของชาวบ้านว่า แต่ก่อนเคยมีพรานมาล่าสัตว์แล้วเห็นหลังหมีหลุดๆ บริเวณแหล่งน้ำกลางหมู่บ้าน เลยเป็นที่มาของชื่อ <strong>"ผาหลังหมี"</strong> ต่อมา รองนายกฯ อัมพร จันทรวิจิตร ได้เดินทางมาเปิดโรงเรียน จึงแนะนำให้เปลี่ยนชื่อเป็น <strong>"ผารังหมี"</strong> เพราะคำว่า "รัง" มีความหมายดีกว่า และหมายถึงการรวมตัวกันของคนในหมู่บ้าน
        </p>
      </section>

      <!-- ══════════════ 13. Quote 3.10 ══════════════ -->
      <section v-reveal="{ y: 16 }" class="quote310-sec">
        <span class="q310-mark">“</span>
        <p class="q310-text">
          นับแต่นั้น “บ้านผารังหมี”<br />
          <span class="q310-green">จึงกลายเป็นชื่อที่ใช้สืบต่อมาจนถึงปัจจุบัน</span>
        </p>
      </section>

      <!-- ══════════════ 14. Placeholder (ใส่ vector) ══════════════ -->
      <div v-reveal="{ y: 20 }" class="ph-wrap">
        <div class="ph-box ph-tall">
          <img class="fill-img" :src="Img2" alt="" />
        </div>
      </div>

      <!-- ══════════════ 15. Placeholder ภาพ 2 คอลัมน์ (ใส่ภาพ) ══════════════ -->
      <div class="ph2col-wrap">
        <div v-reveal="{ y: 18 }" class="ph-box">
          <img class="fill-img" :src="Img3" alt="" />
        </div>
        <div v-reveal="{ y: 18, delay: 80 }" class="ph-box">
          <img class="fill-img" :src="Img4" alt="" />
        </div>
      </div>

      <!-- ══════════════ 16. Speech bubble 3.13 ══════════════ -->
      <div v-reveal="{ y: 18 }" class="bubble-wrap">
        <div class="bubble">
          <span class="bubble-green">ชุมชนที่เติบโต</span>
          <span class="bubble-brown">จากความร่วมมือ</span>
        </div>
      </div>

      <!-- ══════════════ 17. เรื่องราว 3.14 ══════════════ -->
      <section class="story-sec alt">
        <p v-reveal="{ y: 16 }" class="story-p">
          บ้านผารังหมีเป็นชุมชนที่มีการพัฒนาตนเองมาอย่างต่อเนื่อง มีการจัดการพื้นที่อยู่อาศัยเป็นกลุ่มหรือ <strong>"คุ้ม"</strong> โดยมีหัวหน้าคุ้มคอยดูแลความเป็นอยู่ของคนในพื้นที่ และบ้านเรือนส่วนใหญ่ตั้งอยู่รวมกันเป็นกลุ่ม มีถนนสายหลัก และการจัดทำรั้วกินได้ เพื่อแบ่งแนวเขตพื้นที่ครัวเรือน
        </p>
        <p v-reveal="{ y: 16, delay: 80 }" class="story-p">
          นอกจากนี้ คนในชุมชนยังให้ความสำคัญกับการศึกษา ศาสนา และการรวมกลุ่มเพื่อทำกิจกรรมต่างๆ โดยเปิดโอกาสให้คนในหมู่บ้านได้ร่วมแสดงความคิดเห็น และร่วมมือกันทำสิ่งที่เป็นประโยชน์ต่อส่วนรวมอยู่เสมอ
        </p>
      </section>

      <!-- ══════════════ 18. Closing card 3.15 ══════════════ -->
      <section v-reveal="{ y: 18 }" class="closing-card-sec">
        <div class="closing-card">
          <p class="closing-text">
            “ จากการรวมตัวของผู้คนจากหลากหลายพื้นที่
            <strong>บ้านผารังหมีจึงค่อย ๆ เติบโตขึ้นเป็นชุมชนที่มีเอกลักษณ์ของตนเอง</strong>
            โดยมีทั้ง เรื่องราว ภูมิปัญญา วิถีชีวิตและความร่วมมือของคนในชุมชน
            เป็นสิ่งที่หล่อหลอมบ้านผารังหมีมาจนถึงวันนี้ ”
          </p>
        </div>
      </section>

    </main>

    <TheFooter />
    <ScrollTop />
  </div>
</template>

<style scoped>
.hist-shell {
  min-height: 100dvh;
  background: #fff;
}
.hist-main {
  overflow: hidden;
}

/* รูปจริงเต็มกล่อง (พอดีช่อง ไม่ยืด) */
.fill-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ─── Hero ─────────────────────────── */
.hero-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 393 / 386;
  overflow: hidden;
  background: #cfe0d0;
}
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* ไล่เฉดเข้มบางๆ เฉพาะช่วงล่างให้อ่าน caption ออก (ภาพหลักยังสว่าง) */
.hero-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 45%,
    rgba(12,45,15,0.28) 78%,
    rgba(8,38,10,0.52) 100%
  );
}
.back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  color: #2d7a2d;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
}
.hero-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0,0,0,0.45);
}
.hc-label {
  font-size: 12px;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.3px;
}
.hc-main {
  font-size: clamp(28px, 8.5vw, 34px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: 0.5px;
  font-family: 'IBM Plex Sans Thai', var(--font);
}

/* ─── หัวข้อ + แคปชั่น ─────────────── */
.intro-sec {
  background: #fff;
  padding: 50px 24px 50px;
}
.intro-title {
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 800;
  color: #308b30;
  line-height: 1.25;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.intro-sub {
  margin: 0;
  font-size: 16px;
  color: #414042;
  line-height: 1.6;
}

/* ─── Timeline ─────────────────────── */
.timeline-sec {
  position: relative;
  background: #308b30;
}
.tl-roof-wrap {
  position: relative;
  line-height: 0;
}
.tl-roof {
  display: block;
  width: 100%;
  height: auto;
}
/* หมีเกาะสันหลังคา — ตำแหน่ง/ขนาดเป็น % ตาม Figma (เทียบความกว้างหลังคา) */
.tl-bear-peek {
  position: absolute;
  top: -22.4%;
  right: 3.6%;
  width: 23.8%;
  height: auto;
  z-index: 3;
  pointer-events: none;
}
.tl-inner {
  position: relative;
  z-index: 1;
  padding: 8px 24px 0;
}
.tl-year-label {
  margin: 0 0 10px 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.tl-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tl-item {
  display: grid;
  grid-template-columns: 66px 1fr;
  gap: 14px;
  align-items: stretch;
}
/* rail */
.tl-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* badge = หมุดปักหมุดสีทอง (pill ปลายแหลมล่าง) ตาม Figma */
.tl-badge {
  position: relative;
  z-index: 2;
  min-width: 46px;
  padding: 10px 13px;
  border-radius: 999px;
  background: linear-gradient(180deg, #fbc33f 0%, #f5a623 100%);
  color: #fff;
  display: grid;
  place-items: center;
  text-align: center;
  flex-shrink: 0;
  box-shadow: 0 5px 10px rgba(245, 166, 35, 0.35);
  font-family: 'IBM Plex Sans Thai', var(--font);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.1;
}
.tl-badge::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 9px solid #f5a623;
}
.badge-text { white-space: pre-line; }
.tl-line {
  width: 4px;
  flex: 1;
  min-height: 24px;
  margin-top: 3px;
  background: #7cc24a;
  border-radius: 2px;
}
/* การ์ด */
.tl-card {
  background: #fff;
  border-radius: 22px;
  padding: 18px 18px 20px;
  margin-bottom: 26px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
.tl-item.is-last .tl-card { margin-bottom: 0; }
.tl-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.tl-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #e8f0e2;
  display: grid;
  place-items: center;
}
.tl-icon img { width: 18px; height: 18px; }
.tl-title {
  color: #308b30;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.tl-body {
  margin: 0;
  color: #414042;
  font-size: 14px;
  line-height: 22px;
}
.tl-b {
  color: #6e3d17;
  font-weight: 700;
}
.tl-bottom {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 40px;
}

/* sub-heading ท้าย timeline (พื้นขาว) */
.tl-subheading {
  margin: -2px 0 0;
  padding: 6px 24px 4px;
  background: #fff;
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: #308b30;
  line-height: 1.35;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.tl-sh-brown { color: #6e391d; }

/* ─── Quote 1 ──────────────────────── */
.quote-sec {
  background: #fff;
  padding: 30px 28px 26px;
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
.q-text {
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 500;
  color: #308b30;
  line-height: 1.5;
}

/* ─── Story ────────────────────────── */
.story-sec {
  background: #fff;
  padding: 6px 24px 14px;
}
.story-sec.alt {
  background: #f4fbef;
  padding: 22px 24px 26px;
}
.story-p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 28px;
  color: #414042;
  letter-spacing: 0.16px;
  text-align: center;
  text-indent: 2em;          /* ย่อหน้าแรกตาม Figma */
}
.story-p strong { color: #6e3d17; font-weight: 700; }
.story-p:last-child { margin-bottom: 0; }

/* ─── แผนที่ 3.2 ───────────────────── */
.map-wrap {
  background: #fff;
  padding: 14px 20px 18px;
  display: flex;
  justify-content: center;
}
.map-img {
  width: 100%;
  max-width: 337px;
  height: auto;
  display: block;
}

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
.ph-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
}
.ph-box.ph-tall { height: 220px; }
.ph-icon { width: 28px; height: 28px; opacity: 0.9; }
.ph-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b5e54;
}

/* ─── แคปชั่น 3.7 ──────────────────── */
.caption37-sec {
  background: #fff;
  padding: 30px 24px 10px;
  text-align: center;
}
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
.caption37-title {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.35;
  color: #308b30;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.c37-brown { color: #6e391d; }

/* ─── Scene ────────────────────────── */
.scene-wrap {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background: #fff;
}
.scene-img { width: 100%; height: auto; display: block; }

/* ─── Quote 3.10 ───────────────────── */
.quote310-sec {
  background: #fff;
  padding: 26px 28px 22px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.q310-mark {
  display: block;
  font-size: 40px;
  line-height: 1;
  color: #6e3d17;
  font-weight: 500;
}
.q310-text {
  margin: 10px 0 0;
  font-size: 18px;
  color: #6e3d17;
  line-height: 1.5;
  font-weight: 500;
}
.q310-green { color: #308b30; }

/* ─── Speech bubble 3.13 ───────────── */
.bubble-wrap {
  background: #fff;
  padding: 24px 24px 6px;
  display: flex;
  justify-content: center;
}
.bubble {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: #e4f3df;
  border-radius: 22px;
  padding: 18px 34px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
  font-size: 26px;
  font-weight: 600;
  line-height: 1.25;
}
.bubble::after {
  content: '';
  position: absolute;
  left: 40px;
  bottom: -14px;
  border-width: 16px 16px 0 0;
  border-style: solid;
  border-color: #e4f3df transparent transparent transparent;
}
.bubble-green { color: #308b30; }
.bubble-brown { color: #6e391d; }

/* ─── Closing card 3.15 ────────────── */
.closing-card-sec {
  background: #f4fbef;
  padding: 14px 24px 40px;
}
.closing-card {
  background: #fff;
  border-radius: 16px;
  padding: 22px 20px;
  box-shadow: 0 4px 16px rgba(15,77,30,0.08);
}
.closing-text {
  margin: 0;
  font-size: 15px;
  line-height: 25px;
  color: #414042;
  text-align: center;
  letter-spacing: 0.48px;
}
.closing-text strong {
  font-weight: 700;
  color: #6e3d17;
}
</style>
