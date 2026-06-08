import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../../modules/auth/pages/Login";
import Register from "../../modules/auth/pages/Register";
import EditJob from "../../modules/job/pages/EditJob";
import JobList from "../../modules/job/pages/JobList";
import CreateJob from "../../modules/job/pages/CreateJob";
import EditJob from "../../modules/job/pages/EditJob";
import JobProposals from "../../modules/proposal/pages/JobProposals";
import MyContracts from "../../modules/contract/pages/MyContracts";
import ContractDetails from "../../modules/contract/pages/ContractDetails";

import UserDashboard from "../../modules/user/pages/UserDashboard";
import HomeDashboard from "../../modules/user/pages/HomeDashboard";
import ForgotPassword from "../../modules/user/pages/ForgotPassword";

import MyProposals from "../../modules/proposal/pages/MyProposals";
import SubmitProposal from "../../modules/proposal/pages/SubmitProposal";

import ProtectedRoute from "./protected.routes";

// MILESTONES
import Milestones from "../../modules/milestone/pages/Milestones";
import CreateMilestone from "../../modules/milestone/pages/CreateMilestone";
import MilestoneDetails from "../../modules/milestone/pages/MilestoneDetails";

// PROFILE
import FreelancerProfile from "../../modules/profile/pages/FreelancerProfile";
import EditFreelancerProfile from "../../modules/profile/pages/EditFreelancerProfile";
import EmployerProfile from "../../modules/profile/pages/EmployerProfile";
import EditEmployerProfile from "../../modules/profile/pages/EditEmployerProfile";
function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<HomeDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* JOBS */}
      <Route path="/jobs" element={<JobList />} />

      <Route
        path="/post-job"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
      path="/jobs/:id/edit"
      element={
       <ProtectedRoute>
        <EditJob />
       </ProtectedRoute>
         }
/>

      {/* PROPOSALS */}
      <Route
        path="/jobs/:id/proposals"
        element={
          <ProtectedRoute>
            <JobProposals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:jobId/apply"
        element={
          <ProtectedRoute>
            <SubmitProposal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/proposals"
        element={
          <ProtectedRoute>
            <MyProposals />
          </ProtectedRoute>
        }
      />

      {/* CONTRACTS */}
      <Route
        path="/contracts"
        element={
          <ProtectedRoute>
            <MyContracts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contracts/:id"
        element={
          <ProtectedRoute>
            <ContractDetails />
          </ProtectedRoute>
        }
      />

      {/* MILESTONES */}
      <Route
        path="/contracts/:contractId/milestones"
        element={
          <ProtectedRoute>
            <Milestones />
          </ProtectedRoute>
        }
      />

      <Route
        path="/milestones/create/:contractId"
        element={
          <ProtectedRoute>
            <CreateMilestone />
          </ProtectedRoute>
        }
      />

      <Route
        path="/milestones/:id"
        element={
          <ProtectedRoute>
            <MilestoneDetails />
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}
      <Route
       path="/freelancer-profile"
        element={
          <ProtectedRoute>
            <FreelancerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-freelancer-profile" 
        element={
          <ProtectedRoute>
            <EditFreelancerProfile />
          </ProtectedRoute>
        }
      />
      {/* EMPLOYER PROFILE */}
<Route
  path="/employer-profile"
  element={
    <ProtectedRoute>
      <EmployerProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile/employer/edit"
  element={
    <ProtectedRoute>
      <EditEmployerProfile />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRouter;