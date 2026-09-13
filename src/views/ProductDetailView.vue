<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productById, categoryLabel } from '../data/products'

const route = useRoute()
const router = useRouter()
const product = computed(() => productById(route.params.id))
const gallery = computed(() => product.value?.gallery?.length ? product.value.gallery : [product.value?.img])
</script>

<template>
  <div v-if="product" class="pd-shell">
    <!-- top bar -->
    <header class="pd-bar">
      <button class="pd-back" @click="router.back()" aria-label="กลับ">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <span class="pd-bartitle">รายละเอียดสินค้า</span>
    </header>

    <main class="pd-main">
      <!-- gallery -->
      <div class="pd-gallery">
        <div class="pd-thumbs">
          <button v-for="(g, i) in gallery" :key="i" class="pd-thumb"><img :src="g" :alt="product.name" /></button>
        </div>
        <div class="pd-main-img"><img :src="gallery[0]" :alt="product.name" /></div>
      </div>

      <!-- info -->
      <p class="pd-cat">สินค้า{{ categoryLabel(product.cat) }}</p>
      <div class="pd-head">
        <h1 class="pd-name">{{ product.name }}</h1>
        <span class="pd-price">{{ product.price }}฿</span>
      </div>
      <p class="pd-shortdesc">{{ product.desc }}</p>

      <!-- คำอธิบาย -->
      <section class="pd-sec">
        <h2 class="pd-sec-title">คำอธิบาย</h2>
        <p class="pd-sec-body">{{ product.longDesc || product.desc }}</p>
      </section>

      <!-- รายละเอียด -->
      <section v-if="product.specs?.length" class="pd-sec">
        <h2 class="pd-sec-title">รายละเอียด</h2>
        <ul class="pd-specs">
          <li v-for="(s, i) in product.specs" :key="i">
            <strong>{{ s.label }}:</strong> {{ s.value }}
          </li>
        </ul>
      </section>

      <!-- quote -->
      <div v-if="product.quote" class="pd-quote">
        <p>“{{ product.quote }}”</p>
      </div>

      <!-- ช่องทางการสั่งซื้อ -->
      <footer class="pd-order">
        <p class="pd-order-title">ช่องทางการสั่งซื้อ</p>
        <p>Facebook: บ้านผารังหมี</p>
        <p>โทร: 089-296-2869 (ผู้ใหญ่บ้าน)</p>
      </footer>
    </main>
  </div>

  <div v-else class="pd-empty">
    <p>ไม่พบสินค้านี้</p>
    <router-link to="/products" class="pd-emptylink">กลับไปหน้าสินค้า</router-link>
  </div>
</template>

<style scoped>
.pd-shell { min-height: 100dvh; background: #fff; }

/* top bar */
.pd-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
}
.pd-back {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  color: #2b2b2b;
}
.pd-bartitle {
  flex: 1;
  text-align: center;
  margin-right: 34px;
  font-size: 16px;
  font-weight: 700;
  color: #2b2b2b;
  font-family: 'IBM Plex Sans Thai', var(--font);
}

.pd-main { padding: 14px 20px 30px; }

/* gallery */
.pd-gallery {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.pd-thumbs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 56px;
  flex-shrink: 0;
}
.pd-thumb {
  width: 56px;
  height: 56px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  background: #f6f6f6;
}
.pd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pd-main-img {
  flex: 1;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  background: #f2f2f2;
}
.pd-main-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* info */
.pd-cat {
  margin: 16px 0 4px;
  font-size: 12px;
  color: #308b30;
}
.pd-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.pd-name {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #4c2702;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.pd-price {
  flex-shrink: 0;
  font-size: 22px;
  font-weight: 800;
  color: #603913;
}
.pd-shortdesc {
  margin: 4px 0 0;
  font-size: 13px;
  color: #7a7a7a;
}

/* sections */
.pd-sec { margin-top: 22px; }
.pd-sec-title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: #308b30;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.pd-sec-body {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: #414042;
}
.pd-specs {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.9;
  color: #414042;
}
.pd-specs strong { color: #4c2702; font-weight: 700; }

/* quote */
.pd-quote {
  margin-top: 24px;
  background: #eef6e7;
  border-radius: 14px;
  padding: 18px 20px;
  text-align: center;
}
.pd-quote p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #308b30;
  font-style: italic;
}

/* order */
.pd-order {
  margin-top: 26px;
  text-align: center;
  color: #7a7a7a;
  font-size: 12px;
  line-height: 1.7;
}
.pd-order-title { color: #308b30; font-weight: 700; margin: 0 0 4px; }
.pd-order p { margin: 0; }

/* empty */
.pd-empty {
  min-height: 60vh;
  display: grid;
  place-content: center;
  gap: 12px;
  text-align: center;
  color: #555;
}
.pd-emptylink { color: #308b30; font-weight: 600; }
</style>
