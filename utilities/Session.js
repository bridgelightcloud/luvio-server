const bcrypt = require('bcrypt');
const Error = require('./Error');
const db = require('../models');

const saltRounds = 10;

class Session {
  static async hashPassword(plaintext) {
    return await bcrypt.hash(plaintext, saltRounds);
  }

  static async checkPassword(plaintext, hash) {
    if (!(await bcrypt.compare(plaintext, hash))) {
      Error.throwError(401);
    }
  }

  static async getCurrentAccount(req) {
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
  }
}

module.exports = Session;
