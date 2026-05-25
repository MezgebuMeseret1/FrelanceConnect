// src/modules/profile/profile.routes.jsx

import FreelancerProfile from "./pages/FreelancerProfile";
import EmployerProfile from "./pages/EmployerProfile";

import EditFreelancerProfile from "./pages/EditFreelancerProfile";
import EditEmployerProfile from "./pages/EditEmployerProfile";

const profileRoutes = [
  // FREELANCER
  {
    path: "/freelancer/profile",
    element: <FreelancerProfile />,
  },
  {
    path: "/freelancer/profile/edit",
    element: <EditFreelancerProfile />,
  },

  // EMPLOYER / CLIENT
  {
    path: "/employer/profile",
    element: <EmployerProfile />,
  },
  {
    path: "/employer/profile/edit",
    element: <EditEmployerProfile />,
  },
];

export default profileRoutes;