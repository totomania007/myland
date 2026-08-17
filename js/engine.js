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
      gallery: [
        { id: 'g-silk-1', type: 'image', title: 'ห้องนั่งเล่น Silk Condo', category: 'interior', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80', caption: 'ห้องนั่งเล่นโปร่งสบาย แสงธรรมชาติเข้าถึง' },
        { id: 'g-silk-2', type: 'image', title: 'ห้องนอน Master Bedroom', category: 'interior', url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1200&auto=format&fit=crop&q=80', caption: 'เตียง 6 ฟุต พร้อมที่นอนเกรดพรีเมียม' },
        { id: 'g-silk-3', type: 'image', title: 'สระว่ายน้ำโครงการ', category: 'exterior', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&auto=format&fit=crop&q=80', caption: 'สระว่ายน้ำระบบเกลือพร้อมฟิตเนส' },
        { id: 'g-silk-4', type: 'video', title: 'วิดีโอพาชมห้องจริง (Video Tour)', category: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'คลิปพาชมห้องแบบละเอียดทุกมุมมอง' }
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
      gallery: [
        { id: 'g-atr-1', type: 'image', title: 'หน้าบ้านทาวน์โฮม The Atrium', category: 'exterior', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80', caption: 'หน้าบ้านกว้าง จอดรถได้ 2 คัน' },
        { id: 'g-atr-2', type: 'image', title: 'ห้องรับแขก & โซนรับประทานอาหาร', category: 'interior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80', caption: 'เฟอร์นิเจอร์ตกแต่งครบชุด พร้อมเข้าอยู่' },
        { id: 'g-atr-3', type: 'image', title: 'สวนพักผ่อนส่วนกลาง', category: 'highlight', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80', caption: 'สวนสีเขียวและสนามเด็กเล่นร่มรื่น' },
        { id: 'g-atr-4', type: 'video', title: 'วิดีโอรีวิวบ้าน The Atrium', category: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'พาทัวร์ดูบรรยากาศจริงในหมู่บ้าน' }
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
      if (raw === null) return defaultVal;
      const parsed = JSON.parse(raw);
      return parsed !== null && parsed !== undefined ? parsed : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  // 3. UNIFIED GLOBAL STATE
  const state = {
    currentRole: localStorage.getItem('property_os_active_role') || 'tenant',
    currentPropertyId: localStorage.getItem('property_os_current_prop_id') || DEFAULT_PROPERTIES[0].id,
    currentTenantId: 'tenant-1',
    currentGalleryFilter: 'all',
    propertiesState: loadStoredData('property_os_properties', DEFAULT_PROPERTIES),
    lessorProfiles: loadStoredData('property_os_lessors', DEFAULT_LESSORS),
    tenantDatabase: loadStoredData('property_os_tenants', DEFAULT_TENANTS),
    adminAccountsState: loadStoredData('property_os_admins', [
      { id: 'admin-1', name: 'ผู้ดูแลพอร์ตหลัก', pin: '1234', role: 'Super Admin' }
    ])
  };

  function saveStateToLocalStorage() {
    if (state.propertiesState !== undefined) {
      localStorage.setItem('property_os_properties', JSON.stringify(state.propertiesState));
    }
    if (state.lessorProfiles !== undefined) {
      localStorage.setItem('property_os_lessors', JSON.stringify(state.lessorProfiles));
    }
    if (state.adminAccountsState !== undefined) {
      localStorage.setItem('property_os_admins', JSON.stringify(state.adminAccountsState));
    }
    if (state.tenantDatabase !== undefined) {
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

  function getPropertyOccupancy(propId) {
    if (!propId) return { isOccupied: false, status: 'vacant', label: '⚪ ว่าง (พร้อมปล่อยเช่า)', remainingMonths: 0, remainingDays: 0, tenant: null };
    const prop = (state.propertiesState || []).find(p => String(p.id) === String(propId));
    const tenants = Object.values(state.tenantDatabase || {});
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const propTenants = tenants.filter(t => String(t.propId) === String(propId) || (prop && t.unitName === prop.name));

    // Active lease: start <= now <= end
    for (const t of propTenants) {
      if (!t.startDate || !t.endDate) continue;
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      if (start <= now && now <= end) {
        const diffMs = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        const remainingMonths = Math.ceil(diffDays / 30.4375);
        return {
          isOccupied: true,
          status: 'occupied',
          label: `🟢 มีผู้เช่า (เหลืออีก ${remainingMonths} เดือน)`,
          remainingMonths,
          remainingDays: Math.max(0, diffDays),
          tenant: t,
          startDate: t.startDate,
          endDate: t.endDate
        };
      }
    }

    // Future booking: start > now
    for (const t of propTenants) {
      if (!t.startDate || !t.endDate) continue;
      const start = new Date(t.startDate);
      start.setHours(0, 0, 0, 0);
      if (start > now) {
        return {
          isOccupied: true,
          status: 'booked',
          label: `🟡 จองแล้ว (เริ่ม ${t.startDate})`,
          remainingMonths: 0,
          remainingDays: 0,
          tenant: t,
          startDate: t.startDate,
          endDate: t.endDate
        };
      }
    }

    return {
      isOccupied: false,
      status: 'vacant',
      label: '⚪ ว่าง (พร้อมเช่า)',
      remainingMonths: 0,
      remainingDays: 0,
      tenant: null
    };
  }

  function checkLeaseDateConflict(propId, targetStartDate, targetEndDate, ignoreTenantKey) {
    if (!propId || !targetStartDate || !targetEndDate) return { hasConflict: false };
    const reqStart = new Date(targetStartDate);
    const reqEnd = new Date(targetEndDate);
    reqStart.setHours(0, 0, 0, 0);
    reqEnd.setHours(23, 59, 59, 999);

    if (isNaN(reqStart.getTime()) || isNaN(reqEnd.getTime())) return { hasConflict: false };

    const prop = (state.propertiesState || []).find(p => String(p.id) === String(propId));
    const tenants = Object.values(state.tenantDatabase || {});
    for (const t of tenants) {
      if (ignoreTenantKey && String(t.id) === String(ignoreTenantKey)) continue;
      if (String(t.propId) !== String(propId) && (!prop || t.unitName !== prop.name)) continue;

      if (!t.startDate || !t.endDate) continue;
      const tStart = new Date(t.startDate);
      const tEnd = new Date(t.endDate);
      tStart.setHours(0, 0, 0, 0);
      tEnd.setHours(23, 59, 59, 999);

      // Overlap condition: (reqStart <= tEnd) && (reqEnd >= tStart)
      if (reqStart <= tEnd && reqEnd >= tStart) {
        const nextAvail = new Date(tEnd.getTime() + 86400000);
        const nextAvailStr = nextAvail.toISOString().split('T')[0];
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const remDays = Math.max(0, Math.ceil((tEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        const remMonths = Math.ceil(remDays / 30.4375);
        return {
          hasConflict: true,
          conflictingTenant: t,
          conflictStartDate: t.startDate,
          conflictEndDate: t.endDate,
          nextAvailableDate: nextAvailStr,
          remainingMonths: remMonths,
          message: `ช่วงเวลาที่เลือก (${targetStartDate} ถึง ${targetEndDate}) ซ้อนทับกับสัญญาของผู้เช่าปัจจุบันคือ คุณ "${t.fullName}" (ติดสัญญาถึง ${t.endDate})`
        };
      }
    }
    return { hasConflict: false };
  }

  // 5. CLOUDFLARE D1 BACKGROUND SYNCHRONIZATION
  async function syncFromCloudflareD1(silent = true) {
    try {
      const resP = await fetch('/api/properties');
      if (resP.ok) {
        const dbProps = await resP.json();
        if (Array.isArray(dbProps)) {
          if (dbProps.length > 0 || localStorage.getItem('property_os_properties_synced')) {
            state.propertiesState = dbProps;
            localStorage.setItem('property_os_properties', JSON.stringify(dbProps));
            localStorage.setItem('property_os_properties_synced', 'true');
            if (!state.currentPropertyId || !dbProps.find(p => String(p.id) === String(state.currentPropertyId))) {
              state.currentPropertyId = dbProps[0]?.id || null;
            }
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

    try {
      const resT = await fetch('/api/tenants');
      if (resT.ok) {
        const dbTenants = await resT.json();
        if (Array.isArray(dbTenants)) {
          const freshTenants = {};
          dbTenants.forEach(t => { if (t.id) freshTenants[t.id] = t; });
          if (dbTenants.length > 0 || localStorage.getItem('property_os_tenants_synced')) {
            state.tenantDatabase = freshTenants;
            localStorage.setItem('property_os_tenants', JSON.stringify(freshTenants));
            localStorage.setItem('property_os_tenants_synced', 'true');
          }
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
    renderLoanManagementView();
    renderRegisteredLessorsList();
    renderRegisteredTenantsList();
    renderAdminAccountsList();
    renderLessorSelectOptions();
    renderTenantPropertyDropdown();
    renderContractView();
    applyRolePermissions();
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

        const occ = getPropertyOccupancy(p.id);
        let occBadge = '';
        let occRow = '';
        if (occ.status === 'occupied') {
          occBadge = `<span class="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">🟢 มีผู้เช่า (เหลืออีก ${occ.remainingMonths} ด.)</span>`;
          occRow = `<div class="flex justify-between"><span class="text-stone-500">ผู้เช่าปัจจุบัน:</span> <strong class="text-emerald-700 font-bold">👤 ${occ.tenant.fullName} (ถึง ${occ.endDate})</strong></div>`;
        } else if (occ.status === 'booked') {
          occBadge = `<span class="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold text-xs">🟡 จองแล้ว (เริ่ม ${occ.startDate})</span>`;
          occRow = `<div class="flex justify-between"><span class="text-stone-500">สถานะ:</span> <strong class="text-amber-700 font-bold">จองแล้วโดย ${occ.tenant.fullName}</strong></div>`;
        } else {
          occBadge = `<span class="px-2.5 py-1 rounded bg-stone-100 text-stone-600 font-bold text-xs">⚪ ว่าง (พร้อมเช่า)</span>`;
          occRow = `<div class="flex justify-between"><span class="text-stone-500">สถานะ:</span> <strong class="text-stone-600 font-bold">⚪ พร้อมปล่อยเช่าทันที</strong></div>`;
        }

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
              ${occBadge}
            </div>

            <div class="space-y-2 text-xs border-t border-b border-stone-200 py-3">
              ${occRow}
              <div class="flex justify-between"><span class="text-stone-500">ยอดกู้เริ่มต้น:</span> <strong class="text-stone-800">฿${(p.principal || 0).toLocaleString()}</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">ค่างวดผ่อน:</span> <strong class="text-[#e05646]">฿${(p.installment || 0).toLocaleString()} /เดือน</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">อัตราค่าเช่า:</span> <strong class="text-emerald-700">฿${(p.rent || 0).toLocaleString()} /เดือน</strong></div>
              <div class="flex justify-between"><span class="text-stone-500">เงินต้นคงเหลือผ่อนชำระ:</span> <strong class="text-stone-900">฿${mortgage.balance.toLocaleString()}</strong></div>
            </div>

            <div class="flex justify-between items-center pt-1">
              <span class="text-xs text-stone-400 font-semibold">ผ่อนชำระ: ${mortgage.paidPct}%</span>
              <div class="flex items-center gap-3">
                <button onclick="window.deleteProperty('${p.id}')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-0.5 hover:underline">
                  <span>🗑️ ลบ</span>
                </button>
                <button onclick="window.handleDetailPropertySwitch('${p.id}'); window.switchTab('property-detail');" class="text-xs text-stone-700 font-bold hover:underline">
                  ดูสเปกผู้เช่า
                </button>
                <button onclick="window.handleLoanPropertySwitch('${p.id}'); window.switchTab('loan-management');" class="text-xs text-[#e05646] font-bold hover:underline">
                  ดูสินเชื่อ ➔
                </button>
              </div>
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

  async function deleteProperty(propId) {
    if (!propId) {
      const prop = getCurrentProperty();
      propId = prop?.id;
    }
    if (!propId) {
      alert('ไม่พบทรัพย์สินที่ต้องการลบ');
      return;
    }

    const prop = (state.propertiesState || []).find(p => String(p.id) === String(propId));
    if (!prop) {
      alert('ไม่พบข้อมูลทรัพย์สินในระบบ');
      return;
    }

    const occ = getPropertyOccupancy(propId);
    let confirmMsg = `คุณต้องการลบทรัพย์สิน "${prop.name}" ${prop.houseNo ? `(${prop.houseNo})` : ''} ออกจากพอร์ตใช่หรือไม่?`;
    if (occ.isOccupied) {
      confirmMsg = `⚠️ คำเตือน: ทรัพย์สิน "${prop.name}" ปัจจุบันมีสัญญาผู้เช่าอยู่ (คุณ ${occ.tenant.fullName})\n\nคุณแน่ใจหรือไม่ว่าต้องการลบทรัพย์สินนี้ออกจากระบบอย่างถาวร?`;
    }

    if (!confirm(confirmMsg)) return;

    state.propertiesState = (state.propertiesState || []).filter(p => String(p.id) !== String(propId));
    localStorage.setItem('property_os_properties_synced', 'true');

    if (String(state.currentPropertyId) === String(propId)) {
      state.currentPropertyId = state.propertiesState[0]?.id || null;
      if (state.currentPropertyId) {
        localStorage.setItem('property_os_current_prop_id', state.currentPropertyId);
      } else {
        localStorage.removeItem('property_os_current_prop_id');
      }
    }

    saveStateToLocalStorage();
    renderAllViews();
    alert(`✅ ลบทรัพย์สิน "${prop.name}" ออกจากระบบเรียบร้อยแล้ว!`);

    try {
      await fetch(`/api/properties?id=${encodeURIComponent(propId)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('D1 deleteProperty error:', err);
    }
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
    renderLoanManagementView(propId);
    renderContractView();
    renderAdminData();
  }

  function handleLoanPropertySwitch(propId) {
    if (!propId) {
      const sel = document.getElementById('lm-property-selector');
      if (sel) propId = sel.value;
    }
    if (!propId) return;

    state.currentPropertyId = propId;
    localStorage.setItem('property_os_current_prop_id', propId);

    renderLoanManagementView(propId);
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
          const occ = getPropertyOccupancy(p.id);
          const opt = document.createElement('option');
          opt.value = p.id;
          const occTxt = occ.status === 'occupied' ? `[🟢 มีผู้เช่าถึง ${occ.endDate}]` : `[⚪ ว่าง]`;
          opt.innerText = `🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''} ${occTxt}`;
          select.appendChild(opt);
        });
      }
      select.value = prop.id;
    }

    // 0. Occupancy Status Card (For Tenant Info)
    const occ = getPropertyOccupancy(prop.id);
    const occCard = document.getElementById('pd-occupancy-card');
    if (occCard) {
      const occIcon = document.getElementById('pd-occ-icon');
      const occTitle = document.getElementById('pd-occ-title');
      const occBadge = document.getElementById('pd-occ-badge');
      const occDesc = document.getElementById('pd-occ-desc');

      if (occ.status === 'occupied') {
        occCard.className = 'p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
        if (occIcon) occIcon.innerText = '⏳';
        if (occTitle) occTitle.innerText = `สถานะ: มีผู้เช่าอยู่ (ว่างให้เช่าต่อ ${occ.endDate})`;
        if (occBadge) {
          occBadge.innerText = `เหลืออีก ${occ.remainingMonths} เดือน`;
          occBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300';
        }
        if (occDesc) occDesc.innerHTML = `ปัจจุบันติดสัญญาเช่าถึงวันที่ <strong>${occ.endDate}</strong> สามารถจองล่วงหน้าเพื่อเข้าอยู่วันที่ <strong>${occ.endDate}</strong> เป็นต้นไปได้ครับ`;
      } else if (occ.status === 'booked') {
        occCard.className = 'p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
        if (occIcon) occIcon.innerText = '🟡';
        if (occTitle) occTitle.innerText = `สถานะ: มีการจองแล้ว`;
        if (occBadge) {
          occBadge.innerText = `เริ่ม ${occ.startDate}`;
          occBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300';
        }
        if (occDesc) occDesc.innerHTML = `กำหนดเริ่มสัญญา: <strong>${occ.startDate}</strong> ถึง <strong>${occ.endDate}</strong>`;
      } else {
        occCard.className = 'p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
        if (occIcon) occIcon.innerText = '🟢';
        if (occTitle) occTitle.innerText = 'สถานะ: ห้องว่าง พร้อมเข้าอยู่ทันที';
        if (occBadge) {
          occBadge.innerText = 'พร้อมทำสัญญา';
          occBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900 border border-emerald-300';
        }
        if (occDesc) occDesc.innerText = 'ห้องพักตกแต่งครบ สะอาด พร้อมทำสัญญาและย้ายเข้าอยู่อาศัยได้ทันทีครับ';
      }
    }

    // 1. Specs (Tenant Facing)
    if (document.getElementById('pd-name')) document.getElementById('pd-name').innerText = prop.name || 'สเปกอสังหาริมทรัพย์';
    if (document.getElementById('pd-address')) document.getElementById('pd-address').innerText = prop.address || '-';
    if (document.getElementById('pd-type')) document.getElementById('pd-type').innerText = prop.type || 'อสังหาฯ เช่า';
    if (document.getElementById('pd-houseno')) document.getElementById('pd-houseno').innerText = prop.houseNo || '-';
    if (document.getElementById('pd-full-address')) document.getElementById('pd-full-address').innerText = prop.address || '-';
    if (document.getElementById('pd-size')) document.getElementById('pd-size').innerText = prop.size || '40 ตร.ม.';
    if (document.getElementById('pd-rent')) document.getElementById('pd-rent').innerText = `฿${(prop.rent || 0).toLocaleString()} บาท/เดือน`;
    if (document.getElementById('pd-deposit')) document.getElementById('pd-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()} บาท`;
    if (document.getElementById('pd-meter-elec')) document.getElementById('pd-meter-elec').innerText = prop.meterElec || '-';
    if (document.getElementById('pd-meter-water')) document.getElementById('pd-meter-water').innerText = prop.meterWater || '-';

    // 2. Inventory Furniture List (Tenant Facing)
    const invContainer = document.getElementById('pd-inventory-container');
    if (invContainer) {
      invContainer.innerHTML = '';
      const inventory = prop.inventoryList || [];
      if (inventory.length === 0) {
        invContainer.innerHTML = `<div class="col-span-full text-stone-400 text-center py-4 font-bold">ยังไม่มีรายการเฟอร์นิเจอร์</div>`;
      } else {
        inventory.forEach(item => {
          const itemObj = typeof item === 'object' ? item : { name: item, img: CONFIG.PLACEHOLDER_SVG };
          invContainer.innerHTML += `
            <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between shadow-sm">
              <span class="font-bold text-stone-800">${itemObj.name}</span>
              <img src="${itemObj.img || CONFIG.PLACEHOLDER_SVG}" class="w-12 h-10 object-cover rounded-lg border border-stone-300 cursor-pointer shadow-sm" onclick="openMediaPreview('${itemObj.name}', this.src)">
            </div>
          `;
        });
      }
    }

    // 3. Lessor Contact Details (Tenant Facing)
    const lessor = state.lessorProfiles[prop.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า', phone: '-', address: '-' };
    if (document.getElementById('pd-lessor-display')) document.getElementById('pd-lessor-display').innerText = lessor.name || 'ผู้ให้เช่า';
    if (document.getElementById('pd-lessor-phone-detail')) document.getElementById('pd-lessor-phone-detail').innerText = `📞 เบอร์โทรศัพท์ติดต่อ: ${lessor.phone || '-'}`;
    if (document.getElementById('pd-lessor-address-detail')) document.getElementById('pd-lessor-address-detail').innerText = `📍 ที่อยู่: ${lessor.address || '-'}`;

    // 4. Render Photo & Video Gallery
    renderPropertyGallery();
  }

  // 7. DEDICATED LOAN & MORTGAGE ASSET MANAGEMENT (FOR LANDLORD ONLY 🔒)
  function renderLoanManagementView(targetPropId) {
    const props = state.propertiesState || [];
    if (props.length === 0) return;

    const storedId = localStorage.getItem('property_os_current_prop_id');
    const currentId = targetPropId || state.currentPropertyId || storedId || props[0].id;
    state.currentPropertyId = currentId;

    const prop = props.find(p => String(p.id) === String(currentId)) || props[0];
    if (!prop) return;

    const select = document.getElementById('lm-property-selector');
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

    if (document.getElementById('lm-name')) document.getElementById('lm-name').innerText = `สินเชื่อ: ${prop.name} ${prop.houseNo ? `(${prop.houseNo})` : ''}`;
    if (document.getElementById('lm-address')) document.getElementById('lm-address').innerText = prop.address || '-';

    const mortgage = calculateMortgage(prop.principal || 0, prop.installment || 0, prop.rate || 4.5, prop.startDate, prop.rateSchedule);
    if (document.getElementById('lm-balance-display')) document.getElementById('lm-balance-display').innerText = `฿${mortgage.balance.toLocaleString()}`;
    if (document.getElementById('lm-balance-progress')) document.getElementById('lm-balance-progress').innerText = `ผ่อนชำระแล้ว ${mortgage.paidPct}% (ชำระเงินต้นสะสม ฿${mortgage.paidPrincipal.toLocaleString()} / ดอกเบี้ยสะสม ฿${mortgage.paidInterest.toLocaleString()})`;
    if (document.getElementById('lm-principal-display')) document.getElementById('lm-principal-display').innerText = `฿${(prop.principal || 0).toLocaleString()}`;
    if (document.getElementById('lm-startdate-display')) document.getElementById('lm-startdate-display').innerText = `เริ่มสัญญาเงินกู้: ${prop.startDate || '-'}`;
    if (document.getElementById('lm-installment-display')) document.getElementById('lm-installment-display').innerText = `฿${(prop.installment || 0).toLocaleString()} /เดือน`;
    if (document.getElementById('lm-rate-display')) document.getElementById('lm-rate-display').innerText = `อัตราดอกเบี้ยเริ่มต้น: ${prop.rate || 4.5}% ต่อปี`;

    // Cashflow Calculations
    const rentInc = prop.rent || 0;
    const loanExp = prop.installment || 0;
    const netFlow = rentInc - loanExp;
    if (document.getElementById('lm-rent-income')) document.getElementById('lm-rent-income').innerText = `+฿${rentInc.toLocaleString()} /เดือน`;
    if (document.getElementById('lm-loan-expense')) document.getElementById('lm-loan-expense').innerText = `-฿${loanExp.toLocaleString()} /เดือน`;
    const netEl = document.getElementById('lm-net-cashflow');
    if (netEl) {
      if (netFlow >= 0) {
        netEl.innerText = `+฿${netFlow.toLocaleString()} /เดือน`;
        netEl.className = 'text-lg font-black text-emerald-900';
      } else {
        netEl.innerText = `-฿${Math.abs(netFlow).toLocaleString()} /เดือน`;
        netEl.className = 'text-lg font-black text-rose-700';
      }
    }

    // Retention Schedule Cards
    const retContainer = document.getElementById('lm-rate-schedule-summary');
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

    // Bank Docs Scans
    const docsContainer = document.getElementById('lm-bank-docs-container');
    if (docsContainer) {
      docsContainer.innerHTML = `
        <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
          <div class="font-bold text-stone-800">📄 สัญญาเงินกู้ซื้อที่อยู่อาศัย</div>
          <div class="text-[10px] text-stone-400">วงเงินกู้ ฿${(prop.principal || 0).toLocaleString()}</div>
        </div>
        <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
          <div class="font-bold text-stone-800">📜 สำเนาโฉนดที่ดิน & สัญญาจำนอง</div>
          <div class="text-[10px] text-stone-400">เลขที่โฉนดอสังหาฯ ${prop.houseNo || '-'}</div>
        </div>
      `;
    }
  }

  // 6. GALLERY & MOBILE-FIRST MEDIA ENGINE
  let currentGalleryFilter = 'all';
  let currentLightboxIndex = 0;
  let activeGalleryItems = [];

  function compressImageFile(file, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          let dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  }

  function parseVideoEmbedUrl(url) {
    if (!url) return null;
    url = url.trim();
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    return url;
  }

  function renderPropertyGallery() {
    const prop = getCurrentProperty();
    if (!prop) return;

    if (!prop.gallery) {
      prop.gallery = [];
    }

    // 1. Promo Card Sync
    if (document.getElementById('pd-promo-title')) document.getElementById('pd-promo-title').innerText = prop.name || 'อสังหาริมทรัพย์';
    if (document.getElementById('pd-promo-location')) document.getElementById('pd-promo-location').innerText = prop.address || '-';
    if (document.getElementById('pd-promo-price')) document.getElementById('pd-promo-price').innerText = `฿${(prop.rent || 0).toLocaleString()} /เดือน`;
    if (document.getElementById('pd-promo-deposit')) document.getElementById('pd-promo-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()}`;
    if (document.getElementById('pd-promo-cover-img')) {
      document.getElementById('pd-promo-cover-img').src = (prop.gallery && prop.gallery.length > 0 && prop.gallery[0].url) ? prop.gallery[0].url : CONFIG.PLACEHOLDER_SVG;
    }

    // 2. Separate into 2 categories: Exterior and Interior
    const allItems = prop.gallery || [];
    const exteriorItems = allItems.filter(it => it.category === 'exterior');
    const interiorItems = allItems.filter(it => it.category !== 'exterior');
    activeGalleryItems = allItems;

    // 3. Category Descriptions & Counts
    const extDesc = prop.exteriorDescription || 'บรรยากาศภายนอกอาคาร ทำเลที่ตั้ง การเดินทางสะดวกสบาย มีที่จอดรถ และระบบรักษาความปลอดภัยครบครัน';
    const intDesc = prop.interiorDescription || 'พื้นที่ใช้สอยภายในห้องพัก ตกแต่งครบพร้อมเข้าอยู่ มีเครื่องปรับอากาศ เตียงนอน ตู้เสื้อผ้า โซฟา และสิ่งอำนวยความสะดวกครบชุด';

    if (document.getElementById('exterior-unified-desc')) document.getElementById('exterior-unified-desc').innerText = extDesc;
    if (document.getElementById('interior-unified-desc')) document.getElementById('interior-unified-desc').innerText = intDesc;
    if (document.getElementById('exterior-photo-count-badge')) document.getElementById('exterior-photo-count-badge').innerText = `${exteriorItems.length} รูป`;
    if (document.getElementById('interior-photo-count-badge')) document.getElementById('interior-photo-count-badge').innerText = `${interiorItems.length} รูป`;

    // 4. Render Bento Grid for Exterior (Read-only for Tenants)
    renderBentoGridContainer('gallery-bento-exterior', exteriorItems, 'exterior');

    // 5. Render Bento Grid for Interior (Read-only for Tenants)
    renderBentoGridContainer('gallery-bento-interior', interiorItems, 'interior');

    // 6. Render Management Grid for Landlords
    renderLandlordManageGallery(allItems);
  }

  function renderBentoGridContainer(containerId, items, categoryName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-6 space-y-2">
          <div class="text-2xl">${categoryName === 'exterior' ? '🏠' : '🛋️'}</div>
          <div class="text-xs font-bold text-stone-600">ยังไม่มีรูปภาพในหมวด${categoryName === 'exterior' ? 'ภายนอก' : 'ภายใน'}</div>
          <p class="text-[11px] text-stone-400">รูปภาพจะปรากฏที่นี่เมื่อผู้ให้เช่าทำการอัปโหลด</p>
        </div>
      `;
      return;
    }

    items.forEach((item, idx) => {
      const isVideo = item.type === 'video';
      let spanClasses = 'col-span-1 row-span-1';
      if (idx === 0 && items.length >= 3) {
        spanClasses = 'col-span-2 row-span-2';
      } else if (idx === 4 && items.length >= 7) {
        spanClasses = 'col-span-2 sm:col-span-1 row-span-1';
      }

      container.innerHTML += `
        <div class="${spanClasses} group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 bg-stone-900 cursor-pointer select-none h-full min-h-[120px]" onclick="openGalleryLightbox('${item.id}')">
          <div class="w-full h-full">
            ${isVideo ? `
              <div class="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-white relative">
                <span class="text-2xl sm:text-3xl filter drop-shadow-md">▶️</span>
                <span class="text-[9px] sm:text-[10px] font-bold text-rose-400 mt-1 uppercase">Video Tour</span>
              </div>
            ` : `
              <img src="${item.url || CONFIG.PLACEHOLDER_SVG}" alt="Property Photo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            `}
          </div>

          <!-- FLOATING READ-ONLY OVERLAY (FOR TENANTS — NO DELETE BUTTON) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col justify-between p-2">
            <div class="flex justify-between items-center pointer-events-auto">
              <span class="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold">
                ${categoryName === 'exterior' ? '🏠 ภายนอก' : '🛋️ ภายใน'}
              </span>
            </div>
            <div class="text-right pointer-events-auto">
              <span class="px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-stone-900 font-bold text-[9px] sm:text-[10px] shadow cursor-pointer">
                🔍 ขยายดูรูป
              </span>
            </div>
          </div>
        </div>
      `;
    });
  }

  function renderLandlordManageGallery(items) {
    const container = document.getElementById('gallery-manage-list');
    if (!container) return;
    container.innerHTML = '';

    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-6 space-y-1">
          <div class="text-xl">📁</div>
          <div class="text-xs font-bold text-stone-600">ยังไม่มีรูปภาพในคลังสื่อ</div>
          <p class="text-[11px] text-stone-400">เลือกกดปุ่มอัปโหลดรูปภาพด้านบนเพื่อเริ่มใส่รูป</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const isExt = item.category === 'exterior';
      const isVideo = item.type === 'video';

      container.innerHTML += `
        <div class="relative group rounded-xl overflow-hidden border border-stone-200 bg-stone-900 aspect-square shadow-sm">
          <div class="w-full h-full cursor-pointer" onclick="openGalleryLightbox('${item.id}')">
            ${isVideo ? `
              <div class="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-white p-2 text-center">
                <span class="text-2xl">🎬</span>
                <span class="text-[9px] font-bold text-rose-400 mt-1 uppercase">Video</span>
              </div>
            ` : `
              <img src="${item.url || CONFIG.PLACEHOLDER_SVG}" alt="Thumb" class="w-full h-full object-cover">
            `}
          </div>

          <span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
            ${isExt ? '🏠 ภายนอก' : '🛋️ ภายใน'}
          </span>

          <button type="button" onclick="event.stopPropagation(); deleteGalleryItem('${item.id}')" title="ลบรูปนี้ออกจากระบบ" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-xs shadow-md transition-transform active:scale-90">
            🗑️
          </button>
        </div>
      `;
    });
  }

  async function uploadPropertyGalleryMultiple(event, category = 'interior') {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณาเลือกทรัพย์สินก่อนครับ');
      return;
    }

    if (!prop.gallery) prop.gallery = [];

    const fileList = Array.from(files);
    let successCount = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const compressedDataUrl = await compressImageFile(file, 1200, 0.82);
        const newItem = {
          id: `g-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          type: 'image',
          title: '',
          category: category || 'interior',
          url: compressedDataUrl,
          caption: ''
        };
        prop.gallery.unshift(newItem);
        successCount++;
      } catch (err) {
        console.warn('Error compressing image:', file.name, err);
      }
    }

    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    }

    saveStateToLocalStorage();
    renderPropertyGallery();
    event.target.value = '';

    alert(`✅ อัปโหลดและบันทึกรูปภาพหมวด${category === 'exterior' ? 'ภายนอก' : 'ภายใน'} จำนวน ${successCount} รูป เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  async function editCategoryDescription(category) {
    const prop = getCurrentProperty();
    if (!prop) return;

    const isExt = category === 'exterior';
    const currentVal = isExt
      ? (prop.exteriorDescription || 'บรรยากาศภายนอกอาคาร ทำเลที่ตั้ง การเดินทางสะดวกสบาย มีที่จอดรถ และระบบรักษาความปลอดภัยครบครัน')
      : (prop.interiorDescription || 'พื้นที่ใช้สอยภายในห้องพัก ตกแต่งครบพร้อมเข้าอยู่ มีเครื่องปรับอากาศ เตียงนอน ตู้เสื้อผ้า โซฟา และสิ่งอำนวยความสะดวกครบชุด');

    const promptText = `กรุณาใส่คำอธิบายภาพรวมหมวด${isExt ? 'ภายนอก' : 'ภายใน'}:`;
    const newVal = prompt(promptText, currentVal);

    if (newVal !== null && newVal.trim() !== '') {
      if (isExt) {
        prop.exteriorDescription = newVal.trim();
      } else {
        prop.interiorDescription = newVal.trim();
      }

      const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
      if (propIdx >= 0) {
        state.propertiesState[propIdx] = prop;
      }

      saveStateToLocalStorage();
      renderPropertyGallery();
      alert(`✅ บันทึกคำอธิบายรวมหมวด${isExt ? 'ภายนอก' : 'ภายใน'} เรียบร้อยแล้ว!`);

      try {
        await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prop)
        });
      } catch (err) {}
    }
  }

  function openAddMediaLinkModal() {
    toggleModal('modal-add-media-link');
  }

  async function handleAddMediaLinkSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณาเลือกทรัพย์สินก่อนครับ');
      return;
    }

    const type = document.getElementById('gml-type')?.value || 'image';
    let url = document.getElementById('gml-url')?.value.trim();
    const title = document.getElementById('gml-title')?.value.trim() || 'สื่ออสังหาริมทรัพย์';
    const category = document.getElementById('gml-category')?.value || 'interior';
    const caption = document.getElementById('gml-caption')?.value.trim() || '';

    if (!url) {
      alert('กรุณากรอกลิงก์ URL');
      return;
    }

    if (type === 'video') {
      url = parseVideoEmbedUrl(url);
    }

    if (!prop.gallery) prop.gallery = [];
    const newItem = {
      id: `g-${Date.now()}`,
      type,
      title,
      category,
      url,
      caption
    };

    prop.gallery.unshift(newItem);

    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    }

    saveStateToLocalStorage();
    renderPropertyGallery();
    toggleModal('modal-add-media-link');
    alert(`✅ บันทึกลิงก์ลงในคลังของ "${prop.name}" เรียบร้อยแล้ว!`);

    if (document.getElementById('gml-url')) document.getElementById('gml-url').value = '';
    if (document.getElementById('gml-title')) document.getElementById('gml-title').value = '';
    if (document.getElementById('gml-caption')) document.getElementById('gml-caption').value = '';

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  async function deleteGalleryItem(itemId) {
    const prop = getCurrentProperty();
    if (!prop || !prop.gallery) return;

    const itemIdx = prop.gallery.findIndex(it => String(it.id) === String(itemId));
    if (itemIdx === -1) return;

    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้ออกจากคลัง?')) return;

    prop.gallery.splice(itemIdx, 1);

    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    }

    saveStateToLocalStorage();
    renderPropertyGallery();

    const lightboxModal = document.getElementById('modal-gallery-lightbox');
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      toggleModal('modal-gallery-lightbox');
    }

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  function openGalleryLightbox(itemId) {
    const prop = getCurrentProperty();
    if (!prop || !prop.gallery) return;
    const idx = prop.gallery.findIndex(it => String(it.id) === String(itemId));
    if (idx < 0) return;

    currentLightboxIndex = idx;
    displayLightboxContent(prop.gallery[idx]);
    const modal = document.getElementById('modal-gallery-lightbox');
    if (modal) modal.classList.remove('hidden');
  }

  function openPromoCoverLightbox() {
    const prop = getCurrentProperty();
    if (!prop || !prop.gallery || prop.gallery.length === 0) return;
    openGalleryLightbox(prop.gallery[0].id);
  }

  function displayLightboxContent(item) {
    if (!item) return;
    if (document.getElementById('lightbox-title')) document.getElementById('lightbox-title').innerText = item.title || 'คลังสื่ออสังหาฯ';
    if (document.getElementById('lightbox-caption')) document.getElementById('lightbox-caption').innerText = item.caption || '';
    if (document.getElementById('lightbox-badge')) {
      document.getElementById('lightbox-badge').innerText = item.type === 'video' ? '🎬 วิดีโอรีวิว' : (item.category === 'exterior' ? '🏠 ภายนอก' : '🛋️ ภายใน');
    }

    const container = document.getElementById('lightbox-media-container');
    if (!container) return;

    if (item.type === 'video') {
      const isEmbed = item.url && (item.url.includes('youtube.com') || item.url.includes('youtu.be'));
      if (isEmbed) {
        container.innerHTML = `
          <div class="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <iframe src="${item.url}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      } else {
        container.innerHTML = `
          <video src="${item.url}" controls autoplay class="max-h-[60vh] max-w-full rounded-xl shadow-2xl"></video>
        `;
      }
    } else {
      container.innerHTML = `
        <img src="${item.url || CONFIG.PLACEHOLDER_SVG}" alt="${item.title || 'Preview'}" class="max-h-[60vh] max-w-full object-contain rounded-xl shadow-2xl">
      `;
    }
  }

  function prevLightboxMedia() {
    const prop = getCurrentProperty();
    if (!prop || !prop.gallery || prop.gallery.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + prop.gallery.length) % prop.gallery.length;
    displayLightboxContent(prop.gallery[currentLightboxIndex]);
  }

  function nextLightboxMedia() {
    const prop = getCurrentProperty();
    if (!prop || !prop.gallery || prop.gallery.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % prop.gallery.length;
    displayLightboxContent(prop.gallery[currentLightboxIndex]);
  }

  function copyPropertyPromoLink() {
    const prop = getCurrentProperty();
    if (!prop) return;
    const text = `🏡 ให้เช่า: ${prop.name || 'อสังหาริมทรัพย์'}\n💰 ค่าเช่า: ฿${(prop.rent || 0).toLocaleString()} บาท/เดือน (เงินประกัน ฿${(prop.deposit || 0).toLocaleString()})\n📍 ที่ตั้ง: ${prop.address || '-'}\n📐 ขนาด: ${prop.size || '35 ตร.ม.'}\n✨ ดูภาพถ่ายและวิดีโอห้องจริงได้ที่: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('📲 คัดลอกข้อความโปรโมทพร้อมลิงก์ส่งลูกค้าเรียบร้อยแล้ว!');
      }).catch(() => {
        alert(text);
      });
    } else {
      alert(text);
    }
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
    let currentPaidPrinc = 0;
    let currentPaidInt = 0;

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

      if (m <= elapsedMonths) {
        currentBalance = balance;
        currentPaidPrinc = totalPaidPrinc;
        currentPaidInt = totalPaidInt;
      }

      const curDate = new Date(startDate);
      curDate.setMonth(curDate.getMonth() + m - 1);
      const dateTxt = isNaN(curDate.getTime()) ? `งวดที่ ${m}` : curDate.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' });

      const isCurrent = (m === elapsedMonths || (elapsedMonths === 0 && m === 1));
      const isPast = (m < elapsedMonths);
      const badgeClass = isCurrent ? 'bg-amber-100 text-amber-900 border border-amber-300 font-black' : (isPast ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-stone-100 text-stone-600 font-bold');
      const badgeTxt = isCurrent ? `★ งวดปัจจุบัน (${m})` : (isPast ? `ชำระแล้ว (${m})` : `งวดที่ ${m}`);
      const rowHighlight = isCurrent ? 'bg-amber-50/70 border-l-4 border-amber-500 font-semibold' : 'border-b border-stone-200 hover:bg-stone-50';

      rowsHtml.push(`
        <tr class="${rowHighlight} text-xs">
          <td class="p-2 text-center font-bold text-stone-700">${m}</td>
          <td class="p-2 text-center font-medium text-stone-600">${dateTxt}</td>
          <td class="p-2 text-right font-black text-[#e05646]">฿${installment.toLocaleString()}</td>
          <td class="p-2 text-right font-bold text-stone-800">${rate}% <span class="text-[10px] text-stone-400 font-normal block">(฿${Math.round(interest).toLocaleString()})</span></td>
          <td class="p-2 text-right font-bold text-emerald-700">฿${Math.round(princPay).toLocaleString()}</td>
          <td class="p-2 text-right font-black text-stone-900">฿${Math.round(balance).toLocaleString()}</td>
          <td class="p-2 text-center"><span class="px-2 py-0.5 rounded text-[10px] ${badgeClass}">${badgeTxt}</span></td>
        </tr>
      `);
    }

    if (elapsedMonths === 0) {
      currentBalance = principal;
      currentPaidPrinc = 0;
      currentPaidInt = 0;
    }

    rowsContainer.innerHTML = rowsHtml.join('');

    if (document.getElementById('amo-sum-balance')) document.getElementById('amo-sum-balance').innerText = `฿${Math.round(currentBalance).toLocaleString()}`;
    if (document.getElementById('amo-sum-paid-princ')) document.getElementById('amo-sum-paid-princ').innerText = `฿${Math.round(currentPaidPrinc).toLocaleString()}`;
    if (document.getElementById('amo-sum-paid-int')) document.getElementById('amo-sum-paid-int').innerText = `฿${Math.round(currentPaidInt).toLocaleString()} (รวมสัญญา ฿${Math.round(totalPaidInt).toLocaleString()})`;
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

    // Ensure array element is updated in state
    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    } else {
      state.propertiesState.push(prop);
    }

    saveStateToLocalStorage();
    renderAdminData();
    renderPropertyDetailView(prop.id);
    toggleModal('modal-amortization-table');
    alert(`✅ คำนวณและบันทึกตารางผ่อนชำระ & Retention ของ "${prop.name}" เรียบร้อยแล้ว!`);

    try {
      const resp = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
      if (resp.ok) {
        console.log('✅ Synchronized to Cloudflare D1 successfully');
      } else {
        const errTxt = await resp.text();
        console.warn('⚠️ Cloudflare D1 Sync Warning:', errTxt);
      }
    } catch (err) {
      console.warn('⚠️ Network Sync Warning:', err);
    }
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

  function calculateLeaseEndDate() {
    const propSel = document.getElementById('t-property-bind') || document.getElementById('tenant-prop-id');
    const startEl = document.getElementById('t-startdate') || document.getElementById('tenant-start-date');
    const durEl = document.getElementById('t-duration') || document.getElementById('tenant-duration');
    const displayEl = document.getElementById('t-enddate-display');
    const banner = document.getElementById('t-occupancy-status-banner');
    const occIcon = document.getElementById('t-occ-icon');
    const occTitle = document.getElementById('t-occ-title');
    const occDesc = document.getElementById('t-occ-desc');
    const editingKey = (document.getElementById('editing-tenant-key')?.value || '').trim();

    if (!startEl || !durEl || !displayEl) return;
    const dates = calculateLeaseDates(startEl.value, durEl.value);
    displayEl.innerText = dates.endThai ? `${dates.endThai} (${dates.endDate})` : '-';

    const propId = propSel?.value;
    if (!propId || !banner) return;

    banner.classList.remove('hidden');
    const occ = getPropertyOccupancy(propId);
    const conflict = checkLeaseDateConflict(propId, startEl.value, dates.endDate, editingKey);

    const submitBtn = document.getElementById('btn-submit-tenant');

    if (conflict.hasConflict) {
      banner.className = 'p-3.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
      if (occIcon) occIcon.innerText = '⛔';
      if (occTitle) occTitle.innerHTML = `<span class="text-rose-700 font-black">ไม่สามารถเลือกช่วงเวลานี้ได้ (ติดสัญญาเช่าซ้อนทับ)</span>`;
      if (occDesc) occDesc.innerHTML = `${conflict.message}<br>💡 ทรัพย์สินนี้จะว่างให้เช่าได้ตั้งแต่วันที่ <strong class="text-emerald-700 underline font-black">${conflict.nextAvailableDate}</strong> เป็นต้นไป (หรือกรุณาเปลี่ยนวันเริ่มเช่า)`;
      if (submitBtn) {
        submitBtn.classList.add('opacity-50');
      }
    } else if (occ.status === 'occupied') {
      banner.className = 'p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
      if (occIcon) occIcon.innerText = '⚠️';
      if (occTitle) occTitle.innerHTML = `<span class="text-amber-800 font-bold">ทรัพย์สินนี้ปัจจุบันมีผู้เช่าอยู่ (คุณ ${occ.tenant.fullName})</span>`;
      if (occDesc) occDesc.innerHTML = `สัญญาปัจจุบันจะสิ้นสุดวันที่ <strong>${occ.endDate}</strong> (เหลืออีก ${occ.remainingMonths} เดือน) — ช่วงเวลาที่คุณเลือก (${startEl.value} ถึง ${dates.endDate}) <strong>ไม่ซ้อนทับและสามารถทำสัญญาต่อเนื่องได้</strong>`;
      if (submitBtn) submitBtn.classList.remove('opacity-50');
    } else {
      banner.className = 'p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs flex items-start gap-2.5 transition-all shadow-sm';
      if (occIcon) occIcon.innerText = '✅';
      if (occTitle) occTitle.innerHTML = `<span class="text-emerald-800 font-bold">ทรัพย์สินว่าง พร้อมทำสัญญาเช่าทันที</span>`;
      if (occDesc) occDesc.innerHTML = `ไม่มีสัญญาเช่าเดิมผูกอยู่ สามารถระบุวันเริ่มเช่าและทำสัญญาเช่า A4 ได้ทันที`;
      if (submitBtn) submitBtn.classList.remove('opacity-50');
    }
  }

  function renderTenantPropertyDropdown() {
    const selects = ['t-property-bind', 'tenant-prop-id'];
    selects.forEach(id => {
      const sel = document.getElementById(id);
      if (!sel) return;
      sel.innerHTML = '';
      if (!state.propertiesState || state.propertiesState.length === 0) {
        sel.innerHTML = `<option value="">(ยังไม่มีทรัพย์สินในระบบ - กรุณาเพิ่มก่อน)</option>`;
        return;
      }
      state.propertiesState.forEach(p => {
        const occ = getPropertyOccupancy(p.id);
        const opt = document.createElement('option');
        opt.value = p.id;
        const statusTxt = occ.status === 'occupied' 
          ? `[🟢 มีผู้เช่าถึง ${occ.endDate} - เหลืออีก ${occ.remainingMonths} ด.]` 
          : (occ.status === 'booked' ? `[🟡 จองแล้วเริ่ม ${occ.startDate}]` : `[⚪ ว่าง - พร้อมเช่าทันที]`);
        opt.innerText = `🏡 ${p.name} ${p.houseNo ? `(${p.houseNo})` : ''} — ${statusTxt}`;
        sel.appendChild(opt);
      });
    });
    calculateLeaseEndDate();
  }

  async function deleteRegisteredTenant(tKey) {
    const t = state.tenantDatabase[tKey];
    if (!t) return;
    if (!confirm(`คุณต้องการลบข้อมูลผู้เช่า "${t.fullName}" ออกจากระบบใช่หรือไม่?`)) return;

    delete state.tenantDatabase[tKey];
    localStorage.setItem('property_os_tenants_synced', 'true');
    saveStateToLocalStorage();
    renderRegisteredTenantsList();
    renderTenantPropertyDropdown();
    renderPropertyDetailView();
    renderContractView();
    renderAdminData();
    alert(`✅ ลบข้อมูลผู้เช่า "${t.fullName}" เรียบร้อยแล้ว!`);

    try {
      await fetch(`/api/tenants?id=${encodeURIComponent(tKey)}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  }

  function editRegisteredTenant(tKey) {
    const t = state.tenantDatabase[tKey];
    if (!t) return;

    const safeSet = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    safeSet('t-fullname', t.fullName || '');
    safeSet('t-age', t.age || '');
    safeSet('t-idcard', t.idCard || '');
    safeSet('t-phone', t.phone || '');
    safeSet('t-address', t.address || '');
    safeSet('t-property-bind', t.propId || '');
    safeSet('t-startdate', t.startDate || '');
    safeSet('t-duration', t.duration || '1');
    safeSet('editing-tenant-key', tKey);

    safeSet('tenant-fullname', t.fullName || '');
    safeSet('tenant-age', t.age || '');
    safeSet('tenant-idcard', t.idCard || '');
    safeSet('tenant-phone', t.phone || '');
    safeSet('tenant-address', t.address || '');
    safeSet('tenant-prop-id', t.propId || '');
    safeSet('tenant-rent', t.rent || '');
    safeSet('tenant-deposit', t.deposit || '');
    safeSet('tenant-start-date', t.startDate || '');
    safeSet('tenant-duration', t.duration || '1');

    calculateLeaseEndDate();

    const btn = document.getElementById('btn-submit-tenant');
    if (btn) {
      btn.innerText = `✏️ อัปเดตข้อมูลผู้เช่า "${t.fullName}" & ซิงค์ลงสัญญา`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleTenantSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const fullName = (document.getElementById('t-fullname')?.value || document.getElementById('tenant-fullname')?.value || '').trim();
    if (!fullName) {
      alert('กรุณากรอกชื่อ-นามสกุล ผู้เช่า');
      return;
    }
    const editingKey = (document.getElementById('editing-tenant-key')?.value || '').trim();
    const key = editingKey || ('tenant-' + Date.now());

    const propId = document.getElementById('t-property-bind')?.value || document.getElementById('tenant-prop-id')?.value;
    const prop = state.propertiesState.find(p => String(p.id) === String(propId)) || state.propertiesState[0] || {};
    const startDate = document.getElementById('t-startdate')?.value || document.getElementById('tenant-start-date')?.value || new Date().toISOString().split('T')[0];
    const duration = document.getElementById('t-duration')?.value || document.getElementById('tenant-duration')?.value || '1';
    const dates = calculateLeaseDates(startDate, duration);

    // Enforce No-Overlap Validation
    const conflict = checkLeaseDateConflict(prop.id, startDate, dates.endDate, editingKey);
    if (conflict.hasConflict) {
      alert(`⛔ ไม่สามารถบันทึกสัญญาเช่าได้!\n\n${conflict.message}\n\n💡 กรุณาเลือกวันเริ่มต้นสัญญาตั้งแต่วันที่ ${conflict.nextAvailableDate} เป็นต้นไป หรือเลือกอสังหาริมทรัพย์อื่นที่ว่างอยู่ครับ`);
      return;
    }

    const tenantData = {
      id: key,
      fullName,
      age: parseInt(document.getElementById('t-age')?.value || document.getElementById('tenant-age')?.value) || 30,
      idCard: (document.getElementById('t-idcard')?.value || document.getElementById('tenant-idcard')?.value || '-').trim(),
      phone: (document.getElementById('t-phone')?.value || document.getElementById('tenant-phone')?.value || '-').trim(),
      address: (document.getElementById('t-address')?.value || document.getElementById('tenant-address')?.value || '-').trim(),
      unitName: prop.name || '-',
      houseNo: prop.houseNo || '-',
      rent: prop.rent || 0,
      deposit: prop.deposit || 0,
      startDate,
      duration,
      endDate: dates.endDate,
      propId: prop.id
    };

    state.tenantDatabase[key] = tenantData;
    localStorage.setItem('property_os_tenants_synced', 'true');
    saveStateToLocalStorage();

    if (document.getElementById('editing-tenant-key')) document.getElementById('editing-tenant-key').value = '';
    const btn = document.getElementById('btn-submit-tenant');
    if (btn) {
      btn.innerText = `💾 บันทึกผู้เช่าลงระบบ & ออกสัญญาเช่าทันที`;
    }

    renderRegisteredTenantsList();
    renderTenantPropertyDropdown();
    renderPropertyDetailView();
    renderContractView();
    renderAdminData();
    alert(`✅ บันทึกลงทะเบียนผู้เช่า "${fullName}" เรียบร้อยแล้ว!`);

    ['t-fullname', 't-age', 't-idcard', 't-phone', 't-address', 'tenant-fullname', 'tenant-age', 'tenant-idcard', 'tenant-phone', 'tenant-address'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    try {
      await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData)
      });
    } catch (err) {}
  }
  const handleTenantRegisterTabSubmit = handleTenantSubmit;

  function deleteRegisteredLessor(key) {
    const prof = state.lessorProfiles[key];
    if (!prof) return;
    if (!confirm(`คุณต้องการลบข้อมูลผู้ให้เช่า "${prof.name}" ออกจากระบบใช่หรือไม่?`)) return;

    delete state.lessorProfiles[key];
    saveStateToLocalStorage();
    renderRegisteredLessorsList();
    renderLessorSelectOptions();
    renderPropertyDetailView();
    renderContractView();
    renderAdminData();
    alert(`✅ ลบข้อมูลผู้ให้เช่า "${prof.name}" เรียบร้อยแล้ว!`);
    try { fetch(`/api/lessors?id=${key}`, { method: 'DELETE' }); } catch(e) {}
  }

  function editRegisteredLessor(key) {
    const prof = state.lessorProfiles[key];
    if (!prof) return;

    if (document.getElementById('reg-lp-fullname')) document.getElementById('reg-lp-fullname').value = prof.name || '';
    if (document.getElementById('reg-lp-idcard')) document.getElementById('reg-lp-idcard').value = prof.idCard || '';
    if (document.getElementById('reg-lp-age')) document.getElementById('reg-lp-age').value = prof.age || 45;
    if (document.getElementById('reg-lp-phone')) document.getElementById('reg-lp-phone').value = prof.phone || '';
    if (document.getElementById('reg-lp-address')) document.getElementById('reg-lp-address').value = prof.address || '';
    if (document.getElementById('editing-lessor-key')) document.getElementById('editing-lessor-key').value = key;

    const btn = document.getElementById('btn-submit-lessor');
    if (btn) {
      btn.innerText = `✏️ อัปเดตข้อมูลผู้ให้เช่า "${prof.name}" & ซิงค์ลงสัญญา A4`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleLessorRegisterTabSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const fullName = document.getElementById('reg-lp-fullname')?.value.trim();
    if (!fullName) {
      alert('กรุณากรอกชื่อ-นามสกุล ผู้ให้เช่า');
      return;
    }
    const editingKey = document.getElementById('editing-lessor-key')?.value.trim();
    const key = editingKey || ('lessor-' + Date.now());

    const lessorData = {
      id: key,
      name: fullName,
      idCard: document.getElementById('reg-lp-idcard')?.value.trim() || '',
      age: parseInt(document.getElementById('reg-lp-age')?.value) || 45,
      phone: document.getElementById('reg-lp-phone')?.value.trim() || '',
      address: document.getElementById('reg-lp-address')?.value.trim() || '',
      imageUrl: CONFIG.PLACEHOLDER_SVG
    };

    state.lessorProfiles[key] = lessorData;
    saveStateToLocalStorage();

    if (document.getElementById('editing-lessor-key')) document.getElementById('editing-lessor-key').value = '';
    const btn = document.getElementById('btn-submit-lessor');
    if (btn) {
      btn.innerText = `💾 บันทึกลงทะเบียนข้อมูลผู้ให้เช่า & ซิงค์ลงสัญญา A4`;
    }

    renderRegisteredLessorsList();
    renderLessorSelectOptions();
    renderPropertyDetailView();
    renderContractView();
    renderAdminData();
    alert(`✅ บันทึกข้อมูลผู้ให้เช่า "${fullName}" เรียบร้อยแล้ว!`);

    ['reg-lp-fullname', 'reg-lp-idcard', 'reg-lp-age', 'reg-lp-phone', 'reg-lp-address'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    try {
      await fetch('/api/lessors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessorData)
      });
    } catch(err) {}
  }

  // 8.5 ADMIN ACCOUNTS & PIN SECURITY MANAGEMENT
  function renderAdminAccountsList() {
    const listContainer = document.getElementById('admin-accounts-list-container');
    const cardContainer = document.getElementById('admin-accounts-card-list');

    const renderItemHtml = (admin, canDelete) => `
      <div class="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-2 shadow-sm">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
            🔑
          </div>
          <div>
            <div class="font-bold text-xs text-[#383838]">${admin.name}</div>
            <div class="text-[10px] text-stone-500 font-mono">รหัส PIN: •••• (${admin.pin}) • ${admin.role || 'Admin'}</div>
          </div>
        </div>
        ${canDelete ? `
          <button type="button" onclick="deleteAdminAccount('${admin.id}')" class="px-2.5 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-[11px] font-bold transition-colors" title="ลบแอดมิน">
            🗑️ ลบ
          </button>
        ` : `
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">แอดมินหลัก</span>
        `}
      </div>
    `;

    if (listContainer) {
      if (!state.adminAccountsState || state.adminAccountsState.length === 0) {
        listContainer.innerHTML = '<div class="text-xs text-stone-400 p-2">ไม่มีรายชื่อแอดมินในระบบ</div>';
      } else {
        listContainer.innerHTML = state.adminAccountsState.map(a => renderItemHtml(a, state.adminAccountsState.length > 1)).join('');
      }
    }

    if (cardContainer) {
      if (!state.adminAccountsState || state.adminAccountsState.length === 0) {
        cardContainer.innerHTML = '<div class="text-xs text-stone-400 p-2">ไม่มีรายชื่อแอดมินในระบบ</div>';
      } else {
        cardContainer.innerHTML = state.adminAccountsState.map(a => renderItemHtml(a, state.adminAccountsState.length > 1)).join('');
      }
    }
  }

  function handleAddAdminSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const nameInput = document.getElementById('new-admin-name');
    const pinInput = document.getElementById('new-admin-pin');
    const name = (nameInput?.value || '').trim();
    const pin = (pinInput?.value || '').trim();

    if (!name || !pin) {
      alert('⚠️ กรุณากรอกชื่อแอดมินและกำหนดรหัสผ่าน PIN');
      return;
    }

    const newAdmin = {
      id: 'admin-' + Date.now(),
      name,
      pin,
      role: 'ผู้ดูแลพอร์ต (Admin)'
    };

    if (!state.adminAccountsState) state.adminAccountsState = [];
    state.adminAccountsState.push(newAdmin);
    saveStateToLocalStorage();
    renderAdminAccountsList();

    if (nameInput) nameInput.value = '';
    if (pinInput) pinInput.value = '';

    alert(`✅ เพิ่มแอดมิน "${name}" พร้อมรหัส PIN: ${pin} เรียบร้อยแล้ว!`);
  }

  function deleteAdminAccount(id) {
    if (!state.adminAccountsState || state.adminAccountsState.length <= 1) {
      alert('⚠️ ไม่สามารถลบแอดมินคนสุดท้ายได้ เพื่อป้องกันการถูกล็อกออกจากระบบ');
      return;
    }
    const admin = state.adminAccountsState.find(a => a.id === id);
    if (!admin) return;

    if (!confirm(`คุณต้องการลบแอดมิน "${admin.name}" ออกจากระบบใช่หรือไม่?`)) return;

    state.adminAccountsState = state.adminAccountsState.filter(a => a.id !== id);
    saveStateToLocalStorage();
    renderAdminAccountsList();
    alert(`✅ ลบแอดมิน "${admin.name}" เรียบร้อยแล้ว`);
  }

  // 9. LEASE CONTRACT & PDF.JS REALISTIC VIEWER ENGINE
  let pdfCurrentPage = 1;
  let pdfCurrentZoom = 1.0;
  let pdfRotation = 0;
  let isPdfSidebarOpen = true;

  function togglePdfSidebar() {
    const sidebar = document.getElementById('pdf-thumbnails-sidebar');
    const btn = document.getElementById('pdf-sidebar-toggle-btn');
    if (!sidebar) return;
    isPdfSidebarOpen = !isPdfSidebarOpen;
    if (isPdfSidebarOpen) {
      sidebar.classList.remove('hidden');
      if (btn) btn.classList.add('active');
    } else {
      sidebar.classList.add('hidden');
      if (btn) btn.classList.remove('active');
    }
  }

  function pdfJumpToPage(pageNum) {
    pageNum = parseInt(pageNum) || 1;
    if (pageNum < 1) pageNum = 1;
    if (pageNum > 2) pageNum = 2;
    pdfCurrentPage = pageNum;

    const pageInput = document.getElementById('pdf-page-num');
    if (pageInput) pageInput.value = pageNum;

    [1, 2].forEach(p => {
      const thumb = document.getElementById(`pdf-thumb-${p}`);
      if (thumb) {
        if (p === pageNum) thumb.classList.add('active');
        else thumb.classList.remove('active');
      }
    });

    const targetSheet = document.getElementById(`a4-sheet-page-${pageNum}`);
    if (targetSheet) {
      targetSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function pdfPrevPage() {
    if (pdfCurrentPage > 1) {
      pdfJumpToPage(pdfCurrentPage - 1);
    }
  }

  function pdfNextPage() {
    if (pdfCurrentPage < 2) {
      pdfJumpToPage(pdfCurrentPage + 1);
    }
  }

  function pdfApplyZoomAndRotation() {
    const wrapper = document.getElementById('pdf-canvas-wrapper');
    if (!wrapper) return;
    wrapper.style.transform = `scale(${pdfCurrentZoom}) rotate(${pdfRotation}deg)`;
  }

  function handlePdfZoomChange(val) {
    if (val === 'fit-width') {
      const viewport = document.getElementById('pdf-viewport');
      if (viewport) {
        const vw = viewport.clientWidth - 60;
        pdfCurrentZoom = Math.max(0.4, Math.min(1.5, vw / 800));
      }
    } else if (val === 'fit-page') {
      const viewport = document.getElementById('pdf-viewport');
      if (viewport) {
        const vh = viewport.clientHeight - 80;
        pdfCurrentZoom = Math.max(0.4, Math.min(1.2, vh / 1120));
      }
    } else {
      pdfCurrentZoom = parseFloat(val) || 1.0;
    }
    pdfApplyZoomAndRotation();
  }

  function pdfZoomIn() {
    pdfCurrentZoom = Math.min(2.0, Math.round((pdfCurrentZoom + 0.15) * 100) / 100);
    const select = document.getElementById('pdf-zoom-select');
    if (select) select.value = String(pdfCurrentZoom);
    pdfApplyZoomAndRotation();
  }

  function pdfZoomOut() {
    pdfCurrentZoom = Math.max(0.4, Math.round((pdfCurrentZoom - 0.15) * 100) / 100);
    const select = document.getElementById('pdf-zoom-select');
    if (select) select.value = String(pdfCurrentZoom);
    pdfApplyZoomAndRotation();
  }

  function pdfRotate() {
    pdfRotation = (pdfRotation + 90) % 360;
    pdfApplyZoomAndRotation();
  }

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

  function thaiBahtText(num) {
    if (!num || isNaN(num)) return 'ศูนย์บาทถ้วน';
    const numbers = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
    const units = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
    num = Math.round(Number(num));
    let str = num.toString();
    let text = '';
    const len = str.length;
    for (let i = 0; i < len; i++) {
      let digit = parseInt(str.charAt(i));
      let pos = len - i - 1;
      if (digit !== 0) {
        if (pos === 1 && digit === 1) text += '';
        else if (pos === 1 && digit === 2) text += 'ยี่';
        else if (pos === 0 && digit === 1 && len > 1 && str.charAt(i - 1) !== '0') text += 'เอ็ด';
        else text += numbers[digit];
        text += units[pos];
      }
    }
    return text + 'บาทถ้วน';
  }

  function renderContractView() {
    const prop = getCurrentProperty();
    if (!prop) return;

    const lessor = state.lessorProfiles[prop.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า', idCard: '-', address: '-', age: '-', imageUrl: CONFIG.PLACEHOLDER_SVG };
    const tenant = Object.values(state.tenantDatabase).find(t => t.propertyId === prop.id) 
                || Object.values(state.tenantDatabase)[0] 
                || { fullName: 'ผู้เช่า', idCard: '-', address: '-', age: '-', startDate: prop.startDate || '2026-08-13', duration: 1, idCardUrl: CONFIG.PLACEHOLDER_SVG };

    const leaseStartDateStr = tenant.startDate || prop.startDate || '2026-08-13';
    const dates = calculateLeaseDates(leaseStartDateStr, tenant.duration || 1);

    // Contract signing date (ใช้วันที่เริ่มสัญญา หรือ วันที่ปัจจุบัน)
    const signingDateThai = dates.startThai || '-';

    const safeSetText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.innerText = txt;
    };

    const rentVal = prop.rent || tenant.rent || 0;
    const depositVal = prop.deposit || tenant.deposit || 0;

    ['c-place-1', 'c-place'].forEach(id => safeSetText(id, prop.address || prop.name || 'กรุงเทพมหานคร'));
    ['c-date-1', 'c-date'].forEach(id => safeSetText(id, signingDateThai));

    ['c-lessor-name-1', 'c-lessor-name'].forEach(id => safeSetText(id, lessor.name || '-'));
    ['c-lessor-age-1', 'c-lessor-age'].forEach(id => safeSetText(id, lessor.age || '-'));
    ['c-lessor-idcard-1', 'c-lessor-idcard'].forEach(id => safeSetText(id, lessor.idCard || '-'));
    ['c-lessor-address-1', 'c-lessor-address'].forEach(id => safeSetText(id, lessor.address || '-'));

    ['c-lessee-name-1', 'c-tenant-name-1', 'c-tenant-name'].forEach(id => safeSetText(id, tenant.fullName || '-'));
    ['c-lessee-age-1', 'c-tenant-age-1', 'c-tenant-age'].forEach(id => safeSetText(id, tenant.age || '-'));
    ['c-lessee-idcard-1', 'c-tenant-idcard-1', 'c-tenant-idcard'].forEach(id => safeSetText(id, tenant.idCard || '-'));
    ['c-lessee-address-1', 'c-tenant-address-1', 'c-tenant-address'].forEach(id => safeSetText(id, tenant.address || '-'));

    ['c-house-no-1', 'c-property-houseno'].forEach(id => safeSetText(id, prop.houseNo || '-'));
    ['c-full-address-1', 'c-property-address'].forEach(id => safeSetText(id, `${prop.name || ''} ${prop.address || ''}`));
    ['c-duration-1', 'c-lease-duration'].forEach(id => safeSetText(id, `${tenant.duration || 1} ปี`));
    ['c-start-date-1', 'c-lease-start'].forEach(id => safeSetText(id, dates.startThai || '-'));
    ['c-end-date-1', 'c-lease-end'].forEach(id => safeSetText(id, dates.endThai || '-'));

    ['c-rent-1', 'c-property-rent'].forEach(id => safeSetText(id, rentVal.toLocaleString()));
    ['c-rent-text-1'].forEach(id => safeSetText(id, thaiBahtText(rentVal)));
    ['c-deposit-1', 'c-property-deposit'].forEach(id => safeSetText(id, depositVal.toLocaleString()));
    ['c-deposit-text-1'].forEach(id => safeSetText(id, thaiBahtText(depositVal)));

    ['sig-lessor-1', 'sig-lessor-name'].forEach(id => safeSetText(id, lessor.name || 'ผู้ให้เช่า'));
    ['sig-lessee-1', 'sig-tenant-name'].forEach(id => safeSetText(id, tenant.fullName || 'ผู้เช่า'));

    // Attachments: Tenant & Lessor ID Photocopies
    const tenantCardImg = document.getElementById('c-card-img-1');
    if (tenantCardImg) {
      tenantCardImg.src = tenant.idCardUrl || tenant.idCardScanUrl || CONFIG.PLACEHOLDER_SVG;
    }
    const lessorCardImg = document.getElementById('c-lessor-card-img-1');
    if (lessorCardImg) {
      lessorCardImg.src = lessor.imageUrl || lessor.idCardUrl || CONFIG.PLACEHOLDER_SVG;
    }

    const tableBody = document.getElementById('c-inventory-table-body');
    if (tableBody) {
      tableBody.innerHTML = '';
      const list = prop.inventoryList || [];
      if (list.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="border border-black p-2 text-center text-[12pt] text-stone-500">ไม่มีรายการเฟอร์นิเจอร์แนบท้าย</td></tr>`;
      } else {
        list.forEach((item, idx) => {
          tableBody.innerHTML += `
            <tr class="border-b border-black text-center text-[12pt]">
              <td class="border border-black p-1.5">${idx + 1}</td>
              <td class="border border-black p-1.5 text-left font-semibold">${item.name || '-'}</td>
              <td class="border border-black p-1.5">1 รายการ</td>
              <td class="border border-black p-1.5">สมบูรณ์พร้อมใช้</td>
              <td class="border border-black p-1.5">
                <img src="${item.img || CONFIG.PLACEHOLDER_SVG}" class="h-9 mx-auto object-cover rounded border border-stone-300">
              </td>
            </tr>
          `;
        });
      }
    }
  }

  function downloadContractDocx() {
    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณาเลือกทรัพย์สินก่อนครับ');
      return;
    }

    const lessor = state.lessorProfiles[prop.lessorKey] || Object.values(state.lessorProfiles)[0] || { name: 'ผู้ให้เช่า', idCard: '-', address: '-', age: '-' };
    const tenant = Object.values(state.tenantDatabase).find(t => t.propertyId === prop.id)
                || Object.values(state.tenantDatabase)[0]
                || { fullName: 'ผู้เช่า', idCard: '-', address: '-', age: '-', startDate: prop.startDate || '2026-08-13', duration: '1' };
    const dates = calculateLeaseDates(tenant.startDate || prop.startDate || '2026-08-13', tenant.duration || 1);
    const rentVal = prop.rent || tenant.rent || 0;
    const depositVal = prop.deposit || tenant.deposit || 0;

    const htmlContent = `
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>หนังสือสัญญาเช่าบ้าน</title>
        <style>
          @page {
            size: 21.0cm 29.7cm;
            margin: 2.0cm 2.0cm 2.0cm 2.5cm;
            mso-header-margin: 36.0pt;
            mso-footer-margin: 36.0pt;
            mso-paper-source: 0;
          }
          body {
            font-family: 'TH Sarabun PSK', 'TH Sarabun New', 'Cordia New', sans-serif;
            font-size: 16.0pt;
            line-height: 1.15;
            color: #000000;
          }
          p {
            margin-top: 0;
            margin-bottom: 6.0pt;
            text-align: justify;
            text-indent: 2.5cm;
          }
          .title {
            text-align: center;
            font-size: 20.0pt;
            font-weight: bold;
            margin-bottom: 12.0pt;
            text-indent: 0;
          }
          .header-right {
            text-align: right;
            margin-bottom: 12.0pt;
            text-indent: 0;
          }
          .no-indent {
            text-indent: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10.0pt;
            margin-bottom: 10.0pt;
          }
          table, th, td {
            border: 1px solid black;
            font-size: 14.0pt;
            padding: 4.0pt;
          }
          th {
            background-color: #f2f2f2;
            text-align: center;
          }
          .sig-table td {
            border: none;
            padding-top: 20.0pt;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="title">หนังสือสัญญาเช่าบ้าน</div>
        <div class="header-right">
          ทำที่ ${prop.address || prop.name || 'กรุงเทพมหานคร'}<br>
          ${dates.startThai || '-'}
        </div>

        <p>สัญญานี้ทำขึ้นระหว่าง <b>${lessor.name || '-'}</b> อายุ ${lessor.age || '-'} ปี อยู่บ้านเลขที่ ${lessor.address || '-'} เลขประจำตัวประชาชน ${lessor.idCard || '-'} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <b>“ผู้ให้เช่า”</b> ฝ่ายหนึ่ง</p>
        <p>กับ <b>${tenant.fullName || '-'}</b> อายุ ${tenant.age || '-'} ปี อยู่บ้านเลขที่ ${tenant.address || '-'} เลขประจำตัวประชาชน ${tenant.idCard || '-'} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <b>“ผู้เช่า”</b> อีกฝ่ายหนึ่ง</p>

        <p class="no-indent" style="text-align: center; font-weight: bold; margin-top: 10pt; margin-bottom: 10pt;">คู่สัญญาทั้งสองฝ่ายได้ตกลงทำสัญญากันไว้มีข้อความดังต่อไปนี้</p>

        <p><b>ข้อ 1</b> ผู้ให้เช่าตกลงให้เช่าและผู้เช่าตกลงรับเช่าบ้านเลขที่ <b>${prop.houseNo || '-'}</b> รายละเอียดที่ตั้ง ${prop.name || ''} ${prop.address || ''} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <b>“ทรัพย์สินที่เช่า”</b> มีกำหนดระยะเวลาเช่า <b>${tenant.duration || 1} ปี</b> เพื่อใช้เป็นที่พักอาศัย นับตั้งแต่วันที่ <b>${dates.startThai || '-'}</b> ถึงวันที่ <b>${dates.endThai || '-'}</b> และผู้เช่ายอมเสียค่าเช่าให้เดือนละ <b>${rentVal.toLocaleString()} บาท (${thaiBahtText(rentVal)})</b> มีกำหนดชำระเงินค่าเช่าทุกวันที่ 5 ของทุกเดือน</p>

        <p><b>ข้อ 2</b> ในวันทำสัญญานี้ ผู้เช่าได้มอบเงินประกันการปฏิบัติตามสัญญาเช่าจำนวน <b>${depositVal.toLocaleString()} บาท (${thaiBahtText(depositVal)})</b> ให้แก่ผู้ให้เช่าเรียบร้อยแล้ว โดยผู้ให้เช่าจะคืนเงินประกันนี้ให้เมื่อสิ้นสุดสัญญาและผู้เช่าส่งมอบทรัพย์สินคืนในสภาพเรียบร้อย</p>

        <p><b>ข้อ 3</b> ผู้เช่าสัญญาว่าจะชำระค่าน้ำ ค่าไฟฟ้า ค่าภาษีโรงเรือน/ที่ดิน และค่าบำรุงรักษาตามปกติ ไม่นำทรัพย์สินไปให้เช่าช่วง และไม่กระทำการใดอันผิดกฎหมายหรือสร้างความเดือดร้อนรำคาญ</p>

        <p><b>ข้อ 4</b> ผู้ให้เช่าสัญญาว่าจะออกใบรับเงินค่าเช่าให้แก่ผู้เช่าทุกคราว และดูแลรักษาโครงสร้างอาคารตามหน้าที่ผู้ให้เช่า</p>

        <p><b>ข้อ 5</b> หากผู้เช่าผิดนัดชำระค่าเช่าหรือผิดสัญญาข้อหนึ่งข้อใด ผู้ให้เช่ามีสิทธิบอกเลิกสัญญาเช่าได้ทันที</p>

        <p><b>ข้อ 6</b> เมื่อสัญญาเช่าสิ้นสุดลง ไม่ว่าด้วยเหตุใด ผู้ให้เช่ามีสิทธิกลับเข้าครอบครองทรัพย์สินและขนย้ายทรัพย์สินของผู้เช่าออกได้</p>

        <p><b>ข้อ 7</b> ในวันทำสัญญานี้ ผู้เช่าได้ตรวจตราทรัพย์สินที่เช่าและรายการอุปกรณ์เฟอร์นิเจอร์แล้ว เห็นว่ามีสภาพเรียบร้อยสมบูรณ์ทุกประการ</p>

        <p class="no-indent" style="margin-top: 15pt;">สัญญานี้ทำขึ้นเป็นสองฉบับมีข้อความถูกต้องตรงกัน คู่สัญญาได้อ่านและเข้าใจข้อความโดยละเอียดแล้ว จึงได้ลงลายมือชื่อไว้เป็นหลักฐานต่อหน้าพยาน</p>

        <table class="sig-table">
          <tr>
            <td style="width: 50%;">
              ลงชื่อ ............................................................ ผู้ให้เช่า<br>
              ( <b>${lessor.name || 'ผู้ให้เช่า'}</b> )
            </td>
            <td style="width: 50%;">
              ลงชื่อ ............................................................ ผู้เช่า<br>
              ( <b>${tenant.fullName || 'ผู้เช่า'}</b> )
            </td>
          </tr>
          <tr>
            <td>
              ลงชื่อ ............................................................ พยาน<br>
              ( ............................................................ )
            </td>
            <td>
              ลงชื่อ ............................................................ พยาน<br>
              ( ............................................................ )
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `หนังสือสัญญาเช่า_${(prop.name || 'บ้าน').replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function printA4Contract() {
    switchTab('contract');
    const prevZoom = pdfCurrentZoom;
    const prevRot = pdfRotation;
    pdfCurrentZoom = 1.0;
    pdfRotation = 0;
    pdfApplyZoomAndRotation();

    setTimeout(() => {
      window.print();
      pdfCurrentZoom = prevZoom;
      pdfRotation = prevRot;
      pdfApplyZoomAndRotation();
    }, 150);
  }

  function toggleModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
  }

  function openLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  function openAdminPinModal() {
    const modal = document.getElementById('modal-admin-pin');
    if (modal) modal.classList.remove('hidden');
    const input = document.getElementById('admin-pin-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 150);
    }
  }

  function loginAsRole(role) {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.classList.add('hidden');
    if (role === 'landlord') {
      openAdminPinModal();
    } else {
      setCurrentRole('tenant');
      switchTab('landing');
      alert('👤 คุณอยู่ในโหมดผู้เช่า / บุคคลทั่วไป สามารถดูรายละเอียดทรัพย์สิน สเปกห้อง คำนวณสัญญา และลงทะเบียนได้ครับ');
    }
  }

  function setCurrentRole(role) {
    state.currentRole = role;
    localStorage.setItem('property_os_active_role', role);
    applyRolePermissions();
  }

  function verifyAdminPinSubmit() {
    const input = document.getElementById('admin-pin-input');
    const enteredPin = (input?.value || '').trim();

    if (!enteredPin) {
      alert('⚠️ กรุณากรอกรหัสผ่าน PIN 4 หลัก');
      return;
    }

    const matchedAdmin = (state.adminAccountsState || []).find(a => String(a.pin) === String(enteredPin)) ||
      (enteredPin === '1234' || enteredPin === CONFIG.DEFAULT_PIN ? { id: 'admin-1', name: 'ผู้ดูแลพอร์ตหลัก', pin: enteredPin, role: 'Super Admin' } : null);

    if (matchedAdmin) {
      state.currentRole = 'landlord';
      state.activeAdmin = matchedAdmin;
      localStorage.setItem('property_os_active_role', 'landlord');

      const badgeName = document.getElementById('user-badge-name');
      if (badgeName) badgeName.innerText = matchedAdmin.name;

      const pinModal = document.getElementById('modal-admin-pin');
      if (pinModal) pinModal.classList.add('hidden');
      const overlay = document.getElementById('login-overlay');
      if (overlay) overlay.classList.add('hidden');

      applyRolePermissions();
      switchTab('admin');
      alert(`✅ รหัส PIN ถูกต้อง! ยินดีต้อนรับ คุณ "${matchedAdmin.name}" เข้าสู่ระบบผู้ให้เช่า`);
    } else {
      alert('❌ รหัส PIN ไม่ถูกต้อง! ไม่อนุญาตให้บุคคลทั่วไปเข้าสู่โหมดผู้ให้เช่า (Default PIN: 1234)');
      if (input) {
        input.value = '';
        input.focus();
      }
    }
  }

  function applyRolePermissions() {
    const isLandlord = state.currentRole === 'landlord';
    const badgeRole = document.getElementById('user-badge-role');
    const badgeName = document.getElementById('user-badge-name');
    const roleTitle = document.getElementById('header-role-title');
    const drawerRole = document.getElementById('drawer-user-role');
    const tabPropertyBtn = document.getElementById('tab-property-detail');
    const pdHeaderBadge = document.getElementById('pd-header-badge');

    if (isLandlord) {
      if (badgeRole) {
        badgeRole.innerText = '🔑 ผู้ให้เช่า';
        badgeRole.className = 'px-2 py-0.5 rounded bg-[#e05646] text-white font-bold text-[10px]';
      }
      if (badgeName) badgeName.innerText = state.activeAdmin?.name || 'ผู้ดูแลพอร์ต';
      if (roleTitle) roleTitle.innerText = 'ผู้ให้เช่า (Landlord Mode)';
      if (drawerRole) drawerRole.innerText = '🔑 ผู้ให้เช่า (Landlord)';
      const tabTenantBtn = document.getElementById('tab-tenant');
      if (tabTenantBtn) tabTenantBtn.innerHTML = '<span>👤</span> <span class="tab-label">ลงทะเบียนผู้เช่า</span>';

      ['tab-admin', 'tab-loan-management', 'tab-register-lessor', 'mdrawer-loan', 'mdrawer-register-lessor', 'pd-admin-action-buttons', 'specs-edit-buttons-group', 'subtab-upload-gallery'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
      });
    } else {
      if (badgeRole) {
        badgeRole.innerText = '👤 ผู้เช่า';
        badgeRole.className = 'px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]';
      }
      if (badgeName) badgeName.innerText = 'ผู้เช่า / บุคคลทั่วไป';
      if (roleTitle) roleTitle.innerText = 'ผู้เช่า (Tenant Portal)';
      if (drawerRole) drawerRole.innerText = '👤 ผู้เช่า (Tenant)';
      if (tabPropertyBtn) tabPropertyBtn.innerHTML = '<span>🏡</span> <span class="tab-label">สเปกทรัพย์สิน</span>';
      if (pdHeaderBadge) pdHeaderBadge.innerText = 'ข้อมูลอสังหาฯ เพื่อการตัดสินใจเช่า';

      const tabTenantBtn = document.getElementById('tab-tenant');
      if (tabTenantBtn) tabTenantBtn.innerHTML = '<span>👤</span> <span class="tab-label">พอร์ทัลผู้เช่า</span>';

      ['tab-admin', 'tab-loan-management', 'tab-register-lessor', 'mdrawer-loan', 'mdrawer-register-lessor', 'pd-admin-action-buttons', 'specs-edit-buttons-group', 'subtab-upload-gallery'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });

      const uploadView = document.getElementById('subview-upload-gallery');
      if (uploadView && !uploadView.classList.contains('hidden')) {
        switchSubTab('gallery');
      }
    }
  }

  function switchTab(tab) {
    // If attempting to access landlord-only tabs without authorization, prompt for PIN
    const landlordOnlyTabs = ['admin', 'loan-management', 'register-lessor'];
    if (landlordOnlyTabs.includes(tab) && state.currentRole !== 'landlord') {
      openAdminPinModal();
      return;
    }

    let targetTab = tab;
    // If tenant role clicks tenant tab, route to tenant-dashboard
    if (tab === 'tenant' && state.currentRole === 'tenant') {
      targetTab = 'tenant-dashboard';
    }

    const views = ['landing', 'admin', 'property-detail', 'loan-management', 'register-lessor', 'tenant', 'contract', 'tenant-dashboard'];
    views.forEach(v => {
      const viewEl = document.getElementById(`view-${v}`);
      if (viewEl) viewEl.classList.add('hidden');
    });
    const targetView = document.getElementById(`view-${targetTab}`);
    if (targetView) targetView.classList.remove('hidden');

    const tabs = ['landing', 'admin', 'property-detail', 'loan-management', 'register-lessor', 'tenant', 'contract'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-${t}`);
      if (btn) {
        btn.classList.remove('active');
        btn.classList.add('inactive');
      }
      const mBtn = document.getElementById(`mnav-${t}`);
      if (mBtn) {
        mBtn.className = 'flex-1 flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-400 hover:text-white py-1';
      }
    });

    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) {
      activeBtn.classList.remove('inactive');
      activeBtn.classList.add('active');
    }

    const activeMBtn = document.getElementById(`mnav-${tab}`);
    if (activeMBtn) {
      activeMBtn.className = 'flex-1 flex flex-col items-center gap-0.5 text-[10px] font-black text-emerald-400 py-1 scale-105 transition-all';
    }

    // Scroll back to top immediately on all containers
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    renderAllViews();
  }

  function switchTenantSubView(sub) {
    const dashView = document.getElementById('view-tenant-dashboard');
    const formView = document.getElementById('view-tenant');

    if (sub === 'register') {
      if (dashView) dashView.classList.add('hidden');
      if (formView) formView.classList.remove('hidden');
    } else {
      if (formView) formView.classList.add('hidden');
      if (dashView) dashView.classList.remove('hidden');
    }

    const isReg = sub === 'register';
    ['btn-tenant-sub-dashboard', 'btn-tenant-reg-sub-dashboard'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.className = !isReg
          ? 'px-3 py-2.5 bg-[#383838] text-white rounded-xl font-bold text-center shadow-md transition-all'
          : 'px-3 py-2.5 bg-white text-stone-700 hover:bg-stone-100 rounded-xl font-bold text-center shadow-sm transition-all';
      }
    });

    ['btn-tenant-sub-register', 'btn-tenant-reg-sub-register'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.className = isReg
          ? 'px-3 py-2.5 bg-[#383838] text-white rounded-xl font-bold text-center shadow-md transition-all'
          : 'px-3 py-2.5 bg-white text-stone-700 hover:bg-stone-100 rounded-xl font-bold text-center shadow-sm transition-all';
      }
    });

    // Scroll back to top immediately
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    renderAllViews();
  }

  function switchSubTab(sub) {
    const isLandlord = state.currentRole === 'landlord';
    if (!isLandlord && sub === 'upload-gallery') {
      sub = 'gallery';
    }

    ['specs', 'gallery', 'furniture', 'lessor', 'upload-gallery'].forEach(s => {
      const view = document.getElementById(`subview-${s}`);
      if (view) view.classList.add('hidden');
      const btn = document.getElementById(`subtab-${s}`);
      if (btn) {
        btn.classList.remove('bg-[#383838]', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-stone-700', 'hover:bg-stone-100', 'shadow-sm');
      }
    });

    const activeView = document.getElementById(`subview-${sub}`);
    if (activeView) activeView.classList.remove('hidden');
    const activeBtn = document.getElementById(`subtab-${sub}`);
    if (activeBtn) {
      activeBtn.classList.remove('bg-white', 'text-stone-700', 'hover:bg-stone-100', 'shadow-sm');
      activeBtn.classList.add('bg-[#383838]', 'text-white', 'shadow-md');
    }

    applyRolePermissions();
  }

  function addFurnitureEditRow(name = '', img = CONFIG.PLACEHOLDER_SVG) {
    const container = document.getElementById('pde-furniture-rows-container');
    if (!container) return;
    const rowId = `furn-row-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const row = document.createElement('div');
    row.id = rowId;
    row.className = 'flex items-center gap-2 bg-white border border-stone-300 rounded-lg p-2';
    row.innerHTML = `
      <input type="text" class="pde-furn-name flex-1 bg-stone-50 border border-stone-200 rounded p-1.5 text-xs font-bold text-stone-800" placeholder="ชื่อเฟอร์นิเจอร์ เช่น ตู้เย็น, แอร์" value="${name}">
      <input type="hidden" class="pde-furn-img" value="${img}">
      <img src="${img}" class="w-8 h-8 rounded object-cover border border-stone-200" alt="Furn">
      <button type="button" onclick="document.getElementById('${rowId}').remove()" class="text-rose-600 hover:text-rose-800 font-bold px-2 text-xs">✕</button>
    `;
    container.appendChild(row);
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

    const furnContainer = document.getElementById('pde-furniture-rows-container');
    if (furnContainer) {
      furnContainer.innerHTML = '';
      const list = prop.inventoryList || [];
      if (list.length === 0) {
        addFurnitureEditRow('เครื่องปรับอากาศ', CONFIG.PLACEHOLDER_SVG);
      } else {
        list.forEach(item => {
          const itemObj = typeof item === 'object' ? item : { name: item, img: CONFIG.PLACEHOLDER_SVG };
          addFurnitureEditRow(itemObj.name, itemObj.img);
        });
      }
    }

    toggleModal('modal-edit-property-detail');
  }

  async function handlePropertyDetailEditSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const prop = getCurrentProperty();
    if (!prop) return;

    prop.name = document.getElementById('pde-name')?.value.trim() || prop.name;
    prop.houseNo = document.getElementById('pde-houseno')?.value.trim() || prop.houseNo;
    prop.address = document.getElementById('pde-address')?.value.trim() || prop.address;
    prop.rent = parseFloat(document.getElementById('pde-rent')?.value) || prop.rent;
    prop.deposit = parseFloat(document.getElementById('pde-deposit')?.value) || prop.deposit;
    prop.size = document.getElementById('pde-size')?.value.trim() || prop.size;
    prop.meterElec = document.getElementById('pde-meter-elec')?.value.trim() || prop.meterElec;
    prop.meterWater = document.getElementById('pde-meter-water')?.value.trim() || prop.meterWater;
    prop.lessorKey = document.getElementById('pde-lessor-select')?.value || prop.lessorKey;

    // Collect furniture items
    const furnRows = document.querySelectorAll('#pde-furniture-rows-container > div');
    const newInventory = [];
    furnRows.forEach(r => {
      const name = r.querySelector('.pde-furn-name')?.value.trim();
      const img = r.querySelector('.pde-furn-img')?.value.trim() || CONFIG.PLACEHOLDER_SVG;
      if (name) {
        newInventory.push({ name, img });
      }
    });
    if (newInventory.length > 0) {
      prop.inventoryList = newInventory;
    }

    // Ensure array element is updated in state.propertiesState
    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    } else {
      state.propertiesState.push(prop);
    }

    saveStateToLocalStorage();
    renderAllViews();
    renderPropertyDetailView(prop.id);
    renderContractView();
    toggleModal('modal-edit-property-detail');
    alert(`✅ บันทึกการแก้ไขสเปก & ที่อยู่ "${prop.name}" เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  const handlePropertyEditSubmit = handlePropertyDetailEditSubmit;

  function openQuickMeterModal() {
    const prop = getCurrentProperty();
    if (!prop) {
      alert('กรุณาเลือกทรัพย์สินก่อนครับ');
      return;
    }
    if (document.getElementById('qm-meter-elec')) document.getElementById('qm-meter-elec').value = prop.meterElec || '';
    if (document.getElementById('qm-meter-water')) document.getElementById('qm-meter-water').value = prop.meterWater || '';
    toggleModal('modal-quick-meters');
  }

  async function handleQuickMeterSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const prop = getCurrentProperty();
    if (!prop) return;

    prop.meterElec = document.getElementById('qm-meter-elec')?.value.trim() || '';
    prop.meterWater = document.getElementById('qm-meter-water')?.value.trim() || '';

    const propIdx = state.propertiesState.findIndex(p => String(p.id) === String(prop.id));
    if (propIdx >= 0) {
      state.propertiesState[propIdx] = prop;
    }

    saveStateToLocalStorage();
    renderPropertyDetailView(prop.id);
    renderContractView();
    toggleModal('modal-quick-meters');
    alert(`✅ บันทึกเลขมิเตอร์ไฟ (${prop.meterElec || '-'}) และมิเตอร์น้ำ (${prop.meterWater || '-'}) เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
      });
    } catch (err) {}
  }

  async function handleAddPropertySubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = document.getElementById('p-name')?.value.trim();
    const houseNo = document.getElementById('p-houseno')?.value.trim();
    const address = document.getElementById('p-address')?.value.trim();
    const lessorKey = document.getElementById('p-lessor')?.value || 'lessor-1786648676672';
    const principal = parseFloat(document.getElementById('p-principal')?.value) || 0;
    const installment = parseFloat(document.getElementById('p-installment')?.value) || 0;
    const startDate = document.getElementById('p-startdate')?.value || new Date().toISOString().split('T')[0];
    const meterElec = document.getElementById('p-meter-elec')?.value.trim() || '';
    const meterWater = document.getElementById('p-meter-water')?.value.trim() || '';

    if (!name || !houseNo) {
      alert('กรุณากรอกชื่อโครงการและบ้านเลขที่');
      return;
    }

    const newProp = {
      id: `prop-${Date.now()}`,
      name,
      houseNo,
      address,
      lessorKey,
      type: 'อสังหาริมทรัพย์เพื่อการเช่า',
      size: '35 ตารางเมตร',
      rent: installment > 0 ? installment : 10000,
      deposit: installment > 0 ? installment * 2 : 20000,
      principal,
      installment,
      rate: 4.5,
      startDate,
      meterElec,
      meterWater,
      inventoryList: [
        { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: CONFIG.PLACEHOLDER_SVG }
      ],
      rateSchedule: [
        { startMonth: 1, endMonth: 36, rate: 4.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
        { startMonth: 37, endMonth: 360, rate: 6.0, label: 'อัตราดอกเบี้ยลอยตัว (MRR-0.5%)' }
      ]
    };

    state.propertiesState.unshift(newProp);
    state.currentPropertyId = newProp.id;
    saveStateToLocalStorage();
    renderAllViews();
    toggleModal('modal-add-property');
    alert(`✅ เพิ่มทรัพย์สินใหม่ "${newProp.name}" เรียบร้อยแล้ว!`);

    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      });
    } catch (err) {}
  }

  // 11. GLOBAL BINDINGS EXPOSURE
  window.CONFIG = CONFIG;
  window.state = state;
  window.saveStateToLocalStorage = saveStateToLocalStorage;
  window.getCurrentProperty = getCurrentProperty;
  window.calculateMortgage = calculateMortgage;
  window.getPropertyOccupancy = getPropertyOccupancy;
  window.checkLeaseDateConflict = checkLeaseDateConflict;
  window.syncFromCloudflareD1 = syncFromCloudflareD1;
  window.renderAllViews = renderAllViews;
  window.renderAdminData = renderAdminData;
  window.handleDetailPropertySwitch = handleDetailPropertySwitch;
  window.handleLoanPropertySwitch = handleLoanPropertySwitch;
  window.renderPropertyDetailView = renderPropertyDetailView;
  window.renderLoanManagementView = renderLoanManagementView;
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
  window.calculateLeaseEndDate = calculateLeaseEndDate;
  window.renderContractView = renderContractView;
  window.toggleModal = toggleModal;
  window.openLoginOverlay = openLoginOverlay;
  window.loginAsRole = loginAsRole;
  window.setCurrentRole = setCurrentRole;
  window.openAdminPinModal = openAdminPinModal;
  window.verifyAdminPinSubmit = verifyAdminPinSubmit;
  window.renderAdminAccountsList = renderAdminAccountsList;
  window.handleAddAdminSubmit = handleAddAdminSubmit;
  window.deleteAdminAccount = deleteAdminAccount;
  window.applyRolePermissions = applyRolePermissions;
  window.switchTab = switchTab;
  window.switchSubTab = switchSubTab;
  window.switchTenantSubView = switchTenantSubView;
  window.openEditPropertyDetailModal = openEditPropertyDetailModal;
  window.handlePropertyEditSubmit = handlePropertyEditSubmit;
  window.handlePropertyDetailEditSubmit = handlePropertyDetailEditSubmit;
  window.addFurnitureEditRow = addFurnitureEditRow;
  window.deleteProperty = deleteProperty;
  window.deleteRegisteredTenant = deleteRegisteredTenant;
  window.editRegisteredTenant = editRegisteredTenant;
  window.handleTenantSubmit = handleTenantSubmit;
  window.handleTenantRegisterTabSubmit = handleTenantRegisterTabSubmit;
  window.deleteRegisteredLessor = deleteRegisteredLessor;
  window.editRegisteredLessor = editRegisteredLessor;
  window.handleLessorRegisterTabSubmit = handleLessorRegisterTabSubmit;
  window.openQuickMeterModal = openQuickMeterModal;
  window.handleQuickMeterSubmit = handleQuickMeterSubmit;
  window.handleAddPropertySubmit = handleAddPropertySubmit;
  window.renderPropertyGallery = renderPropertyGallery;
  window.uploadPropertyGalleryMultiple = uploadPropertyGalleryMultiple;
  window.editCategoryDescription = editCategoryDescription;
  window.openAddMediaLinkModal = openAddMediaLinkModal;
  window.handleAddMediaLinkSubmit = handleAddMediaLinkSubmit;
  window.deleteGalleryItem = deleteGalleryItem;
  window.openGalleryLightbox = openGalleryLightbox;
  window.openPromoCoverLightbox = openPromoCoverLightbox;
  window.prevLightboxMedia = prevLightboxMedia;
  window.nextLightboxMedia = nextLightboxMedia;
  window.togglePdfSidebar = togglePdfSidebar;
  window.pdfJumpToPage = pdfJumpToPage;
  window.pdfPrevPage = pdfPrevPage;
  window.pdfNextPage = pdfNextPage;
  window.handlePdfZoomChange = handlePdfZoomChange;
  window.pdfZoomIn = pdfZoomIn;
  window.pdfZoomOut = pdfZoomOut;
  window.pdfRotate = pdfRotate;
  window.downloadContractDocx = downloadContractDocx;
  window.printA4Contract = printA4Contract;
  window.copyPropertyPromoLink = copyPropertyPromoLink;

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
