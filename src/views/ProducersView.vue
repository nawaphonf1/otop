<script setup>
import { useRouter } from 'vue-router'
import TheNav from '../components/layout/TheNav.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import ScrollTop from '../components/layout/ScrollTop.vue'

import heroImg  from '../assets/common/history-hero.png'
import phImage  from '../assets/common/ph-image.svg'
import phVector from '../assets/common/ph-vector.svg'
import startIcon from '../assets/common/tl-trees.svg'

import g1 from '../assets/producers/g1.png'
import g2 from '../assets/producers/g2.png'
import g3 from '../assets/producers/g3.png'
import g4 from '../assets/producers/g4.png'
import g5 from '../assets/producers/g5.png'
import supportBg from '../assets/producers/support-bg.png'

const router = useRouter()

const groups = [
  {
    no: 1, name: 'กลุ่มทอผ้า', illus: g1,
    start: 'กลุ่มทอผ้าเริ่มดำเนินกิจกรรมใน พ.ศ. 2542 สืบสานภูมิปัญญาการทอผ้าของบ้านผารังหมี โดยใช้ด้ายไหมประดิษฐ์ และกี่กระตุก 4 ตัวในการผลิตผ้าขาวม้าและผ้าทอลายมัดหมี่ ที่สะท้อนเอกลักษณ์ของชุมชน',
    paras: [
      'การทอผ้าเกิดจากการสืบทอดภูมิปัญญาตามวิถีอีสาน โดยมีแนวคิดว่า ผู้หญิงควรเป็น “แม่ช่างที่ดี” จึงนำทักษะที่มีมาต่อยอดเป็นอาชีพเสริม ควบคู่กับการทอเสื่อ เพื่อสร้างรายได้และสืบสานงานฝีมือภายในชุมชน',
      'เอกลักษณ์ของกลุ่มอยู่ที่ผ้าไหมและลวดลายการทอที่หลากหลาย ทั้งลายเรขาคณิต เช่น ลายดาวกระจาย ลายตะข่าย ลายดอกแก้ว ลายเขี้ยวหมาตาย ลายหัวใจว่าง และลายเรณู รวมถึงลวดลายที่ได้รับแรงบันดาลใจจากธรรมชาติ เช่น ลายหมากจับ',
      'นอกจากลวดลายดั้งเดิม กลุ่มยังพัฒนาลวดลายใหม่ เช่น ลายมะปรางและลายดอกปีบ พร้อมต่อยอดเป็นผ้าฝ้ายทอย้อมสีธรรมชาติ และผ้าหมักโคลนที่สะท้อนการนำภูมิปัญญาเดิมมาสร้างสรรค์ให้เข้ากับยุคปัจจุบัน',
    ],
    quote: ['จากเส้นด้าย สู่ลวดลาย', 'จากภูมิปัญญา', 'สู่ผืนผ้าที่บอกเล่าเรื่องราวของบ้านผารังหมี'],
  },
  {
    no: 2, name: 'กลุ่มทอเสื่อกก', illus: g2,
    start: 'กลุ่มทอเสื่อกก เริ่มดำเนินกิจกรรมในปี พ.ศ. 2524 จากการรวมกลุ่มของคนในชุมชน ก่อนพัฒนาเป็นกลุ่มอย่างจริงจังใน พ.ศ. 2542 พร้อมส่งเสริมการปลูกต้นกกในพื้นที่ เพื่อให้มีวัตถุดิบสำหรับสานต่อภูมิปัญญาท้องถิ่น',
    paras: [
      'การทอเสื่อเป็นหนึ่งในภูมิปัญญาที่ชาวบ้านผารังหมีสืบทอดกันมารุ่นต่อรุ่น โดยได้รับอิทธิพลจากวิถีอีสาน และแนวคิดที่ว่าผู้หญิงควรเป็น “แม่ช่างที่ดี” จึงนำทักษะและวัตถุดิบจากธรรมชาติมาต่อยอดเป็นอาชีพเสริม ควบคู่กับการทอผ้า',
      'เสื่อกกบ้านผารังหมี เดิมนิยมทอไว้ใช้ในครัวเรือนและถวายวัด ด้วยคุณสมบัติของกกธรรมชาติที่มีความเหนียวและทนทาน ต่อมาจึงพัฒนาเป็นผลิตภัณฑ์สำหรับจำหน่าย ได้แก่ เสื่อพับจากก้านกกราชินี ไม้กวาดทางมะพร้าว เป็นต้น เพื่อสร้างรายได้เสริมในช่วงว่างจากงานหลัก พร้อมรักษางานฝีมือที่เป็นเอกลักษณ์ของชุมชนไว้',
    ],
    quote: ['จากต้นกกในท้องถิ่น', 'นำสู่ผืนเสื่อที่ถักทอ', 'จากการสืบทอดภูมิปัญญา'],
  },
  {
    no: 3, name: 'กลุ่มผ้าขาวม้าแปลงร่าง', illus: g3,
    start: 'กลุ่มแปรรูปด้านหัตถกรรม หรือที่เรียกกันว่า “กลุ่มผ้าขาวม้าแปลงร่าง” ก่อตั้งขึ้นใน พ.ศ. 2561 จากการรวมตัวของคนในชุมชนที่ต้องการนำผลิตภัณฑ์และภูมิปัญญาที่มีอยู่เดิมมาต่อยอดให้เกิดมูลค่าเพิ่ม',
    paras: [
      'จุดเริ่มต้นของกลุ่มมาจากสิ่งใกล้ตัวอย่าง เสื่อกก ผ้าทอ และผ้าขาวม้าซึ่งเป็นวัสดุที่มีอยู่แล้วในชุมชน แต่นำมาพัฒนาผ่านความคิดสร้างสรรค์และฝีมือให้เกิดความน่าสนใจ จึงเกิดการ “แปลงร่าง” จากผืนผ้าและงานหัตถกรรมแบบเดิมให้กลายเป็นของใช้ที่เข้ากับชีวิตประจำวันมากขึ้น',
      'จากวัสดุพื้นบ้านได้ถูกนำมาพัฒนาเป็น ยางมัดผม สมุดปกเสื่อกก กระเป๋าผ้า พวงกุญแจผ้าทอ ปกพาสปอร์ต และของที่ระลึกอีกหลากหลายรูปแบบ แต่ละชิ้นยังคงเสน่ห์ของลวดลาย สีสัน และงานฝีมือแบบท้องถิ่นไว้ พร้อมเพิ่มรูปแบบการใช้งานให้ร่วมสมัยมากขึ้น',
    ],
    quote: ['การแปลงร่างไม่ใช่เพียงการเปลี่ยนรูปแบบของผลิตภัณฑ์', 'แต่คือการต่อยอดภูมิปัญญาเดิม', 'ให้อยู่ร่วมกับวิถีชีวิตในปัจจุบัน'],
  },
  {
    no: 4, name: 'กลุ่มเกษตรสมบูรณ์ ข้าวหอมสุดใจ', illus: g4,
    start: 'กลุ่มข้าวหอมสุดใจ ได้เริ่มต้นดำเนินกิจกรรมเมื่อ ปี พ.ศ. 2540 จากการที่สมาชิกกลุ่มประสบปัญหาราคาผลผลิตตกต่ำ จนได้รับผลกระทบ จึงมีแนวคิดก่อตั้งกลุ่มกิจกรรมแปรรูป “ข้าวกล้องหอมมะลิ” ที่คงอยู่จนถึงปัจจุบัน',
    paras: [
      'โดยทำการผลิตข้าว ตั้งแต่เริ่มเพาะปลูก เก็บเกี่ยว แปรรูป และจำหน่าย โดยปรับเปลี่ยนพฤติกรรมด้วยการหลีกเลี่ยงการใช้สารเคมีกับผลผลิต หันมาใช้สารอินทรีย์ทดแทน ส่งผลให้ชาวนามีรายได้เพิ่มขึ้นอย่างเห็นได้ชัด จากการตัดรายจ่ายไม่จำเป็นจากการซื้อสารเคมี ที่สำคัญชาวนาบ้านผารังหมีมีสุขภาพที่ดีขึ้นไปด้วย',
      'ต่อมาชาวบ้านเริ่มปรับวิถีชีวิต มาใช้ชีวิตแบบพอเพียง มีความต้องการพัฒนาการผลิตข้าวให้ได้รับมาตรฐาน GAP เริ่มจากการศึกษาองค์ความรู้และขอคำแนะนำจากหน่วยงานของราชการ ได้แก่ กรมส่งเสริมการเกษตร และกรมการข้าว โดยผลิตภัณฑ์ที่พร้อมจำหน่าย ได้แก่ ข้าวกล้องหอมมะลิ 105 และข้าวขาวดอกมะลิ 105',
    ],
    quote: ['จากปัญหาราคาข้าวตกต่ำ', 'สู่การรวมพลังของเกษตรกร'],
  },
  {
    no: 5, name: 'กลุ่มแปรรูปมะม่วง', illus: g5,
    start: 'กลุ่มแม่บ้านเกษตรกรบ้านผารังหมี นำมะม่วงจากผลผลิตในท้องถิ่น มาต่อยอดและแปรรูปเป็นผลิตภัณฑ์หลากหลายรูปแบบ เพื่อเพิ่มทางเลือกในการบริโภคและช่วยสร้างมูลค่าให้กับผลผลิตของชุมชน',
    paras: [
      'มะม่วงสดจากสวน ถูกนำมาพัฒนาเป็นผลิตภัณฑ์ของชุมชนอย่างมะม่วงกวน และน้ำมะม่วงเข้มข้น ที่มีรสชาติหวานอมเปรี้ยว หอมกลิ่นมะม่วง',
      'ซึ่งการแปรรูปเป็นอีกหนึ่งวิธีในการเพิ่มมูลค่าให้ผลผลิตทางการเกษตร สร้างรายได้ และส่งต่อรสชาติจากบ้านผารังหมี ให้ผู้คนได้รู้จักผ่านผลิตภัณฑ์ของชุมชน',
    ],
    quote: null,
  },
]
</script>

