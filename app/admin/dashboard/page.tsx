'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateMortgageMetrics, getContractExpiryDays } from '@/lib/financial-utils';
import { 
  BuildingOffice2Icon, 
  BanknotesIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  PlusIcon,
  DocumentTextIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const mockProperties: Array<{
  id: string;
  name: string;
  address: string;
  totalPrincipal: number;
  monthlyInstallment: number;
  interestRate: number;
  loanStartDate: string;
  units: Array<{ id: string; unitNumber: string; rentPrice: number; status: 'occupied' | 'vacant' }>;
}> = [];

const mockContracts: Array<{
  id: string;
  unitNumber: string;
  tenantName: string;
  endDate: string;
  monthlyRent: number;
}> = [];

export default function AdminFinancialDashboard() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');
  const [fabOpen, setFabOpen] = useState<boolean>(false);

  const propertyMetrics = useMemo(() => {
    return mockProperties.map((p) => {
      const occupiedRent = p.units
        .filter((u) => u.status === 'occupied')
        .reduce((sum, u) => sum + u.rentPrice, 0);

      const metrics = calculateMortgageMetrics(
        p.totalPrincipal,
        p.monthlyInstallment,
        p.interestRate,
        p.loanStartDate,
        occupiedRent
      );

      return {
        ...p,
        occupiedRent,
        ...metrics,
      };
    });
  }, []);

  const portfolioSummary = useMemo(() => {
    const totalPrincipal = propertyMetrics.reduce((s, p) => s + p.totalPrincipal, 0);
    const totalRemaining = propertyMetrics.reduce((s, p) => s + p.remainingBalance, 0);
    const totalInstallment = propertyMetrics.reduce((s, p) => s + p.monthlyInstallment, 0);
    const totalRentalIncome = propertyMetrics.reduce((s, p) => s + p.occupiedRent, 0);
    const netCashflow = totalRentalIncome - totalInstallment;

    return {
      totalPrincipal,
      totalRemaining,
      totalInstallment,
      totalRentalIncome,
      netCashflow,
      paidOffPercent: Math.round(((totalPrincipal - totalRemaining) / totalPrincipal) * 100),
    };
  }, [propertyMetrics]);

  const expiringAlerts = useMemo(() => {
    return mockContracts
      .map((c) => {
        const daysLeft = getContractExpiryDays(c.endDate);
        let alertLevel: 'urgent' | 'warning' | 'info' | null = null;

        if (daysLeft <= 7) alertLevel = 'urgent';
        else if (daysLeft <= 15) alertLevel = 'warning';
        else if (daysLeft <= 30) alertLevel = 'info';

        return { ...c, daysLeft, alertLevel };
      })
      .filter((c) => c.alertLevel !== null)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 md:p-10 font-sans pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-xs transition-colors font-medium">
          <ArrowLeftIcon className="w-4 h-4" /> กลับสู่หน้าหลัก
        </Link>

        {/* 2026 Glassmorphism Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheckIcon className="w-4 h-4" /> 2026 Bento Grid Financial OS
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <BuildingOffice2Icon className="w-9 h-9 text-emerald-400" />
              Admin Financial & Mortgage Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              ภาพรวมพอร์ตการลงทุนอสังหาริมทรัพย์ คำนวณดอกเบี้ย ยอดกู้คงเหลือ และ Cashflow รายเดือน
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">เลือกอสังหาริมทรัพย์:</span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              aria-label="เลือกอสังหาริมทรัพย์"
              className="bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs md:text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none backdrop-blur-md shadow-lg"
            >
              <option value="all">พอร์ตการลงทุนทั้งหมด (All Properties)</option>
              {mockProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contract Renewal Alerts Section */}
        {expiringAlerts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                แจ้งเตือนสัญญาเช่าใกล้ครบกำหนด (Upcoming Contract Renewals)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {expiringAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between shadow-xl backdrop-blur-md transition-all ${
                    alert.alertLevel === 'urgent'
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : alert.alertLevel === 'warning'
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-blue-950/40 border-blue-500/50 text-blue-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span>ห้อง {alert.unitNumber}</span>
                      <span className="text-xs font-normal opacity-80">({alert.tenantName})</span>
                    </div>
                    <div className="text-xs opacity-75 mt-1">หมดสัญญา: {alert.endDate}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-black rounded-full ${
                        alert.alertLevel === 'urgent'
                          ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                          : alert.alertLevel === 'warning'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      เหลือ {alert.daysLeft} วัน
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2026 Bento Grid Overview */}
        <div className="bento-grid">
          {/* Bento Card 1: Principal & Remaining Debt */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-3">
                <span>ยอดหนี้คงเหลือรวม</span>
                <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-xl">
                  <BanknotesIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-black text-white">
                ฿{portfolioSummary.totalRemaining.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                จากยอดกู้รวม ฿{portfolioSummary.totalPrincipal.toLocaleString()}
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${portfolioSummary.paidOffPercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 flex justify-between font-medium">
                <span>ชำระเงินต้นแล้ว</span>
                <strong className="text-emerald-400 font-bold">{portfolioSummary.paidOffPercent}%</strong>
              </p>
            </div>
          </div>

          {/* Bento Card 2: Total Rental Income */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-3">
                <span>รายได้ค่าเช่ารวม / เดือน</span>
                <div className="p-2 bg-blue-500/15 text-blue-400 rounded-xl">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-black text-blue-400">
                ฿{portfolioSummary.totalRentalIncome.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              จากยูนิตที่มีผู้เช่าในระบบทั้งหมด
            </p>
          </div>

          {/* Bento Card 3: Total Bank Installment */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-3">
                <span>ค่างวดผ่อนรวม / เดือน</span>
                <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                  <ClockIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-black text-amber-400">
                ฿{portfolioSummary.totalInstallment.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              ภาระค่างวดผ่อนชำระธนาคาร
            </p>
          </div>

          {/* Bento Card 4: Net Monthly Cashflow */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 bento-card p-6 border-2 border-emerald-500/40 bg-slate-900/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-3">
                <span>Net Cashflow / เดือน</span>
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
              </div>
              <div
                className={`text-2xl md:text-3xl font-black ${
                  portfolioSummary.netCashflow >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {portfolioSummary.netCashflow >= 0 ? '+' : ''}฿
                {portfolioSummary.netCashflow.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 text-xs font-semibold">
              {portfolioSummary.netCashflow >= 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-4 h-4" /> กระแสเงินสดเป็นบวก (Positive)
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <ArrowTrendingDownIcon className="w-4 h-4" /> กระแสเงินสดเป็นลบ (Subsidize)
                </span>
              )}
            </div>
          </div>

          {/* Bento Card 5: Interactive Financial Donut Chart */}
          <div className="col-span-12 md:col-span-6 bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                สัดส่วนกระแสเงินสด (Cashflow Breakdown)
              </h3>
              <span className="text-xs text-slate-400">Interactive SVG</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* SVG Donut Chart */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-800"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Rent Circle (Blue) */}
                  <path
                    className="text-blue-500"
                    strokeDasharray="60, 100"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Installment Circle (Amber) */}
                  <path
                    className="text-amber-500"
                    strokeDasharray="40, 100"
                    strokeDashoffset="-60"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Net Profit Circle (Emerald) */}
                  <path
                    className="text-emerald-400"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-90"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xs text-slate-400 block">Net Income</span>
                  <span className="text-sm font-black text-emerald-400">
                    +฿{portfolioSummary.netCashflow.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Donut Legend */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span className="text-slate-300">ค่าเช่ารับรวม:</span>
                  <strong className="text-white">฿{portfolioSummary.totalRentalIncome.toLocaleString()}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="text-slate-300">ค่างวดผ่อนธนาคาร:</span>
                  <strong className="text-white">฿{portfolioSummary.totalInstallment.toLocaleString()}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-slate-300">กระแสเงินสดสุทธิ:</span>
                  <strong className="text-emerald-400">฿{portfolioSummary.netCashflow.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 6: Amortization Projection Area Chart */}
          <div className="col-span-12 md:col-span-6 bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                ตารางผ่อนชำระ (144 Months Amortization Curve)
              </h3>
              <span className="text-xs text-slate-400">Loan Reduction</span>
            </div>
            
            {/* SVG Area Chart */}
            <div className="w-full h-36 relative flex items-end pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,5 Q30,12 60,25 T100,38 L100,40 L0,40 Z"
                  fill="url(#areaGradient)"
                />
                <path
                  d="M0,5 Q30,12 60,25 T100,38"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-800">
              <span>งวดที่ 1 (ปีแรก)</span>
              <span>งวดที่ 72 (ปีที่ 6)</span>
              <span>งวดที่ 144 (ปีที่ 12)</span>
            </div>
          </div>
        </div>

        {/* Property Breakdown Section */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
            รายละเอียดค่างวดและระยะเวลาผ่อนแต่ละโครงการ (Property Breakdown)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {propertyMetrics.length === 0 ? (
              <div className="col-span-full bento-card p-12 text-center space-y-4">
                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full w-fit mx-auto">
                  <BuildingOffice2Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">ยังไม่มีข้อมูลอสังหาริมทรัพย์ในพอร์ต</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  สามารถเพิ่มทรัพย์สินใหม่ บันทึกสัญญา และผ่อนชำระธนาคาร เพื่อให้ระบบคำนวณ Cashflow สุทธิอัตโนมัติ
                </p>
                <Link
                  href="/admin/contracts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>เพิ่มทรัพย์สิน / สัญญาแรก</span>
                </Link>
              </div>
            ) : (
              propertyMetrics
                .filter((p) => selectedPropertyId === 'all' || p.id === selectedPropertyId)
                .map((p) => (
                <div
                  key={p.id}
                  className="bento-card p-6 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{p.address}</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold bg-slate-800 text-emerald-400 rounded-full border border-emerald-500/30">
                      ดอกเบี้ย {p.interestRate}% ต่อปี
                    </span>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>
                        ผ่อนมาแล้ว: <strong className="text-white">{p.yearsPaidFormatted}</strong> ({p.monthsPaid} งวด)
                      </span>
                      <span>เริ่มผ่อน: {p.loanStartDate}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                        style={{ width: `${p.payoffProgressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">
                        จ่ายเงินต้นแล้ว: ฿{p.totalPrincipalPaid.toLocaleString()}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        ยอดหนี้คงเหลือ: ฿{p.remainingBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">ยอดกู้รวม (Principal):</span>
                      <span className="text-base font-bold text-white">฿{p.totalPrincipal.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">ค่างวดผ่อน/เดือน:</span>
                      <span className="text-base font-bold text-amber-400">฿{p.monthlyInstallment.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">ค่าเช่าที่ได้รับ/เดือน:</span>
                      <span className="text-base font-bold text-blue-400">฿{p.occupiedRent.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block">Cashflow สุทธิ:</span>
                      <span
                        className={`text-base font-bold ${
                          p.monthlyCashflow >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {p.monthlyCashflow >= 0 ? '+' : ''}฿{p.monthlyCashflow.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (2026 Mobile-First SaaS) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2.5 flex justify-around items-center text-slate-300 shadow-2xl">
        <Link href="/admin/dashboard" className="flex flex-col items-center gap-1 text-[11px] font-semibold text-emerald-400">
          <BuildingOffice2Icon className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/tenant/onboarding" className="flex flex-col items-center gap-1 text-[11px] font-semibold hover:text-white transition-colors">
          <ChartBarIcon className="w-5 h-5" />
          <span>Tenant</span>
        </Link>
        <Link href="/admin/contracts" className="flex flex-col items-center gap-1 text-[11px] font-semibold hover:text-white transition-colors">
          <DocumentTextIcon className="w-5 h-5" />
          <span>สัญญา A4</span>
        </Link>
      </div>

      {/* FLOATING ACTION BUTTON (FAB) FOR QUICK ACTIONS */}
      <div className="fixed bottom-20 right-5 md:bottom-8 md:right-8 z-40">
        {fabOpen && (
          <div className="mb-3 flex flex-col gap-2.5 items-end transition-all duration-300">
            <Link href="/admin/contracts" class="bg-slate-900 text-white border border-slate-700 px-4 py-2.5 rounded-full text-xs font-bold shadow-xl hover:bg-slate-800 flex items-center gap-2 whitespace-nowrap">
              <DocumentTextIcon className="w-4 h-4 text-emerald-400" />
              <span>สร้างสัญญาเช่า A4</span>
            </Link>
            <button onClick={() => window.print()} class="bg-slate-900 text-white border border-slate-700 px-4 py-2.5 rounded-full text-xs font-bold shadow-xl hover:bg-slate-800 flex items-center gap-2 whitespace-nowrap">
              <PrinterIcon className="w-4 h-4 text-emerald-400" />
              <span>พิมพ์เอกสาร PDF</span>
            </button>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          aria-label="Quick Actions Menu"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-2xl rounded-full flex items-center justify-center shadow-2xl border border-emerald-300 transition-transform active:scale-95"
        >
          <PlusIcon className={`w-7 h-7 transition-transform ${fabOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>
    </div>
  );
}

