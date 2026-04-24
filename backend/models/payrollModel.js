const db = require("../config/db");

exports.createPayroll = (data, callback) => {
  db.query("INSERT INTO Payroll (payroll_id, emp_id, net_salary, salary_month) VALUES (?, ?, ?, ?)",
    [data.payroll_id, data.emp_id, data.net_salary, data.salary_month],
    callback);
};

exports.getPayroll = (callback) => {
  db.query("SELECT * FROM Payroll", callback);
};

exports.deletePayroll = (emp_id, callback) => {
  db.query("DELETE FROM Payroll WHERE emp_id=?", [emp_id], callback);
};