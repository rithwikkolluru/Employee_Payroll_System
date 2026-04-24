import React, { useEffect, useState } from "react";
import API from "../../api";
import Navbar from "../../components/Navbar";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leave requests
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leave");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leave/status/${id}`, { status });
      fetchLeaves(); // refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Leave Requests</h2>

        {loading && <p>Loading...</p>}

        {!loading && leaves.length === 0 && (
          <p>No Leave Requests Found</p>
        )}

        {!loading &&
          leaves.map((leave) => (
            <div className="card" key={leave.leave_id}>
              <p><b>Employee ID:</b> {leave.emp_id}</p>
              <p><b>Type:</b> {leave.leave_type}</p>
              <p><b>From:</b> {leave.from_date}</p>
              <p><b>To:</b> {leave.to_date}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      leave.status === "Approved"
                        ? "green"
                        : leave.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {leave.status}
                </span>
              </p>

              {leave.status === "Pending" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() =>
                      updateStatus(leave.leave_id, "Approved")
                    }
                    style={{ marginRight: "10px", background: "green" }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(leave.leave_id, "Rejected")
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

export default LeaveRequests;