// src/modules/contract/contract.controller.js

import prisma from "../../core/config/db.js";
import * as service from "./contract.service.js";

// CREATE CONTRACT
export const createContract = async (req, res) => {
  try {
    const contract = await service.createContract(req.body);

    res.status(201).json({
      success: true,
      data: contract,
    });
  } catch (err) {
    console.error("CREATE CONTRACT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET MY CONTRACTS
export const getMyContracts = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const role = req.user.role;

    const contracts = await prisma.contract.findMany({
      where:
        role === "FREELANCER"
          ? { freelancerId: userId }
          : { clientId: userId },

      include: {
        job: true,
        proposal: true,
        milestones: true,
      },
    });

    res.json({
      success: true,
      data: contracts,
    });
  } catch (err) {
    console.error("CONTRACT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET SINGLE CONTRACT
// GET SINGLE CONTRACT
export const getContract = async (req, res) => {
  try {
    const id = Number(req.params.id);

    console.log("REQ PARAMS:", req.params);
    console.log("CONTRACT ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contract ID is required",
      });
    }

    const contract = await service.getContractById(id);

    res.json({
      success: true,
      data: contract,
    });
  } catch (err) {
    console.error("GET CONTRACT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};