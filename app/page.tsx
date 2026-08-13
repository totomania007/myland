import Link from 'next/link';
import { BuildingOffice2Icon, UserGroupIcon, ShieldCheckIcon, DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      {/* 2026 Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[25rem] h-[25rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl text-center z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md shadow-lg shadow-emerald-500/5">
          <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
          <span>YouEstates Rental Property OS • 2026 SaaS Fintech Trend</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent">
            ระบบบริหารอสังหาริมทรัพย์และติดตามการลงทุน
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Rental Property Management & Real Estate Portfolio Dashboard พร้อม Bento Grid Layout และสัญญาเช่ามาตรฐาน A4
          </p>
        </div>

        {/* 2026 Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
          {/* Admin Financial Dashboard Card */}
          <Link
            href="/admin/dashboard"
            className="group bento-card p-8 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/20 transition-all" />
            <div>
              <div className="p-3.5 bg-emerald-500/15 text-emerald-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform border border-emerald-500/20">
                <BuildingOffice2Icon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Admin Financial Dashboard
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                ติดตามยอดกู้ธนาคาร ดอกเบี้ย ค่างวดผ่อน ยอดหนี้คงเหลือ และ Cashflow รายเดือนด้วย Bento Grid
              </p>
            </div>
            <div className="mt-8 text-xs font-bold text-emerald-400 flex items-center gap-1.5 group-hover:gap-3 transition-all">
              <span>เข้าสู่พอร์ตผู้บริหาร</span>
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </Link>

          {/* Tenant Portal Card */}
          <Link
            href="/tenant/onboarding"
            className="group bento-card p-8 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-2xl rounded-full group-hover:bg-teal-500/20 transition-all" />
            <div>
              <div className="p-3.5 bg-teal-500/15 text-teal-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform border border-teal-500/20">
                <UserGroupIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                Tenant Self-Service Portal
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                สำหรับผู้เช่า ลงทะเบียน ยินยอม PDPA คำนวณวันสิ้นสุดสัญญาเช่า และอัปโหลดสำเนาบัตรประชาชน
              </p>
            </div>
            <div className="mt-8 text-xs font-bold text-teal-400 flex items-center gap-1.5 group-hover:gap-3 transition-all">
              <span>ลงทะเบียนผู้เช่า</span>
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </Link>

          {/* Lease Contract Generator Card */}
          <Link
            href="/admin/contracts"
            className="group bento-card p-8 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full group-hover:bg-rose-500/20 transition-all" />
            <div>
              <div className="p-3.5 bg-rose-500/15 text-rose-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform border border-rose-500/20">
                <DocumentTextIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                Lease Contract A4 Generator
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                พิมพ์หนังสือสัญญาเช่ามาตรฐานขนาด A4 ฟอนต์ TH Sarabun 16pt พร้อมเอกสารแนบท้าย ๓ ชุด
              </p>
            </div>
            <div className="mt-8 text-xs font-bold text-rose-400 flex items-center gap-1.5 group-hover:gap-3 transition-all">
              <span>พิมพ์สัญญาเช่า A4</span>
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