<template>
  <div class="pr-shell">
    <TheNav />

    <main class="pr-main">

      <!-- ══════ Hero ══════ -->
      <section class="hero-wrap">
        <img class="hero-img" :src="heroImg" alt="บ้านผารังหมี" />
        <div class="hero-shade" aria-hidden="true"></div>
        <button class="back-btn" @click="router.back()" aria-label="กลับ">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="hero-caption">
          <span class="hc-main">คนทำ คนเล่า</span>
          <span class="hc-main">เรื่องราวบ้านผารังหมี</span>
          <span class="hc-main">ผู้คนเบื้องหลังผลิตภัณฑ์</span>
          <span class="hc-sub">ที่นำภูมิปัญญาและความตั้งใจมาสร้างสรรค์ผลิตภัณฑ์จากชุมชน</span>
        </div>
      </section>

      <!-- ══════ Intro ══════ -->
      <section class="intro-sec">
        <h1 v-reveal="{ y: 16 }" class="intro-title">กลุ่มผู้ผลิต</h1>
        <p v-reveal="{ y: 16, delay: 60 }" class="intro-body">
          บ้านผารังหมีมีการรวมกลุ่มของคนในชุมชนเพื่อสืบสานภูมิปัญญา และต่อยอดวัตถุดิบท้องถิ่นให้เกิดเป็นผลิตภัณฑ์ทั้งงานทอ งานจักสาน งานแปรรูปและผลผลิตทางการเกษตร
        </p>
        <p v-reveal="{ y: 16, delay: 100 }" class="intro-quote">
          “<strong class="iq-brown">รวมพลังคนในชุมชน</strong> สืบสานภูมิปัญญา<br />
          และ<strong class="iq-brown2">สร้างสรรค์สินค้า OTOP</strong> จากบ้านผารังหมี”
        </p>
        <p v-reveal="{ y: 16, delay: 140 }" class="intro-tag">
          ทำความรู้จักทั้ง 5 กลุ่มผู้ผลิต และเรื่องราวเบื้องหลังสินค้าจากชุมชน
        </p>
      </section>

      <!-- ══════ 5 กลุ่มผู้ผลิต ══════ -->
      <section
        v-for="g in groups"
        :key="g.no"
        class="grp"
      >
        <!-- badge + name -->
        <div v-reveal="{ y: 14 }" class="grp-head">
          <div class="grp-badge">{{ g.no }}</div>
          <h2 class="grp-name">{{ g.name }}</h2>
        </div>

        <!-- illustration -->
        <div v-reveal="{ y: 18 }" class="grp-illus">
          <img :src="g.illus" :alt="g.name" />
        </div>

        <!-- จุดเริ่มต้นของกลุ่ม card -->
        <div v-reveal="{ y: 16 }" class="start-card">
          <div class="start-head">
            <span class="start-icon"><img :src="startIcon" alt="" width="18" height="18" /></span>
            <strong class="start-title">จุดเริ่มต้นของกลุ่ม</strong>
          </div>
          <p class="start-body">{{ g.start }}</p>
        </div>

        <!-- ใส่ vector placeholder -->
        <div v-reveal="{ y: 18 }" class="ph-wrap">
          <div class="ph-box ph-tall">
            <img class="ph-icon" :src="phVector" alt="" width="28" height="28" />
            <span class="ph-label">ใส่ vector</span>
          </div>
        </div>

        <!-- paragraphs -->
        <div class="grp-body">
          <p v-for="(p, i) in g.paras" :key="i" v-reveal="{ y: 14 }" class="grp-p">{{ p }}</p>
        </div>

        <!-- ภาพ placeholders 2x2 -->
        <div class="ph2col-wrap">
          <div v-for="n in 4" :key="n" v-reveal="{ y: 16, delay: (n % 2) * 60 }" class="ph-box">
            <img class="ph-icon" :src="phImage" alt="" width="28" height="28" />
            <span class="ph-label">ใส่ภาพ</span>
          </div>
        </div>

        <!-- quote -->
        <div v-if="g.quote" v-reveal="{ y: 16 }" class="grp-quote">
          <span class="gq-mark">“</span>
          <p><span v-for="(l, i) in g.quote" :key="i">{{ l }}<br v-if="i < g.quote.length - 1" /></span></p>
        </div>

        <div class="grp-divider"></div>
      </section>

      <!-- ══════ Closing ══════ -->
      <section class="support-sec">
        <img class="support-bg" :src="supportBg" alt="" aria-hidden="true" />
        <div class="support-overlay" aria-hidden="true"></div>
        <div class="support-inner">
          <h2 class="support-title">สนับสนุนผลิตภัณฑ์ท้องถิ่น</h2>
          <p class="support-contact">
            <strong>Facebook</strong><br />
            บ้านผารังหมีน่าอยู่<br />
            หรือ<br />
            <strong>โทร 089-269-0301</strong><br />
            (ผู้ใหญ่บ้านบ้านผารังหมี)
          </p>
          <p class="support-note">
            เพื่อส่งเสริมผลิตภัณฑ์ท้องถิ่นและเสริมสร้างรายได้ให้กับคนในชุมชนบ้านผารังหมี
          </p>
        </div>
      </section>

    </main>

    <TheFooter />
    <ScrollTop />
  </div>
