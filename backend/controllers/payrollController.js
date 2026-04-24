const Payroll = require("../models/payrollModel");
const db = require("../config/db");
const calculateNetSalary = require("../utils/salaryCalculator");

// Existing functions
exports.addPayroll = (req, res) => {
  Payroll.createPayroll(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Payroll added");
  });
};

exports.getPayroll = (req, res) => {
  Payroll.getPayroll((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.deletePayroll = (req, res) => {
  Payroll.deletePayroll(req.params.emp_id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Payroll deleted");
  });
};



// 🔥 NEW FUNCTION (AUTO PAYROLL)
exports.generatePayroll = (req, res) => {
  const { emp_id, payroll_id, salary_month } = req.body;

  // Step 1: Get salary
  db.query("SELECT * FROM Salary WHERE emp_id=?", [emp_id], (err, salary) => {
    if (err || salary.length === 0) {
      return res.status(500).send("Salary not found");
    }

    // Step 2: Get allowance
    db.query(
      "SELECT SUM(amount) as total FROM Allowance WHERE emp_id=? AND status='Approved'",
      [emp_id],
      (err, allowance) => {

        // Step 3: Get attendance FOR THIS MONTH
        db.query(
          "SELECT * FROM Attendance WHERE emp_id=? AND attendance_month=?",
          [emp_id, salary_month],
          (err, attendance) => {

            const totalAllowance = allowance[0].total || 0;

            const netSalary = calculateNetSalary(
              salary[0],
              totalAllowance,
              attendance[0] || null // if no attendance found, null
            );

            // Step 4: Insert payroll
            db.query(
              "INSERT INTO Payroll (payroll_id, emp_id, net_salary, salary_month) VALUES (?, ?, ?, ?)",
              [payroll_id || Math.floor(Math.random() * 1000000), emp_id, netSalary, salary_month],
              (err) => {
                if (err) return res.status(500).send(err);

                res.json({
                  message: "Payroll generated successfully",
                  netSalary
                });
              }
            );
          }
        );
      }
    );
  });
};