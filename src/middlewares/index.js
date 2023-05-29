// Validate Login
const validateEmail = require('./validateLoginEmail');
const validatePassword = require('./validateLoginPassword');

// Validate Talker
const validateToken = require('./validateTalkerToken');
const validateName = require('./validateTalkerName');
const validateAge = require('./validateTalkerAge');
const validateTalk = require('./validateTalkerTalk');
const validateWatchedAt = require('./validateTalkerWatchedAt');
const validateRate = require('./validateTalkerRate');
const validatePatchRate = require('./validatePatchRate');

// Filter
const { filterByRate, filterByDate } = require('./validateFilter');

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  filterByDate,
  filterByRate,
  validatePatchRate,
};
