const utilities = require('../utilities');

function health(req, res) {
  try {
    res.json('Server is OK');
  } catch (err) {
    utilities.Error.handleErrors(err, res);
  }
}

module.exports = { health };
