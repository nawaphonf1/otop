import { checkAdminKey } from './_github.js'

// endpoint เปล่า ๆ ไว้ให้หน้า /admin/products เช็คว่ารหัสที่กรอกถูกไหม ก่อนจะปลดล็อกเนื้อหา
export default function handler(req, res) {
  try {
    checkAdminKey(req)
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message })
  }
}
