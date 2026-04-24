const Leave = require("../models/leaveModel");

exports.addLeave = (req, res) => {
  Leave.createLeave(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Leave added");
  });
};

exports.getLeaves = (req, res) => {
  Leave.getLeaves((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.updateLeaveStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).send("ID and status are required");
  }

  Leave.updateLeaveStatus(id, status, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Leave status updated");
  });
};

exports.deleteLeave = (req, res) => {
  Leave.deleteLeave(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Leave deleted");
  });
};