const express = require('express');

const loginRoute = express.Router();
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateLoginEmail');
const validatePassword = require('../middlewares/validateLoginPassword');

loginRoute.post('/', validateEmail, validatePassword, async (_req, res) => {
  try {
    const token = await generateToken();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
});

module.exports = loginRoute;
