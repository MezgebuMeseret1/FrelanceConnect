import * as service from "./dispute.service.js";

export const createDispute = async (req, res) => {
  try {
    const dispute = await service.createDispute({
      contractId: req.body.contractId,
      openedById: req.user.id,
      reason: req.body.reason,
      description: req.body.description
    });

    res.status(201).json({
      success: true,
      data: dispute
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const getMyDisputes = async (req, res) => {
  const data = await service.getMyDisputes(req.user.id);

  res.json({
    success: true,
    data
  });
};

export const resolveDispute = async (req, res) => {
  try {
    const result = await service.resolveDispute({
      disputeId: req.params.id,
      adminId: req.user.id,
      resolution: req.body.resolution,
      status: req.body.status // RESOLVED / REJECTED
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};