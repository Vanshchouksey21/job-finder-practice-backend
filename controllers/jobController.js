const Job = require('../models/job');
const Application = require('../models/application');
const AppError = require('../utils/AppError');

exports.createJob = async (req, res, next) => {
  try {
    const { title, description, company } = req.body;
    if (!title || !company) {
      return next(new AppError('Job title and company are required', 400));
    }
    const job = await Job.create({ title, description, company });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.listJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('company');
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const exists = await Application.findOne({ user: req.user._id, job: jobId });
    if (exists) return next(new AppError('Already applied', 400));
    const app = await Application.create({ user: req.user._id, job: jobId });
    res.json(app);
  } catch (err) {
    next(err);
  }
};
