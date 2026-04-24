import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function EmployeeHome() {
  const name = localStorage.getItem("name");
  const empId = localStorage.getItem("emp_id");

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h2>Welcome, {name} 👋</h2>
        <p style={{ color: "#666" }}>Employee ID: <b>{empId}</b></p>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", width: "200px" }}>
          <Link to="/employee/leave">📋 Send Leave</Link>
          <Link to="/employee/request">💰 Send Allowance Request</Link>
          <Link to="/employee/salary">💵 Salary Status</Link>
        </div>
      </div>
    </>
  );
}

export default EmployeeHome;