/**
 * YOUESTATES PROPERTY OS — TENANT PORTAL MODULE
 * 2026 Modular Tenant Self-Service System
 */

import { CONFIG, state, saveStateToLocalStorage } from '../config.js';
import { setCurrentRole } from './auth.js';

export function calculateLeaseEndDate() {
  const startDateInput = document.getElementById('t-startdate');
  const durationSelect = document.getElementById('t-duration');
  if (!startDateInput || !durationSelect || !startDateInput.value) return '';

  const startDate = new Date(startDateInput.value);
  const durationYears = parseInt(durationSelect.value) || 1;

  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + durationYears);
  endDate.setDate(endDate.getDate() - 1);

  const year = endDate.getFullYear();
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const day = String(endDate.getDate()).padStart(2, '0');
  const formattedDateStr = `${year}-${month}-${day}`;

  const endDateInput = document.getElementById('t-enddate');
  if (endDateInput) endDateInput.value = formattedDateStr;

  const displayEl = document.getElementById('t-calc-end-date-display');
  if (displayEl) {
    displayEl.innerText = `วันสิ้นสุดสัญญาเช่า (${durationYears} ปี): ${endDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }
  return formattedDateStr;
}

export function initTenantFormDates() {
  const startDateInput = document.getElementById('t-startdate');
  if (startDateInput && !startDateInput.value) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    startDateInput.value = `${year}-${month}-${day}`;
  }
  calculateLeaseEndDate();
}

export function handleTenantSubmit(e) {
  if (e) e.preventDefault();
  const bindPropId = document.getElementById('t-property-bind')?.value;
  const bindProp = state.propertiesState.find(p => p.id === bindPropId) || state.propertiesState[0];

  const startDateVal = document.getElementById('t-startdate')?.value || '';
  const durationVal = document.getElementById('t-duration')?.value || '1';
  const endDateVal = calculateLeaseEndDate();
  const editingKeyEl = document.getElementById('editing-tenant-key');

  const fullNameVal = document.getElementById('t-fullname')?.value.trim();
  if (!fullNameVal) {
    alert('กรุณากรอกชื่อ-นามสกุล ผู้เช่า');
    return;
  }

  const isEditing = editingKeyEl && editingKeyEl.value.trim();
  const tKey = isEditing ? editingKeyEl.value.trim() : ('tenant-' + Date.now());

  state.currentTenant = {
    fullName: fullNameVal,
    age: document.getElementById('t-age')?.value || '35',
    idCard: document.getElementById('t-idcard')?.value || '',
    phone: document.getElementById('t-phone')?.value || '',
    address: document.getElementById('t-address')?.value || '',
    startDate: startDateVal,
    duration: durationVal,
    endDate: endDateVal,
    imageUrl: state.tenantDatabase[tKey]?.imageUrl || CONFIG.PLACEHOLDER_SVG
  };

  state.tenantDatabase[tKey] = {
    fullName: state.currentTenant.fullName,
    age: state.currentTenant.age,
    idCard: state.currentTenant.idCard,
    phone: state.currentTenant.phone,
    address: state.currentTenant.address,
    unitName: bindProp ? bindProp.name : 'ยูนิตอสังหาฯ',
    houseNo: bindProp ? bindProp.houseNo : '',
    rent: bindProp ? bindProp.rent : 0,
    deposit: bindProp ? bindProp.deposit : 0,
    startDate: startDateVal,
    duration: durationVal,
    endDate: endDateVal,
    monthsPaidCount: state.tenantDatabase[tKey]?.monthsPaidCount || 1,
    payDay: 5,
    propId: bindPropId,
    inventory: bindProp ? bindProp.inventoryList : [],
    paymentHistory: state.tenantDatabase[tKey]?.paymentHistory || [{ month: 'เดือนปัจจุบัน (งวดที่ 1)', amount: bindProp ? bindProp.rent : 0, datePaid: startDateVal }]
  };

  saveStateToLocalStorage();

  if (editingKeyEl) editingKeyEl.value = '';
  const btn = document.getElementById('btn-submit-tenant');
  if (btn) {
    btn.innerText = `💾 บันทึกผู้เช่าลงระบบ & ออกสัญญาเช่าทันที`;
    btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    btn.classList.add('youestates-btn-coral');
  }

  renderRegisteredTenantsList();
  if (window.renderContractView) window.renderContractView();

  const msg = isEditing ? `อัปเดตข้อมูลผู้เช่า "${fullNameVal}" เรียบร้อยแล้ว!` : `บันทึกข้อมูลผู้เช่า "${fullNameVal}" ลงระบบเรียบร้อยแล้ว!`;
  alert(msg);

  if (state.currentRole === 'tenant') {
    state.currentTenantId = tKey;
    confirmTenantLoginDirect(tKey);
  }
}

export function renderRegisteredTenantsList() {
  const container = document.getElementById('registered-tenants-container');
  if (!container) return;
  container.innerHTML = '';
  const tenants = (state && state.tenantDatabase) ? state.tenantDatabase : JSON.parse(localStorage.getItem('property_os_tenants') || '{}');
  const keys = Object.keys(tenants);

  if (keys.length === 0) {
    container.innerHTML = `<div class="col-span-full text-stone-400 font-bold p-4 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs">ยังไม่มีผู้เช่าที่ลงทะเบียนในระบบ</div>`;
    return;
  }

  keys.forEach(key => {
    const t = tenants[key];
    container.innerHTML += `
      <div class="p-3 bg-stone-100 border border-stone-300 rounded-xl space-y-1.5 shadow-sm text-xs">
        <div class="font-extrabold text-stone-800 flex justify-between items-center">
          <span>👤 ${t.fullName} (${t.age || '-'} ปี)</span>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded font-bold"> active</span>
        </div>
        <div class="text-[11px] text-stone-600">🏠 เช่าอสังหาฯ: <strong>${t.unitName || '-'}</strong> ${t.houseNo ? `(${t.houseNo})` : ''}</div>
        <div class="text-[11px] text-stone-600">🆔 บัตรประชาชน: ${t.idCard || '-'}</div>
        <div class="text-[11px] text-stone-600">📞 โทร: ${t.phone || '-'}</div>
        <div class="text-[11px] text-stone-500">🗓️ สัญญา: ${t.startDate || '-'} ถึง ${t.endDate || '-'}</div>
        <div class="flex gap-2 pt-1">
          <button onclick="window.editRegisteredTenant('${key}')" class="flex-1 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-bold rounded transition-colors">
            ✏️ แก้ไข
          </button>
          <button onclick="window.deleteRegisteredTenant('${key}')" class="py-1 px-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold rounded transition-colors">
            🗑️ ลบ
          </button>
        </div>
      </div>
    `;
  });
}

export function editRegisteredTenant(tKey) {
  const tenants = (state && state.tenantDatabase) ? state.tenantDatabase : JSON.parse(localStorage.getItem('property_os_tenants') || '{}');
  const t = tenants[tKey];
  if (!t) return;

  const keyEl = document.getElementById('editing-tenant-key');
  if (keyEl) keyEl.value = tKey;

  if (document.getElementById('t-fullname')) document.getElementById('t-fullname').value = t.fullName || '';
  if (document.getElementById('t-age')) document.getElementById('t-age').value = t.age || 35;
  if (document.getElementById('t-idcard')) document.getElementById('t-idcard').value = t.idCard || '';
  if (document.getElementById('t-phone')) document.getElementById('t-phone').value = t.phone || '';
  if (document.getElementById('t-address')) document.getElementById('t-address').value = t.address || '';
  if (document.getElementById('t-startdate')) document.getElementById('t-startdate').value = t.startDate || '';
  if (document.getElementById('t-duration')) document.getElementById('t-duration').value = t.duration || '1';
  if (document.getElementById('t-property-bind') && t.propId) document.getElementById('t-property-bind').value = t.propId;

  calculateLeaseEndDate();

  const btn = document.getElementById('btn-submit-tenant');
  if (btn) {
    btn.innerText = `✏️ บันทึกอัปเดตการแก้ไขข้อมูลผู้เช่า (${t.fullName})`;
    btn.classList.remove('youestates-btn-coral');
    btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function deleteRegisteredTenant(tKey) {
  const tenants = (state && state.tenantDatabase) ? state.tenantDatabase : JSON.parse(localStorage.getItem('property_os_tenants') || '{}');
  const t = tenants[tKey];
  if (!t) return;

  if (!confirm(`คุณต้องการลบข้อมูลผู้เช่า "${t.fullName}" ออกจากระบบใช่หรือไม่?`)) return;

  if (state.tenantDatabase) delete state.tenantDatabase[tKey];
  if (window.state && window.state.tenantDatabase) delete window.state.tenantDatabase[tKey];

  let fromStorage = {};
  try { fromStorage = JSON.parse(localStorage.getItem('property_os_tenants') || '{}'); } catch(e) {}
  delete fromStorage[tKey];
  localStorage.setItem('property_os_tenants', JSON.stringify(fromStorage));

  if (state.currentTenantId === tKey) {
    state.currentTenantId = '';
    state.currentTenant = null;
  }

  renderRegisteredTenantsList();
  if (window.renderContractView) window.renderContractView();

  alert(`ลบข้อมูลผู้เช่า "${t.fullName}" เรียบร้อยแล้ว!`);
}

export function confirmTenantLoginDirect(tKey) {
  const tData = state.tenantDatabase[tKey];
  if (!tData) return;
  setCurrentRole('tenant');
  state.currentTenantId = tKey;

  state.currentTenant = {
    fullName: tData.fullName,
    age: tData.age,
    idCard: tData.idCard,
    phone: tData.phone,
    address: tData.address,
    startDate: tData.startDate,
    duration: tData.duration,
    endDate: tData.endDate,
    imageUrl: tData.imageUrl || CONFIG.PLACEHOLDER_SVG
  };

  if (document.getElementById('header-role-title')) document.getElementById('header-role-title').innerText = 'ผู้เช่า (Tenant Mode)';
  if (document.getElementById('user-badge-role')) {
    document.getElementById('user-badge-role').innerText = '👤 ผู้เช่า';
    document.getElementById('user-badge-role').className = 'px-2 py-0.5 rounded bg-[#383838] text-white font-bold text-[10px]';
  }
  if (document.getElementById('user-badge-name')) document.getElementById('user-badge-name').innerText = tData.fullName;

  state.currentPropertyId = tData.propId;

  if (document.getElementById('tenant-dash-welcome')) document.getElementById('tenant-dash-welcome').innerText = 'สวัสดีครับ ' + tData.fullName;
  if (document.getElementById('tenant-dash-unit')) document.getElementById('tenant-dash-unit').innerText = tData.unitName || 'ยูนิตที่เช่า';
  if (document.getElementById('tenant-dash-rent')) document.getElementById('tenant-dash-rent').innerText = '฿' + (tData.rent || 0).toLocaleString() + ' บาท/เดือน';
  if (document.getElementById('tenant-dash-deposit')) document.getElementById('tenant-dash-deposit').innerText = '฿' + (tData.deposit || 0).toLocaleString() + ' บาท';

  const sD = tData.startDate ? new Date(tData.startDate) : new Date();
  const eD = tData.endDate ? new Date(tData.endDate) : new Date();
  if (document.getElementById('tenant-dash-start-date')) {
    document.getElementById('tenant-dash-start-date').innerText = `สัญญาเช่า: ${sD.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })} ถึง ${eD.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }

  if (document.getElementById('view-admin')) document.getElementById('view-admin').classList.add('hidden');
  if (document.getElementById('view-property-detail')) document.getElementById('view-property-detail').classList.add('hidden');
  if (document.getElementById('view-register-lessor')) document.getElementById('view-register-lessor').classList.add('hidden');
  if (document.getElementById('view-tenant')) document.getElementById('view-tenant').classList.add('hidden');
  if (document.getElementById('view-contract')) document.getElementById('view-contract').classList.add('hidden');
  if (document.getElementById('main-nav-bar')) document.getElementById('main-nav-bar').classList.add('hidden');

  if (document.getElementById('view-tenant-dashboard')) document.getElementById('view-tenant-dashboard').classList.remove('hidden');
  if (window.renderContractView) window.renderContractView();
}
