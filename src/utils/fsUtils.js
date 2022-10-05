const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = '../../src/talker.json';

async function readTalkers() {
    try {
        const contentFile = await fs.readFile(path.resolve(__dirname, TALKER_FILE));
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

async function addNewTalker(newPerson) {
    const pathname = path.resolve(__dirname, TALKER_FILE);

    try {
        const oldTalkersList = await readTalkers();
        const newTalker = { id: oldTalkersList.length + 1, ...newPerson };
        const newTalkersList = JSON.stringify([...oldTalkersList, newTalker]);
        await fs.writeFile(pathname, newTalkersList);
        return newTalker;
    } catch (error) {
        console.error(`I/O Error: ${error}`);
    }
}

module.exports = {
    readTalkers,
    findTalkerById,
    addNewTalker,
};