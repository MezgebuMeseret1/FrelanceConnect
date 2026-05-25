import * as service from "./proposal.service.js";

// SUBMIT PROPOSAL
export const createProposal = async (req, res) => {
  try {
    const proposal = await service.createProposal(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: proposal
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// GET PROPOSALS FOR JOB (CLIENT)
export const getJobProposals = async (req, res) => {
  try {
    const proposals = await service.getJobProposals(req.params.jobId);
console.log("DB URL:", process.env.DATABASE_URL);
    res.json({
      success: true,
      data: proposals
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE STATUS (CLIENT ONLY)
export const updateStatus = async (req, res) => {
  try {
    const proposal = await service.updateProposalStatus(
      req.params.id,
      req.body.status,
      req.user.id // ✅ FIXED SECURITY
    );

    res.json({
      success: true,
      data: proposal
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// GET MY PROPOSALS (FREELANCER)
export const getMyProposals = async (req, res) => {
  try {
    const proposals = await service.getMyProposals(req.user.id);

    res.json({
      success: true,
      data: proposals,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};