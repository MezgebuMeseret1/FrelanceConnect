import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <h3>{job.title}</h3>
      <p>{job.description}</p>

      <p style={styles.budget}>
        Budget: ${job.budget}
      </p>

      <div style={styles.actions}>
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          View Details
        </button>

        <button
          onClick={() =>
            navigate(`/jobs/${job.id}/apply`)
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  budget: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
};

export default JobCard;