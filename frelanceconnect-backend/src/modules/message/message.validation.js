export const validateMessage = ({ receiverId, content }) => {
  if (!receiverId) throw new Error("Receiver is required");
  if (!content) throw new Error("Message cannot be empty");
};