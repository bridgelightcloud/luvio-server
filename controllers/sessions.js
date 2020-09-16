const db = require('../models');
const util = require('../utilities');

async function create(req, res) {
  try {
    // Get the token
    const { token } = req.body;
    util.Error.validateUUID(token);

    // Load the token from the database, and make sure it's not missing or expired
    const foundToken = await db.Token.findById(token);
    util.Error.validateExists(foundToken);
    util.Error.validateNotExpired(foundToken);

    // Delete the token, since it's being used
    await db.Token.findByIdAndDelete(token);

    // Create a new session for the user
    const session = await db.Session.create({ account: foundToken.account });

    // Get the account for this session
    const account = await db.Account
      .findById(session.account)
      .select('email name picUrl model');

    // Return the session ID and account info
    const data = {
      id: session.id,
      account,
    };
    res.status(201).json(data);
  } catch (err) {
    await db.Token.findByIdAndDelete(err.itemId);
    util.Error.handleErrors(err, res);
  }
}

async function validate(req, res) {
  try {
    // Get the session id
    const sessionId = req.params.id;
    util.Error.validateUUID(sessionId);

    // Try to find the session in the database
    const session = await db.Session.findById(sessionId)
      .populate('account');

    // Check if it exists, and if it's not expired
    util.Error.validateExists(session);
    util.Error.validateNotExpired(session);

    // Refresh with a new expiration
    session.refresh();
    await session.save();

    // Return the session ID and account info
    const data = {
      id: session.id,
      account: util.Account.trimAccount(session.account),
    };
    res.status(200).json(data);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function remove(req, res) {
  try {
    const sessionId = req.params.id;
    util.Error.validateUUID(sessionId);
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
