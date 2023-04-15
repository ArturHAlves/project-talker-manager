const express = require('express');
const { readFileTalker, readFileTalkerByID } = require('../utils/readFile');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  try {
    const talkers = await readFileTalker();

    if (talkers.length === 0) {
     return res.status(200).json([]);
    }

    return res.status(200).json(talkers);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

talkerRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFileTalkerByID(+id);

    if (!talkers) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});

module.exports = talkerRoute;
