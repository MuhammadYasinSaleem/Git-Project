import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { authMetrics } from '../config/prometheus.js';

export const registerUser = async (req, res) => {
  const startTime = Date.now();
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      authMetrics.signupAttempts.inc({ status: 'failure' });
      authMetrics.authResponseTime.observe(
        { endpoint: 'signup' },
        (Date.now() - startTime) / 1000
      );
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    authMetrics.signupAttempts.inc({ status: 'success' });
    authMetrics.authResponseTime.observe(
      { endpoint: 'signup' },
      (Date.now() - startTime) / 1000
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    authMetrics.signupAttempts.inc({ status: 'failure' });
    authMetrics.authResponseTime.observe(
      { endpoint: 'signup' },
      (Date.now() - startTime) / 1000
    );
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const startTime = Date.now();
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      authMetrics.loginAttempts.inc({ status: 'failure' });
      authMetrics.authResponseTime.observe(
        { endpoint: 'login' },
        (Date.now() - startTime) / 1000
      );
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      authMetrics.loginAttempts.inc({ status: 'failure' });
      authMetrics.authResponseTime.observe(
        { endpoint: 'login' },
        (Date.now() - startTime) / 1000
      );
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    authMetrics.loginAttempts.inc({ status: 'success' });
    authMetrics.authResponseTime.observe(
      { endpoint: 'login' },
      (Date.now() - startTime) / 1000
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    authMetrics.loginAttempts.inc({ status: 'failure' });
    authMetrics.authResponseTime.observe(
      { endpoint: 'login' },
      (Date.now() - startTime) / 1000
    );
    res.status(500).json({ message: error.message });
  }
};
