const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE = '../../src/talker.json';
const pathname = path.resolve(__dirname, TALKER_FILE);

async function readTalkers() {
    try {
        const contentFile = await fs.readFile(pathname);
        const data = JSON.parse(contentFile);
        return data;
    } catch (error) {
        console.log(`An error has occurred: ${error}`);
        return null;
    }
}

async function findTalkerById(talkerId) {
    try {
    const talkersList = await readTalkers();
    const talker = talkersList.find(({ id }) => id === Number(talkerId));
    return talker;
    } catch (error) {
        console.error(`Can't find referencies: ${error}`);
        return null;
    }
}

async function findTalkerByName(searchTerm) {
    const talkersList = await readTalkers();
    const streinedTalkers = talkersList.filter(({ name }) => 
        name.toLowerCase().includes(searchTerm.toLowerCase()));
        return streinedTalkers;
}

async function addNewTalker(newPerson) {
    try {
        const oldTalkersList = await readTalkers();
        const newTalker = { id: oldTalkersList.length + 1, ...newPerson };
        const newTalkersList = JSON.stringify([...oldTalkersList, newTalker]);
        await fs.writeFile(pathname, newTalkersList);
        return newTalker;
    } catch (error) {
        console.error(`I/O Error: ${error}`);
        return null;
    }
}

async function editTalker(newInfo, talkerId) {
    try {
        const talkersList = await readTalkers();
        const talkerIndex = talkersList.findIndex(({ id }) => id === Number(talkerId));
        const editedTalker = { ...talkersList[talkerIndex], ...newInfo };
        talkersList.splice(talkerIndex, 1, editedTalker);
        await fs.writeFile(pathname, JSON.stringify(talkersList));
        return editedTalker;
    } catch (error) {
        console.error(`Can't edit: ${error}`);
        return null;
    }
}

async function deleteTalker(talkerId) {
    try {
        const talkersList = await readTalkers();
        const newList = talkersList.filter(({ id }) => id !== Number(talkerId));
        await fs.writeFile(pathname, JSON.stringify(newList));
    } catch (error) {
        console.error(`Can't delete: ${error}`);
        return null;
    }
}

module.exports = {
    readTalkers,
    findTalkerById,
    addNewTalker,
    editTalker,
    deleteTalker,
    findTalkerByName,
};