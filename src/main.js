import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { loadProducts } from './data/products.js'
import './style.css'

const app = createApp(App)

/* ---------- v-reveal: scroll-reveal สองทาง (เข้า=animate in, ออก=animate out) ---------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      e.target.classList.toggle('reveal--in', e.isIntersecting)
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
)

app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    const { y = 30, x = 0, scale = 1, delay = 0 } = binding.value || {}
    el.style.setProperty('--rv-y', `${y}px`)
    el.style.setProperty('--rv-x', `${x}px`)
    el.style.setProperty('--rv-scale', scale)
    el.style.setProperty('--rv-delay', `${delay}ms`)
    io.observe(el)
  },
  unmounted(el) {
    io.unobserve(el)
  },
})

app.use(router)
loadProducts().finally(() => app.mount('#app'))
