import { readProductsJson, writeProductsJson, checkAdminKey } from '../_github.js'

// หมายเหตุ: ใช้ query string ?id=xxx แทน dynamic route /api/products/[id].js
// เพราะ Vercel deployment นี้ไม่ยอม detect ไฟล์ bracket-name เป็น function ให้ (เจอตอนทดสอบจริง)
// รวม endpoint ไว้ไฟล์เดียวแทน ตัดปัญหาการ route ให้หมดไป

function nextId(products) {
  const nums = products
    .map((p) => Number(String(p.id).replace(/[^\d]/g, '')))
    .filter((n) => !Number.isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `p${String(max + 1).padStart(2, '0')}`
}

export default async function handler(req, res) {
  try {
    const { id } = req.query

    if (req.method === 'GET') {
      const { data } = await readProductsJson()
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      checkAdminKey(req)
      const { sha, data } = await readProductsJson()
      const newId = nextId(data.products)
      const product = { gallery: [], specs: [], ...req.body, id: newId }
      data.products.push(product)
      await writeProductsJson(data, sha, `เพิ่มสินค้า ${product.name} (${newId})`)
      return res.status(201).json(product)
    }

    if (req.method === 'PUT') {
      checkAdminKey(req)
      if (!id) return res.status(400).json({ error: 'ต้องระบุ ?id=' })
      const { sha, data } = await readProductsJson()
      const idx = data.products.findIndex((p) => p.id === id)
      if (idx === -1) return res.status(404).json({ error: 'ไม่พบสินค้านี้' })
      data.products[idx] = { ...data.products[idx], ...req.body, id }
      await writeProductsJson(data, sha, `แก้ไขสินค้า ${id}`)
      return res.status(200).json(data.products[idx])
    }

    if (req.method === 'DELETE') {
      checkAdminKey(req)
      if (!id) return res.status(400).json({ error: 'ต้องระบุ ?id=' })
      const { sha, data } = await readProductsJson()
      const idx = data.products.findIndex((p) => p.id === id)
      if (idx === -1) return res.status(404).json({ error: 'ไม่พบสินค้านี้' })
      const [removed] = data.products.splice(idx, 1)
      await writeProductsJson(data, sha, `ลบสินค้า ${removed.name} (${id})`)
      return res.status(204).end()
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message })
  }
}
