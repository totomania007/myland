import Link from 'next/link';
import { BuildingOffice2Icon, UserGroupIcon, ShieldCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-6">
          <ShieldCheckIcon className="w-4 h-4" /> Cloudflare Pages + Clerk RBAC + Cloudflare D1
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          ระบบบริหารอสังหาริมทรัพย์และติดตามการลงทุน
        </h1>
        <p className="text-slate-400 text-base md:text-lg mb-10 max-w-2xl mx-auto">
          Rental Property Management & Real Estate Investment Dashboard สำหรับผู้บริหารและผู้เช่า
        </p>

        {/* Role Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Admin Portal Card */}
          <Link
            href="/admin/dashboard"
            className="group bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <BuildingOffice2Icon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Admin Financial Dashboard</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              ติดตามยอดกู้ธนาคาร ดอกเบี้ย ค่างวดผ่อน ยอดหนี้คงเหลือ และ Cashflow รายเดือนของทุกโครงการ
            </p>
            <div className="mt-4 text-xs font-bold text-emerald-400 flex items-center gap-1">
              เข้าสู่พอร์ตผู้บริหาร &rarr;
            </div>
          </Link>

          {/* Tenant Onboarding Card */}
          <Link
            href="/tenant/onboarding"
            className="group bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-blue-500/10"
          >
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <UserGroupIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Tenant Portal & Upload</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              สำหรับผู้เช่า ลงทะเบียน ยินยอม PDPA และอัปโหลดสำเนาบัตรประชาชนผ่านระบบ Cloudinary
            </p>
            <div className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1">
              ลงทะเบียนผู้เช่า &rarr;
            </div>
          </Link>

          {/* Printable Lease Contract Generator */}
          <Link
            href="/admin/contracts"
            className="group bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-purple-500/10"
          >
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <DocumentTextIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Printable Lease Generator</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              พิมพ์หนังสือสัญญาเช่ามาตรฐานขนาด A4 แบบ dual section (ต้นฉบับ & สำเนา) พร้อมช่องลงนาม
            </p>
            <div className="mt-4 text-xs font-bold text-purple-400 flex items-center gap-1">
              พิมพ์สัญญาเช่า &rarr;
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
