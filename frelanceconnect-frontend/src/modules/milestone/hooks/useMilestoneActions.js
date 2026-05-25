const useMilestoneActions = () => {
  const approveMilestone = async (id) => {
    console.log("Approve milestone", id);
  };

  const releasePayment = async (id) => {
    console.log("Release payment", id);
  };

  return {
    approveMilestone,
    releasePayment,
  };
};

export default useMilestoneActions;