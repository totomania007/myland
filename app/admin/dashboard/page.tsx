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
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const mockProperties = [
  {
    id: 'prop-1',
    name: 'แอสเพน คอนโด สุขุมวิท 101',
    address: '101 ถนนสุขุมวิท พระโขนง กรุงเทพฯ',
    totalPrincipal: 3500000,
    monthlyInstallment: 17500,
    interestRate: 4.25,
    loanStartDate: '2022-03-15',
    units: [
      { id: 'u-101', unitNumber: '101/12', rentPrice: 12000, status: 'occupied' },
      { id: 'u-102', unitNumber: '101/14', rentPrice: 11500, status: 'occupied' },
      { id: 'u-103', unitNumber: '101/16', rentPrice: 11000, status: 'vacant' },
    ]
  },
  {
    id: 'prop-2',
    name: 'ลุมพินี พาร์ค พระราม 9',
    address: '88 ถนนพระราม 9 ห้วยขวาง กรุงเทพฯ',
    totalPrincipal: 5200000,
    monthlyInstallment: 26000,
    interestRate: 4.75,
    loanStartDate: '2021-08-01',
    units: [
      { id: 'u-201', unitNumber: 'B-501', rentPrice: 15000, status: 'occupied' },
      { id: 'u-202', unitNumber: 'B-502', rentPrice: 15500, status: 'occupied' },
      { id: 'u-203', unitNumber: 'B-503', rentPrice: 16000, status: 'occupied' },
    ]
  }
];

const mockContracts = [
  { id: 'c-1', unitNumber: '101/12', tenantName: 'คุณสมชาย ใจดี', endDate: '2026-08-10', monthlyRent: 12000 },
  { id: 'c-2', unitNumber: '101/14', tenantName: 'คุณวิภาวรรณ สุขเสริฐ', endDate: '2026-08-18', monthlyRent: 11500 },
  { id: 'c-3', unitNumber: 'B-501', tenantName: 'Mr. John Doe', endDate: '2026-09-02', monthlyRent: 15000 },
  { id: 'c-4', unitNumber: 'B-502', tenantName: 'คุณอนันต์ ตั้งใจ', endDate: '2026-11-30', monthlyRent: 15500 },
];

export default function AdminFinancialDashboard() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs mb-4">
          <ArrowLeftIcon className="w-4 h-4" /> กลับสู่หน้าหลัก
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <BuildingOffice2Icon className="w-8 h-8 text-emerald-400" />
              Admin Financial & Mortgage Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              ภาพรวมการลงทุนอสังหาริมทรัพย์ คำนวณดอกเบี้ย ยอดกู้คงเหลือ และ Cashflow รายเดือน
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-slate-400">เลือกอสังหาริมทรัพย์:</span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              aria-label="เลือกอสังหาริมทรัพย์"
              className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
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
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-amber-400">
                แจ้งเตือนสัญญาเช่าใกล้ครบกำหนด (Upcoming Contract Renewals)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {expiringAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border flex items-center justify-between shadow-lg backdrop-blur-sm ${
                    alert.alertLevel === 'urgent'
                      ? 'bg-rose-950/40 border-rose-600/60 text-rose-200'
                      : alert.alertLevel === 'warning'
                      ? 'bg-amber-950/40 border-amber-600/60 text-amber-200'
                      : 'bg-blue-950/40 border-blue-600/60 text-blue-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold">
                      <span>ห้อง {alert.unitNumber}</span>
                      <span className="text-xs font-normal opacity-80">({alert.tenantName})</span>
                    </div>
                    <div className="text-xs opacity-75 mt-1">หมดสัญญา: {alert.endDate}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-black rounded-full ${
                        alert.alertLevel === 'urgent'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : alert.alertLevel === 'warning'
                          ? 'bg-amber-500 text-slate-950'
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

        {/* Portfolio Top Level Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>ยอดกู้รวม / ยอดหนี้คงเหลือ</span>
              <BanknotesIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              ฿{portfolioSummary.totalRemaining.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-400">
                / ฿{portfolioSummary.totalPrincipal.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${portfolioSummary.paidOffPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              ชำระเงินต้นไปแล้ว <strong className="text-emerald-400">{portfolioSummary.paidOffPercent}%</strong>
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>รายได้ค่าเช่ารวม/เดือน</span>
              <ArrowTrendingUpIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-400">
              ฿{portfolioSummary.totalRentalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              จากยูนิตที่มีผู้เช่าในระบบ
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>ยอดผ่อนธนาคารรวม/เดือน</span>
              <ClockIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">
              ฿{portfolioSummary.totalInstallment.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              ภาระค่างวดผ่อนชำระธนาคาร
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Cashflow สุทธิ/เดือน</span>
              <ChartBarIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <div
              className={`text-2xl font-black ${
                portfolioSummary.netCashflow >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {portfolioSummary.netCashflow >= 0 ? '+' : ''}฿
              {portfolioSummary.netCashflow.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs mt-3">
              {portfolioSummary.netCashflow >= 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-4 h-4" /> กระแสเงินสดเป็นบวก (Positive Cashflow)
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <ArrowTrendingDownIcon className="w-4 h-4" /> กระแสเงินสดเป็นลบ (Must Subsidize)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Property Breakdown Section */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
          รายละเอียดค่างวดและระยะเวลาผ่อนแต่ละโครงการ (Property Breakdown)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {propertyMetrics
            .filter((p) => selectedPropertyId === 'all' || p.id === selectedPropertyId)
            .map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
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

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                  <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <span>
                      ผ่อนมาแล้ว: <strong className="text-white">{p.yearsPaidFormatted}</strong> ({p.monthsPaid} งวด)
                    </span>
                    <span>เริ่มผ่อน: {p.loanStartDate}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full"
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
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">ยอดกู้รวม (Principal):</span>
                    <span className="text-base font-bold text-white">฿{p.totalPrincipal.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">ค่างวดผ่อน/เดือน:</span>
                    <span className="text-base font-bold text-amber-400">฿{p.monthlyInstallment.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block">ค่าเช่าที่ได้รับ/เดือน:</span>
                    <span className="text-base font-bold text-blue-400">฿{p.occupiedRent.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
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
            ))}
        </div>
      </div>
    </div>
  );
}
