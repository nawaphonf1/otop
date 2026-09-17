import { readProductsJson, writeProductsJson, checkAdminKey } from '../_github.js'

export default async function handler(req, res) {
  try {
    checkAdminKey(req)
    const { id } = req.query
    const { sha, data } = await readProductsJson()
    const idx = data.products.findIndex((p) => p.id === id)
    if (idx === -1) return res.status(404).json({ error: 'ไม่พบสินค้านี้' })

    if (req.method === 'PUT') {
      data.products[idx] = { ...data.products[idx], ...req.body, id }
      await writeProductsJson(data, sha, `แก้ไขสินค้า ${id}`)
      return res.status(200).json(data.products[idx])
    }

    if (req.method === 'DELETE') {
      const [removed] = data.products.splice(idx, 1)
      await writeProductsJson(data, sha, `ลบสินค้า ${removed.name} (${id})`)
      return res.status(204).end()
    }

    res.setHeader('Allow', 'PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message })
  }
}
