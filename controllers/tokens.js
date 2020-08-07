const util = require('../utilities');
const db = require('../models');

const tokens = {
  async sendMagicLink(req, res) {
    try {
      // Retrieve email address and clean it up
      let { email } = req.body;
      util.Error.validateExists(email);
      email = email.toLowerCase().trim();

      // Get the account for this email
      let account = await db.Account.findOne({ email });
      // If one does not exist, create one
      if (!account) {
        account = await db.Account.create({ email });
      }

      // Look for and delete any current token for this account
      let token = await db.Token.findOne({ account: account.id });
      if (token) {
        await db.Token.findByIdAndDelete(token.id);
      }

      // Create a new token
      token = await db.Token.create({ account: account.id });
      // Send the token to the email address
      util.SES.sendActivationEmail(email, token);
      res.status(200).json({ email });
    } catch (err) {
      util.Error.handleErrors(err, res);
    }
  },
};

module.exports = tokens;
