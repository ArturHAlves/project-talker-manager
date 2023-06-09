const express = require('express');
const connection = require('../db/connection');
const {
  readFileTalker,
  readFileTalkerByID,
  filterByTalker,
} = require('../utils/readFile');
const {
  writeFile,
  writeFileUpdate,
  writeFileDelete,
  writeFilePatch,
} = require('../utils/writeFile');
const {
  validateAge,
  validateName,
  validateToken,
  validateTalk,
  validateWatchedAt,
  validateRate,
  filterByDate,
  filterByRate,
  validatePatchRate,
} = require('../middlewares');

const talkerRoute = express.Router();

talkerRoute.get('/db', async (_req, res) => {
  try {
    const [talkers] = await connection.execute('SELECT * FROM talkers');

    if (!talkers) return res.status(200).json([]); 

    const results = talkers.map((talker) => ({
      name: talker.name,
      age: talker.age,
      id: talker.id,
      talk: { watchedAt: talker.talk_watched_at, rate: talker.talk_rate },
    }));

    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

talkerRoute.get('/search', 
validateToken,
filterByDate,
filterByRate, 
async (req, res) => {
  try {
    const { q, rate, date } = req.query;
    const query = await filterByTalker(q, Number(rate), date);

    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

talkerRoute.get('/', async (_req, res) => {
  try {
    const talkers = await readFileTalker();

    if (talkers.length === 0) return res.status(200).json([]);

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
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});

talkerRoute.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    try {
      const { body } = req;
      const talkers = await readFileTalker();

      const newTalker = {
        id: Number(talkers[talkers.length - 1].id) + 1,
        ...body,
      };

      await writeFile(newTalker);

      return res.status(201).json(newTalker);
    } catch (error) {
      return res.status(500).json({ error: `${error.message}` }); 
}
  },
);

talkerRoute.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const findId = await readFileTalkerByID(+id);
      if (!findId) {
 return res
          .status(404)
          .json({ message: 'Pessoa palestrante não encontrada' }); 
}

      const updateTalker = await writeFileUpdate(+id, body);

      return res.status(200).json(updateTalker);
    } catch (error) {
      return res.status(500).json({ error: `${error.message}` });
    }
  },
);

talkerRoute.patch('/rate/:id', validateToken, validatePatchRate, async (req, res) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;

    await writeFilePatch(+id, rate);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

talkerRoute.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await writeFileDelete(+id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

module.exports = talkerRoute;
