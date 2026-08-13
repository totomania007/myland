/**
 * YOUESTATES RENTAL PROPERTY OS — MAIN APPLICATION ENTRYPOINT
 * 2026 Modular Architecture Integration
 */

import { CONFIG, state, saveStateToLocalStorage } from './config.js';
import { applyRolePermissions, checkTabAccess, checkSubTabAccess, verifyAdminPinSubmit, renderAdminAccountsList, handleAddAdminSubmit, deleteAdminAccount, getCurrentRole, setCurrentRole } from './modules/auth.js';
import { renderAdminData, renderRegisteredLessorsList, getCurrentProperty, calculateMortgage } from './modules/landlord.js';
import { calculateLeaseEndDate, initTenantFormDates, handleTenantSubmit, confirmTenantLoginDirect } from './modules/tenant.js';
import { renderPropertyGallery, filterGalleryPhotos, copyPropertyPromoLink } from './modules/gallery.js';
import { renderContractView } from './modules/contract.js';

// Expose functions globally for inline HTML onclick handlers
window.state = state;
window.CONFIG = CONFIG;
window.saveStateToLocalStorage = saveStateToLocalStorage;
window.getCurrentRole = getCurrentRole;
window.setCurrentRole = setCurrentRole;

window.applyRolePermissions = applyRolePermissions;
window.verifyAdminPinSubmit = verifyAdminPinSubmit;
window.renderAdminAccountsList = renderAdminAccountsList;
window.handleAddAdminSubmit = handleAddAdminSubmit;
window.deleteAdminAccount = deleteAdminAccount;

window.renderAdminData = renderAdminData;
window.renderRegisteredLessorsList = renderRegisteredLessorsList;
window.getCurrentProperty = getCurrentProperty;

window.calculateLeaseEndDate = calculateLeaseEndDate;
window.initTenantFormDates = initTenantFormDates;
window.handleTenantSubmit = handleTenantSubmit;
window.confirmTenantLoginDirect = confirmTenantLoginDirect;

window.renderPropertyGallery = renderPropertyGallery;
window.filterGalleryPhotos = filterGalleryPhotos;
window.copyPropertyPromoLink = copyPropertyPromoLink;
window.renderContractView = renderContractView;

window.loginAsRole = function(role) {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('hidden');

  if (role === 'landlord') {
    if (getCurrentRole() === 'landlord') {
      window.switchTab('admin');
      return;
    }
    const pinInput = document.getElementById('admin-pin-input');
    if (pinInput) pinInput.value = '';
    window.toggleModal('modal-admin-pin');
    return;
  }

  if (role === 'tenant') {
    setCurrentRole('tenant');
    applyRolePermissions();
    window.switchTab('tenant');
    return;
  }
};

window.switchTab = function(tab) {
  if (!checkTabAccess(tab)) return;

  if (document.getElementById('view-landing')) document.getElementById('view-landing').classList.add('hidden');
  if (document.getElementById('view-admin')) document.getElementById('view-admin').classList.add('hidden');
  if (document.getElementById('view-property-detail')) document.getElementById('view-property-detail').classList.add('hidden');
  if (document.getElementById('view-register-lessor')) document.getElementById('view-register-lessor').classList.add('hidden');
  if (document.getElementById('view-tenant')) document.getElementById('view-tenant').classList.add('hidden');
  if (document.getElementById('view-contract')) document.getElementById('view-contract').classList.add('hidden');
  if (document.getElementById('view-tenant-dashboard')) document.getElementById('view-tenant-dashboard').classList.add('hidden');

  const tabs = ['landing', 'admin', 'property-detail', 'register-lessor', 'tenant', 'contract'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      btn.classList.remove('active');
      btn.classList.add('inactive');
    }
  });

  const activeBtn = document.getElementById(`tab-${tab}`);
  if (activeBtn) {
    activeBtn.classList.remove('inactive');
    activeBtn.classList.add('active');
  }

  const targetView = document.getElementById(`view-${tab}`);
  if (targetView) targetView.classList.remove('hidden');

  if (tab === 'property-detail') renderPropertyDetailView();
  else if (tab === 'register-lessor') renderRegisteredLessorsList();
  else if (tab === 'tenant') {
    renderTenantPropertyDropdown();
    initTenantFormDates();
  } else if (tab === 'contract') renderContractView();

  applyRolePermissions();
};

