'use client';

import React from 'react';
import { PrinterIcon } from '@heroicons/react/24/outline';

export interface OfficialContractData {
  contractPlace: string;
  createdDate: string;
  lessorName: string;
  lessorAge: number;
  lessorAddress: string;
  lesseeName: string;
  lesseeAge: number;
  lesseeAddress: string;
  houseNo: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  durationYears: number;
  startDateText: string;
  endDateText: string;
  monthlyRent: number;
  monthlyRentText: string;
  payDay: number;
  securityDeposit: number;
  securityDepositText: string;
  lesseeIdCardImageUrl?: string;
}

interface ContractGeneratorProps {
  data: OfficialContractData;
}

export default function ContractGenerator({ data }: ContractGeneratorProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 md:p-8 font-sans">
      {/* Action Bar (Hidden during printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
        <div>
          <h2 className="text-xl font-bold text-white">หนังสือสัญญาเช่าบ้าน (มาตรฐานกฎหมาย 7 ข้อ)</h2>
          <p className="text-xs text-slate-400">ระบบสร้างสัญญาเช่า A4 Dual Section (ต้นฉบับ & สำเนา)</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer text-xs"
        >
          <PrinterIcon className="w-5 h-5" />
          พิมพ์สัญญา A4 (Print Original & Copy)
        </button>
      </div>

      {/* A4 Document Container */}
      <div className="max-w-[210mm] mx-auto space-y-8 print:space-y-0">
        {/* SECTION 1: ต้นฉบับ (ORIGINAL) */}
        <OfficialLeaseDocument data={data} copyType="ต้นฉบับ (Original)" />

        {/* Page Break for printing second copy */}
        <div className="page-break" />

        {/* SECTION 2: สำเนา (COPY) */}
        <OfficialLeaseDocument data={data} copyType="สำเนา (Copy)" />
      </div>

      {/* Global CSS for A4 Media Printing */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm 15mm 15mm 15mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Sarabun', 'TH Sarabun PSK', sans-serif;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            break-after: page;
            page-break-after: always;
            height: 0;
            display: block;
          }
          .a4-page {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

// Subcomponent: 7-Clause Standard Thai Lease Agreement Document
function OfficialLeaseDocument({
  data,
  copyType,
}: {
  data: OfficialContractData;
  copyType: 'ต้นฉบับ (Original)' | 'สำเนา (Copy)';
}) {
  return (
    <div className="a4-page bg-white text-black p-[20mm] rounded-sm shadow-2xl border border-slate-300 relative text-[13px] leading-relaxed">
      {/* Header Watermark Badge */}
      <div className="absolute top-6 right-6 border border-slate-900 text-slate-900 text-xs font-bold px-3 py-1 rounded">
        {copyType}
      </div>

      {/* Title */}
      <div className="text-center font-bold text-xl mb-6 tracking-wide">
        หนังสือสัญญาเช่าบ้าน
      </div>

      <div className="text-right mb-4">
        สัญญานี้ทำที่: {data.contractPlace}<br />
        วันที่: {data.createdDate}
      </div>

      {/* Contract Body Paragraphs */}
      <div className="space-y-3 text-justify">
        <p>
          ระหว่าง <strong>{data.lessorName}</strong> อายุ {data.lessorAge} ปี อยู่ที่ {data.lessorAddress} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <strong>“ผู้ให้เช่า”</strong> ฝ่ายหนึ่ง
        </p>

        <p>
          กับ <strong>{data.lesseeName}</strong> อายุ {data.lesseeAge} ปี อยู่ที่ {data.lesseeAddress} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <strong>“ผู้เช่า”</strong> อีกฝ่ายหนึ่ง
        </p>

        <p className="indent-8 font-semibold">ทั้งสองฝ่ายตกลงทำสัญญากันไว้มีข้อความดังต่อไปนี้</p>

        <p>
          <strong>ข้อ ๑</strong> ผู้ให้เช่าตกลงให้เช่าและผู้เช่าตกลงรับเช่าบ้านเลขที่ <strong>{data.houseNo}</strong> ซึ่งอยู่ที่ถนน {data.street} ตำบล/แขวง {data.subdistrict} อำเภอ/เขต {data.district} จังหวัด {data.province} ซึ่งต่อไปในสัญญานี้จะเรียกว่า <strong>“ทรัพย์สิน”</strong> มีกำหนดเวลา <strong>{data.durationYears} ปี</strong> เพื่อใช้เป็นที่อยู่อาศัย นับตั้งแต่วันที่ <strong>{data.startDateText}</strong> ถึงวันที่ <strong>{data.endDateText}</strong> และผู้เช่ายอมเสียค่าเช่าให้เดือนละ <strong>฿{data.monthlyRent.toLocaleString()} บาท ({data.monthlyRentText})</strong> มีกำหนดชำระเงินค่าเช่าทุกวันที่ <strong>{data.payDay}</strong> ของทุกๆ เดือน หากผู้เช่าไม่ชำระตามที่กำหนด ยอมให้ผู้ให้เช่ายึดทรัพย์สินและปิดประตูใส่กุญแจทรัพย์สินที่เช่าได้
        </p>

        <p>
          <strong>ข้อ ๒</strong> เพื่อเป็นการประกันในการปฏิบัติตามสัญญาเช่า ผู้เช่าตกลงมอบเงินประกันการเช่าจำนวน <strong>฿{data.securityDeposit.toLocaleString()} บาท ({data.securityDepositText})</strong> ให้แก่ผู้ให้เช่า และผู้ให้เช่าได้รับเงินจำนวนดังกล่าวไปเรียบร้อยแล้วในวันทำสัญญาฉบับนี้ ถ้าผู้เช่าเช่าครบกำหนดตามสัญญา ผู้ให้เช่าจะคืนเงินประกันให้หลังจากที่ได้หักเป็นค่าใช้จ่ายหรือค่าเสียหายอย่างใดๆ อันเกิดขึ้นแก่ทรัพย์สินที่เช่าแล้ว
        </p>

        <p><strong>ข้อ ๓</strong> ผู้เช่าสัญญาว่า:</p>
        <div className="pl-6 space-y-1.5 text-slate-800">
          <p>(๑) จะเป็นผู้ชำระค่าน้ำ ค่าไฟฟ้า ค่าโทรศัพท์ ของบ้านหลังที่เช่าเอง และนำใบเสร็จการชำระเงินมามอบให้ผู้ให้เช่าในวันชำระค่าเช่าของทุกเดือน</p>
          <p>(๒) จะเป็นผู้รับภาระชำระค่าภาษีโรงเรือนและที่ดิน</p>
          <p>(๓) เมื่อผู้เช่าประสงค์จะดัดแปลงหรือก่อสร้างเพิ่มเติมทรัพย์สินที่เช่านี้จะต้องเสนอแบบแปลนและรายการให้ผู้ให้เช่าพิจารณา เมื่อผู้ให้เช่าให้ความยินยอมเป็นหนังสือแล้วจึงจะทำได้ บรรดาสิ่งที่ผู้เช่านำมาติดตั้งในทรัพย์สินที่เช่า ถ้ามีลักษณะเป็นสิ่งติดตึงกับตัวอาคาร หรือที่ดินบริเวณทรัพย์สินที่เช่าแล้ว ผู้เช่าจะขุดหรือรื้อถอนไปไม่ได้ เว้นแต่จะได้รับอนุญาตเป็นหนังสือจากผู้ให้เช่า</p>
          <p>(๔) ผู้เช่ายอมให้ผู้ให้เช่าหรือตัวแทนของผู้ให้เช่าไปตรวจทรัพย์สินที่เช่าได้เสมอ</p>
          <p>(๕) ถ้าผู้เช่าจะทำประกันอัคคีภัยอย่างใดในทรัพย์สินที่เช่า ผู้เช่าต้องได้รับความยินยอมเป็นหนังสือจากผู้ให้เช่าจึงจะทำได้</p>
          <p>(๖) ผู้เช่าจะสงวนรักษาอาคารและส่วนประกอบรวมทั้งอุปกรณ์ทั้งหลาย และเครื่องตกแต่งอาคารและสถานที่เช่าให้อยู่ในสภาพอันบำรุงรักษาอย่างดีตามควรแก่สภาพสิ่งของนั้นๆ และจะทำการซ่อมแซมเล็กน้อยตามที่จำเป็นเพื่อการสงวนรักษาทรัพย์สินดังกล่าวนั้นด้วย</p>
          <p>(๗) ผู้เช่าจะไม่ให้เช่าช่วง และไม่ยอมให้บุคคลอื่นนอกจากบุคคลในครอบครัวของผู้เช่าเข้าอยู่ในทรัพย์สินและที่ดินบริเวณทรัพย์สินที่เช่า</p>
          <p>(๘) ผู้เช่าจะไม่โอนสิทธิการเช่าของตนซึ่งมีอยู่เหนือทรัพย์สินที่เช่า ไม่ว่าทั้งหมดหรือบางส่วนให้แก่บุคคลอื่น</p>
          <p>(๙) ผู้เช่าจะไม่ประพฤติและกระทำการอย่างหนึ่งอย่างใดเป็นที่รำคาญแก่เพื่อนบ้านใกล้เคียงหรือกระทำการสิ่งนี้น่าจะเป็นอันตรายแก่สถานที่เช่าหรืออาจเป็นอันตรายแก่บุคคลหรือทรัพย์สินของผู้หนึ่งผู้ใดที่อยู่ใกล้เคียง และจะไม่กระทำหรือให้ผู้อื่นกระทำการอันผิดกฎหมายในสถานที่เช่านี้</p>
          <p>(๑๐) ผู้เช่าจะเป็นผู้รับผิดในบรรดาความเสียหาย หรือบุบสลายใดๆ อันเกิดขึ้นแก่ทรัพย์สินที่เช่าเพราะความผิดของผู้เช่าหรือบุคคลในครอบครัวของผู้เช่า</p>
        </div>

        <p>
          <strong>ข้อ ๔</strong> ผู้ให้เช่าสัญญาว่า: (๑) จะออกใบรับเงินค่าเช่าทุกคราวที่รับชำระค่าเช่า (๒) จะทำการซ่อมแซมทรัพย์สินที่เช่าตามหน้าที่ของผู้ให้เช่า เว้นแต่การซ่อมแซมเล็กน้อย เพื่อสงวนรักษาทรัพย์สินอันเป็นหน้าที่ของผู้เช่าดังกล่าวในข้อสาม (๖)
        </p>

        <p>
          <strong>ข้อ ๕</strong> ถ้าผู้เช่าไม่ปฏิบัติตามสัญญาเช่านี้ไม่ว่าด้วยเหตุใดๆ ผู้ให้เช่ามีสิทธิบอกเลิกสัญญาเช่าได้ทันที นอกจากนี้ถ้าผู้เช่าถูกศาลสั่งยึดทรัพย์ ให้ถือว่าสัญญานี้เป็นอันเลิกกันทันที โดยผู้ให้เช่าไม่ต้องบอกเลิก
        </p>

        <p>
          <strong>ข้อ ๖</strong> เมื่อสัญญาเช่าระงับสิ้นไปไม่ว่าด้วยเหตุใดๆ ก็ตาม ผู้ให้เช่ามีสิทธิเข้าครอบครองทรัพย์สินที่เช่า โดยถือว่าผู้เช่าและบริวารยินยอมออกจากทรัพย์สินที่เช่า ทั้งนี้ โดยผู้ให้เช่ามีสิทธิขนย้ายทรัพย์สินของผู้เช่าและบุคคลในครอบครัวของผู้เช่าออกจากทรัพย์สินที่เช่า รวมทั้งปิดประตูใส่กุญแจทรัพย์สินที่เช่าได้ทันที และผู้เช่าตกลงจะเป็นผู้รับผิดชอบในค่าใช้จ่ายและความเสียหายที่เกิดขึ้นจากการดังกล่าวเพียงผู้เดียว
        </p>

        <p>
          <strong>ข้อ ๗</strong> ในวันทำสัญญานี้ผู้เช่าได้ตรวจตราทรัพย์สินที่เช่าแล้ว เห็นว่ามีสภาพดีและเป็นปกติดีทุกประการ และผู้ให้เช่าได้ส่งมอบทรัพย์สินที่เช่าให้แก่ผู้เช่าแล้ว
        </p>

        <p className="indent-8 mt-4">
          สัญญานี้ทำขึ้นสองฉบับ มีข้อความตรงกัน คู่สัญญาได้อ่านเข้าใจข้อความในสัญญานี้โดยตลอดแล้ว จึงลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยานและยึดถือไว้ฝ่ายละฉบับ
        </p>
      </div>

      {/* Cloudinary Evidence Attachment */}
      {data.lesseeIdCardImageUrl && (
        <div className="mt-6 pt-3 border-t border-slate-300">
          <div className="text-[11px] font-bold text-slate-700 mb-1">เอกสารแนบท้าย: สำเนาบัตรประชาชนผู้เช่า (ผ่านระบบ Cloudinary Storage)</div>
          <div className="w-48 h-28 border border-slate-400 rounded overflow-hidden">
            {/* eslint-disable-next-next/no-img-element */}
            <img
              src={data.lesseeIdCardImageUrl}
              alt="ID Card Attachment"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>
      )}

      {/* Signature Lines */}
      <div className="mt-10 pt-4 border-t border-slate-400 grid grid-cols-2 gap-8 text-center text-xs">
        <div>
          <div className="mb-10 font-bold">ลงชื่อ..........................................................ผู้ให้เช่า</div>
          <div>({data.lessorName})</div>
        </div>

        <div>
          <div className="mb-10 font-bold">ลงชื่อ..........................................................ผู้เช่า</div>
          <div>({data.lesseeName})</div>
        </div>

        <div>
          <div className="mb-8">ลงชื่อ..........................................................พยาน</div>
          <div>(..........................................................)</div>
        </div>

        <div>
          <div className="mb-8">ลงชื่อ..........................................................พยาน</div>
          <div>(..........................................................)</div>
        </div>
      </div>
    </div>
  );
}
