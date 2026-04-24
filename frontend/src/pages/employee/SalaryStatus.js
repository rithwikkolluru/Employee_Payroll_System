import React, { useState, useEffect } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function SalaryStatus() {
  const [data, setData] = useState([]);
  const empId = localStorage.getItem("emp_id");

  const fetchData = async () => {
    try {
      const res = await API.get("/payroll");
      const filtered = res.data.filter(d => d.emp_id == empId);
      setData(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (empId) fetchData();
  }, [empId]);

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "30px" }}>
        <h3>My Salary / Payslips</h3>
        <p>Employee ID: <b>{empId}</b></p>
        
        <hr style={{ margin: "20px 0" }} />

        {data.length === 0 ? <p>No payslips generated yet.</p> : (
          <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", maxWidth: "500px" }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th>Month</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.payroll_id}>
                  <td><b>{d.salary_month}</b></td>
                  <td style={{ color: "green", fontWeight: "bold" }}>₹{d.net_salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SalaryStatus;