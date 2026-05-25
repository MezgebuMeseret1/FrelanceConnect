import { useSelector } from "react-redux";

const useMilestones = () => {
  return useSelector((state) => state.milestone);
};

export default useMilestones;