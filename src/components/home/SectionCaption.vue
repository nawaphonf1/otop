<script setup>
/* คำโปรยก่อนเข้าส่วน "วิถีชุมชน" — สไตล์เดียวกับ community block ของ Hero */
</script>

<template>
  <section class="caption-block">
    <div v-reveal="{ y: 20 }" class="community">
      <span class="q">“</span>
      <p class="ctext">
        <span class="c-brown">ชุมชนที่รวบรวมภูมิปัญญาท้องถิ่น</span><br />
        <span class="c-green">งานหัตถกรรม ผลิตภัณฑ์แปรรูป</span><br />
        <span class="c-brown">ที่สะท้อนอัตลักษณ์ของคนในพื้นที่</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.caption-block {
  background: #fff;
}
.community {
  text-align: center;
  background: #fff;
  padding: 30px 22px 44px;
  font-family: 'IBM Plex Sans Thai', var(--font);
}
.community .q {
  display: block;
  font-size: 40px;
  line-height: 1;
  color: #6e3d17;
  font-weight: 500;
}
.community .ctext {
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
}
.community .c-brown { color: #6e3d17; }
.community .c-green { color: #308b30; }
</style>
