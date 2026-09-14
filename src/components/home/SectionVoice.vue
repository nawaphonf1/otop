<template>
  <section class="voice-sec">
    <div v-reveal="{ y: 16 }" class="voice-card">
      <p class="voice-text">
        <strong>ทุกผลิตภัณฑ์</strong>ไม่ได้เกิดขึ้นจากคนเพียงคนเดียว
        แต่เกิดจาก<strong>ความร่วมมือของคนในชุมชน</strong>ที่ช่วยกัน
        สืบสานภูมิปัญญา ถ่ายทอดและสร้างสรรค์ผลิตภัณฑ์
        ที่สะท้อนอัตลักษณ์ของบ้านผารังหมี
      </p>
      <div class="voice-footer">
        <router-link to="/history" class="read-more">
          <span class="rm-circle">→</span>
          <span class="rm-text">อ่านเพิ่มเติม</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.voice-sec {
  background: #fff;
  padding: 20px 24px 24px;
}

.voice-card {
  background: #f7f7f5;
  border-radius: 16px;
  padding: 20px 20px 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.voice-text {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.75;
  color: #414042;
  letter-spacing: 0.1px;
  text-align: center;
}

.voice-text strong {
  color: #6E391D;
  font-weight: 700;
}

.voice-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #e07b20;
  font-size: 13px;
  font-weight: 600;
}

.rm-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e07b20;
  color: #fff;
  font-size: 11px;
  line-height: 1;
}

.rm-text {
  color: #e07b20;
}
</style>
