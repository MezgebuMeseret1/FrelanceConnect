const MilestonePaymentPanel = ({ milestone }) => {
  return (
    <div className="border rounded-xl p-5 bg-gray-50 mt-6">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      <p className="mb-2">
        <strong>Amount:</strong> ${milestone.amount}
      </p>

      <p className="mb-2">
        <strong>Status:</strong> {milestone.status}
      </p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
        Release Payment
      </button>
    </div>
  );
};

export default MilestonePaymentPanel;