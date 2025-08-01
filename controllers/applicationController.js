const Application = require('../models/application');
const AppError = require('../utils/AppError');

exports.getMyApplications = async (req, res, next) => {
  try {
    const apps = await Application.find({ user: req.user._id }).populate('job');
    res.json(apps);
  } catch (err) {
    next(err);
  }
};

exports.getJobApplications = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const apps = await Application.find({ job: jobId }).populate('user');
    res.json(apps);
  } catch (err) {
    next(err);
  }
};
