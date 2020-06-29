const db = require('../models');
const util = require('../utilities');

async function login(req, res) {
  try {
    const account = await db.Account.findOne({ email: req.body.email });
    util.Error.validateExists(account);
    await util.Session.checkPassword(req.body.password, account.password);
    const session = await db.Session.create({ account });
    res.json({
      session: session._id,
      account: util.Account.trimAccount(account),
    });
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function validate(req, res) {
  try {

  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function logout(req, res) {
  try {

  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  login,
  validate,
  logout,
};
