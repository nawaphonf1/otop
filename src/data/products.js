// ═══════════════════════════════════════════════════════════
//  ข้อมูลสินค้า OTOP บ้านผารังหมี (ดึงจากดีไซน์ Figma หน้า "สินค้าหลัก")
//  - categories : 5 หมวด (มีหน้าหมวดของตัวเอง /products/category/:slug)
//  - products   : 27 รายการ (หน้าสินค้าใช้ component กลาง /products/:id)
// ═══════════════════════════════════════════════════════════

const modules = import.meta.glob('../assets/products/*.png', { eager: true, import: 'default' })
const asset = (name) => modules[`../assets/products/${name}.png`]

// รูปสินค้าจริง — แปลงเป็น .jpg ไว้ที่ gallery/pXX-N.jpg (N = ลำดับรูป)
const galleryModules = import.meta.glob('../assets/products/gallery/*.jpg', { eager: true, import: 'default' })
const galleries = {}
for (const path in galleryModules) {
  const m = path.match(/\/(p\d+)-(\d+)\.jpg$/)
  if (!m) continue
  ;(galleries[m[1]] ||= []).push([Number(m[2]), galleryModules[path]])
}
for (const id in galleries) {
  galleries[id] = galleries[id].sort((a, b) => a[0] - b[0]).map((x) => x[1])
}
const galleryOf = (id) => galleries[id] || []

// ไอคอนหมวดหมู่ — SVG export ตรงจาก Figma (nodes 32:59xx)
import iconPhakhaoma from '../assets/products/cat-phakhaoma.svg'
import iconMat from '../assets/products/cat-mat.svg'
import iconFabric from '../assets/products/cat-fabric.svg'
import iconMango from '../assets/products/cat-mango.svg'
import iconRice from '../assets/products/cat-rice.svg'

export const heroCollage = asset('hero-collage')

export const categories = [
  { slug: 'phakhaoma', label: 'กลุ่มผ้าขาวม้าแปลงร่าง', icon: iconPhakhaoma },
  { slug: 'mat',       label: 'กลุ่มทอเสื่อ',           icon: iconMat },
  { slug: 'fabric',    label: 'กลุ่มทอผ้า',             icon: iconFabric },
  { slug: 'mango',     label: 'กลุ่มแปรรูปมะม่วง',       icon: iconMango },
  { slug: 'rice',      label: 'กลุ่มเกษตรสมบูรณ์',       icon: iconRice },
]

export const categoryLabel = (slug) => categories.find((c) => c.slug === slug)?.label || ''

