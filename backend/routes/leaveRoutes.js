const express = require("express");
const router = express.Router();
const controller = require("../controllers/leaveController");

// GET all leave requests
router.get("/", controller.getLeaves);

// POST add new leave request
router.post("/add", controller.addLeave);

// PUT update leave status (Approve / Reject)
router.put("/status/:id", controller.updateLeaveStatus);

// DELETE leave request
router.delete("/:id", controller.deleteLeave);

module.exports = router;