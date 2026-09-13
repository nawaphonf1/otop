<script setup>
import illustImg from '../../assets/home/mascot-illus.png'
</script>

<template>
  <section class="mascot-sec">

    <!-- ═══ Illustration (ภาพจาก Figma node 4.9) ═══ -->
    <div v-reveal="{ y: 20 }" class="illus-wrap">
      <img class="illus-img" :src="illustImg" alt="ผลิตภัณฑ์ OTOP บ้านผารังหมี" />
    </div>

    <!-- ═══ Quote (4.10 แคปชั่น) ═══ -->
    <div v-reveal="{ y: 16, delay: 80 }" class="quote-sec">
      <span class="q-mark">“</span>
      <p class="q-text">
        <span class="q-green">เบื้องหลังผลิตภัณฑ์</span><br />
        คือ ผู้คนในชุมชน
      </p>
    </div>

  </section>
</template>

<style scoped>
.mascot-sec {
  background: #fff;
  overflow: hidden;
}

/* ═══ Illustration ═══ */
.illus-wrap {
  width: 100%;
  line-height: 0;
}
.illus-img {
  display: block;
  width: 100%;
  height: auto;
}

/* ═══ Quote ═══ */
.quote-sec {
  padding: 28px 24px 36px;
  text-align: center;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.q-mark {
  display: block;
  font-size: 40px;
  line-height: 1;
  font-weight: 500;
  color: #6e3d17;
}
.q-text {
  margin: 10px auto 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  color: #6e3d17;
}
.q-green {
  color: #308b30;
}
</style>
