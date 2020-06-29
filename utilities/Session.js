const bcrypt = require('bcrypt');
const db = require('../models');
const Error = require('./Error');

const Session = {
  async validate(sessionId) {
    const session = db.Session.findById(sessionId);
    Error.validateExists(session);
  },

  async checkPassword(plaintext, hash) {
    if (!(await bcrypt.compare(plaintext, hash))) {
      Error.throwError(404);
    }
  },

  async getCurrentAccount(req) {
    if (!req.session.currentAccount) {
      Error.throwError(401);
    }
    const currentSessionAccount = await db.Account.findById(
      req.session.currentAccount.id,
    );
    if (!currentSessionAccount) {
      Error.throwError(404);
    }
    return currentSessionAccount;
  },
};

module.exports = Session;
