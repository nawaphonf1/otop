// Helper ใช้ร่วมกันสำหรับ Vercel Functions ใน /api — คอมมิตการแก้ไขสินค้า/รูปกลับเข้า GitHub repo โดยตรง
// (Vercel serverless function เขียนไฟล์ถาวรลง filesystem ไม่ได้ ต้องใช้วิธีนี้แทน)
//
// ต้องตั้งค่า Environment Variables ใน Vercel project settings:
//   GITHUB_TOKEN  = personal access token ที่มีสิทธิ์ contents:write กับ repo นี้
//   GITHUB_REPO   = "owner/repo" เช่น "nawaphon/otop-ban-pha-rang-mee"
//   GITHUB_BRANCH = ชื่อ branch ที่ deploy จริง เช่น "main" (ไม่ตั้งจะ default เป็น main)
//   ADMIN_KEY     = รหัสลับสำหรับปลดล็อกหน้า /admin (กันคนอื่นเข้ามาแก้ข้อมูลได้)

const BRANCH = process.env.GITHUB_BRANCH || 'main'

function assertEnv() {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    throw new Error('เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า GITHUB_TOKEN / GITHUB_REPO (ดู api/_github.js)')
  }
}

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export function checkAdminKey(req) {
  const key = req.headers['x-admin-key']
  if (!process.env.ADMIN_KEY) throw new Error('เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า ADMIN_KEY')
  if (key !== process.env.ADMIN_KEY) {
    const err = new Error('รหัสแอดมินไม่ถูกต้อง')
    err.statusCode = 401
    throw err
  }
}

export async function getFile(path) {
  assertEnv()
  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}?ref=${BRANCH}`
  const res = await fetch(url, { headers: ghHeaders() })
  if (!res.ok) throw new Error(`อ่านไฟล์ ${path} จาก GitHub ไม่สำเร็จ (${res.status})`)
  const json = await res.json()
  return { sha: json.sha, content: Buffer.from(json.content, 'base64') }
}

export async function putFile(path, contentBuffer, message, sha) {
  assertEnv()
  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...ghHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: contentBuffer.toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`เขียนไฟล์ ${path} ไป GitHub ไม่สำเร็จ (${res.status}): ${detail}`)
  }
  return res.json()
}

export async function readProductsJson() {
  const { sha, content } = await getFile('public/data/products.json')
  return { sha, data: JSON.parse(content.toString('utf8')) }
}

export async function writeProductsJson(data, sha, message) {
  const buf = Buffer.from(JSON.stringify(data, null, 2), 'utf8')
  return putFile('public/data/products.json', buf, message, sha)
}
