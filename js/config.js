/**
 * YOUESTATES PROPERTY OS — CONFIG & GLOBAL STATE MODULE
 * 2026 Modular Architecture
 */

export const CONFIG = {
  CLOUDINARY_CLOUD_NAME: 'ogdfbbpw',
  CLOUDINARY_UPLOAD_PRESET: 'house_landlord',
  CLOUDINARY_CONFIG: {
    CLOUD_NAME: 'ogdfbbpw',
    UPLOAD_PRESET: 'house_landlord'
  },
  DEFAULT_PIN: '1234',
  PLACEHOLDER_SVG: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' rx='12' fill='%23e2ded8'/><path d='M160 90C160 112.091 142.091 130 120 130C97.9086 130 80 112.091 80 90C80 67.9086 97.9086 50 120 50C142.091 50 160 67.9086 160 90Z' fill='%23a8a29e'/><path d='M50 200C50 161.34 81.3401 130 120 130C158.66 130 190 161.34 190 200H50Z' fill='%23a8a29e'/><rect x='220' y='65' width='130' height='14' rx='4' fill='%23a8a29e'/><rect x='220' y='95' width='110' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='115' width='90' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='145' width='120' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='165' width='80' height='10' rx='4' fill='%23a8a29e'/></svg>"
};

// Default Seed Data
export const DEFAULT_PROPERTY = {
  id: 'prop-1',
  name: 'แอสเพน คอนโด ลาซาล (Aspen Condo)',
  houseNo: '101/12',
  address: 'ถนนลาซาล แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260',
  lessorKey: 'husband',
  principal: 3500000,
  installment: 17500,
  rent: 12000,
  deposit: 24000,
  startDate: '2024-01-01',
  rate: 3.5,
  type: 'คอนโดมีเนียม',
  size: '35 ตร.ม.',
  meterElec: '12345',
  meterWater: '67890',
  inventoryList: [
    { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
    { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: CONFIG.PLACEHOLDER_SVG },
    { name: 'ตู้เสื้อผ้า Built-in (Built-in Wardrobe)', img: CONFIG.PLACEHOLDER_SVG }
  ],
  rateSchedule: [
    { startMonth: 1, endMonth: 36, rate: 3.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
    { startMonth: 37, endMonth: 360, rate: 5.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR)' }
  ]
};

export const DEFAULT_LESSOR = {
  id: 'husband',
  name: 'นายสมคิด สุขสมบัติ',
  idCard: '1-1004-00123-45-6',
  age: 45,
  phone: '089-123-4567',
  address: '123/45 ถนนสุขุมวิท 101 แขวงบางนา เขตบางนา กรุงเทพมหานคร',
  imageUrl: CONFIG.PLACEHOLDER_SVG
};

export const DEFAULT_TENANT = {
  id: 'tenant-1',
  fullName: 'นายสมชาย ใจดี',
  age: 35,
  idCard: '1-1004-99999-99-9',
  phone: '081-234-5678',
  address: '99/1 หมู่ 5 ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ',
  unitName: 'แอสเพน คอนโด ลาซาล (Aspen Condo)',
  houseNo: '101/12',
  rent: 12000,
  deposit: 24000,
  startDate: '2026-08-01',
  duration: '1',
  endDate: '2027-07-31',
  monthsPaidCount: 1,
  payDay: 5,
  propId: 'prop-1',
  inventory: [
    { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
    { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: CONFIG.PLACEHOLDER_SVG }
  ],
  paymentHistory: [
    { month: 'เดือนปัจจุบัน (งวดที่ 1)', amount: 12000, datePaid: '2026-08-01' }
  ]
};

function loadStoredData(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    const parsed = JSON.parse(raw);
    if (Array.isArray(defaultVal) && (!Array.isArray(parsed) || parsed.length === 0)) return defaultVal;
    if (typeof defaultVal === 'object' && !Array.isArray(defaultVal) && Object.keys(parsed || {}).length === 0) return defaultVal;
    return parsed;
  } catch (e) {
    return defaultVal;
  }
}

// Global App State Scope
export const state = {
  currentRole: 'landlord', // Default to 'landlord' for full feature accessibility
  currentTenantId: 'tenant-1',
  currentTenant: {
    fullName: DEFAULT_TENANT.fullName,
    age: DEFAULT_TENANT.age,
    idCard: DEFAULT_TENANT.idCard,
    phone: DEFAULT_TENANT.phone,
    address: DEFAULT_TENANT.address,
    startDate: DEFAULT_TENANT.startDate,
    duration: DEFAULT_TENANT.duration,
    endDate: DEFAULT_TENANT.endDate,
    imageUrl: CONFIG.PLACEHOLDER_SVG
  },
  currentPropertyId: 'prop-1',
  currentGalleryFilter: 'all',
  propertiesState: loadStoredData('property_os_properties', [DEFAULT_PROPERTY]),
  tenantDatabase: loadStoredData('property_os_tenants', { 'tenant-1': DEFAULT_TENANT }),
  lessorProfiles: loadStoredData('property_os_lessors', { 'husband': DEFAULT_LESSOR }),
  adminAccountsState: loadStoredData('property_os_admins', [
    { id: 'admin-1', name: 'ผู้ดูแลพอร์ตหลัก', pin: CONFIG.DEFAULT_PIN, role: 'Super Admin' }
  ])
};

export function saveStateToLocalStorage() {
  if (state.propertiesState && state.propertiesState.length > 0) {
    localStorage.setItem('property_os_properties', JSON.stringify(state.propertiesState));
  }
  if (state.lessorProfiles && Object.keys(state.lessorProfiles).length > 0) {
    localStorage.setItem('property_os_lessors', JSON.stringify(state.lessorProfiles));
  }
  if (state.adminAccountsState && state.adminAccountsState.length > 0) {
    localStorage.setItem('property_os_admins', JSON.stringify(state.adminAccountsState));
  }
  if (state.tenantDatabase && Object.keys(state.tenantDatabase).length > 0) {
    localStorage.setItem('property_os_tenants', JSON.stringify(state.tenantDatabase));
  }
}

if (typeof window !== 'undefined') {
  window.state = state;
  window.CONFIG = CONFIG;
}
