import { Route } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";

const JobRoutes = [
  <Route path="/jobs" element={<JobList />} />,
  <Route path="/jobs/:id" element={<JobDetails />} />,
  <Route path="/post-job" element={<CreateJob />} />,
  <Route path="/jobs/:id/edit" element={<EditJob />} />,
];

export default JobRoutes;