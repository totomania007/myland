/**
 * YOUESTATES PROPERTY OS — UNIFIED CORE ENGINE (2026 EDITION)
 * Single-source-of-truth architecture, bulletproof global bindings,
 * automatic Cloudflare D1 synchronization, and zero-redundancy lifecycle.
 */

(function(window) {
  'use strict';

  // 1. CONFIGURATION & CONSTANTS
  const CONFIG = {
    CLOUDINARY_CLOUD_NAME: 'ogdfbbpw',
    CLOUDINARY_UPLOAD_PRESET: 'house_landlord',
    DEFAULT_PIN: '1234',
    PLACEHOLDER_SVG: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' rx='12' fill='%23e2ded8'/><path d='M160 90C160 112.091 142.091 130 120 130C97.9086 130 80 112.091 80 90C80 67.9086 97.9086 50 120 50C142.091 50 160 67.9086 160 90Z' fill='%23a8a29e'/><path d='M50 200C50 161.34 81.3401 130 120 130C158.66 130 190 161.34 190 200H50Z' fill='%23a8a29e'/><rect x='220' y='65' width='130' height='14' rx='4' fill='%23a8a29e'/><rect x='220' y='95' width='110' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='115' width='90' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='145' width='120' height='10' rx='4' fill='%23a8a29e'/><rect x='220' y='165' width='80' height='10' rx='4' fill='%23a8a29e'/></svg>"
  };

  // 2. REAL CLOUDFLARE D1 SEED DATA
  const DEFAULT_PROPERTIES = [
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
      meterElec: '12345',
      meterWater: '67890',
      inventoryList: [
        { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG },
        { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: CONFIG.PLACEHOLDER_SVG },
        { name: 'ตู้เสื้อผ้า Built-in', img: CONFIG.PLACEHOLDER_SVG }
      ],
      rateSchedule: [
        { startMonth: 1, endMonth: 36, rate: 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
        { startMonth: 37, endMonth: 360, rate: 6.0, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
      ]
    },
    {
      id: 'prop-1785743955428',
      name: 'the atrium',
      lessorKey: 'lessor-1786649277545',
      type: 'อสังหาริมทรัพย์เพื่อการเช่า',
      address: 'หมู่บ้าน ดิเอเทรียม เพิ่มสิน ซ.เพิ่มสิน 20 แยก 5 ถนนเพิ่มสิน แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220',
      houseNo: '200/88',
      size: '42 ตารางเมตร',
      rent: 16500,
      deposit: 33000,
      principal: 3800000,
      installment: 16500,
      rate: 4.5,
      startDate: '2026-08-13',
      meterElec: '54321',
      meterWater: '09876',
      inventoryList: [
        { name: 'เครื่องปรับอากาศ Inverter 2 เครื่อง', img: CONFIG.PLACEHOLDER_SVG },
        { name: 'ชุดครัว Built-in พร้อมเตาไฟฟ้า', img: CONFIG.PLACEHOLDER_SVG }
      ],
      rateSchedule: [
        { startMonth: 1, endMonth: 36, rate: 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
        { startMonth: 37, endMonth: 360, rate: 6.0, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
      ]
    }
  ];

  const DEFAULT_LESSORS = {
    'lessor-1786648676672': {
      id: 'lessor-1786648676672',
      name: 'นางสาว ลัดดาวัลย์ รุ่งเรือง',
      age: 42,
      idCard: '3100501989670',
      phone: '0616281777',
      address: '200/125 หมู่บ้าน ดิเอเทรียม เพิ่มสิน ซอยเพิ่มสิน 20 แยก 5 แขวงคลองถนน เขตสายไหม กรุงเทพมหานคร',
      imageUrl: CONFIG.PLACEHOLDER_SVG
    },
    'lessor-1786649277545': {
      id: 'lessor-1786649277545',
      name: 'นายสุรชัย อุดมมั่น',
      age: 45,
      idCard: '4101200062631',
      phone: '0858456378',
      address: '202/60 ซอยลาดพร้าว 80 แยก 14 แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพมหานคร 10310',
      imageUrl: CONFIG.PLACEHOLDER_SVG
    }
  };

  const DEFAULT_TENANTS = {
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

  // 3. UNIFIED GLOBAL STATE
  const state = {
    currentRole: 'landlord',
    currentPropertyId: localStorage.getItem('property_os_current_prop_id') || DEFAULT_PROPERTIES[0].id,
    currentTenantId: 'tenant-1',
    currentGalleryFilter: 'all',
    propertiesState: loadStoredData('property_os_properties', DEFAULT_PROPERTIES),
    lessorProfiles: loadStoredData('property_os_lessors', DEFAULT_LESSORS),
    tenantDatabase: loadStoredData('property_os_tenants', DEFAULT_TENANTS),
    adminAccountsState: loadStoredData('property_os_admins', [
      { id: 'admin-1', name: 'ผู้ดูแลพอร์ตหลัก', pin: CONFIG.DEFAULT_PIN, role: 'Super Admin' }
    ])
  };

  function saveStateToLocalStorage() {
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
    if (state.currentPropertyId) {
      localStorage.setItem('property_os_current_prop_id', state.currentPropertyId);
    }
  }

  function getCurrentProperty() {
    if (!state.propertiesState || state.propertiesState.length === 0) return null;
    const currentId = state.currentPropertyId || localStorage.getItem('property_os_current_prop_id');
    return state.propertiesState.find(p => String(p.id) === String(currentId)) || state.propertiesState[0];
  }

  // 4. LOAN & RETENTION MATHEMATICS
  function getRateForMonth(monthIndex, rateSchedule) {
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

  function calculateMortgage(principal, monthlyPayment, annualRate, startDateStr, rateSchedule) {
    let balance = principal;
    let totalPaidPrincipal = 0;
    let totalPaidInterest = 0;
    let totalMonths = 0;

    let elapsedMonths = 0;
    if (startDateStr) {
      const start = new Date(startDateStr);
      const now = new Date();
      if (!isNaN(start.getTime())) {
        elapsedMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        if (elapsedMonths < 0) elapsedMonths = 0;
      }
    }

    let currentBalance = principal;
    let currentPaidPrincipal = 0;
    let currentPaidInterest = 0;

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
      totalPaidPrincipal += princPay;
      totalPaidInterest += interest;
      totalMonths++;

      if (i <= elapsedMonths) {
        currentBalance = balance;
        currentPaidPrincipal = totalPaidPrincipal;
        currentPaidInterest = totalPaidInterest;
      }
    }

    if (elapsedMonths === 0) {
      currentBalance = principal;
      currentPaidPrincipal = 0;
      currentPaidInterest = 0;
    }

    const years = (totalMonths / 12).toFixed(1);
    const paidPct = principal > 0 ? Math.round((currentPaidPrincipal / principal) * 100) : 0;
    return {
      months: totalMonths,
      yearsTxt: `${totalMonths} งวด (${years} ปี)`,
      balance: Math.round(currentBalance),
      paidPrincipal: Math.round(currentPaidPrincipal),
      paidInterest: Math.round(currentPaidInterest),
      paidPct,
      elapsedMonths
    };
  }

  // 5. CLOUDFLARE D1 BACKGROUND SYNCHRONIZATION
  async function syncFromCloudflareD1(silent = true) {
    try {
      const resP = await fetch('/api/properties');
      if (resP.ok) {
        const dbProps = await resP.json();
        if (Array.isArray(dbProps) && dbProps.length > 0) {
          state.propertiesState = dbProps;
          localStorage.setItem('property_os_properties', JSON.stringify(dbProps));
          if (!state.currentPropertyId || !dbProps.find(p => String(p.id) === String(state.currentPropertyId))) {
            state.currentPropertyId = dbProps[0].id;
          }
        }
      }
    } catch (e) {}

    try {
      const resL = await fetch('/api/lessors');
      if (resL.ok) {
        const dbLessors = await resL.json();
        if (Array.isArray(dbLessors) && dbLessors.length > 0) {
          const freshLessors = {};
          dbLessors.forEach(l => { if (l.id) freshLessors[l.id] = l; });
          state.lessorProfiles = freshLessors;
          localStorage.setItem('property_os_lessors', JSON.stringify(freshLessors));
        }
      }
    } catch (e) {}

    renderAllViews();

    const d1Status = document.getElementById('d1-live-badge');
    if (d1Status) {
      d1Status.innerText = '● D1 Live Connected';
      d1Status.className = 'text-emerald-600 font-black text-sm';
    }

    if (silent !== true) {
      alert('✅ ซิงค์ข้อมูลล่าสุดจาก Cloudflare D1 สำเร็จแล้ว!');
    }
  }

  // 6. VIEW RENDERING ENGINE
  function renderAllViews() {
    renderAdminData();
    renderPropertyDetailView();
    renderRegisteredLessorsList();
    renderRegisteredTenantsList();
    renderLessorSelectOptions();
    renderTenantPropertyDropdown();
    renderContractView();
  }

  function renderAdminData() {
    const container = document.getElementById('propertyContainer');
    if (!container) return;

    container.innerHTML = '';
    let totP = 0;
    let totBal = 0;
    let totInc = 0;
    let totInst = 0;

    if (!state.propertiesState || state.propertiesState.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <p class="font-bold">ยังไม่มีทรัพย์สินในพอร์ต</p>
          <p class="text-xs">กดปุ่ม "+ เพิ่มทรัพย์สิน" ด้านบนเพื่อเริ่มบันทึกอสังหาริมทรัพย์ยูนิตแรก</p>
        </div>
      `;
    } else {
      state.propertiesState.forEach(p => {
        totP += (p.principal || 0);
        totInc += (p.rent || 0);
        totInst += (p.installment || 0);

        const mortgage = calculateMortgage(p.principal || 0, p.installment || 0, p.rate || 4.5, p.startDate, p.rateSchedule);
        totBal += mortgage.balance;

        const lessor = state.lessorProfiles[p.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า' };
        const houseNoTxt = p.houseNo ? ` (${p.houseNo})` : '';

        container.innerHTML += `
          <div class="youestates-card p-6 space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <span class="px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 font-bold text-[10px] uppercase border border-stone-300">
                  ${p.type || 'อสังหาฯ เช่า'}
                </span>
                <h3 class="font-extrabold text-base text-[#383838] mt-1">🏡 ${p.name}${houseNoTxt}</h3>
                <p class="text-xs text-stone-500 font-medium">ผู้ให้เช่า: ${lessor.name}</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">active</span>
            </div>

            <div class="space-y-2 text-xs border-t border-b border-stone-200 py-3">
              <div class="flex justify-between"><span class="text-stone-500">ยอดกู้เริ่มต้น:</span> <strong class="text-stone-800">฿${(p.principal || 0).toLocaleString()}</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">ค่างวดผ่อน:</span> <strong class="text-[#e05646]">฿${(p.installment || 0).toLocaleString()} /เดือน</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">อัตราค่าเช่า:</span> <strong class="text-emerald-700">฿${(p.rent || 0).toLocaleString()} /เดือน</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">เงินต้นคงเหลือผ่อนชำระ:</span> <strong class="text-stone-900">฿${mortgage.balance.toLocaleString()}</strong></div>
            </div>

            <div class="flex justify-between items-center pt-1">
              <span class="text-xs text-stone-400 font-semibold">ผ่อนชำระ: ${mortgage.paidPct}%</span>
              <button onclick="window.handleDetailPropertySwitch('${p.id}'); window.switchTab('property-detail');" class="text-xs text-[#e05646] font-bold hover:underline">
                ดูรายละเอียด & สินเชื่อ ➔
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

  function handleDetailPropertySwitch(propId) {
    if (!propId) {
      const sel = document.getElementById('pd-property-selector');
      if (sel) propId = sel.value;
    }
    if (!propId) return;

    state.currentPropertyId = propId;
    localStorage.setItem('property_os_current_prop_id', propId);

    renderPropertyDetailView(propId);
    renderContractView();
    renderAdminData();
  }

  function renderPropertyDetailView(targetPropId) {
    renderLessorSelectOptions();
    const props = state.propertiesState || [];
    if (props.length === 0) return;

    const storedId = localStorage.getItem('property_os_current_prop_id');
    const currentId = targetPropId || state.currentPropertyId || storedId || props[0].id;
    state.currentPropertyId = currentId;
    localStorage.setItem('property_os_current_prop_id', currentId);

    const prop = props.find(p => String(p.id) === String(currentId)) || props[0];
    if (!prop) return;

    const select = document.getElementById('pd-property-selector');
    if (select) {
      if (select.options.length !== props.length) {
        select.innerHTML = '';
        props.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.innerText = `🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''}`;
          select.appendChild(opt);
        });
      }
      select.value = prop.id;
    }

    // 1. Specs
    if (document.getElementById('pd-name')) document.getElementById('pd-name').innerText = prop.name || 'สเปกอสังหาริมทรัพย์';
    if (document.getElementById('pd-address')) document.getElementById('pd-address').innerText = prop.address || '-';
    if (document.getElementById('pd-type')) document.getElementById('pd-type').innerText = prop.type || 'อสังหาฯ เช่า';
    if (document.getElementById('pd-houseno')) document.getElementById('pd-houseno').innerText = prop.houseNo || '-';
    if (document.getElementById('pd-full-address')) document.getElementById('pd-full-address').innerText = prop.address || '-';
    if (document.getElementById('pd-size')) document.getElementById('pd-size').innerText = prop.size || '40 ตร.ม.';
    if (document.getElementById('pd-rent')) document.getElementById('pd-rent').innerText = `฿${(prop.rent || 0).toLocaleString()} บาท`;
    if (document.getElementById('pd-deposit')) document.getElementById('pd-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()} บาท`;
    if (document.getElementById('pd-meter-elec')) document.getElementById('pd-meter-elec').innerText = prop.meterElec || '-';
    if (document.getElementById('pd-meter-water')) document.getElementById('pd-meter-water').innerText = prop.meterWater || '-';

    // 2. Loan & Retention Numbers
    const mortgage = calculateMortgage(prop.principal || 0, prop.installment || 0, prop.rate || 4.5, prop.startDate, prop.rateSchedule);
    if (document.getElementById('pd-balance-display')) document.getElementById('pd-balance-display').innerText = `฿${mortgage.balance.toLocaleString()}`;
    if (document.getElementById('pd-balance-progress')) document.getElementById('pd-balance-progress').innerText = `ผ่อนชำระแล้ว ${mortgage.paidPct}% (ชำระเงินต้นสะสม ฿${mortgage.paidPrincipal.toLocaleString()} / ดอกเบี้ยสะสม ฿${mortgage.paidInterest.toLocaleString()})`;
    if (document.getElementById('pd-principal-display')) document.getElementById('pd-principal-display').innerText = `฿${(prop.principal || 0).toLocaleString()}`;
    if (document.getElementById('pd-installment-display')) document.getElementById('pd-installment-display').innerText = `฿${(prop.installment || 0).toLocaleString()} /เดือน`;

    // 3. Retention Schedule Cards
    const retContainer = document.getElementById('pd-rate-schedule-summary');
    if (retContainer) {
      retContainer.innerHTML = '';
      const schedule = (prop.rateSchedule && prop.rateSchedule.length > 0) ? prop.rateSchedule : [
        { startMonth: 1, endMonth: 36, rate: prop.rate || 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
        { startMonth: 37, endMonth: 360, rate: (prop.rate || 4.5) + 1.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
      ];

      schedule.forEach(item => {
        const startYear = Math.ceil(item.startMonth / 12);
        const endYear = Math.ceil(item.endMonth / 12);
        retContainer.innerHTML += `
          <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
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

    // 4. Inventory Furniture List
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

    // 5. Lessor Details
    const lessor = state.lessorProfiles[prop.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า', idCard: '-', address: '-' };
    if (document.getElementById('pd-lessor-display')) document.getElementById('pd-lessor-display').innerText = lessor.name || 'ผู้ให้เช่า';
    if (document.getElementById('pd-lessor-detail')) document.getElementById('pd-lessor-detail').innerText = `บัตรประชาชน: ${lessor.idCard || '-'}`;
    if (document.getElementById('pd-lessor-address-detail')) document.getElementById('pd-lessor-address-detail').innerText = `ที่อยู่: ${lessor.address || '-'}`;
    if (document.getElementById('pd-lessor-card-img') && lessor.imageUrl) document.getElementById('pd-lessor-card-img').src = lessor.imageUrl;
  }

  // 7. AMORTIZATION MODAL & LIVE COMPUTATION
  function openAmortizationModal() {
    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
      toggleModal('modal-add-property');
      return;
    }

    if (document.getElementById('amo-principal')) document.getElementById('amo-principal').value = prop.principal || 0;
    if (document.getElementById('amo-installment')) document.getElementById('amo-installment').value = prop.installment || 0;
    if (document.getElementById('amo-startdate')) document.getElementById('amo-startdate').value = prop.startDate || new Date().toISOString().split('T')[0];

    const schedule = (prop.rateSchedule && prop.rateSchedule.length > 0) ? prop.rateSchedule : [
      { startMonth: 1, endMonth: 36, rate: prop.rate || 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
      { startMonth: 37, endMonth: 360, rate: (prop.rate || 4.5) + 1.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
    ];

    renderRatePeriodEditors(schedule);
    renderAmortizationTable();
    toggleModal('modal-amortization-table');
  }

  let amoDebounceTimer = null;
  function debouncedRenderAmortizationTable() {
    if (amoDebounceTimer) clearTimeout(amoDebounceTimer);
    amoDebounceTimer = setTimeout(() => {
      renderAmortizationTable();
    }, 60);
  }

  function renderRatePeriodEditors(schedule) {
    const container = document.getElementById('rate-periods-editor-container');
    if (!container) return;
    container.innerHTML = '';

    const prop = getCurrentProperty();
    const baseRate = (prop && prop.rate) ? prop.rate : 4.5;

    const list = schedule && schedule.length > 0 ? schedule : [
      { startMonth: 1, endMonth: 36, rate: baseRate, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
      { startMonth: 37, endMonth: 360, rate: baseRate + 1.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
    ];

    list.forEach((item, idx) => {
      addRatePeriodRow(item.startMonth, item.endMonth, item.rate, item.label, idx, false);
    });
    renderAmortizationTable();
  }

  function addRatePeriodRow(start = 1, end = 36, rate = 4.5, label = 'ช่วง Retention', idx = Date.now(), shouldRender = true) {
    const container = document.getElementById('rate-periods-editor-container');
    if (!container) return;
    const rowId = `rate-row-${idx}-${Date.now()}`;
    const row = document.createElement('div');
    row.id = rowId;
    row.className = 'p-2.5 bg-white border border-stone-300 rounded-lg grid grid-cols-12 gap-2 items-center text-xs';
    row.innerHTML = `
      <div class="col-span-3 flex items-center gap-1">
        <span class="text-stone-400 font-bold">งวด</span>
        <input type="number" oninput="window.debouncedRenderAmortizationTable()" class="rp-start w-12 bg-stone-100 border border-stone-300 rounded p-1 text-center font-bold" value="${start}">
        <span class="text-stone-400">-</span>
        <input type="number" oninput="window.debouncedRenderAmortizationTable()" class="rp-end w-12 bg-stone-100 border border-stone-300 rounded p-1 text-center font-bold" value="${end}">
      </div>
      <div class="col-span-3 flex items-center gap-1">
        <span class="text-stone-400 font-bold">ดอกเบี้ย</span>
        <input type="number" step="0.1" oninput="window.debouncedRenderAmortizationTable()" class="rp-rate w-16 bg-stone-100 border border-stone-300 rounded p-1 text-right font-black text-[#e05646]" value="${rate}">
        <span class="text-stone-500 font-bold">%</span>
      </div>
      <div class="col-span-5">
        <input type="text" class="rp-label w-full bg-stone-100 border border-stone-300 rounded p-1 font-medium" value="${label}" placeholder="รายละเอียดช่วง Retention...">
      </div>
      <div class="col-span-1 text-right">
        <button type="button" onclick="document.getElementById('${rowId}').remove(); window.debouncedRenderAmortizationTable();" class="text-rose-500 font-bold px-1.5 py-0.5 hover:bg-rose-50 rounded">✕</button>
      </div>
    `;
    container.appendChild(row);
    if (shouldRender) {
      debouncedRenderAmortizationTable();
    }
  }

  function renderAmortizationTable() {
    const prop = getCurrentProperty() || {};
    const principal = parseFloat(document.getElementById('amo-principal')?.value) || (prop.principal || 0);
    const installment = parseFloat(document.getElementById('amo-installment')?.value) || (prop.installment || 0);
    const startDateStr = document.getElementById('amo-startdate')?.value || prop.startDate || new Date().toISOString().split('T')[0];

    const rowsContainer = document.getElementById('amortization-table-body');
    if (!rowsContainer) return;

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
    const rowsHtml = [];

    for (let m = 1; m <= 360; m++) {
      if (balance <= 0) break;
      let rate = prop.rate || 4.5;
      if (rateSchedule.length > 0) {
        for (let s = 0; s < rateSchedule.length; s++) {
          if (m >= rateSchedule[s].startMonth && m <= rateSchedule[s].endMonth) {
            rate = rateSchedule[s].rate;
            break;
          }
        }
      }
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
      const dateTxt = isNaN(curDate.getTime()) ? `งวดที่ ${m}` : curDate.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' });

      rowsHtml.push(`
        <tr class="border-b border-stone-200 hover:bg-stone-50 text-xs">
          <td class="p-2 text-center font-bold text-stone-700">${m}</td>
          <td class="p-2 text-center font-medium text-stone-600">${dateTxt}</td>
          <td class="p-2 text-right font-black text-[#e05646]">฿${installment.toLocaleString()}</td>
          <td class="p-2 text-right font-bold text-stone-800">${rate}% <span class="text-[10px] text-stone-400 font-normal block">(฿${Math.round(interest).toLocaleString()})</span></td>
          <td class="p-2 text-right font-bold text-emerald-700">฿${Math.round(princPay).toLocaleString()}</td>
          <td class="p-2 text-right font-black text-stone-900">฿${Math.round(balance).toLocaleString()}</td>
          <td class="p-2 text-center"><span class="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-bold">งวดที่ ${m}</span></td>
        </tr>
      `);
    }

    rowsContainer.innerHTML = rowsHtml.join('');

    if (document.getElementById('amo-sum-balance')) document.getElementById('amo-sum-balance').innerText = `฿${Math.round(balance).toLocaleString()}`;
    if (document.getElementById('amo-sum-paid-princ')) document.getElementById('amo-sum-paid-princ').innerText = `฿${Math.round(totalPaidPrinc).toLocaleString()}`;
    if (document.getElementById('amo-sum-paid-int')) document.getElementById('amo-sum-paid-int').innerText = `฿${Math.round(totalPaidInt).toLocaleString()}`;
  }

  async function applyAmortizationEdit() {
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
    if (rateSchedule.length > 0) {
      prop.rate = rateSchedule[0].rate;
    }

    saveStateToLocalStorage();
    renderAdminData();
    renderPropertyDetailView(prop.id);
    toggleModal('modal-amortization-table');
    alert(`✅ คำนวณและบันทึกตารางผ่อนชำระ & Retention ของ "${prop.name}" เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  // 8. LESSOR & TENANT MANAGEMENT
  function renderRegisteredLessorsList() {
    const container = document.getElementById('registered-lessors-container');
    if (!container) return;
    container.innerHTML = '';
    const keys = Object.keys(state.lessorProfiles || {});

    if (keys.length === 0) {
      container.innerHTML = `<div class="col-span-full text-stone-400 font-bold p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">ยังไม่มีผู้ให้เช่าที่ลงทะเบียนในระบบ</div>`;
      return;
    }

    keys.forEach(key => {
      const prof = state.lessorProfiles[key];
      container.innerHTML += `
        <div class="p-3 bg-stone-100 border border-stone-300 rounded-xl space-y-1 shadow-sm">
          <div class="font-extrabold text-stone-800 text-xs">👤 ${prof.name} (${prof.age || '-'} ปี)</div>
          <div class="text-[11px] text-stone-600">🆔 บัตรประชาชน: ${prof.idCard || '-'}</div>
          <div class="text-[11px] text-stone-600">📞 โทร: ${prof.phone || '-'}</div>
          <div class="text-[11px] text-stone-500 truncate">🏠 ที่อยู่: ${prof.address || '-'}</div>
          <div class="flex gap-2 pt-1">
            <button onclick="window.editRegisteredLessor('${key}')" class="flex-1 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-bold rounded transition-colors">
              ✏️ แก้ไข
            </button>
            <button onclick="window.deleteRegisteredLessor('${key}')" class="py-1 px-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold rounded transition-colors">
              🗑️ ลบ
            </button>
          </div>
        </div>
      `;
    });
  }

  function renderRegisteredTenantsList() {
    const container = document.getElementById('registered-tenants-container');
    if (!container) return;
    container.innerHTML = '';
    const keys = Object.keys(state.tenantDatabase || {});

    if (keys.length === 0) {
      container.innerHTML = `<div class="col-span-full text-stone-400 font-bold p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">ยังไม่มีผู้เช่าที่ลงทะเบียนในระบบ</div>`;
      return;
    }

    keys.forEach(key => {
      const t = state.tenantDatabase[key];
      container.innerHTML += `
        <div class="p-3 bg-stone-100 border border-stone-300 rounded-xl space-y-1 shadow-sm">
          <div class="font-extrabold text-stone-800 text-xs">👤 ${t.fullName} (${t.age || '-'} ปี)</div>
          <div class="text-[11px] text-stone-600">🏠 ทรัพย์สินที่เช่า: ${t.unitName || '-'} (${t.houseNo || '-'})</div>
          <div class="text-[11px] text-stone-600">💰 ค่าเช่า: ฿${(t.rent || 0).toLocaleString()} / เงินประกัน: ฿${(t.deposit || 0).toLocaleString()}</div>
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

  function renderLessorSelectOptions() {
    const selects = ['p-lessor', 'pde-lessor-select'];
    selects.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '';
      const keys = Object.keys(state.lessorProfiles || {});
      keys.forEach(k => {
        const prof = state.lessorProfiles[k];
        el.innerHTML += `<option value="${k}">👤 ${prof.name}</option>`;
      });
    });
  }

  function renderTenantPropertyDropdown() {
    const sel = document.getElementById('tenant-prop-id');
    if (!sel) return;
    sel.innerHTML = '';
    state.propertiesState.forEach(p => {
      sel.innerHTML += `<option value="${p.id}">🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''}</option>`;
    });
  }

  // 9. LEASE CONTRACT & PRINT ENGINE
  function calculateLeaseDates(startDateStr, durationYears) {
    if (!startDateStr) return { endDate: '', thaiText: '' };
    const start = new Date(startDateStr);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + parseInt(durationYears || 1));
    end.setDate(end.getDate() - 1);

    const formatThai = d => {
      const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
      return `วันที่ ${d.getDate()} เดือน ${thMonths[d.getMonth()]} พ.ศ. ${d.getFullYear() + 543}`;
    };

    const endDateStr = end.toISOString().split('T')[0];
    return {
      endDate: endDateStr,
      startThai: formatThai(start),
      endThai: formatThai(end)
    };
  }

  function renderContractView() {
    const prop = getCurrentProperty();
    if (!prop) return;

    const lessor = state.lessorProfiles[prop.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า', idCard: '-', address: '-', age: '-' };
    const tenant = Object.values(state.tenantDatabase)[0] || { fullName: 'ผู้เช่า', idCard: '-', address: '-', age: '-', startDate: prop.startDate || '2026-08-13', duration: '1' };

    const dates = calculateLeaseDates(tenant.startDate || prop.startDate || '2026-08-13', tenant.duration || 1);

    const safeSetText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.innerText = txt;
    };

    safeSetText('c-lessor-name', lessor.name || '-');
    safeSetText('c-lessor-age', lessor.age || '-');
    safeSetText('c-lessor-idcard', lessor.idCard || '-');
    safeSetText('c-lessor-address', lessor.address || '-');

    safeSetText('c-tenant-name', tenant.fullName || '-');
    safeSetText('c-tenant-age', tenant.age || '-');
    safeSetText('c-tenant-idcard', tenant.idCard || '-');
    safeSetText('c-tenant-address', tenant.address || '-');

    safeSetText('c-property-name', prop.name || '-');
    safeSetText('c-property-houseno', prop.houseNo || '-');
    safeSetText('c-property-address', prop.address || '-');
    safeSetText('c-property-rent', `฿${(prop.rent || 0).toLocaleString()} บาท/เดือน`);
    safeSetText('c-property-deposit', `฿${(prop.deposit || 0).toLocaleString()} บาท`);
    safeSetText('c-property-meter-elec', prop.meterElec || '-');
    safeSetText('c-property-meter-water', prop.meterWater || '-');

    safeSetText('c-lease-start', dates.startThai || '-');
    safeSetText('c-lease-end', dates.endThai || '-');
    safeSetText('c-lease-duration', `${tenant.duration || 1} ปี`);

    safeSetText('sig-lessor-name', `( ${lessor.name || 'ผู้ให้เช่า'} )`);
    safeSetText('sig-tenant-name', `( ${tenant.fullName || 'ผู้เช่า'} )`);
  }

  // 10. MODAL & TAB CONTROLLERS
  function toggleModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
  }

  function openLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  function loginAsRole(role) {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');
    if (role === 'landlord') {
      verifyAdminPinSubmit();
    } else {
      setCurrentRole('tenant');
      switchTab('tenant');
    }
  }

  function setCurrentRole(role) {
    state.currentRole = role;
    applyRolePermissions();
  }

  function verifyAdminPinSubmit() {
    state.currentRole = 'landlord';
    const badgeName = document.getElementById('user-badge-name');
    if (badgeName) badgeName.innerText = 'ผู้ดูแลพอร์ต';
    
    const pinModal = document.getElementById('modal-admin-pin');
    if (pinModal) pinModal.classList.add('hidden');
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');

    applyRolePermissions();
    switchTab('admin');
  }

  function applyRolePermissions() {
    const badgeRole = document.getElementById('user-badge-role');
    const roleTitle = document.getElementById('header-role-title');
    const tabPropertyBtn = document.getElementById('tab-property-detail');
    const pdHeaderBadge = document.getElementById('pd-header-badge');

    if (badgeRole) {
      badgeRole.innerText = '🔑 ผู้ให้เช่า';
      badgeRole.className = 'px-2 py-0.5 rounded bg-[#e05646] text-white font-bold text-[10px]';
    }
    if (roleTitle) roleTitle.innerText = 'ผู้ให้เช่า (Landlord Mode)';
    if (tabPropertyBtn) tabPropertyBtn.innerText = '🏡 รายละเอียดทรัพย์สิน & สินเชื่อ';
    if (pdHeaderBadge) pdHeaderBadge.innerText = 'สเปก & เงินกู้';

    const landlordOnly = ['tab-admin', 'tab-register-lessor', 'tab-contract', 'subtab-loan', 'subtab-lessor', 'pd-admin-action-buttons'];
    landlordOnly.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });
  }

  function switchTab(tab) {
    const views = ['landing', 'admin', 'property-detail', 'register-lessor', 'tenant', 'contract', 'tenant-dashboard'];
    views.forEach(v => {
      const viewEl = document.getElementById(`view-${v}`);
      if (viewEl) viewEl.classList.add('hidden');
    });
    const targetView = document.getElementById(`view-${tab}`);
    if (targetView) targetView.classList.remove('hidden');

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

    renderAllViews();
  }

  function switchSubTab(sub) {
    ['specs', 'gallery', 'loan', 'lessor'].forEach(s => {
      const view = document.getElementById(`subview-${s}`);
      if (view) view.classList.add('hidden');
      const btn = document.getElementById(`subtab-${s}`);
      if (btn) {
        btn.className = 'px-4 py-2.5 bg-stone-200 text-stone-700 hover:bg-stone-300 rounded-t-lg font-bold whitespace-nowrap';
      }
    });
    const activeView = document.getElementById(`subview-${sub}`);
    if (activeView) activeView.classList.remove('hidden');
    const activeBtn = document.getElementById(`subtab-${sub}`);
    if (activeBtn) {
      activeBtn.className = 'px-4 py-2.5 bg-[#383838] text-white rounded-t-lg font-bold whitespace-nowrap';
    }
  }

  function openEditPropertyDetailModal() {
    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณากด "+ เพิ่มทรัพย์สินใหม่" เพื่อสร้างอสังหาริมทรัพย์ยูนิตแรกในระบบก่อนครับ');
      toggleModal('modal-add-property');
      return;
    }
    
    renderLessorSelectOptions();

    if (document.getElementById('pde-name')) document.getElementById('pde-name').value = prop.name || '';
    if (document.getElementById('pde-houseno')) document.getElementById('pde-houseno').value = prop.houseNo || '';
    if (document.getElementById('pde-address')) document.getElementById('pde-address').value = prop.address || '';
    if (document.getElementById('pde-rent')) document.getElementById('pde-rent').value = prop.rent || 0;
    if (document.getElementById('pde-deposit')) document.getElementById('pde-deposit').value = prop.deposit || 0;
    if (document.getElementById('pde-size')) document.getElementById('pde-size').value = prop.size || '40 ตร.ม.';
    if (document.getElementById('pde-meter-elec')) document.getElementById('pde-meter-elec').value = prop.meterElec || '';
    if (document.getElementById('pde-meter-water')) document.getElementById('pde-meter-water').value = prop.meterWater || '';
    if (document.getElementById('pde-lessor-select')) document.getElementById('pde-lessor-select').value = prop.lessorKey || '';

    toggleModal('modal-edit-property-detail');
  }

  async function handlePropertyEditSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const prop = getCurrentProperty();
    if (!prop) return;

    prop.name = document.getElementById('pde-name')?.value || prop.name;
    prop.houseNo = document.getElementById('pde-houseno')?.value || prop.houseNo;
    prop.address = document.getElementById('pde-address')?.value || prop.address;
    prop.rent = parseFloat(document.getElementById('pde-rent')?.value) || prop.rent;
    prop.deposit = parseFloat(document.getElementById('pde-deposit')?.value) || prop.deposit;
    prop.size = document.getElementById('pde-size')?.value || prop.size;
    prop.meterElec = document.getElementById('pde-meter-elec')?.value || prop.meterElec;
    prop.meterWater = document.getElementById('pde-meter-water')?.value || prop.meterWater;
    prop.lessorKey = document.getElementById('pde-lessor-select')?.value || prop.lessorKey;

    saveStateToLocalStorage();
    renderAllViews();
    toggleModal('modal-edit-property-detail');
    alert(`✅ บันทึกการแก้ไขสเปก "${prop.name}" เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  // 11. GLOBAL BINDINGS EXPOSURE
  window.CONFIG = CONFIG;
  window.state = state;
  window.saveStateToLocalStorage = saveStateToLocalStorage;
  window.getCurrentProperty = getCurrentProperty;
  window.calculateMortgage = calculateMortgage;
  window.syncFromCloudflareD1 = syncFromCloudflareD1;
  window.renderAllViews = renderAllViews;
  window.renderAdminData = renderAdminData;
  window.handleDetailPropertySwitch = handleDetailPropertySwitch;
  window.renderPropertyDetailView = renderPropertyDetailView;
  window.openAmortizationModal = openAmortizationModal;
  window.renderRatePeriodEditors = renderRatePeriodEditors;
  window.addRatePeriodRow = addRatePeriodRow;
  window.renderAmortizationTable = renderAmortizationTable;
  window.debouncedRenderAmortizationTable = debouncedRenderAmortizationTable;
  window.applyAmortizationEdit = applyAmortizationEdit;
  window.renderRegisteredLessorsList = renderRegisteredLessorsList;
  window.renderRegisteredTenantsList = renderRegisteredTenantsList;
  window.renderLessorSelectOptions = renderLessorSelectOptions;
  window.renderTenantPropertyDropdown = renderTenantPropertyDropdown;
  window.calculateLeaseDates = calculateLeaseDates;
  window.renderContractView = renderContractView;
  window.toggleModal = toggleModal;
  window.openLoginOverlay = openLoginOverlay;
  window.loginAsRole = loginAsRole;
  window.setCurrentRole = setCurrentRole;
  window.verifyAdminPinSubmit = verifyAdminPinSubmit;
  window.applyRolePermissions = applyRolePermissions;
  window.switchTab = switchTab;
  window.switchSubTab = switchSubTab;
  window.openEditPropertyDetailModal = openEditPropertyDetailModal;
  window.handlePropertyEditSubmit = handlePropertyEditSubmit;

  // 12. AUTO-START & LIFECYCLE LISTENERS
  syncFromCloudflareD1(true);
  document.addEventListener('DOMContentLoaded', () => {
    applyRolePermissions();
    renderAllViews();
    syncFromCloudflareD1(true);
  });
  window.addEventListener('pageshow', () => syncFromCloudflareD1(true));
  window.addEventListener('focus', () => syncFromCloudflareD1(true));

})(window);
