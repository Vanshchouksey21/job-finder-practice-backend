const Company = require('../models/company');
const AppError = require('../utils/AppError');

exports.createCompany = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new AppError('Company name is required', 400));
    }
    const company = await Company.create({ name, createdBy: req.user._id });
    res.json(company);
  } catch (err) {
    next(err);
  }
};

exports.listCompanies = async (req, res, next) => {
  try {
    const company = await Company.find();
    res.json(company);
    // console.log(company);
  } catch (err) {
    next(err);
  }
};
