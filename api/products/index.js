import { readProductsJson, writeProductsJson, checkAdminKey } from '../_github.js'

function nextId(products) {
  const nums = products
    .map((p) => Number(String(p.id).replace(/[^\d]/g, '')))
    .filter((n) => !Number.isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `p${String(max + 1).padStart(2, '0')}`
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data } = await readProductsJson()
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      checkAdminKey(req)
      const { sha, data } = await readProductsJson()
      const id = nextId(data.products)
      const product = { gallery: [], specs: [], ...req.body, id }
      data.products.push(product)
      await writeProductsJson(data, sha, `เพิ่มสินค้า ${product.name} (${id})`)
      return res.status(201).json(product)
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message })
  }
}
