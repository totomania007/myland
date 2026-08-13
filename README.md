# 🏢 Rental Property OS — YouEstates Real Estate & Portfolio Management System

ระบบบริหารจัดการพอร์ตอสังหาริมทรัพย์เพื่อการเช่า (Rental Property OS) แบบครบวงจร พัฒนาด้วยเทคโนโลยี Serverless บน **Cloudflare Pages**, **Cloudflare D1 Database** และระบบจัดเก็บรูปภาพเอกสารบน **Cloudinary Storage**

---

## 🌟 จุดเด่นและฟีเจอร์หลัก (Core Features)

1. **📊 สรุปภาพรวมพอร์ตอสังหาริมทรัพย์ (Portfolio Overview & Net Cashflow)**:
   - คำนวณยอดหนี้กู้คงเหลือรวม, รายได้ค่าเช่ารวม, ค่างวดผ่อนธนาคารรวม และกระแสเงินสดสุทธิ (Net Cashflow) ต่อเดือนให้อัตโนมัติ
   - แสดงที่อยู่อสังหาริมทรัพย์และสถานะการผ่อนชำระแบบ Real-time

2. **🏡 รายละเอียดทรัพย์สิน & สินเชื่อ (Property Specs & Address Management)**:
   - ระบบจัดเก็บสเปกอสังหาฯ, บ้านเลขที่ และรายละเอียดที่อยู่อย่างละเอียด (ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด)
   - สามารถเพิ่มทรัพย์สินใหม่ และแก้ไขสเปกได้จากทุกหน้าจอ
   - ระบบแนบรูปถ่ายเฟอร์นิเจอร์ส่งมอบขึ้น Cloudinary และแสดงผลในสัญญา A4

3. **🔑 ระบบลงทะเบียนผู้ให้เช่า (Landlord Onboarding & Management)**:
   - ลงทะเบียนผู้ให้เช่าด้วย ชื่อ-นามสกุล, เลขบัตรประชาชน 13 หลัก, ที่อยู่ และเบอร์โทรศัพท์
   - สแกนบัตรประชาชนผู้ให้เช่าอัปโหลดขึ้น Cloudinary Storage (Preset: `house_landlord`)
   - ซิงค์ข้อมูลผู้ให้เช่าลงในหนังสือสัญญาเช่าบ้านโดยอัตโนมัติ

4. **👤 ระบบลงทะเบียนผู้เช่า & ผู้เช่าลงทะเบียนตนเอง (Tenant Self-Onboarding)**:
   - รองรับให้ผู้เช่ากดลงทะเบียนกรอกข้อมูลและอัปโหลดสำเนาบัตรประชาชนได้ด้วยตนเอง
   - **ระบบคำนวณวันสิ้นสุดสัญญาเช่าให้อัตโนมัติ**: เพียงเลือกวันเริ่มเช่าและระยะเวลาสัญญา (เช่น 1 ปี) ระบบจะคำนวณวันสิ้นสุดสัญญาให้ทันที

5. **📊 ตารางผ่อนชำระ & Retention ตามช่วงปี (Amortization & Retention Calculator)**:
   - คำนวณตารางผ่อนชำระ 144 งวด (12 ปี) แยกดอกเบี้ยและเงินต้นตามจริง
   - รองรับการปรับแต่งอัตราดอกเบี้ย Retention ตามช่วงปี (เช่น งวดที่ 1-36 อัตรา 3.25%, งวดที่ 37-72 อัตรา 4.50%)

6. **📄 หนังสือสัญญาเช่าบ้าน A4 มาตรฐาน (A4 Rental Contract Generator)**:
   - ออกหนังสือสัญญาเช่าบ้านภาษาไทยมาตรฐาน 7 ข้อ (ฟอนต์ TH Sarabun 16pt / ขอบ 1 นิ้ว)
   - มาพร้อมเอกสารแนบท้ายครบชุด:
     - **เอกสารแนบท้าย ๑**: รายการและรูปถ่ายเฟอร์นิเจอร์จริงส่งมอบ
     - **เอกสารแนบท้าย ๒**: สำเนาบัตรประชาชนผู้เช่า
     - **เอกสารแนบท้าย ๓**: สำเนาบัตรประชาชนผู้ให้เช่า

---

## 🛠️ โครงสร้างเทคโนโลยี (Tech Stack & Architecture)

- **Frontend**: Vanilla HTML5, JavaScript (ES6+), Vanilla CSS Custom Properties & Tailwind CSS
- **Design Palette**: YouEstates Theme (`#e05646` Terracotta Coral, `#383838` Dark Charcoal Slate, `#f4f3f0` Linen)
- **Backend / API**: Cloudflare Pages Functions (`/functions/api/properties.js`, `/functions/api/upload.js`)
- **Database**: Cloudflare D1 SQLite Database (`property_os_db`)
- **Media & Document Storage**: Cloudinary Cloud Storage (`cloud_name: ogdfbbpw`, `upload_preset: house_landlord`)

