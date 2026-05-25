import * as jobService from "./job.service.js";

export const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const getJobs = async (req, res) => {
  const jobs = await jobService.getJobs();

  res.json({
    success: true,
    data: jobs
  });
};

export const getJob = async (req, res) => {
  const job = await jobService.getJobById(req.params.id);

  res.json({
    success: true,
    data: job
  });
};

export const updateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(
      req.params.id,
      req.body,
      req.user.id
    );

    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await jobService.deleteJob(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Job deleted"
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
};