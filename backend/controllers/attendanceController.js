const Attendance = require("../models/attendanceModel");

exports.addAttendance = (req, res) => {
  Attendance.createAttendance(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Attendance added");
  });
};

exports.getAttendance = (req, res) => {
  Attendance.getAttendance((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.updateAttendance = (req, res) => {
  Attendance.updateAttendance(req.params.emp_id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Attendance updated");
  });
};

exports.deleteAttendance = (req, res) => {
  Attendance.deleteAttendance(req.params.emp_id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Attendance deleted");
  });
};