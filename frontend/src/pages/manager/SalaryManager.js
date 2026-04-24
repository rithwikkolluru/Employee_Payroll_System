import React, { useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function SalaryManager() {
  const [data, setData] = useState({});

  const submit = async () => {
    try {
      await API.post("/salary/add", { ...data, salary_id: Math.floor(Math.random() * 1000000) });
      alert("Salary Base Structure Updated Successfully");
    } catch (err) {
      alert("Error: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>Update Employee Base Salary</h3>
        <p style={{ color: "#666" }}>Set the fixed permanent salary structure for an employee.</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", marginTop: "20px" }}>
          <input placeholder="Employee ID" onChange={e => setData({...data, emp_id:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Basic Salary (e.g. 30000)" type="number" onChange={e => setData({...data, basic_salary:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="HRA (e.g. 2000)" type="number" onChange={e => setData({...data, hra:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Bonus (e.g. 1000)" type="number" onChange={e => setData({...data, bonus:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Deductions (e.g. 500)" type="number" onChange={e => setData({...data, deductions:e.target.value})} style={{ padding: "8px" }}/>
          
          <button onClick={submit} style={{ padding: "10px", marginTop: "10px" }}>Save Salary Structure</button>
        </div>
      </div>
    </>
  );
}

export default SalaryManager;