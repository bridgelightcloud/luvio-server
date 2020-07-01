const db = require('../models');
const util = require('../utilities');

async function create(req, res) {
  try {
    const { token } = req.body;
    util.Error.validateObjectId(token);
    const foundToken = await db.Token.findById(token);
    util.Error.validateExists(foundToken);
    util.Error.validateNotExpired(foundToken);
    await db.Token.findByIdAndDelete(token);
    const session = await db.Session.create({ account: foundToken.account });
    const account = await db.Account.findById(session.account);
    const data = {
      id: session.id,
      account: util.Account.trimAccount(account),
    };
    res.status(201).json(data);
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

async function remove(req, res) {
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
  create,
  validate,
  remove,
};
