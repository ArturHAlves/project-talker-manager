const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '../talker.json');

const readFileTalker = async () => {
  try {
    const talkers = await fs.readFile(path, 'utf-8');
    return JSON.parse(talkers);
  } catch (error) {
    console.error('Não foi possível ler o arquivo');
  }
};

const readFileTalkerByID = async (id) => {
  try {
    const talkers = await readFileTalker();
    const findID = talkers.find((element) => element.id === id);
    return findID;
  } catch (error) {
    console.error('Não foi possível ler o arquivo');
  }
};

const filterByTalker = async (q, rate) => {
    const talkers = await readFileTalker();
    let filteredTalkers = talkers;

    if (q) {
      filteredTalkers = filteredTalkers.filter(({ name }) =>
        name.toLowerCase().includes(q.toLowerCase()));
    }

    if (rate) {
      filteredTalkers = filteredTalkers.filter(({ talk }) =>
        talk.rate === rate);
    }
    return filteredTalkers;
};

module.exports = { readFileTalker, readFileTalkerByID, filterByTalker };
