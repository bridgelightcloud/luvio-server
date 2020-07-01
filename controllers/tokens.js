const util = require('../utilities');
const db = require('../models');

const tokens = {
  async sendMagicLink(req, res) {
    try {
      const { email } = req.body;
      util.Error.validateExists(email);
      const account = await db.Account.findOne({ email });
      if (!account) {
        res.sendStatus(200);
        return;
      }
      let token = await db.Token.findOne({ account: account.id });
      if (token) {
        await db.Token.findByIdAndDelete(token.id);
      }
      token = await db.Token.create({ account: account.id });
      util.SES.sendActivationEmail(email, token.id);
      res.sendStatus(200);
    } catch (err) {
      util.Error.handleErrors(err, res);
    }
  },

  async redirect(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        res.sendStatus(400);
      }
      res.redirect(`exp://10.0.0.188:19000/--/home/magic-link?token=${token}`);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = tokens;