window.switchSubTab = function(sub) {
  if (!checkSubTabAccess(sub)) return;

  ['specs', 'gallery', 'loan', 'lessor'].forEach(s => {
    const view = document.getElementById(`subview-${s}`);
    const tab = document.getElementById(`subtab-${s}`);
    if (view) view.classList.add('hidden');
    if (tab) tab.className = 'px-4 py-2.5 bg-stone-200 text-stone-700 hover:bg-stone-300 rounded-t-lg font-bold whitespace-nowrap';
  });

  const activeView = document.getElementById(`subview-${sub}`);
  const activeTab = document.getElementById(`subtab-${sub}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeTab) activeTab.className = 'px-4 py-2.5 bg-[#383838] text-white rounded-t-lg font-bold whitespace-nowrap';

  if (sub === 'gallery') renderPropertyGallery();
};

window.toggleModal = function(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.toggle('hidden');
};

window.openMediaPreview = function(title, imgUrl) {
  if (document.getElementById('media-preview-title')) document.getElementById('media-preview-title').innerText = title;
  if (document.getElementById('media-preview-img')) document.getElementById('media-preview-img').src = imgUrl || CONFIG.PLACEHOLDER_SVG;
  window.toggleModal('modal-media-preview');
};

window.selectPropertyView = function(propId) {
  state.currentPropertyId = propId;
  const select = document.getElementById('pd-property-selector');
  if (select) select.value = propId;
  window.switchTab('property-detail');
};

window.openAmortizationModal = function() {
  if (state.currentRole === 'tenant') return;
  const prop = getCurrentProperty();
  if (!prop) {
    alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
    window.toggleModal('modal-add-property');
    return;
  }
  window.toggleModal('modal-amortization-table');
};

window.openEditPropertyDetailModal = function() {
  if (state.currentRole === 'tenant') return;
  const prop = getCurrentProperty();
  if (!prop) {
    alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
    window.toggleModal('modal-add-property');
    return;
  }
  window.toggleModal('modal-edit-property-detail');
};

function renderPropertyDetailView() {
  renderLessorSelectOptions();
  const select = document.getElementById('pd-property-selector');
  if (select && state.propertiesState.length > 0) {
    select.innerHTML = '';
    state.propertiesState.forEach(p => {
      select.innerHTML += `<option value="${p.id}" ${p.id === state.currentPropertyId ? 'selected' : ''}>🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''}</option>`;
    });
  }

  const prop = getCurrentProperty();
  if (!prop) return;

  if (document.getElementById('pd-name')) document.getElementById('pd-name').innerText = prop.name;
  if (document.getElementById('pd-address')) document.getElementById('pd-address').innerText = prop.address;
  if (document.getElementById('pd-type')) document.getElementById('pd-type').innerText = prop.type || 'อสังหาฯ เช่า';
  if (document.getElementById('pd-houseno')) document.getElementById('pd-houseno').innerText = prop.houseNo || '-';
  if (document.getElementById('pd-full-address')) document.getElementById('pd-full-address').innerText = prop.address || '-';
  if (document.getElementById('pd-size')) document.getElementById('pd-size').innerText = prop.size || '40 ตร.ม.';
  if (document.getElementById('pd-rent')) document.getElementById('pd-rent').innerText = `฿${(prop.rent || 0).toLocaleString()} บาท`;
  if (document.getElementById('pd-deposit')) document.getElementById('pd-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()} บาท`;
}
window.renderPropertyDetailView = renderPropertyDetailView;

function renderLessorSelectOptions() {
  const selects = ['p-lessor', 'pde-lessor-select'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    if (sel) {
      sel.innerHTML = '';
      const keys = Object.keys(state.lessorProfiles);
      if (keys.length === 0) {
        sel.innerHTML = `<option value="">ยังไม่มีข้อมูลผู้ให้เช่าในระบบ</option>`;
      } else {
        keys.forEach(k => {
          sel.innerHTML += `<option value="${k}">${state.lessorProfiles[k].name}</option>`;
        });
      }
    }
  });
}
window.renderLessorSelectOptions = renderLessorSelectOptions;

function renderTenantPropertyDropdown() {
  const select = document.getElementById('t-property-bind');
  if (!select) return;
  select.innerHTML = '';
  if (state.propertiesState.length === 0) {
    select.innerHTML = '<option value="">ยังไม่มีทรัพย์สินในระบบ</option>';
  } else {
    state.propertiesState.forEach(p => {
      select.innerHTML += `<option value="${p.id}">🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''}</option>`;
    });
  }
}
window.renderTenantPropertyDropdown = renderTenantPropertyDropdown;

// INITIALIZATION PIPELINE
async function initApp() {
  try {
    const res = await fetch('/api/properties');
    if (res.ok) state.propertiesState = await res.json();
    else state.propertiesState = JSON.parse(localStorage.getItem('property_os_properties') || '[]');
  } catch (e) {
    state.propertiesState = JSON.parse(localStorage.getItem('property_os_properties') || '[]');
  }

  state.currentPropertyId = state.propertiesState.length > 0 ? state.propertiesState[0].id : '';
  renderAdminData();
  renderPropertyDetailView();
  renderContractView();
  renderRegisteredLessorsList();
  renderAdminAccountsList();
  renderLessorSelectOptions();
  initTenantFormDates();
  applyRolePermissions();
}

document.addEventListener('DOMContentLoaded', initApp);
