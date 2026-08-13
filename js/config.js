/**
 * YOUESTATES PROPERTY OS — CONFIG & GLOBAL STATE MODULE
 * 2026 Modular Architecture
 */

export const CONFIG = {
  CLOUDINARY_CLOUD_NAME: 'ogdfbbpw',
  CLOUDINARY_UPLOAD_PRESET: 'house_landlord',
  DEFAULT_PIN: '1234',
  PLACEHOLDER_SVG: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' rx='12' fill='%23e2ded8'/><path d='M160 90C160 112.091 142.091 130 120 130C97.9086 130 80 112.091 80 90C80 67.9086 97.9086 50 120 50C142.091 50 160 67.9086 160 90Z' fill='%23a8a29e'/><path d='M50 200C50 161.34 81.3401 130 120 130C158.66 130 190 161.34 190 200H50Z' fill='%23a8a29e'/><rect x='220' y='65' width='130' height='14' rx='4' fill='%23a8a29e'/><rect x='220' y='95' width='110' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='115' width='90' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='145' width='120' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='165' width='80' height='10' rx='4' fill='%23a8a29e'/></svg>"
};

// Global App State Scope
export const state = {
  currentRole: 'landlord', // Default to 'landlord' for full feature accessibility
  currentTenantId: '',
  currentTenant: {
    fullName: 'ผู้เช่า',
    age: '-',
    idCard: '-',
    phone: '-',
    address: '-',
    startDate: '',
    duration: '1',
    endDate: '',
    imageUrl: CONFIG.PLACEHOLDER_SVG
  },
  currentPropertyId: '',
  currentGalleryFilter: 'all',
  propertiesState: [],
  tenantDatabase: {},
  lessorProfiles: JSON.parse(localStorage.getItem('property_os_lessors') || '{}'),
  adminAccountsState: JSON.parse(localStorage.getItem('property_os_admins') || '[]')
};

if (state.adminAccountsState.length === 0) {
  state.adminAccountsState = [
    { id: 'admin-1', name: 'ผู้ดูแลพอร์ตหลัก', pin: CONFIG.DEFAULT_PIN, role: 'Super Admin' }
  ];
}

export function saveStateToLocalStorage() {
  localStorage.setItem('property_os_properties', JSON.stringify(state.propertiesState));
  localStorage.setItem('property_os_lessors', JSON.stringify(state.lessorProfiles));
  localStorage.setItem('property_os_admins', JSON.stringify(state.adminAccountsState));
  localStorage.setItem('property_os_tenants', JSON.stringify(state.tenantDatabase));
}

if (typeof window !== 'undefined') {
  window.state = state;
  window.CONFIG = CONFIG;
}
