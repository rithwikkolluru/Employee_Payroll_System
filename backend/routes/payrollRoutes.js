const express = require("express");
const router = express.Router();
const controller = require("../controllers/payrollController");

// Existing
router.post("/add", controller.addPayroll);
router.get("/", controller.getPayroll);
router.delete("/:emp_id", controller.deletePayroll);

// 🔥 NEW ROUTE
router.post("/generate", controller.generatePayroll);

module.exports = router;