// รายการสินค้า — grid data ครบทุกชิ้น + detail (คำอธิบาย/รายละเอียด/quote) ที่ดึงได้
export const products = [
  {
    id: 'p01', name: 'ถุงหิ้วผ้าขาวม้า', price: 30, cat: 'phakhaoma',
    desc: 'ถุงหิ้วลายทอพื้นถิ่น ใช้ง่ายในทุกวัน', img: asset('p01'),
    longDesc: 'ถุงผ้าน้ำหนักเบา ทะทัดชิว และพกพาสะดวก มาพร้อมหูจับที่ช่วยให้ถือได้ง่าย เหมาะสำหรับใส่ของใช้ส่วนตัว หนังสือ หรือสิ่งของออนใจกัน ใช้ได้ทั้งในวิถีประจำวัน และการออกไปทำกิจกรรมต่าง ๆ',
    specs: [
      { label: 'วัสดุ', value: 'ผ้าขาวม้าทอพื้นถิ่น' },
      { label: 'ขนาด', value: '8 × 12 นิ้ว' },
      { label: 'ราคา', value: '30 บาท' },
    ],
    quote: 'ผ้าขาวม้าทอพื้นถิ่น โดดเด่นด้วยลวดลายตารางและสีสัน สะท้อนภูมิปัญญาการทอผ้าของชุมชน',
  },
  { id: 'p02', name: 'พวงกุญแจผ้าทอ', price: 49, cat: 'phakhaoma', desc: 'ห้อยได้ทุกวัน พกความน่ารักไปทุกที่', img: asset('p02') },
  { id: 'p03', name: 'กางเกงผ้าขาวม้า', price: 250, cat: 'phakhaoma', desc: 'สวมใส่สบาย แมตช์กับเสื้อได้หลายสไตล์', img: asset('p03') },
  { id: 'p04', name: 'ยางมัดผม', price: 10, cat: 'phakhaoma', desc: 'ลวดลายและสีสันไม่ซ้ำใคร', img: asset('p04') },
  { id: 'p05', name: 'พวงกุญแจผลมะปราง', price: 79, cat: 'phakhaoma', desc: 'ผลไม้ท้องถิ่นในรูปแบบงานถัก น่ารัก พกติดกระเป๋าได้', img: asset('p05') },
  { id: 'p06', name: 'กระเป๋าย่าม', price: 150, cat: 'phakhaoma', desc: 'ลายตารางคลาสสิก จับคู่ได้หลายลุค ใส่ของได้จุใจ', img: asset('p06') },

  { id: 'p07', name: 'สมุดปกเสื่อกก', price: 100, cat: 'mat', desc: 'ปกเสื่อกกจากวัสดุธรรมชาติ ขนาด A5 พกง่าย จดได้ทุกที่', img: asset('p07') },
  { id: 'p08', name: 'เสื่อกก', price: 139, cat: 'mat', desc: 'ทอจากกกราชินี ชิดแน่น ไม่หลุดง่าย', img: asset('p08') },
  { id: 'p09', name: 'เสื่อพับอเนกประสงค์', price: 139, cat: 'mat', desc: 'พับเก็บง่าย พกพาสะดวก ทอด้วยกกราชินี', img: asset('p09') },
  { id: 'p10', name: 'พัดสาน', price: 25, cat: 'mat', desc: 'งานสานฝีมือประณีต น้ำหนักเบา ใช้คลายร้อนได้ทุกที่', img: asset('p10') },
  { id: 'p11', name: 'ไม้กวาดทางมะพร้าว', price: 84, cat: 'mat', desc: 'ถักแน่น ทรงกลม ด้ามแข็งแรง ทนทาน ใช้งานได้ดี', img: asset('p11') },
  { id: 'p12', name: 'ไม้ตาลคลายเส้น', price: 179, cat: 'mat', desc: 'ไม้ตาลขัดเรียบ ด้ามยาว ใช้ยืดเหยียดได้สะดวก', img: asset('p12') },
  { id: 'p13', name: 'ไม้กวาดดอกหญ้า', price: 65, cat: 'mat', desc: 'ด้ามแข็งแรง จับถนัดมือ ทนทาน ใช้งานได้ดี', img: asset('p13') },

  { id: 'p14', name: 'ผ้าขาวม้า', price: 120, cat: 'fabric', desc: 'ฝีมือการทอจากรุ่นสู่รุ่น เนื้อผ้านิ่ม ไม่บาดผิว', img: asset('p14') },
  { id: 'p15', name: 'ผ้าซิ่นลายช่อมะปราง', price: 750, cat: 'fabric', desc: 'ผ้าทอไหมประดิษฐ์ ลายทอเอกลักษณ์ชุมชน', img: asset('p15') },
  { id: 'p16', name: 'ผ้าคลุมไหล่', price: 110, cat: 'fabric', desc: 'คลุมไหล่หรือพันคอ ได้ในผืนเดียว 70 × 180 ซม.', img: asset('p16') },
  { id: 'p17', name: 'กระเป๋าลายผ้าทอ', price: 586, cat: 'fabric', desc: 'ผสานลายทอพื้นถิ่น กับดีไซน์ร่วมสมัย', img: asset('p17') },

  { id: 'p18', name: 'น้ำมะม่วงเข้มข้น', price: 50, cat: 'mango', desc: 'มะม่วงคุณภาพดี จากบ้านคลองซับรัง', img: asset('p18') },
  { id: 'p19', name: 'มะม่วงกวน', price: 100, cat: 'mango', desc: 'รสอร่อยรสอมเปรี้ยว เคี้ยวไม่ติดฟัน', img: asset('p19') },
  { id: 'p20', name: 'หมี่กรอบซอสมะม่วง', price: 40, cat: 'mango', desc: 'ซอสมะม่วงรสเข้มข้น รสชาติหวานอมเปรี้ยว', img: asset('p20') },
  { id: 'p21', name: 'ข้าวเกรียบมะม่วง', price: 40, cat: 'mango', desc: 'เนื้อสัมผัสกรอบเบา หอมกลิ่นมะม่วง', img: asset('p21') },
  { id: 'p22', name: 'ข้าวเกรียบค้างคาว', price: 35, cat: 'mango', desc: 'รูปทรงค้างคาว กรอบอร่อย มี 3 รสชาติให้เลือก', img: asset('p22') },
  { id: 'p23', name: 'ขนุนทอดกรอบ', price: 79, cat: 'mango', desc: 'ขนุนสุกคุณภาพดี แปรรูปด้วยการทอด', img: asset('p23') },

  { id: 'p24', name: 'คุ้กกี้รวมข้าว', price: 69, cat: 'rice', desc: 'รวมความหลากหลาย ของข้าวท้องถิ่นไว้ในชิ้นเดียว', img: asset('p24') },
  { id: 'p25', name: 'ข้าวกล้องหอมมะลิแท้', price: 15, cat: 'rice', desc: 'ข้าวขาวปลอดสาร ตราสุดใจ ปริมาณสุทธิ 200 กรัม', img: asset('p25') },
  { id: 'p26', name: 'ข้าวกล้องหอมมะลิแท้', price: 70, cat: 'rice', desc: 'ข้าวขาวปลอดสาร ตราสุดใจ ปริมาณสุทธิ 1 กิโลกรัม', img: asset('p26') },
  { id: 'p27', name: 'ข้าวไรซ์เบอร์รี่', price: 70, cat: 'rice', desc: 'ข้าวดำปลอดสาร ตราสุดใจ ปริมาณสุทธิ 1 กิโลกรัม', img: asset('p27') },
]

// ใส่รูปจริง: img = รูปแรกของสินค้า, gallery = รูปทั้งหมด (ถ้าไม่มีรูปจริงจะใช้ asset เดิม)
for (const p of products) {
  const g = galleryOf(p.id)
  if (g.length) {
    p.img = g[0]
    p.gallery = g
  }
}

export const productById = (id) => products.find((p) => p.id === id)
export const productsByCat = (slug) => products.filter((p) => p.cat === slug)
