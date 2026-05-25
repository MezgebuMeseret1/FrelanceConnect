import * as service from "./review.service.js";

export const createReview = async (req, res) => {
  try {
    const review = await service.createReview({
      contractId: req.body.contractId,
      reviewerId: req.user.id,
      revieweeId: req.body.revieweeId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const getUserReviews = async (req, res) => {
  const reviews = await service.getUserReviews(req.params.userId);

  res.json({
    success: true,
    data: reviews
  });
};