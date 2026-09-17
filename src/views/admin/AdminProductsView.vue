<script setup>
import { reactive, ref, onMounted } from 'vue'
import { state as store, loadProducts } from '../../data/products'

// ─── รหัสแอดมิน — เข้าหน้านี้ต้องกรอกรหัสก่อนถึงจะเห็นเนื้อหา (กันคนอื่นที่เดา URL เจอ) ───
const adminKey = ref('')
const unlocked = ref(false)
const checking = ref(false)
const loginError = ref('')

function authHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-key': adminKey.value }
}

async function loadAdminData() {
  await loadProducts() // เผื่อ state ยังไม่เคยโหลด (เข้า /admin/products ตรง ๆ โดยไม่ผ่านหน้าอื่นก่อน)
  try {
    const res = await fetch('/api/products')
    if (res.ok) {
      const data = await res.json()
      store.categories = data.categories
      store.products = data.products
      store.heroCollage = data.heroCollage
    }
  } catch {
    // ใช้ข้อมูล static เดิมไปก่อนถ้า API ยังไม่พร้อม
  }
}

async function tryUnlock(key) {
  checking.value = true
  loginError.value = ''
  try {
    const res = await fetch('/api/admin-check', { headers: { 'x-admin-key': key } })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      throw new Error(json.error || 'รหัสไม่ถูกต้อง')
    }
    adminKey.value = key
    sessionStorage.setItem('adminKey', key)
    unlocked.value = true
    await loadAdminData()
  } catch (err) {
    sessionStorage.removeItem('adminKey')
    loginError.value = err.message
  } finally {
    checking.value = false
  }
}

function submitLogin() {
  tryUnlock(adminKey.value)
}

const justDeployed = ref(false) // true = เพิ่งบันทึกสำเร็จบน production ต้องรอ redeploy ถึงจะเห็นผลจริงบนเว็บ
const isLocalDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

onMounted(() => {
  const saved = sessionStorage.getItem('adminKey')
  if (saved) tryUnlock(saved) // เคยล็อกอินไว้แล้วในแท็บนี้ ลองใช้รหัสเดิมโดยไม่ต้องพิมพ์ซ้ำ
})

const emptyForm = () => ({
  id: '',
  name: '',
  price: 0,
  cat: store.categories[0]?.slug || '',
  desc: '',
  longDesc: '',
  quote: '',
  img: '',
  gallery: [],
  specs: [],
})

const editingId = ref(null) // null = ไม่ได้เปิดฟอร์ม, 'new' = เพิ่มใหม่, หรือ id ของสินค้าที่แก้
const form = reactive(emptyForm())
const saving = ref(false)
const uploadingMain = ref(false)
const uploadingGallery = ref(false)

function startAdd() {
  Object.assign(form, emptyForm())
  editingId.value = 'new'
}

function startEdit(p) {
  Object.assign(form, emptyForm(), JSON.parse(JSON.stringify(p)))
  editingId.value = p.id
}

function cancel() {
  editingId.value = null
}

function addSpec() {
  form.specs.push({ label: '', value: '' })
}
function removeSpec(i) {
  form.specs.splice(i, 1)
}
function removeGalleryImg(i) {
  form.gallery.splice(i, 1)
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function uploadFile(file) {
  const dataBase64 = await fileToBase64(file)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ filename: file.name, dataBase64 }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || 'อัปโหลดรูปไม่สำเร็จ')
  return json.url
}

async function onMainImgChange(e) {
  const file = e.target.files[0]
  if (!file) return
  uploadingMain.value = true
  try {
    form.img = await uploadFile(file)
  } catch (err) {
    alert(err.message)
  } finally {
    uploadingMain.value = false
    e.target.value = ''
  }
}

async function onGalleryChange(e) {
  const files = [...e.target.files]
  if (!files.length) return
  uploadingGallery.value = true
  try {
    for (const file of files) {
      form.gallery.push(await uploadFile(file))
    }
  } catch (err) {
    alert(err.message)
  } finally {
    uploadingGallery.value = false
    e.target.value = ''
  }
}

