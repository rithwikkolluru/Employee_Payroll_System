const db = require("../config/db");

exports.createEmployee = (data, callback) => {
  db.query("INSERT INTO Employee VALUES (?, ?, ?, ?, ?)",
    [data.emp_id, data.name, data.designation, data.join_date, data.dept_id],
    callback);
};

exports.getEmployees = (callback) => {
  db.query("SELECT * FROM Employee", callback);
};

exports.getEmployeeById = (id, callback) => {
  db.query("SELECT * FROM Employee WHERE emp_id=?", [id], callback);
};

exports.updateEmployee = (id, data, callback) => {
  db.query(
    "UPDATE Employee SET name=?, designation=?, join_date=?, dept_id=? WHERE emp_id=?",
    [data.name, data.designation, data.join_date, data.dept_id, id],
    callback
  );
};

exports.deleteEmployee = (id, callback) => {
  db.query("DELETE FROM Employee WHERE emp_id=?", [id], callback);
};