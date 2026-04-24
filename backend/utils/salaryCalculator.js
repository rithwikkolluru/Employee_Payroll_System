/**
 * Calculate Net Salary
 * Formula:
 * Net = (basic + hra + bonus + allowance) - deductions
 */

const calculateNetSalary = (salaryData, allowanceTotal = 0, attendanceData = null) => {
  const basic_salary = parseFloat(salaryData.basic_salary) || 0;
  const hra = parseFloat(salaryData.hra) || 0;
  const bonus = parseFloat(salaryData.bonus) || 0;
  const deductions = parseFloat(salaryData.deductions) || 0;
  const allowance = parseFloat(allowanceTotal) || 0;

  let netSalary = basic_salary + hra + bonus + allowance - deductions;

  // OPTIONAL: Adjust salary based on attendance
  if (attendanceData) {
    const working_days = parseInt(attendanceData.working_days) || 0;
    const leaves_taken = parseInt(attendanceData.leaves_taken) || 0;

    if (working_days > 0) {
      const perDaySalary = basic_salary / working_days;
      const leaveDeduction = perDaySalary * leaves_taken;

      netSalary = netSalary - leaveDeduction;
    }
  }

  return Number(netSalary.toFixed(2));
};

module.exports = calculateNetSalary;