async function save() {
  saving.value = true
  try {
    const body = JSON.stringify({ ...form, price: Number(form.price) || 0 })
    if (editingId.value === 'new') {
      const res = await fetch('/api/products', { method: 'POST', headers: authHeaders(), body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'เพิ่มสินค้าไม่สำเร็จ')
      store.products.push(json)
    } else {
      const res = await fetch(`/api/products?id=${encodeURIComponent(editingId.value)}`, { method: 'PUT', headers: authHeaders(), body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'บันทึกไม่สำเร็จ')
      const idx = store.products.findIndex((p) => p.id === editingId.value)
      if (idx !== -1) store.products[idx] = json
    }
    editingId.value = null
    if (!isLocalDev) justDeployed.value = true
  } catch (err) {
    alert(err.message)
  } finally {
    saving.value = false
  }
}

async function removeProduct(p) {
  if (!confirm(`ลบสินค้า "${p.name}" ?`)) return
  const res = await fetch(`/api/products?id=${encodeURIComponent(p.id)}`, { method: 'DELETE', headers: authHeaders() })
  if (!res.ok && res.status !== 204) {
    const json = await res.json().catch(() => ({}))
    alert(json.error || 'ลบไม่สำเร็จ')
    return
  }
  const idx = store.products.findIndex((x) => x.id === p.id)
  if (idx !== -1) store.products.splice(idx, 1)
  if (!isLocalDev) justDeployed.value = true
}
</script>

<template>
  <!-- root เดียวคงที่ตลอด (ห้ามสลับ root element เป็น v-if/v-else ตรง ๆ) เพราะ App.vue ครอบ
       route ด้วย <Transition> อยู่ — ถ้า root ของ component เปลี่ยนตัวระหว่างล็อกอิน/ปลดล็อก
       transform ของ transition จะค้างอยู่บน element ใหม่ ทำให้ .overlay ที่เป็น position:fixed
       เพี้ยนไปยึดตำแหน่งตาม ancestor ที่ติด transform แทนที่จะยึดตาม viewport (modal เลยดูล้น) -->
  <div class="admin-root">
  <!-- ═══ หน้าล็อกอิน — เข้ามาต้องกรอกรหัสก่อนถึงจะเห็นเนื้อหา ═══ -->
  <div v-if="!unlocked" class="login-gate">
    <form class="login-box" @submit.prevent="submitLogin">
      <h1>เข้าสู่ระบบผู้ดูแล</h1>
      <input v-model="adminKey" type="password" placeholder="รหัสแอดมิน" autofocus />
      <button type="submit" class="btn primary" :disabled="checking">
        {{ checking ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ' }}
      </button>
      <p v-if="loginError" class="login-error">{{ loginError }}</p>
    </form>
  </div>

  <div v-else class="admin">
    <header class="admin-bar">
      <h1>จัดการสินค้า</h1>
      <button class="btn primary" @click="startAdd">+ เพิ่มสินค้าใหม่</button>
    </header>

    <p class="hint" v-if="isLocalDev">
      โหมดเครื่อง: ต้องรัน API server คู่กันด้วย (<code>npm run server</code> หรือรันทั้งคู่พร้อมกันด้วย
      <code>npm run dev:admin</code>) การแก้ไขจะเขียนลง <code>public/data/products.json</code> ทันที
    </p>
    <p class="hint" v-else>
      โหมด production: การบันทึกจะคอมมิตเข้า GitHub repo แล้วให้ Vercel deploy ใหม่อัตโนมัติ —
      <strong v-if="justDeployed">บันทึกแล้ว รอประมาณ 1 นาทีเพื่อให้เว็บ deploy เสร็จแล้วค่อยรีเฟรชดูผลจริง</strong>
      <span v-else>รายการด้านล่างนี้เป็นข้อมูลล่าสุดจาก GitHub แต่หน้าเว็บจริงของลูกค้าจะเห็นการเปลี่ยนแปลงหลัง deploy เสร็จ</span>
    </p>

    <table class="admin-table">
      <thead>
        <tr>
          <th></th>
          <th>ชื่อสินค้า</th>
          <th>ราคา</th>
          <th>หมวดหมู่</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.products" :key="p.id">
          <td><img class="thumb" :src="p.img" :alt="p.name" /></td>
          <td>{{ p.name }}</td>
          <td>{{ p.price }}฿</td>
          <td>{{ store.categories.find((c) => c.slug === p.cat)?.label || p.cat }}</td>
          <td class="actions">
            <button class="btn" @click="startEdit(p)">แก้ไข</button>
            <button class="btn danger" @click="removeProduct(p)">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ═══ ฟอร์มเพิ่ม/แก้ไข ═══ -->
    <div v-if="editingId" class="overlay" @click.self="cancel">
      <form class="panel" @submit.prevent="save">
        <h2>{{ editingId === 'new' ? 'เพิ่มสินค้าใหม่' : 'แก้ไขสินค้า' }}</h2>

        <label>ชื่อสินค้า
          <input v-model="form.name" required />
        </label>

        <label>ราคา (บาท)
          <input v-model="form.price" type="number" min="0" required />
        </label>

        <label>หมวดหมู่
          <select v-model="form.cat" required>
            <option v-for="c in store.categories" :key="c.slug" :value="c.slug">{{ c.label }}</option>
          </select>
        </label>

        <label>คำอธิบายสั้น (แสดงในการ์ด, ใช้ &lt;br&gt; ขึ้นบรรทัดใหม่ได้)
          <textarea v-model="form.desc" rows="2"></textarea>
        </label>

        <label>คำอธิบายเต็ม (แสดงในหน้ารายละเอียดสินค้า)
          <textarea v-model="form.longDesc" rows="3"></textarea>
        </label>

        <label>คำคม/quote ท้ายหน้า
          <textarea v-model="form.quote" rows="2"></textarea>
        </label>

        <fieldset>
          <legend>รายละเอียด (specs)</legend>
          <div v-for="(s, i) in form.specs" :key="i" class="spec-row">
            <input v-model="s.label" placeholder="หัวข้อ เช่น วัสดุ" />
            <input v-model="s.value" placeholder="ค่า เช่น ผ้าฝ้าย" />
            <button type="button" class="btn danger small" @click="removeSpec(i)">ลบ</button>
          </div>
          <button type="button" class="btn small" @click="addSpec">+ เพิ่มรายละเอียด</button>
        </fieldset>

        <label>รูปหลัก
          <input type="file" accept="image/*" @change="onMainImgChange" />
        </label>
        <p v-if="uploadingMain">กำลังอัปโหลด...</p>
        <img v-if="form.img" class="preview" :src="form.img" alt="" />

        <label>รูปแกลเลอรี (เลือกได้หลายไฟล์ เพิ่มได้เรื่อย ๆ)
          <input type="file" accept="image/*" multiple @change="onGalleryChange" />
        </label>
        <p v-if="uploadingGallery">กำลังอัปโหลด...</p>
        <div class="gallery-preview">
          <div v-for="(g, i) in form.gallery" :key="g" class="gallery-item">
            <img :src="g" alt="" />
            <button type="button" class="btn danger small" @click="removeGalleryImg(i)">ลบ</button>
          </div>
        </div>

        <div class="panel-actions">
          <button type="button" class="btn" @click="cancel">ยกเลิก</button>
          <button type="submit" class="btn primary" :disabled="saving">
            {{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<style scoped>
.login-gate {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #f4fbef;
  font-family: var(--font);
}
.login-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  background: #fff;
  padding: 28px 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.login-box h1 {
  margin: 0 0 6px;
  font-size: 17px;
  text-align: center;
  color: #308b30;
}
.login-box input {
  font: inherit;
  padding: 9px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.login-error {
  margin: 0;
  font-size: 12px;
  color: #d94b4b;
  text-align: center;
}

.admin {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 60px;
  font-family: var(--font);
  color: #2b2b2b;
}
.admin-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}
.admin-bar h1 { font-size: 20px; margin: 0; }
.hint {
  font-size: 12px;
  color: #888;
  background: #f7f7f2;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.hint code { background: #eee; padding: 1px 5px; border-radius: 4px; }

.btn {
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
}
.btn.small { padding: 4px 10px; font-size: 12px; }
.btn.primary { background: #308b30; border-color: #308b30; color: #fff; font-weight: 600; }
.btn.danger { border-color: #d94b4b; color: #d94b4b; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.admin-table th, .admin-table td {
  border-bottom: 1px solid #eee;
  padding: 8px 6px;
  text-align: left;
}
.admin-table th:first-child, .admin-table td:first-child { width: 52px; }
.thumb { width: 44px; max-width: 44px; height: 44px; object-fit: cover; border-radius: 6px; background: #f2f2f2; }
.actions { display: flex; gap: 6px; white-space: nowrap; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 30px 16px;
  z-index: 50;
}
.panel {
  background: #fff;
  border-radius: 14px;
  padding: 22px;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.panel h2 { margin: 0 0 4px; font-size: 17px; }
.panel label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #555;
  font-weight: 600;
}
.panel input, .panel select, .panel textarea {
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  color: #2b2b2b;
  padding: 7px 9px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
}
fieldset {
  min-width: 0; /* browser ให้ fieldset มี min-width: min-content โดย default ทำให้ไม่ยอมย่อตามเนื้อหายาว ๆ ใน spec-row ล้นออกนอก .panel */
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
legend { font-size: 12px; font-weight: 600; color: #555; padding: 0 4px; }
.spec-row { display: flex; gap: 6px; }
.spec-row input { flex: 1; min-width: 0; }

.preview { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; background: #f2f2f2; }
.gallery-preview { display: flex; flex-wrap: wrap; gap: 8px; }
.gallery-item { position: relative; }
.gallery-item img { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; background: #f2f2f2; display: block; }
.gallery-item .btn { position: absolute; bottom: 2px; right: 2px; padding: 2px 6px; font-size: 10px; }

.panel-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px; }
</style>
