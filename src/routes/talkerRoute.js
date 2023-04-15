const express = require('express');
const { readFileTalker } = require('../utils/fs/readFile');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  try {
    const talkers = await readFileTalker();

    if (talkers.length === 0) res.status(200).json([]);

    return res.status(200).json(talkers);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

module.exports = talkerRoute;
