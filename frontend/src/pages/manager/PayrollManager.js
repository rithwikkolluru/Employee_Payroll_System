import React, { useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function PayrollManager() {
  const [data, setData] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const submit = async () => {
    setSuccessMsg("");
    try {
      const res = await API.post("/payroll/generate", data);
      setSuccessMsg("✅ " + res.data.message + " | Net Salary: ₹" + res.data.netSalary);
    } catch (err) {
      alert("Error: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>Generate Monthly Payroll</h3>
        <p style={{ color: "#666", maxWidth: "400px" }}>
          Calculates final Net Salary based on Base Salary, Approved Allowances, and Attendance Deductions for the specified month.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", marginTop: "20px" }}>
          <input placeholder="Employee ID (e.g. 101)" onChange={e => setData({...data, emp_id:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Salary Month (e.g. May)" onChange={e => setData({...data, salary_month:e.target.value})} style={{ padding: "8px" }}/>
          
          <button onClick={submit} style={{ padding: "10px", marginTop: "10px" }}>⚙️ Generate & Save Payroll</button>
        </div>

        {successMsg && <p style={{ color: "green", fontWeight: "bold", marginTop: "20px" }}>{successMsg}</p>}
      </div>
    </>
  );
}

export default PayrollManager;