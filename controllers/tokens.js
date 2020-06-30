const tokens = {
  async redirect(req, res) {
    try {
      res.redirect(`exp://10.0.0.188:19000/--/home/magic-link?token=${req.query.token}`);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = tokens;
