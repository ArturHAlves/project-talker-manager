const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, './../../talker.json');

const readFileTalker = async () => {
  try {
    const talkers = await fs.readFile(path);
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

module.exports = { readFileTalker, readFileTalkerByID };
