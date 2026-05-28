// src/modules/proposal/pages/JobProposals.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../../../core/api/client";

const JobProposals = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await client.get(
        `/proposals/job/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProposals(res.data.data || []);
    } catch (err) {
      console.log("FETCH PROPOSALS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProposalStatus = async (proposalId, status) => {
    try {
      const token = localStorage.getItem("token");

      await client.patch(
        `/proposals/${proposalId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchProposals();
    } catch (err) {
      console.log(err);
      alert("Failed to update proposal");
    }
  };

  const filtered = proposals.filter((p) => {
    if (filter === "ALL") return true;
    return p.status === filter;
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Job Proposals</h1>
          <p style={styles.sub}>Review freelancer applications</p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backBtn}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* FILTERS */}
      <div style={styles.filters}>
        {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              background: filter === f ? "#111827" : "#e5e7eb",
              color: filter === f ? "white" : "black",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading proposals...</p>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>
          <h3>No proposals found</h3>
        </div>
      ) : (
        filtered.map((proposal) => (
          <div key={proposal.id} style={styles.card}>
            {/* TOP */}
            <div style={styles.top}>
              <div>
                <h3>{proposal.freelancer?.name}</h3>
                <p style={{ color: "#64748b" }}>
                  {proposal.freelancer?.email}
                </p>
              </div>

              <span
                style={{
                  ...styles.badge,
                  background:
                    proposal.status === "ACCEPTED"
                      ? "#16a34a"
                      : proposal.status === "REJECTED"
                      ? "#dc2626"
                      : "#f59e0b",
                }}
              >
                {proposal.status}
              </span>
            </div>

            {/* BID */}
            <div style={styles.bid}>
              ${proposal.bidAmount}
            </div>

            {/* COVER */}
            <p style={styles.cover}>
              {proposal.coverLetter}
            </p>

            {/* ACTIONS */}
            {proposal.status === "PENDING" && (
              <div style={styles.actions}>
                <button
                  onClick={() =>
                    updateProposalStatus(proposal.id, "ACCEPTED")
                  }
                  style={styles.acceptBtn}
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateProposalStatus(proposal.id, "REJECTED")
                  }
                  style={styles.rejectBtn}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "25px",
    background: "#f6f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
  },

  sub: {
    color: "#64748b",
  },

  backBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#111827",
    color: "white",
    cursor: "pointer",
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  filterBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },

  card: {
    background: "white",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "0.2s",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
  },

  bid: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: "10px",
  },

  cover: {
    color: "#374151",
    marginTop: "10px",
  },

  actions: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  acceptBtn: {
    flex: 1,
    padding: "10px",
    background: "#16a34a",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  rejectBtn: {
    flex: 1,
    padding: "10px",
    background: "#dc2626",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  empty: {
    marginTop: "30px",
    textAlign: "center",
    color: "#64748b",
  },
};
export default JobProposals;

