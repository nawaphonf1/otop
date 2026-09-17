<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheNav from '../components/layout/TheNav.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import ScrollTop from '../components/layout/ScrollTop.vue'
import ProductCard from '../components/product/ProductCard.vue'
import { state, productsByCat, categoryLabel } from '../data/products'

const route = useRoute()
const slug = computed(() => route.params.slug || '')
const list = computed(() => (slug.value ? productsByCat(slug.value) : state.products))
</script>

<template>
  <div class="prod-shell">
    <TheNav />

    <main class="prod-main">

      <!-- ══════ หน้าหลัก: หัวข้อ + hero + หมวดหมู่ ══════ -->
      <template v-if="!slug">
        <section class="prod-head">
          <h1 class="ph-title">
            <span class="ph-t1">จากภูมิปัญญา</span><br />
            <span class="ph-t2">...สู่ผลิตภัณฑ์ที่จับต้องได้</span>
          </h1>
          <p class="ph-sub">“ผลิตภัณฑ์...สะท้อนอัตลักษณ์”</p>
        </section>

        <div class="hero-wrap">
          <img class="hero-img" :src="state.heroCollage" alt="ผลิตภัณฑ์ OTOP บ้านผารังหมี" />
        </div>

        <nav class="cat-cards">
          <router-link
            v-for="c in state.categories"
            :key="c.slug"
            :to="`/products/category/${c.slug}`"
            class="cat-card"
          >
            <div class="cat-icon"><img :src="c.icon" :alt="c.label" /></div>
            <span class="cat-label">{{ c.label }}</span>
          </router-link>
        </nav>
      </template>

      <!-- ══════ หัวข้อ grid ══════ -->
      <section class="grid-head">
        <router-link v-if="slug" to="/products" class="grid-back" aria-label="กลับ">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </router-link>
        <div>
          <h2 class="grid-title">สินค้าทั้งหมด</h2>
          <p v-if="slug" class="grid-sub">{{ categoryLabel(slug) }}</p>
        </div>
      </section>

      <!-- ══════ grid สินค้า ══════ -->
      <div class="pgrid">
        <ProductCard v-for="p in list" :key="p.id" :product="p" />
      </div>

      <!-- ══════ CTA กลุ่มผู้ผลิต (เฉพาะหน้าหลัก) ══════ -->
      <section v-if="!slug" class="producer-cta">
        <h2 class="pc-title">กลุ่มผู้ผลิต</h2>
        <p class="pc-body">
          ก่อนจะเป็นสินค้าหนึ่งชิ้น ล้วนมีเรื่องราวอยู่เบื้องหลัง จากภูมิปัญญา วิถีคุ้ม และวิถีชีวิตของชุมชนบ้านผารังหมี ถูกถ่ายทอดผ่านมือของคนในชุมชน จนกลายเป็นสินค้าที่คุณกำลังจะได้ครอบครอง และคงอยู่จนถึงวันนี้
        </p>
        <h3 class="pc-sub"><span class="pc-green">ชุมชนที่เติบโต</span> <span class="pc-brown">จากความร่วมมือ</span></h3>
        <p class="pc-body">รวมพลังคนในชุมชน สืบสานภูมิปัญญา และเสริมสร้างที่มา OTOP จากบ้านผารังหมี</p>
        <h3 class="pc-sub"><span class="pc-green">ทุกชิ้นงาน</span> <span class="pc-brown">มีคนอยู่เบื้องหลัง</span></h3>
        <p class="pc-body">รู้จักกลุ่มผู้ผลิตบ้านผารังหมี ผู้ริเริ่มสืบสานภูมิปัญญา และเสริมสร้างที่มาของสินค้าจากวิถีชีวิตของชุมชน</p>
        <RouterLink class="pc-btn" to="/producers">ดูกลุ่มผู้ผลิต</RouterLink>
      </section>

    </main>

    <TheFooter />
    <ScrollTop />
  </div>
</template>

<style scoped>
.prod-shell { min-height: 100dvh; background: #fff; }
.prod-main { overflow: hidden; }

/* ── หัวข้อหน้าหลัก ── */
.prod-head {
  text-align: center;
  padding: 24px 24px 6px;
}
.ph-title {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.25;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.ph-t1 { color: #2b7a4b; }
.ph-t2 { color: #308b30; }
.ph-sub {
  margin: 8px 0 0;
  font-size: 15px;
  font-weight: 600;
  color: #6e3d17;
}

/* ── hero collage ── */
.hero-wrap { padding: 12px 24px 6px; }
.hero-img { width: 100%; height: auto; display: block; }

/* ── การ์ดหมวดหมู่ ── */
.cat-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 16px 24px 8px;
}
.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 101px;
  color: inherit;
}
.cat-icon {
  width: 101px;
  height: 101px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(15,77,30,0.12);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.cat-icon img { width: 62px; height: 62px; object-fit: contain; }
.cat-label {
  font-size: 12px;
  font-weight: 600;
  color: #414042;
  text-align: center;
  line-height: 1.25;
}

/* ── หัวข้อ grid ── */
.grid-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 22px 24px 4px;
}
.grid-back {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f0f4ee;
  color: #308b30;
  flex-shrink: 0;
}
.grid-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #308b30;
  font-family: 'LINE Seed Sans TH', 'IBM Plex Sans Thai', var(--font);
}
.grid-sub {
  margin: 2px 0 0;
  font-size: 15px;
  color: #414042;
}

/* ── grid สินค้า ── */
.pgrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 11px;
  padding: 16px 20px 24px;
}

/* จอแคบมาก: ให้ col ซ้ายย่อขนาดตามลงไปด้วย (เดิม col ขวาเล็กกว่า col ซ้ายเพราะ minmax(auto,1fr) ยึด min-content ของการ์ด) */
@media (max-width: 310px) {
  .pgrid {
    gap: 16px 8px;
    padding: 16px 12px 24px;
  }
}

/* จอเล็กกว่า 250px: เหลือ 1 คอลัมน์ */
@media (max-width: 250px) {
  .pgrid {
    grid-template-columns: 1fr;
  }
}

/* ── CTA กลุ่มผู้ผลิต ── */
.producer-cta {
  background: #f4fbef;
  padding: 28px 24px 36px;
  text-align: center;
}
.pc-title {
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 800;
  color: #308b30;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.pc-body {
  margin: 0 auto 18px;
  max-width: 320px;
  font-size: 14px;
  line-height: 1.7;
  color: #414042;
}
.pc-sub {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.pc-green { color: #308b30; }
.pc-brown { color: #6e391d; }
.pc-btn {
  display: inline-block;
  margin-top: 6px;
  background: #308b30;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(48,139,48,0.3);
}
</style>
