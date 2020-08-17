const db = require('../models');
const util = require('../utilities');

async function create(req, res) {
  try {
    // Get the token
    const { token } = req.body;
    util.Error.validateObjectId(token);

    // Load the token from the database, and make sure it's not missing or expired
    const foundToken = await db.Token.findById(token);
    util.Error.validateExists(foundToken);
    util.Error.validateNotExpired(foundToken);

    // Delete the token, since it's being used
    await db.Token.findByIdAndDelete(token);

    // Create a new session for the user
    const session = await db.Session.create({ account: foundToken.account });

    // Get the account for this session
    const account = await db.Account.findById(session.account);

    // Return the session ID and account info
    const data = {
      id: session.id,
      account: util.Account.trimAccount(account),
    };
    res.status(201).json(data);
  } catch (err) {
    await db.token.findByIdAndDelete(err.itemId);
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
    util.Error.validateNotExpired(session);
    await db.Session.findByIdAndDelete(session.id);
    res.json(util.Account.trimAccount(session.account));
  } catch (err) {
    await db.Session.findByIdAndDelete(err.itemId);
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
