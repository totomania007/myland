export interface MortgageCalculation {
  monthsPaid: number;
  yearsPaidFormatted: string; // e.g. "2 ปี 4 เดือน"
  remainingBalance: number;   // ยอดหนี้คงเหลือ
  totalInterestPaid: number;  // ดอกเบี้ยจ่ายสะสม
  totalPrincipalPaid: number; // เงินต้นที่จ่ายไปแล้ว
  monthlyCashflow: number;     // Cashflow สุทธิ/เดือน
  payoffProgressPercent: number; // % ผ่อนชำระสำเร็จ
}

/**
 * Calculates Mortgage Amortization & Financial Status
 * @param totalPrincipal - ยอดกู้รวม (P)
 * @param monthlyInstallment - ยอดผ่อนต่อเดือน (M)
 * @param annualInterestRate - ดอกเบี้ยธนาคาร % ต่อปี (r_annual)
 * @param loanStartDateStr - วันที่เริ่มผ่อน (YYYY-MM-DD)
 * @param monthlyRentalIncome - รายได้ค่าเช่ารวมต่อเดือนจากยูนิตที่ให้เช่า
 */
export function calculateMortgageMetrics(
  totalPrincipal: number,
  monthlyInstallment: number,
  annualInterestRate: number,
  loanStartDateStr: string,
  monthlyRentalIncome: number = 0
): MortgageCalculation {
  if (!loanStartDateStr || totalPrincipal <= 0) {
    return {
      monthsPaid: 0,
      yearsPaidFormatted: '0 ปี 0 เดือน',
      remainingBalance: totalPrincipal,
      totalInterestPaid: 0,
      totalPrincipalPaid: 0,
      monthlyCashflow: monthlyRentalIncome - monthlyInstallment,
      payoffProgressPercent: 0,
    };
  }

  const startDate = new Date(loanStartDateStr);
  const currentDate = new Date();

  // Calculate elapsed full months
  let monthsPaid =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  if (currentDate.getDate() < startDate.getDate()) {
    monthsPaid = Math.max(0, monthsPaid - 1);
  }

  const years = Math.floor(monthsPaid / 12);
  const remainingMonths = monthsPaid % 12;
  const yearsPaidFormatted = `${years} ปี ${remainingMonths} เดือน`;

  // Monthly interest rate
  const monthlyRate = annualInterestRate / 100 / 12;

  let currentBalance = totalPrincipal;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  // Month-by-month loan amortization step simulation for exact precision
  for (let i = 0; i < monthsPaid; i++) {
    if (currentBalance <= 0) {
      currentBalance = 0;
      break;
    }
    const interestForMonth = currentBalance * monthlyRate;
    const principalForMonth = Math.min(
      currentBalance,
      monthlyInstallment - interestForMonth
    );

    if (principalForMonth > 0) {
      totalInterestPaid += interestForMonth;
      totalPrincipalPaid += principalForMonth;
      currentBalance -= principalForMonth;
    } else {
      // Installment doesn't cover interest safeguard
      totalInterestPaid += monthlyInstallment;
      currentBalance += interestForMonth - monthlyInstallment;
    }
  }

  const remainingBalance = Math.max(0, Math.round(currentBalance));
  const payoffProgressPercent = Math.min(
    100,
    Math.round(((totalPrincipal - remainingBalance) / totalPrincipal) * 100)
  );

  const monthlyCashflow = monthlyRentalIncome - monthlyInstallment;

  return {
    monthsPaid,
    yearsPaidFormatted,
    remainingBalance,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalPrincipalPaid: Math.round(totalPrincipalPaid),
    monthlyCashflow,
    payoffProgressPercent,
  };
}

/**
 * Contract Expiry Alert Utilities
 */
export function getContractExpiryDays(endDateStr: string): number {
  const end = new Date(endDateStr);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
