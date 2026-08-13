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
  e.preventDefault();
  const bindPropId = document.getElementById('t-property-bind').value;
  const bindProp = state.propertiesState.find(p => p.id === bindPropId) || state.propertiesState[0];

  const startDateVal = document.getElementById('t-startdate').value;
  const durationVal = document.getElementById('t-duration').value;
  const endDateVal = calculateLeaseEndDate();

  const tKey = 'tenant-' + Date.now();
  state.currentTenant = {
    fullName: document.getElementById('t-fullname').value,
    age: document.getElementById('t-age').value,
    idCard: document.getElementById('t-idcard').value,
    phone: document.getElementById('t-phone').value,
    address: document.getElementById('t-address').value,
    startDate: startDateVal,
    duration: durationVal,
    endDate: endDateVal,
    imageUrl: state.currentTenant ? state.currentTenant.imageUrl : CONFIG.PLACEHOLDER_SVG
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
    monthsPaidCount: 1,
    payDay: 5,
    propId: bindPropId,
    inventory: bindProp ? bindProp.inventoryList : [],
    paymentHistory: [{ month: 'เดือนปัจจุบัน (งวดที่ 1)', amount: bindProp ? bindProp.rent : 0, datePaid: startDateVal }]
  };

  saveStateToLocalStorage();
  if (window.renderContractView) window.renderContractView();

  if (state.currentRole === 'tenant') {
    state.currentTenantId = tKey;
    alert(`ยินดีต้อนรับคุณ ${state.currentTenant.fullName}! ลงทะเบียนข้อมูลผู้เช่าและสร้างสัญญา (เริ่ม ${startDateVal} ถึง ${endDateVal}) เรียบร้อยแล้ว`);
    confirmTenantLoginDirect(tKey);
  } else {
    if (window.switchTab) window.switchTab('contract');
    alert('บันทึกผู้เช่าลงระบบเรียบร้อยแล้ว!');
  }
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
