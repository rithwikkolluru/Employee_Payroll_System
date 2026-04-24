const Employee = require("../models/employeeModel");

exports.addEmployee = (req, res) => {
  Employee.createEmployee(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee added");
  });
};

exports.getEmployees = (req, res) => {
  Employee.getEmployees((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.getEmployee = (req, res) => {
  Employee.getEmployeeById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.updateEmployee = (req, res) => {
  Employee.updateEmployee(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee updated");
  });
};

exports.deleteEmployee = (req, res) => {
  Employee.deleteEmployee(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee deleted");
  });
};