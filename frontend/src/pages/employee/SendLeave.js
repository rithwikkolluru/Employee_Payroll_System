import React, { useState, useEffect } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function SendLeave() {
  const [data, setData] = useState({
    leave_type: "",
    from_date: "",
    to_date: ""
  });
  const [history, setHistory] = useState([]);
  
  const empId = localStorage.getItem("emp_id");

  const fetchHistory = async () => {
    try {
      const res = await API.get("/leave");
      const myLeaves = res.data.filter(r => r.emp_id == empId);
      setHistory(myLeaves);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (empId) fetchHistory();
  }, [empId]);

  const submit = async () => {
    try {
      await API.post("/leave/add", {
        ...data,
        emp_id: empId,
        leave_id: Math.floor(Math.random() * 1000000)
      });
      alert("Leave Request Sent");
      setData({ leave_type: "", from_date: "", to_date: "" });
      fetchHistory(); // refresh history
    } catch (err) {
      alert("Error: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>Send Leave Request</h3>

        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input placeholder="Type (e.g. Vacation)"
            value={data.leave_type}
            onChange={e => setData({...data, leave_type: e.target.value})} 
            style={{ padding: "5px" }} />

          <input type="date"
            value={data.from_date}
            onChange={e => setData({...data, from_date: e.target.value})} 
            style={{ padding: "5px" }} />

          <input type="date"
            value={data.to_date}
            onChange={e => setData({...data, to_date: e.target.value})} 
            style={{ padding: "5px" }} />

          <button onClick={submit} style={{ padding: "6px 12px" }}>Submit</button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        <h3>My Leave History</h3>
        {history.length === 0 ? <p>No past leave requests found.</p> : (
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", maxWidth: "600px" }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th>Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(req => (
                <tr key={req.leave_id}>
                  <td>{req.leave_type}</td>
                  <td>{req.from_date?.split('T')[0]}</td>
                  <td>{req.to_date?.split('T')[0]}</td>
                  <td style={{ 
                    color: req.status === "Approved" ? "green" : 
                           req.status === "Rejected" ? "red" : "orange",
                    fontWeight: "bold"
                  }}>
                    {req.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SendLeave;