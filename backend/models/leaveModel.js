const db = require("../config/db");

exports.createLeave = (data, callback) => {
  db.query(
    "INSERT INTO LeaveDetails (leave_id, emp_id, leave_type, from_date, to_date, status) VALUES (?, ?, ?, ?, ?, ?)",
    [data.leave_id, data.emp_id, data.leave_type, data.from_date, data.to_date, "Pending"],
    callback
  );
};

exports.getLeaves = (callback) => {
  db.query("SELECT * FROM LeaveDetails", callback);
};

exports.updateLeaveStatus = (id, status, callback) => {
  db.query(
    "UPDATE LeaveDetails SET status=? WHERE leave_id=?",
    [status, id],
    callback
  );
};

exports.deleteLeave = (id, callback) => {
  db.query("DELETE FROM LeaveDetails WHERE leave_id=?", [id], callback);
};