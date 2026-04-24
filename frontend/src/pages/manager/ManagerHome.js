import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function ManagerHome() {
  const name = localStorage.getItem("name");
  const empId = localStorage.getItem("emp_id");

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2>Welcome, {name} 👋</h2>
        <p style={{ color: "#666" }}>Manager ID: <b>{empId}</b></p>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", width: "220px" }}>
          <Link to="/manager/add-employee">➕ Add Employee</Link>
          <Link to="/manager/attendance">📅 Attendance</Link>
          <Link to="/manager/leaves">📋 Leave Requests</Link>
          <Link to="/manager/allowance">💰 Allowance Requests</Link>
          <Link to="/manager/salary">💵 Salary</Link>
          <Link to="/manager/payroll">🧾 Generate Payroll</Link>
        </div>
      </div>
    </>
  );
}

export default ManagerHome;