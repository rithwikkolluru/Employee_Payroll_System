const Allowance = require("../models/allowanceModel");

// ✅ ADD ALLOWANCE (Employee Request)
exports.addAllowance = (req, res) => {
  const { allowance_id, emp_id, allowance_type, amount } = req.body;

  // 🔍 Validation
  if (!allowance_id || !emp_id || !allowance_type || !amount) {
    return res.status(400).send("All fields are required");
  }

  console.log("ADD REQUEST:", req.body);

  Allowance.createAllowance(
    { ...req.body, status: "Pending" }, // default status
    (err) => {
      if (err) {
        console.error("ADD ERROR:", err);
        return res.status(500).send(err);
      }

      res.send("Allowance Request Added Successfully");
    }
  );
};

// ✅ GET ALL ALLOWANCES
exports.getAllowance = (req, res) => {
  Allowance.getAllowance((err, data) => {
    if (err) {
      console.error("FETCH ERROR:", err);
      return res.status(500).send(err);
    }

    res.json(data);
  });
};

// ✅ DELETE ALLOWANCE
exports.deleteAllowance = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("ID is required");
  }

  Allowance.deleteAllowance(id, (err) => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).send(err);
    }

    res.send("Allowance Deleted Successfully");
  });
};

// ✅ UPDATE STATUS (Manager Approval)
exports.updateAllowanceStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).send("ID and status required");
  }

  console.log("UPDATE STATUS:", id, status);

  Allowance.updateStatus(id, status, (err) => {
    if (err) {
      console.error("UPDATE ERROR:", err);
      return res.status(500).send(err);
    }

    res.send("Status Updated Successfully");
  });
};