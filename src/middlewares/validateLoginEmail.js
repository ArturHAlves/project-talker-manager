const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validate = regexEmail.test(email);

  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validate) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;
