// ═══════════════════════════════════════════════════════════
//  ข้อมูลสินค้า OTOP บ้านผารังหมี
//  โหลดจาก public/data/products.json ตอนรันไทม์ (ไม่ใช่ import แบบ build-time แล้ว)
//  เพื่อให้หน้า /admin แก้ไข/เพิ่ม/ลบสินค้าได้จริงผ่าน server (ดู server/index.js)
// ═══════════════════════════════════════════════════════════
import { reactive } from 'vue'

export const state = reactive({
  categories: [],
  products: [],
  heroCollage: '',
  loaded: false,
})

let loadingPromise = null

export function loadProducts() {
  if (loadingPromise) return loadingPromise
  loadingPromise = fetch('/data/products.json')
    .then((res) => res.json())
    .then((data) => {
      state.categories = data.categories
      state.products = data.products
      state.heroCollage = data.heroCollage
      state.loaded = true
    })
  return loadingPromise
}

export const categoryLabel = (slug) => state.categories.find((c) => c.slug === slug)?.label || ''
export const productById = (id) => state.products.find((p) => p.id === id)
export const productsByCat = (slug) => state.products.filter((p) => p.cat === slug)
