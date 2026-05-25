const steps = [
  "PENDING",
  "FUNDED",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "RELEASED",
];

const MilestoneTimeline = ({ status }) => {
  return (
    <div className="flex gap-3 flex-wrap mt-4">
      {steps.map((step) => (
        <div
          key={step}
          className={`px-3 py-2 rounded-full text-sm ${
            step === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default MilestoneTimeline;