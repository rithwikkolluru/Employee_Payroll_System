import React, { useState, useEffect } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function SendRequest() {
  const [data, setData] = useState({
    allowance_type: "",
    amount: ""
  });
  const [history, setHistory] = useState([]);
  
  const empId = localStorage.getItem("emp_id");

  const fetchHistory = async () => {
    try {
      const res = await API.get("/allowance");
      const myRequests = res.data.filter(r => r.emp_id == empId);
      setHistory(myRequests);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (empId) fetchHistory();
  }, [empId]);

  const submit = async () => {
    try {
      await API.post("/allowance/add", {
        ...data,
        emp_id: empId,
        allowance_id: Math.floor(Math.random() * 1000000)
      });
      alert("Request Sent");
      setData({ allowance_type: "", amount: "" });
      fetchHistory(); // refresh history
    } catch (err) {
      alert("Error: " + (err.response?.data?.sqlMessage || err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>Send Allowance Request</h3>

        <div style={{ marginBottom: "10px" }}>
          <input placeholder="Type (e.g. Internet)"
            value={data.allowance_type}
            onChange={e => setData({...data, allowance_type: e.target.value})} 
            style={{ padding: "5px", marginRight: "10px" }} />

          <input placeholder="Amount (e.g. 500)"
            type="number"
            value={data.amount}
            onChange={e => setData({...data, amount: e.target.value})} 
            style={{ padding: "5px", marginRight: "10px" }} />

          <button onClick={submit} style={{ padding: "6px 12px" }}>Submit</button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        <h3>My Previous Requests</h3>
        {history.length === 0 ? <p>No past requests found.</p> : (
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", maxWidth: "500px" }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(req => (
                <tr key={req.allowance_id}>
                  <td>{req.allowance_type}</td>
                  <td>₹{req.amount}</td>
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

export default SendRequest;