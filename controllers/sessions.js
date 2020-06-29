const db = require('../models');
const util = require('../utilities');

async function login(req, res) {
  try {
    const account = await db.Account.findOne({ email: req.body.email });
    util.Error.validateExists(account);
    await util.Session.checkPassword(req.body.password, account.password);
    const session = await db.Session.create({ account });
    res.json({
      session: session.id,
      account: util.Account.trimAccount(account),
    });
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
