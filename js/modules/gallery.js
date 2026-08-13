/**
 * YOUESTATES PROPERTY OS — PHOTO GALLERY & PROMO SHOWCASE MODULE
 * 2026 Modular Property Media Gallery & Share Card Generator
 */

import { CONFIG, state, saveStateToLocalStorage } from '../config.js';
import { getCurrentProperty } from './landlord.js';

export function renderPropertyGallery() {
  const container = document.getElementById('galleryGridContainer');
  if (!container) return;

  container.innerHTML = '';
  const prop = getCurrentProperty();
  if (!prop) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-stone-200">
        ยังไม่ได้เลือกอสังหาริมทรัพย์ในระบบ
      </div>
    `;
    return;
  }

  if (!prop.gallery) prop.gallery = [];

  const allPhotos = [...prop.gallery];
  if (prop.inventoryList) {
    prop.inventoryList.forEach(inv => {
      const img = typeof inv === 'object' ? inv.img : '';
      const name = typeof inv === 'object' ? inv.name : inv;
      if (img) {
        allPhotos.push({
          title: name || 'รูปภาพเฟอร์นิเจอร์',
          url: img,
          category: 'interior'
        });
      }
    });
  }

  const filtered = state.currentGalleryFilter === 'all' 
    ? allPhotos 
    : allPhotos.filter(p => p.category === state.currentGalleryFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
        <p class="font-bold">ยังไม่มีรูปถ่ายในหมวดนี้</p>
        <p class="text-xs">กดปุ่ม "☁️ อัปโหลดรูปภาพใหม่" ด้านบนเพื่อเพิ่มรูปบ้าน/อาคาร ภายใน และจุดเด่นส่งโปรโมทให้ลูกค้าได้ทันที</p>
      </div>
    `;
  } else {
    filtered.forEach((img) => {
      const catBadge = img.category === 'exterior' ? '🏠 ภายนอก' : img.category === 'interior' ? '🛋️ ภายใน' : '✨ จุดเด่น';
      container.innerHTML += `
        <div class="group relative rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer" onclick="window.openMediaPreview('${img.title}', '${img.url}')">
          <div class="w-full h-32 bg-stone-100 overflow-hidden">
            <img src="${img.url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${img.title}">
          </div>
          <div class="p-2 flex justify-between items-center">
            <span class="text-xs font-bold text-stone-800 truncate">${img.title}</span>
            <span class="px-1.5 py-0.5 text-[9px] font-bold rounded bg-stone-100 text-stone-600">${catBadge}</span>
          </div>
        </div>
      `;
    });
  }

  // Update Client Promotional Showcase Card
  if (document.getElementById('promo-card-title')) document.getElementById('promo-card-title').innerText = prop.name;
  if (document.getElementById('promo-card-address')) document.getElementById('promo-card-address').innerText = prop.address;
  if (document.getElementById('promo-card-rent')) document.getElementById('promo-card-rent').innerText = `฿${(prop.rent || 0).toLocaleString()} บาท/เดือน`;
  if (document.getElementById('promo-card-deposit')) document.getElementById('promo-card-deposit').innerText = `฿${(prop.deposit || 0).toLocaleString()} บาท`;
  if (document.getElementById('promo-card-size')) document.getElementById('promo-card-size').innerText = prop.size || '40 ตร.ม.';

  const coverImg = allPhotos.length > 0 ? allPhotos[0].url : CONFIG.PLACEHOLDER_SVG;
  if (document.getElementById('promo-card-cover-img')) document.getElementById('promo-card-cover-img').src = coverImg;
}

export function filterGalleryPhotos(filter) {
  state.currentGalleryFilter = filter;
  ['all', 'exterior', 'interior', 'highlight'].forEach(f => {
    const btn = document.getElementById(`gfilter-${f}`);
    if (btn) {
      if (f === filter) btn.className = 'px-3 py-1.5 bg-[#383838] text-white font-bold text-xs rounded-lg shadow-sm';
      else btn.className = 'px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs rounded-lg';
    }
  });
  renderPropertyGallery();
}

export function copyPropertyPromoLink() {
  const prop = getCurrentProperty();
  const title = prop ? prop.name : 'อสังหาริมทรัพย์เพื่อการเช่า';
  const price = prop ? prop.rent : 0;
  const shareText = `🏡 ${title}\n📍 ${prop ? prop.address : ''}\n💰 อัตราค่าเช่าเพียง ฿${price.toLocaleString()} /เดือน\n✨ ดูรายละเอียดและรูปภาพเพิ่มเติม: ${window.location.origin}`;
  navigator.clipboard.writeText(shareText);
  alert('คัดลอกข้อความและลิงก์โปรโมทสำเร็จ! สามารถวางส่งทาง Line หรือ Messenger ให้ลูกค้าที่สนใจได้ทันทีครับ');
}
