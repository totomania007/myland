/**
 * YOUESTATES PROPERTY OS — STANDARD A4 LEASE CONTRACT MODULE
 * 2026 Modular Thai Standard 7-Clause Lease Agreement & Annexes 1-3
 */

import { CONFIG, state } from '../config.js';
import { getCurrentProperty } from './landlord.js';

export function renderContractView() {
  const prop = getCurrentProperty();
  const currentLessor = prop ? (state.lessorProfiles[prop.lessorKey] || { name: 'ผู้ให้เช่า', age: '-', address: '-', imageUrl: CONFIG.PLACEHOLDER_SVG }) : { name: 'ผู้ให้เช่า', age: '-', address: '-', imageUrl: CONFIG.PLACEHOLDER_SVG };
  const tenant = state.currentTenant || { fullName: 'ผู้เช่า', age: '-', address: '-', duration: '1', startDate: '', imageUrl: CONFIG.PLACEHOLDER_SVG };

  if (document.getElementById('c-lessor-name-1')) document.getElementById('c-lessor-name-1').innerText = currentLessor.name || 'ผู้ให้เช่า';
  if (document.getElementById('c-lessor-age-1')) document.getElementById('c-lessor-age-1').innerText = currentLessor.age || '-';
  if (document.getElementById('c-lessor-address-1')) document.getElementById('c-lessor-address-1').innerText = currentLessor.address || '-';
  
  if (document.getElementById('c-lessee-name-1')) document.getElementById('c-lessee-name-1').innerText = tenant.fullName || 'ผู้เช่า';
  if (document.getElementById('c-lessee-age-1')) document.getElementById('c-lessee-age-1').innerText = tenant.age || '-';
  if (document.getElementById('c-lessee-address-1')) document.getElementById('c-lessee-address-1').innerText = tenant.address || '-';
  if (document.getElementById('c-house-no-1')) document.getElementById('c-house-no-1').innerText = prop ? prop.houseNo : '-';
  if (document.getElementById('c-full-address-1')) {
    document.getElementById('c-full-address-1').innerText = prop ? (prop.address || '-') : '-';
  }

  if (document.getElementById('c-duration-1')) document.getElementById('c-duration-1').innerText = tenant.duration || '1';

  if (tenant.startDate) {
    const sD = new Date(tenant.startDate);
    if (document.getElementById('c-start-date-1')) document.getElementById('c-start-date-1').innerText = sD.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
  } else {
    if (document.getElementById('c-start-date-1')) document.getElementById('c-start-date-1').innerText = '-';
  }

  if (document.getElementById('c-rent-1')) document.getElementById('c-rent-1').innerText = prop ? prop.rent.toLocaleString() : '0';
  if (document.getElementById('c-deposit-1')) document.getElementById('c-deposit-1').innerText = prop ? prop.deposit.toLocaleString() : '0';
  if (document.getElementById('sig-lessor-1')) document.getElementById('sig-lessor-1').innerText = currentLessor.name || 'ผู้ให้เช่า';
  if (document.getElementById('sig-lessee-1')) document.getElementById('sig-lessee-1').innerText = tenant.fullName || 'ผู้เช่า';

  if (document.getElementById('c-card-img-1')) document.getElementById('c-card-img-1').src = tenant.imageUrl || CONFIG.PLACEHOLDER_SVG;
  if (document.getElementById('c-lessor-card-img-1')) document.getElementById('c-lessor-card-img-1').src = currentLessor.imageUrl || CONFIG.PLACEHOLDER_SVG;

  const tBody = document.getElementById('c-inventory-table-body');
  if (tBody) {
    tBody.innerHTML = '';
    if (prop && prop.inventoryList) {
      prop.inventoryList.forEach((item, idx) => {
        const name = typeof item === 'object' ? item.name : item;
        const img = typeof item === 'object' && item.img ? item.img : CONFIG.PLACEHOLDER_SVG;

        tBody.innerHTML += `
          <tr class="border-b border-slate-300">
            <td class="border border-slate-400 p-1.5 text-center font-bold">${idx + 1}</td>
            <td class="border border-slate-400 p-1.5 font-semibold text-slate-900">${name}</td>
            <td class="border border-slate-400 p-1.5 text-center">1 ชุด/เครื่อง</td>
            <td class="border border-slate-400 p-1.5 text-center text-slate-800 font-bold">สมบูรณ์ดี</td>
            <td class="border border-slate-400 p-1 text-center font-bold text-slate-500">
              <img src="${img}" class="w-12 h-8 object-cover mx-auto rounded border border-slate-300 cursor-pointer" onclick="window.openMediaPreview('${name}', '${img}')">
            </td>
          </tr>
        `;
      });
    }
  }
}
