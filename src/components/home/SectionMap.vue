<script setup>
import map from '../../assets/home/plate-map.png'
</script>

<template>
  <section id="producers" class="map">
    <!-- แผนที่กลุ่มผู้ผลิต + ทีมงานผู้อยู่เบื้องหลังผลิตภัณฑ์ -->
    <img
      v-reveal="{ y: 44 }"
      class="scene"
      :src="map"
      alt="แผนที่กลุ่มผู้ผลิตในชุมชนบ้านผารังหมี หมู่ที่ 3 ตำบลไทรย้อย อำเภอเนินมะปราง จังหวัดพิษณุโลก"
    />
  </section>
</template>

<style scoped>
.map {
  background: var(--cream);
  line-height: 0;
}
</style>
