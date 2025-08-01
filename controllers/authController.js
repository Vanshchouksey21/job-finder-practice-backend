const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return next(new AppError('Please provide username, password, and role', 400));
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, role });
    res.json({ id: user._id, username: user.username, role: user.role });
  } catch (error) {
    if (error.code === 11000) {
      return next(new AppError('Username already exists', 400));
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new AppError('Please provide username and password', 400));
    }
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return next(new AppError('Invalid credentials', 400));
    }
    const token = jwt.sign({ id: user._id , role: user?.role}, process.env.JWT_SECRET);
    res.json({ token });
  } catch {
    next(new AppError('Login error', 400));
  }
};
