const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ ADD ALLOWANCE (Employee Request)
router.post("/add", (req, res) => {
  const { allowance_id, emp_id, allowance_type, amount } = req.body;

  // 🔍 Validation
  if (!allowance_id || !emp_id || !allowance_type || !amount) {
    return res.status(400).send("All fields are required");
  }

  console.log("ADD ALLOWANCE:", req.body);

  const sql = `
    INSERT INTO Allowance 
    (allowance_id, emp_id, allowance_type, amount, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [allowance_id, emp_id, allowance_type, amount, "Pending"],
    (err) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send(err);
      }

      res.send("Allowance Request Added Successfully");
    }
  );
});


// ✅ GET ALL ALLOWANCES
router.get("/", (req, res) => {
  db.query("SELECT * FROM Allowance", (err, data) => {
    if (err) {
      console.error("FETCH ERROR:", err);
      return res.status(500).send(err);
    }

    res.json(data);
  });
});


// ✅ DELETE ALLOWANCE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM Allowance WHERE allowance_id=?",
    [id],
    (err) => {
      if (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).send(err);
      }

      res.send("Allowance Deleted Successfully");
    }
  );
});


// ✅ UPDATE STATUS (Manager Approval)
router.put("/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Status is required");
  }

  console.log("UPDATE STATUS:", id, status);

  db.query(
    "UPDATE Allowance SET status=? WHERE allowance_id=?",
    [status, id],
    (err) => {
      if (err) {
        console.error("UPDATE ERROR:", err);
        return res.status(500).send(err);
      }

      res.send("Status Updated Successfully");
    }
  );
});

module.exports = router;