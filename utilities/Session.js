const db = require('../models');
const Error = require('./Error');

const Session = {
  async validate(sessionId) {
    const session = db.Session.findById(sessionId);
    Error.validateExists(session);
  },

  async getSessionAccount(req) {
    const auth = req.headers.authorization;
    Error.validateExists(auth, 401);
    const sessionId = auth.slice(auth.indexOf(' ') + 1);
    Error.validateObjectId(sessionId);
    const session = db.Session.findById(sessionId);
    Error.validateExists(session);
    Error.validateNotExpired(session);
    const accountID = session.account;
    const account = db.Account.findById(accountID);
    return account;
  },
};

module.exports = Session;
