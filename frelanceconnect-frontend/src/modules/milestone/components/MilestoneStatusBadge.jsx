const statusColors = {
  PENDING: "bg-gray-400",
  FUNDED: "bg-blue-500",
  IN_PROGRESS: "bg-yellow-500",
  SUBMITTED: "bg-purple-500",
  APPROVED: "bg-green-500",
  RELEASED: "bg-emerald-700",
  DISPUTED: "bg-red-600",
};

const MilestoneStatusBadge = ({ status }) => {
  return (
    <span
      className={`text-white text-sm px-3 py-1 rounded-full ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default MilestoneStatusBadge;