'use client';

import React from 'react';
import Link from 'next/link';
import ContractGenerator from '@/components/ContractGenerator';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const demoContractData = {
  contractNumber: 'CNT-2026-0801',
  createdDate: '1 สิงหาคม 2026',
  lessorName: 'บริษัท พรอพเพอร์ตี้ แมเนจเม้นท์ จำกัด',
  lessorIdCard: '0-1055-99999-99-9',
  lessorPhone: '02-777-8888',
  lessorAddress: '88 อาคารสาทรธานี ชั้น 15 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร',
  lesseeName: 'นายสมชาย ใจดี',
  lesseeIdCard: '1-1004-99999-99-9',
  lesseePhone: '081-234-5678',
  lesseeAddress: '123/45 ถนนสุขุมวิท แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร',
  lesseeIdCardImageUrl: 'https://res.cloudinary.com/demo/image/upload/v1631234567/sample_id_card.jpg',
  propertyName: 'แอสเพน คอนโด สุขุมวิท 101',
  unitNumber: '101/12',
  monthlyRent: 12000,
  securityDeposit: 24000,
  startDate: '1 สิงหาคม 2026',
  endDate: '31 กรกฎาคม 2027',
};

export default function ContractsPage() {
  return (
    <div>
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 no-print">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs">
          <ArrowLeftIcon className="w-4 h-4" /> กลับสู่หน้าหลัก
        </Link>
      </div>
      <ContractGenerator data={demoContractData} />
    </div>
  );
}