</template>

<style scoped>
.pr-shell { min-height: 100dvh; background: #fff; }
.pr-main { overflow: hidden; }

/* ─── Hero ─────────────────────────── */
.hero-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 393 / 386;
  overflow: hidden;
  background: #cfe0d0;
}
.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-shade {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(12,45,15,0.3) 75%, rgba(8,38,10,0.55) 100%);
}
.back-btn {
  position: absolute; top: 16px; left: 16px;
  display: grid; place-items: center; width: 34px; height: 34px;
  border: none; border-radius: 50%; background: rgba(255,255,255,0.9);
  color: #2d7a2d; box-shadow: 0 2px 6px rgba(0,0,0,0.18);
}
.hero-caption {
  position: absolute; left: 0; right: 0; bottom: 30px;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,0.45);
}
.hc-main {
  font-size: 22px; font-weight: 800; color: #fff; line-height: 1.25;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.hc-sub { margin-top: 8px; font-size: 12px; color: rgba(255,255,255,0.9); max-width: 280px; }

/* ─── Intro ────────────────────────── */
.intro-sec { padding: 28px 24px 8px; text-align: center; }
.intro-title {
  margin: 0 0 14px; font-size: 28px; font-weight: 800; color: #308b30;
  font-family: 'IBM Plex Sans Thai', var(--font); text-align: left;
}
.intro-body {
  margin: 0 0 20px; font-size: 15px; line-height: 1.85; color: #414042;
  text-align: left; text-indent: 24px;
}
.intro-quote {
  margin: 0 0 18px; font-size: 17px; line-height: 1.7; color: #414042; font-weight: 500;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.iq-brown { color: #6e391d; font-weight: 700; }
.iq-brown2 { color: #69411f; font-weight: 700; }
.intro-tag {
  margin: 0; font-size: 15px; line-height: 1.6; color: #414042; font-weight: 500;
}

/* ─── Group ────────────────────────── */
.grp { padding: 26px 24px 0; }
.grp-head {
  display: flex; align-items: center; gap: 14px; position: relative;
}
.grp-badge {
  width: 44px; height: 44px; border-radius: 50%; background: #ffc611;
  color: #fff; font-weight: 800; font-size: 18px;
  display: grid; place-items: center; flex-shrink: 0;
  box-shadow: 0 4px 4px rgba(0,0,0,0.2);
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.grp-name {
  margin: 0; font-size: 24px; font-weight: 800; color: #308b30; line-height: 1.2;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.grp-illus {
  margin: 6px 0 4px;
  display: flex; justify-content: center;
}
.grp-illus img { width: 100%; max-width: 360px; height: auto; display: block; }

/* จุดเริ่มต้นการ์ด */
.start-card {
  background: #fff; border-radius: 16px; padding: 16px 18px;
  box-shadow: 0 4px 16px rgba(15,77,30,0.1); margin-top: 6px;
}
.start-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.start-icon {
  width: 30px; height: 30px; border-radius: 50%; background: #e8f0e2;
  display: grid; place-items: center; flex-shrink: 0;
}
.start-title {
  color: #308b30; font-size: 16px; font-weight: 700;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.start-body { margin: 0; font-size: 14px; line-height: 1.75; color: #414042; text-indent: 20px; }

.grp-body { margin-top: 4px; }
.grp-p {
  margin: 0 0 16px; font-size: 15px; line-height: 1.85; color: #414042; text-indent: 24px;
}

/* placeholders */
.ph-wrap { padding: 16px 0; }
.ph2col-wrap {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 4px 0 16px;
}
.ph-box {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; height: 160px; background: #e8e3d9; border: 1px solid #d6cfc7; border-radius: 16px;
}
.ph-box.ph-tall { height: 220px; }
.ph-icon { opacity: 0.9; }
.ph-label { font-size: 12px; font-weight: 600; color: #6b5e54; }

/* quote */
.grp-quote {
  text-align: center; padding: 8px 10px 4px; font-family: 'IBM Plex Sans Thai', var(--font);
}
.gq-mark { display: block; font-size: 40px; line-height: 1; color: #6e3d17; font-weight: 500; }
.grp-quote p {
  margin: 10px 0 0; font-size: 18px; font-weight: 500; line-height: 1.5;
  color: #308b30;
}

.grp-divider {
  margin: 26px 0 0; border-top: 2px dashed #d7ddd0;
}

/* ─── Support / closing ────────────── */
.support-sec {
  position: relative;
  margin-top: 8px;
  padding: 44px 24px 50px;
  text-align: center;
  overflow: hidden;
}
/* ภาพทีมผู้ผลิตเป็นพื้นหลัง + overlay เขียว (ตาม Figma) */
.support-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.support-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(48, 139, 48, 0.86) 0%, rgba(38, 120, 52, 0.9) 100%);
}
.support-inner {
  position: relative;
  z-index: 1;
}
.support-title {
  margin: 0 0 18px; font-size: 24px; font-weight: 800; color: #fff;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.support-contact { margin: 0 0 18px; font-size: 15px; line-height: 1.7; color: #fff; }
.support-contact strong { font-weight: 700; }
.support-note {
  margin: 0 auto; max-width: 300px; font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.92);
}
</style>
