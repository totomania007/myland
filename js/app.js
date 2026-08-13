/**
 * YOUESTATES RENTAL PROPERTY OS — MAIN APPLICATION ENTRYPOINT
 * 2026 Modular Architecture Integration
 */

import { CONFIG, state, saveStateToLocalStorage } from './config.js';
import { applyRolePermissions, checkTabAccess, checkSubTabAccess, verifyAdminPinSubmit, renderAdminAccountsList, handleAddAdminSubmit, deleteAdminAccount, getCurrentRole, setCurrentRole } from './modules/auth.js';
import { renderAdminData, renderRegisteredLessorsList, getCurrentProperty, calculateMortgage, getRateForMonth, handleAddPropertySubmit, handleLessorRegisterTabSubmit, editRegisteredLessor, deleteRegisteredLessor, uploadToCloudinaryAndPreview, addFurnitureEditRow, handleEditPropertyDetailSubmit } from './modules/landlord.js';
import { calculateLeaseEndDate, initTenantFormDates, handleTenantSubmit, confirmTenantLoginDirect, renderRegisteredTenantsList, editRegisteredTenant, deleteRegisteredTenant } from './modules/tenant.js';
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
window.deleteRegisteredLessor = deleteRegisteredLessor;
window.getCurrentProperty = getCurrentProperty;
window.handleAddPropertySubmit = handleAddPropertySubmit;
window.handleLessorRegisterTabSubmit = handleLessorRegisterTabSubmit;
window.editRegisteredLessor = editRegisteredLessor;
window.uploadToCloudinaryAndPreview = uploadToCloudinaryAndPreview;
window.addFurnitureEditRow = addFurnitureEditRow;
window.handleEditPropertyDetailSubmit = handleEditPropertyDetailSubmit;
window.handlePropertyDetailEditSubmit = handleEditPropertyDetailSubmit;
window.triggerLessorTabFileInput = function() { const el = document.getElementById('lessorTabFile'); if (el) el.click(); };
window.triggerFileInput = function() { const el = document.getElementById('tenantFile'); if (el) el.click(); };

window.calculateLeaseEndDate = calculateLeaseEndDate;
window.initTenantFormDates = initTenantFormDates;
window.handleTenantSubmit = handleTenantSubmit;
window.confirmTenantLoginDirect = confirmTenantLoginDirect;
window.renderRegisteredTenantsList = renderRegisteredTenantsList;
window.editRegisteredTenant = editRegisteredTenant;
window.deleteRegisteredTenant = deleteRegisteredTenant;

window.renderPropertyGallery = renderPropertyGallery;
window.filterGalleryPhotos = filterGalleryPhotos;
window.copyPropertyPromoLink = copyPropertyPromoLink;
window.renderContractView = renderContractView;

window.openLoginOverlay = function() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.remove('hidden');
};

window.startTenantSelfRegistration = function() {
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('hidden');
  setCurrentRole('tenant');
  applyRolePermissions();
  window.switchTab('tenant');
};

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
    renderRegisteredTenantsList();
  } else if (tab === 'contract') renderContractView();

  applyRolePermissions();
};

