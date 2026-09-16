<script setup>
import { categoryLabel } from '../../data/products'
defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <router-link :to="`/products/${product.id}`" class="pcard">
    <div class="pcard-img">
      <img :src="product.img" :alt="product.name" loading="lazy" />
    </div>
    <div class="pcard-head">
      <span class="pcard-name">{{ product.name }}</span>
      <span class="pcard-price">{{ product.price }}฿</span>
    </div>
    <p class="pcard-desc" v-html="product.desc"></p>
    <div class="pcard-cat">
      <svg class="pcard-star" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z"/></svg>
      {{ categoryLabel(product.cat) }}
    </div>
  </router-link>
</template>

<style scoped>
.pcard {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
}
.pcard-img {
  width: 100%;
  aspect-ratio: 175 / 215;
  border-radius: 11px;
  overflow: hidden;
  background: #efefef;
}
.pcard-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.pcard-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
  margin-top: 10px;
}
.pcard-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'LINE Seed Sans TH', var(--font);
  font-weight: 700;
  font-size: 15px;
  color: #4c2702;
  line-height: 1.25;
  height: calc(1.25em * 2);
}
.pcard-price {
  flex-shrink: 0;
  font-weight: 700;
  font-size: 14px;
  color: #603913;
}
.pcard-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 6px 0 8px;
  font-size: 12px;
  line-height: 1.35;
  color: #7a7a7a;
  height: calc(1.35em * 2);
}
.pcard-cat {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  font-size: 11px;
  color: #308b30;
}
.pcard-star { color: #ffa439; flex-shrink: 0; }
</style>
