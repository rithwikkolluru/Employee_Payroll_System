const Salary = require("../models/salaryModel");

exports.addSalary = (req, res) => {
  Salary.createSalary(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Salary added");
  });
};

exports.getSalary = (req, res) => {
  Salary.getSalary((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.updateSalary = (req, res) => {
  Salary.updateSalary(req.params.emp_id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Salary updated");
  });
};

exports.deleteSalary = (req, res) => {
  Salary.deleteSalary(req.params.emp_id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Salary deleted");
  });
};