export const validateDispute = ({ reason, description }) => {
  if (!reason) throw new Error("Reason is required");
  if (!description) throw new Error("Description is required");
};