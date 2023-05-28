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

// Filter
const validateFilter = require('./validateFilter');

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateFilter,
};
