const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, findTalkerById, addNewTalker } = require('./utils/fsUtils');
const generateToken = require('./utils/token');
const emailValidation = require('./middlewares/emailValidation');
const passwordValidation = require('./middlewares/passwordValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const nameValidation = require('./middlewares/nameValidation');
const ageValidation = require('./middlewares/ageValidation');
const talkValidation = require('./middlewares/talkValidation');
const watchedAtValidation = require('./middlewares/watchedAtValidation');
const rateValidation = require('./middlewares/rateValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await readTalkers();
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalkerById(id);

  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', emailValidation, passwordValidation, (_req, res) => {
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation, async (req, res) => {
  const newTalkerEntry = req.body;
  const newTalker = await addNewTalker(newTalkerEntry);

  res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online - 3000');
});
