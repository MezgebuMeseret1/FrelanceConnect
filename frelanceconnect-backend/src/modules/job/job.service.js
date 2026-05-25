import prisma from "../../core/config/db.js";
import AppError from "../../core/utils/AppError.js";

// CREATE JOB
export const createJob = async (data, userId) => {
  return prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      budget: data.budget,
      clientId: userId,
    },
  });
};

// GET ALL JOBS
export const getJobs = async () => {
  return prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

// GET SINGLE JOB
export const getJobById = async (id) => {
  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
  });

  if (!job) throw new AppError("Job not found", 404);

  return job;
};

// UPDATE JOB
export const updateJob = async (id, data, userId) => {
  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
  });

  if (!job) throw new AppError("Job not found", 404);

  if (job.clientId !== userId) {
    throw new AppError("Not authorized", 403);
  }

  return prisma.job.update({
    where: { id: Number(id) },
    data: {
      title: data.title,
      description: data.description,
      budget: data.budget,
    },
  });
};

// DELETE JOB
export const deleteJob = async (id, userId) => {
  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
  });

  if (!job) throw new AppError("Job not found", 404);

  if (job.clientId !== userId) {
    throw new AppError("Not authorized", 403);
  }

  return prisma.job.delete({
    where: { id: Number(id) },
  });
};