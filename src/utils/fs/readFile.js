const fs = require('fs/promises');

const { join } = require('path');

const path = './../../talker.json';

const readFileTalker = async () => {
  try {
    const talkers = await fs.readFile(join(__dirname, path));
    return JSON.parse(talkers);
  } catch (error) {
    console.error('File not found');
  }
};

module.exports = { readFileTalker };