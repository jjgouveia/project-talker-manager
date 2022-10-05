module.exports = (req, res, next) => {
    const { talk } = req.body;
    // const { watchedAt, rate } = req.body.talk;

    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (talk.rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
};