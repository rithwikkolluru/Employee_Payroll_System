import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employee");
  const [empId, setEmpId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!empId) {
      setError("Please enter your Employee ID");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/employee/login", { emp_id: empId, role });

      localStorage.setItem("role", role);
      localStorage.setItem("emp_id", res.data.emp_id);
      localStorage.setItem("name", res.data.name);

      if (role === "employee") navigate("/employee");
      else navigate("/manager");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Payroll System Login</h2>

      <div style={{ marginBottom: "15px" }}>
        <label><b>Select Role: </b></label>
        <select value={role} onChange={e => setRole(e.target.value)}
          style={{ padding: "6px", marginLeft: "8px" }}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label><b>Employee ID: </b></label>
        <input
          type="number"
          placeholder={role === "employee" ? "e.g. 101" : "e.g. 102"}
          value={empId}
          onChange={e => setEmpId(e.target.value)}
          style={{ padding: "6px", marginLeft: "8px", width: "120px" }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin} disabled={loading}
        style={{ padding: "8px 24px", cursor: "pointer" }}>
        {loading ? "Checking..." : "Login"}
      </button>
    </div>
  );
}

export default Login;