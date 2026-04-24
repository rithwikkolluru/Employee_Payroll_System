const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");
const db = require("../config/db");

// LOGIN — verify emp_id and role
router.post("/login", (req, res) => {
  const { emp_id, role } = req.body;

  if (!emp_id || !role) {
    return res.status(400).json({ error: "Employee ID and role are required" });
  }

  db.query("SELECT * FROM Employee WHERE emp_id = ?", [emp_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ error: "Employee ID not found" });
    }

    const employee = results[0];
    const isManager = employee.designation === "Manager";

    if (role === "manager" && !isManager) {
      return res.status(403).json({ error: "This ID does not belong to a Manager" });
    }

    if (role === "employee" && isManager) {
      return res.status(403).json({ error: "Managers must log in as Manager" });
    }

    res.json({ success: true, name: employee.name, emp_id: employee.emp_id });
  });
});

router.get("/", controller.getEmployees);
router.get("/:id", controller.getEmployee);
router.post("/add", controller.addEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;