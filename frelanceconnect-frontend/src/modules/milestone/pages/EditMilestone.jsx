import MilestoneForm from "../components/MilestoneForm";

const EditMilestone = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Milestone</h1>

      <MilestoneForm isEdit />
    </div>
  );
};

export default EditMilestone;