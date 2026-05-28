import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../../core/api/client";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/v1/jobs/${id}`
      );

      setJob(res.data.data);
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Budget: ${job.budget}</p>

      <button>Apply for this job</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
};

export default JobDetails;