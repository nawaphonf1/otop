<script setup>
import { RouterLink } from 'vue-router'
import logo from '../../assets/common/logo-bear.svg'
import bgImg from '../../assets/common/footer-bg-full.png'

/* overlap: ดึง footer ขึ้นไปซ้อนทับ section ก่อนหน้า (ใช้เฉพาะหน้าผู้ผลิต) */
defineProps({
  overlap: { type: Boolean, default: false },
})

const menu = [
  { label: 'หน้าแรก',        to: '/#hero' },
  { label: 'เกี่ยวกับชุมชน', to: '/history' },
  { label: 'ผลิตภัณฑ์ OTOP', to: '/#products' },
  { label: 'ผู้ผลิต',        to: '/#producers' },
  { label: 'ติดต่อเรา',      to: '/#contact' },
]
</script>

<template>
  <footer id="contact" class="footer" :class="{ 'footer--overlap': overlap }">

    <!-- BG image (arch + bear + ต้นไม้) — absolute ใต้ทุกอย่าง -->
    <img class="footer-bg" :src="bgImg" alt="" aria-hidden="true" />

    <!-- ═══ content ═══ -->
    <div class="footer-inner">

      <!-- 3 คอลัมน์ -->
      <div class="cols">

        <!-- คอลัมน์ซ้าย: คำอธิบาย + โลโก้ล่าง -->
        <div v-reveal="{ y: 16 }" class="col brand-col">
          <p class="brand-text">
            ร่วมค้นพบเรื่องราวของชุมชน บ้านผารังหมีผ่านผลิตภัณฑ์ OTOP
            ที่ถ่ายทอดภูมิปัญญา วิถีชีวิตและอัตลักษณ์ท้องถิ่น
            เพื่อส่งต่อคุณค่าและสร้างรายได้อย่างยั่งยืนให้แก่คนในชุมชน
          </p>
          <img class="logo" :src="logo" alt="โลโก้บ้านผารังหมี" />
        </div>

        <!-- คอลัมน์กลาง: เมนู -->
        <nav v-reveal="{ y: 16, delay: 80 }" class="col menu-col">
          <h4 class="col-h">เมนูเว็บไซต์</h4>
          <RouterLink v-for="m in menu" :key="m.to" :to="m.to" class="menu-lnk">
            {{ m.label }}
          </RouterLink>
        </nav>

        <!-- คอลัมน์ขวา: ติดต่อเรา -->
        <div v-reveal="{ y: 16, delay: 160 }" class="col contact-col">
          <h4 class="col-h">ติดต่อเรา</h4>
          <address>
            บ้านผารังหมี<br />
            ตำบลไทรย้อย<br />
            อำเภอเนินมะปราง<br />
            จังหวัดพิษณุโลก<br />
            65000
          </address>
          <a class="tel" href="tel:0892962869">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/>
            </svg>
            089-296-2869
          </a>
        </div>

      </div>

      <!-- copyright bar -->
      <div v-reveal class="bar">
        <p>© 2026 บ้านผารังหมี จังหวัดพิษณุโลก</p>
        <p class="fine">สงวนลิขสิทธิ์ · เว็บไซต์นี้จัดทำขึ้นเพื่อประชาสัมพันธ์สินค้า OTOP ชุมชนบ้านผารังหมี</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* ═══════════════════════════════════
   Shell
═══════════════════════════════════ */
.footer {
  position: relative;
  /* ไม่มี background-color — ส่วน transparent ของ BG image
     จะโปร่งใส แสดง body background (ขาว) ผ่านมาได้ */
  overflow: hidden;
  color: #e6f5e6;
}

/* ── overlap variant: ใช้เฉพาะหน้าผู้ผลิต (<TheFooter :overlap="true" />) ──
   ดึง footer ขึ้นมาซ้อนทับส่วนล่างของ support-sec — มุมโปร่งใสของ arch
   จะเผยพื้นเขียวของ support-sec แทนพื้นขาว ทำให้ต่อเนื่องไร้รอยต่อ */
.footer--overlap {
  margin-top: -100px;
  z-index: 2;
}
.footer--overlap .cols {
  padding-top: 40px;
}

/* ═══════════════════════════════════
   BG Image (arch + ต้นไม้ + หมี)
═══════════════════════════════════ */
.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  z-index: 0;
  pointer-events: none;
  /* ยืดให้เต็มความสูง footer ไม่ว่า content จะสูงแค่ไหน */
}

/* ═══════════════════════════════════
   Content Layer (ซ้อนบน BG)
═══════════════════════════════════ */
.footer-inner {
  position: relative;
  z-index: 1;
  /* padding-top: ดันเนื้อหาลงมาอยู่บนพื้นที่เขียว (ใต้ arch) */
  padding: 50px 16px 18px;
}

/* ═══════════════════════════════════
   3 Columns
═══════════════════════════════════ */
.cols {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr;
  gap: 14px;
  align-items: start;
}

/* ─── คอลัมน์ซ้าย ─── */
.brand-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.brand-text {
  margin: 0;
  font-size: 10.5px;
  line-height: 1.65;
  color: rgba(255,255,255,0.88);
}
.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: brightness(0) invert(1) opacity(0.8);
}

/* ─── headings ─── */
.col-h {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.3px;
}

/* ─── เมนู ─── */
.menu-col {
  display: flex;
  flex-direction: column;
}
.menu-lnk {
  display: block;
  font-size: 11px;
  padding: 4px 0;
  color: rgba(255,255,255,0.82);
  text-decoration: none;
  transition: color 0.15s;
}
.menu-lnk:hover { color: #ffd800; }

/* ─── ติดต่อ ─── */
address {
  font-style: normal;
  font-size: 11px;
  line-height: 1.7;
  color: rgba(255,255,255,0.82);
  margin: 0 0 8px;
}
.tel {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  transition: color 0.15s;
}
.tel:hover { color: #ffd800; }

/* ═══════════════════════════════════
   Copyright bar
═══════════════════════════════════ */
.bar {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.2);
  text-align: center;
}
.bar p {
  margin: 2px 0;
  font-size: 10.5px;
  color: rgba(255,255,255,0.75);
}
.bar .fine {
  font-size: 9.5px;
  color: rgba(255,255,255,0.5);
}
</style>
