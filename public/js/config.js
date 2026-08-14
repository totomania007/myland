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

// REAL CLOUDFLARE D1 SEED DATA
export const DEFAULT_PROPERTIES = [
  {
    id: 'prop-1786625500492',
    name: 'Silk Condominium',
    lessorKey: 'lessor-1786648676672',
    type: 'อสังหาริมทรัพย์เพื่อการเช่า',
    address: 'Silk Condo ถ.พหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพฯ 10220',
    houseNo: '229/183',
    size: '35 ตารางเมตร',
    rent: 9000,
    deposit: 18000,
    principal: 1281000,
    installment: 9900,
    rate: 4.5,
    startDate: '2026-08-13',
    meterElec: '',
    meterWater: '',
    inventoryList: [
      { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
      { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: CONFIG.PLACEHOLDER_SVG }
    ],
    rateSchedule: [
      { startMonth: 1, endMonth: 36, rate: 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
      { startMonth: 37, endMonth: 360, rate: 5.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR)' }
    ]
  },
  {
    id: 'prop-1785743955428',
    name: 'the atrium',
    lessorKey: 'lessor-1786649277545',
    type: 'อสังหาริมทรัพย์เพื่อการเช่า',
    address: 'หมู่บ้าน ดิเอเทรียม เพิ่มสิน ซ.เพิ่มสิน 20 แยก 5 ถนนเพิ่มสิน แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220',
    houseNo: '200/88',
    size: '18 ตารางวา',
    rent: 16500,
    deposit: 33000,
    principal: 3800000,
    installment: 16500,
    rate: 4.5,
    startDate: '2026-08-01',
    meterElec: '',
    meterWater: '',
    inventoryList: [
      { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
      { name: 'ชุดครัว Built-in พร้อมซิงค์ล้างจาน', img: CONFIG.PLACEHOLDER_SVG }
    ],
    rateSchedule: [
      { startMonth: 1, endMonth: 36, rate: 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
      { startMonth: 37, endMonth: 360, rate: 5.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR)' }
    ]
  }
];

export const DEFAULT_LESSORS = {
  'lessor-1786648676672': {
    id: 'lessor-1786648676672',
    name: 'นางสาว ลัดดาวัลย์ รุ่งเรือง',
    idCard: '3100501989670',
    age: 44,
    phone: '0616281777',
    address: '200/125 หมู่บ้าน ดิเอเทรียม เพิ่มสิน ซ.เพิ่มสิน 20 แยก 5 ถนนเพิ่มสิน แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220',
    imageUrl: CONFIG.PLACEHOLDER_SVG
  },
  'lessor-1786649277545': {
    id: 'lessor-1786649277545',
    name: 'นายสุรชัย อุดมมั่น',
    idCard: '4101200062631',
    age: 52,
    phone: '0858456378',
    address: '202/60 ซอยลาดพร้าว 80 แยก 14 แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพฯ',
    imageUrl: CONFIG.PLACEHOLDER_SVG
  }
};

export const DEFAULT_TENANTS = {
  'tenant-1': {
    id: 'tenant-1',
    fullName: 'ผู้เช่าประจำห้องพัก',
    age: 35,
    idCard: '-',
    phone: '-',
    address: '-',
    unitName: 'Silk Condominium',
    houseNo: '229/183',
    rent: 9000,
    deposit: 18000,
    startDate: '2026-08-13',
    duration: '1',
    endDate: '2027-08-12',
    monthsPaidCount: 1,
    payDay: 5,
    propId: 'prop-1786625500492',
    inventory: [],
    paymentHistory: []
  }
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
    fullName: DEFAULT_TENANTS['tenant-1'].fullName,
    age: DEFAULT_TENANTS['tenant-1'].age,
    idCard: DEFAULT_TENANTS['tenant-1'].idCard,
    phone: DEFAULT_TENANTS['tenant-1'].phone,
    address: DEFAULT_TENANTS['tenant-1'].address,
    startDate: DEFAULT_TENANTS['tenant-1'].startDate,
    duration: DEFAULT_TENANTS['tenant-1'].duration,
    endDate: DEFAULT_TENANTS['tenant-1'].endDate,
    imageUrl: CONFIG.PLACEHOLDER_SVG
  },
  currentPropertyId: DEFAULT_PROPERTIES[0].id,
  currentGalleryFilter: 'all',
  propertiesState: loadStoredData('property_os_properties', DEFAULT_PROPERTIES),
  tenantDatabase: loadStoredData('property_os_tenants', DEFAULT_TENANTS),
  lessorProfiles: loadStoredData('property_os_lessors', DEFAULT_LESSORS),
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
