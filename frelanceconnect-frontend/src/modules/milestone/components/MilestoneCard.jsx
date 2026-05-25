import { Link } from "react-router-dom";

import MilestoneStatusBadge from "./MilestoneStatusBadge";
import MilestoneActions from "./MilestoneActions";

const MilestoneCard = ({ milestone }) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{milestone.title}</h2>

        <MilestoneStatusBadge status={milestone.status} />
      </div>

      <p className="text-gray-600 mb-3">{milestone.description}</p>

      <div className="mb-3">
        <strong>Amount:</strong> ${milestone.amount}
      </div>

      <div className="flex justify-between items-center">
        <Link
          to={`/milestones/${milestone.id}`}
          className="text-blue-600"
        >
          View Details
        </Link>
<MilestoneActions
  milestone={milestone}
/>
      </div>
    </div>
  );
};

export default MilestoneCard;