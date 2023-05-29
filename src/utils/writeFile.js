const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '../talker.json');

const readFile = async () => {
  const data = await fs.readFile(path, 'utf-8');
  return JSON.parse(data);
};

const writeFile = async (talker) => {
  try {
    const talkers = await readFile();
    const write = await fs.writeFile(path, JSON.stringify([...talkers, talker]));

    return write;
  } catch (error) {
    console.error('Não foi possível escrever no arquivo');
  }
};

const writeFileUpdate = async (id, talker) => {
  try {
    const talkers = await readFile();

    const index = talkers.findIndex((element) => element.id === id);
    talkers[index] = { id, ...talker };
    await fs.writeFile(path, JSON.stringify(talkers));

    return talkers[index];
  } catch (error) {
    console.error('Não foi possível atualizar o arquivo');
  }
};

const writeFilePatch = async (id, rate) => {
  try {
    const talkers = await readFile();

    const patchTalkers = talkers.map((talker) => {
      if (talker.id === id) return { ...talker, talk: { ...talker.talk, rate } };
      return talker;
    });

    await fs.writeFile(path, JSON.stringify(patchTalkers));

    return patchTalkers;
  } catch (error) {
    console.log('Não foi possível corrigir o arquivo');
  }
};

const writeFileDelete = async (id) => {
  try {
    const talkers = await readFile();

    const removeTalker = talkers.filter((element) => element.id !== id);
    await fs.writeFile(path, JSON.stringify(removeTalker));

    return removeTalker;
  } catch (error) {
    console.error('Não foi possível deletar o arquivo');
  }
};

module.exports = { writeFile, writeFileUpdate, writeFileDelete, writeFilePatch };