window.switchSubTab = function(sub) {
  if (!checkSubTabAccess(sub)) return;

  ['specs', 'gallery', 'loan', 'lessor'].forEach(s => {
    const view = document.getElementById(`subview-${s}`);
    const tab = document.getElementById(`subtab-${s}`);
    if (view) view.classList.add('hidden');
    if (tab) {
      tab.classList.remove('bg-[#383838]', 'text-white');
      tab.classList.add('bg-stone-200', 'text-stone-700');
    }
  });

  const activeView = document.getElementById(`subview-${sub}`);
  const activeTab = document.getElementById(`subtab-${sub}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeTab) {
    activeTab.classList.remove('bg-stone-200', 'text-stone-700');
    activeTab.classList.add('bg-[#383838]', 'text-white');
  }

  if (sub === 'gallery') renderPropertyGallery();
  applyRolePermissions();
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

window.handleDetailPropertySwitch = function(propId) {
  state.currentPropertyId = propId;
  if (window.renderPropertyDetailView) window.renderPropertyDetailView();
  if (window.renderContractView) window.renderContractView();
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
  if (getCurrentRole() === 'tenant') return;
  const prop = getCurrentProperty();
  if (!prop) {
    alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
    window.toggleModal('modal-add-property');
    return;
  }
  
  if (window.renderLessorSelectOptions) window.renderLessorSelectOptions();

  if (document.getElementById('pde-name')) document.getElementById('pde-name').value = prop.name || '';
  if (document.getElementById('pde-houseno')) document.getElementById('pde-houseno').value = prop.houseNo || '';
  if (document.getElementById('pde-address')) document.getElementById('pde-address').value = prop.address || '';
  if (document.getElementById('pde-rent')) document.getElementById('pde-rent').value = prop.rent || 0;
  if (document.getElementById('pde-deposit')) document.getElementById('pde-deposit').value = prop.deposit || 0;
  if (document.getElementById('pde-size')) document.getElementById('pde-size').value = prop.size || '40 ตร.ม.';
  if (document.getElementById('pde-lessor-select')) document.getElementById('pde-lessor-select').value = prop.lessorKey || '';

  const furnContainer = document.getElementById('pde-furniture-rows-container');
  if (furnContainer) {
    furnContainer.innerHTML = '';
    const inventory = prop.inventoryList || [];
    if (inventory.length === 0) {
      addFurnitureEditRow('เครื่องปรับอากาศ (Air Conditioner)');
      addFurnitureEditRow('เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)');
      addFurnitureEditRow('ตู้เสื้อผ้า Built-in (Built-in Wardrobe)');
    } else {
      inventory.forEach((item, idx) => {
        const itemObj = typeof item === 'object' ? item : { name: item, img: CONFIG.PLACEHOLDER_SVG };
        addFurnitureEditRow(itemObj.name, itemObj.img, idx);
      });
    }
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

  // 1. Specs Tab
  if (document.getElementById('pd-name')) document.getElementById('pd-name').innerText = prop.name || 'สเปกอสังหาริมทรัพย์';
  if (document.getElementById('pd-address')) document.getElementById('pd-address').innerText = prop.address || '-';
  if (document.getElementById('pd-type')) document.getElementById('pd-type').innerText = prop.type || 'อสังหาฯ เช่า';
  if (document.getElementById('pd-houseno')) document.getElementById('pd-houseno').innerText = prop.houseNo || '-';
  if (document.getElementById('pd-full-address')) document.getElementById('pd-full-address').innerText = prop.address || '-';
  if (document.getElementById('pd-size')) document.getElementById('pd-size').innerText = prop.size || '40 ตร.ม.';
  if (document.getElementById('pd-rent')) document.getElementById('pd-rent').innerText = `฿${(prop.rent || 0).toLocaleString()} บาท`;
  if (document.getElementById('pd-deposit')) document.getElementById('pd-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()} บาท`;
  if (document.getElementById('pd-meter-elec')) document.getElementById('pd-meter-elec').innerText = prop.meterElec || '12345';
  if (document.getElementById('pd-meter-water')) document.getElementById('pd-meter-water').innerText = prop.meterWater || '67890';

  // Render Inventory List
  const invContainer = document.getElementById('pd-inventory-container');
  if (invContainer) {
    invContainer.innerHTML = '';
    const inventory = prop.inventoryList || [];
    if (inventory.length === 0) {
      invContainer.innerHTML = `<div class="text-stone-400 text-center py-4 font-bold">ยังไม่มีรายการเฟอร์นิเจอร์</div>`;
    } else {
      inventory.forEach(item => {
        const itemObj = typeof item === 'object' ? item : { name: item, img: CONFIG.PLACEHOLDER_SVG };
        invContainer.innerHTML += `
          <div class="p-2 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
            <span class="font-bold text-stone-800">${itemObj.name}</span>
            <img src="${itemObj.img || CONFIG.PLACEHOLDER_SVG}" class="w-10 h-8 object-cover rounded border border-stone-300 cursor-pointer" onclick="openMediaPreview('${itemObj.name}', this.src)">
          </div>
        `;
      });
    }
  }

  // 2. Loan & Retention Tab (subview-loan)
  const mortgage = calculateMortgage(prop.principal || 0, prop.installment || 0, prop.rate || 4.5, prop.startDate, prop.rateSchedule);
  if (document.getElementById('pd-balance-display')) document.getElementById('pd-balance-display').innerText = `฿${mortgage.balance.toLocaleString()}`;
  if (document.getElementById('pd-balance-progress')) document.getElementById('pd-balance-progress').innerText = `ผ่อนไปแล้ว ${mortgage.paidPct}% (ชำระเงินต้นแล้ว ฿${mortgage.paidPrincipal.toLocaleString()} / ดอกเบี้ยสะสม ฿${mortgage.paidInterest.toLocaleString()})`;
  if (document.getElementById('pd-principal-display')) document.getElementById('pd-principal-display').innerText = `฿${(prop.principal || 0).toLocaleString()}`;
  if (document.getElementById('pd-installment-display')) document.getElementById('pd-installment-display').innerText = `฿${(prop.installment || 0).toLocaleString()} /เดือน`;

  // Render Rate Schedule / Retention Summary
  const retContainer = document.getElementById('pd-rate-schedule-summary');
  if (retContainer) {
    retContainer.innerHTML = '';
    const schedule = prop.rateSchedule || [
      { startMonth: 1, endMonth: 36, rate: prop.rate || 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
      { startMonth: 37, endMonth: 360, rate: (prop.rate || 4.5) + 1.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
    ];

    schedule.forEach((item, idx) => {
      const startYear = Math.ceil(item.startMonth / 12);
      const endYear = Math.ceil(item.endMonth / 12);
      retContainer.innerHTML += `
        <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
          <div>
            <div class="font-extrabold text-[#383838]">📌 ช่วงเดือนที่ ${item.startMonth}–${item.endMonth} (ประมาณปีที่ ${startYear}–${endYear})</div>
            <div class="text-[11px] text-stone-500 font-medium">${item.label || 'ช่วงดอกเบี้ยสัญญาเงินกู้'}</div>
          </div>
          <div class="text-right">
            <span class="text-base font-black text-[#e05646]">${item.rate}%</span>
            <span class="text-[10px] text-stone-400 block font-bold">ต่อปี</span>
          </div>
        </div>
      `;
    });
  }

  // 3. Lessor Tab (subview-lessor)
  const profiles = (state && state.lessorProfiles) ? state.lessorProfiles : JSON.parse(localStorage.getItem('property_os_lessors') || '{}');
  const lessor = profiles[prop.lessorKey] || Object.values(profiles)[0] || { name: 'ผู้ให้เช่า', idCard: '-', address: '-', imageUrl: CONFIG.PLACEHOLDER_SVG };

  if (document.getElementById('pd-lessor-display')) document.getElementById('pd-lessor-display').innerText = lessor.name || 'ผู้ให้เช่า';
  if (document.getElementById('pd-lessor-detail')) document.getElementById('pd-lessor-detail').innerText = `บัตรประชาชน: ${lessor.idCard || '-'}`;
  if (document.getElementById('pd-lessor-address-detail')) document.getElementById('pd-lessor-address-detail').innerText = `ที่อยู่: ${lessor.address || '-'}`;
  if (document.getElementById('pd-lessor-card-img')) document.getElementById('pd-lessor-card-img').src = lessor.imageUrl || CONFIG.PLACEHOLDER_SVG;
}
window.renderPropertyDetailView = renderPropertyDetailView;

window.openAmortizationModal = function() {
  const prop = getCurrentProperty();
  if (!prop) {
    alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
    window.toggleModal('modal-add-property');
    return;
  }

  if (document.getElementById('amo-principal')) document.getElementById('amo-principal').value = prop.principal || 0;
  if (document.getElementById('amo-installment')) document.getElementById('amo-installment').value = prop.installment || 0;
  if (document.getElementById('amo-startdate')) document.getElementById('amo-startdate').value = prop.startDate || new Date().toISOString().split('T')[0];

  renderRatePeriodEditors(prop.rateSchedule);
  renderAmortizationTable();
  window.toggleModal('modal-amortization-table');
};

function renderRatePeriodEditors(schedule) {
  const container = document.getElementById('rate-periods-editor-container');
  if (!container) return;
  container.innerHTML = '';

  const list = schedule && schedule.length > 0 ? schedule : [
    { startMonth: 1, endMonth: 36, rate: 3.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
    { startMonth: 37, endMonth: 360, rate: 5.5, label: 'ลอยตัว MRR' }
  ];

  list.forEach((item, idx) => {
    addRatePeriodRow(item.startMonth, item.endMonth, item.rate, item.label, idx);
  });
}

window.addRatePeriodRow = function(start = 1, end = 36, rate = 4.5, label = 'ช่วง Retention', idx = Date.now()) {
  const container = document.getElementById('rate-periods-editor-container');
  if (!container) return;
  const rowId = `rate-row-${idx}`;
  const row = document.createElement('div');
  row.id = rowId;
  row.className = 'p-2.5 bg-white border border-stone-300 rounded-lg grid grid-cols-12 gap-2 items-center text-xs';
  row.innerHTML = `
    <div class="col-span-3 flex items-center gap-1">
      <span class="text-stone-400 font-bold">งวด</span>
      <input type="number" class="rp-start w-12 bg-stone-100 border border-stone-300 rounded p-1 text-center font-bold" value="${start}">
      <span class="text-stone-400">-</span>
      <input type="number" class="rp-end w-12 bg-stone-100 border border-stone-300 rounded p-1 text-center font-bold" value="${end}">
    </div>
    <div class="col-span-3 flex items-center gap-1">
      <span class="text-stone-400 font-bold">ดอกเบี้ย</span>
      <input type="number" step="0.1" class="rp-rate w-16 bg-stone-100 border border-stone-300 rounded p-1 text-right font-black text-[#e05646]" value="${rate}">
      <span class="text-stone-500 font-bold">%</span>
    </div>
    <div class="col-span-5">
      <input type="text" class="rp-label w-full bg-stone-100 border border-stone-300 rounded p-1 font-medium" value="${label}" placeholder="รายละเอียดช่วง Retention...">
    </div>
    <div class="col-span-1 text-right">
      <button type="button" onclick="document.getElementById('${rowId}').remove(); renderAmortizationTable();" class="text-rose-500 font-bold px-1.5 py-0.5 hover:bg-rose-50 rounded">✕</button>
    </div>
  `;
  container.appendChild(row);
};

window.renderAmortizationTable = function() {
  const prop = getCurrentProperty();
  const principal = parseFloat(document.getElementById('amo-principal')?.value) || (prop ? prop.principal : 0);
  const installment = parseFloat(document.getElementById('amo-installment')?.value) || (prop ? prop.installment : 0);
  const startDateStr = document.getElementById('amo-startdate')?.value || (prop ? prop.startDate : '') || new Date().toISOString().split('T')[0];

  const rowsContainer = document.getElementById('amortization-table-body');
  if (!rowsContainer) return;
  rowsContainer.innerHTML = '';

  // Get current rate schedule from editor inputs
  const periodRows = document.querySelectorAll('#rate-periods-editor-container > div');
  const rateSchedule = [];
  periodRows.forEach(r => {
    const start = parseInt(r.querySelector('.rp-start')?.value) || 1;
    const end = parseInt(r.querySelector('.rp-end')?.value) || 360;
    const rate = parseFloat(r.querySelector('.rp-rate')?.value) || 4.5;
    const label = r.querySelector('.rp-label')?.value || 'ช่วงผ่อนชำระ';
    rateSchedule.push({ startMonth: start, endMonth: end, rate, label });
  });

  let balance = principal;
  let totalPaidPrinc = 0;
  let totalPaidInt = 0;
  const startDate = new Date(startDateStr);

  for (let m = 1; m <= 360; m++) {
    if (balance <= 0) break;
    const rateObj = getRateForMonth(m, rateSchedule);
    const rate = rateObj.rate || 4.5;
    const monthlyRate = (rate / 100) / 12;
    const interest = balance * monthlyRate;
    let princPay = installment - interest;

    if (princPay <= 0) princPay = 0;
    if (princPay > balance) princPay = balance;

    balance -= princPay;
    totalPaidPrinc += princPay;
    totalPaidInt += interest;

    const curDate = new Date(startDate);
    curDate.setMonth(curDate.getMonth() + m - 1);
    const dateTxt = curDate.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' });

    rowsContainer.innerHTML += `
      <tr class="border-b border-stone-200 hover:bg-stone-50 text-xs">
        <td class="p-2 text-center font-bold text-stone-700">${m}</td>
        <td class="p-2 text-center font-medium text-stone-600">${dateTxt}</td>
        <td class="p-2 text-right font-black text-[#e05646]">฿${installment.toLocaleString()}</td>
        <td class="p-2 text-right font-bold text-stone-800">${rate}% <span class="text-[10px] text-stone-400 font-normal block">(฿${Math.round(interest).toLocaleString()})</span></td>
        <td class="p-2 text-right font-bold text-emerald-700">฿${Math.round(princPay).toLocaleString()}</td>
        <td class="p-2 text-right font-black text-stone-900">฿${Math.round(balance).toLocaleString()}</td>
        <td class="p-2 text-center"><span class="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-bold">งวดที่ ${m}</span></td>
      </tr>
    `;
  }

  if (document.getElementById('amo-sum-balance')) document.getElementById('amo-sum-balance').innerText = `฿${Math.round(balance).toLocaleString()}`;
  if (document.getElementById('amo-sum-paid-princ')) document.getElementById('amo-sum-paid-princ').innerText = `฿${Math.round(totalPaidPrinc).toLocaleString()}`;
  if (document.getElementById('amo-sum-paid-int')) document.getElementById('amo-sum-paid-int').innerText = `฿${Math.round(totalPaidInt).toLocaleString()}`;
};

window.applyAmortizationEdit = async function() {
  const prop = getCurrentProperty();
  if (!prop) return;

  const principal = parseFloat(document.getElementById('amo-principal')?.value) || prop.principal;
  const installment = parseFloat(document.getElementById('amo-installment')?.value) || prop.installment;
  const startDateStr = document.getElementById('amo-startdate')?.value || prop.startDate;

  const periodRows = document.querySelectorAll('#rate-periods-editor-container > div');
  const rateSchedule = [];
  periodRows.forEach(r => {
    const start = parseInt(r.querySelector('.rp-start')?.value) || 1;
    const end = parseInt(r.querySelector('.rp-end')?.value) || 360;
    const rate = parseFloat(r.querySelector('.rp-rate')?.value) || 4.5;
    const label = r.querySelector('.rp-label')?.value || 'ช่วงผ่อนชำระ';
    rateSchedule.push({ startMonth: start, endMonth: end, rate, label });
  });

  prop.principal = principal;
  prop.installment = installment;
  prop.startDate = startDateStr;
  prop.rateSchedule = rateSchedule;

  saveStateToLocalStorage();
  renderAdminData();
  renderPropertyDetailView();
  window.toggleModal('modal-amortization-table');
  alert(`บันทึกคำนวณตารางผ่อนชำระ & กำหนดการ Retention ของ "${prop.name}" เรียบร้อยแล้ว!`);

  try {
    await fetch('/api/properties', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop)
    });
  } catch (err) {
    console.warn('DB Sync Warning:', err);
  }
};

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

  try {
    const resL = await fetch('/api/lessors');
    if (resL.ok) {
      const dbLessors = await resL.json();
      if (Array.isArray(dbLessors) && dbLessors.length > 0) {
        dbLessors.forEach(l => {
          if (l.id) state.lessorProfiles[l.id] = l;
        });
      }
    }
  } catch (e) {}

  state.currentPropertyId = state.propertiesState.length > 0 ? state.propertiesState[0].id : '';
  
  const savedRole = getCurrentRole();
  setCurrentRole(savedRole);

  renderAdminData();
  renderPropertyDetailView();
  renderContractView();
  renderRegisteredLessorsList();
  renderRegisteredTenantsList();
  renderAdminAccountsList();
  renderLessorSelectOptions();
  initTenantFormDates();
  applyRolePermissions();

  if (savedRole === 'landlord') {
    if (window.switchTab) window.switchTab('admin');
  } else {
    if (window.switchTab) window.switchTab('landing');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
