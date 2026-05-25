export const validateReview = ({ rating }) => {
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
};