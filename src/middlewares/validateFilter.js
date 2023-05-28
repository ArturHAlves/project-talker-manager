const filterByRate = (req, res, next) => {
  const { rate } = req.query;

  if (rate 
    && (Number(rate) < 1 || Number(rate) > 5 || !Number.isInteger(Number(rate)))
  ) {
    return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
  }
  return next();
};

const filterByDate = (req, res, next) => {
  const { date } = req.query;

  // Regex retirado do ChatGPT: Formato 'dd/mm/aaaa'
  const regexDate = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
  const validate = regexDate.test(date);

  if (date && (!validate)) {
    return res.status(400).json({ 
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"', 
    });
  }
 return next();
};

module.exports = { filterByRate, filterByDate };
