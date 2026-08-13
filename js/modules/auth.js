/**
 * YOUESTATES PROPERTY OS — AUTH & ROLE PERMISSION CONTROL MODULE
 * 2026 Modular Role & Access Control Matrix
 */

import { CONFIG, state, saveStateToLocalStorage } from '../config.js';

// Access Control Lists (ACL)
export const PERMISSION_REGISTRY = {
  LANDLORD_ONLY: [
    'tab-admin',
    'tab-register-lessor',
    'tab-contract',
    'subtab-loan',
    'subtab-lessor',
    'pd-admin-action-buttons',
    'btn-upload-furniture-img',
    'gallery-upload-btn-label',
    'bento-card-1',
    'bento-card-3',
    'bento-card-5',
    'landing-quick-contract',
    'landing-quick-lessor',
    'mobile-nav-admin',
    'mobile-nav-contract',
    'fab-menu-add-prop',
    'fab-menu-contract'
  ],
  TENANT_ACCESSIBLE: [
    'tab-landing',
    'tab-property-detail',
    'tab-tenant',
    'subtab-specs',
    'subtab-gallery'
  ]
};

export function getCurrentRole() {
  return window.currentRole || (state && state.currentRole) || 'tenant';
}

export function setCurrentRole(role) {
  if (state) state.currentRole = role;
  window.currentRole = role;
}

export function applyRolePermissions() {
  const isLandlord = getCurrentRole() === 'landlord';

  // 1. Enforce Visibility on Landlord-Only Modules
  PERMISSION_REGISTRY.LANDLORD_ONLY.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (isLandlord) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });

  // 2. Update Header Badges & Tab Labels
  const badgeRole = document.getElementById('user-badge-role');
  const roleTitle = document.getElementById('header-role-title');
  const tabPropertyBtn = document.getElementById('tab-property-detail');
  const pdHeaderBadge = document.getElementById('pd-header-badge');

  if (isLandlord) {
    if (badgeRole) {
      badgeRole.innerText = '🔑 ผู้ให้เช่า';
      badgeRole.className = 'px-2 py-0.5 rounded bg-[#e05646] text-white font-bold text-[10px]';
    }
    if (roleTitle) roleTitle.innerText = 'ผู้ให้เช่า (Landlord Mode)';
    if (tabPropertyBtn) tabPropertyBtn.innerText = '🏡 รายละเอียดทรัพย์สิน & สินเชื่อ';
    if (pdHeaderBadge) pdHeaderBadge.innerText = 'สเปก & เงินกู้';
  } else {
    if (badgeRole) {
      badgeRole.innerText = '👤 ผู้เช่า';
      badgeRole.className = 'px-2 py-0.5 rounded bg-[#383838] text-white font-bold text-[10px]';
    }
    if (roleTitle) roleTitle.innerText = 'ผู้เช่า (Tenant Portal Mode)';
    if (tabPropertyBtn) tabPropertyBtn.innerText = '🏡 รายละเอียดทรัพย์สิน';
    if (pdHeaderBadge) pdHeaderBadge.innerText = 'สเปกอสังหาริมทรัพย์';
  }
}

export function checkTabAccess(tab) {
  if (getCurrentRole() === 'tenant' && ['admin', 'register-lessor', 'contract'].includes(tab)) {
    if (window.switchTab) window.switchTab('property-detail');
    return false;
  }
  return true;
}

export function checkSubTabAccess(subtab) {
  if (getCurrentRole() === 'tenant' && ['loan', 'lessor'].includes(subtab)) {
    if (window.switchSubTab) window.switchSubTab('specs');
    return false;
  }
  return true;
}

export function verifyAdminPinSubmit() {
  const pinInput = document.getElementById('admin-pin-input');
  const pinVal = pinInput ? pinInput.value.trim() : '';

  const matchedAdmin = state.adminAccountsState.find(a => a.pin === pinVal);

  if (matchedAdmin || pinVal === CONFIG.DEFAULT_PIN) {
    setCurrentRole('landlord');
    const adminName = matchedAdmin ? matchedAdmin.name : 'ผู้ดูแลพอร์ต';
    const badgeName = document.getElementById('user-badge-name');
    if (badgeName) badgeName.innerText = adminName;
    
    // Hide Modals
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');

    const pinModal = document.getElementById('modal-admin-pin');
    if (pinModal) pinModal.classList.add('hidden');

    if (pinInput) pinInput.value = '';
    applyRolePermissions();
    if (window.switchTab) window.switchTab('admin');
    alert(`🔓 เข้าสู่ระบบผู้ให้เช่า (${adminName}) สำเร็จแล้ว!`);
  } else {
    alert('❌ รหัส PIN ไม่ถูกต้อง (รหัสผ่านเริ่มต้นของระบบคือ 1234)');
  }
}

export function renderAdminAccountsList() {
  const container = document.getElementById('admin-accounts-card-list');
  const modalContainer = document.getElementById('admin-accounts-list-container');

  const html = state.adminAccountsState.map((adm) => `
    <div class="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 flex items-center justify-between shadow-sm">
      <div>
        <div class="font-bold text-xs text-white">${adm.name}</div>
        <div class="text-[10px] text-emerald-400 font-mono font-semibold">PIN: ${'*'.repeat(adm.pin.length)} (${adm.pin})</div>
      </div>
      ${state.adminAccountsState.length > 1 ? `
        <button type="button" onclick="window.deleteAdminAccount('${adm.id}')" class="text-xs text-rose-400 hover:text-rose-300 font-bold px-2 py-1 bg-slate-800 rounded">
          🗑️ ลบ
        </button>
      ` : `<span class="text-[9px] text-stone-500 font-bold bg-slate-800 px-2 py-1 rounded">หลัก</span>`}
    </div>
  `).join('');

  if (container) container.innerHTML = html;
  if (modalContainer) modalContainer.innerHTML = html;
}

export function handleAddAdminSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('new-admin-name');
  const pinInput = document.getElementById('new-admin-pin');
  const name = nameInput ? nameInput.value.trim() : '';
  const pin = pinInput ? pinInput.value.trim() : '';

  if (!name || !pin) {
    alert('กรุณากรอกชื่อแอดมินและรหัส PIN ให้ครบถ้วน');
    return;
  }

  const newAdmin = {
    id: 'admin-' + Date.now(),
    name,
    pin,
    role: 'Admin'
  };

  state.adminAccountsState.push(newAdmin);
  saveStateToLocalStorage();
  renderAdminAccountsList();

  if (nameInput) nameInput.value = '';
  if (pinInput) pinInput.value = '';
  if (window.toggleModal) window.toggleModal('modal-manage-admins');
  alert(`บันทึกเพิ่มแอดมิน "${name}" (PIN: ${pin}) เรียบร้อยแล้ว!`);
}

export function deleteAdminAccount(adminId) {
  if (state.adminAccountsState.length <= 1) {
    alert('ไม่สามารถลบแอดมินคนสุดท้ายได้ครับ');
    return;
  }
  if (confirm('คุณต้องการลบแอดมินคนนี้ใช่หรือไม่?')) {
    state.adminAccountsState = state.adminAccountsState.filter(a => a.id !== adminId);
    saveStateToLocalStorage();
    renderAdminAccountsList();
  }
}
