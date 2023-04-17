const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  // Regex retirado do ChatGPT: Formato 'dd/mm/aaaa'
  const regexDate = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
  const validate = regexDate.test(watchedAt);

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  
  if (!validate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchedAt;
