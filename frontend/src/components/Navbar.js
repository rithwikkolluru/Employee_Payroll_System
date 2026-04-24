import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar" style={{ display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "10px 20px", background: "#1e1e2e", color: "#fff" }}>
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>Payroll System</span>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {name && (
          <span style={{ fontSize: "14px" }}>
            👤 <b>{name}</b> ({role})
          </span>
        )}
        <button onClick={logout}
          style={{ padding: "6px 14px", cursor: "pointer", background: "#e74c3c",
            color: "#fff", border: "none", borderRadius: "4px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;