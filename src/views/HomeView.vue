<script setup>
import TheNav from '../components/layout/TheNav.vue'
import SectionHero from '../components/home/SectionHero.vue'
import SectionHistory from '../components/home/SectionHistory.vue'
import SectionVillages from '../components/home/SectionVillages.vue'
import SectionCaption from '../components/home/SectionCaption.vue'
import SectionLifestyle from '../components/home/SectionLifestyle.vue'
import SectionVoice from '../components/home/SectionVoice.vue'
import SectionProducts from '../components/home/SectionProducts.vue'
import SectionProductMascot from '../components/home/SectionProductMascot.vue'
import SectionMap from '../components/home/SectionMap.vue'
import SectionAllProducts from '../components/home/SectionAllProducts.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import ScrollTop from '../components/layout/ScrollTop.vue'
</script>

<template>
  <div class="app-shell">
    <TheNav />
    <main>
      <SectionHero />
      <SectionHistory />
      <SectionVillages />
      <SectionCaption />
      <SectionLifestyle />
      <SectionProducts />
      <SectionProductMascot />
      <SectionMap />
      <SectionVoice />
      <SectionAllProducts />
    </main>
    <TheFooter />
    <ScrollTop />
  </div>
</template>
