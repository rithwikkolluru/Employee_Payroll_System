const db = require("../config/db");

exports.createSalary = (data, callback) => {
  db.query("INSERT INTO Salary VALUES (?, ?, ?, ?, ?, ?)",
    [data.salary_id, data.emp_id, data.basic_salary, data.hra, data.bonus, data.deductions],
    callback);
};

exports.getSalary = (callback) => {
  db.query("SELECT * FROM Salary", callback);
};

exports.updateSalary = (emp_id, data, callback) => {
  db.query(
    "UPDATE Salary SET basic_salary=?, hra=?, bonus=?, deductions=? WHERE emp_id=?",
    [data.basic_salary, data.hra, data.bonus, data.deductions, emp_id],
    callback
  );
};

exports.deleteSalary = (emp_id, callback) => {
  db.query("DELETE FROM Salary WHERE emp_id=?", [emp_id], callback);
};