---

## 🚀 คู่มือการทำงานข้ามเครื่องแบบไร้รอยต่อ (Seamless Multi-Machine Setup Guide)

เพื่อให้คุณและทีมงานสามารถดึงโปรเจกต์ไปพัฒนาต่อ ย้ายเครื่องทำงาน หรือ Deploy ได้โดยไม่มีปัญหาใดๆ ให้ทำตามขั้นตอนดังต่อไปนี้:

### 1️⃣ การ Clone โปรเจกต์ลงเครื่องใหม่
```bash
git clone <URL_REPOSITORY_ของคุญ>
cd property-management-app
```

---

### 2️⃣ การติดตั้ง Dependencies (ครั้งแรกบนเครื่องใหม่)
```bash
npm install
```

---

### 3️⃣ การรันระบบทดสอบในเครื่อง Local (Development Mode)

**วิธีที่ 1: รันผ่าน Node.js Local Server (แนะนำสำหรับการทดสอบ UI ทันที)**
```bash
node server.js
```
เปิดเว็บเบราว์เซอร์ไปที่: **`http://localhost:3000`**

**วิธีที่ 2: รันผ่าน Cloudflare Wrangler Local Environment**
```bash
npx wrangler pages dev ./
```

---

### 4️⃣ การเชื่อมต่อ Cloudflare D1 & Cloudinary Storage

ไฟล์ `wrangler.toml` ในโปรเจกต์ถูกตั้งค่าเชื่อมต่อกับ D1 Remote Database เรียบร้อยแล้ว:

```toml
name = "youestates-property-os"
pages_build_output_dir = "./"

[[d1_databases]]
binding = "DB"
database_name = "property_os_db"
database_id = "02ac40f6-65f7-4d26-b4fd-1a4bb2accea4"
```

**หากต้องการอัปเดตโครงสร้างตาราง Database บน Cloudflare D1:**
```bash
npx wrangler d1 execute property_os_db --remote --file=./schema.sql
```

---

### 5️⃣ การ Deploy ขึ้น Cloudflare Pages เพื่อใช้งานจริงบนอินเทอร์เน็ต

เมื่อทำการแก้ไขโค้ดเสร็จแล้วและต้องการส่งขึ้น Cloudflare Server จริง ให้รันคำสั่ง:

```bash
npx wrangler pages deploy ./ --project-name=youestates-property-os
```

---

## 📂 โครงสร้างโฟลเดอร์ในโปรเจกต์ (Project Directory Structure)

```text
property-management-app/
├── index.html               # หน้าจอหลักของระบบ (Main Web Application)
├── demo_preview.html         # ไฟล์สำหรับ Live Preview
├── schema.sql               # โครงสร้างฐานข้อมูล D1 SQLite Table Schema
├── wrangler.toml            # ไฟล์ตั้งค่า Cloudflare D1 Database Binding
├── server.js                # Local HTTP Dev Server
├── package.json             # ไฟล์จัดการ Node Packages & Commands
├── functions/               # Serverless Pages Functions (Cloudflare Backend API)
│   └── api/
│       ├── properties.js    # CRUD API สำหรับพอร์ตอสังหาริมทรัพย์
│       └── upload.js        # API สำหรับ Proxy การอัปโหลด Cloudinary
└── README.md                # เอกสารคู่มือการใช้งานและการพัฒนาต่อ
```

---

## 🔐 ข้อมูลสำคัญสำหรับการใช้งาน (Credentials Reference)

- **Cloudinary Cloud Name**: `ogdfbbpw`
- **Cloudinary Upload Preset**: `house_landlord`
- **Cloudflare Project Name**: `youestates-property-os`
- **Cloudflare D1 Database Name**: `property_os_db`
- **Cloudflare D1 UUID**: `02ac40f6-65f7-4d26-b4fd-1a4bb2accea4`

---

## 💡 ข้อแนะนำสำหรับการย้ายเครื่องทำงาน (Best Practices for Seamless Development)

1. **ก่อนเริ่มงานบนเครื่องใหม่**: ให้รัน `git pull origin main` เพื่อดึงโค้ดล่าสุดทุกครั้ง
2. **หลังแก้ไขงานเสร็จสิ้น**: ให้รัน `git add .`, `git commit -m "รายละเอียดงานที่ทำ"`, และ `git push origin main`
3. **การทดสอบข้อมูล**: ระบบรองรับการทำงานแบบ Hybrid — หากไม่ได้ต่ออินเทอร์เน็ต ระบบจะสลับไปบันทึกข้อมูลลง `LocalStorage` ของเบราว์เซอร์ให้อัตโนมัติ ทำให้พัฒนาต่อได้แม้อยู่แบบ Offline!
