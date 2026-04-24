const db = require("../config/db");

// CREATE
exports.createAllowance = (data, callback) => {
  db.query("INSERT INTO Allowance SET ?", data, callback);
};

// GET ALL
exports.getAllowance = (callback) => {
  db.query("SELECT * FROM Allowance", callback);
};

// DELETE
exports.deleteAllowance = (id, callback) => {
  db.query("DELETE FROM Allowance WHERE allowance_id = ?", [id], callback);
};

// UPDATE STATUS
exports.updateStatus = (id, status, callback) => {
  db.query(
    "UPDATE Allowance SET status=? WHERE allowance_id=?",
    [status, id],
    callback
  );
};