<script setup>
import { useRouter, RouterLink } from 'vue-router'
import phakhlumImg from '../../assets/home/product-phakhlum.jpg'
import samudImg from '../../assets/home/product-samud.jpg'

const router = useRouter()

const products = [
  {
    id: 'p16', // ผ้าคลุมไหล่ (ตรงกับ products ใน data)
    name: 'ผ้าคลุมไหล่',
    price: '110฿',
    image: phakhlumImg,
    desc: 'คลุมไหล่หรือพันคอ ได้ในผืนเดียว 70 × 180 ซม.',
    group: 'กลุ่มทอผ้า',
  },
  {
    id: 'p07', // สมุดปกเสื่อกก (ตรงกับ products ใน data)
    name: 'สมุดปกเสื่อกก',
    price: '139฿',
    image: samudImg,
    desc: 'ปกเสื่อกกจากวัสดุธรรมชาติ ขนาด A5 พกง่าย จดได้ทุกเรื่อง',
    group: 'กลุ่มทอเสื่อ',
  },
]

function goToProduct(id) {
  router.push(`/products/${id}`)
}
</script>

<template>
  <section class="allprod-sec">
    <!-- Heading row -->
    <div v-reveal class="heading-row">
      <h2 class="sec-title">สินค้า OTOP อื่นๆ</h2>
      <RouterLink to="/products" class="sec-link">ไปหน้าสินค้า</RouterLink>
    </div>

    <!-- 2-column product grid -->
    <div class="prod-grid">
      <article
        v-for="(p, i) in products"
        :key="p.id"
        v-reveal="{ y: 24, delay: i * 80 }"
        class="prod-card"
      >
        <div class="card-img-wrap">
          <img :src="p.image" :alt="p.name" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="name-price">
            <span class="prod-name">{{ p.name }}</span>
            <span class="prod-price">{{ p.price }}</span>
          </div>
          <p class="prod-desc" v-html="p.desc"></p>
          <div class="card-footer">
            <span class="prod-group">
              <span class="star">★</span> {{ p.group }}
            </span>
            <button class="btn-view" @click="goToProduct(p.id)">ดูสินค้า</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.allprod-sec {
  background: #fff;
  padding: 0 14px 32px;
}

/* Heading row */
.heading-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 8px 2px 14px;
}

.sec-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #1a7f35;
}

.sec-link {
  font-size: 11px;
  font-weight: 600;
  color: #e07b20;
  border: 1.5px solid #e07b20;
  border-radius: 999px;
  padding: 3px 12px;
  text-decoration: none;
}

/* Grid */
.prod-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Card */
.prod-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
}

.card-img-wrap {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f5f4f0;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 9px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.name-price {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
}

.prod-name {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}

.prod-price {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  white-space: nowrap;
}

.prod-desc {
  margin: 0;
  font-size: 10.5px;
  color: #666;
  line-height: 1.45;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 4px;
}

.prod-group {
  font-size: 10px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 3px;
}

.star {
  color: #e8a020;
  font-size: 11px;
}

.btn-view {
  background: #34a142;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}

.btn-view:hover {
  background: #28843a;
}
</style>
