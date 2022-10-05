const express = require('express');

const router = express.Router();

const { 
    readTalkers,
    findTalkerById,
    addNewTalker,
    editTalker,
    deleteTalker,
    findTalkerByName,
} = require('../utils/fsUtils');

const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedAtValidation = require('../middlewares/watchedAtValidation');
const rateValidation = require('../middlewares/rateValidation');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

router.get('/', async (_req, res) => {
    const data = await readTalkers();
    res.status(HTTP_OK_STATUS).json(data);
  });

  router.get('/search', tokenValidation, async (req, res) => {
    const { q } = req.query;
    const streinedTalkers = await findTalkerByName(q);
    res.status(HTTP_OK_STATUS).json(streinedTalkers);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await findTalkerById(id);
  
    if (!talker) {
      return res.status(HTTP_NOT_FOUND_STATUS).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
  
    res.status(HTTP_OK_STATUS).json(talker);
  });
  
  router.delete('/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
    res.sendStatus(204).end();
  });

  router.use(
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtValidation,
    rateValidation,
  );

  router.post('/', async (req, res) => {
    const newTalkerEntry = req.body;
    const newTalker = await addNewTalker(newTalkerEntry);
  
    res.status(201).json(newTalker);
  });
  
  router.put('/:id', async (req, res) => {
    const newInfo = req.body;
    const { id } = req.params;
    const editedTalker = await editTalker(newInfo, id);
    res.status(HTTP_OK_STATUS).json(editedTalker);
  });

module.exports = router;