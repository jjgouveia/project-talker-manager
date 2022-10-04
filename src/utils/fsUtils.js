const fs = require('fs').promises;
const path = require('path');

async function readTalkers() {
    try {
        const contentFile = await fs.readFile(path.resolve(__dirname, '../../src/talker.json'));
        const data = JSON.parse(contentFile);
        return data;
    } catch (error) {
        console.log(`An error has occurred: ${error}`);
        return null;
    }
}

async function findTalkerById(talkerId) {
    const talkersList = await readTalkers();
    const talker = talkersList.find(({ id }) => id === Number(talkerId));
    return talker;
}

module.exports = {
    readTalkers,
    findTalkerById,
};