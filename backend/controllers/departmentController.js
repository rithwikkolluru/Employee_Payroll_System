const Department = require("../models/departmentModel");

exports.addDepartment = (req, res) => {
  Department.createDepartment(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Department added");
  });
};

exports.getDepartments = (req, res) => {
  Department.getDepartments((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.updateDepartment = (req, res) => {
  Department.updateDepartment(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Department updated");
  });
};

exports.deleteDepartment = (req, res) => {
  Department.deleteDepartment(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Department deleted");
  });
};