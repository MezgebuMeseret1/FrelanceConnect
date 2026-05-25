import Milestones from "./pages/Milestones";
import MilestoneDetails from "./pages/MilestoneDetails";
import CreateMilestone from "./pages/CreateMilestone";
import EditMilestone from "./pages/EditMilestone";
import SubmitMilestone from "./pages/SubmitMilestone";

const milestoneRoutes = [
  {
    path: "/contracts/:contractId/milestones",
    element: <Milestones />,
  },
  {
    path: "/milestones/create/:contractId",
    element: <CreateMilestone />,
  },
  {
    path: "/milestones/:id",
    element: <MilestoneDetails />,
  },
  {
    path: "/milestones/edit/:id",
    element: <EditMilestone />,
  },
  {
    path: "/milestones/submit/:id",
    element: <SubmitMilestone />,
  },
];

export default milestoneRoutes;