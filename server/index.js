// เซิร์ฟเวอร์เล็ก ๆ สำหรับหน้า /admin เวลาพัฒนา/แก้ไขข้อมูล "ในเครื่อง"
// อ่าน/เขียน public/data/products.json ลง disk ตรง ๆ (คนละกลไกกับตอน deploy จริงบน Vercel
// ซึ่งใช้ api/*.js คอมมิตผ่าน GitHub API แทน เพราะ serverless function เขียนไฟล์ถาวรไม่ได้)
// รัน: node server/index.js (หรือ npm run server / npm run dev:admin)
//
// ใช้คนละ endpoint contract เดียวกับ api/*.js (เพื่อให้โค้ดฝั่ง admin เรียกเหมือนกันทั้งสองที่)
// ตั้งรหัสแอดมินได้ด้วย env ADMIN_KEY (ไม่ตั้งจะ default เป็น "local-dev" เพราะรันแค่ในเครื่อง)
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dataFile = path.join(root, 'public/data/products.json')
const uploadDir = path.join(root, 'public/products/uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const ADMIN_KEY = process.env.ADMIN_KEY || 'local-dev'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

function checkAdminKey(req, res) {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    res.status(401).json({ error: 'รหัสแอดมินไม่ถูกต้อง' })
    return false
  }
  return true
}

function readData() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'))
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8')
}
function nextId(products) {
  const nums = products
    .map((p) => Number(String(p.id).replace(/[^\d]/g, '')))
    .filter((n) => !Number.isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `p${String(max + 1).padStart(2, '0')}`
}

// ── สินค้า ──
app.get('/api/products', (req, res) => {
  res.json(readData())
})

app.post('/api/products', (req, res) => {
  if (!checkAdminKey(req, res)) return
  const data = readData()
  const id = nextId(data.products)
  const product = { gallery: [], specs: [], ...req.body, id }
  data.products.push(product)
  writeData(data)
  res.status(201).json(product)
})

app.put('/api/products/:id', (req, res) => {
  if (!checkAdminKey(req, res)) return
  const data = readData()
  const idx = data.products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'ไม่พบสินค้านี้' })
  data.products[idx] = { ...data.products[idx], ...req.body, id: req.params.id }
  writeData(data)
  res.json(data.products[idx])
})

app.delete('/api/products/:id', (req, res) => {
  if (!checkAdminKey(req, res)) return
  const data = readData()
  const idx = data.products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'ไม่พบสินค้านี้' })
  data.products.splice(idx, 1)
  writeData(data)
  res.status(204).end()
})

// ── อัปโหลดรูป (รับ base64 ใน JSON เหมือนกับ api/upload.js ตอน deploy จริง) ──
app.post('/api/upload', (req, res) => {
  if (!checkAdminKey(req, res)) return
  const { filename, dataBase64 } = req.body || {}
  if (!filename || !dataBase64) return res.status(400).json({ error: 'ต้องส่ง filename และ dataBase64' })
  const ext = (filename.match(/\.[a-zA-Z0-9]+$/)?.[0] || '.jpg').toLowerCase()
  const safeName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`
  fs.writeFileSync(path.join(uploadDir, safeName), Buffer.from(dataBase64, 'base64'))
  res.json({ url: `/products/uploads/${safeName}` })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`[admin-api] ทำงานที่ http://localhost:${PORT} (รหัสแอดมิน: ${ADMIN_KEY})`)
})
