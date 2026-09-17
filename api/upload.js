import { putFile, checkAdminKey } from './_github.js'

// หมายเหตุ: Vercel Functions จำกัดขนาด request รวมไว้ที่ ~4.5MB (ของ plan ฟรี)
// รูปที่ encode เป็น base64 แล้วต้องเล็กกว่านี้ — ถ้ารูปใหญ่เกินให้บีบอัดก่อนอัปโหลด
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    checkAdminKey(req)
    const { filename, dataBase64 } = req.body || {}
    if (!filename || !dataBase64) {
      return res.status(400).json({ error: 'ต้องส่ง filename และ dataBase64' })
    }
    const ext = (filename.match(/\.[a-zA-Z0-9]+$/)?.[0] || '.jpg').toLowerCase()
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`
    const buffer = Buffer.from(dataBase64, 'base64')
    await putFile(`public/products/uploads/${safeName}`, buffer, `อัปโหลดรูป ${safeName}`)
    return res.status(200).json({ url: `/products/uploads/${safeName}` })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message })
  }
}
