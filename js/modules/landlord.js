/**
 * YOUESTATES PROPERTY OS — LANDLORD PORT OS MODULE
 * 2026 Modular Portfolio & Financial Amortization System
 */

import { CONFIG, state, saveStateToLocalStorage } from '../config.js';

export function getRateForMonth(monthIndex, rateSchedule) {
  if (!rateSchedule || rateSchedule.length === 0) {
    return { rate: 4.5, label: 'ปีที่ 1-30' };
  }
  for (let i = 0; i < rateSchedule.length; i++) {
    const period = rateSchedule[i];
    if (monthIndex >= period.startMonth && monthIndex <= period.endMonth) {
      return period;
    }
  }
  return rateSchedule[rateSchedule.length - 1];
}

export function calculateMortgage(principal, monthlyPayment, annualRate, startDateStr, rateSchedule) {
  let balance = principal;
  let paidPrincipal = 0;
  let paidInterest = 0;
  let months = 0;

  for (let i = 1; i <= 360; i++) {
    if (balance <= 0) break;
    const periodObj = getRateForMonth(i, rateSchedule);
    const currentRate = periodObj.rate || annualRate || 4.5;
    const monthlyRate = (currentRate / 100) / 12;
    const interest = balance * monthlyRate;

    let princPay = monthlyPayment - interest;
    if (princPay <= 0) princPay = 0;
    if (princPay > balance) princPay = balance;

    balance -= princPay;
    paidPrincipal += princPay;
    paidInterest += interest;
    months++;
  }

  const years = (months / 12).toFixed(1);
  const paidPct = principal > 0 ? Math.round((paidPrincipal / principal) * 100) : 0;
  return { months, yearsTxt: `${months} งวด (${years} ปี)`, balance, paidPrincipal: Math.round(paidPrincipal), paidInterest: Math.round(paidInterest), paidPct };
}

