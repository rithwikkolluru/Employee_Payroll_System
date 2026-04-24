const db = require("../config/db");

exports.createAttendance = (data, callback) => {
  db.query("INSERT INTO Attendance (att_id, emp_id, working_days, leaves_taken, attendance_month) VALUES (?, ?, ?, ?, ?)",
    [data.att_id, data.emp_id, data.working_days, data.leaves_taken, data.attendance_month || 'Current'],
    callback);
};

exports.getAttendance = (callback) => {
  db.query("SELECT * FROM Attendance", callback);
};

exports.updateAttendance = (emp_id, data, callback) => {
  db.query(
    "UPDATE Attendance SET working_days=?, leaves_taken=? WHERE emp_id=?",
    [data.working_days, data.leaves_taken, emp_id],
    callback
  );
};

exports.deleteAttendance = (emp_id, callback) => {
  db.query("DELETE FROM Attendance WHERE emp_id=?", [emp_id], callback);
};