const db = require('../models');
const util = require('../utilities');

async function login(req, res) {
  try {
    const { email } = req.body;
    const account = await db.Account.findOne({ email });
    if (account) {
      const token = await db.Token.create({ account: account.id });
      const activation = await util.SES.sendActivationEmail(email, token.id);
      console.log(activation);
      res.sendStatus(201);
      return;
    }
    util.Error.throwError(404);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function validate(req, res) {
  try {
    const sessionId = req.params.id;
    util.Error.validateObjectId(sessionId);
    const session = await db.Session.findById(sessionId)
      .populate('account');
    util.Error.validateExists(session);
    if (session.expiration < Date.now()) {
      await db.Session.findByIdAndDelete(session.id);
      util.Error.throwError(404);
    }
    res.json(util.Account.trimAccount(session.account));
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function logout(req, res) {
  try {
    const sessionId = req.params.id;
    util.Error.validateObjectId(sessionId);
    const session = await db.Session.findById(sessionId)
      .populate('account');
    util.Error.validateExists(session);
    await db.Session.findByIdAndDelete(session.id);
    res.sendStatus(200);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  login,
  validate,
  logout,
};
