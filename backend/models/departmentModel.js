const db = require("../config/db");

exports.createDepartment = (data, callback) => {
  db.query("INSERT INTO Department VALUES (?, ?)",
    [data.dept_id, data.dept_name], callback);
};

exports.getDepartments = (callback) => {
  db.query("SELECT * FROM Department", callback);
};

exports.updateDepartment = (id, data, callback) => {
  db.query("UPDATE Department SET dept_name=? WHERE dept_id=?",
    [data.dept_name, id], callback);
};

exports.deleteDepartment = (id, callback) => {
  db.query("DELETE FROM Department WHERE dept_id=?", [id], callback);
};