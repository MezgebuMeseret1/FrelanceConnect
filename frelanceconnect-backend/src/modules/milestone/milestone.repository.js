import prisma from "../../core/config/db.js";
import { fetchMilestoneById } from "../slices/milestone.slice";
// CREATE MILESTONE
export const create = async (data) => {
  return await prisma.milestone.create({
    data,

    include: {
      contract: {
        include: {
          client: true,
          freelancer: true,
          job: true,
        },
      },
    },
  });
};

// UPDATE MILESTONE
export const update = async (id, data) => {
  return await prisma.milestone.update({
    where: {
      id: Number(id),
    },

    data,

    include: {
      contract: {
        include: {
          client: true,
          freelancer: true,
          job: true,
        },
      },
    },
  });
};

// UPDATE STATUS ONLY
export const updateStatus = async (id, status) => {
  return await prisma.milestone.update({
    where: {
      id: Number(id),
    },

    data: {
      status,
    },

    include: {
      contract: true,
    },
  });
};

// GET ALL MILESTONES BY CONTRACT
export const findByContract = async (contractId) => {
  return await prisma.milestone.findMany({
    where: {
      contractId: Number(contractId),
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      contract: {
        include: {
          client: true,
          freelancer: true,
          job: true,
        },
      },
    },
  });
};

// GET SINGLE MILESTONE
export const findById = async (id) => {
  return await prisma.milestone.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      contract: {
        include: {
          client: true,
          freelancer: true,
          job: true,
        },
      },
    },
  });
};

// DELETE MILESTONE
export const remove = async (id) => {
  return await prisma.milestone.delete({
    where: {
      id: Number(id),
    },
  });
};