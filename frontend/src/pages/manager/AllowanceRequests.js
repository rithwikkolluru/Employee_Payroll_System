import React, { useEffect, useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function AllowanceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all allowance requests
  const fetchRequests = async () => {
    try {
      const res = await API.get("/allowance");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/allowance/status/${id}`, { status });
      fetchRequests(); // refresh list
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Allowance Requests</h2>

        {loading && <p>Loading...</p>}

        {!loading && requests.length === 0 && (
          <p>No Requests Found</p>
        )}

        {!loading &&
          requests.map((req) => (
            <div className="card" key={req.allowance_id}>
              <p><b>Employee ID:</b> {req.emp_id}</p>
              <p><b>Type:</b> {req.allowance_type}</p>
              <p><b>Amount:</b> ₹{req.amount}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      req.status === "Approved"
                        ? "green"
                        : req.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {req.status}
                </span>
              </p>

              {req.status === "Pending" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() =>
                      updateStatus(req.allowance_id, "Approved")
                    }
                    style={{ marginRight: "10px", background: "green" }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(req.allowance_id, "Rejected")
                    }
                    style={{ background: "red" }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default AllowanceRequests;