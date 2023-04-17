const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '../talker.json');

const readFile = async () => fs.readFile(path, 'utf-8');

const writeFile = async (talker) => {
  try {
    const data = await readFile();
    const talkers = JSON.parse(data);

    const write = await fs.writeFile(path, JSON.stringify([...talkers, talker]));

    return write;
  } catch (error) {
    console.error('Não foi possível escrever no arquivo');
  }
};

const writeFileUpdate = async (id, talker) => {
  try {
    const data = await readFile();
    const talkers = JSON.parse(data);

    const index = talkers.findIndex((element) => element.id === id);
    talkers[index] = { id, ...talker };
    await fs.writeFile(path, JSON.stringify(talkers));

    return talkers[index];
  } catch (error) {
    console.error('Não foi possível atualizar o arquivo');
  }
};

module.exports = { writeFile, writeFileUpdate };
