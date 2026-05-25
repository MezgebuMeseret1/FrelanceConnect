import * as service from "./milestone.service.js";

/* ======================================================
   CREATE MILESTONE
====================================================== */
export const createMilestone = async (req, res) => {
  try {
    const milestone = await service.createMilestone(req.body);

    return res.status(201).json({
      success: true,
      message: "Milestone created successfully",
      data: milestone,
    });
  } catch (error) {
    console.log("CREATE MILESTONE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create milestone",
    });
  }
};

/* ======================================================
   GET CONTRACT MILESTONES
====================================================== */
export const getContractMilestones = async (req, res) => {
  try {
    const contractId = Number(req.params.contractId);

    if (!contractId || isNaN(contractId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contractId",
      });
    }

    const milestones = await service.getContractMilestones(contractId);

    return res.status(200).json({
      success: true,
      count: milestones.length,
      data: milestones,
    });
  } catch (error) {
    console.log("GET CONTRACT MILESTONES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch milestones",
    });
  }
};

/* ======================================================
   GET SINGLE MILESTONE
====================================================== */
export const getMilestoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await service.getMilestoneById(id);

    return res.status(200).json({
      success: true,
      data: milestone,
    });
  } catch (error) {
    console.log("GET MILESTONE ERROR:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "Milestone not found",
    });
  }
};

/* ======================================================
   UPDATE MILESTONE (CLIENT ONLY)
====================================================== */
export const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await service.updateMilestone(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Milestone updated successfully",
      data: milestone,
    });
  } catch (error) {
    console.log("UPDATE MILESTONE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update milestone",
    });
  }
};

/* ======================================================
   UPDATE STATUS (WORKFLOW ONLY - NO DIRECT MONEY LOGIC)
====================================================== */
export const updateMilestoneStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const milestone = await service.updateMilestoneStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Milestone status updated successfully",
      data: milestone,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update milestone status",
    });
  }
};

/* ======================================================
   FUND MILESTONE (ESCROW ENTRY - CLIENT ONLY)
====================================================== */
export const fundMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.user.id;

    const result = await service.fundMilestoneEscrow(id, clientId);

    return res.status(200).json({
      success: true,
      message: "Milestone funded into escrow successfully",
      data: result,
    });
  } catch (error) {
    console.log("FUND MILESTONE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fund milestone",
    });
  }
};

/* ======================================================
   RELEASE PAYMENT (ESCROW EXIT - CLIENT ONLY)
====================================================== */
export const releaseMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.user.id;

    const milestone = await service.releaseMilestoneEscrow(id, clientId);

    return res.status(200).json({
      success: true,
      message: "Payment released successfully",
      data: milestone,
    });
  } catch (error) {
    console.log("RELEASE MILESTONE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to release payment",
    });
  }
};

/* ======================================================
   DELETE MILESTONE
====================================================== */
export const deleteMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteMilestone(id);

    return res.status(200).json({
      success: true,
      message: "Milestone deleted successfully",
    });
  } catch (error) {
    console.log("DELETE MILESTONE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete milestone",
    });
  }
};