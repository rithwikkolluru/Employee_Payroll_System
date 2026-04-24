const express = require("express");
const router = express.Router();
const controller = require("../controllers/salaryController");

router.get("/", controller.getSalary);
router.post("/add", controller.addSalary);
router.put("/:emp_id", controller.updateSalary);
router.delete("/:emp_id", controller.deleteSalary);

module.exports = router;