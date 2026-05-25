import prisma from "../../core/config/db.js";

// CREATE PROPOSAL
export const createProposal = async (data, freelancerId) => {
  return await prisma.proposal.create({
    data: {
      coverLetter: data.coverLetter,
      bidAmount: Number(data.bidAmount),
      jobId: Number(data.jobId),
      freelancerId
    }
  });
};

// GET PROPOSALS FOR A JOB
export const getJobProposals = async (jobId) => {
  return await prisma.proposal.findMany({
    where: { jobId: Number(jobId) },
    include: {
      freelancer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

// GET MY PROPOSALS (FREELANCER)
export const getMyProposals = async (freelancerId) => {
  return await prisma.proposal.findMany({
    where: { freelancerId: Number(freelancerId) },
    include: {
      job: true
    }
  });
};

// UPDATE STATUS (CLIENT ONLY)
export const updateProposalStatus = async (id, status, clientId) => {
  const proposal = await prisma.proposal.findUnique({
    where: { id: Number(id) },
    include: { job: true }
  });

  if (!proposal) throw new Error("Proposal not found");

  if (proposal.job.clientId !== clientId) {
    throw new Error("Not authorized");
  }

  const updated = await prisma.proposal.update({
    where: { id: Number(id) },
    data: { status }
  });

  // 🚀 AUTO CREATE CONTRACT WHEN ACCEPTED
  if (status === "ACCEPTED") {
    await prisma.contract.create({
      data: {
        jobId: proposal.jobId,
        clientId: proposal.job.clientId,
        freelancerId: proposal.freelancerId,
        status: "ACTIVE"
      }
    });
  }

  return updated;
};