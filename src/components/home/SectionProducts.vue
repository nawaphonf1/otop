<script setup>
import fabric from '../../assets/home/p15-1.jpg'
import mat from '../../assets/home/p10-1.jpg'
// ไอคอนหมวดหมู่ — export เป็น SVG ตรงจาก Figma (nodes 32:59xx)
import iconPhakhaoma from '../../assets/products/cat-phakhaoma.svg'
import iconMat from '../../assets/products/cat-mat.svg'
import iconFabric from '../../assets/products/cat-fabric.svg'
import iconMango from '../../assets/products/cat-mango.svg'
import iconRice from '../../assets/products/cat-rice.svg'

// slug ตรงกับ categories ใน data/products.js → กดแล้วไปหน้าหมวดหมู่ /products/category/:slug
const categories = [
  { line1: 'กลุ่มผ้าขาวม้า', line2: 'แปลงร่าง', icon: iconPhakhaoma, slug: 'phakhaoma' },
  { line1: 'กลุ่มทอเสื่อ',   line2: '',        icon: iconMat,       slug: 'mat' },
  { line1: 'กลุ่มทอผ้า',     line2: '',        icon: iconFabric,    slug: 'fabric' },
  { line1: 'กลุ่มแปรรูป',    line2: 'มะม่วง',   icon: iconMango,     slug: 'mango' },
  { line1: 'กลุ่มเกษตร',     line2: 'สมบูรณ์',  icon: iconRice,      slug: 'rice' },
]

const products = [
  {
    id: 1,
    name: 'พัดสาน',
    price: 25,
    tag: 'หัตถกรรม',
    stars: 5,
    image: mat,
    desc: 'งานสานฝีมือประณีต น้ำหนักเบา ใช้คลายร้อนได้ทุกที่',
  },
  {
    id: 2,
    name: 'ผ้าซิ่นลายช่อนปราง',
    price: 750,
    tag: 'สิ่งทอ',
    stars: 5,
    image: fabric,
    desc: 'ผ้าทอไหมประดิษฐ์ ลายทอเอกลักษณ์ชุมชน',
  },
]
</script>

<template>
  <section id="products" class="products">

    <!-- ═══ Quote ═══ -->
    <div v-reveal="{ y: 20 }" class="quote-top">
      <span class="qt-mark">“</span>
      <p class="qt-text">
        สืบสานภูมิปัญญา<br />
        พัฒนาสู่สินค้าภัณฑ์ OTOP
      </p>
    </div>

    <!-- ═══ Banner ═══ -->
    <div v-reveal class="banner">
      <h2 class="banner-title">สินค้า OTOP ชุมชน</h2>
      <p class="banner-desc">
        ค้นพบผลิตภัณฑ์จากชุมชน OTOP ที่ถ่ายทอด<br />
        ภูมิปัญญาของชุมชนบ้านผารังหมี ผ่านสินค้าแต่ละชิ้น<br />
        ที่ทำขึ้นด้วยใจของชุมชน
      </p>
    </div>

    <!-- ═══ Category icons ═══ -->
    <div v-reveal="{ y: 16, delay: 80 }" class="cats">
      <RouterLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/products/category/${cat.slug}`"
        class="cat-item"
      >
        <img class="cat-icon" :src="cat.icon" :alt="`${cat.line1} ${cat.line2}`" />
        <span class="cat-label">
          {{ cat.line1 }}<template v-if="cat.line2"><br />{{ cat.line2 }}</template>
        </span>
      </RouterLink>
    </div>

    <!-- ═══ Section label ═══ -->
    <div v-reveal="{ y: 12, delay: 100 }" class="sec-label">
      <span class="sec-name">สินค้ายอดนิยม</span>
      <span class="sec-stars">★★★★★</span>
    </div>

    <!-- ═══ Product cards ═══ -->
    <div class="card-list">
      <article
        v-for="(p, i) in products"
        :key="p.id"
        v-reveal="{ y: 28, delay: i * 100 }"
        class="card"
      >
        <div class="card-img">
          <img :src="p.image" :alt="p.name" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-row">
            <h3 class="card-name">{{ p.name }}</h3>
            <span class="card-price">{{ p.price }}฿</span>
          </div>
          <p class="card-desc">{{ p.desc }}</p>
          <div class="card-foot">
            <span class="card-tag">{{ p.tag }}</span>
            <span class="card-stars">
              <span v-for="n in 5" :key="n" :class="['star', { fill: n <= p.stars }]">★</span>
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- ═══ CTA ═══ -->
    <div v-reveal="{ y: 16, delay: 120 }" class="cta-wrap">
      <RouterLink to="/products" class="cta-btn">ดูสินค้าทั้งหมด</RouterLink>
    </div>

  </section>
</template>

<style scoped>
.products {
  background: #fff;
  padding-bottom: 32px;
}

/* ─── Quote ─── */
.quote-top {
  padding: 36px 20px 32px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.qt-mark {
  display: block;
  font-size: 40px;
  line-height: 1;
  font-weight: 500;
  color: #6e3d17;
}
.qt-text {
  margin: 10px auto 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: #6e3d17;
}

/* ─── Banner ─── */
.banner {
  background: #34a142;
  padding: 20px 20px 22px;
  text-align: center;
  color: #fff;
}
.banner-title {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.banner-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.9);
}

/* ─── Categories ─── */
.cats {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 18px 8px 16px;
  background: #fff;
  gap: 2px;
}
.cat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  text-decoration: none;
  transition: transform 0.18s ease;
}
.cat-item:hover {
  transform: translateY(-3px);
}
.cat-icon {
  height: 46px;
  width: auto;
  object-fit: contain;
  /* SVG จาก Figma มีเงาในตัวเองแล้ว */
}
.cat-label {
  font-size: 11px;
  color: #80433b; /* สีน้ำตาลตาม Figma */
  text-align: center;
  line-height: 1.35;
  font-weight: 500;
}

/* ─── Section label ─── */
.sec-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 16px 8px;
}
.sec-name {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
}
.sec-stars {
  font-size: 13px;
  color: #f5a623;
  letter-spacing: 1px;
}

/* ─── Cards ─── */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px;
}
.card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.card-img {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f4f2ef;
  padding: 30px;
}
.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card-body {
  padding: 12px 14px 14px;
}
.card-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;
}
.card-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}
.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #34a142;
  white-space: nowrap;
}
.card-desc {
  margin: 0 0 10px;
  font-size: 13px;
  color: #555;
  line-height: 1.55;
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-tag {
  background: #34a142;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}
.card-stars .star {
  color: #ddd;
  font-size: 14px;
}
.card-stars .star.fill {
  color: #f5a623;
}

/* ─── CTA ─── */
.cta-wrap {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}
.cta-btn {
  border: none;
  background: #34a142;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 36px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(52, 161, 66, 0.35);
  transition: background 0.15s, transform 0.15s;
}
.cta-btn:hover {
  background: #2d8f39;
  transform: translateY(-1px);
}
</style>
