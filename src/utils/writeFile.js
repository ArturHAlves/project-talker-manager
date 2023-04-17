const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '../talker.json');

const writeFile = async (talker) => {
  try {
    const talkers = await fs.readFile(path, 'utf-8');
    const json = JSON.parse(talkers);

    const write = await fs.writeFile(path, JSON.stringify([...json, talker]));

    return write;
  } catch (error) {
    console.error('Não foi possível escrever no arquivo');
  }
};

module.exports = { writeFile };