export function renderAdminData() {
  const container = document.getElementById('propertyContainer');
  if (!container) return;

  container.innerHTML = '';
  let totP = 0;
  let totBal = 0;
  let totInc = 0;
  let totInst = 0;

  if (state.propertiesState.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
        <p class="font-bold">ยังไม่มีทรัพย์สินในพอร์ต</p>
        <p class="text-xs">กดปุ่ม "+ เพิ่มทรัพย์สิน" ด้านบนเพื่อเริ่มบันทึกอสังหาริมทรัพย์ยูนิตแรก</p>
      </div>
    `;
  } else {
    state.propertiesState.forEach((p) => {
      totP += (p.principal || 0);
      totInc += (p.income || p.rent || 0);
      totInst += (p.installment || 0);

      const mortgage = calculateMortgage(p.principal || 0, p.installment || 0, p.rate || 4.5, p.startDate, p.rateSchedule);
      totBal += mortgage.balance;

      const lessorName = (state.lessorProfiles[p.lessorKey] && state.lessorProfiles[p.lessorKey].name) ? state.lessorProfiles[p.lessorKey].name : 'ผู้ให้เช่า';
      const houseNoTxt = p.houseNo ? ` (${p.houseNo})` : '';

      container.innerHTML += `
        <div class="youestates-card p-6 space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <span class="px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 font-bold text-[10px] uppercase border border-stone-300">
                ${p.type || 'อสังหาฯ เช่า'}
              </span>
              <h3 class="font-extrabold text-base text-[#383838] mt-1">🏡 ${p.name}${houseNoTxt}</h3>
              <p class="text-xs text-stone-500 font-medium">ผู้ให้เช่า: ${lessorName}</p>
            </div>
            <span class="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
               active
            </span>
          </div>

          <div class="space-y-2 text-xs border-t border-b border-stone-200 py-3">
            <div class="flex justify-between"><span class="text-stone-500">ยอดกู้เริ่มต้น:</span> <strong class="text-stone-800">฿${(p.principal || 0).toLocaleString()}</strong></div>
            <div class="flex justify-between"><span class="text-stone-500">ค่างวดผ่อน:</span> <strong class="text-[#e05646]">฿${(p.installment || 0).toLocaleString()} /เดือน</strong></div>
            <div class="flex justify-between"><span class="text-stone-500">อัตราค่าเช่า:</span> <strong class="text-emerald-700">฿${(p.rent || 0).toLocaleString()} /เดือน</strong></div>
            <div class="flex justify-between"><span class="text-stone-500">เงินต้นคงเหลือผ่อนชำระ:</span> <strong class="text-stone-900">฿${mortgage.balance.toLocaleString()}</strong></div>
          </div>

          <div class="flex justify-between items-center pt-1">
            <span class="text-xs text-stone-400 font-semibold">ผ่อนชำระ: ${mortgage.paidPct}%</span>
            <button onclick="window.selectPropertyView('${p.id}')" class="text-xs text-[#e05646] font-bold hover:underline">
              ดูรายละเอียดทรัพย์สิน & สินเชื่อ ➔
            </button>
          </div>
        </div>
      `;
    });
  }

  const net = totInc - totInst;
  const pct = totP > 0 ? Math.round(((totP - totBal) / totP) * 100) : 0;

  if (document.getElementById('m-principal')) document.getElementById('m-principal').innerText = `฿${totBal.toLocaleString()}`;
  if (document.getElementById('m-progress-bar')) document.getElementById('m-progress-bar').style.width = pct + '%';
  if (document.getElementById('m-progress-txt')) document.getElementById('m-progress-txt').innerText = pct + '%';
  if (document.getElementById('m-income')) document.getElementById('m-income').innerText = `฿${totInc.toLocaleString()}`;
  if (document.getElementById('m-installment')) document.getElementById('m-installment').innerText = `฿${totInst.toLocaleString()}`;
  if (document.getElementById('m-cashflow')) document.getElementById('m-cashflow').innerText = `+฿${net.toLocaleString()}`;
}

export function getCurrentProperty() {
  if (state.propertiesState.length === 0) return null;
  return state.propertiesState.find(p => p.id === state.currentPropertyId) || state.propertiesState[0];
}

export function renderRegisteredLessorsList() {
  const container = document.getElementById('registered-lessors-container');
  if (!container) return;
  container.innerHTML = '';
  const keys = Object.keys(state.lessorProfiles);

  if (keys.length === 0) {
    container.innerHTML = `<div class="col-span-full text-stone-400 font-bold p-4 bg-stone-50 rounded-xl border border-stone-200">ยังไม่มีผู้ให้เช่าที่ลงทะเบียนในระบบ</div>`;
    return;
  }

  keys.forEach(key => {
    const prof = state.lessorProfiles[key];
    container.innerHTML += `
      <div class="p-3 bg-stone-100 border border-stone-300 rounded-xl space-y-1">
        <div class="font-extrabold text-stone-800">${prof.name}</div>
        <div class="text-[11px] text-stone-500">บัตรประชาชน: ${prof.idCard || '-'}</div>
        <div class="text-[11px] text-stone-500">โทร: ${prof.phone || '-'}</div>
        <button onclick="window.editRegisteredLessor('${key}')" class="w-full mt-1 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-bold rounded">
          ✏️ แก้ไขข้อมูลผู้ให้เช่านี้
        </button>
      </div>
    `;
  });
}

export function handleAddPropertySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('p-name').value;
  const houseNo = document.getElementById('p-houseno').value;
  const address = document.getElementById('p-address').value;
  const lessorKey = document.getElementById('p-lessor').value;
  const principal = parseFloat(document.getElementById('p-principal').value) || 0;
  const installment = parseFloat(document.getElementById('p-installment').value) || 0;
  const startDate = document.getElementById('p-startdate').value;

  const newId = 'prop-' + Date.now();
  const newProp = {
    id: newId,
    name,
    houseNo,
    address,
    lessorKey,
    principal,
    installment,
    rent: Math.round(installment * 1.25),
    deposit: Math.round(installment * 2),
    startDate,
    type: 'อสังหาฯ เช่า',
    size: '40 ตร.ม.',
    gallery: [],
    inventoryList: [
      { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
      { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: CONFIG.PLACEHOLDER_SVG },
      { name: 'ตู้เสื้อผ้า Built-in (Built-in Wardrobe)', img: CONFIG.PLACEHOLDER_SVG }
    ]
  };

  state.propertiesState.push(newProp);
  state.currentPropertyId = newId;
  saveStateToLocalStorage();

  renderAdminData();
  if (window.renderPropertyDetailView) window.renderPropertyDetailView();
  if (window.toggleModal) window.toggleModal('modal-add-property');
  alert(`บันทึกเพิ่มทรัพย์สิน "${name}" สำเร็จแล้ว!`);
}

export function handleLessorRegisterTabSubmit(e) {
  e.preventDefault();
  const fullName = document.getElementById('reg-lp-fullname').value;
  const key = 'lessor-' + Date.now();
  
  state.lessorProfiles[key] = {
    name: fullName,
    idCard: document.getElementById('reg-lp-idcard').value,
    age: parseInt(document.getElementById('reg-lp-age').value) || 45,
    phone: document.getElementById('reg-lp-phone').value || '',
    address: document.getElementById('reg-lp-address').value,
    imageUrl: state.lessorProfiles[key]?.imageUrl || CONFIG.PLACEHOLDER_SVG
  };

  saveStateToLocalStorage();
  renderRegisteredLessorsList();
  if (window.renderLessorSelectOptions) window.renderLessorSelectOptions();
  if (window.renderPropertyDetailView) window.renderPropertyDetailView();
  if (window.renderContractView) window.renderContractView();
  renderAdminData();
  alert(`ลงทะเบียนผู้ให้เช่า "${fullName}" เรียบร้อยแล้ว!`);
  document.getElementById('reg-lp-fullname').value = '';
  document.getElementById('reg-lp-idcard').value = '';
  document.getElementById('reg-lp-address').value = '';
  document.getElementById('reg-lp-phone').value = '';
}

export function editRegisteredLessor(key) {
  const prof = state.lessorProfiles[key];
  if (!prof) return;
  if (document.getElementById('reg-lp-fullname')) document.getElementById('reg-lp-fullname').value = prof.name || '';
  if (document.getElementById('reg-lp-idcard')) document.getElementById('reg-lp-idcard').value = prof.idCard || '';
  if (document.getElementById('reg-lp-age')) document.getElementById('reg-lp-age').value = prof.age || 45;
  if (document.getElementById('reg-lp-phone')) document.getElementById('reg-lp-phone').value = prof.phone || '';
  if (document.getElementById('reg-lp-address')) document.getElementById('reg-lp-address').value = prof.address || '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export async function uploadToCloudinaryAndPreview(e, targetType, targetIndex) {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CONFIG.CLOUDINARY_CONFIG.UPLOAD_PRESET);

    if (targetType === 'tenant' && document.getElementById('fileText')) {
      document.getElementById('fileText').innerText = `⏳ กำลังอัปโหลดขึ้น Cloudinary (${CONFIG.CLOUDINARY_CONFIG.CLOUD_NAME})...`;
    }
    if (targetType === 'lessor-tab' && document.getElementById('lessorTabFileText')) {
      document.getElementById('lessorTabFileText').innerText = `⏳ กำลังอัปโหลดรูปบัตรขึ้น Cloudinary...`;
    }

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      const cloudUrl = data.secure_url || data.url || URL.createObjectURL(file);

      if (targetType === 'tenant') {
        state.currentTenant.imageUrl = cloudUrl;
        if (document.getElementById('imagePreview')) document.getElementById('imagePreview').src = cloudUrl;
        if (document.getElementById('imagePreviewContainer')) document.getElementById('imagePreviewContainer').classList.remove('hidden');
        if (document.getElementById('fileText')) document.getElementById('fileText').innerText = `✅ อัปโหลดขึ้น Cloudinary (${CONFIG.CLOUDINARY_CONFIG.CLOUD_NAME}) สำเร็จ!`;
      } else if (targetType === 'lessor' || targetType === 'lessor-tab') {
        const keys = Object.keys(state.lessorProfiles);
        if (keys.length > 0) {
          const activeKey = keys[0];
          state.lessorProfiles[activeKey].imageUrl = cloudUrl;
          if (document.getElementById('pd-lessor-card-img')) document.getElementById('pd-lessor-card-img').src = cloudUrl;
        }
        if (document.getElementById('lessorTabFileText')) {
          document.getElementById('lessorTabFileText').innerText = `✅ อัปโหลดบัตรประชาชนผู้ให้เช่าขึ้น Cloudinary สำเร็จ!`;
        }
        saveStateToLocalStorage();
      }
      if (window.renderContractView) window.renderContractView();
    } catch(err) {
      const url = URL.createObjectURL(file);
      if (targetType === 'tenant') {
        state.currentTenant.imageUrl = url;
        if (document.getElementById('imagePreview')) document.getElementById('imagePreview').src = url;
        if (document.getElementById('imagePreviewContainer')) document.getElementById('imagePreviewContainer').classList.remove('hidden');
      }
    }
  }
}

