import React, { useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function Attendance() {
  const [data, setData] = useState({});

  const submit = async () => {
    try {
      await API.post("/attendance/add", { ...data, att_id: Math.floor(Math.random() * 1000000) });
      alert("Attendance added");
    } catch (err) {
      alert("Error: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>Attendance Entry</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <input placeholder="Emp ID" onChange={e => setData({...data, emp_id:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Attendance Month (e.g. May)" onChange={e => setData({...data, attendance_month:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Working Days" onChange={e => setData({...data, working_days:e.target.value})} style={{ padding: "8px" }}/>
          <input placeholder="Leaves Taken" onChange={e => setData({...data, leaves_taken:e.target.value})} style={{ padding: "8px" }}/>
          <button onClick={submit} style={{ padding: "10px" }}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Attendance;