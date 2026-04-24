const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");

router.get("/", controller.getAttendance);
router.post("/add", controller.addAttendance);
router.put("/:emp_id", controller.updateAttendance);
router.delete("/:emp_id", controller.deleteAttendance);

module.exports = router;