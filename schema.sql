-- CLOUDFLARE D1 SQL DATABASE SCHEMA

-- 1. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    lessor_key TEXT NOT NULL DEFAULT 'husband',
    type TEXT DEFAULT 'อสังหาริมทรัพย์เพื่อการเช่า',
    address TEXT,
    house_no TEXT NOT NULL,
    size TEXT,
    rent INTEGER DEFAULT 0,
    deposit INTEGER DEFAULT 0,
    principal INTEGER DEFAULT 0,
    installment INTEGER DEFAULT 0,
    rate REAL DEFAULT 4.5,
    start_date TEXT,
    meter_elec TEXT,
    meter_water TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TENANTS TABLE
CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    age INTEGER,
    id_card TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    id_card_image_url TEXT,
    start_date TEXT,
    months_paid INTEGER DEFAULT 0,
    pay_day INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. MORTGAGE RATE PERIODS (RETENTION SCHEDULE)
CREATE TABLE IF NOT EXISTS mortgage_periods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
    start_month INTEGER NOT NULL,
    end_month INTEGER NOT NULL,
    rate REAL NOT NULL,
    label TEXT NOT NULL
);

-- 4. PAYMENT RECEIPTS TABLE
CREATE TABLE IF NOT EXISTS payment_receipts (
    id TEXT PRIMARY KEY,
    tenant_id TEXT REFERENCES tenants(id) ON DELETE CASCADE,
    month_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    date_paid TEXT NOT NULL,
    status TEXT DEFAULT 'ชำระแล้ว'
);

-- 5. BANK DOCUMENTS & CLOUDINARY ATTACHMENTS
CREATE TABLE IF NOT EXISTS bank_documents (
    id TEXT PRIMARY KEY,
    property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    doc_type TEXT DEFAULT 'เอกสารธนาคาร',
    cloudinary_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
