const moment = require('moment');
const db = require('../models');

module.exports = {
  trimAccount(account) {
    const trim = {
      _id: account.id,
      email: account.email,
      name: account.name,
      active: account.active,
    };
    if (account.confidenceScore) {
      trim.confidenceScore = account.confidenceScore;
    }
    return trim;
  },
  async refreshSession(sessionId) {
    const session = await db.Session.findById(sessionId);
    session.expiration = moment.utc().add(15, 'minutes');
    await session.save();
  },
};
