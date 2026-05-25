const SubmitMilestone = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Milestone Work</h1>

      <textarea
        className="w-full border rounded-lg p-3"
        rows="6"
        placeholder="Describe completed work..."
      />

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Submit Work
      </button>
    </div>
  );
};

export default SubmitMilestone;