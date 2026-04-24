import React, { useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function AddEmployee() {
  const [data, setData] = useState({
    emp_id: "",
    name: "",
    designation: "",
    join_date: "",
    dept_id: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setMessage("");
    setError("");
    
    // basic validation
    if (!data.emp_id || !data.name || !data.designation || !data.join_date || !data.dept_id) {
      setError("Please fill all fields");
      return;
    }

    try {
      await API.post("/employee/add", data);
      setMessage("Employee Added Successfully!");
      setData({ emp_id: "", name: "", designation: "", join_date: "", dept_id: "" });
    } catch (err) {
      setError("Error adding employee: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h2>Add New Employee</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <input 
            type="number" 
            placeholder="Employee ID" 
            value={data.emp_id} 
            onChange={e => setData({...data, emp_id: e.target.value})} 
            style={{ padding: "8px" }} 
          />
          <input 
            type="text" 
            placeholder="Name" 
            value={data.name} 
            onChange={e => setData({...data, name: e.target.value})} 
            style={{ padding: "8px" }} 
          />
          <input 
            type="text" 
            placeholder="Designation" 
            value={data.designation} 
            onChange={e => setData({...data, designation: e.target.value})} 
            style={{ padding: "8px" }} 
          />
          <label>Join Date:</label>
          <input 
            type="date" 
            value={data.join_date} 
            onChange={e => setData({...data, join_date: e.target.value})} 
            style={{ padding: "8px" }} 
          />
          <input 
            type="number" 
            placeholder="Department ID (e.g. 1, 2, 3)" 
            value={data.dept_id} 
            onChange={e => setData({...data, dept_id: e.target.value})} 
            style={{ padding: "8px" }} 
          />

          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
          {message && <p style={{ color: "green", margin: 0, fontWeight: "bold" }}>{message}</p>}

          <button onClick={submit} style={{ padding: "10px", marginTop: "10px" }}>Add Employee</button>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
